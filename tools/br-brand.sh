#!/bin/zsh
# BR Brand — BlackRoad OS Brand Template Engine
# Generate brand-compliant HTML pages by feeding in text
#
# Usage:
#   br brand list                              - list available templates
#   br brand new landing --title "X" ...      - generate landing page
#   br brand new agent --title "X" ...        - generate agent profile page
#   br brand new docs --title "X" ...         - generate docs/article page
#   br brand new card --title "X" ...         - generate card/feature snippet
#   br brand preview <template>               - print template info

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m'

BRAND_DIR="$(dirname "$0")"
OUT_DIR="${BLACKROAD_BRAND_OUT:-$HOME/.blackroad/brand-output}"
mkdir -p "$OUT_DIR"

# ─── BRAND CSS (embedded from official design system) ──────────────────────
BRAND_CSS='
:root {
  --black: #000000;
  --deep-black: #0A0A0A;
  --charcoal: #1A1A1A;
  --white: #FFFFFF;
  --sunrise-orange: #FF9D00;
  --warm-orange: #FF6B00;
  --hot-pink: #FF0066;
  --electric-magenta: #FF006B;
  --deep-magenta: #D600AA;
  --vivid-purple: #7700FF;
  --cyber-blue: #0066FF;
  --gradient-br: linear-gradient(180deg, var(--sunrise-orange) 0%, var(--warm-orange) 25%, var(--hot-pink) 75%, var(--electric-magenta) 100%);
  --gradient-os: linear-gradient(180deg, var(--electric-magenta) 0%, var(--deep-magenta) 25%, var(--vivid-purple) 75%, var(--cyber-blue) 100%);
  --gradient-full: linear-gradient(180deg, var(--sunrise-orange) 0%, var(--warm-orange) 14%, var(--hot-pink) 28%, var(--electric-magenta) 42%, var(--deep-magenta) 57%, var(--vivid-purple) 71%, var(--cyber-blue) 100%);
  --gradient-brand: var(--gradient-full);
  --phi: 1.618;
  --space-xs: 8px;
  --space-sm: 13px;
  --space-md: 21px;
  --space-lg: 34px;
  --space-xl: 55px;
  --space-2xl: 89px;
  --space-3xl: 144px;
  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: "JetBrains Mono", "SF Mono", "Fira Code", "Courier New", monospace;
  background: var(--deep-black);
  color: var(--white);
  overflow-x: hidden;
  line-height: 1.618;
  -webkit-font-smoothing: antialiased;
}
h1 { font-size: calc(2.5rem * 1.618); font-weight: 600; line-height: 1.2; }
h2 { font-size: calc(2rem * 1.618); font-weight: 600; line-height: 1.2; }
h3 { font-size: calc(1.5rem * 1.618); font-weight: 600; line-height: 1.2; }
h4 { font-size: 1.4rem; font-weight: 600; }
p  { font-size: 1rem; line-height: 1.618; color: rgba(255,255,255,0.8); }
a  { color: var(--sunrise-orange); text-decoration: none; }
a:hover { color: var(--hot-pink); }

.scroll-progress {
  position: fixed; top: 0; left: 0; height: 2px;
  background: var(--gradient-brand); z-index: 9999; width: 0%;
  transition: width 0.1s linear;
}
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: var(--space-md) var(--space-xl);
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(0,0,0,0.85);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.nav-logo {
  font-size: 1.2rem; font-weight: 700;
  background: var(--gradient-brand);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links { display: flex; gap: var(--space-lg); }
.nav-links a { color: rgba(255,255,255,0.7); font-size: 0.9rem; transition: color 0.2s; }
.nav-links a:hover { color: var(--white); }
.container { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-xl); }
.gradient-text {
  background: var(--gradient-brand);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-border {
  position: relative; border-radius: var(--space-md);
  background: var(--charcoal);
}
.gradient-border::before {
  content: ""; position: absolute; inset: 0;
  border-radius: inherit; padding: 1px;
  background: var(--gradient-brand);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
.card {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(10px);
  border-radius: var(--space-md);
  padding: var(--space-xl);
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform 0.3s var(--ease-spring), border-color 0.3s;
}
.card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
.btn {
  display: inline-block;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--space-xs);
  font-weight: 600; font-size: 0.95rem;
  cursor: pointer; transition: all 0.3s var(--ease);
  border: none; font-family: inherit;
}
.btn-primary {
  background: var(--gradient-brand);
  color: var(--white);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,157,0,0.3); color: var(--white); }
