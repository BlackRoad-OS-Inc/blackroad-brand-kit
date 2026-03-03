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

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function GradientBar({ height = 4, radius = 0, animate = false, style = {} }) {
  return (
    <div
      style={{
        height,
        borderRadius: radius,
        background: `linear-gradient(90deg, ${COLORS.map((c) => c.hex).join(", ")})`,
        ...(animate
          ? {
              backgroundSize: "200% 100%",
              animation: "gradientShift 6s ease infinite",
            }
          : {}),
        ...style,
      }}
    />
  );
}

function Section({ title, subtitle, children, id }) {
  return (
    <section id={id} style={{ marginBottom: 72 }}>
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 32,
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
              fontSize: 14,
              color: "#737373",
              margin: "8px 0 0",
              lineHeight: 1.6,
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
    copyToClipboard(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      onClick={handleCopy}
      style={{
        cursor: "pointer",
        flex: "1 1 140px",
        minWidth: 140,
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          height: 100,
          borderRadius: "12px 12px 0 0",
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
              fontSize: 12,
              color: "#fff",
              fontWeight: 500,
            }}
          >
            COPIED
          </div>
        )}
      </div>
      <div
        style={{
          background: "#171717",
          borderRadius: "0 0 12px 12px",
          padding: "14px 16px",
          border: "1px solid #262626",
          borderTop: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: "#f5f5f5",
            marginBottom: 4,
          }}
        >
          {color.name}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#737373",
          }}
        >
          {color.hex}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#525252",
            marginTop: 2,
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
    <div style={{ flex: "1 1 80px", minWidth: 80 }}>
      <div
        style={{
          height: 48,
          background: color.hex,
          borderRadius: 8,
          border: "1px solid #262626",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: isLight ? "#171717" : "#737373",
          }}
        >
          {color.name}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#525252",
          textAlign: "center",
          marginTop: 6,
        }}
      >
        {color.hex}
      </div>
    </div>
  );
}

function TypographyRow({ font, name, size, weight, sample, color = "#f5f5f5" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 24,
        padding: "20px 0",
        borderBottom: "1px solid #1e1e1e",
      }}
    >
      <div style={{ width: 160, flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#737373",
            marginBottom: 2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#525252",
          }}
        >
          {size} / {weight}
        </div>
      </div>
      <div
        style={{
          fontFamily: font,
          fontSize: parseInt(size),
          fontWeight: weight,
          color,
          lineHeight: 1.3,
        }}
      >
        {sample}
      </div>
    </div>
  );
}

function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Metrics", "Settings"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Buttons */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          style={{
            background: "#f5f5f5",
            color: "#0a0a0a",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            padding: "10px 22px",
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
            fontSize: 14,
            fontWeight: 500,
            padding: "10px 22px",
            borderRadius: 8,
            border: "1px solid #404040",
            cursor: "pointer",
          }}
        >
          Ghost
        </button>
        {COLORS.slice(0, 3).map((c) => (
          <button
            key={c.hex}
            style={{
              background: c.hex,
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              padding: "10px 22px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            {c.name}
          </button>
        ))}
        <button
          style={{
            background: "transparent",
            color: "#f5f5f5",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            padding: "10px 22px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            backgroundImage: `linear-gradient(#171717, #171717), linear-gradient(90deg, ${COLORS.map((c) => c.hex).join(", ")})`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            borderWidth: 1.5,
            borderStyle: "solid",
            borderColor: "transparent",
          }}
        >
          Gradient Border
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          background: "#0a0a0a",
          borderRadius: 10,
          padding: 4,
          width: "fit-content",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "8px 20px",
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
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

      {/* Input */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="search agents..."
          style={{
            background: "#0a0a0a",
            border: "1px solid #262626",
            color: "#f5f5f5",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            padding: "12px 16px",
            borderRadius: 8,
            outline: "none",
            width: 240,
          }}
        />
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid #262626",
            borderRadius: 8,
            padding: "12px 16px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#00D4FF",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00D4FF",
              boxShadow: "0 0 8px #00D4FF80",
            }}
          />
          agent.online
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {COLORS.slice(0, 3).map((c, i) => (
          <div
            key={c.hex}
            style={{
              flex: "1 1 200px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: 12,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: c.hex,
              }}
            />
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#525252",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              {c.name} metric
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: c.hex,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {(98.2 - i * 3.7).toFixed(1)}%
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#737373",
              }}
            >
              +{(2.4 + i * 0.8).toFixed(1)}% from last period
            </div>
          </div>
        ))}
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
    {
      name: "Warm \u2192 Cool",
      css: "linear-gradient(135deg, #FF6B2B, #FF2255, #8844FF, #00D4FF)",
    },
    {
      name: "Neon Pulse",
      css: "linear-gradient(90deg, #CC00AA, #8844FF, #4488FF)",
    },
    {
      name: "Sunset",
      css: "linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA)",
    },
    {
      name: "Electric",
      css: "linear-gradient(90deg, #8844FF, #4488FF, #00D4FF)",
    },
    {
      name: "Radial Burst",
      css: "radial-gradient(circle at 30% 50%, #FF2255, #8844FF, #00D4FF)",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {gradients.map((g) => (
        <div key={g.name}>
          <div
            style={{
              height: 80,
              borderRadius: 12,
              background: g.css,
              marginBottom: 10,
            }}
          />
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#d4d4d4",
              marginBottom: 4,
            }}
          >
            {g.name}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#525252",
              wordBreak: "break-all",
              lineHeight: 1.5,
            }}
          >
            {g.css}
          </div>
        </div>
      ))}
    </div>
  );
}

