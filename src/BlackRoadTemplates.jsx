import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";

// ─── SHARED STYLES ───
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ─── TEMPLATE SELECTOR ───
export default function BlackRoadTemplates() {
  const [active, setActive] = useState("dashboard");

  const templates = [
    { id: "dashboard", label: "Dashboard" },
    { id: "report", label: "Report" },
    { id: "landing", label: "Landing" },
    { id: "profile", label: "Agent Profile" },
    { id: "table", label: "Data Table" },
    { id: "cards", label: "Card Grid" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "dashboard": return <DashboardTemplate />;
      case "report": return <ReportTemplate />;
      case "landing": return <LandingTemplate />;
      case "profile": return <AgentProfileTemplate />;
      case "table": return <DataTableTemplate />;
      case "cards": return <CardGridTemplate />;
      default: return <DashboardTemplate />;
    }
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: font.mono }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />

      {/* Top gradient rule */}
      <div style={{ height: 3, background: GRAD }} />

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 48, borderBottom: "1px solid #fff",
        position: "sticky", top: 0, zIndex: 100, background: "#000",
      }}>
        <span style={{ fontFamily: font.headline, fontWeight: 700, fontSize: "0.85rem" }}>BlackRoad</span>
        <div style={{ display: "flex", gap: 20 }}>
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                background: "none", border: "none", color: "#fff",
                opacity: active === t.id ? 1 : 0.35,
                fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: font.mono, transition: "opacity 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Active template */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        {renderTemplate()}
      </div>

      {/* Footer */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px", display: "flex", justifyContent: "space-between", fontSize: "0.5rem", opacity: 0.18 }}>
        <span>BlackRoad OS, Inc. · Design System v1.0</span>
        <span>JetBrains Mono · Space Grotesk</span>
      </div>
      <div style={{ height: 3, background: GRAD }} />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. DASHBOARD TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DashboardTemplate() {
  const kpis = [
    { label: "Agents Online", value: "117", delta: "+3" },
    { label: "Memory Events", value: "2.4M", delta: "+12K" },
    { label: "Uptime", value: "99.97%", delta: "" },
    { label: "Latency (p99)", value: "42ms", delta: "-8ms" },
  ];

  const agents = [
    { name: "cecilia", status: "active", color: "#FF8400", load: 72 },
    { name: "cadence", status: "processing", color: "#0066FF", load: 45 },
    { name: "eve", status: "alert", color: "#FF0066", load: 91 },
    { name: "alice", status: "active", color: "#FF8400", load: 38 },
    { name: "olympia", status: "offline", color: "rgba(255,255,255,0.15)", load: 0 },
  ];

  const timeline = [
    { time: "14:32", event: "cecilia → memory commit #4821", tag: "MEMORY" },
    { time: "14:28", event: "eve → anomaly detected in mesh.na1", tag: "ALERT" },
    { time: "14:15", event: "cadence → composition exported", tag: "TASK" },
    { time: "14:02", event: "alice → gateway health check passed", tag: "INFRA" },
    { time: "13:55", event: "System → ledger checkpoint written", tag: "LEDGER" },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          System Overview · Live
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2.4rem, 8vw, 4rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>
          Dashboard
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />

        {/* KPIs */}
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {kpis.map((k, i) => (
            <div key={i} style={{
              paddingRight: 32, marginRight: 32,
              borderRight: i < kpis.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}>
              <div style={{ fontFamily: font.headline, fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: "0.46rem", opacity: 0.3, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{k.label}</div>
              {k.delta && <div style={{ fontSize: "0.48rem", opacity: 0.4, marginTop: 2 }}>{k.delta}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Agent Status */}
      <Section label="Agent Status">
        {agents.map((a, i) => (
          <Row key={i} last={i === agents.length - 1}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 140 }}>
              <Dot color={a.color} pulse={a.status === "alert"} />
              <span style={{ fontSize: "0.62rem", fontWeight: 700 }}>{a.name}</span>
            </div>
            <span style={{ fontSize: "0.5rem", opacity: 0.35, letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 90 }}>{a.status}</span>
            <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.06)", position: "relative" }}>
              <div style={{ height: 2, background: "#fff", width: `${a.load}%`, opacity: a.load > 0 ? 0.6 : 0 }} />
            </div>
            <span style={{ fontSize: "0.48rem", opacity: 0.25, minWidth: 40, textAlign: "right" }}>{a.load}%</span>
          </Row>
        ))}
      </Section>

      {/* Activity Timeline */}
      <Section label="Activity Timeline">
        {timeline.map((t, i) => (
          <Row key={i} last={i === timeline.length - 1}>
            <span style={{ fontSize: "0.5rem", opacity: 0.25, minWidth: 48 }}>{t.time}</span>
            <span style={{ fontSize: "0.54rem", opacity: 0.5, flex: 1 }}>{t.event}</span>
            <Badge>{t.tag}</Badge>
          </Row>
        ))}
      </Section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. REPORT TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ReportTemplate() {
  const metrics = [
    { label: "Total Requests", value: "1.2M", prev: "980K" },
    { label: "Error Rate", value: "0.03%", prev: "0.07%" },
    { label: "Avg Response", value: "38ms", prev: "52ms" },
  ];

  const sections = [
    {
      title: "Infrastructure Summary",
      body: "All primary services maintained target SLAs throughout the reporting period. Gateway throughput increased 22% following the connection pool optimization deployed in week 3. Memory service latency improved after the vector index rebuild on March 1.",
    },
    {
      title: "Agent Performance",
      body: "117 agents operated within normal parameters. Cecilia processed 4,821 memory commits with zero data loss. Eve flagged 3 anomalies in the NA1 mesh cluster, all resolved within SLA. Cadence completed 89 composition tasks with a 94% user satisfaction score.",
    },
    {
      title: "Governance & Compliance",
      body: "Cece evaluated 12,400 policy decisions with 100% ledger coverage. Zero policy bypasses detected. Two new education-specific policies were deployed for the RoadWork vertical, enforcing role-based access on assignment creation and review flows.",
    },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Weekly Operations Report · March 3, 2026
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          System<br />Performance
        </h1>
        <p style={{ fontSize: "0.68rem", opacity: 0.4, lineHeight: 1.9, maxWidth: 480, marginTop: 20 }}>
          Consolidated performance metrics and operational summary for the BlackRoad OS infrastructure layer.
        </p>
        <div style={{ height: 1, background: GRAD, width: 160, margin: "28px 0" }} />

        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {metrics.map((m, i) => (
            <div key={i} style={{
              paddingRight: 32, marginRight: 32,
              borderRight: i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}>
              <div style={{ fontFamily: font.headline, fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: "0.46rem", opacity: 0.3, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{m.label}</div>
              <div style={{ fontSize: "0.44rem", opacity: 0.2, marginTop: 2 }}>prev: {m.prev}</div>
            </div>
          ))}
        </div>
      </div>

      {sections.map((s, i) => (
        <Section key={i} label={`0${i + 1} · ${s.title}`}>
          <div style={{ fontSize: "0.68rem", opacity: 0.45, lineHeight: 2, maxWidth: 640 }}>
            {s.body}
          </div>
        </Section>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. LANDING TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LandingTemplate() {
  const features = [
    { num: "01", title: "Persistent Memory", desc: "PS-SHA∞ cryptographic hashing for append-only memory journals that never forget." },
    { num: "02", title: "Trinary Logic", desc: "1/0/-1 states handle uncertainty and contradiction natively. Zero is superposition." },
    { num: "03", title: "Agent Mesh", desc: "30,000+ agents coordinated via NATS event bus and K3s orchestration." },
    { num: "04", title: "Governance First", desc: "Every action passes through Cece — policy checked, delegation verified, ledger updated." },
  ];

  return (
    <div>
      <div style={{ padding: "80px 0 56px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
          The Road Home for AI
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(3rem, 11vw, 6rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0 }}>
          Black<br />Road OS
        </h1>
        <p style={{ fontSize: "0.72rem", opacity: 0.4, lineHeight: 1.9, maxWidth: 440, marginTop: 24 }}>
          A distributed AI operating system built on novel mathematical foundations. Contradictions don't break the system — they fuel it.
        </p>
        <div style={{ height: 2, background: GRAD, width: 200, margin: "32px 0" }} />
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{
            fontFamily: font.mono, fontSize: "0.58rem", fontWeight: 700,
            background: "#fff", color: "#000", padding: "10px 20px",
            border: "none", cursor: "pointer", letterSpacing: "0.05em",
          }}>
            Get Started
          </button>
          <button style={{
            fontFamily: font.mono, fontSize: "0.58rem", fontWeight: 700,
            background: "transparent", color: "#fff", padding: "9px 19px",
            border: "1px solid #fff", cursor: "pointer", letterSpacing: "0.05em",
          }}>
            Documentation
          </button>
        </div>
      </div>

      <Section label="Core Capabilities">
        {features.map((f, i) => (
          <Row key={i} last={i === features.length - 1}>
            <span style={{ fontSize: "0.48rem", opacity: 0.2, minWidth: 28 }}>{f.num}</span>
            <div style={{ minWidth: 160 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700 }}>{f.title}</div>
            </div>
            <div style={{ flex: 1, fontSize: "0.56rem", opacity: 0.35, lineHeight: 1.7 }}>{f.desc}</div>
          </Row>
        ))}
      </Section>

      {/* CTA */}
      <div style={{ padding: "56px 0 48px", borderBottom: "1px solid #fff", textAlign: "center" }}>
        <div style={{ fontFamily: font.headline, fontSize: "1.6rem", fontWeight: 700, marginBottom: 8 }}>
          Build with us.
        </div>
        <div style={{ fontSize: "0.56rem", opacity: 0.35, marginBottom: 24 }}>
          1,000 agents. Persistent memory. Community-first.
        </div>
        <div style={{ height: 2, background: GRAD, width: 80, margin: "0 auto" }} />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. AGENT PROFILE TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AgentProfileTemplate() {
  const capabilities = ["memory-persistence", "natural-language", "code-execution", "governance-eval", "mesh-coordination"];
  const recentActions = [
    { time: "2m ago", action: "Memory commit #4821 written", result: "OK" },
    { time: "8m ago", action: "Policy evaluation for edu.review", result: "ALLOW" },
    { time: "15m ago", action: "Heartbeat to mesh.na1", result: "OK" },
    { time: "22m ago", action: "Ledger checkpoint #892", result: "OK" },
    { time: "34m ago", action: "Anomaly scan on gateway latency", result: "CLEAR" },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Agent Identity · Verified
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <Dot color="#FF8400" size={14} />
          <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>
            Cecilia
          </h1>
          <Badge>ACTIVE</Badge>
        </div>
        <p style={{ fontSize: "0.62rem", opacity: 0.4, lineHeight: 1.9, maxWidth: 500 }}>
          Primary governance agent. Handles policy evaluation, ledger management, and system-wide coordination across all BlackRoad OS infrastructure layers.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />

        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {[
            { v: "4,821", l: "Memory Commits" },
            { v: "12,400", l: "Policy Evals" },
            { v: "99.99%", l: "Uptime" },
            { v: "Nov 2025", l: "Birth Date" },
          ].map((s, i, arr) => (
            <div key={i} style={{
              paddingRight: 28, marginRight: 28,
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}>
              <div style={{ fontFamily: font.headline, fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: "0.44rem", opacity: 0.3, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <Section label="Capabilities">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "8px 0" }}>
          {capabilities.map((c, i) => (
            <span key={i} style={{
              fontSize: "0.48rem", fontWeight: 700, padding: "3px 8px",
              border: "1px solid #fff", letterSpacing: "0.08em",
            }}>
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section label="Recent Actions">
        {recentActions.map((a, i) => (
          <Row key={i} last={i === recentActions.length - 1}>
            <span style={{ fontSize: "0.48rem", opacity: 0.2, minWidth: 64 }}>{a.time}</span>
            <span style={{ fontSize: "0.54rem", opacity: 0.5, flex: 1 }}>{a.action}</span>
            <span style={{ fontSize: "0.48rem", fontWeight: 700, opacity: a.result === "ALLOW" ? 0.6 : 0.3 }}>{a.result}</span>
          </Row>
        ))}
      </Section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. DATA TABLE TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DataTableTemplate() {
  const headers = ["Service", "Status", "Latency", "Requests/s", "Error %", "Region"];
  const rows = [
    ["api.blackroad.io", "UP", "12ms", "4,200", "0.01%", "NA1"],
    ["app.blackroad.io", "UP", "38ms", "8,100", "0.02%", "NA1"],
    ["gov.api.blackroad.io", "UP", "22ms", "1,800", "0.00%", "NA1"],
    ["mesh.blackroad.network", "UP", "8ms", "12,400", "0.03%", "GLOBAL"],
    ["ledger.blackroad.systems", "UP", "45ms", "980", "0.00%", "NA1"],
    ["edu.blackroad.io", "UP", "41ms", "2,300", "0.01%", "NA1"],
    ["ws.blackroad.io", "UP", "5ms", "6,700", "0.00%", "NA1"],
    ["vectors.blackroad.systems", "DEGRADED", "120ms", "450", "0.12%", "NA1"],
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Infrastructure · Real-Time
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Service Status
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />
      </div>

      <div style={{ padding: "32px 0 48px", borderBottom: "1px solid #fff", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{
                  fontSize: "0.46rem", opacity: 0.3, letterSpacing: "0.15em", textTransform: "uppercase",
                  textAlign: "left", padding: "8px 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.15)",
                  fontWeight: 400,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    fontSize: "0.56rem", padding: "10px 12px",
                    opacity: ci === 0 ? 0.8 : 0.45,
                    fontWeight: ci === 0 ? 700 : 400,
                  }}>
                    {ci === 1 ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Dot color={cell === "UP" ? "#FF8400" : "#FF0066"} size={6} />
                        {cell}
                      </span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. CARD GRID TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CardGridTemplate() {
  const portals = [
    { name: "Lucidia", domain: "lucidia.earth", desc: "Master AI companion with persistent memory and trinary logic core.", status: "Live" },
    { name: "RoadWork", domain: "edu.blackroad.io", desc: "Adaptive learning that generates content for your style in real-time.", status: "Beta" },
    { name: "RoadView", domain: "roadview.blackroad.io", desc: "Truth-first search with verification network and confidence scoring.", status: "Dev" },
    { name: "RoadGlitch", domain: "glitch.blackroad.io", desc: "Universal connector marketplace and visual workflow builder.", status: "Planned" },
    { name: "RoadWorld", domain: "world.blackroad.io", desc: "Virtual reality sandbox with 80% creator revenue share.", status: "Planned" },
    { name: "BackRoad", domain: "social.blackroad.io", desc: "Social without the sickness. No visible metrics. Depth over vanity.", status: "Planned" },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Product Portfolio · Six Core Portals
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Portals
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 0, padding: "0",
      }}>
        {portals.map((p, i) => (
          <div key={i} style={{
            padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
            borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
            paddingRight: i % 2 === 0 ? 28 : 0,
            paddingLeft: i % 2 === 1 ? 28 : 0,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: font.headline, fontSize: "1.1rem", fontWeight: 700 }}>{p.name}</span>
              <Badge>{p.status.toUpperCase()}</Badge>
            </div>
            <div style={{ fontSize: "0.48rem", opacity: 0.25, marginBottom: 10, letterSpacing: "0.05em" }}>{p.domain}</div>
            <div style={{ fontSize: "0.56rem", opacity: 0.4, lineHeight: 1.7 }}>{p.desc}</div>
            <div style={{ height: 1, background: GRAD, width: 40, marginTop: 16, opacity: 0.6 }} />
          </div>
        ))}
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

function Row({ children, last }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
      borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.06)",
      flexWrap: "wrap",
    }}>
      {children}
    </div>
  );
}

function Dot({ color, size = 7, pulse }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%", background: color,
      display: "inline-block", flexShrink: 0,
      animation: pulse ? "pulse-dot 1.5s ease-in-out infinite" : "none",
    }} />
  );
}

function Badge({ children }) {
  return (
    <span style={{
      fontSize: "0.44rem", fontWeight: 700, padding: "2px 7px",
      border: "1px solid #fff", letterSpacing: "0.1em",
      fontFamily: font.mono,
    }}>
      {children}
    </span>
  );
}
