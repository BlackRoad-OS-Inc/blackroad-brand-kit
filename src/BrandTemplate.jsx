import { useState } from "react";

const COLORS = [
  { hex: "#FF6B2B", name: "Ember", token: "--accent-1" },
  { hex: "#FF2255", name: "Fuse", token: "--accent-2" },
  { hex: "#CC00AA", name: "Pulse", token: "--accent-3" },
  { hex: "#8844FF", name: "Drift", token: "--accent-4" },
  { hex: "#4488FF", name: "Signal", token: "--accent-5" },
  { hex: "#00D4FF", name: "Arc", token: "--accent-6" },
];

const GRAYS = [
  { hex: "#0a0a0a", name: "950" },
  { hex: "#171717", name: "900" },
  { hex: "#262626", name: "800" },
  { hex: "#404040", name: "700" },
  { hex: "#737373", name: "500" },
  { hex: "#a3a3a3", name: "400" },
  { hex: "#d4d4d4", name: "300" },
  { hex: "#f5f5f5", name: "100" },
];

function GradientBar({ height = 2 }) {
  return (
    <div
      style={{
        height,
        background: `linear-gradient(90deg, ${COLORS.map((c) => c.hex).join(", ")})`,
      }}
    />
  );
}

function Section({ title, subtitle, children, id }) {
  return (
    <section id={id} style={{ marginBottom: 56 }}>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#f5f5f5",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#737373",
              margin: "6px 0 0",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function ColorSwatch({ color }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div onClick={handleCopy} style={{ cursor: "pointer", flex: "1 1 100px", minWidth: 80 }}>
      <div
        style={{
          height: 72,
          borderRadius: "10px 10px 0 0",
          background: color.hex,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {copied && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#fff",
            }}
          >
            COPIED
          </div>
        )}
      </div>
      <div
        style={{
          background: "#171717",
          borderRadius: "0 0 10px 10px",
          padding: "10px 12px",
          border: "1px solid #262626",
          borderTop: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#f5f5f5",
            marginBottom: 2,
          }}
        >
          {color.name}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#737373" }}>
          {color.hex}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#525252",
            marginTop: 1,
          }}
        >
          {color.token}
        </div>
      </div>
    </div>
  );
}

function GraySwatch({ color }) {
  const isLight = parseInt(color.name) < 400;
  return (
    <div style={{ flex: "1 1 60px", minWidth: 50 }}>
      <div
        style={{
          height: 40,
          background: color.hex,
          borderRadius: 6,
          border: "1px solid #262626",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: isLight ? "#171717" : "#737373",
          }}
        >
          {color.name}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "#525252",
          textAlign: "center",
          marginTop: 4,
        }}
      >
        {color.hex}
      </div>
    </div>
  );
}

