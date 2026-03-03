import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export default function BlackRoadTemplates5() {
  const [active, setActive] = useState("command");

  const templates = [
    { id: "command", label: "Command" },
    { id: "permissions", label: "Permissions" },
    { id: "playground", label: "API" },
    { id: "mesh", label: "Mesh" },
    { id: "media", label: "Media" },
    { id: "sla", label: "SLA" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "command": return <CommandPaletteTemplate />;
      case "permissions": return <PermissionsTemplate />;
      case "playground": return <APIPlaygroundTemplate />;
      case "mesh": return <MeshTopologyTemplate />;
      case "media": return <MediaLibraryTemplate />;
      case "sla": return <SLAMonitorTemplate />;
      default: return <CommandPaletteTemplate />;
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
// 1. COMMAND PALETTE / SPOTLIGHT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CommandPaletteTemplate() {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const allCommands = [
    { section: "Navigation", items: [
      { icon: "→", label: "Go to Dashboard", shortcut: "G D", type: "nav" },
      { icon: "→", label: "Go to Settings", shortcut: "G S", type: "nav" },
      { icon: "→", label: "Go to Vault", shortcut: "G V", type: "nav" },
      { icon: "→", label: "Go to Ledger", shortcut: "G L", type: "nav" },
    ]},
    { section: "Agents", items: [
      { icon: "◈", label: "Spawn new agent", shortcut: "A N", type: "action" },
      { icon: "◈", label: "Talk to Cecilia", shortcut: "A C", type: "action" },
      { icon: "◈", label: "View agent roster", shortcut: "A R", type: "action" },
      { icon: "◈", label: "Agent health check", shortcut: "A H", type: "action" },
    ]},
    { section: "Workspace", items: [
      { icon: "⊞", label: "Create new workspace", shortcut: "W N", type: "action" },
      { icon: "⊞", label: "Switch workspace", shortcut: "W S", type: "action" },
      { icon: "⊞", label: "Invite team member", shortcut: "W I", type: "action" },
    ]},
    { section: "System", items: [
      { icon: "⚙", label: "Toggle dark mode", shortcut: "S D", type: "toggle" },
      { icon: "⚙", label: "Open terminal", shortcut: "S T", type: "action" },
      { icon: "⚙", label: "View system status", shortcut: "S S", type: "nav" },
      { icon: "⚙", label: "Sign out", shortcut: "S O", type: "action" },
    ]},
  ];

  const filtered = query
    ? allCommands.map((s) => ({
        ...s,
        items: s.items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
      })).filter((s) => s.items.length > 0)
    : allCommands;

  let flatIdx = 0;

  return (
    <div style={{ padding: "56px 0 48px" }}>
      <div style={{ borderBottom: "1px solid #fff", paddingBottom: 40, marginBottom: 0 }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Quick Actions · ⌘K
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Command Palette
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* The palette */}
      <div style={{
        maxWidth: 540, margin: "40px auto",
        border: "1px solid #fff",
        background: "#0a0a0a",
      }}>
        {/* Search input */}
        <div style={{
          padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: "0.6rem", opacity: 0.25 }}>❯</span>
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }}
            placeholder="Type a command..."
            style={{
              fontFamily: font.mono, fontSize: "0.62rem", color: "#fff",
              background: "transparent", border: "none", outline: "none",
              flex: 1, padding: 0,
            }}
          />
          <span style={{
            fontSize: "0.4rem", opacity: 0.15, border: "1px solid rgba(255,255,255,0.15)",
            padding: "2px 6px",
          }}>
            ESC
          </span>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 380, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "0.56rem", opacity: 0.25 }}>No commands found</div>
            </div>
          ) : (
            filtered.map((section, si) => (
              <div key={si}>
                <div style={{
                  fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "12px 20px 6px",
                }}>
                  {section.section}
                </div>
                {section.items.map((item) => {
                  const thisIdx = flatIdx++;
                  const isSelected = thisIdx === selectedIdx;
                  return (
                    <div
                      key={item.label}
                      onMouseEnter={() => setSelectedIdx(thisIdx)}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 20px", cursor: "pointer",
                        background: isSelected ? "rgba(255,255,255,0.06)" : "transparent",
                        borderLeft: isSelected ? "2px solid #fff" : "2px solid transparent",
                      }}
                    >
                      <span style={{ fontSize: "0.5rem", opacity: 0.3, width: 16, textAlign: "center" }}>{item.icon}</span>
                      <span style={{ fontSize: "0.56rem", flex: 1, opacity: isSelected ? 0.9 : 0.45, fontWeight: isSelected ? 700 : 400 }}>
                        {item.label}
                      </span>
                      <span style={{
                        fontSize: "0.4rem", opacity: 0.15, letterSpacing: "0.1em",
                        border: "1px solid rgba(255,255,255,0.1)", padding: "1px 6px",
                      }}>
                        {item.shortcut}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between",
          fontSize: "0.4rem", opacity: 0.15,
        }}>
          <span>↑↓ Navigate</span>
          <span>↵ Execute</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. PERMISSIONS MATRIX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PermissionsTemplate() {
  const roles = ["Admin", "Teacher", "Student", "Creator", "Viewer"];
  const permissions = [
    { category: "Agents", perms: [
      { name: "agent.spawn", admin: true, teacher: false, student: false, creator: false, viewer: false },
      { name: "agent.configure", admin: true, teacher: false, student: false, creator: true, viewer: false },
      { name: "agent.chat", admin: true, teacher: true, student: true, creator: true, viewer: false },
      { name: "agent.terminate", admin: true, teacher: false, student: false, creator: false, viewer: false },
    ]},
    { category: "Memory", perms: [
      { name: "memory.read", admin: true, teacher: true, student: true, creator: true, viewer: true },
      { name: "memory.write", admin: true, teacher: true, student: false, creator: true, viewer: false },
      { name: "memory.delete", admin: true, teacher: false, student: false, creator: false, viewer: false },
      { name: "memory.export", admin: true, teacher: true, student: false, creator: true, viewer: false },
    ]},
    { category: "Governance", perms: [
      { name: "policy.create", admin: true, teacher: false, student: false, creator: false, viewer: false },
      { name: "policy.evaluate", admin: true, teacher: true, student: false, creator: false, viewer: false },
      { name: "ledger.read", admin: true, teacher: true, student: false, creator: true, viewer: true },
      { name: "ledger.audit", admin: true, teacher: false, student: false, creator: false, viewer: false },
    ]},
    { category: "Education", perms: [
      { name: "edu.create-assignment", admin: true, teacher: true, student: false, creator: false, viewer: false },
      { name: "edu.submit", admin: true, teacher: false, student: true, creator: false, viewer: false },
      { name: "edu.review", admin: true, teacher: true, student: false, creator: false, viewer: false },
      { name: "edu.grade", admin: true, teacher: true, student: false, creator: false, viewer: false },
    ]},
    { category: "Workspace", perms: [
      { name: "workspace.settings", admin: true, teacher: false, student: false, creator: false, viewer: false },
      { name: "workspace.invite", admin: true, teacher: true, student: false, creator: true, viewer: false },
      { name: "workspace.billing", admin: true, teacher: false, student: false, creator: false, viewer: false },
      { name: "vault.upload", admin: true, teacher: true, student: true, creator: true, viewer: false },
    ]},
  ];

  const roleKey = (r) => r.toLowerCase();

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Role-Based Access Control
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Permissions
        </h1>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 460, marginTop: 14 }}>
          Every action in BlackRoad OS passes through the Cece governance spine. These permissions define what each role can do.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ overflowX: "auto", borderBottom: "1px solid #fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "14px 12px 14px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", width: 200 }}>
                <span style={{ fontSize: "0.44rem", opacity: 0.25, letterSpacing: "0.12em", textTransform: "uppercase" }}>Permission</span>
              </th>
              {roles.map((r) => (
                <th key={r} style={{
                  textAlign: "center", padding: "14px 8px", borderBottom: "1px solid rgba(255,255,255,0.15)",
                  width: 90,
                }}>
                  <span style={{ fontSize: "0.46rem", fontWeight: 700, letterSpacing: "0.08em" }}>{r}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((cat) => (
              <React.Fragment key={cat.category}>
                <tr>
                  <td colSpan={6} style={{ padding: "18px 0 8px", borderBottom: "none" }}>
                    <span style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {cat.category}
                    </span>
                  </td>
                </tr>
                {cat.perms.map((p) => (
                  <tr key={p.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <td style={{ padding: "8px 12px 8px 12px", fontSize: "0.52rem", opacity: 0.5 }}>
                      {p.name}
                    </td>
                    {roles.map((r) => {
                      const allowed = p[roleKey(r)];
                      return (
                        <td key={r} style={{ textAlign: "center", padding: "8px" }}>
                          <div style={{
                            width: 14, height: 14, margin: "0 auto",
                            border: "1px solid rgba(255,255,255,0.15)",
                            background: allowed ? "#fff" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {allowed && <span style={{ fontSize: "0.4rem", color: "#000", fontWeight: 700 }}>✓</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ padding: "20px 0 48px", display: "flex", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 12, height: 12, background: "#fff", border: "1px solid #fff" }} />
          <span style={{ fontSize: "0.44rem", opacity: 0.3 }}>Allowed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 12, height: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: "0.44rem", opacity: 0.3 }}>Denied</span>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. API PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function APIPlaygroundTemplate() {
  const [method, setMethod] = useState("GET");
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [showResponse, setShowResponse] = useState(true);

  const methods = ["GET", "POST", "PUT", "DELETE"];

  const endpoints = [
    {
      method: "GET", path: "/v1/agents", desc: "List all agents in workspace",
      headers: [{ key: "Authorization", value: "Bearer br_live_••••4f2a" }, { key: "Content-Type", value: "application/json" }],
      params: [{ key: "status", value: "active" }, { key: "limit", value: "50" }],
      response: {
        status: 200, time: "38ms",
        body: `{
  "data": [
    {
      "id": "agent_cecilia_001",
      "name": "cecilia",
      "role": "Governance Lead",
      "status": "active",
      "capabilities": 5,
      "memory_commits": 4821,
      "created_at": "2025-11-15T00:00:00Z"
    },
    {
      "id": "agent_cadence_001",
      "name": "cadence",
      "role": "Music Agent",
      "status": "active",
      "capabilities": 3,
      "memory_commits": 2104,
      "created_at": "2025-12-01T00:00:00Z"
    }
  ],
  "total": 117,
  "has_more": true
}`,
      },
    },
    {
      method: "POST", path: "/v1/agents/spawn", desc: "Spawn a new agent",
      headers: [{ key: "Authorization", value: "Bearer br_live_••••4f2a" }, { key: "Content-Type", value: "application/json" }],
      params: [],
      response: { status: 201, time: "142ms", body: `{\n  "id": "agent_meridian_001",\n  "name": "meridian",\n  "status": "initializing",\n  "hash": "0xf4a2...8e1c"\n}` },
    },
    {
      method: "POST", path: "/v1/policy/evaluate", desc: "Evaluate a governance policy",
      headers: [{ key: "Authorization", value: "Bearer br_live_••••4f2a" }, { key: "Content-Type", value: "application/json" }],
      params: [],
      response: { status: 200, time: "22ms", body: `{\n  "decision": "ALLOW",\n  "policy": "edu.review.teacher-only",\n  "reason": "Subject has role=teacher",\n  "ledger_event": "#8921"\n}` },
    },
    {
      method: "GET", path: "/v1/memory/search", desc: "Semantic search across memory",
      headers: [{ key: "Authorization", value: "Bearer br_live_••••4f2a" }],
      params: [{ key: "query", value: "spiral operator" }, { key: "agent", value: "cecilia" }],
      response: { status: 200, time: "85ms", body: `{\n  "results": [\n    {\n      "commit_id": 4819,\n      "relevance": 0.94,\n      "content": "Spiral operator proof updated...",\n      "timestamp": "2026-02-28T14:22:00Z"\n    }\n  ],\n  "total": 3\n}` },
    },
  ];

  const active = endpoints[activeEndpoint];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          REST API · v1
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          API Playground
        </h1>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 440, marginTop: 14 }}>
          Test endpoints live. Responses are real. Changes are logged in the governance ledger.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 500 }}>
        {/* Endpoint sidebar */}
        <div style={{ width: 240, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 16px 20px 0" }}>
          <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
            Endpoints
          </div>
          {endpoints.map((ep, i) => (
            <div key={i} onClick={() => setActiveEndpoint(i)} style={{
              padding: "10px 12px", cursor: "pointer",
              background: activeEndpoint === i ? "rgba(255,255,255,0.04)" : "transparent",
              borderLeft: activeEndpoint === i ? "1px solid #fff" : "1px solid transparent",
              marginBottom: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: "0.4rem", fontWeight: 700, padding: "1px 5px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  opacity: ep.method === "GET" ? 0.5 : ep.method === "POST" ? 0.7 : 0.4,
                }}>
                  {ep.method}
                </span>
                <span style={{ fontSize: "0.48rem", opacity: activeEndpoint === i ? 0.8 : 0.35, fontWeight: activeEndpoint === i ? 700 : 400 }}>
                  {ep.path}
                </span>
              </div>
              <div style={{ fontSize: "0.42rem", opacity: 0.2, marginTop: 3, paddingLeft: 40 }}>{ep.desc}</div>
            </div>
          ))}
        </div>

        {/* Request / Response */}
        <div style={{ flex: 1, padding: "20px 0 20px 24px" }}>
          {/* URL bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 0,
            border: "1px solid rgba(255,255,255,0.2)", marginBottom: 20,
          }}>
            <div style={{
              display: "flex", gap: 0, borderRight: "1px solid rgba(255,255,255,0.1)",
            }}>
              {methods.map((m) => (
                <button key={m} onClick={() => setMethod(m)} style={{
                  fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700,
                  padding: "8px 10px", cursor: "pointer",
                  background: method === m ? "#fff" : "transparent",
                  color: method === m ? "#000" : "#fff",
                  border: "none", opacity: method === m ? 1 : 0.3,
                }}>
                  {m}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, padding: "0 12px", display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "0.46rem", opacity: 0.2 }}>https://api.blackroad.io</span>
              <span style={{ fontSize: "0.52rem", fontWeight: 700, opacity: 0.7 }}>{active.path}</span>
            </div>
            <button onClick={() => setShowResponse(!showResponse)} style={{
              fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
              background: "#fff", color: "#000", border: "none",
              padding: "8px 16px", cursor: "pointer",
            }}>
              SEND
            </button>
          </div>

          {/* Headers */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
              Headers
            </div>
            {active.headers.map((h, i) => (
              <div key={i} style={{
                display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{ fontSize: "0.48rem", fontWeight: 700, opacity: 0.4, padding: "6px 0", minWidth: 160 }}>{h.key}</span>
                <span style={{ fontSize: "0.48rem", opacity: 0.25, padding: "6px 0" }}>{h.value}</span>
              </div>
            ))}
          </div>

          {/* Query params */}
          {active.params.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                Parameters
              </div>
              {active.params.map((p, i) => (
                <div key={i} style={{
                  display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <span style={{ fontSize: "0.48rem", fontWeight: 700, opacity: 0.4, padding: "6px 0", minWidth: 160 }}>{p.key}</span>
                  <span style={{ fontSize: "0.48rem", opacity: 0.25, padding: "6px 0" }}>{p.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Response */}
          {showResponse && (
            <div>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 10,
              }}>
                <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Response
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{
                    fontSize: "0.44rem", fontWeight: 700,
                    opacity: active.response.status < 300 ? 0.5 : 0.8,
                  }}>
                    {active.response.status} {active.response.status < 300 ? "OK" : "ERROR"}
                  </span>
                  <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>{active.response.time}</span>
                </div>
              </div>
              <div style={{
                background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)",
                padding: "16px 20px",
              }}>
                <pre style={{
                  fontFamily: font.mono, fontSize: "0.5rem", opacity: 0.45,
                  lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap",
                }}>
                  {active.response.body}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. MESH TOPOLOGY / NETWORK MAP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MeshTopologyTemplate() {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: "gateway", label: "Gateway", x: 50, y: 12, type: "infra", status: "online", connections: 4, throughput: "8.1K req/s" },
    { id: "cece", label: "Cece", x: 25, y: 35, type: "agent", status: "online", connections: 3, throughput: "1.8K eval/s" },
    { id: "cecilia", label: "Cecilia", x: 50, y: 35, type: "agent", status: "online", connections: 5, throughput: "4.8K ops/s" },
    { id: "eve", label: "Eve", x: 75, y: 35, type: "agent", status: "alert", connections: 2, throughput: "980 scan/s" },
    { id: "na1", label: "NA1", x: 15, y: 58, type: "region", status: "online", connections: 6, throughput: "12.4K msg/s" },
    { id: "eu1", label: "EU1", x: 50, y: 58, type: "region", status: "online", connections: 4, throughput: "6.2K msg/s" },
    { id: "ap1", label: "AP1", x: 85, y: 58, type: "region", status: "online", connections: 3, throughput: "3.1K msg/s" },
    { id: "memory", label: "Memory", x: 30, y: 80, type: "service", status: "online", connections: 3, throughput: "2.4M events" },
    { id: "ledger", label: "Ledger", x: 50, y: 80, type: "service", status: "online", connections: 2, throughput: "8.9K events" },
    { id: "vectors", label: "Vectors", x: 70, y: 80, type: "service", status: "degraded", connections: 2, throughput: "450 q/s" },
  ];

  const edges = [
    ["gateway", "cece"], ["gateway", "cecilia"], ["gateway", "eve"],
    ["cece", "na1"], ["cece", "eu1"],
    ["cecilia", "na1"], ["cecilia", "eu1"], ["cecilia", "ap1"],
    ["eve", "na1"],
    ["na1", "memory"], ["na1", "ledger"],
    ["eu1", "memory"], ["eu1", "ledger"],
    ["ap1", "vectors"],
    ["memory", "ledger"],
    ["gateway", "na1"],
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const statusColor = (s) => {
    if (s === "online") return "#fff";
    if (s === "alert") return "#FF0066";
    if (s === "degraded") return "rgba(255,255,255,0.4)";
    return "rgba(255,255,255,0.15)";
  };

  const selected = selectedNode ? nodeMap[selectedNode] : null;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Network Topology · Live
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Agent Mesh
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
          {[
            { label: "Infrastructure", symbol: "□" },
            { label: "Agent", symbol: "◇" },
            { label: "Region", symbol: "○" },
            { label: "Service", symbol: "▪" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "0.5rem", opacity: 0.3 }}>{l.symbol}</span>
              <span style={{ fontSize: "0.42rem", opacity: 0.2 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff" }}>
        {/* Topology map */}
        <div style={{ flex: 1, position: "relative", minHeight: 420, padding: "20px 0" }}>
          {/* Draw edges */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {edges.map(([from, to], i) => {
              const a = nodeMap[from];
              const b = nodeMap[to];
              if (!a || !b) return null;
              return (
                <line
                  key={i}
                  x1={`${a.x}%`} y1={`${a.y}%`}
                  x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Draw nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              style={{
                position: "absolute",
                left: `${node.x}%`, top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                cursor: "pointer", textAlign: "center", zIndex: 2,
              }}
            >
              <div style={{
                width: 28, height: 28, margin: "0 auto 4px",
                border: `1px solid ${statusColor(node.status)}`,
                background: selectedNode === node.id ? "#fff" : "rgba(0,0,0,0.8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: node.type === "region" ? "50%" : 0,
                transform: node.type === "agent" ? "rotate(45deg)" : "none",
              }}>
                <span style={{
                  fontSize: "0.36rem", fontWeight: 700,
                  color: selectedNode === node.id ? "#000" : statusColor(node.status),
                  transform: node.type === "agent" ? "rotate(-45deg)" : "none",
                  opacity: 0.7,
                }}>
                  {node.label.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span style={{
                fontSize: "0.42rem", fontWeight: 700,
                opacity: selectedNode === node.id ? 1 : 0.35,
              }}>
                {node.label}
              </span>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ width: 220, borderLeft: "1px solid rgba(255,255,255,0.08)", padding: "24px 0 24px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Dot color={statusColor(selected.status)} size={8} />
              <span style={{ fontFamily: font.headline, fontSize: "1rem", fontWeight: 700 }}>{selected.label}</span>
            </div>
            <Badge>{selected.status.toUpperCase()}</Badge>
            <div style={{ height: 1, background: GRAD, width: 40, margin: "16px 0", opacity: 0.5 }} />

            {[
              ["Type", selected.type],
              ["Connections", String(selected.connections)],
              ["Throughput", selected.throughput],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: "0.52rem", opacity: 0.5 }}>{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. MEDIA LIBRARY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MediaLibraryTemplate() {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filters = ["all", "audio", "image", "video", "document", "code"];

  const items = [
    { name: "composition-42.wav", type: "audio", size: "24.2MB", duration: "3:42", agent: "cadence", created: "Mar 2", bpm: "108", key: "Cm" },
    { name: "composition-41.wav", type: "audio", size: "18.7MB", duration: "2:58", agent: "cadence", created: "Feb 28", bpm: "124", key: "Am" },
    { name: "composition-40.mp3", type: "audio", size: "6.1MB", duration: "4:12", agent: "cadence", created: "Feb 25", bpm: "92", key: "F" },
    { name: "roadwork-wireframe-v3.png", type: "image", size: "3.1MB", duration: null, agent: "system", created: "Feb 22", bpm: null, key: null },
    { name: "agent-mesh-diagram.svg", type: "image", size: "48KB", duration: null, agent: "system", created: "Feb 20", bpm: null, key: null },
    { name: "logo-blackroad-white.svg", type: "image", size: "12KB", duration: null, agent: "system", created: "Jan 15", bpm: null, key: null },
    { name: "demo-walkthrough.mp4", type: "video", size: "142MB", duration: "8:22", agent: "system", created: "Feb 18", bpm: null, key: null },
    { name: "genesis-road-spec.md", type: "document", size: "24KB", duration: null, agent: "alexa", created: "Feb 28", bpm: null, key: null },
    { name: "z-framework-proof.tex", type: "document", size: "18KB", duration: null, agent: "alexa", created: "Feb 15", bpm: null, key: null },
    { name: "pauli-model-v3.py", type: "code", size: "8.2KB", duration: null, agent: "radius", created: "Feb 20", bpm: null, key: null },
    { name: "spiral-operator.ipynb", type: "code", size: "142KB", duration: null, agent: "radius", created: "Jan 30", bpm: null, key: null },
    { name: "agent-birth-certs.json", type: "code", size: "456KB", duration: null, agent: "system", created: "Mar 1", bpm: null, key: null },
  ];

  const typeIcon = (t) => {
    const icons = { audio: "♫", image: "□", video: "▶", document: "≡", code: "</>" };
    return icons[t] || "·";
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);
  const detail = selected !== null ? filtered[selected] : null;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Assets · {items.length} Files
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Media Library
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["grid", "list"].map((v) => (
              <button key={v} onClick={() => setView(v)} style={{
                fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700,
                padding: "5px 10px", cursor: "pointer",
                background: view === v ? "#fff" : "transparent",
                color: view === v ? "#000" : "#fff",
                border: view === v ? "none" : "1px solid rgba(255,255,255,0.2)",
              }}>
                {v.toUpperCase()}
              </button>
            ))}
          </div>
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

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 400 }}>
        <div style={{ flex: 1 }}>
          {view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 0 }}>
              {filtered.map((item, i) => (
                <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
                  padding: "20px 12px", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  borderRight: "1px solid rgba(255,255,255,0.04)",
                  background: selected === i ? "rgba(255,255,255,0.04)" : "transparent",
                }}>
                  <div style={{
                    width: "100%", aspectRatio: "1", border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 10, background: "#0a0a0a",
                  }}>
                    <span style={{ fontSize: "1.2rem", opacity: 0.15 }}>{typeIcon(item.type)}</span>
                  </div>
                  <div style={{ fontSize: "0.46rem", fontWeight: 700, opacity: 0.6, lineHeight: 1.3, wordBreak: "break-all" }}>{item.name}</div>
                  <div style={{ fontSize: "0.4rem", opacity: 0.2, marginTop: 3 }}>{item.size}{item.duration ? ` · ${item.duration}` : ""}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {filtered.map((item, i) => (
                <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer",
                  background: selected === i ? "rgba(255,255,255,0.03)" : "transparent",
                }}>
                  <span style={{ fontSize: "0.6rem", opacity: 0.15, width: 24, textAlign: "center" }}>{typeIcon(item.type)}</span>
                  <span style={{ fontSize: "0.52rem", fontWeight: 700, opacity: 0.6, flex: 1 }}>{item.name}</span>
                  <span style={{ fontSize: "0.44rem", opacity: 0.2, minWidth: 50 }}>{item.type}</span>
                  <span style={{ fontSize: "0.44rem", opacity: 0.2, minWidth: 60 }}>{item.size}</span>
                  <span style={{ fontSize: "0.44rem", opacity: 0.15, minWidth: 60 }}>{item.created}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {detail && (
          <div style={{ width: 220, borderLeft: "1px solid rgba(255,255,255,0.08)", padding: "24px 0 24px 20px", flexShrink: 0 }}>
            <div style={{
              width: "100%", aspectRatio: "1", border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 16, background: "#0a0a0a",
            }}>
              <span style={{ fontSize: "2rem", opacity: 0.1 }}>{typeIcon(detail.type)}</span>
            </div>
            <div style={{ fontSize: "0.58rem", fontWeight: 700, marginBottom: 4, wordBreak: "break-all" }}>{detail.name}</div>
            <Badge>{detail.type.toUpperCase()}</Badge>
            <div style={{ height: 1, background: GRAD, width: 40, margin: "14px 0", opacity: 0.5 }} />

            {[
              ["Size", detail.size],
              detail.duration ? ["Duration", detail.duration] : null,
              detail.bpm ? ["BPM", detail.bpm] : null,
              detail.key ? ["Key", detail.key] : null,
              ["Source", detail.agent],
              ["Created", detail.created],
            ].filter(Boolean).map(([label, value]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: "0.5rem", opacity: 0.5 }}>{value}</div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
              <button style={{ fontFamily: font.mono, fontSize: "0.42rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "5px 10px", cursor: "pointer" }}>
                DOWNLOAD
              </button>
              <button style={{ fontFamily: font.mono, fontSize: "0.42rem", fontWeight: 700, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "5px 10px", cursor: "pointer" }}>
                SHARE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. SLA MONITOR / UPTIME
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SLAMonitorTemplate() {
  const services = [
    {
      name: "api.blackroad.io",
      sla: "99.95%", actual: "99.97%", budget: "4m 23s remaining",
      days: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
    {
      name: "app.blackroad.io",
      sla: "99.9%", actual: "99.99%", budget: "8m 38s remaining",
      days: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
    {
      name: "gov.api.blackroad.io",
      sla: "99.99%", actual: "100%", budget: "Full budget",
      days: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
    {
      name: "mesh.blackroad.network",
      sla: "99.9%", actual: "99.95%", budget: "5m 12s remaining",
      days: [1,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
    {
      name: "vectors.blackroad.systems",
      sla: "99.9%", actual: "98.2%", budget: "EXCEEDED",
      days: [1,1,1,1,1,1,1,1,0,0.5,1,1,1,1,1,0.5,1,1,1,0,0.5,1,1,1,1,1,0.5,0.5,0.5,1],
    },
    {
      name: "ws.blackroad.io",
      sla: "99.9%", actual: "99.98%", budget: "7m 42s remaining",
      days: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
    {
      name: "ledger.blackroad.systems",
      sla: "99.99%", actual: "100%", budget: "Full budget",
      days: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
  ];

  const dayColor = (v) => {
    if (v === 1) return "#fff";
    if (v >= 0.5) return "rgba(255,255,255,0.4)";
    return "#FF0066";
  };

  const breached = services.filter((s) => s.budget === "EXCEEDED").length;
  const healthy = services.filter((s) => parseFloat(s.actual) >= parseFloat(s.sla)).length;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Service Level Agreements · 30-Day Window
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          SLA Monitor
        </h1>
        <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 460, marginTop: 14 }}>
          Error budget tracking across all production services. Each square represents one day of uptime status.
        </p>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />

        <div style={{ display: "flex", gap: 0, marginTop: 20 }}>
          {[
            { v: `${healthy}/${services.length}`, l: "Meeting SLA" },
            { v: String(breached), l: "Budget Exceeded" },
            { v: "30d", l: "Window" },
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

      {/* Service SLA cards */}
      {services.map((svc, si) => {
        const met = parseFloat(svc.actual) >= parseFloat(svc.sla);
        return (
          <div key={si} style={{ padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Dot color={met ? "#FF8400" : "#FF0066"} size={7} />
                <span style={{ fontSize: "0.58rem", fontWeight: 700, opacity: 0.7 }}>{svc.name}</span>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase" }}>Target</div>
                  <div style={{ fontSize: "0.52rem", opacity: 0.35 }}>{svc.sla}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase" }}>Actual</div>
                  <div style={{ fontSize: "0.52rem", fontWeight: 700, opacity: met ? 0.6 : 0.9 }}>{svc.actual}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.4rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase" }}>Budget</div>
                  <div style={{ fontSize: "0.48rem", opacity: svc.budget === "EXCEEDED" ? 0.8 : 0.35, fontWeight: svc.budget === "EXCEEDED" ? 700 : 400 }}>
                    {svc.budget}
                  </div>
                </div>
              </div>
            </div>

            {/* Day grid */}
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {svc.days.map((d, di) => (
                <div key={di} style={{
                  width: "100%", maxWidth: 22, aspectRatio: "1",
                  background: dayColor(d), opacity: d === 1 ? 0.12 : d >= 0.5 ? 0.4 : 1,
                  flexShrink: 1,
                }} />
              ))}
              <span style={{ fontSize: "0.36rem", opacity: 0.12, marginLeft: 4, flexShrink: 0 }}>30d</span>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div style={{ padding: "20px 0 48px", display: "flex", gap: 20 }}>
        {[
          { color: "#fff", opacity: 0.12, label: "Full uptime" },
          { color: "#fff", opacity: 0.4, label: "Partial outage" },
          { color: "#FF0066", opacity: 1, label: "Major outage" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, background: l.color, opacity: l.opacity }} />
            <span style={{ fontSize: "0.42rem", opacity: 0.25 }}>{l.label}</span>
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
