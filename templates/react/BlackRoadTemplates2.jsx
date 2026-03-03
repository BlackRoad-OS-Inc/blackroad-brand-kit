import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export default function BlackRoadTemplates2() {
  const [active, setActive] = useState("login");

  const templates = [
    { id: "login", label: "Login" },
    { id: "pricing", label: "Pricing" },
    { id: "changelog", label: "Changelog" },
    { id: "settings", label: "Settings" },
    { id: "docs", label: "Docs" },
    { id: "analytics", label: "Analytics" },
  ];

  const renderTemplate = () => {
    switch (active) {
      case "login": return <LoginTemplate />;
      case "pricing": return <PricingTemplate />;
      case "changelog": return <ChangelogTemplate />;
      case "settings": return <SettingsTemplate />;
      case "docs": return <DocsTemplate />;
      case "analytics": return <AnalyticsTemplate />;
      default: return <LoginTemplate />;
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
// 1. LOGIN TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LoginTemplate() {
  const [mode, setMode] = useState("login");

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "80px 0 60px" }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        {/* Wordmark */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: font.headline, fontSize: "1.8rem", fontWeight: 700 }}>BlackRoad</div>
          <div style={{ height: 2, width: 64, background: GRAD, margin: "10px auto 0" }} />
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.15)", marginBottom: 32 }}>
          {["login", "signup"].map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, background: "none", border: "none", color: "#fff",
              fontFamily: font.mono, fontSize: "0.52rem", letterSpacing: "0.15em",
              textTransform: "uppercase", padding: "12px 0", cursor: "pointer",
              opacity: mode === m ? 1 : 0.3,
              borderBottom: mode === m ? "1px solid #fff" : "1px solid transparent",
              marginBottom: -1, transition: "all 0.15s",
            }}>
              {m === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {mode === "signup" && (
            <InputField label="Full Name" placeholder="Alexa Amundson" />
          )}
          <InputField label="Email" placeholder="you@blackroad.io" />
          <InputField label="Password" placeholder="••••••••••" type="password" />

          {mode === "signup" && (
            <div>
              <div style={{ fontSize: "0.46rem", opacity: 0.3, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                Role
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Creator", "Student", "Teacher", "Builder"].map((r) => (
                  <button key={r} style={{
                    fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700,
                    padding: "5px 12px", border: "1px solid rgba(255,255,255,0.25)",
                    background: "transparent", color: "#fff", cursor: "pointer",
                    letterSpacing: "0.06em",
                  }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button style={{
            fontFamily: font.mono, fontSize: "0.58rem", fontWeight: 700,
            background: "#fff", color: "#000", padding: "12px 0",
            border: "none", cursor: "pointer", letterSpacing: "0.05em",
            marginTop: 8, width: "100%",
          }}>
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "0.44rem", opacity: 0.2 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          <button style={{
            fontFamily: font.mono, fontSize: "0.54rem", fontWeight: 700,
            background: "transparent", color: "#fff", padding: "11px 0",
            border: "1px solid #fff", cursor: "pointer", letterSpacing: "0.05em",
            width: "100%",
          }}>
            Continue with Magic Link
          </button>
        </div>

        {mode === "login" && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <span style={{ fontSize: "0.48rem", opacity: 0.25, cursor: "pointer" }}>Forgot password?</span>
          </div>
        )}

        <div style={{ height: 1, background: GRAD, width: 40, margin: "40px auto 0", opacity: 0.5 }} />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. PRICING TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PricingTemplate() {
  const plans = [
    {
      name: "Free", price: "$0", period: "forever",
      features: ["5 agents", "1GB memory", "Community support", "Basic governance", "Single workspace"],
      cta: "Get Started", style: "ghost",
    },
    {
      name: "Pro", price: "$29", period: "/month",
      features: ["50 agents", "50GB memory", "Priority support", "Full governance + ledger", "Unlimited workspaces", "API access", "Custom policies"],
      cta: "Start Free Trial", style: "primary", highlight: true,
    },
    {
      name: "Enterprise", price: "Custom", period: "",
      features: ["Unlimited agents", "Unlimited memory", "Dedicated support", "SOC 2 compliance", "Multi-region deploy", "Custom agent mesh", "SLA guarantee", "On-premise option"],
      cta: "Contact Sales", style: "ghost",
    },
  ];

  return (
    <div>
      <div style={{ padding: "64px 0 48px", borderBottom: "1px solid #fff", textAlign: "center" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Simple, Transparent Pricing
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2.2rem, 7vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Build Without<br />Limits
        </h1>
        <p style={{ fontSize: "0.62rem", opacity: 0.35, lineHeight: 1.9, maxWidth: 400, margin: "20px auto 0" }}>
          Free for K-12 education. Pay for what you use. No hidden fees. No lock-in.
        </p>
        <div style={{ height: 2, background: GRAD, width: 120, margin: "28px auto 0" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderBottom: "1px solid #fff" }}>
        {plans.map((p, i) => (
          <div key={i} style={{
            padding: "40px 24px",
            borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
            borderTop: p.highlight ? "2px solid #fff" : "none",
          }}>
            <div style={{ fontSize: "0.5rem", opacity: 0.3, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {p.name}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
              <span style={{ fontFamily: font.headline, fontSize: "2.4rem", fontWeight: 700, lineHeight: 1 }}>{p.price}</span>
              {p.period && <span style={{ fontSize: "0.5rem", opacity: 0.25 }}>{p.period}</span>}
            </div>

            <div style={{ height: 1, background: p.highlight ? GRAD : "rgba(255,255,255,0.08)", marginBottom: 24, maxWidth: p.highlight ? "100%" : 40 }} />

            {p.features.map((f, fi) => (
              <div key={fi} style={{
                fontSize: "0.52rem", opacity: 0.4, padding: "7px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)", lineHeight: 1.5,
              }}>
                {f}
              </div>
            ))}

            <button style={{
              fontFamily: font.mono, fontSize: "0.54rem", fontWeight: 700,
              width: "100%", padding: "10px 0", marginTop: 28, cursor: "pointer",
              letterSpacing: "0.05em",
              ...(p.style === "primary"
                ? { background: "#fff", color: "#000", border: "none" }
                : { background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }),
            }}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. CHANGELOG TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChangelogTemplate() {
  const entries = [
    {
      version: "0.4.0", date: "Mar 3, 2026", tag: "LATEST",
      changes: [
        { type: "FEATURE", text: "Agent mesh multi-region support (NA1, EU1, AP1)" },
        { type: "FEATURE", text: "Cece policy editor UI with live preview" },
        { type: "IMPROVE", text: "Memory commit throughput increased 3x via batch writes" },
        { type: "FIX", text: "WebSocket reconnection loop on gateway failover" },
      ],
    },
    {
      version: "0.3.2", date: "Feb 18, 2026", tag: "",
      changes: [
        { type: "FEATURE", text: "RoadWork homework flow — teacher creates, student submits, teacher reviews" },
        { type: "IMPROVE", text: "Ledger event schema v2 with actor and resource fields" },
        { type: "FIX", text: "Auth token refresh race condition on concurrent tabs" },
        { type: "FIX", text: "Vector search returning stale embeddings after memory update" },
      ],
    },
    {
      version: "0.3.0", date: "Feb 1, 2026", tag: "",
      changes: [
        { type: "FEATURE", text: "Governance spine — /policy/evaluate and /ledger/event endpoints live" },
        { type: "FEATURE", text: "Role-based access control (teacher, student, creator, admin)" },
        { type: "IMPROVE", text: "Dashboard KPI cards now pull real-time metrics" },
        { type: "CHORE", text: "Migrated DNS to Cloudflare for all core subdomains" },
      ],
    },
    {
      version: "0.2.0", date: "Jan 12, 2026", tag: "",
      changes: [
        { type: "FEATURE", text: "Core app shell at app.blackroad.io with auth baseline" },
        { type: "FEATURE", text: "First Pi agent registered and executed health check task" },
        { type: "CHORE", text: "Railway services provisioned for app, API gateway, operator" },
      ],
    },
  ];

  const tagColor = { FEATURE: 1, IMPROVE: 0.5, FIX: 0.35, CHORE: 0.2 };

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          What's New
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Changelog
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />
      </div>

      {entries.map((entry, ei) => (
        <div key={ei} style={{ padding: "40px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: font.headline, fontSize: "1.3rem", fontWeight: 700 }}>{entry.version}</span>
            <span style={{ fontSize: "0.48rem", opacity: 0.25 }}>{entry.date}</span>
            {entry.tag && <Badge>{entry.tag}</Badge>}
          </div>
          {entry.changes.map((c, ci) => (
            <div key={ci} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
              borderBottom: ci < entry.changes.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <span style={{
                fontSize: "0.42rem", fontWeight: 700, letterSpacing: "0.08em",
                padding: "2px 6px", border: "1px solid rgba(255,255,255,0.2)",
                minWidth: 56, textAlign: "center", opacity: tagColor[c.type] || 0.3,
              }}>
                {c.type}
              </span>
              <span style={{ fontSize: "0.54rem", opacity: 0.45, lineHeight: 1.5 }}>{c.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. SETTINGS TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SettingsTemplate() {
  const [toggles, setToggles] = useState({ darkMode: true, notifications: true, telemetry: false, twoFactor: false });

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Account Configuration
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Settings
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />
      </div>

      {/* Profile */}
      <Section label="Profile">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px", padding: "8px 0" }}>
          <InputField label="Display Name" placeholder="Alexa Amundson" value="Alexa Amundson" />
          <InputField label="Email" placeholder="founder@blackroad.systems" value="founder@blackroad.systems" />
          <InputField label="Role" placeholder="Admin" value="Founder / Admin" />
          <InputField label="Workspace" placeholder="BlackRoad OS" value="BlackRoad OS" />
        </div>
      </Section>

      {/* Preferences */}
      <Section label="Preferences">
        {[
          { key: "darkMode", label: "Dark Mode", desc: "Black background. White text. Always." },
          { key: "notifications", label: "Agent Notifications", desc: "Receive alerts when agents trigger events." },
          { key: "telemetry", label: "Usage Telemetry", desc: "Send anonymous usage data to improve the OS." },
          { key: "twoFactor", label: "Two-Factor Auth", desc: "Require 2FA for all sign-in attempts." },
        ].map((pref, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, marginBottom: 2 }}>{pref.label}</div>
              <div style={{ fontSize: "0.48rem", opacity: 0.25 }}>{pref.desc}</div>
            </div>
            <ToggleSwitch on={toggles[pref.key]} onClick={() => toggle(pref.key)} />
          </div>
        ))}
      </Section>

      {/* API Keys */}
      <Section label="API Keys">
        {[
          { name: "Production", key: "br_live_••••••••••••4f2a", created: "Jan 12, 2026" },
          { name: "Development", key: "br_test_••••••••••••8e1c", created: "Feb 1, 2026" },
        ].map((k, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
            borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <div style={{ minWidth: 100 }}>
              <div style={{ fontSize: "0.56rem", fontWeight: 700 }}>{k.name}</div>
              <div style={{ fontSize: "0.44rem", opacity: 0.2, marginTop: 2 }}>{k.created}</div>
            </div>
            <span style={{ fontSize: "0.52rem", opacity: 0.35, flex: 1 }}>{k.key}</span>
            <button style={{
              fontFamily: font.mono, fontSize: "0.46rem", fontWeight: 700,
              background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
              padding: "4px 10px", cursor: "pointer", letterSpacing: "0.05em",
            }}>
              REVEAL
            </button>
          </div>
        ))}
        <button style={{
          fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 700,
          background: "transparent", color: "#fff", border: "1px solid #fff",
          padding: "8px 16px", cursor: "pointer", letterSpacing: "0.05em", marginTop: 16,
        }}>
          + Generate New Key
        </button>
      </Section>

      {/* Danger Zone */}
      <Section label="Danger Zone">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
          <div>
            <div style={{ fontSize: "0.58rem", fontWeight: 700 }}>Delete Account</div>
            <div style={{ fontSize: "0.48rem", opacity: 0.25 }}>Permanently remove your account and all associated data.</div>
          </div>
          <button style={{
            fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700,
            background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
            padding: "6px 14px", cursor: "pointer", opacity: 0.4,
          }}>
            DELETE
          </button>
        </div>
      </Section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. DOCS TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DocsTemplate() {
  const [activePage, setActivePage] = useState("overview");

  const sidebar = [
    { section: "Getting Started", items: [
      { id: "overview", label: "Overview" },
      { id: "quickstart", label: "Quickstart" },
      { id: "auth", label: "Authentication" },
    ]},
    { section: "Core Concepts", items: [
      { id: "agents", label: "Agents" },
      { id: "memory", label: "Memory & PS-SHA∞" },
      { id: "governance", label: "Governance (Cece)" },
    ]},
    { section: "API Reference", items: [
      { id: "rest", label: "REST API" },
      { id: "websocket", label: "WebSocket" },
      { id: "events", label: "Event Bus" },
    ]},
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          BlackRoad OS · v0.4.0
        </div>
        <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          Documentation
        </h1>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #fff" }}>
        {/* Sidebar */}
        <div style={{ width: 200, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)", padding: "32px 24px 32px 0" }}>
          {sidebar.map((group, gi) => (
            <div key={gi} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                {group.section}
              </div>
              {group.items.map((item) => (
                <div key={item.id} onClick={() => setActivePage(item.id)} style={{
                  fontSize: "0.54rem", padding: "6px 0", cursor: "pointer",
                  opacity: activePage === item.id ? 1 : 0.35,
                  fontWeight: activePage === item.id ? 700 : 400,
                  borderLeft: activePage === item.id ? "1px solid #fff" : "1px solid transparent",
                  paddingLeft: 12, transition: "all 0.1s",
                }}>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "32px 0 48px 32px" }}>
          <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Getting Started
          </div>
          <h2 style={{ fontFamily: font.headline, fontSize: "1.6rem", fontWeight: 700, margin: "0 0 20px" }}>Overview</h2>
          <p style={{ fontSize: "0.64rem", opacity: 0.45, lineHeight: 2, marginBottom: 24 }}>
            BlackRoad OS is a distributed AI operating system organized into four stacked layers: Experience, Governance, Infrastructure, and Agent Mesh. Every user-facing action flows through the Cece governance spine before reaching infrastructure.
          </p>

          {/* Code block */}
          <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px", marginBottom: 24 }}>
            <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
              Install
            </div>
            <div style={{ fontSize: "0.6rem", opacity: 0.6, lineHeight: 1.8 }}>
              <span style={{ opacity: 0.3 }}>$</span> npm install @blackroad/sdk<br />
              <span style={{ opacity: 0.3 }}>$</span> blackroad init --workspace my-project
            </div>
          </div>

          <p style={{ fontSize: "0.64rem", opacity: 0.45, lineHeight: 2, marginBottom: 24 }}>
            The SDK provides client libraries for interacting with the API gateway, agent registry, and governance endpoints. Authentication uses OIDC tokens issued by id.blackroad.io.
          </p>

          {/* Inline code example */}
          <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px" }}>
            <div style={{ fontSize: "0.44rem", opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
              Quick Example
            </div>
            <div style={{ fontSize: "0.58rem", opacity: 0.5, lineHeight: 1.9 }}>
              <span style={{ opacity: 0.3 }}>{"// "}</span>Connect to BlackRoad OS<br />
              <span style={{ opacity: 0.7 }}>import</span> {"{ BlackRoad }"} <span style={{ opacity: 0.7 }}>from</span> '@blackroad/sdk'<br /><br />
              <span style={{ opacity: 0.7 }}>const</span> br = <span style={{ opacity: 0.7 }}>new</span> BlackRoad({"{ "}workspace: 'my-project' {"}"})<br />
              <span style={{ opacity: 0.7 }}>const</span> agent = <span style={{ opacity: 0.7 }}>await</span> br.agents.spawn('cecilia')<br />
              <span style={{ opacity: 0.3 }}>{"// → "}</span>agent online, memory loaded
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. ANALYTICS TEMPLATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AnalyticsTemplate() {
  const periods = ["24h", "7d", "30d", "90d"];
  const [period, setPeriod] = useState("7d");

  const sparkData = [12, 18, 15, 22, 28, 35, 31, 42, 38, 45, 52, 48, 55, 60, 58];
  const maxSpark = Math.max(...sparkData);

  const topAgents = [
    { name: "cecilia", tasks: 4821, share: 38 },
    { name: "cadence", tasks: 2104, share: 17 },
    { name: "eve", tasks: 1892, share: 15 },
    { name: "alice", tasks: 1567, share: 12 },
    { name: "radius", tasks: 1203, share: 10 },
    { name: "meridian", tasks: 980, share: 8 },
  ];

  const breakdown = [
    { label: "Memory Commits", value: "42%", bar: 42 },
    { label: "Policy Evaluations", value: "28%", bar: 28 },
    { label: "Mesh Coordination", value: "18%", bar: 18 },
    { label: "Code Execution", value: "8%", bar: 8 },
    { label: "Other", value: "4%", bar: 4 },
  ];

  return (
    <div>
      <div style={{ padding: "56px 0 40px", borderBottom: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.52rem", opacity: 0.3, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Usage Analytics
            </div>
            <h1 style={{ fontFamily: font.headline, fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Analytics
            </h1>
          </div>
          <div style={{ display: "flex", gap: 0, border: "1px solid rgba(255,255,255,0.15)" }}>
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                fontFamily: font.mono, fontSize: "0.48rem", fontWeight: 700,
                padding: "6px 14px", cursor: "pointer", letterSpacing: "0.05em",
                background: period === p ? "#fff" : "transparent",
                color: period === p ? "#000" : "#fff",
                border: "none", borderRight: "1px solid rgba(255,255,255,0.1)",
              }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: GRAD, width: 120, margin: "24px 0" }} />

        {/* KPIs */}
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {[
            { v: "12.6K", l: "Total Events" },
            { v: "117", l: "Active Agents" },
            { v: "38ms", l: "Avg Latency" },
            { v: "0.03%", l: "Error Rate" },
          ].map((k, i, arr) => (
            <div key={i} style={{
              paddingRight: 32, marginRight: 32,
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}>
              <div style={{ fontFamily: font.headline, fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}>{k.v}</div>
              <div style={{ fontSize: "0.44rem", opacity: 0.3, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkline Chart */}
      <Section label="Event Volume">
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80, padding: "8px 0" }}>
          {sparkData.map((v, i) => (
            <div key={i} style={{
              flex: 1, background: "#fff", opacity: 0.15 + (v / maxSpark) * 0.55,
              height: `${(v / maxSpark) * 100}%`, minWidth: 2,
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.42rem", opacity: 0.15, marginTop: 6 }}>
          <span>Feb 25</span><span>Mar 3</span>
        </div>
      </Section>

      {/* Top Agents */}
      <Section label="Top Agents by Task Volume">
        {topAgents.map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "10px 0",
            borderBottom: i < topAgents.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <span style={{ fontSize: "0.44rem", opacity: 0.15, minWidth: 20 }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, minWidth: 100 }}>{a.name}</span>
            <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.06)", position: "relative" }}>
              <div style={{ height: 2, background: "#fff", width: `${a.share}%`, opacity: 0.5 }} />
            </div>
            <span style={{ fontSize: "0.5rem", opacity: 0.35, minWidth: 50, textAlign: "right" }}>{a.tasks.toLocaleString()}</span>
            <span style={{ fontSize: "0.44rem", opacity: 0.2, minWidth: 36, textAlign: "right" }}>{a.share}%</span>
          </div>
        ))}
      </Section>

      {/* Task Breakdown */}
      <Section label="Task Breakdown">
        {breakdown.map((b, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "10px 0",
            borderBottom: i < breakdown.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <span style={{ fontSize: "0.54rem", opacity: 0.45, minWidth: 160 }}>{b.label}</span>
            <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.06)", position: "relative" }}>
              <div style={{ height: 2, background: "#fff", width: `${b.bar}%`, opacity: 0.4 }} />
            </div>
            <span style={{ fontSize: "0.52rem", fontWeight: 700, opacity: 0.5, minWidth: 36, textAlign: "right" }}>{b.value}</span>
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

function InputField({ label, placeholder, value, type = "text" }) {
  return (
    <div>
      <div style={{ fontSize: "0.46rem", opacity: 0.3, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        readOnly
        style={{
          fontFamily: font.mono, fontSize: "0.6rem", color: "#fff",
          background: "transparent", border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.25)",
          padding: "8px 0", width: "100%", outline: "none",
        }}
      />
    </div>
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