function TypographyRow({ font, name, size, weight, sample, color = "#f5f5f5" }) {
  const displaySize = Math.min(parseInt(size), 36);
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid #1e1e1e" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#737373" }}>
          {name}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#525252" }}>
          {size} / {weight}
        </span>
      </div>
      <div
        style={{
          fontFamily: font,
          fontSize: displaySize,
          fontWeight: weight,
          color,
          lineHeight: 1.3,
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {sample}
      </div>
    </div>
  );
}

function GradientShowcase() {
  const gradients = [
    {
      name: "Full Spectrum",
      css: `linear-gradient(90deg, ${COLORS.map((c) => c.hex).join(", ")})`,
    },
    { name: "Warm → Cool", css: `linear-gradient(135deg, #FF6B2B, #FF2255, #8844FF, #00D4FF)` },
    { name: "Neon Pulse", css: `linear-gradient(90deg, #CC00AA, #8844FF, #4488FF)` },
    { name: "Sunset", css: `linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA)` },
    { name: "Electric", css: `linear-gradient(90deg, #8844FF, #4488FF, #00D4FF)` },
    {
      name: "Radial Burst",
      css: `radial-gradient(circle at 30% 50%, #FF2255, #8844FF, #00D4FF)`,
    },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 12,
      }}
    >
      {gradients.map((g) => (
        <div key={g.name}>
          <div style={{ height: 64, borderRadius: 10, background: g.css, marginBottom: 8 }} />
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#d4d4d4",
              marginBottom: 3,
            }}
          >
            {g.name}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              wordBreak: "break-all",
              lineHeight: 1.4,
            }}
          >
            {g.css}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Metrics", "Settings"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          style={{
            background: "#f5f5f5",
            color: "#0a0a0a",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            padding: "9px 18px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Primary
        </button>
        <button
          style={{
            background: "transparent",
            color: "#d4d4d4",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            padding: "9px 18px",
            borderRadius: 8,
            border: "1px solid #404040",
            cursor: "pointer",
          }}
        >
          Secondary
        </button>
        <button
          style={{
            background: "#262626",
            color: "#a3a3a3",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            padding: "9px 18px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Tertiary
        </button>
        <button
          style={{
            background: "transparent",
            color: "#525252",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            padding: "9px 18px",
            borderRadius: 8,
            border: "1px solid #262626",
            cursor: "pointer",
          }}
        >
          Ghost
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          background: "#0a0a0a",
          borderRadius: 10,
          padding: 4,
          width: "fit-content",
          maxWidth: "100%",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "7px 16px",
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              transition: "all 0.2s ease",
              background: activeTab === i ? "#262626" : "transparent",
              color: activeTab === i ? "#f5f5f5" : "#737373",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="search agents..."
          style={{
            background: "#0a0a0a",
            border: "1px solid #262626",
            color: "#f5f5f5",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            padding: "10px 14px",
            borderRadius: 8,
            outline: "none",
            flex: "1 1 180px",
            minWidth: 0,
          }}
        />
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid #262626",
            borderRadius: 8,
            padding: "10px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#a3a3a3",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#a3a3a3",
              flexShrink: 0,
            }}
          />
          agent.online
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {["Uptime", "Latency", "Throughput"].map((label, i) => (
          <div
            key={label}
            style={{
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: 10,
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#525252",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#f5f5f5",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {(98.2 - i * 3.7).toFixed(1)}
              {i === 1 ? "ms" : "%"}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#737373" }}>
              +{(2.4 + i * 0.8).toFixed(1)}% from last period
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["Active", "Pending", "Idle", "Offline"].map((s, i) => (
          <span
            key={s}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              color: ["#f5f5f5", "#a3a3a3", "#737373", "#525252"][i],
              background: ["#262626", "#1a1a1a", "#141414", "#0f0f0f"][i],
              padding: "4px 10px",
              borderRadius: 5,
              border: "1px solid #262626",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function TokenTable() {
  const tokens = [
    ...COLORS.map((c) => ({ token: c.token, value: c.hex, usage: `Accent: ${c.name}`, color: c.hex })),
    { token: "--bg-primary", value: "#0a0a0a", usage: "Page bg", color: "#0a0a0a" },
    { token: "--bg-surface", value: "#171717", usage: "Card bg", color: "#171717" },
    { token: "--border", value: "#262626", usage: "Borders", color: "#262626" },
    { token: "--text-primary", value: "#f5f5f5", usage: "Primary text", color: "#f5f5f5" },
    { token: "--text-secondary", value: "#a3a3a3", usage: "Secondary text", color: "#a3a3a3" },
    { token: "--text-muted", value: "#737373", usage: "Muted text", color: "#737373" },
  ];
  return (
    <div
      style={{
        background: "#171717",
        border: "1px solid #262626",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {tokens.map((t) => (
        <div
          key={t.token}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 16px",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: t.color,
              border: "1px solid #404040",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#d4d4d4",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {t.token}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#525252" }}>
              {t.usage}
            </div>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#737373",
              flexShrink: 0,
            }}
          >
            {t.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccessibilityGrid() {
  const combos = [
    { bg: "#0a0a0a", fg: "#f5f5f5", label: "White / Black", ratio: "19.3:1", pass: true },
    { bg: "#171717", fg: "#d4d4d4", label: "Light / Surface", ratio: "13.2:1", pass: true },
    { bg: "#0a0a0a", fg: "#a3a3a3", label: "400 / Black", ratio: "8.6:1", pass: true },
    { bg: "#171717", fg: "#737373", label: "500 / Surface", ratio: "4.1:1", pass: false },
    { bg: "#0a0a0a", fg: "#525252", label: "600 / Black", ratio: "3.2:1", pass: false },
    { bg: "#262626", fg: "#f5f5f5", label: "White / 800", ratio: "14.7:1", pass: true },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 10,
      }}
    >
      {combos.map((c) => (
        <div
          key={c.label}
          style={{ background: c.bg, border: "1px solid #262626", borderRadius: 8, padding: 16 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: c.fg,
              marginBottom: 10,
            }}
          >
            Aa
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#737373", marginBottom: 4 }}>
            {c.label}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              color: c.pass ? "#a3a3a3" : "#525252",
            }}
          >
            {c.ratio} {c.pass ? "AA" : "A"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BrandTemplate() {
  const [activeSection, setActiveSection] = useState("palette");
  const nav = [
    { id: "palette", label: "Palette" },
    { id: "gradients", label: "Gradients" },
    { id: "typography", label: "Type" },
    { id: "tokens", label: "Tokens" },
    { id: "components", label: "UI" },
    { id: "a11y", label: "A11Y" },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } html, body { overflow-x: hidden; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #262626; border-radius: 3px; } input::placeholder { color: #525252; }`}</style>

      <div
        style={{
          background: "#0a0a0a",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          color: "#f5f5f5",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <header style={{ padding: "32px 24px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 24,
              gap: 16,
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#525252",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 10,
                }}
              >
                Design System — Brand Template
              </div>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 40,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#f5f5f5",
                  marginBottom: 12,
                }}
              >
                Color
                <br />
                System
              </h1>
              <p style={{ fontSize: 13, color: "#737373", maxWidth: 360, lineHeight: 1.5 }}>
                A six-color accent spectrum on a grayscale foundation. Warm to cool, ember to arc.
              </p>
            </div>
            <div style={{ display: "flex", gap: 5, paddingTop: 6, flexShrink: 0 }}>
              {COLORS.map((c) => (
                <div
                  key={c.hex}
                  style={{ width: 10, height: 40, borderRadius: 5, background: c.hex }}
                />
              ))}
            </div>
          </div>

          <GradientBar />

          <nav style={{ display: "flex", gap: 2, paddingTop: 16, flexWrap: "wrap" }}>
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  color: activeSection === item.id ? "#f5f5f5" : "#525252",
                  background: activeSection === item.id ? "#262626" : "transparent",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 5,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main style={{ padding: "36px 24px 72px" }}>
          <Section id="palette" title="Accent Palette" subtitle="Click any swatch to copy hex.">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                gap: 10,
                marginBottom: 24,
              }}
            >
              {COLORS.map((c) => (
                <ColorSwatch key={c.hex} color={c} />
              ))}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#525252",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                Grayscale Foundation
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(55px, 1fr))",
                  gap: 6,
                }}
              >
                {GRAYS.map((c) => (
                  <GraySwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
          </Section>

          <Section id="gradients" title="Gradients" subtitle="Pre-composed gradient combinations.">
            <GradientShowcase />
          </Section>

          <Section
            id="typography"
            title="Typography"
            subtitle="Space Grotesk · Inter · JetBrains Mono"
          >
            <div
              style={{
                background: "#171717",
                border: "1px solid #262626",
                borderRadius: 10,
                padding: "4px 20px",
              }}
            >
              <TypographyRow
                font="'Space Grotesk', sans-serif"
                name="Display"
                size="48px"
                weight={700}
                sample="Spectrum"
              />
              <TypographyRow
                font="'Space Grotesk', sans-serif"
                name="H1"
                size="32px"
                weight={700}
                sample="System Architecture"
              />
              <TypographyRow
                font="'Space Grotesk', sans-serif"
                name="H2"
                size="22px"
                weight={600}
                sample="Agent Coordination Layer"
              />
              <TypographyRow
                font="'Inter', sans-serif"
                name="Body"
                size="14px"
                weight={400}
                sample="Distributed intelligence operating across a mesh of autonomous agents, each contributing specialized capability."
                color="#d4d4d4"
              />
              <TypographyRow
                font="'JetBrains Mono', monospace"
                name="Mono"
                size="12px"
                weight={400}
                sample="const agent = registry.spawn('observer');"
                color="#a3a3a3"
              />
              <TypographyRow
                font="'JetBrains Mono', monospace"
                name="Label"
                size="11px"
                weight={500}
                sample="STATUS: ACTIVE · UPTIME: 99.97%"
                color="#737373"
              />
            </div>
          </Section>

          <Section id="tokens" title="Design Tokens" subtitle="CSS custom properties.">
            <TokenTable />
          </Section>

          <Section
            id="components"
            title="Components"
            subtitle="All grayscale. Color reserved for data layers."
          >
            <ComponentShowcase />
          </Section>

          <Section id="a11y" title="Accessibility" subtitle="Grayscale contrast ratios.">
            <AccessibilityGrid />
          </Section>

          <div style={{ marginTop: 56 }}>
            <GradientBar />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 20,
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#404040",
                }}
              >
                BlackRoad · Brand v1.0
              </span>
              <div style={{ display: "flex", gap: 3 }}>
                {COLORS.map((c) => (
                  <div
                    key={c.hex}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
