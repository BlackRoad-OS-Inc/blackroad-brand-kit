/**
 * BlackRoad OS — Long-Running Task Worker
 * Cloudflare Worker: handles long-running async tasks via Durable Objects
 * and ctx.waitUntil() for up to 15-minute background processing.
 *
 * Routes:
 *   POST /task/dispatch         — queue a background task (returns task_id)
 *   GET  /task/status/:id       — poll task status
 *   POST /task/build            — trigger site build notification
 *   POST /task/verify           — run production verification checks
 *   GET  /health                — health check
 *
 * Durable Object: TaskStore — persists task state between requests
 */

// ─────────────────────────────────────────────────────────────────────────────
// Durable Object: TaskStore
// Stores task state (queued → running → complete / failed)
// ─────────────────────────────────────────────────────────────────────────────
export class TaskStore {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);
    const taskId = url.searchParams.get('id');

    if (request.method === 'GET') {
      const task = await this.state.storage.get(taskId);
      if (!task) {
        return Response.json({ error: 'Task not found' }, { status: 404 });
      }
      return Response.json(task);
    }

    if (request.method === 'PUT') {
      const data = await request.json();
      if (!taskId) {
        return Response.json({ error: 'id required' }, { status: 400 });
      }
      await this.state.storage.put(taskId, data);
      return Response.json({ ok: true });
    }

    if (request.method === 'DELETE') {
      await this.state.storage.deleteAll();
      return Response.json({ ok: true });
    }

    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CORS helpers
// ─────────────────────────────────────────────────────────────────────────────
const CORS = (origin) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
});

// ─────────────────────────────────────────────────────────────────────────────
// Task dispatch — queue a background task
// ─────────────────────────────────────────────────────────────────────────────
async function dispatchTask(request, env, ctx) {
  const body = await request.json();
  const { type, payload = {} } = body;

  if (!type) {
    return Response.json({ error: 'type is required' }, { status: 400 });
  }

  const taskId = `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const task = {
    id: taskId,
    type,
    payload,
    status: 'queued',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    result: null,
    error: null,
  };

  // Persist initial state
  if (env.TASK_STORE) {
    const stub = env.TASK_STORE.get(env.TASK_STORE.idFromName('global'));
    await stub.fetch(new Request(`https://task-store/?id=${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }));
  }

  // Run the task asynchronously (up to 15 minutes via waitUntil)
  ctx.waitUntil(runTask(taskId, type, payload, env));

  return Response.json({ task_id: taskId, status: 'queued' });
}

