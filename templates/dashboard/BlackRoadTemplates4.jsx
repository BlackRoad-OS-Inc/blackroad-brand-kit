import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export default function BlackRoadTemplates4() {
  const [active, setActive] = useState("team");

  const templates = [
    { id: "team", label: "Team" },
    { id: "billing", label: "Billing" },
    { id: "integrations", label: "Integrations" },
    { id: "chat", label: "Chat" },
    { id: "kanban", label: "Kanban" },
    { id: "ledger", label: "Ledger" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "team": return <TeamTemplate />;
      case "billing": return <BillingTemplate />;
      case "integrations": return <IntegrationsTemplate />;
      case "chat": return <ChatTemplate />;
      case "kanban": return <KanbanTemplate />;
      case "ledger": return <LedgerTemplate />;
      default: return <TeamTemplate />;
    }
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: font.mono }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
      <div style={{ height: 3, background: GRAD }} />
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 48, borderBottom: "1px solid #fff",
        position: "sticky", top: 0, zIndex: 100, background: "#000",
      }}>
        <span style={{ fontFamily: font.headline, fontWeight: 700, fontSize: "0.85rem" }}>BlackRoad</span>
        <div style={{ display: "flex", gap: 20 }}>
          {templates.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              background: "none", border: "none", color: "#fff",
              opacity: active === t.id ? 1 : 0.35,
              fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: font.mono, transition: "opacity 0.15s",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </nav>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        {renderTemplate()}
      </div>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px", display: "flex", justifyContent: "space-between", fontSize: "0.5rem", opacity: 0.18 }}>
        <span>BlackRoad OS, Inc. · Design System v1.0</span>
        <span>JetBrains Mono · Space Grotesk</span>
      </div>
      <div style={{ height: 3, background: GRAD }} />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. TEAM / MEMBERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TeamTemplate() {
  const [view, setView] = useState("humans");

  const humans = [
    { name: "Alexa Amundson", role: "Founder", email: "founder@blackroad.systems", status: "online", joined: "Nov 2025" },
    { name: "James Carter", role: "Systems Architect", email: "james@blackroad.systems", status: "online", joined: "Dec 2025" },
    { name: "Priya Nair", role: "ML Engineer", email: "priya@blackroad.systems", status: "away", joined: "Jan 2026" },
    { name: "Marcus Obi", role: "Frontend Lead", email: "marcus@blackroad.systems", status: "offline", joined: "Feb 2026" },
  ];

  const agents = [
    { name: "Cecilia", role: "Governance Lead", capabilities: 5, commits: 4821, status: "active", birth: "Nov 2025" },
    { name: "Cadence", role: "Music Agent", capabilities: 3, commits: 2104, status: "active", birth: "Dec 2025" },
    { name: "Eve", role: "Security Monitor", capabilities: 4, commits: 1892, status: "alert", birth: "Dec 2025" },
    { name: "Alice", role: "Gateway Operator", capabilities: 3, commits: 1567, status: "active", birth: "Jan 2026" },
    { name: "Radius", role: "Math Reasoner", capabilities: 2, commits: 1203, status: "idle", birth: "Jan 2026" },
    { name: "Meridian", role: "Architecture Agent", capabilities: 2, commits: 98, status: "active", birth: "Mar 2026" },
  ];

  const statusDot = (s) => {
    const colors = { online: "#FF8400", active: "#FF8400", away: "rgba(255,255,255,0.35)", alert: "#FF0066", offline: "rgba(255,255,255,0.1)", idle: "rgba(255,255,255,0.25)" };
    return colors[s] || "rgba(255,255,255,0.1)";
  };

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Workspace Members · {humans.length} Humans · {agents.length} Agents
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
            Team
          </h1>
          <button style={{
            fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700,
            background: "#fff", color: "#000", border: "none",
            padding: "6px 14px", cursor: "pointer",
          }}>
            + INVITE
          </button>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {["humans", "agents"].map((v) => (
          <button key={v} onClick={() => setView(v)} style={{
            fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 700,
            padding: "12px 20px", cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase",
            background: "none", border: "none", color: "#fff",
            opacity: view === v ? 1 : 0.25,
            borderBottom: view === v ? "1px solid #fff" : "1px solid transparent",
            marginBottom: -1,
          }}>
            {v} ({v === "humans" ? humans.length : agents.length})
          </button>
        ))}
      </div>

      {view === "humans" ? (
        <Section label="Human Team">
          {humans.map((h, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "16px 0",
              borderBottom: i < humans.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              {/* Avatar placeholder */}
              <div style={{
                width: 32, height: 32, border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.52rem", fontWeight: 700, flexShrink: 0,
              }}>
                {h.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Dot color={statusDot(h.status)} size={6} />
                  <span style={{ fontSize: "0.6rem", fontWeight: 700 }}>{h.name}</span>
                </div>
                <div style={{ fontSize: "0.46rem", opacity: 0.25, marginTop: 2 }}>{h.email}</div>
              </div>
              <Badge>{h.role.toUpperCase()}</Badge>
              <span style={{ fontSize: "0.44rem", opacity: 0.15, minWidth: 70, textAlign: "right" }}>{h.joined}</span>
            </div>
          ))}
        </Section>
      ) : (
        <Section label="Agent Roster">
          {agents.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "16px 0",
              borderBottom: i < agents.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <div style={{
                width: 32, height: 32, border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.44rem", fontWeight: 700, flexShrink: 0,
              }}>
                {a.name.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Dot color={statusDot(a.status)} size={6} />
                  <span style={{ fontSize: "0.6rem", fontWeight: 700 }}>{a.name}</span>
                  <span style={{ fontSize: "0.44rem", opacity: 0.25 }}>{a.role}</span>
                </div>
                <div style={{ fontSize: "0.44rem", opacity: 0.2, marginTop: 2 }}>
                  {a.capabilities} capabilities · {a.commits.toLocaleString()} commits · born {a.birth}
                </div>
              </div>
              <Badge>{a.status.toUpperCase()}</Badge>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. BILLING / INVOICES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BillingTemplate() {
  const invoices = [
    { id: "INV-0006", date: "Mar 1, 2026", amount: "$29.00", status: "CURRENT", items: "Pro Plan · March 2026" },
    { id: "INV-0005", date: "Feb 1, 2026", amount: "$29.00", status: "PAID", items: "Pro Plan · February 2026" },
    { id: "INV-0004", date: "Jan 1, 2026", amount: "$29.00", status: "PAID", items: "Pro Plan · January 2026" },
    { id: "INV-0003", date: "Dec 1, 2025", amount: "$0.00", status: "PAID", items: "Free Plan · December 2025" },
  ];

  const usage = [
    { label: "Agents", used: 23, limit: 50, unit: "agents" },
    { label: "Memory", used: 12.4, limit: 50, unit: "GB" },
    { label: "API Calls", used: 84200, limit: 500000, unit: "calls" },
    { label: "Governance Evals", used: 12400, limit: 100000, unit: "evals" },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Subscription & Usage
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Billing
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Current Plan */}
      <div style={{ padding: "32px 0", borderBottom: "1px solid #fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: font.headline, fontSize: "1.6rem", fontWeight: 700 }}>Pro Plan</span>
            <Badge>ACTIVE</Badge>
          </div>
          <div style={{ fontSize: "0.5rem", opacity: 0.25, marginTop: 4 }}>
            $29/month · Renews March 31, 2026 · Visa ending 4242
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
            background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
            padding: "6px 12px", cursor: "pointer",
          }}>
            CHANGE PLAN
          </button>
          <button style={{
            fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
            background: "#fff", color: "#000", border: "none",
            padding: "6px 12px", cursor: "pointer",
          }}>
            UPDATE PAYMENT
          </button>
        </div>
      </div>

      {/* Usage */}
      <Section label="Current Usage">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 40px" }}>
          {usage.map((u, i) => {
            const pct = typeof u.used === "number" ? (u.used / u.limit) * 100 : 0;
            return (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.52rem", fontWeight: 700 }}>{u.label}</span>
                  <span style={{ fontSize: "0.48rem", opacity: 0.35 }}>
                    {typeof u.used === "number" && u.used > 999 ? `${(u.used / 1000).toFixed(1)}K` : u.used} / {typeof u.limit === "number" && u.limit > 999 ? `${(u.limit / 1000).toFixed(0)}K` : u.limit} {u.unit}
                  </span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ height: 3, background: pct > 80 ? "#FF0066" : "#fff", width: `${Math.min(pct, 100)}%`, opacity: 0.5 }} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Invoice History */}
      <Section label="Invoice History">
        {/* Table header */}
        <div style={{ display: "flex", padding: "8px 0 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {[{ l: "Invoice", f: 1 }, { l: "Date", w: 100 }, { l: "Items", f: 1 }, { l: "Amount", w: 80 }, { l: "Status", w: 80 }].map((h, i) => (
            <span key={i} style={{
              fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase",
              flex: h.f, width: h.w, minWidth: h.w,
            }}>
              {h.l}
            </span>
          ))}
        </div>
        {invoices.map((inv, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", padding: "12px 0",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            <span style={{ fontSize: "0.54rem", fontWeight: 700, flex: 1, opacity: 0.7 }}>{inv.id}</span>
            <span style={{ fontSize: "0.5rem", opacity: 0.3, width: 100, minWidth: 100 }}>{inv.date}</span>
            <span style={{ fontSize: "0.5rem", opacity: 0.35, flex: 1 }}>{inv.items}</span>
            <span style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.6, width: 80, minWidth: 80 }}>{inv.amount}</span>
            <span style={{ width: 80, minWidth: 80 }}>
              <Badge>{inv.status}</Badge>
            </span>
          </div>
        ))}
      </Section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. INTEGRATIONS / CONNECTORS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function IntegrationsTemplate() {
  const [filter, setFilter] = useState("all");

  const integrations = [
    { name: "Cloudflare", category: "infra", status: "connected", desc: "DNS, Workers, KV, R2, D1 — full edge stack.", endpoint: "api.cloudflare.com" },
    { name: "GitHub", category: "dev", status: "connected", desc: "Repos, commits, issues, PRs, Actions.", endpoint: "api.github.com" },
    { name: "Railway", category: "infra", status: "connected", desc: "App hosting, databases, scheduled jobs.", endpoint: "backboard.railway.app" },
    { name: "Stripe", category: "business", status: "connected", desc: "Payments, subscriptions, invoicing.", endpoint: "api.stripe.com" },
    { name: "NATS", category: "infra", status: "connected", desc: "Agent event bus — pub/sub messaging.", endpoint: "nats.blackroad.network" },
    { name: "Notion", category: "productivity", status: "available", desc: "Docs, wikis, project management.", endpoint: "api.notion.com" },
    { name: "Linear", category: "dev", status: "available", desc: "Issue tracking and sprint planning.", endpoint: "api.linear.app" },
    { name: "Vercel", category: "infra", status: "available", desc: "Frontend deployments and edge functions.", endpoint: "api.vercel.com" },
    { name: "Discord", category: "social", status: "available", desc: "Community server, bot, webhooks.", endpoint: "discord.com/api" },
    { name: "Hugging Face", category: "ai", status: "available", desc: "Model hosting, spaces, datasets.", endpoint: "huggingface.co/api" },
    { name: "Supabase", category: "infra", status: "available", desc: "Postgres, auth, realtime, storage.", endpoint: "supabase.co" },
    { name: "Resend", category: "business", status: "available", desc: "Transactional email delivery.", endpoint: "api.resend.com" },
  ];

  const categories = ["all", "infra", "dev", "business", "ai", "productivity", "social"];
  const filtered = filter === "all" ? integrations : integrations.filter((i) => i.category === filter);
  const connected = integrations.filter((i) => i.status === "connected").length;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Connectors · {connected} Active · {integrations.length} Available
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Integrations
        </h1>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 440, marginTop: 14 }}>
          Connect external services to your BlackRoad workspace. Agents can read, write, and react to events across all connected platforms.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} style={{
            fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
            padding: "12px 14px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase",
            background: "none", border: "none", color: "#fff",
            opacity: filter === c ? 1 : 0.2,
            borderBottom: filter === c ? "1px solid #fff" : "1px solid transparent",
            marginBottom: -1,
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: "1px solid #fff" }}>
        {filtered.map((item, i) => (
          <div key={i} style={{
            padding: "24px 0",
            paddingRight: i % 2 === 0 ? 24 : 0,
            paddingLeft: i % 2 === 1 ? 24 : 0,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 24, height: 24, border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.4rem", fontWeight: 700,
                }}>
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <span style={{ fontSize: "0.64rem", fontWeight: 700 }}>{item.name}</span>
              </div>
              {item.status === "connected" ? (
                <Badge>CONNECTED</Badge>
              ) : (
                <button style={{
                  fontFamily: font.mono, fontSize: "0.42rem", fontWeight: 700,
                  background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
                  padding: "3px 8px", cursor: "pointer",
                }}>
                  CONNECT
                </button>
              )}
            </div>
            <div style={{ fontSize: "0.5rem", opacity: 0.35, lineHeight: 1.7, marginBottom: 6 }}>{item.desc}</div>
            <div style={{ fontSize: "0.42rem", opacity: 0.15 }}>{item.endpoint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. CHAT / MESSAGING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChatTemplate() {
  const [activeChannel, setActiveChannel] = useState(0);

  const channels = [
    { name: "general", unread: 0 },
    { name: "cecilia", unread: 2 },
    { name: "engineering", unread: 0 },
    { name: "governance", unread: 1 },
    { name: "music-lab", unread: 0 },
  ];

  const messages = [
    { from: "cecilia", time: "14:32", text: "Memory commit #4821 complete. Journal integrity verified against PS-SHA∞ chain. Three new truth-state entries written.", self: false },
    { from: "alexa", time: "14:33", text: "Nice. What was the content of the latest entry?", self: true },
    { from: "cecilia", time: "14:33", text: "Entry #4821: Updated preference vector for music composition context. Source: Cadence session #89. Confidence: 0.92. No contradictions detected against existing memory.", self: false },
    { from: "alexa", time: "14:34", text: "Can you cross-reference that with the Z-framework equilibrium state?", self: true },
    { from: "cecilia", time: "14:34", text: "Cross-referencing… The preference update aligns with the current Z equilibrium. The feedback variable (w) shifted by 0.03, within normal adaptation range. No rebalancing needed.", self: false },
    { from: "cecilia", time: "14:34", text: "Would you like me to tag this commit for review in the governance ledger, or is the automatic classification sufficient?", self: false },
    { from: "alexa", time: "14:35", text: "Automatic is fine. How's Cadence doing overall?", self: true },
    { from: "cecilia", time: "14:35", text: "Cadence is performing well. 89 compositions completed this cycle. User satisfaction: 94%. Memory footprint is growing steadily — she may need a journal compaction soon. I'll flag it if she crosses the 500MB threshold.", self: false },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Agent Messaging · Real-Time
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Chat
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 480 }}>
        {/* Channel sidebar */}
        <div style={{ width: 180, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 16px 20px 0" }}>
          <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Channels
          </div>
          {channels.map((ch, i) => (
            <div key={i} onClick={() => setActiveChannel(i)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 10px", cursor: "pointer",
              background: activeChannel === i ? "rgba(255,255,255,0.04)" : "transparent",
              borderLeft: activeChannel === i ? "1px solid #fff" : "1px solid transparent",
              marginLeft: -1,
            }}>
              <span style={{ fontSize: "0.52rem", fontWeight: activeChannel === i ? 700 : 400, opacity: activeChannel === i ? 1 : 0.35 }}>
                # {ch.name}
              </span>
              {ch.unread > 0 && (
                <span style={{
                  fontSize: "0.4rem", fontWeight: 700, background: "#fff", color: "#000",
                  width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {ch.unread}
                </span>
              )}
            </div>
          ))}

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />
          <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Direct
          </div>
          {["cecilia", "cadence", "eve"].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", cursor: "pointer" }}>
              <Dot color="#FF8400" size={5} />
              <span style={{ fontSize: "0.5rem", opacity: 0.35 }}>{a}</span>
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Channel header */}
          <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "0.58rem", fontWeight: 700 }}># {channels[activeChannel].name}</span>
            <Dot color="#FF8400" size={5} />
            <span style={{ fontSize: "0.44rem", opacity: 0.2 }}>online</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: 16,
                paddingLeft: msg.self ? 40 : 0,
                paddingRight: msg.self ? 0 : 40,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: "0.5rem", fontWeight: 700, opacity: msg.self ? 0.5 : 0.7 }}>{msg.from}</span>
                  <span style={{ fontSize: "0.4rem", opacity: 0.15 }}>{msg.time}</span>
                </div>
                <div style={{
                  fontSize: "0.56rem", opacity: 0.45, lineHeight: 1.8,
                  padding: "10px 14px",
                  background: msg.self ? "transparent" : "rgba(255,255,255,0.03)",
                  borderLeft: msg.self ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 12, alignItems: "center" }}>
            <input placeholder="Message #cecilia..." readOnly style={{
              fontFamily: font.mono, fontSize: "0.56rem", color: "#fff",
              background: "transparent", border: "none", outline: "none",
              flex: 1, opacity: 0.25, padding: "4px 0",
            }} />
            <button style={{
              fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
              background: "#fff", color: "#000", border: "none",
              padding: "6px 14px", cursor: "pointer",
            }}>
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. KANBAN / TASK BOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function KanbanTemplate() {
  const columns = [
    {
      title: "Backlog", count: 4,
      tasks: [
        { id: "BR-042", title: "Agent birth certificate UI", assignee: "marcus", priority: "MED", tags: ["frontend"] },
        { id: "BR-038", title: "Vault semantic search indexing", assignee: "priya", priority: "HIGH", tags: ["ai", "infra"] },
        { id: "BR-035", title: "RoadWork grade export to PDF", assignee: "—", priority: "LOW", tags: ["edu"] },
        { id: "BR-033", title: "Discord bot webhook integration", assignee: "—", priority: "LOW", tags: ["social"] },
      ],
    },
    {
      title: "In Progress", count: 3,
      tasks: [
        { id: "BR-041", title: "Cece policy editor with live preview", assignee: "james", priority: "HIGH", tags: ["governance"] },
        { id: "BR-040", title: "Multi-region mesh (EU1, AP1)", assignee: "priya", priority: "HIGH", tags: ["infra"] },
        { id: "BR-039", title: "Memory batch write optimization", assignee: "cecilia", priority: "MED", tags: ["memory"] },
      ],
    },
    {
      title: "Review", count: 2,
      tasks: [
        { id: "BR-037", title: "Dashboard real-time KPI cards", assignee: "marcus", priority: "MED", tags: ["frontend"] },
        { id: "BR-036", title: "Ledger event schema v2", assignee: "james", priority: "MED", tags: ["governance"] },
      ],
    },
    {
      title: "Done", count: 3,
      tasks: [
        { id: "BR-034", title: "Auth baseline + role system", assignee: "james", priority: "HIGH", tags: ["auth"] },
        { id: "BR-032", title: "Core app shell deployment", assignee: "marcus", priority: "HIGH", tags: ["frontend"] },
        { id: "BR-031", title: "First Pi agent health check", assignee: "alice", priority: "MED", tags: ["agents"] },
      ],
    },
  ];

  const prioStyle = (p) => p === "HIGH" ? 1 : p === "MED" ? 0.5 : 0.25;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Sprint Board · 12 Tasks
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Kanban
            </h1>
          </div>
          <button style={{
            fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700,
            background: "#fff", color: "#000", border: "none",
            padding: "6px 14px", cursor: "pointer",
          }}>
            + NEW TASK
          </button>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #fff", overflowX: "auto" }}>
        {columns.map((col, ci) => (
          <div key={ci} style={{
            flex: 1, minWidth: 220,
            borderRight: ci < columns.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            padding: ci > 0 ? "0 0 0 0" : 0,
          }}>
            {/* Column header */}
            <div style={{
              padding: "16px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: "0.48rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {col.title}
              </span>
              <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>{col.count}</span>
            </div>

            {/* Tasks */}
            <div style={{ padding: "8px 12px" }}>
              {col.tasks.map((task, ti) => (
                <div key={ti} style={{
                  padding: "14px 0",
                  borderBottom: ti < col.tasks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  cursor: "pointer",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>{task.id}</span>
                    <span style={{ fontSize: "0.38rem", fontWeight: 700, opacity: prioStyle(task.priority), letterSpacing: "0.08em" }}>
                      {task.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.7, marginBottom: 8, lineHeight: 1.4 }}>
                    {task.title}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {task.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: "0.38rem", fontWeight: 700, padding: "1px 5px",
                          border: "1px solid rgba(255,255,255,0.12)", opacity: 0.4, letterSpacing: "0.05em",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: "0.44rem", opacity: 0.25 }}>{task.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. GOVERNANCE LEDGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LedgerTemplate() {
  const [expanded, setExpanded] = useState(null);

  const entries = [
    {
      id: "#8921", time: "14:32:18", actor: "cece", action: "policy.evaluate",
      subject: "user:alexa", resource: "submission:42", decision: "ALLOW",
      reason: "Subject has role=teacher for resource scope edu.review",
      policy: "edu.review.teacher-only", hash: "0xf4a2…3e8c",
    },
    {
      id: "#8920", time: "14:28:04", actor: "eve", action: "anomaly.flag",
      subject: "mesh:na1", resource: "latency:p99", decision: "ALERT",
      reason: "Latency exceeded 120ms threshold for 45 seconds. Auto-scale triggered.",
      policy: "infra.latency-threshold", hash: "0x8b1c…7f2a",
    },
    {
      id: "#8919", time: "14:15:31", actor: "cece", action: "policy.evaluate",
      subject: "agent:cadence", resource: "vault:composition-42", decision: "ALLOW",
      reason: "Agent has write permission for own vault namespace",
      policy: "vault.agent-write-own", hash: "0x2e9d…c4b1",
    },
    {
      id: "#8918", time: "14:02:12", actor: "system", action: "checkpoint.write",
      subject: "ledger:main", resource: "checkpoint:892", decision: "OK",
      reason: "Scheduled checkpoint. All partitions verified. Integrity hash chain valid.",
      policy: "ledger.scheduled-checkpoint", hash: "0x71f8…9a0e",
    },
    {
      id: "#8917", time: "13:55:44", actor: "cece", action: "policy.evaluate",
      subject: "user:marcus", resource: "agent:meridian", decision: "DENY",
      reason: "User does not have agent.spawn permission. Required role: admin or architect.",
      policy: "agent.spawn-permission", hash: "0xd3a7…1b5c",
    },
    {
      id: "#8916", time: "13:48:02", actor: "cecilia", action: "memory.commit",
      subject: "agent:cecilia", resource: "journal:4820", decision: "OK",
      reason: "Append-only write. PS-SHA∞ hash verified. No conflicts.",
      policy: "memory.append-only", hash: "0x5c2e…8f4d",
    },
  ];

  const decisionStyle = (d) => {
    if (d === "ALLOW" || d === "OK") return { opacity: 0.5 };
    if (d === "DENY") return { opacity: 0.8 };
    if (d === "ALERT") return { opacity: 0.7 };
    return { opacity: 0.3 };
  };

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Governance Spine · Immutable Record
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Ledger
        </h1>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 480, marginTop: 14 }}>
          Every policy evaluation, every agent action, every system event — cryptographically chained and immutable. This is the source of truth.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />

        <div style={{ display: "flex", gap: 0, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { v: "8,921", l: "Total Events" },
            { v: "0", l: "Bypasses" },
            { v: "100%", l: "Chain Integrity" },
            { v: "892", l: "Checkpoints" },
          ].map((k, i, arr) => (
            <div key={i} style={{
              paddingRight: 28, marginRight: 28,
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}>
              <div style={{ fontFamily: font.headline, fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}>{k.v}</div>
              <div style={{ fontSize: "0.42rem", opacity: 0.3, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      <Section label="Event Log">
        {entries.map((e, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Summary row */}
            <div
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 0",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "0.44rem", opacity: 0.15, minWidth: 48 }}>{e.id}</span>
              <span style={{ fontSize: "0.44rem", opacity: 0.2, minWidth: 64 }}>{e.time}</span>
              <span style={{ fontSize: "0.5rem", fontWeight: 700, minWidth: 64, opacity: 0.5 }}>{e.actor}</span>
              <span style={{ fontSize: "0.48rem", opacity: 0.35, flex: 1 }}>{e.action}</span>
              <span style={{ fontSize: "0.46rem", fontWeight: 700, minWidth: 48, textAlign: "center", ...decisionStyle(e.decision) }}>
                {e.decision}
              </span>
              <span style={{
                fontSize: "0.48rem", opacity: 0.2,
                transform: expanded === i ? "rotate(90deg)" : "rotate(0)",
                transition: "transform 0.15s",
              }}>
                ▸
              </span>
            </div>

            {/* Expanded detail */}
            {expanded === i && (
              <div style={{
                padding: "0 0 16px 112px",
                display: "grid", gridTemplateColumns: "80px 1fr", gap: "6px 12px",
              }}>
                {[
                  ["subject", e.subject],
                  ["resource", e.resource],
                  ["policy", e.policy],
                  ["reason", e.reason],
                  ["hash", e.hash],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "contents" }}>
                    <span style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                    <span style={{ fontSize: "0.48rem", opacity: 0.4, lineHeight: 1.6 }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </Section>

      {/* Integrity footer */}
      <div style={{ padding: "20px 0 48px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 8, height: 8, background: "#FF8400" }} />
        <span style={{ fontSize: "0.48rem", opacity: 0.35 }}>Chain integrity verified · Last checkpoint 28 minutes ago · Next in 32 minutes</span>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED PRIMITIVES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Section({ label, children }) {
  return (
    <div style={{ padding: "48px 0 40px", borderBottom: "1px solid #fff" }}>
      <div style={{
        fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase",
        marginBottom: 28, display: "flex", alignItems: "center", gap: 12,
      }}>
        {label}
        <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
      </div>
      {children}
    </div>
  );
}

function InputField({ label, placeholder, value }) {
  return (
    <div>
      <div style={{ fontSize: "0.46rem", opacity: 0.3, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </div>
      <input placeholder={placeholder} defaultValue={value} readOnly style={{
        fontFamily: font.mono, fontSize: "0.6rem", color: "#fff",
        background: "transparent", border: "none",
        borderBottom: "1px solid rgba(255,255,255,0.25)",
        padding: "8px 0", width: "100%", outline: "none",
      }} />
    </div>
  );
}

function Dot({ color, size = 7 }) {
  return <span style={{ width: size, height: size, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />;
}

function Badge({ children }) {
  return (
    <span style={{
      fontSize: "0.44rem", fontWeight: 700, padding: "2px 7px",
      border: "1px solid #fff", letterSpacing: "0.1em", fontFamily: font.mono,
    }}>
      {children}
    </span>
  );
}
