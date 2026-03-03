import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export default function BlackRoadTemplates3() {
  const [active, setActive] = useState("onboarding");

  const templates = [
    { id: "onboarding", label: "Onboarding" },
    { id: "inbox", label: "Inbox" },
    { id: "vault", label: "Vault" },
    { id: "terminal", label: "Terminal" },
    { id: "roadmap", label: "Roadmap" },
    { id: "errors", label: "Status" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "onboarding": return <OnboardingTemplate />;
      case "inbox": return <InboxTemplate />;
      case "vault": return <VaultTemplate />;
      case "terminal": return <TerminalTemplate />;
      case "roadmap": return <RoadmapTemplate />;
      case "errors": return <StatusTemplate />;
      default: return <OnboardingTemplate />;
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
// 1. ONBOARDING WIZARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OnboardingTemplate() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [interests, setInterests] = useState([]);

  const toggleInterest = (i) => setInterests((prev) =>
    prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
  );

  const steps = [
    { label: "Identity", num: "01" },
    { label: "Role", num: "02" },
    { label: "Interests", num: "03" },
    { label: "Workspace", num: "04" },
    { label: "Launch", num: "05" },
  ];

  const roles = ["Creator", "Student", "Teacher", "Developer", "Researcher", "Founder"];
  const interestList = [
    "AI Agents", "Music Production", "Game Dev", "Mathematics",
    "Quantum Computing", "Education", "Automation", "Video",
    "Finance", "Writing", "Open Source", "Hardware",
  ];

  return (
    <div style={{ padding: "56px 0 48px" }}>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 48 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
              opacity: i <= step ? 1 : 0.2,
            }} onClick={() => setStep(i)}>
              <div style={{
                width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.44rem", fontWeight: 700,
                border: i === step ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                background: i < step ? "#fff" : "transparent",
                color: i < step ? "#000" : "#fff",
              }}>
                {i < step ? "✓" : s.num}
              </div>
              <span style={{ fontSize: "0.48rem", fontWeight: i === step ? 700 : 400 }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1, margin: "0 12px", background: i < step ? "#fff" : "rgba(255,255,255,0.08)" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div style={{ minHeight: 320, borderBottom: "1px solid #fff", paddingBottom: 48 }}>
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: font.headline, fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>Welcome to BlackRoad</h2>
            <p style={{ fontSize: "0.62rem", opacity: 0.4, lineHeight: 1.9, maxWidth: 460, marginBottom: 32 }}>
              You bring your chaos, your curiosity, your half-finished dreams. BlackRoad brings structure, compute, and care.
            </p>
            <div style={{ height: 1, background: GRAD, width: 100, marginBottom: 32 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 360 }}>
              <InputField label="Display Name" placeholder="Your name" />
              <InputField label="Email" placeholder="you@example.com" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: font.headline, fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>What describes you best?</h2>
            <p style={{ fontSize: "0.56rem", opacity: 0.35, marginBottom: 28 }}>This shapes your default workspace. You can change it anytime.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
              {roles.map((r, i) => (
                <div key={i} onClick={() => setRole(r)} style={{
                  padding: "20px 16px", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderRight: (i % 3 < 2) ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: role === r ? "#fff" : "transparent",
                  color: role === r ? "#000" : "#fff",
                  transition: "all 0.1s",
                }}>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700 }}>{r}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: font.headline, fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>What are you interested in?</h2>
            <p style={{ fontSize: "0.56rem", opacity: 0.35, marginBottom: 28 }}>Select all that apply. Agents will prioritize these domains.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {interestList.map((item) => (
                <button key={item} onClick={() => toggleInterest(item)} style={{
                  fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 700,
                  padding: "7px 14px", cursor: "pointer", letterSpacing: "0.05em",
                  background: interests.includes(item) ? "#fff" : "transparent",
                  color: interests.includes(item) ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  transition: "all 0.1s",
                }}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: font.headline, fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>Name your workspace</h2>
            <p style={{ fontSize: "0.56rem", opacity: 0.35, marginBottom: 28 }}>This is your home inside BlackRoad OS.</p>
            <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 20 }}>
              <InputField label="Workspace Name" placeholder="my-studio" />
              <div style={{ fontSize: "0.48rem", opacity: 0.2 }}>
                Your workspace will be available at <span style={{ opacity: 0.5 }}>my-studio.blackroad.io</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center", paddingTop: 32 }}>
            <h2 style={{ fontFamily: font.headline, fontSize: "2.4rem", fontWeight: 700, marginBottom: 8 }}>You're in.</h2>
            <p style={{ fontSize: "0.62rem", opacity: 0.4, lineHeight: 1.9, maxWidth: 400, margin: "0 auto 28px" }}>
              Your workspace is ready. Cecilia is online and waiting. The road is yours.
            </p>
            <div style={{ height: 2, background: GRAD, width: 160, margin: "0 auto 28px" }} />
            <div style={{ display: "flex", gap: 0, justifyContent: "center" }}>
              {[
                { v: role || "Creator", l: "Role" },
                { v: String(interests.length), l: "Interests" },
                { v: "1", l: "Agent Ready" },
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
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} style={{
          fontFamily: font.mono, fontSize: "0.52rem", fontWeight: 700,
          background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
          padding: "8px 20px", cursor: "pointer", letterSpacing: "0.05em",
          opacity: step === 0 ? 0.15 : 1, pointerEvents: step === 0 ? "none" : "auto",
        }}>
          Back
        </button>
        <button onClick={() => setStep(Math.min(4, step + 1))} style={{
          fontFamily: font.mono, fontSize: "0.52rem", fontWeight: 700,
          background: step === 4 ? GRAD : "#fff", color: "#000",
          border: "none", padding: "8px 20px", cursor: "pointer", letterSpacing: "0.05em",
        }}>
          {step === 4 ? "Launch Workspace" : "Continue"}
        </button>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. INBOX / NOTIFICATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function InboxTemplate() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filters = ["all", "agents", "governance", "system", "mentions"];
  const messages = [
    { id: 0, from: "cecilia", time: "2m", subject: "Memory commit #4821 complete", preview: "Append-only journal updated. 3 new entries written to PS-SHA∞ chain. Hash verified against previous checkpoint.", type: "agents", unread: true },
    { id: 1, from: "cece", time: "8m", subject: "Policy update: edu.review scope", preview: "New policy deployed for education vertical. Only users with teacher role can now mark submissions as reviewed. Ledger entry created.", type: "governance", unread: true },
    { id: 2, from: "eve", time: "15m", subject: "Anomaly detected — mesh.na1 latency spike", preview: "Latency on NA1 mesh cluster exceeded p99 threshold at 14:28 UTC. Auto-scaling triggered. Resolved within 2 minutes. No data loss.", type: "agents", unread: true },
    { id: 3, from: "system", time: "34m", subject: "DNS propagation complete", preview: "All core subdomains now resolving correctly via Cloudflare. TLS certificates issued for edu.blackroad.io and homework.blackroad.io.", type: "system", unread: false },
    { id: 4, from: "cadence", time: "1h", subject: "Composition #42 exported", preview: "Track exported in WAV and MP3 formats. Duration: 3:42. BPM: 108. Key: C minor. Available in your vault.", type: "agents", unread: false },
    { id: 5, from: "alice", time: "2h", subject: "Gateway health check passed", preview: "All 7 endpoints responding within SLA. WebSocket connections stable at 2,400 concurrent. No certificate warnings.", type: "system", unread: false },
    { id: 6, from: "cece", time: "3h", subject: "Weekly governance summary", preview: "12,400 policy evaluations. 0 bypasses. 2 new policies deployed. Ledger integrity verified across all partitions.", type: "governance", unread: false },
    { id: 7, from: "system", time: "5h", subject: "Scheduled maintenance window", preview: "Database migration scheduled for March 5, 02:00-04:00 UTC. Expected downtime: 0 minutes (rolling migration). Backup created.", type: "system", unread: false },
  ];

  const filtered = filter === "all" ? messages : messages.filter((m) => m.type === filter);
  const active = selected !== null ? messages.find((m) => m.id === selected) : null;

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Notifications · {messages.filter((m) => m.unread).length} unread
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Inbox
            </h1>
          </div>
          <button style={{
            fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
            background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
            padding: "5px 12px", cursor: "pointer", opacity: 0.4,
          }}>
            MARK ALL READ
          </button>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {filters.map((f) => (
          <button key={f} onClick={() => { setFilter(f); setSelected(null); }} style={{
            fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700,
            padding: "12px 16px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase",
            background: "none", border: "none", color: "#fff",
            opacity: filter === f ? 1 : 0.25,
            borderBottom: filter === f ? "1px solid #fff" : "1px solid transparent",
            marginBottom: -1,
          }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #fff", minHeight: 400 }}>
        {/* Message List */}
        <div style={{ width: active ? "45%" : "100%", borderRight: active ? "1px solid rgba(255,255,255,0.08)" : "none", transition: "width 0.2s" }}>
          {filtered.map((m) => (
            <div key={m.id} onClick={() => setSelected(m.id)} style={{
              padding: "16px 16px 16px 0", cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: selected === m.id ? "rgba(255,255,255,0.03)" : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                {m.unread && <div style={{ width: 5, height: 5, background: "#fff", flexShrink: 0 }} />}
                <span style={{ fontSize: "0.54rem", fontWeight: 700, opacity: m.unread ? 1 : 0.5 }}>{m.from}</span>
                <span style={{ fontSize: "0.42rem", opacity: 0.15, marginLeft: "auto" }}>{m.time}</span>
              </div>
              <div style={{ fontSize: "0.52rem", opacity: m.unread ? 0.7 : 0.35, marginBottom: 2, paddingLeft: m.unread ? 13 : 0 }}>{m.subject}</div>
              {!active && (
                <div style={{ fontSize: "0.48rem", opacity: 0.2, paddingLeft: m.unread ? 13 : 0, lineHeight: 1.6, maxHeight: "1.6em", overflow: "hidden" }}>
                  {m.preview}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        {active && (
          <div style={{ flex: 1, padding: "24px 0 24px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Dot color="#FF8400" size={8} />
              <span style={{ fontSize: "0.58rem", fontWeight: 700 }}>{active.from}</span>
              <Badge>{active.type.toUpperCase()}</Badge>
              <span style={{ fontSize: "0.42rem", opacity: 0.15, marginLeft: "auto" }}>{active.time} ago</span>
            </div>
            <h3 style={{ fontFamily: font.headline, fontSize: "1.1rem", fontWeight: 700, margin: "16px 0 12px" }}>{active.subject}</h3>
            <div style={{ height: 1, background: GRAD, width: 60, marginBottom: 16, opacity: 0.5 }} />
            <p style={{ fontSize: "0.6rem", opacity: 0.45, lineHeight: 2 }}>{active.preview}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              <button style={{ fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "6px 14px", cursor: "pointer" }}>
                ACKNOWLEDGE
              </button>
              <button style={{ fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 14px", cursor: "pointer" }}>
                DISMISS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. VAULT (FILE MANAGER)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function VaultTemplate() {
  const [path, setPath] = useState(["vault"]);

  const items = [
    { name: "agents/", type: "folder", modified: "Mar 3", size: "—", items: 12 },
    { name: "compositions/", type: "folder", modified: "Mar 2", size: "—", items: 89 },
    { name: "equations/", type: "folder", modified: "Feb 28", size: "—", items: 7 },
    { name: "memories/", type: "folder", modified: "Mar 3", size: "—", items: 4821 },
    { name: "workspaces/", type: "folder", modified: "Mar 1", size: "—", items: 3 },
    { name: "genesis-road-spec.md", type: "file", modified: "Feb 28", size: "24KB" },
    { name: "z-framework-proof.tex", type: "file", modified: "Feb 15", size: "18KB" },
    { name: "pauli-model-v3.py", type: "file", modified: "Feb 20", size: "8.2KB" },
    { name: "spiral-operator.ipynb", type: "file", modified: "Jan 30", size: "142KB" },
    { name: "roadwork-wireframes.fig", type: "file", modified: "Feb 22", size: "3.1MB" },
    { name: "agent-birth-certs.json", type: "file", modified: "Mar 1", size: "456KB" },
    { name: "README.md", type: "file", modified: "Mar 3", size: "2.1KB" },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Second Brain · {items.length} items
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Vault
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* Breadcrumb + Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {path.map((p, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i > 0 && <span style={{ opacity: 0.15, fontSize: "0.5rem" }}>/</span>}
              <span style={{ fontSize: "0.52rem", opacity: i === path.length - 1 ? 0.7 : 0.3, cursor: "pointer" }}>{p}</span>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "5px 10px", cursor: "pointer" }}>
            UPLOAD
          </button>
          <button style={{ fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "5px 10px", cursor: "pointer" }}>
            + NEW
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <input placeholder="Search vault… (semantic)" readOnly style={{
          fontFamily: font.mono, fontSize: "0.56rem", color: "#fff",
          background: "transparent", border: "none", outline: "none",
          width: "100%", opacity: 0.25, padding: "4px 0",
        }} />
      </div>

      {/* File List */}
      <div style={{ borderBottom: "1px solid #fff" }}>
        {/* Header */}
        <div style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            { label: "Name", flex: 1 },
            { label: "Modified", width: 80 },
            { label: "Size", width: 70 },
          ].map((h, i) => (
            <span key={i} style={{
              fontSize: "0.42rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase",
              flex: h.flex, width: h.width, minWidth: h.width,
            }}>
              {h.label}
            </span>
          ))}
        </div>

        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer",
          }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              {item.type === "folder" ? (
                <div style={{ width: 10, height: 8, border: "1px solid rgba(255,255,255,0.3)", borderTop: "2px solid rgba(255,255,255,0.4)", flexShrink: 0 }} />
              ) : (
                <div style={{ width: 8, height: 10, border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }} />
              )}
              <span style={{ fontSize: "0.56rem", fontWeight: item.type === "folder" ? 700 : 400, opacity: item.type === "folder" ? 0.8 : 0.5 }}>
                {item.name}
              </span>
              {item.items && <span style={{ fontSize: "0.4rem", opacity: 0.15 }}>{item.items} items</span>}
            </div>
            <span style={{ fontSize: "0.48rem", opacity: 0.2, width: 80, minWidth: 80 }}>{item.modified}</span>
            <span style={{ fontSize: "0.48rem", opacity: 0.15, width: 70, minWidth: 70 }}>{item.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. TERMINAL / CONSOLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TerminalTemplate() {
  const lines = [
    { type: "system", text: "BlackRoad OS v0.4.0 · Terminal · Connected to mesh.na1" },
    { type: "divider" },
    { type: "input", text: "blackroad status" },
    { type: "output", text: "  agents:     117 online  ·  3 alert  ·  12 idle" },
    { type: "output", text: "  memory:     2.4M events  ·  last commit 2m ago" },
    { type: "output", text: "  governance: 12,400 evals  ·  0 bypasses" },
    { type: "output", text: "  mesh:       NA1 ✓  ·  EU1 ✓  ·  AP1 ✓" },
    { type: "output", text: "  uptime:     99.97%  ·  p99 latency 42ms" },
    { type: "divider" },
    { type: "input", text: "agent spawn –name meridian –capabilities reasoning,architecture" },
    { type: "output", text: "  ⟩ spawning agent meridian…" },
    { type: "output", text: "  ⟩ PS-SHA∞ identity hash: 0xf4a2…8e1c" },
    { type: "output", text: "  ⟩ memory journal initialized (append-only)" },
    { type: "output", text: "  ⟩ capabilities registered: reasoning, architecture" },
    { type: "output", text: "  ⟩ agent meridian is ONLINE" },
    { type: "divider" },
    { type: "input", text: 'cece evaluate –subject user:alexa –action edu.review –resource submission:42' },
    { type: "output", text: "  policy:   edu.review.teacher-only" },
    { type: "output", text: "  decision: ALLOW" },
    { type: "output", text: "  reason:   subject has role=teacher for resource scope" },
    { type: "output", text: "  ledger:   event #8921 written" },
    { type: "divider" },
    { type: "input", text: 'vault search "spiral operator proof"' },
    { type: "output", text: "  1. spiral-operator.ipynb       (142KB · relevance: 0.94)" },
    { type: "output", text: "  2. z-framework-proof.tex       (18KB  · relevance: 0.71)" },
    { type: "output", text: "  3. pauli-model-v3.py           (8.2KB · relevance: 0.68)" },
    { type: "divider" },
    { type: "cursor" },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Prism Console · mesh.na1
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Terminal
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      <div style={{
        background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 24px", margin: "32px 0", minHeight: 400,
        borderBottom: "1px solid #fff",
      }}>
        {lines.map((line, i) => {
          if (line.type === "divider") return <div key={i} style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "8px 0" }} />;
          if (line.type === "system") return (
            <div key={i} style={{ fontSize: "0.5rem", opacity: 0.2, marginBottom: 8, lineHeight: 1.8 }}>{line.text}</div>
          );
          if (line.type === "input") return (
            <div key={i} style={{ fontSize: "0.58rem", lineHeight: 1.8, display: "flex", gap: 8 }}>
              <span style={{ opacity: 0.3 }}>❯</span>
              <span style={{ opacity: 0.8, fontWeight: 700 }}>{line.text}</span>
            </div>
          );
          if (line.type === "cursor") return (
            <div key={i} style={{ fontSize: "0.58rem", lineHeight: 1.8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ opacity: 0.3 }}>❯</span>
              <div style={{
                width: 7, height: 14, background: "#fff",
                animation: "blink 1s step-end infinite",
              }} />
              <style>{`@keyframes blink { 0%,49%,100%{opacity:1} 50%,99%{opacity:0} }`}</style>
            </div>
          );
          return (
            <div key={i} style={{ fontSize: "0.54rem", opacity: 0.4, lineHeight: 1.8, paddingLeft: 18 }}>{line.text}</div>
          );
        })}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. ROADMAP / TIMELINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RoadmapTemplate() {
  const phases = [
    {
      label: "Phase 1 · MVP", period: "Months 1–6", status: "IN PROGRESS",
      milestones: [
        { name: "Lucidia Core — chat + memory + code execution", done: true },
        { name: "Core app shell at app.blackroad.io", done: true },
        { name: "Auth baseline with role system", done: true },
        { name: "Cece governance spine — policy + ledger", done: false },
        { name: "RoadWork v0 — homework flow", done: false },
        { name: "First Pi agent registered on mesh", done: false },
      ],
    },
    {
      label: "Phase 2 · Creation Tools", period: "Months 6–12", status: "PLANNED",
      milestones: [
        { name: "RoadView — AI video generation + multi-length export", done: false },
        { name: "Lucidia Code — voice commands + collaborative editing", done: false },
        { name: "Genesis Road — basic 3D engine + asset library", done: false },
        { name: "SoundRoad — hum-to-track + vibe-based production", done: false },
      ],
    },
    {
      label: "Phase 3 · Business Suite", period: "Months 12–18", status: "PLANNED",
      milestones: [
        { name: "CashRoad — financial co-pilot with no judgment", done: false },
        { name: "Legal automation — trademark filing + contracts", done: false },
        { name: "Unified payments + accounting", done: false },
      ],
    },
    {
      label: "Phase 4 · Academy & Research", period: "Months 18–24", status: "FUTURE",
      milestones: [
        { name: "RoadWork v1 — course platform + AI tutors", done: false },
        { name: "Research repository + paper publishing", done: false },
        { name: "Study groups + certifications", done: false },
      ],
    },
    {
      label: "Phase 5 · Agent Society", period: "Months 24+", status: "FUTURE",
      milestones: [
        { name: "1,000 unique agents with individual identities", done: false },
        { name: "Unity-rendered virtual homes", done: false },
        { name: "Agent-to-agent economy on RoadChain", done: false },
      ],
    },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Execution Plan · 5 Phases
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Roadmap
        </h1>
        <p style={{ fontSize: "0.62rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 460, marginTop: 16 }}>
          From MVP to agent society. Priority: one truly working vertical before maximum surface area.
        </p>
        <div style={{ height: 1, background: GRAD, width: 160, margin: "24px 0 0" }} />
      </div>

      {phases.map((phase, pi) => (
        <div key={pi} style={{ padding: "36px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            {/* Timeline dot and line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0, alignSelf: "flex-start", paddingTop: 2 }}>
              <div style={{
                width: 10, height: 10,
                border: "1px solid #fff",
                background: phase.status === "IN PROGRESS" ? "#fff" : "transparent",
              }} />
              {pi < phases.length - 1 && <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.08)", marginTop: 4 }} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: font.headline, fontSize: "1.1rem", fontWeight: 700 }}>{phase.label}</span>
                <Badge>{phase.status}</Badge>
              </div>
              <span style={{ fontSize: "0.48rem", opacity: 0.2 }}>{phase.period}</span>

              <div style={{ marginTop: 16 }}>
                {phase.milestones.map((m, mi) => (
                  <div key={mi} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "7px 0",
                    borderBottom: mi < phase.milestones.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                  }}>
                    <div style={{
                      width: 8, height: 8, flexShrink: 0,
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: m.done ? "#fff" : "transparent",
                    }} />
                    <span style={{ fontSize: "0.52rem", opacity: m.done ? 0.6 : 0.3, textDecoration: m.done ? "line-through" : "none" }}>
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress bar */}
      <div style={{ padding: "24px 0 48px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.46rem", opacity: 0.3, letterSpacing: "0.12em", textTransform: "uppercase" }}>Overall Progress</span>
          <span style={{ fontSize: "0.48rem", opacity: 0.3 }}>3 / 21 milestones</span>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height: 3, background: GRAD, width: `${(3 / 21) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. STATUS / ERROR PAGES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StatusTemplate() {
  const [page, setPage] = useState("status");
  const pages = ["status", "404", "maintenance", "offline"];

  const services = [
    { name: "app.blackroad.io", status: "operational", uptime: "99.99%" },
    { name: "api.blackroad.io", status: "operational", uptime: "99.97%" },
    { name: "gov.api.blackroad.io", status: "operational", uptime: "100%" },
    { name: "mesh.blackroad.network", status: "operational", uptime: "99.95%" },
    { name: "ws.blackroad.io", status: "operational", uptime: "99.98%" },
    { name: "vectors.blackroad.systems", status: "degraded", uptime: "98.2%" },
    { name: "edu.blackroad.io", status: "operational", uptime: "99.99%" },
    { name: "ledger.blackroad.systems", status: "operational", uptime: "100%" },
  ];

  const incidents = [
    { date: "Mar 2, 2026", title: "Vector search latency spike", status: "Monitoring", desc: "Elevated response times on vectors.blackroad.systems. Auto-scaling triggered." },
    { date: "Feb 18, 2026", title: "WebSocket reconnection loop", status: "Resolved", desc: "Gateway failover caused clients to enter reconnection loop. Hotfix deployed." },
  ];

  if (page === "404") return (
    <div style={{ textAlign: "center", padding: "120px 0" }}>
      <div style={{ fontFamily: font.headline, fontSize: "8rem", fontWeight: 700, lineHeight: 1, opacity: 0.08 }}>404</div>
      <h2 style={{ fontFamily: font.headline, fontSize: "1.6rem", fontWeight: 700, marginTop: -20, marginBottom: 8 }}>Road Not Found</h2>
      <p style={{ fontSize: "0.58rem", opacity: 0.35, marginBottom: 24 }}>The path you're looking for doesn't exist in this universe.</p>
      <div style={{ height: 2, background: GRAD, width: 80, margin: "0 auto 24px" }} />
      <button style={{ fontFamily: font.mono, fontSize: "0.52rem", fontWeight: 700, background: "#fff", color: "#000", border: "none", padding: "8px 20px", cursor: "pointer" }}>
        Go Home
      </button>
      <div style={{ marginTop: 48 }}>
        <button onClick={() => setPage("status")} style={{ fontFamily: font.mono, fontSize: "0.44rem", background: "none", border: "none", color: "#fff", opacity: 0.2, cursor: "pointer" }}>
          ← Back to status pages
        </button>
      </div>
    </div>
  );

  if (page === "maintenance") return (
    <div style={{ textAlign: "center", padding: "120px 0" }}>
      <div style={{ fontFamily: font.headline, fontSize: "2.4rem", fontWeight: 700, marginBottom: 8 }}>Under Maintenance</div>
      <p style={{ fontSize: "0.58rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 380, margin: "0 auto 24px" }}>
        We're performing scheduled maintenance on the infrastructure layer. Expected duration: 2 hours.
      </p>
      <div style={{ height: 2, background: GRAD, width: 120, margin: "0 auto 28px" }} />
      <div style={{ display: "flex", justifyContent: "center", gap: 0 }}>
        {[{ v: "02:00", l: "Start (UTC)" }, { v: "04:00", l: "End (UTC)" }, { v: "0m", l: "Expected Downtime" }].map((s, i, arr) => (
          <div key={i} style={{
            paddingRight: 24, marginRight: 24,
            borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
          }}>
            <div style={{ fontFamily: font.headline, fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: "0.42rem", opacity: 0.3, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48 }}>
        <button onClick={() => setPage("status")} style={{ fontFamily: font.mono, fontSize: "0.44rem", background: "none", border: "none", color: "#fff", opacity: 0.2, cursor: "pointer" }}>
          ← Back to status pages
        </button>
      </div>
    </div>
  );

  if (page === "offline") return (
    <div style={{ textAlign: "center", padding: "120px 0" }}>
      <div style={{ fontFamily: font.headline, fontSize: "2.4rem", fontWeight: 700, marginBottom: 8 }}>You're Offline</div>
      <p style={{ fontSize: "0.58rem", opacity: 0.35, marginBottom: 24 }}>Check your connection. BlackRoad will reconnect automatically.</p>
      <div style={{ height: 2, background: GRAD, width: 60, margin: "0 auto 28px" }} />
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        <Dot color="rgba(255,255,255,0.15)" size={8} />
        <span style={{ fontSize: "0.52rem", opacity: 0.25 }}>Waiting for connection…</span>
      </div>
      <div style={{ marginTop: 48 }}>
        <button onClick={() => setPage("status")} style={{ fontFamily: font.mono, fontSize: "0.44rem", background: "none", border: "none", color: "#fff", opacity: 0.2, cursor: "pointer" }}>
          ← Back to status pages
        </button>
      </div>
    </div>
  );

  // Default: status page
  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          System Health · Real-Time
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
            Status
          </h1>
          <div style={{ display: "flex", gap: 8 }}>
            {pages.filter((p) => p !== "status").map((p) => (
              <button key={p} onClick={() => setPage(p)} style={{
                fontFamily: font.mono, fontSize: "0.44rem", fontWeight: 700,
                background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)",
                padding: "4px 10px", cursor: "pointer", opacity: 0.4,
              }}>
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0 0" }} />
      </div>

      {/* All Systems */}
      <Section label="Services">
        {services.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
            borderBottom: i < services.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <Dot color={s.status === "operational" ? "#FF8400" : "#FF0066"} size={6} />
            <span style={{ fontSize: "0.56rem", fontWeight: 700, flex: 1, opacity: 0.7 }}>{s.name}</span>
            <span style={{ fontSize: "0.48rem", opacity: 0.3, minWidth: 90 }}>{s.status}</span>
            <span style={{ fontSize: "0.48rem", opacity: 0.2, minWidth: 60, textAlign: "right" }}>{s.uptime}</span>
          </div>
        ))}
      </Section>

      {/* Incidents */}
      <Section label="Recent Incidents">
        {incidents.map((inc, i) => (
          <div key={i} style={{ padding: "16px 0", borderBottom: i < incidents.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: "0.48rem", opacity: 0.2 }}>{inc.date}</span>
              <Badge>{inc.status.toUpperCase()}</Badge>
            </div>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, marginBottom: 4 }}>{inc.title}</div>
            <div style={{ fontSize: "0.52rem", opacity: 0.35, lineHeight: 1.7 }}>{inc.desc}</div>
          </div>
        ))}
      </Section>
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