// ─────────────────────────────────────────────────────────────────────────────
// Background task runner
// ─────────────────────────────────────────────────────────────────────────────
async function runTask(taskId, type, payload, env) {
  const updateStatus = async (status, result = null, error = null) => {
    if (!env.TASK_STORE) return;
    const stub = env.TASK_STORE.get(env.TASK_STORE.idFromName('global'));
    await stub.fetch(new Request(`https://task-store/?id=${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: taskId, type, payload, status,
        updated_at: new Date().toISOString(),
        result, error,
        created_at: new Date().toISOString(),
      }),
    })).catch(() => {/* ignore storage errors */});
  };

  await updateStatus('running');

  try {
    let result;

    switch (type) {
      case 'verify-deployment': {
        result = await verifyDeployment(payload);
        break;
      }
      case 'health-check-all': {
        result = await healthCheckAll(payload);
        break;
      }
      case 'domain-verify': {
        result = await verifyDomains(payload);
        break;
      }
      case 'build-notify': {
        result = await sendBuildNotification(payload, env);
        break;
      }
      default: {
        throw new Error(`Unknown task type: ${type}`);
      }
    }

    await updateStatus('complete', result);
  } catch (err) {
    await updateStatus('failed', null, err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Long-running task implementations
// ─────────────────────────────────────────────────────────────────────────────

/** Verify deployment health across all endpoints */
async function verifyDeployment(payload) {
  const endpoints = payload.endpoints || [
    'https://blackroad-brand-kit.pages.dev/',
    'https://blackroad-brand-kit.pages.dev/docs/',
    'https://blackroad-brand-kit.pages.dev/pricing/',
    'https://brand.blackroad.io/',
    'https://stripe.blackroad.io/health',
  ];

  const results = await Promise.allSettled(
    endpoints.map(async (url) => {
      const start = Date.now();
      const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(10000) });
      return {
        url,
        status: res.status,
        ok: res.ok,
        latency_ms: Date.now() - start,
      };
    })
  );

  const checks = results.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    return { url: endpoints[i], status: 0, ok: false, error: r.reason?.message };
  });

  const passing = checks.filter(c => c.ok).length;
  return {
    total: checks.length,
    passing,
    failing: checks.length - passing,
    checks,
    verified_at: new Date().toISOString(),
  };
}

/** Run health checks against all service endpoints */
async function healthCheckAll(payload) {
  const services = {
    'stripe-worker': 'https://stripe.blackroad.io/health',
    'pages-main': 'https://blackroad-brand-kit.pages.dev/',
    'pages-brand': 'https://brand.blackroad.io/',
  };

  const checks = {};
  for (const [name, url] of Object.entries(services)) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      checks[name] = { ok: res.ok, status: res.status, url };
    } catch (err) {
      checks[name] = { ok: false, status: 0, error: err.message, url };
    }
  }

  return { checks, checked_at: new Date().toISOString() };
}

/** Verify custom domain DNS resolution */
async function verifyDomains(payload) {
  const domains = payload.domains || [
    'brand.blackroad.io',
    'stripe.blackroad.io',
    'chat.blackroad.io',
    'os.blackroad.io',
  ];

  const results = await Promise.allSettled(
    domains.map(async (domain) => {
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=CNAME`, {
        headers: { Accept: 'application/dns-json' },
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      return {
        domain,
        status: data.Status,
        answers: (data.Answer || []).map(a => ({ type: a.type, data: a.data })),
        resolved: (data.Status === 0 && (data.Answer?.length || 0) > 0),
      };
    })
  );

  return {
    domains: results.map((r, i) => {
      if (r.status === 'fulfilled') return r.value;
      return { domain: domains[i], resolved: false, error: r.reason?.message };
    }),
    verified_at: new Date().toISOString(),
  };
}

/** Send build completion notification (webhook) */
async function sendBuildNotification(payload, env) {
  const { webhook_url, message, sha } = payload;

  if (!webhook_url && !env.NOTIFY_WEBHOOK_URL) {
    return { skipped: true, reason: 'No webhook URL configured' };
  }

  const url = webhook_url || env.NOTIFY_WEBHOOK_URL;
  const body = JSON.stringify({
    text: message || '✅ BlackRoad OS brand-kit deployment complete',
    sha: sha || 'unknown',
    timestamp: new Date().toISOString(),
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    signal: AbortSignal.timeout(5000),
  });

  return { sent: res.ok, status: res.status };
}

// ─────────────────────────────────────────────────────────────────────────────
// Task status poll
// ─────────────────────────────────────────────────────────────────────────────
async function getTaskStatus(taskId, env) {
  if (!env.TASK_STORE) {
    return Response.json({
      error: 'TASK_STORE Durable Object not configured',
      hint: 'Add [[durable_objects]] binding in wrangler.toml',
    }, { status: 503 });
  }

  const stub = env.TASK_STORE.get(env.TASK_STORE.idFromName('global'));
  return stub.fetch(new Request(`https://task-store/?id=${taskId}`));
}

// ─────────────────────────────────────────────────────────────────────────────
// Main fetch handler
// ─────────────────────────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';
    const cors = CORS(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    // Simple auth guard — set WORKER_AUTH_TOKEN secret to require a token
    if (env.WORKER_AUTH_TOKEN) {
      const auth = request.headers.get('Authorization') || '';
      if (auth !== `Bearer ${env.WORKER_AUTH_TOKEN}`) {
        return Response.json({ error: 'Unauthorized' }, { status: 401, headers: cors });
      }
    }

    let response;
    try {
      if (url.pathname === '/health') {
        response = Response.json({
          status: 'ok',
          worker: 'blackroad-tasks',
          durable_objects: !!env.TASK_STORE,
          time: new Date().toISOString(),
        });
      } else if (request.method === 'POST' && url.pathname === '/task/dispatch') {
        response = await dispatchTask(request, env, ctx);
      } else if (request.method === 'GET' && url.pathname.startsWith('/task/status/')) {
        const taskId = url.pathname.replace('/task/status/', '');
        response = await getTaskStatus(taskId, env);
      } else if (request.method === 'POST' && url.pathname === '/task/verify') {
        // Convenience shorthand for deployment verification
        const body = await request.json().catch(() => ({}));
        const fakeReq = new Request(request.url, {
          method: 'POST',
          headers: request.headers,
          body: JSON.stringify({ type: 'verify-deployment', payload: body }),
        });
        response = await dispatchTask(fakeReq, env, ctx);
      } else if (request.method === 'POST' && url.pathname === '/task/build') {
        // Build notification shorthand
        const body = await request.json().catch(() => ({}));
        const fakeReq = new Request(request.url, {
          method: 'POST',
          headers: request.headers,
          body: JSON.stringify({ type: 'build-notify', payload: body }),
        });
        response = await dispatchTask(fakeReq, env, ctx);
      } else {
        response = Response.json({
          error: 'Not found',
          routes: ['/health', '/task/dispatch', '/task/status/:id', '/task/verify', '/task/build'],
        }, { status: 404 });
      }
    } catch (err) {
      console.error('Worker error:', err);
      response = Response.json({ error: err.message }, { status: 500 });
    }

    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(cors)) headers.set(k, v);
    return new Response(response.body, { status: response.status, headers });
  },
};
