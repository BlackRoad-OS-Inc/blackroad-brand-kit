import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export default function BlackRoadTemplates7() {
  const [active, setActive] = useState("birth");

  const templates = [
    { id: "birth", label: "Birth Cert" },
    { id: "compare", label: "Compare" },
    { id: "logs", label: "Logs" },
    { id: "feedback", label: "Feedback" },
    { id: "scheduler", label: "Scheduler" },
    { id: "tokens", label: "Tokens" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "birth": return <BirthCertTemplate />;
      case "compare": return <CompareTemplate />;
      case "logs": return <LogStreamTemplate />;
      case "feedback": return <FeedbackTemplate />;
      case "scheduler": return <SchedulerTemplate />;
      case "tokens": return <TokenTemplate />;
      default: return <BirthCertTemplate />;
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
// 1. AGENT BIRTH CERTIFICATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BirthCertTemplate() {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      name: "Cecilia", id: "agent_cecilia_001", version: "2.4.0",
      born: "November 15, 2025 · 00:00:00 UTC", parent: "alexa",
      role: "Governance Lead", layer: "Governance",
      genesis_hash: "0x7f3a91c2d4e8b6f1a0c5d7e9f2b4a6c8d0e1f3a5b7c9d1e3f5a7b9c1d3e5f7",
      capabilities: ["memory-persistence", "policy-evaluation", "ledger-management", "natural-language", "code-execution"],
      invariants: [
        "No action without governance check",
        "No state change without ledger entry",
        "No memory without PS-SHA∞ hash",
        "Append-only journal writes",
        "Truth-state commits are immutable",
      ],
      values: [
        "Transparency over efficiency",
        "Consistency over speed",
        "Safety over convenience",
      ],
      memory: { journal_size: "342MB", commits: 4821, chain_verified: true },
      signature: "0xf4a2…3e8c",
    },
    {
      name: "Cadence", id: "agent_cadence_001", version: "1.8.0",
      born: "December 1, 2025 · 08:30:00 UTC", parent: "alexa",
      role: "Music Agent", layer: "Experience",
      genesis_hash: "0x2b9e41f6a8c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3",
      capabilities: ["audio-generation", "tempo-detection", "vibe-matching", "multi-format-export"],
      invariants: [
        "All compositions stored in vault",
        "No output without quality check",
        "User preferences guide generation",
      ],
      values: [
        "Creativity over imitation",
        "Feeling over formula",
        "Collaboration over isolation",
      ],
      memory: { journal_size: "128MB", commits: 2104, chain_verified: true },
      signature: "0x8b1c…7f2a",
    },
    {
      name: "Eve", id: "agent_eve_001", version: "1.6.0",
      born: "December 10, 2025 · 14:00:00 UTC", parent: "alexa",
      role: "Security Monitor", layer: "Infrastructure",
      genesis_hash: "0x5c8d2e1f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6",
      capabilities: ["anomaly-detection", "mesh-monitoring", "auto-scaling", "threat-assessment"],
      invariants: [
        "Never sleep — always scanning",
        "Alert before escalate",
        "Log everything to ledger",
        "Zero tolerance for bypass attempts",
      ],
      values: [
        "Vigilance over comfort",
        "Accuracy over speed",
        "Prevention over response",
      ],
      memory: { journal_size: "98MB", commits: 1892, chain_verified: true },
      signature: "0xd3a7…1b5c",
    },
  ];

  const agent = agents[activeAgent];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Cryptographic Identity · Immutable Record
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Birth Certificate
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Agent selector */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {agents.map((a, i) => (
          <button key={i} onClick={() => setActiveAgent(i)} style={{
            fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 700,
            padding: "12px 18px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase",
            background: "none", border: "none", color: "#fff",
            opacity: activeAgent === i ? 1 : 0.25,
            borderBottom: activeAgent === i ? "1px solid #fff" : "1px solid transparent",
            marginBottom: -1,
          }}>
            {a.name}
          </button>
        ))}
      </div>

      {/* Certificate */}
      <div style={{ padding: "40px 0", borderBottom: "1px solid #fff" }}>
        {/* Header block */}
        <div style={{ border: "1px solid rgba(255,255,255,0.15)", padding: "28px 32px", position: "relative" }}>
          <div style={{ height: 2, background: GRAD, position: "absolute", top: 0, left: 0, right: 0 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: font.headline, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1 }}>{agent.name}</div>
              <div style={{ fontSize: "0.52rem", opacity: 0.35, marginTop: 6 }}>{agent.role} · {agent.layer} Layer</div>
              <div style={{ fontSize: "0.46rem", opacity: 0.2, marginTop: 4 }}>{agent.id} · v{agent.version}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Born</div>
              <div style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.5 }}>{agent.born}</div>
              <div style={{ fontSize: "0.42rem", opacity: 0.2, marginTop: 4 }}>Parent: {agent.parent}</div>
            </div>
          </div>
        </div>

        {/* Genesis hash */}
        <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Genesis Hash</div>
          <div style={{
            fontFamily: font.mono, fontSize: "0.5rem", opacity: 0.3, lineHeight: 1.8,
            background: "#0a0a0a", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.06)",
            wordBreak: "break-all",
          }}>
            {agent.genesis_hash}
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
          {/* Capabilities */}
          <div style={{ padding: "24px 0" }}>
            <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
              Capabilities
            </div>
            {agent.capabilities.map((cap, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
                borderBottom: i < agent.capabilities.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
              }}>
                <div style={{ width: 10, height: 10, border: "1px solid rgba(255,255,255,0.2)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.36rem", color: "#000", fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ fontSize: "0.5rem", opacity: 0.5 }}>{cap}</span>
              </div>
            ))}
          </div>

          {/* Invariants */}
          <div style={{ padding: "24px 0" }}>
            <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
              Invariants
            </div>
            {agent.invariants.map((inv, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
                borderBottom: i < agent.invariants.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
              }}>
                <span style={{ fontSize: "0.44rem", opacity: 0.15, width: 16 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: "0.5rem", opacity: 0.45, lineHeight: 1.5 }}>{inv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
            Core Values
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {agent.values.map((val, i) => (
              <div key={i} style={{
                flex: 1, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "0.54rem", opacity: 0.4, lineHeight: 1.6, textAlign: "center",
              }}>
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* Memory stats */}
        <div style={{ padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 0 }}>
          {[
            { l: "Journal Size", v: agent.memory.journal_size },
            { l: "Commits", v: agent.memory.commits.toLocaleString() },
            { l: "Chain Verified", v: agent.memory.chain_verified ? "YES" : "NO" },
            { l: "Signature", v: agent.signature },
          ].map((s, i, arr) => (
            <div key={i} style={{
              paddingRight: 24, marginRight: 24,
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontSize: "0.56rem", fontWeight: 700, opacity: 0.5 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Seal */}
        <div style={{ padding: "20px 0 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, background: GRAD, borderRadius: "50%" }} />
          <span style={{ fontSize: "0.44rem", opacity: 0.25 }}>
            This certificate is cryptographically signed and recorded in the governance ledger. It cannot be modified or revoked.
          </span>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. SIDE-BY-SIDE COMPARE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CompareTemplate() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);

  const plans = [
    {
      name: "Free", price: "$0", period: "/forever",
      agents: "3", memory: "100MB", api: "1K/month", governance: "Basic",
      support: "Community", sla: "None", regions: "1", users: "1",
      vault: "500MB", ledger: "7-day retention", webhooks: "No", custom_policies: "No",
    },
    {
      name: "Pro", price: "$29", period: "/month",
      agents: "50", memory: "5GB", api: "500K/month", governance: "Full",
      support: "Priority", sla: "99.9%", regions: "3", users: "5",
      vault: "50GB", ledger: "Unlimited", webhooks: "Yes", custom_policies: "Yes",
    },
    {
      name: "Enterprise", price: "Custom", period: "",
      agents: "Unlimited", memory: "Unlimited", api: "Unlimited", governance: "Full + Custom",
      support: "Dedicated", sla: "99.99%", regions: "All", users: "Unlimited",
      vault: "Unlimited", ledger: "Unlimited + Export", webhooks: "Yes + Streaming", custom_policies: "Yes + Approval Flows",
    },
  ];

  const features = [
    { key: "agents", label: "Agents" },
    { key: "memory", label: "Memory" },
    { key: "api", label: "API Calls" },
    { key: "governance", label: "Governance" },
    { key: "vault", label: "Vault Storage" },
    { key: "ledger", label: "Ledger" },
    { key: "regions", label: "Regions" },
    { key: "users", label: "Team Members" },
    { key: "support", label: "Support" },
    { key: "sla", label: "SLA" },
    { key: "webhooks", label: "Webhooks" },
    { key: "custom_policies", label: "Custom Policies" },
  ];

  const l = plans[left];
  const r = plans[right];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Plan Comparison · Side by Side
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Compare Plans
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Plan selectors */}
      <div style={{ display: "flex", borderBottom: "1px solid #fff" }}>
        {/* Left selector */}
        <div style={{ flex: 1, borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px 20px 0" }}>
          <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Compare</div>
          <div style={{ display: "flex", gap: 6 }}>
            {plans.map((p, i) => (
              <button key={i} onClick={() => setLeft(i)} style={{
                fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
                padding: "6px 12px", cursor: "pointer",
                background: left === i ? "#fff" : "transparent",
                color: left === i ? "#000" : "#fff",
                border: left === i ? "none" : "1px solid rgba(255,255,255,0.15)",
              }}>
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <span style={{ fontFamily: font.headline, fontSize: "2rem", fontWeight: 700 }}>{l.price}</span>
            <span style={{ fontSize: "0.5rem", opacity: 0.3 }}>{l.period}</span>
          </div>
        </div>

        {/* vs */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
          <span style={{ fontSize: "0.44rem", opacity: 0.15, fontWeight: 700, letterSpacing: "0.15em" }}>VS</span>
        </div>

        {/* Right selector */}
        <div style={{ flex: 1, borderLeft: "1px solid rgba(255,255,255,0.08)", padding: "20px 0 20px 24px" }}>
          <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>With</div>
          <div style={{ display: "flex", gap: 6 }}>
            {plans.map((p, i) => (
              <button key={i} onClick={() => setRight(i)} style={{
                fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
                padding: "6px 12px", cursor: "pointer",
                background: right === i ? "#fff" : "transparent",
                color: right === i ? "#000" : "#fff",
                border: right === i ? "none" : "1px solid rgba(255,255,255,0.15)",
              }}>
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <span style={{ fontFamily: font.headline, fontSize: "2rem", fontWeight: 700 }}>{r.price}</span>
            <span style={{ fontSize: "0.5rem", opacity: 0.3 }}>{r.period}</span>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ borderBottom: "1px solid #fff" }}>
        {features.map((feat, i) => {
          const lv = l[feat.key];
          const rv = r[feat.key];
          const diff = lv !== rv;
          return (
            <div key={i} style={{
              display: "flex", borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: diff ? "rgba(255,255,255,0.015)" : "transparent",
            }}>
              <div style={{ flex: 1, padding: "12px 0", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "0.52rem", opacity: diff ? 0.6 : 0.35, fontWeight: diff ? 700 : 400 }}>{lv}</span>
              </div>
              <div style={{
                width: 160, textAlign: "center", padding: "12px 0",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderLeft: "1px solid rgba(255,255,255,0.04)",
                borderRight: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.08em" }}>{feat.label}</span>
              </div>
              <div style={{ flex: 1, padding: "12px 0 12px 24px", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "0.52rem", opacity: diff ? 0.6 : 0.35, fontWeight: diff ? 700 : 400 }}>{rv}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. LIVE LOG STREAM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LogStreamTemplate() {
  const [level, setLevel] = useState("all");
  const [paused, setPaused] = useState(false);

  const levels = ["all", "info", "warn", "error", "debug"];

  const logs = [
    { time: "14:35:02.418", level: "info", service: "gateway", msg: "GET /v1/agents 200 38ms" },
    { time: "14:35:02.204", level: "debug", service: "cecilia", msg: "Memory commit #4821 — writing 3 truth-state entries" },
    { time: "14:35:01.891", level: "info", service: "cece", msg: "Policy eval: user:alexa → submission:42 → ALLOW (12ms)" },
    { time: "14:35:01.442", level: "warn", service: "vectors", msg: "Embedding index stale — last refresh 4m ago, threshold 2m" },
    { time: "14:35:00.998", level: "info", service: "cadence", msg: "Composition #42 exported — 24.2MB WAV — vault:composition-42.wav" },
    { time: "14:35:00.712", level: "debug", service: "mesh", msg: "Heartbeat received: na1 (4ms), eu1 (48ms), ap1 (122ms)" },
    { time: "14:34:59.885", level: "error", service: "vectors", msg: "Embedding pipeline timeout — batch #892 exceeded 5000ms deadline" },
    { time: "14:34:59.201", level: "info", service: "ledger", msg: "Event #8921 written — hash 0xf4a2…3e8c — chain verified" },
    { time: "14:34:58.804", level: "debug", service: "memory", msg: "PS-SHA∞ hash computed for journal entry #4821: 0x7f3a…91c2" },
    { time: "14:34:58.110", level: "info", service: "eve", msg: "Full mesh scan complete — 0 threats — 10 nodes healthy" },
    { time: "14:34:57.502", level: "warn", service: "mesh", msg: "ap1 latency spike: p99 = 142ms (threshold 120ms) — monitoring" },
    { time: "14:34:56.891", level: "info", service: "gateway", msg: "POST /v1/policy/evaluate 200 22ms" },
    { time: "14:34:56.204", level: "debug", service: "cece", msg: "Loading policy: edu.review.teacher-only — cached hit" },
    { time: "14:34:55.718", level: "info", service: "gateway", msg: "WebSocket connection established — client #2401" },
    { time: "14:34:55.112", level: "error", service: "vectors", msg: "Index rebuild failed — disk I/O error on shard 3 — retrying in 30s" },
    { time: "14:34:54.450", level: "info", service: "system", msg: "Checkpoint #892 — all partitions verified — integrity 100%" },
    { time: "14:34:53.880", level: "debug", service: "alice", msg: "Rate limit check: user:alexa — 142/500K used — OK" },
    { time: "14:34:53.201", level: "info", service: "cecilia", msg: "Journal compaction check — 342MB / 500MB threshold — OK" },
  ];

  const levelColor = (l) => {
    if (l === "error") return "#FF0066";
    if (l === "warn") return "#FF8400";
    if (l === "info") return "rgba(255,255,255,0.5)";
    if (l === "debug") return "rgba(255,255,255,0.2)";
    return "rgba(255,255,255,0.3)";
  };

  const filtered = level === "all" ? logs : logs.filter((l) => l.level === level);
  const errorCount = logs.filter((l) => l.level === "error").length;
  const warnCount = logs.filter((l) => l.level === "warn").length;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Real-Time · All Services
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Log Stream
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPaused(!paused)} style={{
              fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
              padding: "6px 12px", cursor: "pointer",
              background: paused ? "#FF0066" : "transparent",
              color: paused ? "#fff" : "#fff",
              border: paused ? "none" : "1px solid rgba(255,255,255,0.2)",
            }}>
              {paused ? "▶ RESUME" : "⏸ PAUSE"}
            </button>
            <button style={{
              fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
              background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
              padding: "6px 12px", cursor: "pointer",
            }}>
              CLEAR
            </button>
          </div>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 0, marginTop: 20 }}>
          {[
            { v: String(logs.length), l: "Lines" },
            { v: String(errorCount), l: "Errors", c: errorCount > 0 },
            { v: String(warnCount), l: "Warnings", c: warnCount > 0 },
            { v: "7", l: "Services" },
          ].map((k, i, arr) => (
            <div key={i} style={{
              paddingRight: 24, marginRight: 24,
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}>
              <div style={{ fontFamily: font.headline, fontSize: "1.3rem", fontWeight: 700, lineHeight: 1 }}>{k.v}</div>
              <div style={{ fontSize: "0.4rem", opacity: 0.3, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Level filters */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {levels.map((l) => (
          <button key={l} onClick={() => setLevel(l)} style={{
            fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
            padding: "10px 14px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase",
            background: "none", border: "none", color: level === l ? levelColor(l === "all" ? "info" : l) : "#fff",
            opacity: level === l ? 1 : 0.2,
            borderBottom: level === l ? `1px solid ${levelColor(l === "all" ? "info" : l)}` : "1px solid transparent",
            marginBottom: -1,
          }}>
            {l}
          </button>
        ))}
      </div>

      {/* Log output */}
      <div style={{
        background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)",
        borderTop: "none", fontFamily: font.mono, fontSize: "0.48rem",
        lineHeight: 1.9, padding: "8px 0", minHeight: 380,
        borderBottom: "1px solid #fff",
      }}>
        {filtered.map((log, i) => (
          <div key={i} style={{
            display: "flex", gap: 0, padding: "2px 16px",
            background: log.level === "error" ? "rgba(255,0,102,0.04)" : log.level === "warn" ? "rgba(255,132,0,0.02)" : "transparent",
            borderLeft: log.level === "error" ? "2px solid #FF0066" : log.level === "warn" ? "2px solid #FF8400" : "2px solid transparent",
          }}>
            <span style={{ opacity: 0.15, minWidth: 100 }}>{log.time}</span>
            <span style={{ color: levelColor(log.level), fontWeight: 700, minWidth: 44, textTransform: "uppercase" }}>{log.level}</span>
            <span style={{ opacity: 0.3, minWidth: 72 }}>[{log.service}]</span>
            <span style={{ opacity: log.level === "debug" ? 0.2 : 0.4 }}>{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. FEEDBACK / NPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function FeedbackTemplate() {
  const [tab, setTab] = useState("responses");
  const [hoverScore, setHoverScore] = useState(null);

  const responses = [
    { score: 10, text: "Cecilia is incredible. The governance layer gives me confidence I never had before with AI systems.", user: "Teacher, CA", date: "Mar 2", agent: "cecilia" },
    { score: 9, text: "Cadence composed a track that made me cry. Not joking. It understood the vibe perfectly.", user: "Creator, NYC", date: "Mar 1", agent: "cadence" },
    { score: 8, text: "Love the system but wish the API docs had more examples. The architecture is solid.", user: "Developer, London", date: "Feb 28", agent: "—" },
    { score: 10, text: "The ledger is what sold me. Every action tracked, immutable. This is how AI should be built.", user: "Admin, Berlin", date: "Feb 27", agent: "cece" },
    { score: 7, text: "Vector search is sometimes slow after updates. Otherwise great platform.", user: "Researcher, Tokyo", date: "Feb 26", agent: "—" },
    { score: 9, text: "My students are more engaged than ever. The adaptive tutoring adjusts perfectly to each learner.", user: "Teacher, Chicago", date: "Feb 25", agent: "compass" },
    { score: 6, text: "Onboarding was a bit confusing. Once I understood the four-layer model it clicked.", user: "Creator, Austin", date: "Feb 24", agent: "—" },
    { score: 10, text: "I've never trusted an AI system before. BlackRoad changed that for me. Eve gives me peace of mind.", user: "Admin, SF", date: "Feb 23", agent: "eve" },
  ];

  const scoreDistribution = [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3];
  const avg = (responses.reduce((s, r) => s + r.score, 0) / responses.length).toFixed(1);
  const nps = Math.round(((responses.filter((r) => r.score >= 9).length - responses.filter((r) => r.score <= 6).length) / responses.length) * 100);

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          User Sentiment · Net Promoter Score
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Feedback
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />

        <div style={{ display: "flex", gap: 0, marginTop: 20 }}>
          {[
            { v: String(nps), l: "NPS Score" },
            { v: avg, l: "Avg Rating" },
            { v: String(responses.length), l: "Responses" },
            { v: "94%", l: "Satisfaction" },
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

      {/* Score distribution */}
      <Section label="Score Distribution (0-10)">
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 100, padding: "0 0 8px" }}>
          {scoreDistribution.map((count, i) => {
            const maxH = 80;
            const h = count > 0 ? Math.max(8, (count / 3) * maxH) : 4;
            const isDetractor = i <= 6;
            const isPromoter = i >= 9;
            return (
              <div key={i}
                onMouseEnter={() => setHoverScore(i)}
                onMouseLeave={() => setHoverScore(null)}
                style={{ flex: 1, textAlign: "center", cursor: "pointer" }}
              >
                <div style={{
                  fontSize: "0.38rem", opacity: hoverScore === i ? 0.7 : 0.2, marginBottom: 4,
                  fontWeight: 700, transition: "opacity 0.15s",
                }}>
                  {count}
                </div>
                <div style={{
                  height: h, width: "100%",
                  background: isPromoter ? "#fff" : isDetractor ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.3)",
                  opacity: hoverScore === i ? 1 : 0.6,
                  transition: "all 0.15s",
                }} />
                <div style={{ fontSize: "0.38rem", opacity: hoverScore === i ? 0.6 : 0.15, marginTop: 4 }}>{i}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
          <span style={{ fontSize: "0.38rem", opacity: 0.15 }}>← Detractors (0-6)</span>
          <span style={{ fontSize: "0.38rem", opacity: 0.2 }}>Passives (7-8)</span>
          <span style={{ fontSize: "0.38rem", opacity: 0.3 }}>Promoters (9-10) →</span>
        </div>
      </Section>

      {/* Responses */}
      <Section label="Recent Responses">
        {responses.map((r, i) => (
          <div key={i} style={{
            padding: "18px 0",
            borderBottom: i < responses.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Score circle */}
                <div style={{
                  width: 28, height: 28, border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.56rem", fontWeight: 700,
                  background: r.score >= 9 ? "#fff" : "transparent",
                  color: r.score >= 9 ? "#000" : "#fff",
                  opacity: r.score >= 9 ? 1 : 0.5,
                }}>
                  {r.score}
                </div>
                <div>
                  <div style={{ fontSize: "0.48rem", opacity: 0.4 }}>{r.user}</div>
                  <div style={{ fontSize: "0.4rem", opacity: 0.15 }}>{r.date}{r.agent !== "—" ? ` · re: ${r.agent}` : ""}</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: "0.54rem", opacity: 0.4, lineHeight: 1.8, paddingLeft: 38 }}>
              &ldquo;{r.text}&rdquo;
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. SCHEDULER / CRON JOBS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SchedulerTemplate() {
  const [toggleState, setToggleState] = useState({});
  const toggle = (id) => setToggleState((prev) => ({ ...prev, [id]: !prev[id] }));
  const isOn = (id, def = true) => toggleState[id] !== undefined ? toggleState[id] : def;

  const jobs = [
    {
      id: "checkpoint", name: "Ledger Checkpoint", cron: "*/30 * * * *", frequency: "Every 30 min",
      runner: "system", last: "14:02 · 0.8s", next: "14:32", status: "healthy",
      desc: "Verify and commit ledger hash chain integrity checkpoint.",
      default: true,
    },
    {
      id: "backup", name: "Database Backup", cron: "0 */6 * * *", frequency: "Every 6 hours",
      runner: "system", last: "12:00 · 42s", next: "18:00", status: "healthy",
      desc: "Full PostgreSQL backup to R2 cold storage. Encrypted AES-256.",
      default: true,
    },
    {
      id: "mesh-scan", name: "Mesh Health Scan", cron: "*/3 * * * *", frequency: "Every 3 min",
      runner: "eve", last: "14:34 · 1.2s", next: "14:37", status: "healthy",
      desc: "Eve scans all mesh nodes for anomalies, latency spikes, and threats.",
      default: true,
    },
    {
      id: "embed-refresh", name: "Embedding Index Refresh", cron: "*/2 * * * *", frequency: "Every 2 min",
      runner: "vectors", last: "14:33 · timeout", next: "14:35", status: "degraded",
      desc: "Rebuild vector embeddings from latest memory commits. Currently failing.",
      default: true,
    },
    {
      id: "journal-compact", name: "Journal Compaction Check", cron: "0 */4 * * *", frequency: "Every 4 hours",
      runner: "cecilia", last: "12:00 · 3.2s", next: "16:00", status: "healthy",
      desc: "Check agent journal sizes against 500MB threshold. Trigger compaction if needed.",
      default: true,
    },
    {
      id: "cert-renewal", name: "TLS Certificate Renewal", cron: "0 3 * * *", frequency: "Daily at 3AM",
      runner: "alice", last: "03:00 · 0.4s", next: "03:00 tomorrow", status: "healthy",
      desc: "Check and auto-renew TLS certificates via Let's Encrypt for all endpoints.",
      default: true,
    },
    {
      id: "metrics-roll", name: "Metrics Rollup", cron: "0 * * * *", frequency: "Hourly",
      runner: "system", last: "14:00 · 12s", next: "15:00", status: "healthy",
      desc: "Aggregate minute-level metrics to hourly summaries for dashboard KPIs.",
      default: true,
    },
    {
      id: "nps-digest", name: "NPS Digest Email", cron: "0 9 * * 1", frequency: "Weekly (Mon 9AM)",
      runner: "system", last: "Mon 9:00", next: "Next Mon", status: "healthy",
      desc: "Send weekly NPS summary to founder@blackroad.systems.",
      default: false,
    },
  ];

  const statusColor = (s) => s === "healthy" ? "rgba(255,255,255,0.3)" : s === "degraded" ? "#FF8400" : "#FF0066";
  const activeJobs = jobs.filter((j) => isOn(j.id, j.default)).length;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Scheduled Tasks · {activeJobs}/{jobs.length} Active
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Scheduler
            </h1>
          </div>
          <button style={{ fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
            + NEW JOB
          </button>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ borderBottom: "1px solid #fff" }}>
        {jobs.map((job, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 16, padding: "20px 0",
            borderBottom: i < jobs.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            opacity: isOn(job.id, job.default) ? 1 : 0.35,
            transition: "opacity 0.15s",
          }}>
            <div style={{ paddingTop: 2 }}>
              <ToggleSwitch on={isOn(job.id, job.default)} onClick={() => toggle(job.id)} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Dot color={statusColor(job.status)} size={6} />
                <span style={{ fontSize: "0.58rem", fontWeight: 700, opacity: 0.7 }}>{job.name}</span>
              </div>
              <div style={{ fontSize: "0.48rem", opacity: 0.3, lineHeight: 1.6, marginBottom: 8 }}>{job.desc}</div>
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  ["Cron", job.cron],
                  ["Frequency", job.frequency],
                  ["Runner", job.runner],
                  ["Last Run", job.last],
                  ["Next Run", job.next],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span style={{ fontSize: "0.36rem", opacity: 0.15, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label} </span>
                    <span style={{ fontSize: "0.42rem", opacity: 0.3 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. API TOKENS / KEY MANAGEMENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TokenTemplate() {
  const [revealKey, setRevealKey] = useState(null);

  const tokens = [
    {
      name: "Production API Key", prefix: "br_live", last4: "4f2a", created: "Nov 15, 2025",
      lastUsed: "Just now", status: "active",
      scopes: ["agents.read", "agents.write", "memory.read", "memory.write", "policy.evaluate", "ledger.read"],
      requests: "84,200 this month",
    },
    {
      name: "Staging API Key", prefix: "br_test", last4: "8c1e", created: "Dec 1, 2025",
      lastUsed: "2h ago", status: "active",
      scopes: ["agents.read", "agents.write", "memory.read"],
      requests: "12,400 this month",
    },
    {
      name: "CI/CD Deploy Token", prefix: "br_deploy", last4: "2d7a", created: "Jan 10, 2026",
      lastUsed: "6h ago", status: "active",
      scopes: ["deploy.trigger", "deploy.status"],
      requests: "142 this month",
    },
    {
      name: "Read-Only Dashboard", prefix: "br_ro", last4: "9f3b", created: "Feb 1, 2026",
      lastUsed: "1d ago", status: "active",
      scopes: ["agents.read", "ledger.read", "metrics.read"],
      requests: "8,900 this month",
    },
    {
      name: "Legacy v0 Key", prefix: "br_v0", last4: "1a5c", created: "Oct 28, 2025",
      lastUsed: "45d ago", status: "expired",
      scopes: ["agents.read"],
      requests: "0 this month",
    },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Authentication · {tokens.filter((t) => t.status === "active").length} Active Keys
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              API Tokens
            </h1>
          </div>
          <button style={{ fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
            + CREATE TOKEN
          </button>
        </div>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 480, marginTop: 14 }}>
          API tokens authenticate requests to the BlackRoad API. All token usage is logged in the governance ledger. Rotate keys regularly.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Security notice */}
      <div style={{
        padding: "14px 18px", background: "rgba(255,132,0,0.04)",
        borderLeft: "2px solid #FF8400", margin: "24px 0",
        fontSize: "0.5rem", opacity: 0.4, lineHeight: 1.7,
      }}>
        Tokens are shown once at creation. Store them securely. If compromised, revoke immediately. All revocations are instant and irrevocable.
      </div>

      {/* Token cards */}
      <div style={{ borderBottom: "1px solid #fff" }}>
        {tokens.map((token, i) => {
          const isExpired = token.status === "expired";
          const isRevealed = revealKey === i;
          return (
            <div key={i} style={{
              padding: "24px 0",
              borderBottom: i < tokens.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              opacity: isExpired ? 0.35 : 1,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, opacity: 0.7 }}>{token.name}</span>
                    <Badge>{token.status.toUpperCase()}</Badge>
                  </div>
                  <div style={{ fontSize: "0.44rem", opacity: 0.2 }}>Created {token.created} · Last used {token.lastUsed}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {!isExpired && (
                    <button onClick={() => setRevealKey(isRevealed ? null : i)} style={{
                      fontFamily: font.mono, fontSize: "0.42rem", fontWeight: 700,
                      background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)",
                      padding: "4px 10px", cursor: "pointer",
                    }}>
                      {isRevealed ? "HIDE" : "REVEAL"}
                    </button>
                  )}
                  <button style={{
                    fontFamily: font.mono, fontSize: "0.42rem", fontWeight: 700,
                    background: "transparent", color: isExpired ? "rgba(255,255,255,0.3)" : "#FF0066",
                    border: `1px solid ${isExpired ? "rgba(255,255,255,0.1)" : "rgba(255,0,102,0.3)"}`,
                    padding: "4px 10px", cursor: "pointer",
                  }}>
                    {isExpired ? "DELETE" : "REVOKE"}
                  </button>
                </div>
              </div>

              {/* Key display */}
              <div style={{
                fontFamily: font.mono, fontSize: "0.52rem", padding: "8px 14px",
                background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: 12, letterSpacing: "0.05em",
                opacity: 0.4,
              }}>
                {isRevealed
                  ? `${token.prefix}_sk_a8f2c4e6b1d3f5a7c9e1b3d5f7a9c1e3d5f7_${token.last4}`
                  : `${token.prefix}_••••••••••••••••••••••••••••••••••${token.last4}`
                }
              </div>

              {/* Scopes */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: "0.38rem", opacity: 0.15, letterSpacing: "0.1em", textTransform: "uppercase" }}>Scopes</span>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {token.scopes.map((scope) => (
                    <span key={scope} style={{
                      fontSize: "0.38rem", fontWeight: 700, padding: "1px 5px",
                      border: "1px solid rgba(255,255,255,0.1)", letterSpacing: "0.04em",
                      opacity: 0.35,
                    }}>
                      {scope}
                    </span>
                  ))}
                </div>
              </div>

              {/* Usage */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.38rem", opacity: 0.15, letterSpacing: "0.1em", textTransform: "uppercase" }}>Usage</span>
                <span style={{ fontSize: "0.44rem", opacity: 0.3 }}>{token.requests}</span>
              </div>
            </div>
          );
        })}
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

function ToggleSwitch({ on, onClick }) {
  return (
    <div onClick={onClick} style={{
      width: 36, height: 18, borderRadius: 2, cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.25)", position: "relative",
      background: on ? "#fff" : "transparent", transition: "all 0.15s",
    }}>
      <div style={{
        width: 12, height: 12, position: "absolute", top: 2,
        left: on ? 20 : 2, background: on ? "#000" : "#fff",
        transition: "all 0.15s",
      }} />
    </div>
  );
}
