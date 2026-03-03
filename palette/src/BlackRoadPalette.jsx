import { useState } from "react";

const GRAD = "linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC)";
const font = {
  headline: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const accents = [
  { hex: "#FF8400", name: "orange" },
  { hex: "#FF4400", name: "red-orange" },
  { hex: "#FF0066", name: "hot pink" },
  { hex: "#CC00AA", name: "magenta" },
  { hex: "#8800FF", name: "purple" },
  { hex: "#0066FF", name: "blue" },
  { hex: "#2233CC", name: "deep navy" },
];

const neutrals = [
  { hex: "#000000", name: "bg" },
  { hex: "#0a0a0a", name: "surface" },
  { hex: "#111111", name: "elevated" },
  { hex: "#222222", name: "border" },
];

function copyHex(hex, setCopied) {
  navigator.clipboard?.writeText(hex);
  setCopied(hex);
  setTimeout(() => setCopied(null), 1400);
}

export default function BlackRoadPalette() {
  const [copied, setCopied] = useState(null);

  const cssVars = `:root {\n  /* Accent Spectrum */\n${accents.map((c, i) => `  --accent-${i + 1}: ${c.hex};  /* ${c.name} */`).join("\n")}\n\n  /* Neutrals */\n${neutrals.map(c => `  --${c.name}: ${c.hex};`).join("\n")}\n\n  /* Gradient */\n  --grad: ${GRAD};\n\n  /* Type */\n  --font-headline: 'Space Grotesk', sans-serif;\n  --font-mono: 'JetBrains Mono', monospace;\n}`;

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: font.mono }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />

      {/* Top gradient rule */}
      <div style={{ height: 3, background: GRAD }} />

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 48, borderBottom: "1px solid #fff",
      }}>
        <span style={{ fontFamily: font.headline, fontWeight: 700, fontSize: "0.85rem" }}>BlackRoad</span>
        <span style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.12em" }}>DESIGN SYSTEM · COLOR</span>
      </nav>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.15em", marginBottom: 8 }}>02 · COLOR PALETTE</div>
          <h1 style={{ fontFamily: font.headline, fontWeight: 700, fontSize: "2rem", margin: "0 0 8px", lineHeight: 1.1 }}>
            7 Accents.<br />4 Neutrals.
          </h1>
          <div style={{ height: 2, width: 48, background: GRAD, margin: "16px 0" }} />
          <p style={{ fontSize: "0.6rem", opacity: 0.35, lineHeight: 1.7, maxWidth: 420 }}>
            Colors on shapes, fills, dots, borders only. Text is #fff or #000 — always. Use opacity to dim, never a gray hex.
          </p>
        </div>

        {/* Accent Spectrum */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.15em", marginBottom: 16 }}>ACCENT SPECTRUM</div>
          {accents.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => copyHex(c.hex, setCopied)}
              style={{
                display: "flex", alignItems: "center", width: "100%",
                padding: "12px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                borderLeft: "none", borderRight: "none",
                background: "none", color: "#fff", cursor: "pointer",
                fontFamily: font.mono, fontSize: "0.6rem",
              }}
            >
              <div style={{
                width: 14, height: 14, borderRadius: 2, background: c.hex,
                marginRight: 16, flexShrink: 0,
              }} />
              <div style={{ width: 72, fontWeight: 700, fontSize: "0.65rem" }}>{c.hex}</div>
              <div style={{ flex: 1, opacity: 0.4 }}>{c.name}</div>
              <div style={{
                flex: 2, height: 8, borderRadius: 1, background: c.hex,
                marginLeft: 16,
              }} />
              <div style={{
                marginLeft: 16, fontSize: "0.5rem", opacity: 0.2, width: 48, textAlign: "right",
              }}>
                {copied === c.hex ? "copied" : ""}
              </div>
            </button>
          ))}
        </div>

        {/* Full Gradient */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.15em", marginBottom: 12 }}>FULL SPECTRUM</div>
          <button
            onClick={() => copyHex(GRAD, setCopied)}
            style={{
              width: "100%", height: 48, borderRadius: 2,
              background: GRAD, border: "none", cursor: "pointer",
              position: "relative",
            }}
          >
            {copied === GRAD && (
              <span style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(0,0,0,0.6)", borderRadius: 2,
                color: "#fff", fontFamily: font.mono, fontSize: "0.5rem",
              }}>copied gradient css</span>
            )}
          </button>
          <div style={{
            fontSize: "0.5rem", opacity: 0.2, marginTop: 8,
            display: "flex", justifyContent: "space-between",
          }}>
            <span>7 stops · orange → navy</span>
            <span>shapes and surfaces only · never on text</span>
          </div>
        </div>

        {/* Gradient Pairs */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.15em", marginBottom: 12 }}>GRADIENT PAIRS</div>
          {[
            { name: "Warm Pair", css: "linear-gradient(90deg, #FF8400, #FF0066)", use: "alerts · errors · warm states" },
            { name: "Cool Pair", css: "linear-gradient(90deg, #8800FF, #0066FF)", use: "info · agents · links" },
            { name: "Diagonal Quad", css: "linear-gradient(135deg, #FF8400, #FF0066, #8800FF, #0066FF)", use: "large fills · titlebars" },
            { name: "Fade Out", css: "linear-gradient(90deg, #FF8400, transparent)", use: "decorative tapers · section ends" },
          ].map((g) => (
            <button
              key={g.name}
              onClick={() => copyHex(g.css, setCopied)}
              style={{
                display: "flex", alignItems: "center", width: "100%",
                padding: "10px 0", background: "none", border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                color: "#fff", cursor: "pointer", fontFamily: font.mono,
              }}
            >
              <div style={{
                width: 80, height: 10, borderRadius: 1,
                background: g.css, marginRight: 16, flexShrink: 0,
              }} />
              <div style={{ flex: 1, fontSize: "0.55rem", fontWeight: 700 }}>{g.name}</div>
              <div style={{ fontSize: "0.5rem", opacity: 0.25 }}>{g.use}</div>
              {copied === g.css && (
                <span style={{ marginLeft: 12, fontSize: "0.45rem", opacity: 0.5 }}>copied</span>
              )}
            </button>
          ))}
        </div>

        {/* Neutrals */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.15em", marginBottom: 12 }}>NEUTRALS</div>
          <div style={{ display: "flex", gap: 2 }}>
            {neutrals.map(c => (
              <button
                key={c.hex}
                onClick={() => copyHex(c.hex, setCopied)}
                style={{
                  flex: 1, height: 64, background: c.hex,
                  border: c.hex === "#000000" ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2, cursor: "pointer",
                  display: "flex", flexDirection: "column",
                  justifyContent: "flex-end", padding: 8,
                  position: "relative",
                }}
              >
                {copied === c.hex && (
                  <span style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    fontSize: "0.45rem", color: "#fff", fontFamily: font.mono,
                  }}>copied</span>
                )}
                <div style={{ fontSize: "0.5rem", color: "#fff", opacity: 0.5, fontFamily: font.mono }}>{c.hex}</div>
                <div style={{ fontSize: "0.45rem", color: "#fff", opacity: 0.25, fontFamily: font.mono }}>{c.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Rules */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.15em", marginBottom: 12 }}>TEXT RULE</div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              { label: "Full", opacity: 1 },
              { label: "Dim", opacity: 0.5 },
              { label: "Muted", opacity: 0.25 },
              { label: "Ghost", opacity: 0.12 },
            ].map(t => (
              <div key={t.label} style={{
                display: "flex", alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontSize: "0.6rem",
              }}>
                <div style={{ width: 72, opacity: 0.3, fontSize: "0.5rem" }}>{t.label}</div>
                <div style={{ flex: 1, fontWeight: 700, opacity: t.opacity }}>BlackRoad OS</div>
                <div style={{ fontSize: "0.5rem", opacity: 0.2, fontFamily: font.mono }}>opacity: {t.opacity}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "0.5rem", opacity: 0.2, marginTop: 8 }}>
            #fff or #000 only. Use opacity to dim — never a gray hex. Never color text.
          </div>
        </div>

        {/* CSS Variables */}
        <div style={{
          background: "#0a0a0a", border: "1px solid #222",
          borderRadius: 2, padding: 20,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: "0.5rem", opacity: 0.25, letterSpacing: "0.15em" }}>CSS VARIABLES</div>
            <button
              onClick={() => copyHex(cssVars, setCopied)}
              style={{
                background: "none", border: "1px solid #222",
                borderRadius: 2, padding: "3px 10px",
                color: "#fff", opacity: 0.35,
                fontFamily: font.mono, fontSize: "0.45rem",
                cursor: "pointer",
              }}
            >
              {copied === cssVars ? "copied!" : "copy all"}
            </button>
          </div>
          <pre style={{
            fontFamily: font.mono, fontSize: "0.52rem",
            opacity: 0.35, margin: 0, lineHeight: 1.9,
            overflowX: "auto", whiteSpace: "pre-wrap",
          }}>
            {cssVars}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: 720, margin: "0 auto", padding: "32px 24px",
        display: "flex", justifyContent: "space-between",
        fontSize: "0.5rem", opacity: 0.18,
      }}>
        <span>BlackRoad OS, Inc. · Design System v1.0</span>
        <span>JetBrains Mono · Space Grotesk</span>
      </div>

      {/* Bottom gradient rule */}
      <div style={{ height: 3, background: GRAD }} />
    </div>
  );
}