.btn-outline {
  background: transparent; color: var(--white);
  border: 1px solid rgba(255,255,255,0.3);
}
.btn-outline:hover { border-color: var(--hot-pink); color: var(--hot-pink); }
.bg-orb {
  position: fixed; border-radius: 50%;
  filter: blur(100px); pointer-events: none; z-index: 0; opacity: 0.12;
}
.bg-grid {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 55px 55px;
}
main { position: relative; z-index: 1; padding-top: 80px; }
.section { padding: var(--space-3xl) 0; }
.section-label {
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--sunrise-orange);
  margin-bottom: var(--space-md);
}
.grid { display: grid; gap: var(--space-lg); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 900px) { .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; } h1 { font-size: 2rem; } }
footer {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: var(--space-xl) 0; text-align: center;
  color: rgba(255,255,255,0.4); font-size: 0.85rem;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.animate-in { animation: fadeIn 0.6s var(--ease-out) forwards; }
'

# ─── BRAND JS (scroll progress bar) ───────────────────────────────────────
BRAND_JS='
const bar = document.getElementById("scroll-bar");
if (bar) {
  window.addEventListener("scroll", () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + "%";
  });
}
document.querySelectorAll(".animate-in").forEach((el, i) => {
  el.style.opacity = "0";
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.animation = `fadeIn 0.6s ${i * 0.1}s ease-out forwards`; obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  obs.observe(el);
});
'

# ─── HELPERS ──────────────────────────────────────────────────────────────
_html_head() {
  local title="$1" desc="$2"
  cat <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — BlackRoad OS</title>
  <meta name="description" content="${desc}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <style>${BRAND_CSS}</style>
</head>
<body>
<div id="scroll-bar" class="scroll-progress"></div>
<div class="bg-grid"></div>
<div class="bg-orb" style="width:600px;height:600px;top:-200px;right:-200px;background:var(--vivid-purple);"></div>
<div class="bg-orb" style="width:400px;height:400px;bottom:10%;left:-100px;background:var(--hot-pink);"></div>
EOF
}

_html_nav() {
  local logo="${1:-BlackRoad OS}" nav_links="${2:-}"
  echo "<nav><div class=\"nav-logo\">${logo}</div><div class=\"nav-links\">${nav_links}</div></nav>"
}

_html_footer() {
  local year; year=$(date +%Y)
  echo "<footer><div class=\"container\"><p>© ${year} BlackRoad OS, Inc. All rights reserved.</p></div></footer>"
}

_html_close() {
  cat <<EOF
<script>${BRAND_JS}</script>
</body>
</html>
EOF
}

