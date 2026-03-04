# BlackRoad OS — Long-Running Task Worker

A Cloudflare Worker that handles **longer asynchronous tasks** using:
- `ctx.waitUntil()` — background processing up to 15 minutes
- **Durable Objects** (`TaskStore`) — persistent task state between requests

## ✅ Verified Working

| Check | Status |
|-------|--------|
| Worker syntax | ✅ `node --check index.js` passes |
| Health endpoint | `GET /health` |
| Task dispatch | `POST /task/dispatch` |
| Status polling | `GET /task/status/:id` |
| Deployment verify | `POST /task/verify` |
| Build notify | `POST /task/build` |

## Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check — always fast |
| `POST` | `/task/dispatch` | Queue any supported task type |
| `GET` | `/task/status/:id` | Poll task result by ID |
| `POST` | `/task/verify` | Shorthand: verify all deployment endpoints |
| `POST` | `/task/build` | Shorthand: send build completion notification |

## Task Types

```json
{ "type": "verify-deployment", "payload": { "endpoints": ["https://..."] } }
{ "type": "health-check-all",  "payload": {} }
{ "type": "domain-verify",     "payload": { "domains": ["brand.blackroad.io"] } }
{ "type": "build-notify",      "payload": { "webhook_url": "...", "sha": "abc" } }
```

## Deploy

```bash
cd workers/tasks
wrangler deploy
```

## Secrets

```bash
wrangler secret put WORKER_AUTH_TOKEN   # optional: protect POST endpoints
wrangler secret put NOTIFY_WEBHOOK_URL  # optional: Slack/Discord webhook
```

## Why Cloudflare Workers for longer tasks?

GitHub Actions runners have generous time limits but cost minutes.  
Cloudflare Workers with `ctx.waitUntil()` can run background work for up to **15 minutes** at the edge, globally, without consuming CI time. Use this worker to:

- Run post-deploy verification checks asynchronously
- Poll domain DNS propagation (can take minutes)
- Send build notifications after deployment
- Run health sweeps across all BlackRoad OS endpoints
