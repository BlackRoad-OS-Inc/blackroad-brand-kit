import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export default function BlackRoadTemplates6() {
  const [active, setActive] = useState("deploy");

  const templates = [
    { id: "deploy", label: "Deploy" },
    { id: "wiki", label: "Wiki" },
    { id: "tickets", label: "Tickets" },
    { id: "registry", label: "Registry" },
    { id: "audit", label: "Audit" },
    { id: "alerts", label: "Alerts" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "deploy": return <DeployTemplate />;
      case "wiki": return <WikiTemplate />;
      case "tickets": return <TicketTemplate />;
      case "registry": return <RegistryTemplate />;
      case "audit": return <AuditTemplate />;
      case "alerts": return <AlertsTemplate />;
      default: return <DeployTemplate />;
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
// 1. DEPLOYMENT PIPELINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DeployTemplate() {
  const [expandedDeploy, setExpandedDeploy] = useState(0);

  const pipeline = [
    { stage: "Source", status: "passed", duration: "0s", detail: "main @ a4f2e8c" },
    { stage: "Lint", status: "passed", duration: "12s", detail: "0 errors · 0 warnings" },
    { stage: "Test", status: "passed", duration: "48s", detail: "142 passed · 0 failed · 0 skipped" },
    { stage: "Build", status: "passed", duration: "1m 22s", detail: "Bundle: 842KB gzip" },
    { stage: "Governance", status: "passed", duration: "3s", detail: "Cece policy check — ALLOW" },
    { stage: "Deploy", status: "running", duration: "—", detail: "Rolling to NA1, EU1, AP1…" },
  ];

  const deployments = [
    {
      id: "deploy-048", commit: "a4f2e8c", message: "feat: multi-region mesh support",
      author: "priya", branch: "main", status: "deploying", time: "Just now",
      env: "production", services: ["api", "mesh", "gateway"], duration: "2m 25s",
    },
    {
      id: "deploy-047", commit: "8b1cf3a", message: "fix: websocket reconnection loop on failover",
      author: "james", branch: "main", status: "success", time: "2h ago",
      env: "production", services: ["gateway", "ws"], duration: "3m 12s",
    },
    {
      id: "deploy-046", commit: "c9d4e2b", message: "feat: cece policy editor UI",
      author: "marcus", branch: "main", status: "success", time: "6h ago",
      env: "production", services: ["app"], duration: "2m 48s",
    },
    {
      id: "deploy-045", commit: "f1e8a7c", message: "improve: memory batch write 3x throughput",
      author: "cecilia", branch: "main", status: "success", time: "1d ago",
      env: "production", services: ["memory", "api"], duration: "4m 02s",
    },
    {
      id: "deploy-044", commit: "2d6b9f1", message: "feat: roadwork homework submission flow",
      author: "marcus", branch: "main", status: "failed", time: "1d ago",
      env: "staging", services: ["app", "api"], duration: "1m 58s",
    },
  ];

  const stageStatus = (s) => {
    if (s === "passed") return { dot: "#fff", opacity: 0.5 };
    if (s === "running") return { dot: "#FF8400", opacity: 1 };
    if (s === "failed") return { dot: "#FF0066", opacity: 0.8 };
    return { dot: "rgba(255,255,255,0.15)", opacity: 0.25 };
  };

  const deployStatus = (s) => {
    if (s === "success") return { dot: "#fff", label: "SUCCESS" };
    if (s === "deploying") return { dot: "#FF8400", label: "DEPLOYING" };
    if (s === "failed") return { dot: "#FF0066", label: "FAILED" };
    return { dot: "rgba(255,255,255,0.15)", label: s.toUpperCase() };
  };

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          CI/CD · Production Pipeline
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Deployments
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Active pipeline */}
      <Section label="Active Pipeline · deploy-048">
        <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "8px 0" }}>
          {pipeline.map((stage, i) => {
            const st = stageStatus(stage.status);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{
                    width: 28, height: 28, margin: "0 auto 6px",
                    border: `1px solid ${st.dot}`,
                    background: stage.status === "passed" ? st.dot : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: st.opacity,
                  }}>
                    {stage.status === "passed" && <span style={{ fontSize: "0.4rem", color: "#000", fontWeight: 700 }}>✓</span>}
                    {stage.status === "running" && (
                      <span style={{ fontSize: "0.36rem", fontWeight: 700, color: st.dot }}>
                        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
                        <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◐</span>
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.46rem", fontWeight: 700, opacity: st.opacity }}>{stage.stage}</div>
                  <div style={{ fontSize: "0.38rem", opacity: 0.2, marginTop: 2 }}>{stage.duration}</div>
                </div>
                {i < pipeline.length - 1 && (
                  <div style={{
                    height: 1, width: 20, flexShrink: 0,
                    background: pipeline[i + 1].status === "pending" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.15)",
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Deployment history */}
      <Section label="Deployment History">
        {deployments.map((d, i) => {
          const ds = deployStatus(d.status);
          const isExpanded = expandedDeploy === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div
                onClick={() => setExpandedDeploy(isExpanded ? null : i)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 0",
                  cursor: "pointer",
                }}
              >
                <Dot color={ds.dot} size={7} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: "0.46rem", opacity: 0.2 }}>{d.id}</span>
                    <span style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.6 }}>{d.message}</span>
                  </div>
                  <div style={{ fontSize: "0.42rem", opacity: 0.2 }}>
                    {d.commit} · {d.author} · {d.branch} · {d.time}
                  </div>
                </div>
                <Badge>{ds.label}</Badge>
                <span style={{ fontSize: "0.48rem", opacity: 0.2, transform: isExpanded ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s" }}>▸</span>
              </div>

              {isExpanded && (
                <div style={{ padding: "0 0 16px 19px", display: "grid", gridTemplateColumns: "90px 1fr", gap: "6px 12px" }}>
                  {[
                    ["Environment", d.env],
                    ["Services", d.services.join(", ")],
                    ["Duration", d.duration],
                    ["Branch", d.branch],
                    ["Commit", d.commit],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: "contents" }}>
                      <span style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                      <span style={{ fontSize: "0.48rem", opacity: 0.4 }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </Section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. KNOWLEDGE BASE / WIKI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WikiTemplate() {
  const [activePage, setActivePage] = useState("architecture");
  const [activeSection, setActiveSection] = useState(0);

  const sidebar = [
    { section: "Architecture", items: [
      { id: "architecture", label: "System Overview" },
      { id: "layers", label: "Four-Layer Stack" },
      { id: "data-flow", label: "Data Flow" },
    ]},
    { section: "Agents", items: [
      { id: "agent-lifecycle", label: "Agent Lifecycle" },
      { id: "birth-certs", label: "Birth Certificates" },
      { id: "capabilities", label: "Capability System" },
    ]},
    { section: "Mathematical Foundations", items: [
      { id: "z-framework", label: "Z-Framework (Z:=yx−w)" },
      { id: "pauli-model", label: "1-2-3-4 Pauli Model" },
      { id: "trinary-logic", label: "Trinary Logic (1/0/−1)" },
      { id: "ps-sha", label: "PS-SHA∞ Hashing" },
    ]},
    { section: "Operations", items: [
      { id: "deployment", label: "Deployment Guide" },
      { id: "monitoring", label: "Monitoring & Alerts" },
      { id: "runbooks", label: "Runbooks" },
    ]},
  ];

  const pageContent = {
    architecture: {
      title: "System Overview",
      breadcrumb: "Architecture",
      updated: "Mar 2, 2026",
      author: "alexa",
      sections: [
        {
          heading: "What is BlackRoad OS?",
          body: "BlackRoad OS is a distributed AI operating system organized into four stacked layers: Experience, Governance, Infrastructure, and Agent Mesh. Every user-facing action flows through the Cece governance spine before reaching infrastructure.",
        },
        {
          heading: "Design Philosophy",
          body: "The system is built on three pillars: contradictions don't break the system — they fuel it (trinary logic), every action is recorded immutably (governance ledger), and agents are citizens with identities, memories, and rights (agent mesh). This isn't a chatbot wrapper. It's an operating system for intelligence.",
        },
        {
          heading: "Core Stack",
          code: `Experience Layer    → app.blackroad.io (React + Tailwind)\nGovernance Layer    → gov.api.blackroad.io (Cece spine)\nInfrastructure      → api.blackroad.io (Gateway + Services)\nAgent Mesh          → mesh.blackroad.network (NATS + K3s)`,
        },
        {
          heading: "Key Invariants",
          body: "No action without governance check. No state change without ledger entry. No agent without birth certificate. No memory without PS-SHA∞ hash. These are non-negotiable architectural invariants that cannot be bypassed regardless of role or context.",
        },
      ],
    },
  };

  const page = pageContent[activePage] || pageContent.architecture;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Knowledge Base · 13 Articles
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Wiki
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 520 }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", padding: "24px 20px 24px 0" }}>
          {/* Search */}
          <div style={{ marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 14 }}>
            <input placeholder="Search wiki..." readOnly style={{
              fontFamily: font.mono, fontSize: "0.5rem", color: "#fff",
              background: "transparent", border: "none", outline: "none",
              width: "100%", opacity: 0.25, padding: 0,
            }} />
          </div>

          {sidebar.map((group, gi) => (
            <div key={gi} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                {group.section}
              </div>
              {group.items.map((item) => (
                <div key={item.id} onClick={() => setActivePage(item.id)} style={{
                  fontSize: "0.5rem", padding: "5px 0 5px 10px", cursor: "pointer",
                  opacity: activePage === item.id ? 1 : 0.3,
                  fontWeight: activePage === item.id ? 700 : 400,
                  borderLeft: activePage === item.id ? "1px solid #fff" : "1px solid transparent",
                  transition: "all 0.1s",
                }}>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "24px 0 40px 28px" }}>
          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>{page.breadcrumb}</span>
            <span style={{ fontSize: "0.42rem", opacity: 0.1 }}>/</span>
          </div>
          <h2 style={{ fontFamily: font.headline, fontSize: "1.8rem", fontWeight: 700, margin: "0 0 8px" }}>{page.title}</h2>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>Updated {page.updated}</span>
            <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>by {page.author}</span>
          </div>

          {/* Table of contents */}
          <div style={{
            border: "1px solid rgba(255,255,255,0.08)", padding: "14px 18px", marginBottom: 28,
            background: "#0a0a0a",
          }}>
            <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              On this page
            </div>
            {page.sections.map((s, i) => (
              <div key={i} onClick={() => setActiveSection(i)} style={{
                fontSize: "0.48rem", padding: "4px 0", cursor: "pointer",
                opacity: activeSection === i ? 0.7 : 0.3,
                fontWeight: activeSection === i ? 700 : 400,
              }}>
                {s.heading}
              </div>
            ))}
          </div>

          {/* Article body */}
          {page.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: font.headline, fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px" }}>{s.heading}</h3>
              {s.body && (
                <p style={{ fontSize: "0.62rem", opacity: 0.4, lineHeight: 2, margin: 0 }}>{s.body}</p>
              )}
              {s.code && (
                <div style={{
                  background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)",
                  padding: "14px 18px", marginTop: 10,
                }}>
                  <pre style={{ fontFamily: font.mono, fontSize: "0.5rem", opacity: 0.45, lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>
                    {s.code}
                  </pre>
                </div>
              )}
            </div>
          ))}

          {/* Edit / feedback */}
          <div style={{ display: "flex", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button style={{ fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", padding: "5px 12px", cursor: "pointer" }}>
              EDIT PAGE
            </button>
            <button style={{ fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", padding: "5px 12px", cursor: "pointer" }}>
              SUGGEST CHANGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. SUPPORT TICKETS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TicketTemplate() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filters = ["all", "open", "in progress", "resolved", "closed"];

  const tickets = [
    {
      id: "TK-089", title: "Vector search returns stale results after memory update",
      status: "open", priority: "HIGH", assignee: "priya", reporter: "alexa",
      created: "Mar 2", updated: "Mar 3", category: "Bug",
      description: "After a memory commit, vector search still returns embeddings from the pre-update state. Appears to be a cache invalidation issue in the embedding pipeline.",
      thread: [
        { from: "alexa", time: "Mar 2, 14:22", text: "Noticed this after commit #4818. Semantic search for 'spiral operator' returns old embedding vector." },
        { from: "priya", time: "Mar 2, 15:10", text: "Investigating. The embedding worker is using a stale snapshot. Looking at the invalidation trigger." },
        { from: "cecilia", time: "Mar 2, 15:45", text: "I can confirm the journal shows commit #4818 was successful. The data is there — it's the index that's behind." },
      ],
    },
    {
      id: "TK-088", title: "Dashboard KPI cards not updating in real-time",
      status: "in progress", priority: "MED", assignee: "marcus", reporter: "james",
      created: "Mar 1", updated: "Mar 2", category: "Bug",
      description: "KPI cards on the dashboard show stale values until page refresh. WebSocket subscription may not be reconnecting after gateway failover.",
      thread: [],
    },
    {
      id: "TK-087", title: "Add teacher role to RoadWork homework grading flow",
      status: "in progress", priority: "MED", assignee: "marcus", reporter: "alexa",
      created: "Feb 28", updated: "Mar 1", category: "Feature",
      description: "Teachers need to be able to grade homework submissions. Currently only admin role can access the grading endpoint.",
      thread: [],
    },
    {
      id: "TK-086", title: "Memory export fails for journals over 100MB",
      status: "resolved", priority: "HIGH", assignee: "cecilia", reporter: "priya",
      created: "Feb 26", updated: "Feb 28", category: "Bug",
      description: "Export timeout when journal exceeds 100MB. Need streaming export with progress indication.",
      thread: [],
    },
    {
      id: "TK-085", title: "Feature: agent capability marketplace",
      status: "open", priority: "LOW", assignee: "—", reporter: "alexa",
      created: "Feb 24", updated: "Feb 24", category: "Feature",
      description: "Allow agents to discover and install capabilities from a shared registry. Think npm for agent skills.",
      thread: [],
    },
    {
      id: "TK-084", title: "Ledger event timestamps inconsistent across regions",
      status: "closed", priority: "MED", assignee: "james", reporter: "eve",
      created: "Feb 20", updated: "Feb 22", category: "Bug",
      description: "Events from EU1 and AP1 have clock drift up to 2 seconds. NTP sync resolved.",
      thread: [],
    },
  ];

  const statusStyle = (s) => {
    const map = { "open": "#fff", "in progress": "#FF8400", "resolved": "rgba(255,255,255,0.4)", "closed": "rgba(255,255,255,0.15)" };
    return map[s] || "rgba(255,255,255,0.15)";
  };

  const prioOpacity = (p) => p === "HIGH" ? 0.8 : p === "MED" ? 0.5 : 0.25;

  const filtered = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);
  const detail = selected !== null ? tickets.find((t) => t.id === selected) : null;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Support · {tickets.filter((t) => t.status === "open").length} Open
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Tickets
            </h1>
          </div>
          <button style={{ fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
            + NEW TICKET
          </button>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {filters.map((f) => (
          <button key={f} onClick={() => { setFilter(f); setSelected(null); }} style={{
            fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
            padding: "12px 14px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase",
            background: "none", border: "none", color: "#fff",
            opacity: filter === f ? 1 : 0.2,
            borderBottom: filter === f ? "1px solid #fff" : "1px solid transparent",
            marginBottom: -1,
          }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 420 }}>
        {/* Ticket list */}
        <div style={{ flex: 1, borderRight: detail ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
          {filtered.map((t, i) => (
            <div key={i} onClick={() => setSelected(t.id)} style={{
              padding: "16px 16px 16px 0", cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: selected === t.id ? "rgba(255,255,255,0.03)" : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Dot color={statusStyle(t.status)} size={6} />
                <span style={{ fontSize: "0.44rem", opacity: 0.2 }}>{t.id}</span>
                <span style={{ fontSize: "0.38rem", fontWeight: 700, opacity: prioOpacity(t.priority), letterSpacing: "0.08em" }}>{t.priority}</span>
                <Badge>{t.category.toUpperCase()}</Badge>
              </div>
              <div style={{ fontSize: "0.54rem", fontWeight: 700, opacity: 0.6, paddingLeft: 14, lineHeight: 1.4 }}>{t.title}</div>
              <div style={{ fontSize: "0.42rem", opacity: 0.2, paddingLeft: 14, marginTop: 4 }}>
                {t.assignee} · {t.updated}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {detail && (
          <div style={{ width: 340, flexShrink: 0, padding: "20px 0 20px 20px", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: "0.44rem", opacity: 0.2 }}>{detail.id}</span>
              <Badge>{detail.status.toUpperCase()}</Badge>
            </div>
            <h3 style={{ fontFamily: font.headline, fontSize: "1rem", fontWeight: 700, margin: "8px 0" }}>{detail.title}</h3>
            <div style={{ height: 1, background: GRAD, width: 50, margin: "12px 0", opacity: 0.5 }} />

            <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: "6px 10px", marginBottom: 16 }}>
              {[
                ["Priority", detail.priority],
                ["Category", detail.category],
                ["Assignee", detail.assignee],
                ["Reporter", detail.reporter],
                ["Created", detail.created],
                ["Updated", detail.updated],
              ].map(([l, v]) => (
                <div key={l} style={{ display: "contents" }}>
                  <span style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</span>
                  <span style={{ fontSize: "0.48rem", opacity: 0.4 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "0.52rem", opacity: 0.4, lineHeight: 1.9, marginBottom: 20 }}>{detail.description}</div>

            {detail.thread.length > 0 && (
              <div>
                <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                  Thread
                </div>
                {detail.thread.map((msg, mi) => (
                  <div key={mi} style={{ padding: "10px 0", borderBottom: mi < detail.thread.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: "0.46rem", fontWeight: 700, opacity: 0.5 }}>{msg.from}</span>
                      <span style={{ fontSize: "0.4rem", opacity: 0.15 }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: "0.48rem", opacity: 0.35, lineHeight: 1.7 }}>{msg.text}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply */}
            <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12, display: "flex", gap: 8 }}>
              <input placeholder="Add comment..." readOnly style={{
                fontFamily: font.mono, fontSize: "0.48rem", color: "#fff",
                background: "transparent", border: "none", outline: "none",
                flex: 1, opacity: 0.2,
              }} />
              <button style={{ fontFamily: font.mono, fontSize: "0.42rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "4px 10px", cursor: "pointer" }}>
                REPLY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. AGENT REGISTRY / MARKETPLACE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RegistryTemplate() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const categories = ["all", "governance", "creative", "reasoning", "infrastructure", "education"];

  const agents = [
    {
      name: "Cecilia", version: "2.4.0", category: "governance", installs: "1.2K",
      rating: "4.9", author: "blackroad",
      desc: "Primary governance agent. Memory management, policy evaluation, ledger operations, and system-wide coordination.",
      capabilities: ["memory-persistence", "policy-eval", "ledger-management", "natural-language", "code-execution"],
      deps: ["cece", "memory-service", "ledger-service"],
      size: "48MB", license: "BSL-1.1",
    },
    {
      name: "Cadence", version: "1.8.0", category: "creative", installs: "890",
      rating: "4.7", author: "blackroad",
      desc: "Music composition agent. Generates tracks from vibes, hums, and text prompts. Multi-format export.",
      capabilities: ["audio-generation", "tempo-detection", "vibe-matching", "multi-format-export"],
      deps: ["tone-engine", "vault-service"],
      size: "124MB", license: "BSL-1.1",
    },
    {
      name: "Eve", version: "1.6.0", category: "infrastructure", installs: "780",
      rating: "4.8", author: "blackroad",
      desc: "Security and anomaly detection. Monitors mesh health, flags latency spikes, triggers auto-scaling.",
      capabilities: ["anomaly-detection", "mesh-monitoring", "auto-scaling", "threat-assessment"],
      deps: ["mesh-service", "metrics-pipeline"],
      size: "36MB", license: "BSL-1.1",
    },
    {
      name: "Radius", version: "1.2.0", category: "reasoning", installs: "420",
      rating: "4.6", author: "blackroad",
      desc: "Mathematical reasoning agent. Proof verification, symbolic computation, and equation solving.",
      capabilities: ["symbolic-math", "proof-verification", "latex-rendering"],
      deps: ["sympy-runtime"],
      size: "92MB", license: "BSL-1.1",
    },
    {
      name: "Compass", version: "0.8.0", category: "education", installs: "210",
      rating: "4.4", author: "community",
      desc: "Adaptive tutoring agent. Generates lessons matched to student learning style and pace.",
      capabilities: ["adaptive-learning", "quiz-generation", "progress-tracking"],
      deps: ["roadwork-api", "memory-service"],
      size: "64MB", license: "MIT",
    },
    {
      name: "Forge", version: "0.5.0", category: "creative", installs: "180",
      rating: "4.3", author: "community",
      desc: "3D asset generation from text descriptions. Low-poly to photorealistic output.",
      capabilities: ["3d-generation", "mesh-optimization", "texture-mapping"],
      deps: ["genesis-road-engine"],
      size: "256MB", license: "MIT",
    },
    {
      name: "Meridian", version: "0.2.0", category: "reasoning", installs: "98",
      rating: "—", author: "blackroad",
      desc: "Architecture reasoning agent. System design, dependency analysis, and scaling recommendations.",
      capabilities: ["reasoning", "architecture"],
      deps: ["mesh-service"],
      size: "42MB", license: "BSL-1.1",
    },
    {
      name: "Sentinel", version: "0.1.0", category: "governance", installs: "45",
      rating: "—", author: "community",
      desc: "Compliance monitoring agent. SOC 2 audit trail generation and GDPR data mapping.",
      capabilities: ["compliance-monitoring", "audit-generation", "data-mapping"],
      deps: ["cece", "ledger-service"],
      size: "28MB", license: "Apache-2.0",
    },
  ];

  const filtered = filter === "all" ? agents : agents.filter((a) => a.category === filter);
  const detail = selected !== null ? agents.find((a) => a.name === selected) : null;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Agent Marketplace · {agents.length} Available
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Registry
            </h1>
          </div>
          <button style={{ fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
            PUBLISH AGENT
          </button>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button key={c} onClick={() => { setFilter(c); setSelected(null); }} style={{
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

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 440 }}>
        {/* Agent list */}
        <div style={{ flex: 1, borderRight: detail ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
          {filtered.map((a, i) => (
            <div key={i} onClick={() => setSelected(a.name)} style={{
              padding: "18px 16px 18px 0", cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: selected === a.name ? "rgba(255,255,255,0.03)" : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div style={{
                  width: 28, height: 28, border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.42rem", fontWeight: 700, flexShrink: 0,
                }}>
                  {a.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700 }}>{a.name}</span>
                    <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>v{a.version}</span>
                  </div>
                  <div style={{ fontSize: "0.44rem", opacity: 0.25, marginTop: 1 }}>by {a.author}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.48rem", opacity: 0.4 }}>{a.rating !== "—" ? `★ ${a.rating}` : "—"}</div>
                  <div style={{ fontSize: "0.4rem", opacity: 0.15 }}>{a.installs} installs</div>
                </div>
              </div>
              <div style={{ fontSize: "0.48rem", opacity: 0.3, lineHeight: 1.6, paddingLeft: 38, maxHeight: "1.6em", overflow: "hidden" }}>
                {a.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {detail && (
          <div style={{ width: 300, flexShrink: 0, padding: "20px 0 20px 20px", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.52rem", fontWeight: 700,
              }}>
                {detail.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontFamily: font.headline, fontSize: "1.2rem", fontWeight: 700 }}>{detail.name}</div>
                <div style={{ fontSize: "0.42rem", opacity: 0.25 }}>v{detail.version} · by {detail.author}</div>
              </div>
            </div>
            <div style={{ height: 1, background: GRAD, width: 50, margin: "12px 0", opacity: 0.5 }} />

            <div style={{ fontSize: "0.52rem", opacity: 0.4, lineHeight: 1.9, marginBottom: 16 }}>{detail.desc}</div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 0, marginBottom: 16 }}>
              {[
                { v: detail.rating, l: "Rating" },
                { v: detail.installs, l: "Installs" },
                { v: detail.size, l: "Size" },
              ].map((s, i, arr) => (
                <div key={i} style={{
                  paddingRight: 16, marginRight: 16,
                  borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}>
                  <div style={{ fontSize: "0.64rem", fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: "0.38rem", opacity: 0.2, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Capabilities */}
            <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              Capabilities
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
              {detail.capabilities.map((c) => (
                <span key={c} style={{
                  fontSize: "0.4rem", fontWeight: 700, padding: "2px 6px",
                  border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.05em",
                }}>
                  {c}
                </span>
              ))}
            </div>

            {/* Dependencies */}
            <div style={{ fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Dependencies
            </div>
            <div style={{ fontSize: "0.46rem", opacity: 0.3, lineHeight: 1.7, marginBottom: 14 }}>
              {detail.deps.join(" · ")}
            </div>

            <div style={{ fontSize: "0.42rem", opacity: 0.15, marginBottom: 16 }}>License: {detail.license}</div>

            <button style={{
              fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 700,
              background: "#fff", color: "#000", border: "none",
              padding: "8px 0", cursor: "pointer", width: "100%",
            }}>
              INSTALL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. AUDIT TRAIL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AuditTemplate() {
  const [groupBy, setGroupBy] = useState("time");

  const events = [
    { time: "14:35:02", actor: "alexa", type: "user", action: "agent.chat", target: "cecilia", detail: "Sent message in #cecilia channel", risk: "none" },
    { time: "14:34:18", actor: "cecilia", type: "agent", action: "memory.commit", target: "journal:4821", detail: "3 new truth-state entries written", risk: "none" },
    { time: "14:32:41", actor: "cece", type: "agent", action: "policy.evaluate", target: "user:alexa → submission:42", detail: "ALLOW — teacher role verified", risk: "none" },
    { time: "14:28:04", actor: "eve", type: "agent", action: "anomaly.flag", target: "mesh:na1", detail: "Latency exceeded p99 threshold", risk: "medium" },
    { time: "14:15:31", actor: "cadence", type: "agent", action: "vault.write", target: "composition-42.wav", detail: "24.2MB audio file exported", risk: "none" },
    { time: "14:02:12", actor: "system", type: "system", action: "checkpoint.write", target: "ledger:checkpoint:892", detail: "Scheduled integrity checkpoint", risk: "none" },
    { time: "13:55:44", actor: "cece", type: "agent", action: "policy.evaluate", target: "user:marcus → agent:meridian", detail: "DENY — insufficient permissions", risk: "low" },
    { time: "13:48:02", actor: "priya", type: "user", action: "deploy.trigger", target: "deploy-047", detail: "Production deployment initiated", risk: "none" },
    { time: "13:42:18", actor: "james", type: "user", action: "settings.update", target: "workspace:blackroad-os", detail: "Updated API rate limits", risk: "low" },
    { time: "13:30:00", actor: "system", type: "system", action: "backup.create", target: "db:primary", detail: "Full database backup (4.2GB)", risk: "none" },
    { time: "13:22:15", actor: "alexa", type: "user", action: "policy.create", target: "edu.review.teacher-only", detail: "New policy deployed for education vertical", risk: "none" },
    { time: "13:10:44", actor: "eve", type: "agent", action: "scan.complete", target: "mesh:global", detail: "Full mesh scan — no threats detected", risk: "none" },
  ];

  const riskColor = (r) => {
    if (r === "medium") return "rgba(255,255,255,0.7)";
    if (r === "low") return "rgba(255,255,255,0.4)";
    return "rgba(255,255,255,0.15)";
  };

  const typeIcon = (t) => {
    if (t === "user") return "○";
    if (t === "agent") return "◇";
    return "□";
  };

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              System-Wide Activity · Last 2 Hours
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Audit Trail
            </h1>
          </div>
          <div style={{ display: "flex", gap: 0, border: "1px solid rgba(255,255,255,0.15)" }}>
            {["time", "actor", "risk"].map((g) => (
              <button key={g} onClick={() => setGroupBy(g)} style={{
                fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700,
                padding: "5px 10px", cursor: "pointer",
                background: groupBy === g ? "#fff" : "transparent",
                color: groupBy === g ? "#000" : "#fff",
                border: "none",
              }}>
                {g.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />

        <div style={{ display: "flex", gap: 0, marginTop: 20 }}>
          {[
            { v: String(events.length), l: "Events" },
            { v: String(events.filter((e) => e.type === "user").length), l: "User Actions" },
            { v: String(events.filter((e) => e.type === "agent").length), l: "Agent Actions" },
            { v: String(events.filter((e) => e.risk !== "none").length), l: "Flagged" },
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

      {/* Event stream */}
      <div style={{ borderBottom: "1px solid #fff" }}>
        {/* Table header */}
        <div style={{ display: "flex", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            { l: "", w: 20 },
            { l: "Time", w: 64 },
            { l: "Actor", w: 80 },
            { l: "Action", w: 120 },
            { l: "Target", f: 1 },
            { l: "Detail", f: 1 },
            { l: "Risk", w: 50 },
          ].map((h, i) => (
            <span key={i} style={{
              fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase",
              flex: h.f, width: h.w, minWidth: h.w,
            }}>
              {h.l}
            </span>
          ))}
        </div>

        {events.map((e, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
            background: e.risk !== "none" ? "rgba(255,255,255,0.015)" : "transparent",
          }}>
            <span style={{ fontSize: "0.5rem", opacity: 0.15, width: 20, minWidth: 20, textAlign: "center" }}>{typeIcon(e.type)}</span>
            <span style={{ fontSize: "0.46rem", opacity: 0.2, width: 64, minWidth: 64 }}>{e.time}</span>
            <span style={{ fontSize: "0.5rem", fontWeight: 700, opacity: 0.5, width: 80, minWidth: 80 }}>{e.actor}</span>
            <span style={{ fontSize: "0.46rem", opacity: 0.35, width: 120, minWidth: 120 }}>{e.action}</span>
            <span style={{ fontSize: "0.46rem", opacity: 0.3, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.target}</span>
            <span style={{ fontSize: "0.44rem", opacity: 0.25, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.detail}</span>
            <span style={{ fontSize: "0.42rem", fontWeight: 700, width: 50, minWidth: 50, textAlign: "center", opacity: e.risk === "none" ? 0.1 : 0.6, color: riskColor(e.risk) }}>
              {e.risk === "none" ? "—" : e.risk.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ padding: "20px 0 48px", display: "flex", gap: 20 }}>
        {[
          { icon: "○", label: "User" },
          { icon: "◇", label: "Agent" },
          { icon: "□", label: "System" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.5rem", opacity: 0.2 }}>{l.icon}</span>
            <span style={{ fontSize: "0.42rem", opacity: 0.25 }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. ALERT RULES / NOTIFICATIONS CONFIG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AlertsTemplate() {
  const [toggleState, setToggleState] = useState({});

  const toggle = (id) => setToggleState((prev) => ({ ...prev, [id]: !prev[id] }));
  const isOn = (id, def = true) => toggleState[id] !== undefined ? toggleState[id] : def;

  const ruleGroups = [
    {
      category: "Infrastructure",
      rules: [
        { id: "infra-latency", name: "Latency Threshold", desc: "Alert when p99 latency exceeds 100ms for any service.", condition: "p99 > 100ms for 60s", channel: "slack, email", severity: "HIGH", default: true },
        { id: "infra-error", name: "Error Rate Spike", desc: "Alert when error rate exceeds 1% across any endpoint.", condition: "error_rate > 1% for 30s", channel: "slack, pagerduty", severity: "CRITICAL", default: true },
        { id: "infra-cpu", name: "CPU Utilization", desc: "Alert when CPU exceeds 80% on any node.", condition: "cpu > 80% for 5m", channel: "slack", severity: "MED", default: true },
        { id: "infra-disk", name: "Disk Usage", desc: "Alert when disk usage exceeds 90%.", condition: "disk > 90%", channel: "slack, email", severity: "HIGH", default: true },
      ],
    },
    {
      category: "Agents",
      rules: [
        { id: "agent-offline", name: "Agent Offline", desc: "Alert when any active agent goes offline unexpectedly.", condition: "heartbeat missed × 3", channel: "slack", severity: "HIGH", default: true },
        { id: "agent-memory", name: "Memory Threshold", desc: "Alert when agent memory journal exceeds 500MB.", condition: "journal_size > 500MB", channel: "email", severity: "MED", default: false },
        { id: "agent-anomaly", name: "Behavioral Anomaly", desc: "Alert when Eve detects unusual agent behavior patterns.", condition: "anomaly_score > 0.8", channel: "slack, pagerduty", severity: "HIGH", default: true },
      ],
    },
    {
      category: "Governance",
      rules: [
        { id: "gov-deny", name: "Policy Denial", desc: "Alert on any DENY decision from Cece.", condition: "decision == DENY", channel: "slack", severity: "MED", default: true },
        { id: "gov-bypass", name: "Policy Bypass Attempt", desc: "Alert on any attempt to bypass governance checks.", condition: "bypass_attempt detected", channel: "slack, pagerduty, email", severity: "CRITICAL", default: true },
        { id: "gov-integrity", name: "Ledger Integrity", desc: "Alert if ledger hash chain verification fails.", condition: "chain_verify == false", channel: "pagerduty, email, slack", severity: "CRITICAL", default: true },
      ],
    },
    {
      category: "Business",
      rules: [
        { id: "biz-usage", name: "Usage Limit", desc: "Alert when usage reaches 80% of plan limit.", condition: "usage > 80% of limit", channel: "email", severity: "LOW", default: true },
        { id: "biz-payment", name: "Payment Failed", desc: "Alert on failed subscription payment.", condition: "payment.failed", channel: "email", severity: "HIGH", default: true },
      ],
    },
  ];

  const sevStyle = (s) => {
    if (s === "CRITICAL") return 1;
    if (s === "HIGH") return 0.7;
    if (s === "MED") return 0.4;
    return 0.25;
  };

  const totalRules = ruleGroups.reduce((sum, g) => sum + g.rules.length, 0);
  const activeRules = ruleGroups.reduce((sum, g) => sum + g.rules.filter((r) => isOn(r.id, r.default)).length, 0);

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Notification Rules · {activeRules}/{totalRules} Active
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
            Alert Rules
          </h1>
          <button style={{ fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
            + NEW RULE
          </button>
        </div>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 460, marginTop: 14 }}>
          Configure when and how you get notified. Every alert passes through the governance ledger before delivery.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Delivery channels summary */}
      <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 20 }}>
        {[
          { channel: "Slack", connected: true, target: "#alerts" },
          { channel: "Email", connected: true, target: "founder@blackroad.systems" },
          { channel: "PagerDuty", connected: true, target: "BlackRoad Service" },
          { channel: "Webhook", connected: false, target: "Not configured" },
        ].map((ch) => (
          <div key={ch.channel} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Dot color={ch.connected ? "#FF8400" : "rgba(255,255,255,0.1)"} size={5} />
            <span style={{ fontSize: "0.46rem", fontWeight: 700, opacity: ch.connected ? 0.6 : 0.2 }}>{ch.channel}</span>
            <span style={{ fontSize: "0.4rem", opacity: 0.15 }}>{ch.target}</span>
          </div>
        ))}
      </div>

      {/* Rule groups */}
      {ruleGroups.map((group, gi) => (
        <Section key={gi} label={group.category}>
          {group.rules.map((rule, ri) => (
            <div key={ri} style={{
              display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 0",
              borderBottom: ri < group.rules.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              {/* Toggle */}
              <div style={{ paddingTop: 2 }}>
                <ToggleSwitch on={isOn(rule.id, rule.default)} onClick={() => toggle(rule.id)} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, opacity: isOn(rule.id, rule.default) ? 0.7 : 0.3 }}>{rule.name}</span>
                  <span style={{ fontSize: "0.38rem", fontWeight: 700, opacity: sevStyle(rule.severity), letterSpacing: "0.08em" }}>{rule.severity}</span>
                </div>
                <div style={{ fontSize: "0.48rem", opacity: 0.3, lineHeight: 1.6, marginBottom: 6 }}>{rule.desc}</div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div>
                    <span style={{ fontSize: "0.38rem", opacity: 0.15, letterSpacing: "0.08em", textTransform: "uppercase" }}>Condition </span>
                    <span style={{ fontSize: "0.42rem", opacity: 0.25 }}>{rule.condition}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.38rem", opacity: 0.15, letterSpacing: "0.08em", textTransform: "uppercase" }}>Channels </span>
                    <span style={{ fontSize: "0.42rem", opacity: 0.25 }}>{rule.channel}</span>
                  </div>
                </div>
              </div>

              {/* Edit */}
              <button style={{
                fontFamily: font.mono, fontSize: "0.4rem", fontWeight: 700,
                background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.1)",
                padding: "3px 8px", cursor: "pointer", opacity: 0.3, marginTop: 2,
              }}>
                EDIT
              </button>
            </div>
          ))}
        </Section>
      ))}
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