# ─── TEMPLATE: LANDING ────────────────────────────────────────────────────
_tpl_landing() {
  local title="$1" tagline="$2" desc="$3" cta_text="${4:-Get Started}" cta_url="${5:-#}" output="$6"

  # Parse feature items from remaining args (format: "Icon|Title|Desc")
  shift 6
  local features=("$@")

  {
    _html_head "$title" "$desc"
    _html_nav "$title"

    cat <<EOF
<main>
  <!-- Hero -->
  <section class="section" style="min-height:80vh;display:flex;align-items:center;text-align:center;">
    <div class="container">
      <div class="section-label animate-in">BlackRoad OS</div>
      <h1 class="gradient-text animate-in" style="margin-bottom:var(--space-lg);">${title}</h1>
      <p style="font-size:1.3rem;max-width:640px;margin:0 auto var(--space-xl);" class="animate-in">${tagline}</p>
      <div style="display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap;" class="animate-in">
        <a href="${cta_url}" class="btn btn-primary">${cta_text}</a>
        <a href="#features" class="btn btn-outline">Learn More</a>
      </div>
    </div>
  </section>

  <!-- Description -->
  <section class="section" id="about">
    <div class="container" style="max-width:800px;text-align:center;">
      <p style="font-size:1.1rem;line-height:1.8;" class="animate-in">${desc}</p>
    </div>
  </section>
EOF

    # Features section
    if [[ ${#features[@]} -gt 0 ]]; then
      echo "  <section class=\"section\" id=\"features\">"
      echo "    <div class=\"container\">"
      echo "      <div class=\"section-label text-center animate-in\">Features</div>"
      local cols=3
      [[ ${#features[@]} -eq 2 ]] && cols=2
      [[ ${#features[@]} -eq 4 ]] && cols=4
      echo "      <div class=\"grid grid-${cols}\" style=\"margin-top:var(--space-xl);\">"
      for feat in "${features[@]}"; do
        local icon="${feat%%|*}"
        local rest="${feat#*|}"
        local ftitle="${rest%%|*}"
        local fdesc="${rest#*|}"
        cat <<EOF
        <div class="card animate-in">
          <div style="font-size:2rem;margin-bottom:var(--space-md);">${icon}</div>
          <h4 style="margin-bottom:var(--space-sm);">${ftitle}</h4>
          <p style="font-size:0.9rem;">${fdesc}</p>
        </div>
EOF
      done
      echo "      </div>"
      echo "    </div>"
      echo "  </section>"
    fi

    # CTA section
    cat <<EOF
  <section class="section" style="text-align:center;">
    <div class="container">
      <div class="gradient-border" style="display:inline-block;padding:var(--space-2xl) var(--space-3xl);border-radius:var(--space-lg);">
        <h2 style="margin-bottom:var(--space-lg);" class="animate-in">Ready to build?</h2>
        <a href="${cta_url}" class="btn btn-primary animate-in">${cta_text} →</a>
      </div>
    </div>
  </section>
</main>
EOF
    _html_footer
    _html_close
  } > "$output"
}

# ─── TEMPLATE: AGENT ──────────────────────────────────────────────────────
_tpl_agent() {
  local name="$1" type="$2" tagline="$3" bio="$4" emoji="${5:-🤖}" output="$6"
  shift 6
  local skills=("$@")  # format: "SkillName|pct"

  {
    _html_head "$name — Agent" "$bio"
    _html_nav "BlackRoad OS" "<a href=\"/agents\">Agents</a>"

    cat <<EOF
<main>
  <section class="section" style="text-align:center;">
    <div class="container" style="max-width:700px;">
      <div style="font-size:5rem;margin-bottom:var(--space-lg);animation:float 4s ease-in-out infinite;">${emoji}</div>
      <div class="section-label animate-in">${type}</div>
      <h1 class="gradient-text animate-in">${name}</h1>
      <p style="font-size:1.2rem;margin-top:var(--space-lg);" class="animate-in">${tagline}</p>
    </div>
  </section>

  <!-- Bio -->
  <section class="section">
    <div class="container" style="max-width:800px;">
      <div class="card animate-in">
        <div class="section-label">About</div>
        <p style="font-size:1rem;line-height:1.8;margin-top:var(--space-md);">${bio}</p>
      </div>
    </div>
  </section>
EOF

    # Skills
    if [[ ${#skills[@]} -gt 0 ]]; then
      cat <<EOF
  <section class="section">
    <div class="container" style="max-width:800px;">
      <div class="section-label animate-in">Capabilities</div>
      <div style="margin-top:var(--space-xl);display:flex;flex-direction:column;gap:var(--space-md);">
EOF
      for skill in "${skills[@]}"; do
        local sname="${skill%%|*}"
        local spct="${skill#*|}"
        cat <<EOF
        <div class="animate-in">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs);">
            <span style="font-size:0.9rem;font-weight:600;">${sname}</span>
            <span style="font-size:0.85rem;color:rgba(255,255,255,0.5);">${spct}%</span>
          </div>
          <div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;">
            <div style="height:100%;width:${spct}%;background:var(--gradient-brand);border-radius:2px;transition:width 1s var(--ease-out);"></div>
          </div>
        </div>
EOF
      done
      echo "      </div>"
      echo "    </div>"
      echo "  </section>"
    fi

    echo "</main>"
    _html_footer
    _html_close
  } > "$output"
}

# ─── TEMPLATE: DOCS ───────────────────────────────────────────────────────
_tpl_docs() {
  local title="$1" subtitle="$2" author="${3:-BlackRoad OS}" output="$4"
  shift 4
  local sections=("$@")  # format: "Section Title|content text"

  {
    _html_head "$title" "$subtitle"
    _html_nav "BlackRoad OS" "<a href=\"/docs\">Docs</a> <a href=\"/\">Home</a>"

    cat <<EOF
<main>
  <section class="section" style="max-width:800px;margin:0 auto;">
    <div class="container">
      <div class="section-label animate-in">${author}</div>
      <h1 class="animate-in" style="margin-bottom:var(--space-md);">${title}</h1>
      <p style="font-size:1.1rem;color:rgba(255,255,255,0.6);margin-bottom:var(--space-2xl);" class="animate-in">${subtitle}</p>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin-bottom:var(--space-2xl);" />
EOF

    for sec in "${sections[@]}"; do
      local stitle="${sec%%|*}"
      local scontent="${sec#*|}"
      cat <<EOF
      <div class="animate-in" style="margin-bottom:var(--space-2xl);">
        <h3 style="margin-bottom:var(--space-md);color:var(--white);">${stitle}</h3>
        <p style="line-height:1.8;">${scontent}</p>
      </div>
EOF
    done

    cat <<EOF
    </div>
  </section>
</main>
EOF
    _html_footer
    _html_close
  } > "$output"
}

# ─── TEMPLATE: CARD (snippet only) ────────────────────────────────────────
_tpl_card() {
  local title="$1" desc="$2" icon="${3:-✦}" badge="${4:-}" link="${5:-#}" output="$6"

  cat <<EOF > "$output"
<!-- BlackRoad OS Brand Card — copy into any page -->
<div class="card animate-in">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-md);">
    <span style="font-size:2rem;">${icon}</span>
    $([ -n "$badge" ] && echo "<span style=\"font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:4px;background:var(--gradient-brand);color:var(--white);\">${badge}</span>")
  </div>
  <h4 style="margin-bottom:var(--space-sm);">${title}</h4>
  <p style="font-size:0.9rem;margin-bottom:var(--space-lg);">${desc}</p>
  <a href="${link}" class="btn btn-outline" style="font-size:0.85rem;">Learn More →</a>
</div>
<!-- End Card -->
EOF
}

# ─── TEMPLATE: PRICING ───────────────────────────────────────────────────
# Tiers format: "Name|Price|Period|Desc|feat1,feat2,feat3|cta_text|cta_url|highlight"
# highlight = "true" to make a tier pop with gradient border
_tpl_pricing() {
  local title="$1" subtitle="$2" output="$3"
  shift 3
  local tiers=("$@")

  {
    _html_head "$title" "$subtitle"
    _html_nav "BlackRoad OS" "<a href=\"/\">Home</a>"

    cat <<EOF
<main>
  <section class="section" style="text-align:center;">
    <div class="container">
      <div class="section-label animate-in">Pricing</div>
      <h1 class="gradient-text animate-in">${title}</h1>
      <p style="font-size:1.1rem;max-width:560px;margin:var(--space-lg) auto 0;" class="animate-in">${subtitle}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid-${#tiers[@]}" style="align-items:start;">
EOF

    for tier in "${tiers[@]}"; do
      local tname="${tier%%|*}"; local r1="${tier#*|}"; local tprice="${r1%%|*}"; local r2="${r1#*|}"
      local tperiod="${r2%%|*}"; local r3="${r2#*|}"; local tdesc="${r3%%|*}"; local r4="${r3#*|}"
      local tfeats="${r4%%|*}"; local r5="${r4#*|}"; local tcta="${r5%%|*}"; local r6="${r5#*|}"
      local tcta_url="${r6%%|*}"; local thighlight="${r6#*|}"

      local wrapper_open="" wrapper_close=""
      if [[ "$thighlight" == "true" ]]; then
        wrapper_open='<div class="gradient-border" style="border-radius:var(--space-md);padding:1px;">'
        wrapper_close='</div>'
      fi

      echo "        ${wrapper_open}"
      cat <<EOF
        <div class="card animate-in" style="text-align:center;$([ "$thighlight" = "true" ] && echo "background:rgba(255,255,255,0.07);")">
          <div class="section-label" style="text-align:center;">${tname}</div>
          <div style="margin:var(--space-lg) 0;">
            <span style="font-size:3.5rem;font-weight:700;background:var(--gradient-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${tprice}</span>
            <span style="color:rgba(255,255,255,0.5);font-size:0.9rem;"> / ${tperiod}</span>
          </div>
          <p style="font-size:0.9rem;margin-bottom:var(--space-xl);">${tdesc}</p>
          <ul style="list-style:none;text-align:left;margin-bottom:var(--space-xl);">
EOF
      IFS=',' read -rA feat_list <<< "$tfeats"
      for feat in "${feat_list[@]}"; do
        feat="${feat## }"; feat="${feat%% }"
        echo "            <li style=\"padding:var(--space-xs) 0;font-size:0.9rem;border-bottom:1px solid rgba(255,255,255,0.05);\">✓ &nbsp;${feat}</li>"
      done
      cat <<EOF
          </ul>
          <a href="${tcta_url}" class="btn $([ "$thighlight" = "true" ] && echo "btn-primary" || echo "btn-outline")" style="width:100%;text-align:center;">${tcta}</a>
        </div>
EOF
      echo "        ${wrapper_close}"
    done

    cat <<EOF
      </div>
    </div>
  </section>
</main>
EOF
    _html_footer
    _html_close
  } > "$output"
}

# ─── TEMPLATE: 404 ────────────────────────────────────────────────────────
_tpl_404() {
  local title="${1:-404}" message="${2:-Page not found}" home_url="${3:-/}" output="$4"

  {
    _html_head "404 — ${title}" "$message"
    _html_nav "BlackRoad OS"

    cat <<EOF
<main style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;">
  <div class="container" style="max-width:600px;">
    <div style="font-size:8rem;font-weight:900;line-height:1;
                background:var(--gradient-brand);
                -webkit-background-clip:text;-webkit-text-fill-color:transparent;
                background-clip:text;
                animation:glitch 2s infinite;
                margin-bottom:var(--space-lg);">404</div>
    <h2 class="animate-in" style="margin-bottom:var(--space-md);">${title}</h2>
    <p class="animate-in" style="margin-bottom:var(--space-xl);">${message}</p>
    <div style="display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap;" class="animate-in">
      <a href="${home_url}" class="btn btn-primary">← Go Home</a>
      <a href="javascript:history.back()" class="btn btn-outline">Go Back</a>
    </div>
    <div style="margin-top:var(--space-3xl);opacity:0.2;font-size:0.8rem;font-family:monospace;">
      ERROR_CODE: 404 | AGENT: NULL | STATUS: NOT_FOUND
    </div>
  </div>
</main>
<style>
@keyframes glitch {
  0%,100% { text-shadow: none; }
  20% { text-shadow: -3px 0 var(--hot-pink), 3px 0 var(--cyber-blue); }
  40% { text-shadow: 3px 0 var(--vivid-purple), -3px 0 var(--sunrise-orange); }
  60% { text-shadow: none; }
  80% { text-shadow: -2px 0 var(--electric-magenta), 2px 0 var(--cyber-blue); }
}
</style>
EOF
    _html_footer
    _html_close
  } > "$output"
}

# ─── TEMPLATE: FEATURE ────────────────────────────────────────────────────
# Alternating split-layout rows. items format: "Icon|Title|Desc"
_tpl_feature() {
  local title="$1" subtitle="$2" output="$3"
  shift 3
  local items=("$@")

  {
    _html_head "$title" "$subtitle"
    _html_nav "BlackRoad OS" "<a href=\"/\">Home</a> <a href=\"#features\">Features</a>"

    cat <<EOF
<main>
  <section class="section" style="text-align:center;">
    <div class="container">
      <div class="section-label animate-in">Features</div>
      <h1 class="gradient-text animate-in">${title}</h1>
      <p style="font-size:1.1rem;max-width:640px;margin:var(--space-lg) auto 0;" class="animate-in">${subtitle}</p>
    </div>
  </section>

  <section class="section" id="features">
    <div class="container" style="max-width:960px;">
EOF

    local idx=0
    for item in "${items[@]}"; do
      local iicon="${item%%|*}"; local rest="${item#*|}"; local ititle="${rest%%|*}"; local idesc="${rest#*|}"
      local reverse=""
      [[ $((idx % 2)) -eq 1 ]] && reverse="flex-direction:row-reverse;"
      cat <<EOF
      <div class="animate-in" style="display:flex;gap:var(--space-2xl);align-items:center;margin-bottom:var(--space-3xl);${reverse}flex-wrap:wrap;">
        <div style="flex:0 0 140px;text-align:center;">
          <div style="font-size:4rem;background:var(--charcoal);border-radius:var(--space-lg);padding:var(--space-xl);display:inline-block;border:1px solid rgba(255,255,255,0.06);">${iicon}</div>
        </div>
        <div style="flex:1;min-width:240px;">
          <h3 style="margin-bottom:var(--space-md);">${ititle}</h3>
          <p style="line-height:1.8;">${idesc}</p>
        </div>
      </div>
EOF
      idx=$((idx + 1))
    done

    cat <<EOF
    </div>
  </section>
</main>
EOF
    _html_footer
    _html_close
  } > "$output"
}

# ─── TEMPLATE: BLOG ───────────────────────────────────────────────────────
# sections format: "Heading|Body text"
# tags format: comma-separated string passed as single arg
_tpl_blog() {
  local title="$1" subtitle="$2" author="${3:-BlackRoad OS}" date_str="${4:-}" tags="${5:-}" output="$6"
  shift 6
  local sections=("$@")

  [[ -z "$date_str" ]] && date_str=$(date "+%B %d, %Y")

  {
    _html_head "$title" "$subtitle"
    _html_nav "BlackRoad OS" "<a href=\"/blog\">Blog</a> <a href=\"/\">Home</a>"

    cat <<EOF
<main>
  <!-- Hero -->
  <section class="section" style="text-align:center;max-width:860px;margin:0 auto;">
    <div class="container">
EOF
    # Tags
    if [[ -n "$tags" ]]; then
      echo "      <div style=\"display:flex;gap:var(--space-sm);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-lg);\" class=\"animate-in\">"
      IFS=',' read -rA tag_list <<< "$tags"
      for tag in "${tag_list[@]}"; do
        tag="${tag## }"; tag="${tag%% }"
        echo "        <span style=\"font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:20px;border:1px solid rgba(255,157,0,0.4);color:var(--sunrise-orange);\">${tag}</span>"
      done
      echo "      </div>"
    fi

    cat <<EOF
      <h1 class="animate-in" style="margin-bottom:var(--space-lg);">${title}</h1>
      <p style="font-size:1.1rem;color:rgba(255,255,255,0.6);margin-bottom:var(--space-xl);" class="animate-in">${subtitle}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-md);color:rgba(255,255,255,0.4);font-size:0.85rem;" class="animate-in">
        <span>✍ ${author}</span>
        <span>·</span>
        <span>${date_str}</span>
      </div>
    </div>
  </section>

  <section style="border-top:1px solid rgba(255,255,255,0.06);padding:var(--space-3xl) 0;">
    <div class="container" style="max-width:740px;">
EOF

    for sec in "${sections[@]}"; do
      local sheading="${sec%%|*}"
      local sbody="${sec#*|}"
      cat <<EOF
      <div class="animate-in" style="margin-bottom:var(--space-2xl);">
        <h2 style="font-size:1.6rem;margin-bottom:var(--space-md);color:var(--white);">${sheading}</h2>
        <p style="line-height:1.9;font-size:1.05rem;">${sbody}</p>
      </div>
EOF
    done

    cat <<EOF
    </div>
  </section>
</main>
EOF
    _html_footer
    _html_close
  } > "$output"
}

# ─── DEPLOY ──────────────────────────────────────────────────────────────
_cmd_deploy() {
  local project="" file="" dir="" env="production"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --project|-p) project="$2"; shift 2 ;;
      --file|-f)    file="$2";    shift 2 ;;
      --dir|-d)     dir="$2";     shift 2 ;;
      --env)        env="$2";     shift 2 ;;
      *) shift ;;
    esac
  done

  if [[ -z "$project" ]]; then
    echo -e "${RED}✗ --project required${NC}  e.g. br brand deploy --project my-site --file index.html"
    exit 1
  fi

  # Resolve deploy target: single file → temp dir, or use dir
  local deploy_dir=""
  if [[ -n "$file" ]]; then
    deploy_dir=$(mktemp -d)
    cp "$file" "${deploy_dir}/index.html"
    echo -e "${CYAN}→ Deploying file:${NC} $file"
  elif [[ -n "$dir" ]]; then
    deploy_dir="$dir"
    echo -e "${CYAN}→ Deploying dir:${NC} $dir"
  else
    echo -e "${RED}✗ Provide --file or --dir${NC}"
    exit 1
  fi

  if ! command -v wrangler &>/dev/null; then
    echo -e "${RED}✗ wrangler not found.${NC} Install: npm install -g wrangler"
    exit 1
  fi

  echo -e "${CYAN}→ Project:${NC} $project"
  echo -e "${CYAN}→ Env:${NC}     $env"
  echo ""
  wrangler pages deploy "$deploy_dir" \
    --project-name="$project" \
    --branch="$([[ "$env" == "production" ]] && echo main || echo "$env")"

  local exit_code=$?
  [[ -n "$file" ]] && rm -rf "$deploy_dir"

  if [[ $exit_code -eq 0 ]]; then
    echo ""
    echo -e "${GREEN}✓ Deployed to Cloudflare Pages${NC}"
    echo -e "  https://${project}.pages.dev"
  else
    echo -e "${RED}✗ Deploy failed (exit $exit_code)${NC}"
    exit $exit_code
  fi
}

# ─── AUDIT ───────────────────────────────────────────────────────────────
_cmd_audit() {
  local file="$1"
  if [[ -z "$file" || ! -f "$file" ]]; then
    echo -e "${RED}✗ Usage: br brand audit <file.html>${NC}"
    exit 1
  fi

  echo ""
  echo -e "${BOLD}${CYAN}Brand Compliance Audit${NC} — ${file}"
  echo -e "${CYAN}─────────────────────────────────────────${NC}"

  local pass=0 fail=0

  _check() {
    local label="$1" pattern="$2"
    if grep -q "$pattern" "$file" 2>/dev/null; then
      echo -e "  ${GREEN}✓${NC} $label"
      pass=$((pass+1))
    else
      echo -e "  ${RED}✗${NC} $label"
      fail=$((fail+1))
    fi
  }

  _check "Brand colors defined (--sunrise-orange)"  "sunrise-orange"
  _check "Brand gradient (--gradient-brand)"        "gradient-brand"
  _check "Hot pink (#FF0066)"                       "FF0066\|hot-pink"
  _check "Cyber blue (#0066FF)"                     "0066FF\|cyber-blue"
  _check "Vivid purple (#7700FF)"                   "7700FF\|vivid-purple"
  _check "Golden ratio spacing (--space-)"          "\-\-space-"
  _check "Scroll progress bar"                      "scroll-progress\|scroll-bar"
  _check "backdrop-filter / glassmorphism"          "backdrop-filter"
  _check "animate-in class"                         "animate-in"
  _check "Gradient text (.gradient-text)"           "gradient-text\|background-clip:text\|background-clip: text"
  _check "Brand font stack"                         "JetBrains Mono\|SF Mono\|Courier New"
  _check "Golden ratio line-height (1.618)"         "1\.618"

  echo ""
  local total=$((pass+fail))
  local pct=$(( pass * 100 / total ))
  if [[ $fail -eq 0 ]]; then
    echo -e "  ${GREEN}${BOLD}✓ PASS${NC} — ${pass}/${total} checks (${pct}%)"
  elif [[ $pct -ge 75 ]]; then
    echo -e "  ${YELLOW}${BOLD}⚠ PARTIAL${NC} — ${pass}/${total} checks (${pct}%)"
  else
    echo -e "  ${RED}${BOLD}✗ FAIL${NC} — ${pass}/${total} checks (${pct}%)"
  fi
  echo ""
}

# ─── LIST ─────────────────────────────────────────────────────────────────
_cmd_list() {
  echo ""
  echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════╗${NC}"
  echo -e "${BOLD}${CYAN}║  BR Brand — Template Engine  💜              ║${NC}"
  echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${YELLOW}Available Templates:${NC}"
  echo ""
  echo -e "  ${GREEN}landing${NC}   Full landing page with hero, features grid, CTA"
  echo -e "  ${GREEN}agent${NC}     Agent profile page with skill progress bars"
  echo -e "  ${GREEN}docs${NC}      Documentation / article page with sections"
  echo -e "  ${GREEN}pricing${NC}   Pricing tiers page with feature lists"
  echo -e "  ${GREEN}feature${NC}   Alternating split-layout feature showcase"
  echo -e "  ${GREEN}blog${NC}      Blog post with author, tags, and sections"
  echo -e "  ${GREEN}404${NC}       Branded 404 error page with glitch animation"
  echo -e "  ${GREEN}card${NC}      Reusable card HTML snippet (embed anywhere)"
  echo ""
  echo -e "${YELLOW}Commands:${NC}"
  echo ""
  echo -e "  ${CYAN}br brand new <template> [flags]${NC}   Generate a page"
  echo -e "  ${CYAN}br brand deploy${NC} --project x --file y.html   Push to Cloudflare Pages"
  echo -e "  ${CYAN}br brand audit${NC} <file.html>         Check brand compliance"
  echo -e "  ${CYAN}br brand preview <template>${NC}        Show template structure"
  echo ""
  echo -e "${YELLOW}Key flags:${NC}"
  echo ""
  echo -e "  landing : --title --tagline --desc --cta --cta-url --feature \"🚀|Title|Desc\" --output"
  echo -e "  agent   : --title --type --tagline --bio --emoji --skill \"Name|pct\" --output"
  echo -e "  docs    : --title --subtitle --author --section \"Heading|Body\" --output"
  echo -e "  pricing : --title --subtitle --tier \"Name|Price|Period|Desc|feat1,feat2|CTA|url|highlight\" --output"
  echo -e "  feature : --title --subtitle --item \"🔥|Title|Desc\" --output"
  echo -e "  blog    : --title --subtitle --author --date --tags \"ai,agents\" --section \"H|Body\" --output"
  echo -e "  404     : --title --message --home-url --output"
  echo -e "  card    : --title --desc --icon --badge --link --output"
  echo ""
  echo -e "${PURPLE}Default output dir: ${OUT_DIR}${NC}"
  echo ""
}

# ─── PREVIEW ──────────────────────────────────────────────────────────────
_cmd_preview() {
  case "$1" in
    landing) echo -e "${CYAN}landing${NC}: Hero → Description → Feature Grid (2-4 cols) → CTA section" ;;
    agent)   echo -e "${CYAN}agent${NC}:   Emoji hero → Bio card → Skill progress bars" ;;
    docs)    echo -e "${CYAN}docs${NC}:    Title/subtitle → Divider → Sectioned content" ;;
    pricing) echo -e "${CYAN}pricing${NC}: Hero → Tier cards (gradient-border on highlight tier)" ;;
    feature) echo -e "${CYAN}feature${NC}: Hero → Alternating split rows (icon left/right + text)" ;;
    blog)    echo -e "${CYAN}blog${NC}:    Tags → Hero title → Author/date → Body sections" ;;
    404)     echo -e "${CYAN}404${NC}:     Glitch-animated 404 → message → Home + Back buttons" ;;
    card)    echo -e "${CYAN}card${NC}:    Standalone card HTML snippet (embed in any grid)" ;;
    *)       echo -e "${RED}Unknown template: $1${NC}"; _cmd_list ;;
  esac
}