function TokenTable() {
  const tokens = [
    ...COLORS.map((c) => ({
      token: c.token,
      value: c.hex,
      usage: `Accent: ${c.name}`,
      color: c.hex,
    })),
    { token: "--bg-primary", value: "#0a0a0a", usage: "Page background", color: "#0a0a0a" },
    { token: "--bg-surface", value: "#171717", usage: "Card/panel bg", color: "#171717" },
    { token: "--border", value: "#262626", usage: "Borders, dividers", color: "#262626" },
    { token: "--text-primary", value: "#f5f5f5", usage: "Primary text", color: "#f5f5f5" },
    { token: "--text-secondary", value: "#a3a3a3", usage: "Secondary text", color: "#a3a3a3" },
    { token: "--text-muted", value: "#737373", usage: "Muted/disabled", color: "#737373" },
  ];

  return (
    <div
      style={{
        background: "#171717",
        border: "1px solid #262626",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 100px 1fr 40px",
          gap: 0,
          padding: "12px 20px",
          borderBottom: "1px solid #262626",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#525252",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        <span>Token</span>
        <span>Value</span>
        <span>Usage</span>
        <span></span>
      </div>
      {tokens.map((t) => (
        <div
          key={t.token}
          style={{
            display: "grid",
            gridTemplateColumns: "200px 100px 1fr 40px",
            gap: 0,
            padding: "10px 20px",
            borderBottom: "1px solid #1a1a1a",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#d4d4d4",
            }}
          >
            {t.token}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#737373",
            }}
          >
            {t.value}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#737373",
            }}
          >
            {t.usage}
          </span>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              background: t.color,
              border: "1px solid #404040",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function AccessibilityGrid() {
  const combos = [
    { bg: "#0a0a0a", fg: "#f5f5f5", label: "White on Black", ratio: "19.3:1" },
    { bg: "#0a0a0a", fg: "#FF6B2B", label: "Ember on Black", ratio: "5.2:1" },
    { bg: "#0a0a0a", fg: "#00D4FF", label: "Arc on Black", ratio: "10.1:1" },
    { bg: "#0a0a0a", fg: "#8844FF", label: "Drift on Black", ratio: "3.6:1" },
    { bg: "#171717", fg: "#FF2255", label: "Fuse on Surface", ratio: "4.3:1" },
    { bg: "#171717", fg: "#4488FF", label: "Signal on Surface", ratio: "4.8:1" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {combos.map((c) => {
        const passes = parseFloat(c.ratio) >= 4.5;
        return (
          <div
            key={c.label}
            style={{
              background: c.bg,
              border: "1px solid #262626",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: c.fg,
                marginBottom: 12,
              }}
            >
              Aa
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#737373",
                }}
              >
                {c.label}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  color: passes ? "#4ade80" : "#facc15",
                  background: passes ? "#4ade8015" : "#facc1515",
                  padding: "3px 8px",
                  borderRadius: 4,
                }}
              >
                {c.ratio} {passes ? "AA" : "A"}
              </span>
            </div>
          </div>
        );
      })}
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
    { id: "components", label: "Components" },
    { id: "a11y", label: "A11Y" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #262626; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #404040; }

        input::placeholder { color: #525252; }
      `}</style>

      <div
        style={{
          background: "#0a0a0a",
          minHeight: "100vh",
          color: "#f5f5f5",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: "40px 48px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#525252",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 12,
                }}
              >
                Design System — Brand Template
              </div>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 56,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  background: `linear-gradient(135deg, ${COLORS.map((c) => c.hex).join(", ")})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 16,
                }}
              >
                Color
                <br />
                System
              </h1>
              <p
                style={{
                  fontSize: 15,
                  color: "#737373",
                  maxWidth: 420,
                  lineHeight: 1.6,
                }}
              >
                A six-color accent spectrum built on a grayscale foundation.
                Warm to cool, ember to arc.
              </p>
            </div>

            {/* Mini spectrum */}
            <div style={{ display: "flex", gap: 6, paddingTop: 8 }}>
              {COLORS.map((c) => (
                <div
                  key={c.hex}
                  style={{
                    width: 12,
                    height: 48,
                    borderRadius: 6,
                    background: c.hex,
                  }}
                />
              ))}
            </div>
          </div>

          <GradientBar height={2} />

          {/* Nav */}
          <nav
            style={{
              display: "flex",
              gap: 4,
              paddingTop: 20,
            }}
          >
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  color: activeSection === item.id ? "#f5f5f5" : "#525252",
                  background: activeSection === item.id ? "#262626" : "transparent",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Content */}
        <main style={{ padding: "48px 48px 96px" }}>
          {/* Accent Palette */}
          <Section
            id="palette"
            title="Accent Palette"
            subtitle="Six chromatic stops from warm Ember through cool Arc. Click any swatch to copy its hex value."
          >
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
              {COLORS.map((c, i) => (
                <ColorSwatch key={c.hex} color={c} index={i} />
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#525252",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                }}
              >
                Grayscale Foundation
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {GRAYS.map((c) => (
                  <GraySwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
          </Section>

          {/* Gradients */}
          <Section
            id="gradients"
            title="Gradients"
            subtitle="Pre-composed gradient combinations for backgrounds, borders, and emphasis elements."
          >
            <GradientShowcase />
          </Section>

          {/* Typography */}
          <Section
            id="typography"
            title="Typography"
            subtitle="Three-tier type stack: Space Grotesk for display, Inter for body, JetBrains Mono for data."
          >
            <div
              style={{
                background: "#171717",
                border: "1px solid #262626",
                borderRadius: 12,
                padding: "8px 24px",
              }}
            >
              <TypographyRow
                font="'Space Grotesk', sans-serif"
                name="Display"
                size="56px"
                weight={700}
                sample="Spectrum"
              />
              <TypographyRow
                font="'Space Grotesk', sans-serif"
                name="Heading 1"
                size="36px"
                weight={700}
                sample="System Architecture"
              />
              <TypographyRow
                font="'Space Grotesk', sans-serif"
                name="Heading 2"
                size="24px"
                weight={600}
                sample="Agent Coordination Layer"
              />
              <TypographyRow
                font="'Inter', sans-serif"
                name="Body"
                size="15px"
                weight={400}
                sample="Distributed intelligence operating across a mesh of autonomous agents, each contributing specialized capability to the collective."
                color="#d4d4d4"
              />
              <TypographyRow
                font="'JetBrains Mono', monospace"
                name="Mono"
                size="13px"
                weight={400}
                sample="const agent = await registry.spawn('observer', { ttl: 3600 });"
                color="#a3a3a3"
              />
              <TypographyRow
                font="'JetBrains Mono', monospace"
                name="Label"
                size="11px"
                weight={500}
                sample="STATUS: ACTIVE  ·  UPTIME: 99.97%  ·  LATENCY: 12ms"
                color="#737373"
              />
            </div>
          </Section>

          {/* Tokens */}
          <Section
            id="tokens"
            title="Design Tokens"
            subtitle="CSS custom properties for consistent implementation across components."
          >
            <TokenTable />
          </Section>

          {/* Components */}
          <Section
            id="components"
            title="Components"
            subtitle="Interactive UI elements demonstrating the palette in context."
          >
            <ComponentShowcase />
          </Section>

          {/* Accessibility */}
          <Section
            id="a11y"
            title="Accessibility"
            subtitle="Contrast ratios for accent colors on primary backgrounds."
          >
            <AccessibilityGrid />
          </Section>

          {/* Footer gradient */}
          <div style={{ marginTop: 80 }}>
            <GradientBar height={1} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 24,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#404040",
                }}
              >
                BlackRoad Design System · Brand Template v1.0
              </span>
              <div style={{ display: "flex", gap: 3 }}>
                {COLORS.map((c) => (
                  <div
                    key={c.hex}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c.hex,
                    }}
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
