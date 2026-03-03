import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export default function BlackRoadTemplates8() {
  const [active, setActive] = useState("graph");

  const templates = [
    { id: "graph", label: "Graph" },
    { id: "migration", label: "Migration" },
    { id: "experiments", label: "Experiments" },
    { id: "contracts", label: "Contracts" },
    { id: "digest", label: "Digest" },
    { id: "error", label: "Errors" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "graph": return <DependencyGraphTemplate />;
      case "migration": return <MigrationTemplate />;
      case "experiments": return <ExperimentsTemplate />;
      case "contracts": return <ContractsTemplate />;
      case "digest": return <DigestTemplate />;
      case "error": return <ErrorTrackerTemplate />;
      default: return <DependencyGraphTemplate />;
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
// 1. DEPENDENCY GRAPH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DependencyGraphTemplate() {
  const [selected, setSelected] = useState(null);

  const layers = [
    {
      name: "Experience", y: 0,
      nodes: [
        { id: "app", label: "app.blackroad.io", x: 20, deps: ["gateway", "ws"], type: "service", health: 100 },
        { id: "roadwork", label: "roadwork.blackroad.io", x: 50, deps: ["gateway", "api"], type: "service", health: 100 },
        { id: "genesis", label: "genesis-road.io", x: 80, deps: ["gateway", "vectors"], type: "service", health: 100 },
      ],
    },
    {
      name: "Governance", y: 1,
      nodes: [
        { id: "cece", label: "Cece Spine", x: 35, deps: ["ledger", "memory"], type: "agent", health: 100 },
        { id: "policy-engine", label: "Policy Engine", x: 65, deps: ["ledger"], type: "service", health: 100 },
      ],
    },
    {
      name: "Infrastructure", y: 2,
      nodes: [
        { id: "gateway", label: "API Gateway", x: 15, deps: ["cece", "nats"], type: "service", health: 100 },
        { id: "api", label: "Core API", x: 35, deps: ["cece", "memory", "vectors"], type: "service", health: 100 },
        { id: "ws", label: "WebSocket", x: 55, deps: ["nats", "gateway"], type: "service", health: 100 },
        { id: "ledger", label: "Ledger", x: 75, deps: ["postgres"], type: "service", health: 100 },
        { id: "vectors", label: "Vector DB", x: 90, deps: ["postgres"], type: "service", health: 82 },
      ],
    },
    {
      name: "Agent Mesh", y: 3,
      nodes: [
        { id: "nats", label: "NATS Bus", x: 20, deps: [], type: "infra", health: 100 },
        { id: "memory", label: "Memory Service", x: 40, deps: ["postgres", "nats"], type: "service", health: 100 },
        { id: "postgres", label: "PostgreSQL", x: 60, deps: [], type: "infra", health: 100 },
        { id: "r2", label: "R2 Storage", x: 80, deps: [], type: "infra", health: 100 },
      ],
    },
  ];

  const allNodes = layers.flatMap((l) => l.nodes.map((n) => ({ ...n, layer: l.name, layerY: l.y })));
  const nodeMap = Object.fromEntries(allNodes.map((n) => [n.id, n]));

  const allEdges = allNodes.flatMap((n) =>
    n.deps.map((d) => ({ from: n.id, to: d }))
  );

  const getX = (x) => `${x}%`;
  const getY = (ly) => 60 + ly * 100;

  const sel = selected ? nodeMap[selected] : null;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          System Architecture · Live Health
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Dependency Graph
        </h1>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 480, marginTop: 14 }}>
          Four-layer stack with live dependency edges. Click any node to inspect health, dependencies, and upstream impact.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff" }}>
        {/* Graph */}
        <div style={{ flex: 1, position: "relative", minHeight: 480, padding: "20px 0" }}>
          {/* Layer labels */}
          {layers.map((l) => (
            <div key={l.name} style={{
              position: "absolute", left: -4, top: getY(l.y) - 20,
              fontSize: "0.4rem", opacity: 0.12, letterSpacing: "0.15em", textTransform: "uppercase",
              writingMode: "vertical-rl", transform: "rotate(180deg)",
            }}>
              {l.name}
            </div>
          ))}

          {/* Layer separators */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              position: "absolute", left: "5%", right: "5%", top: getY(i) + 24,
              height: 1, background: "rgba(255,255,255,0.03)",
            }} />
          ))}

          {/* Edges */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {allEdges.map((edge, i) => {
              const from = nodeMap[edge.from];
              const to = nodeMap[edge.to];
              if (!from || !to) return null;
              const isHighlight = selected === edge.from || selected === edge.to;
              return (
                <line key={i}
                  x1={getX(from.x)} y1={getY(from.layerY) + 12}
                  x2={getX(to.x)} y2={getY(to.layerY) - 8}
                  stroke={isHighlight ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.05)"}
                  strokeWidth={isHighlight ? 1.5 : 0.5}
                  strokeDasharray={isHighlight ? "none" : "3,3"}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {allNodes.map((node) => {
            const isSelected = selected === node.id;
            const isDegraded = node.health < 100;
            return (
              <div key={node.id} onClick={() => setSelected(isSelected ? null : node.id)} style={{
                position: "absolute", left: getX(node.x), top: getY(node.layerY),
                transform: "translate(-50%, -50%)", cursor: "pointer", textAlign: "center",
                zIndex: 5,
              }}>
                <div style={{
                  width: 36, height: 20, margin: "0 auto 4px",
                  border: `1px solid ${isDegraded ? "#FF8400" : isSelected ? "#fff" : "rgba(255,255,255,0.2)"}`,
                  background: isSelected ? "#fff" : isDegraded ? "rgba(255,132,0,0.1)" : "#0a0a0a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}>
                  <span style={{
                    fontSize: "0.36rem", fontWeight: 700, letterSpacing: "0.05em",
                    color: isSelected ? "#000" : isDegraded ? "#FF8400" : "rgba(255,255,255,0.5)",
                  }}>
                    {node.id.toUpperCase().slice(0, 4)}
                  </span>
                </div>
                <div style={{
                  fontSize: "0.38rem", opacity: isSelected ? 0.8 : 0.25, fontWeight: isSelected ? 700 : 400,
                  whiteSpace: "nowrap", transition: "opacity 0.15s",
                }}>
                  {node.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {sel && (
          <div style={{ width: 240, borderLeft: "1px solid rgba(255,255,255,0.08)", padding: "24px 0 24px 20px", flexShrink: 0 }}>
            <div style={{ fontFamily: font.headline, fontSize: "1rem", fontWeight: 700, marginBottom: 2 }}>{sel.label}</div>
            <Badge>{sel.layer.toUpperCase()}</Badge>
            <div style={{ height: 1, background: GRAD, width: 40, margin: "14px 0", opacity: 0.5 }} />

            {[
              ["Type", sel.type],
              ["Health", `${sel.health}%`],
              ["Dependencies", sel.deps.length > 0 ? sel.deps.join(", ") : "None"],
              ["Dependents", allEdges.filter((e) => e.to === sel.id).map((e) => e.from).join(", ") || "None"],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: "0.5rem", opacity: sel.health < 100 && label === "Health" ? 0.8 : 0.5 }}>{value}</div>
              </div>
            ))}

            {sel.health < 100 && (
              <div style={{
                padding: "10px 12px", background: "rgba(255,132,0,0.05)",
                borderLeft: "2px solid #FF8400", marginTop: 8,
                fontSize: "0.44rem", opacity: 0.4, lineHeight: 1.6,
              }}>
                Degraded — embedding index refresh failing. Upstream impact: genesis-road.io search, core API semantic queries.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. DATA MIGRATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MigrationTemplate() {
  const [expandedMig, setExpandedMig] = useState(0);

  const migrations = [
    {
      id: "MIG-012", name: "Add agent capability registry table",
      status: "pending", author: "james", created: "Mar 3, 2026",
      up: `CREATE TABLE agent_capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id),
  capability VARCHAR(100) NOT NULL,
  version VARCHAR(20) NOT NULL,
  installed_at TIMESTAMPTZ DEFAULT NOW(),
  config JSONB DEFAULT '{}',
  UNIQUE(agent_id, capability)
);

CREATE INDEX idx_cap_agent ON agent_capabilities(agent_id);
CREATE INDEX idx_cap_name ON agent_capabilities(capability);`,
      down: `DROP TABLE IF EXISTS agent_capabilities;`,
      tables_affected: ["agent_capabilities (new)"],
      estimated_time: "< 1s",
      breaking: false,
    },
    {
      id: "MIG-011", name: "Add vault metadata columns",
      status: "applied", author: "priya", created: "Mar 1, 2026",
      applied_at: "Mar 1, 14:22 UTC", duration: "0.4s",
      up: `ALTER TABLE vault_files
  ADD COLUMN bpm INTEGER,
  ADD COLUMN musical_key VARCHAR(10),
  ADD COLUMN duration_ms BIGINT,
  ADD COLUMN embedding VECTOR(1536);`,
      down: `ALTER TABLE vault_files
  DROP COLUMN IF EXISTS bpm,
  DROP COLUMN IF EXISTS musical_key,
  DROP COLUMN IF EXISTS duration_ms,
  DROP COLUMN IF EXISTS embedding;`,
      tables_affected: ["vault_files"],
      estimated_time: "0.4s",
      breaking: false,
    },
    {
      id: "MIG-010", name: "Create governance ledger partitions",
      status: "applied", author: "james", created: "Feb 26, 2026",
      applied_at: "Feb 26, 10:00 UTC", duration: "2.1s",
      up: `CREATE TABLE ledger_events_2026_03 PARTITION OF ledger_events
  FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');`,
      down: `DROP TABLE IF EXISTS ledger_events_2026_03;`,
      tables_affected: ["ledger_events_2026_03 (new partition)"],
      estimated_time: "2s",
      breaking: false,
    },
    {
      id: "MIG-009", name: "Add PS-SHA hash column to memory journals",
      status: "applied", author: "cecilia", created: "Feb 20, 2026",
      applied_at: "Feb 20, 08:15 UTC", duration: "12.4s",
      up: `ALTER TABLE memory_journals
  ADD COLUMN ps_sha_hash VARCHAR(128),
  ADD COLUMN chain_parent VARCHAR(128);

UPDATE memory_journals SET ps_sha_hash = encode(sha256(content::bytea), 'hex')
WHERE ps_sha_hash IS NULL;`,
      down: `ALTER TABLE memory_journals
  DROP COLUMN IF EXISTS ps_sha_hash,
  DROP COLUMN IF EXISTS chain_parent;`,
      tables_affected: ["memory_journals"],
      estimated_time: "~12s (backfill)",
      breaking: false,
    },
    {
      id: "MIG-008", name: "Initial schema — agents, users, ledger",
      status: "applied", author: "alexa", created: "Nov 15, 2025",
      applied_at: "Nov 15, 00:00 UTC", duration: "1.8s",
      up: `-- Genesis migration\nCREATE TABLE agents (...);\nCREATE TABLE users (...);\nCREATE TABLE ledger_events (...);`,
      down: `-- Destructive: drops all tables`,
      tables_affected: ["agents", "users", "ledger_events"],
      estimated_time: "1.8s",
      breaking: true,
    },
  ];

  const statusStyle = (s) => {
    if (s === "applied") return { dot: "rgba(255,255,255,0.25)", label: "APPLIED" };
    if (s === "pending") return { dot: "#FF8400", label: "PENDING" };
    if (s === "failed") return { dot: "#FF0066", label: "FAILED" };
    return { dot: "rgba(255,255,255,0.1)", label: s.toUpperCase() };
  };

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Database Schema · {migrations.length} Migrations
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Migrations
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 12px", cursor: "pointer" }}>
              DRY RUN
            </button>
            <button style={{ fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
              MIGRATE
            </button>
          </div>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ borderBottom: "1px solid #fff" }}>
        {migrations.map((mig, i) => {
          const st = statusStyle(mig.status);
          const isExpanded = expandedMig === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div onClick={() => setExpandedMig(isExpanded ? null : i)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "16px 0", cursor: "pointer",
              }}>
                <Dot color={st.dot} size={7} />
                <span style={{ fontSize: "0.44rem", opacity: 0.15, minWidth: 60 }}>{mig.id}</span>
                <span style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.6, flex: 1 }}>{mig.name}</span>
                <span style={{ fontSize: "0.42rem", opacity: 0.2, minWidth: 80, textAlign: "right" }}>{mig.author}</span>
                <Badge>{st.label}</Badge>
                <span style={{ fontSize: "0.48rem", opacity: 0.2, transform: isExpanded ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s" }}>{"\u25b8"}</span>
              </div>

              {isExpanded && (
                <div style={{ padding: "0 0 20px 19px" }}>
                  {/* Meta */}
                  <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
                    {[
                      ["Created", mig.created],
                      mig.applied_at ? ["Applied", mig.applied_at] : null,
                      mig.duration ? ["Duration", mig.duration] : ["Estimated", mig.estimated_time],
                      ["Tables", mig.tables_affected.join(", ")],
                    ].filter(Boolean).map(([l, v]) => (
                      <div key={l}>
                        <span style={{ fontSize: "0.36rem", opacity: 0.15, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l} </span>
                        <span style={{ fontSize: "0.42rem", opacity: 0.3 }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {mig.breaking && (
                    <div style={{
                      padding: "8px 12px", borderLeft: "2px solid #FF0066", background: "rgba(255,0,102,0.03)",
                      fontSize: "0.44rem", opacity: 0.5, marginBottom: 14,
                    }}>
                      {"\u26a0"} Breaking migration — cannot be reversed without data loss.
                    </div>
                  )}

                  {/* Up SQL */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>UP</div>
                    <div style={{
                      background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px",
                    }}>
                      <pre style={{ fontFamily: font.mono, fontSize: "0.46rem", opacity: 0.4, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                        {mig.up}
                      </pre>
                    </div>
                  </div>

                  {/* Down SQL */}
                  <div>
                    <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>DOWN (rollback)</div>
                    <div style={{
                      background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px",
                    }}>
                      <pre style={{ fontFamily: font.mono, fontSize: "0.46rem", opacity: 0.3, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                        {mig.down}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. FEATURE EXPERIMENTS / A/B TESTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ExperimentsTemplate() {
  const [expanded, setExpanded] = useState(0);

  const experiments = [
    {
      id: "EXP-007", name: "Adaptive Agent Greetings",
      status: "running", started: "Feb 25", ends: "Mar 10",
      hypothesis: "Personalized agent greetings based on user history increase engagement by 15%.",
      metric: "Session duration",
      variants: [
        { name: "Control", desc: "Standard greeting", users: 2400, metric_val: "4m 12s", conversion: "62%" },
        { name: "Variant A", desc: "Name + last session context", users: 2380, metric_val: "5m 48s", conversion: "71%", winner: true },
        { name: "Variant B", desc: "Name + mood-aware tone", users: 2410, metric_val: "5m 02s", conversion: "67%" },
      ],
      confidence: "94%",
      traffic: "100%",
    },
    {
      id: "EXP-006", name: "Governance Transparency Banner",
      status: "concluded", started: "Feb 10", ends: "Feb 24",
      hypothesis: "Showing real-time governance decisions in-app increases user trust scores.",
      metric: "Trust NPS",
      variants: [
        { name: "Control", desc: "No banner", users: 1800, metric_val: "72 NPS", conversion: "\u2014" },
        { name: "Variant A", desc: "Subtle bottom bar", users: 1820, metric_val: "81 NPS", conversion: "\u2014", winner: true },
      ],
      confidence: "98%",
      traffic: "50%",
      result: "Variant A shipped \u2192 governance banner now default for all users.",
    },
    {
      id: "EXP-005", name: "Cadence BPM Presets vs. Freeform",
      status: "concluded", started: "Jan 28", ends: "Feb 10",
      hypothesis: "Offering BPM presets (60/90/120/140) reduces time-to-first-composition by 30%.",
      metric: "Time to first output",
      variants: [
        { name: "Control", desc: "Freeform BPM input", users: 900, metric_val: "8m 40s", conversion: "55%" },
        { name: "Variant A", desc: "4 presets + custom", users: 920, metric_val: "3m 12s", conversion: "82%", winner: true },
      ],
      confidence: "99%",
      traffic: "50%",
      result: "Presets shipped. Time-to-first-composition dropped 63%.",
    },
    {
      id: "EXP-004", name: "Dark vs. Ultra-Dark Dashboard",
      status: "killed", started: "Jan 15", ends: "Jan 22",
      hypothesis: "Ultra-dark (#000) background improves readability vs. dark gray (#1a1a1a).",
      metric: "Time-on-page",
      variants: [
        { name: "Control", desc: "#1a1a1a background", users: 500, metric_val: "6m 02s", conversion: "\u2014" },
        { name: "Variant A", desc: "#000000 background", users: 510, metric_val: "6m 08s", conversion: "\u2014" },
      ],
      confidence: "12%",
      traffic: "20%",
      result: "No significant difference. Killed \u2014 kept #000 for brand consistency.",
    },
  ];

  const statusStyle = (s) => {
    if (s === "running") return { color: "#FF8400", label: "RUNNING" };
    if (s === "concluded") return { color: "rgba(255,255,255,0.3)", label: "CONCLUDED" };
    if (s === "killed") return { color: "rgba(255,255,255,0.15)", label: "KILLED" };
    return { color: "rgba(255,255,255,0.1)", label: s.toUpperCase() };
  };

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              A/B Testing · {experiments.filter((e) => e.status === "running").length} Running
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Experiments
            </h1>
          </div>
          <button style={{ fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
            + NEW EXPERIMENT
          </button>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ borderBottom: "1px solid #fff" }}>
        {experiments.map((exp, i) => {
          const st = statusStyle(exp.status);
          const isExpanded = expanded === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div onClick={() => setExpanded(isExpanded ? null : i)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "16px 0", cursor: "pointer",
              }}>
                <Dot color={st.color} size={7} />
                <span style={{ fontSize: "0.44rem", opacity: 0.15, minWidth: 56 }}>{exp.id}</span>
                <span style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.6, flex: 1 }}>{exp.name}</span>
                <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>{exp.started} {"\u2192"} {exp.ends}</span>
                <Badge>{st.label}</Badge>
                <span style={{ fontSize: "0.48rem", opacity: 0.2, transform: isExpanded ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s" }}>{"\u25b8"}</span>
              </div>

              {isExpanded && (
                <div style={{ padding: "0 0 24px 19px" }}>
                  {/* Hypothesis */}
                  <div style={{
                    padding: "12px 16px", borderLeft: "2px solid rgba(255,255,255,0.1)",
                    fontSize: "0.52rem", opacity: 0.4, lineHeight: 1.8, marginBottom: 16,
                    fontStyle: "italic",
                  }}>
                    {exp.hypothesis}
                  </div>

                  <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    {[
                      ["Metric", exp.metric],
                      ["Confidence", exp.confidence],
                      ["Traffic", exp.traffic],
                    ].map(([l, v]) => (
                      <div key={l}>
                        <span style={{ fontSize: "0.38rem", opacity: 0.15, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l} </span>
                        <span style={{ fontSize: "0.46rem", opacity: 0.4, fontWeight: 700 }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Variant table */}
                  <div style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["Variant", "Description", "Users", exp.metric, "Conv."].map((h, hi) => (
                        <span key={hi} style={{
                          fontSize: "0.38rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase",
                          flex: hi <= 1 ? 1 : 0, minWidth: hi > 1 ? 70 : undefined, textAlign: hi > 1 ? "right" : "left",
                        }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    {exp.variants.map((v, vi) => (
                      <div key={vi} style={{
                        display: "flex", alignItems: "center", padding: "10px 12px",
                        borderBottom: vi < exp.variants.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                        background: v.winner ? "rgba(255,255,255,0.025)" : "transparent",
                      }}>
                        <span style={{ flex: 1, fontSize: "0.5rem", fontWeight: v.winner ? 700 : 400, opacity: v.winner ? 0.7 : 0.4 }}>
                          {v.name} {v.winner ? "\u2605" : ""}
                        </span>
                        <span style={{ flex: 1, fontSize: "0.46rem", opacity: 0.3 }}>{v.desc}</span>
                        <span style={{ minWidth: 70, textAlign: "right", fontSize: "0.46rem", opacity: 0.35 }}>{v.users.toLocaleString()}</span>
                        <span style={{ minWidth: 70, textAlign: "right", fontSize: "0.46rem", fontWeight: 700, opacity: v.winner ? 0.7 : 0.35 }}>{v.metric_val}</span>
                        <span style={{ minWidth: 70, textAlign: "right", fontSize: "0.46rem", opacity: 0.35 }}>{v.conversion}</span>
                      </div>
                    ))}
                  </div>

                  {exp.result && (
                    <div style={{ marginTop: 12, fontSize: "0.48rem", opacity: 0.3, lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 700, opacity: 0.6 }}>Result: </span>{exp.result}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. GOVERNANCE CONTRACTS / POLICIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ContractsTemplate() {
  const [activePolicy, setActivePolicy] = useState(0);

  const policies = [
    {
      name: "edu.review.teacher-only", version: "1.0.0", status: "active",
      created: "Feb 28, 2026", author: "alexa", evaluations: 1240,
      description: "Only users with role=teacher can review student submissions in the RoadWork education portal.",
      rule: `WHEN action == "edu.review" AND resource.type == "submission"
  THEN REQUIRE subject.role == "teacher" OR subject.role == "admin"
  OTHERWISE DENY with reason "Teacher or admin role required"`,
      examples: [
        { input: "user:alexa (role=admin) \u2192 submission:42", result: "ALLOW" },
        { input: "user:marcus (role=developer) \u2192 submission:42", result: "DENY" },
      ],
    },
    {
      name: "agent.spawn-permission", version: "1.2.0", status: "active",
      created: "Dec 15, 2025", author: "alexa", evaluations: 890,
      description: "Only admins and architects can spawn new agents. Prevents unauthorized agent creation.",
      rule: `WHEN action == "agent.spawn"
  THEN REQUIRE subject.role IN ["admin", "architect"]
    AND subject.mfa_verified == true
  OTHERWISE DENY with reason "Admin/architect + MFA required"`,
      examples: [
        { input: "user:alexa (role=admin, mfa=true) \u2192 agent.spawn", result: "ALLOW" },
        { input: "user:marcus (role=developer) \u2192 agent.spawn", result: "DENY" },
      ],
    },
    {
      name: "memory.append-only", version: "2.0.0", status: "active",
      created: "Nov 15, 2025", author: "cecilia", evaluations: 4821,
      description: "Memory journal writes must be append-only. No edits or deletions to existing entries. Core invariant.",
      rule: `WHEN action == "memory.write"
  THEN REQUIRE operation == "append"
    AND ps_sha_hash IS NOT NULL
    AND chain_parent == latest_commit_hash
  OTHERWISE DENY with reason "Append-only: edits/deletions prohibited"`,
      examples: [
        { input: "cecilia \u2192 journal:4821 (append, hash valid)", result: "ALLOW" },
        { input: "system \u2192 journal:4820 (update)", result: "DENY" },
      ],
    },
    {
      name: "vault.agent-write-own", version: "1.0.0", status: "active",
      created: "Jan 5, 2026", author: "alexa", evaluations: 2104,
      description: "Agents can write to their own vault namespace but cannot access other agents' namespaces.",
      rule: `WHEN action == "vault.write" AND subject.type == "agent"
  THEN REQUIRE resource.namespace == subject.agent_id
  OTHERWISE DENY with reason "Agents can only write own namespace"`,
      examples: [
        { input: "agent:cadence \u2192 vault:cadence/comp-42.wav", result: "ALLOW" },
        { input: "agent:cadence \u2192 vault:cecilia/journal.dat", result: "DENY" },
      ],
    },
  ];

  const pol = policies[activePolicy];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Cece Governance Spine · Policy Definitions
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Contracts
        </h1>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 480, marginTop: 14 }}>
          Every policy is a contract between users, agents, and infrastructure. Violations are logged. No exceptions.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 480 }}>
        {/* Policy list */}
        <div style={{ width: 280, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 16px 20px 0" }}>
          {policies.map((p, i) => (
            <div key={i} onClick={() => setActivePolicy(i)} style={{
              padding: "12px 10px", cursor: "pointer",
              background: activePolicy === i ? "rgba(255,255,255,0.04)" : "transparent",
              borderLeft: activePolicy === i ? "1px solid #fff" : "1px solid transparent",
              marginBottom: 2,
            }}>
              <div style={{ fontSize: "0.52rem", fontWeight: activePolicy === i ? 700 : 400, opacity: activePolicy === i ? 0.8 : 0.35 }}>
                {p.name}
              </div>
              <div style={{ fontSize: "0.4rem", opacity: 0.15, marginTop: 2 }}>
                v{p.version} · {p.evaluations.toLocaleString()} evals
              </div>
            </div>
          ))}
        </div>

        {/* Policy detail */}
        <div style={{ flex: 1, padding: "20px 0 20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: font.headline, fontSize: "1.2rem", fontWeight: 700 }}>{pol.name}</span>
            <Badge>{pol.status.toUpperCase()}</Badge>
          </div>
          <div style={{ fontSize: "0.42rem", opacity: 0.2, marginBottom: 12 }}>
            v{pol.version} · by {pol.author} · {pol.created}
          </div>
          <div style={{ fontSize: "0.54rem", opacity: 0.4, lineHeight: 1.8, marginBottom: 20 }}>
            {pol.description}
          </div>

          {/* Rule */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              Policy Rule
            </div>
            <div style={{
              background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px",
            }}>
              <pre style={{ fontFamily: font.mono, fontSize: "0.5rem", opacity: 0.45, lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>
                {pol.rule}
              </pre>
            </div>
          </div>

          {/* Examples */}
          <div>
            <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              Test Cases
            </div>
            {pol.examples.map((ex, ei) => (
              <div key={ei} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 14px", marginBottom: 4,
                background: ex.result === "ALLOW" ? "rgba(255,255,255,0.02)" : "rgba(255,0,102,0.02)",
                borderLeft: ex.result === "ALLOW" ? "2px solid rgba(255,255,255,0.15)" : "2px solid rgba(255,0,102,0.3)",
              }}>
                <span style={{ fontSize: "0.48rem", opacity: 0.4 }}>{ex.input}</span>
                <span style={{ fontSize: "0.46rem", fontWeight: 700, opacity: ex.result === "ALLOW" ? 0.5 : 0.7 }}>
                  {ex.result}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 0, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { v: pol.evaluations.toLocaleString(), l: "Evaluations" },
              { v: "0", l: "Bypasses" },
              { v: "100%", l: "Enforcement" },
            ].map((s, i, arr) => (
              <div key={i} style={{
                paddingRight: 20, marginRight: 20,
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontSize: "0.64rem", fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: "0.36rem", opacity: 0.2, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. DAILY DIGEST / SUMMARY EMAIL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DigestTemplate() {
  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Daily Summary · March 3, 2026
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Daily Digest
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Quick stats */}
      <div style={{ padding: "28px 0", borderBottom: "1px solid #fff", display: "flex", gap: 0 }}>
        {[
          { v: "6", l: "Agents Online" },
          { v: "4,821", l: "Memory Commits" },
          { v: "8,921", l: "Ledger Events" },
          { v: "99.97%", l: "Uptime" },
          { v: "84.2K", l: "API Calls" },
          { v: "+62", l: "NPS" },
        ].map((k, i, arr) => (
          <div key={i} style={{
            flex: 1, textAlign: "center",
            borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}>
            <div style={{ fontFamily: font.headline, fontSize: "1.2rem", fontWeight: 700, lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: "0.38rem", opacity: 0.25, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{k.l}</div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <Section label="Highlights">
        {[
          { icon: "\u25b2", title: "Multi-region mesh deployed", desc: "Priya deployed multi-region support. EU1 and AP1 now live alongside NA1. Latency improved 22% for European users." },
          { icon: "\u25c8", title: "Cecilia hit 4,821 commits", desc: "Memory persistence system growing steadily. Journal compaction check passed \u2014 342MB, well within threshold." },
          { icon: "\u266b", title: "Cadence composed 3 tracks today", desc: "Compositions #40-42 exported. User satisfaction on music output: 94%. BPM range: 92-124." },
          { icon: "\u26a0", title: "Vector search degraded (2h)", desc: "Embedding index refresh failing intermittently. Priya investigating \u2014 appears to be cache invalidation after memory commits." },
        ].map((h, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, padding: "16px 0",
            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <span style={{ fontSize: "0.6rem", opacity: 0.2, width: 20, textAlign: "center", flexShrink: 0 }}>{h.icon}</span>
            <div>
              <div style={{ fontSize: "0.56rem", fontWeight: 700, opacity: 0.6, marginBottom: 4 }}>{h.title}</div>
              <div style={{ fontSize: "0.5rem", opacity: 0.35, lineHeight: 1.8 }}>{h.desc}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* Agent Activity */}
      <Section label="Agent Activity Summary">
        {[
          { agent: "Cecilia", actions: "342 policy evals, 18 memory commits, 4 checkpoint verifications", mood: "Steady" },
          { agent: "Cadence", actions: "3 compositions, 12 vibe-matching sessions, 1 vault export", mood: "Creative" },
          { agent: "Eve", actions: "480 mesh scans, 1 anomaly flagged (auto-resolved), 0 threats", mood: "Vigilant" },
          { agent: "Alice", actions: "8.1K gateway requests processed, 0 cert warnings, 2.4K WS connections", mood: "Reliable" },
          { agent: "Radius", actions: "4 proof attempts, 2 verified, 1 in-progress (spiral operator)", mood: "Focused" },
          { agent: "Meridian", actions: "12 architecture queries answered, 3 dependency checks", mood: "Exploring" },
        ].map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
            borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <div style={{
              width: 28, height: 28, border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.42rem", fontWeight: 700, flexShrink: 0,
            }}>
              {a.agent.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.6 }}>{a.agent}</span>
                <span style={{ fontSize: "0.4rem", opacity: 0.2, fontStyle: "italic" }}>{a.mood}</span>
              </div>
              <div style={{ fontSize: "0.46rem", opacity: 0.3, marginTop: 2, lineHeight: 1.5 }}>{a.actions}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* Upcoming */}
      <Section label="Tomorrow's Agenda">
        {[
          { time: "09:00", item: "Sprint review \u2014 review deploy-048 results and vector search fix" },
          { time: "11:00", item: "Architecture review \u2014 Meridian's scaling recommendations for EU1 traffic" },
          { time: "14:00", item: "RoadWork demo \u2014 homework grading flow with teacher role integration" },
          { time: "16:00", item: "Cecilia journal compaction \u2014 scheduled if threshold exceeded" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 16, padding: "10px 0",
            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <span style={{ fontSize: "0.48rem", fontWeight: 700, opacity: 0.3, minWidth: 44 }}>{item.time}</span>
            <span style={{ fontSize: "0.5rem", opacity: 0.4, lineHeight: 1.6 }}>{item.item}</span>
          </div>
        ))}
      </Section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. ERROR TRACKER / ISSUE AGGREGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ErrorTrackerTemplate() {
  const [expanded, setExpanded] = useState(0);

  const errors = [
    {
      id: "ERR-042", title: "EmbeddingPipelineTimeout",
      message: "Batch #892 exceeded 5000ms deadline \u2014 shard 3 I/O error",
      service: "vectors", count: 24, first: "14:12", last: "14:34",
      status: "active", severity: "HIGH",
      stack: `VectorService.refreshIndex() at vector-service/src/index.ts:142
  \u2192 EmbeddingPipeline.processBatch() at embedding/pipeline.ts:88
  \u2192 ShardManager.write() at shard/manager.ts:201
  \u2192 Error: ETIMEDOUT \u2014 disk I/O exceeded 5000ms on shard-3`,
      affected: ["api.blackroad.io/v1/memory/search", "genesis-road.io semantic search"],
      resolution: "Auto-retry in 30s. If persists, manual shard rebuild required.",
    },
    {
      id: "ERR-041", title: "WebSocketReconnectLoop",
      message: "Client #2389 stuck in reconnect loop after gateway failover",
      service: "gateway", count: 1, first: "12:44", last: "12:44",
      status: "resolved", severity: "MED",
      stack: `WebSocketManager.onClose() at ws/manager.ts:67
  \u2192 ReconnectPolicy.attempt() at ws/reconnect.ts:23
  \u2192 Error: Max retries (10) exceeded`,
      affected: ["Client dashboard real-time updates"],
      resolution: "Fixed in deploy-047 \u2014 added exponential backoff with jitter.",
    },
    {
      id: "ERR-040", title: "PolicyEvalCacheMiss",
      message: "Cold cache on policy edu.review.teacher-only after deploy",
      service: "cece", count: 3, first: "10:22", last: "10:23",
      status: "resolved", severity: "LOW",
      stack: `PolicyEngine.evaluate() at cece/engine.ts:44
  \u2192 CacheLayer.get() \u2192 MISS
  \u2192 PolicyStore.load() at cece/store.ts:18`,
      affected: ["First 3 review requests post-deploy experienced +80ms latency"],
      resolution: "Expected behavior after deploy. Cache warmed within 30s.",
    },
    {
      id: "ERR-039", title: "JournalWriteConflict",
      message: "Concurrent append attempt on journal:cecilia \u2014 chain_parent mismatch",
      service: "memory", count: 1, first: "09:15", last: "09:15",
      status: "resolved", severity: "MED",
      stack: `MemoryService.append() at memory/service.ts:112
  \u2192 HashChain.verify() at memory/hash.ts:34
  \u2192 Error: chain_parent 0x8b1c does not match HEAD 0xd3a7`,
      affected: ["Single memory commit delayed by 200ms \u2014 auto-retried successfully"],
      resolution: "Optimistic locking worked as designed. Retry succeeded on second attempt.",
    },
  ];

  const sevOpacity = (s) => s === "HIGH" ? 0.8 : s === "MED" ? 0.5 : 0.3;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Exception Tracking · Last 24 Hours
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Error Tracker
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />

        <div style={{ display: "flex", gap: 0, marginTop: 20 }}>
          {[
            { v: String(errors.length), l: "Unique Errors" },
            { v: String(errors.filter((e) => e.status === "active").length), l: "Active" },
            { v: String(errors.reduce((s, e) => s + e.count, 0)), l: "Total Occurrences" },
            { v: String(errors.filter((e) => e.status === "resolved").length), l: "Resolved" },
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

      <div style={{ borderBottom: "1px solid #fff" }}>
        {errors.map((err, i) => {
          const isExpanded = expanded === i;
          const isActive = err.status === "active";
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div onClick={() => setExpanded(isExpanded ? null : i)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "16px 0", cursor: "pointer",
                borderLeft: isActive ? "2px solid #FF0066" : "2px solid transparent",
                paddingLeft: 12,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: "0.42rem", opacity: 0.15 }}>{err.id}</span>
                    <span style={{ fontSize: "0.56rem", fontWeight: 700, opacity: 0.7 }}>{err.title}</span>
                    <span style={{ fontSize: "0.38rem", fontWeight: 700, opacity: sevOpacity(err.severity), letterSpacing: "0.08em" }}>{err.severity}</span>
                  </div>
                  <div style={{ fontSize: "0.46rem", opacity: 0.3, lineHeight: 1.4 }}>{err.message}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.52rem", fontWeight: 700, opacity: 0.5 }}>{"\u00d7"}{err.count}</div>
                  <div style={{ fontSize: "0.4rem", opacity: 0.15 }}>{err.service}</div>
                </div>
                <Badge>{err.status.toUpperCase()}</Badge>
                <span style={{ fontSize: "0.48rem", opacity: 0.2, transform: isExpanded ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s" }}>{"\u25b8"}</span>
              </div>

              {isExpanded && (
                <div style={{ padding: "0 0 20px 26px" }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                    {[
                      ["First seen", err.first],
                      ["Last seen", err.last],
                      ["Occurrences", String(err.count)],
                      ["Service", err.service],
                    ].map(([l, v]) => (
                      <div key={l}>
                        <span style={{ fontSize: "0.36rem", opacity: 0.15, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l} </span>
                        <span style={{ fontSize: "0.44rem", opacity: 0.35 }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack trace */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Stack Trace</div>
                    <div style={{
                      background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px",
                      borderLeft: "2px solid rgba(255,0,102,0.2)",
                    }}>
                      <pre style={{ fontFamily: font.mono, fontSize: "0.44rem", opacity: 0.35, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                        {err.stack}
                      </pre>
                    </div>
                  </div>

                  {/* Affected */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Affected Endpoints</div>
                    {err.affected.map((a, ai) => (
                      <div key={ai} style={{ fontSize: "0.46rem", opacity: 0.35, padding: "3px 0" }}>{"\u00b7"} {a}</div>
                    ))}
                  </div>

                  {/* Resolution */}
                  <div>
                    <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Resolution</div>
                    <div style={{ fontSize: "0.48rem", opacity: 0.4, lineHeight: 1.7 }}>{err.resolution}</div>
                  </div>
                </div>
              )}
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