# ─── NEW ──────────────────────────────────────────────────────────────────
_cmd_new() {
  local tpl="$1"; shift

  # Defaults
  local title="BlackRoad OS" tagline="" desc="" cta_text="Get Started" cta_url="#"
  local type="Agent" bio="" emoji="🤖"
  local subtitle="" author="BlackRoad OS" date_str="" tags=""
  local message="Page not found" home_url="/"
  local icon="✦" badge="" link="#"
  local output=""
  local -a features skills sections tiers items

  # Parse flags
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --title)     title="$2";     shift 2 ;;
      --tagline)   tagline="$2";   shift 2 ;;
      --desc)      desc="$2";      shift 2 ;;
      --cta)       cta_text="$2";  shift 2 ;;
      --cta-url)   cta_url="$2";   shift 2 ;;
      --feature)   features+=("$2"); shift 2 ;;
      --type)      type="$2";      shift 2 ;;
      --bio)       bio="$2";       shift 2 ;;
      --emoji)     emoji="$2";     shift 2 ;;
      --skill)     skills+=("$2"); shift 2 ;;
      --subtitle)  subtitle="$2";  shift 2 ;;
      --author)    author="$2";    shift 2 ;;
      --section)   sections+=("$2"); shift 2 ;;
      --tier)      tiers+=("$2");  shift 2 ;;
      --item)      items+=("$2");  shift 2 ;;
      --date)      date_str="$2";  shift 2 ;;
      --tags)      tags="$2";      shift 2 ;;
      --message)   message="$2";   shift 2 ;;
      --home-url)  home_url="$2";  shift 2 ;;
      --icon)      icon="$2";      shift 2 ;;
      --badge)     badge="$2";     shift 2 ;;
      --link)      link="$2";      shift 2 ;;
      --output)    output="$2";    shift 2 ;;
      *) shift ;;
    esac
  done

  # Default output filename
  if [[ -z "$output" ]]; then
    local slug
    slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')
    output="${OUT_DIR}/${tpl}-${slug}.html"
  else
    # If not absolute, resolve relative to cwd (not OUT_DIR)
    [[ "$output" != /* ]] && output="$(pwd)/${output}"
  fi
  # Ensure parent directory exists
  mkdir -p "$(dirname "$output")"

  case "$tpl" in
    landing)
      _tpl_landing "$title" "$tagline" "$desc" "$cta_text" "$cta_url" "$output" "${features[@]}"
      ;;
    agent)
      _tpl_agent "$title" "$type" "$tagline" "$bio" "$emoji" "$output" "${skills[@]}"
      ;;
    docs)
      _tpl_docs "$title" "$subtitle" "$author" "$output" "${sections[@]}"
      ;;
    pricing)
      _tpl_pricing "$title" "$subtitle" "$output" "${tiers[@]}"
      ;;
    feature)
      _tpl_feature "$title" "$subtitle" "$output" "${items[@]}"
      ;;
    blog)
      _tpl_blog "$title" "$subtitle" "$author" "$date_str" "$tags" "$output" "${sections[@]}"
      ;;
    404)
      _tpl_404 "$title" "$message" "$home_url" "$output"
      ;;
    card)
      _tpl_card "$title" "$desc" "$icon" "$badge" "$link" "$output"
      ;;
    *)
      echo -e "${RED}Unknown template: ${tpl}${NC}"
      echo "Run: br brand list"
      exit 1
      ;;
  esac

  echo ""
  echo -e "${GREEN}✓ Generated:${NC} ${output}"
  echo -e "${CYAN}  Template:${NC}  ${tpl}"
  echo -e "${CYAN}  Title:${NC}     ${title}"
  echo ""
  echo -e "  Open with: ${YELLOW}open ${output}${NC}"
  echo ""
}

# ─── MAIN ─────────────────────────────────────────────────────────────────
case "${1:-list}" in
  list|ls)    _cmd_list ;;
  preview)    _cmd_preview "$2" ;;
  new|gen)    _cmd_new "$2" "${@:3}" ;;
  deploy)     _cmd_deploy "${@:2}" ;;
  audit)      _cmd_audit "$2" ;;
  *)
    echo -e "${RED}Unknown command: $1${NC}"
    echo "Usage: br brand [list | new <template> | deploy | audit <file> | preview <template>]"
    exit 1
    ;;
esac
