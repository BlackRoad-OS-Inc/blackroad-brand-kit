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
  --sunrise-orange: #F5A623;
  --warm-orange: #F5A623;
  --hot-pink: #FF1D6C;
  --electric-magenta: #FF1D6C;
  --deep-magenta: #9C27B0;
  --vivid-purple: #9C27B0;
  --cyber-blue: #2979FF;
  --gradient-br: linear-gradient(135deg, var(--sunrise-orange) 0%, var(--hot-pink) 100%);
  --gradient-os: linear-gradient(135deg, var(--vivid-purple) 0%, var(--cyber-blue) 100%);
  --gradient-full: linear-gradient(135deg, var(--sunrise-orange) 0%, var(--hot-pink) 38.2%, var(--vivid-purple) 61.8%, var(--cyber-blue) 100%);
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
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(245,166,35,0.3); color: var(--white); }
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
# Escape special HTML characters to prevent injection in generated pages.
_html_escape() {
  local str="$1"
  str="${str//&/&amp;}"
  str="${str//</&lt;}"
  str="${str//>/&gt;}"
  str="${str//\"/&quot;}"
  str="${str//\'/&#39;}"
  printf '%s' "$str"
}

_html_head() {
  local title="$1" desc="$2"
  # Escape user-provided strings before embedding in HTML
  local title_e; title_e=$(_html_escape "$title")
  local desc_e;  desc_e=$(_html_escape "$desc")
  # Pull OG/social meta from env (exported by _cmd_site/_cmd_new --config)
  local og_title_e; og_title_e=$(_html_escape "${BR_BRAND_OG_TITLE:-${title}}")
  local og_desc_e;  og_desc_e=$(_html_escape "${BR_BRAND_OG_DESC:-${desc}}")
  local og_image="${BR_BRAND_OG_IMAGE:-}"
  local og_url="${BR_BRAND_OG_URL:-}"
  local og_type="${BR_BRAND_OG_TYPE:-website}"
  local tw_handle="${BR_BRAND_TWITTER:-}"
  local site_name_e; site_name_e=$(_html_escape "${BR_BRAND_SITE_NAME:-BlackRoad OS}")
  local favicon="${BR_BRAND_FAVICON:-}"

  local og_image_tag="" og_url_tag="" tw_handle_tag="" favicon_tag=""
  [[ -n "$og_image" ]] && og_image_tag="  <meta property=\"og:image\" content=\"${og_image}\" />"$'\n'
  [[ -n "$og_url"   ]] && og_url_tag="  <meta property=\"og:url\" content=\"${og_url}\" />"$'\n'
  [[ -n "$tw_handle" ]] && tw_handle_tag="  <meta name=\"twitter:site\" content=\"${tw_handle}\" />"$'\n'
  [[ -n "$favicon"  ]] && favicon_tag="  <link rel=\"icon\" href=\"${favicon}\" />"$'\n'

  cat <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title_e} — ${site_name_e}</title>
  <meta name="description" content="${desc_e}" />
  <!-- Open Graph -->
  <meta property="og:type" content="${og_type}" />
  <meta property="og:site_name" content="${site_name_e}" />
  <meta property="og:title" content="${og_title_e}" />
  <meta property="og:description" content="${og_desc_e}" />
${og_image_tag}${og_url_tag}  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${og_title_e}" />
  <meta name="twitter:description" content="${og_desc_e}" />
${og_image_tag}${tw_handle_tag}${favicon_tag}  <style>${BRAND_CSS}</style>
</head>
<body>
<div id="scroll-bar" class="scroll-progress"></div>
<div class="bg-grid"></div>
<div class="bg-orb" style="width:600px;height:600px;top:-200px;right:-200px;background:var(--vivid-purple);"></div>
<div class="bg-orb" style="width:400px;height:400px;bottom:10%;left:-100px;background:var(--hot-pink);"></div>
EOF
}

_html_nav() {
  local logo_text="${1:-BlackRoad OS}" nav_links="${2:-${BR_BRAND_NAV:-}}"
  local logo_text_e; logo_text_e=$(_html_escape "$logo_text")
  local logo_html
  if [[ -n "${BR_BRAND_LOGO:-}" ]]; then
    logo_html="<img src=\"${BR_BRAND_LOGO}\" alt=\"${logo_text_e}\" style=\"height:28px;width:auto;object-fit:contain;\" />"
  else
    logo_html="${logo_text_e}"
  fi
  echo "<nav><div class=\"nav-logo\">${logo_html}</div><div class=\"nav-links\">${nav_links}</div></nav>"
}

_html_footer() {
  local year; year=$(date +%Y)
  local text="${BR_BRAND_FOOTER:-© ${year} BlackRoad OS, Inc. All rights reserved.}"
  echo "<footer><div class=\"container\"><p>${text}</p></div></footer>"
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
  local title_e; title_e=$(_html_escape "$title")
  local tagline_e; tagline_e=$(_html_escape "$tagline")
  local desc_e; desc_e=$(_html_escape "$desc")
  local cta_text_e; cta_text_e=$(_html_escape "$cta_text")

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
      <h1 class="gradient-text animate-in" style="margin-bottom:var(--space-lg);">${title_e}</h1>
      <p style="font-size:1.3rem;max-width:640px;margin:0 auto var(--space-xl);" class="animate-in">${tagline_e}</p>
      <div style="display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap;" class="animate-in">
        <a href="${cta_url}" class="btn btn-primary">${cta_text_e}</a>
        <a href="#features" class="btn btn-outline">Learn More</a>
      </div>
    </div>
  </section>

  <!-- Description -->
  <section class="section" id="about">
    <div class="container" style="max-width:800px;text-align:center;">
      <p style="font-size:1.1rem;line-height:1.8;" class="animate-in">${desc_e}</p>
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
        local ftitle_e; ftitle_e=$(_html_escape "$ftitle")
        local fdesc_e; fdesc_e=$(_html_escape "$fdesc")
        cat <<EOF
        <div class="card animate-in">
          <div style="font-size:2rem;margin-bottom:var(--space-md);">${icon}</div>
          <h4 style="margin-bottom:var(--space-sm);">${ftitle_e}</h4>
          <p style="font-size:0.9rem;">${fdesc_e}</p>
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
        <a href="${cta_url}" class="btn btn-primary animate-in">${cta_text_e} →</a>
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
  local name_e; name_e=$(_html_escape "$name")
  local type_e; type_e=$(_html_escape "$type")
  local tagline_e; tagline_e=$(_html_escape "$tagline")
  local bio_e; bio_e=$(_html_escape "$bio")

  {
    _html_head "$name — Agent" "$bio"
    _html_nav "BlackRoad OS" "<a href=\"/agents\">Agents</a>"

    cat <<EOF
<main>
  <section class="section" style="text-align:center;">
    <div class="container" style="max-width:700px;">
      <div style="font-size:5rem;margin-bottom:var(--space-lg);animation:float 4s ease-in-out infinite;">${emoji}</div>
      <div class="section-label animate-in">${type_e}</div>
      <h1 class="gradient-text animate-in">${name_e}</h1>
      <p style="font-size:1.2rem;margin-top:var(--space-lg);" class="animate-in">${tagline_e}</p>
    </div>
  </section>

  <!-- Bio -->
  <section class="section">
    <div class="container" style="max-width:800px;">
      <div class="card animate-in">
        <div class="section-label">About</div>
        <p style="font-size:1rem;line-height:1.8;margin-top:var(--space-md);">${bio_e}</p>
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
        local sname_e; sname_e=$(_html_escape "$sname")
        cat <<EOF
        <div class="animate-in">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs);">
            <span style="font-size:0.9rem;font-weight:600;">${sname_e}</span>
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
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")
  local author_e; author_e=$(_html_escape "$author")

  {
    _html_head "$title" "$subtitle"
    _html_nav "BlackRoad OS" "<a href=\"/docs\">Docs</a> <a href=\"/\">Home</a>"

    cat <<EOF
<main>
  <section class="section" style="max-width:800px;margin:0 auto;">
    <div class="container">
      <div class="section-label animate-in">${author_e}</div>
      <h1 class="animate-in" style="margin-bottom:var(--space-md);">${title_e}</h1>
      <p style="font-size:1.1rem;color:rgba(255,255,255,0.6);margin-bottom:var(--space-2xl);" class="animate-in">${subtitle_e}</p>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin-bottom:var(--space-2xl);" />
EOF

    for sec in "${sections[@]}"; do
      local stitle="${sec%%|*}"
      local scontent="${sec#*|}"
      local stitle_e; stitle_e=$(_html_escape "$stitle")
      local scontent_e; scontent_e=$(_html_escape "$scontent")
      cat <<EOF
      <div class="animate-in" style="margin-bottom:var(--space-2xl);">
        <h3 style="margin-bottom:var(--space-md);color:var(--white);">${stitle_e}</h3>
        <p style="line-height:1.8;">${scontent_e}</p>
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
  local title_e; title_e=$(_html_escape "$title")
  local desc_e; desc_e=$(_html_escape "$desc")
  local badge_e; badge_e=$(_html_escape "$badge")

  cat <<EOF > "$output"
<!-- BlackRoad OS Brand Card — copy into any page -->
<div class="card animate-in">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-md);">
    <span style="font-size:2rem;">${icon}</span>
    $([ -n "$badge" ] && echo "<span style=\"font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:4px;background:var(--gradient-brand);color:var(--white);\">${badge_e}</span>")
  </div>
  <h4 style="margin-bottom:var(--space-sm);">${title_e}</h4>
  <p style="font-size:0.9rem;margin-bottom:var(--space-lg);">${desc_e}</p>
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
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")

  {
    _html_head "$title" "$subtitle"
    _html_nav "BlackRoad OS" "<a href=\"/\">Home</a>"

    cat <<EOF
<main>
  <section class="section" style="text-align:center;">
    <div class="container">
      <div class="section-label animate-in">Pricing</div>
      <h1 class="gradient-text animate-in">${title_e}</h1>
      <p style="font-size:1.1rem;max-width:560px;margin:var(--space-lg) auto 0;" class="animate-in">${subtitle_e}</p>
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
      local tname_e; tname_e=$(_html_escape "$tname")
      local tprice_e; tprice_e=$(_html_escape "$tprice")
      local tperiod_e; tperiod_e=$(_html_escape "$tperiod")
      local tdesc_e; tdesc_e=$(_html_escape "$tdesc")
      local tcta_e; tcta_e=$(_html_escape "$tcta")

      local wrapper_open="" wrapper_close=""
      if [[ "$thighlight" == "true" ]]; then
        wrapper_open='<div class="gradient-border" style="border-radius:var(--space-md);padding:1px;">'
        wrapper_close='</div>'
      fi

      echo "        ${wrapper_open}"
      cat <<EOF
        <div class="card animate-in" style="text-align:center;$([ "$thighlight" = "true" ] && echo "background:rgba(255,255,255,0.07);")">
          <div class="section-label" style="text-align:center;">${tname_e}</div>
          <div style="margin:var(--space-lg) 0;">
            <span style="font-size:3.5rem;font-weight:700;background:var(--gradient-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${tprice_e}</span>
            <span style="color:rgba(255,255,255,0.5);font-size:0.9rem;"> / ${tperiod_e}</span>
          </div>
          <p style="font-size:0.9rem;margin-bottom:var(--space-xl);">${tdesc_e}</p>
          <ul style="list-style:none;text-align:left;margin-bottom:var(--space-xl);">
EOF
      IFS=',' read -rA feat_list <<< "$tfeats"
      for feat in "${feat_list[@]}"; do
        feat="${feat## }"; feat="${feat%% }"
        local feat_e; feat_e=$(_html_escape "$feat")
        echo "            <li style=\"padding:var(--space-xs) 0;font-size:0.9rem;border-bottom:1px solid rgba(255,255,255,0.05);\">✓ &nbsp;${feat_e}</li>"
      done
      cat <<EOF
          </ul>
          <a href="${tcta_url}" class="btn $([ "$thighlight" = "true" ] && echo "btn-primary" || echo "btn-outline")" style="width:100%;text-align:center;">${tcta_e}</a>
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
  local title_e; title_e=$(_html_escape "$title")
  local message_e; message_e=$(_html_escape "$message")

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
    <h2 class="animate-in" style="margin-bottom:var(--space-md);">${title_e}</h2>
    <p class="animate-in" style="margin-bottom:var(--space-xl);">${message_e}</p>
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
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")

  {
    _html_head "$title" "$subtitle"
    _html_nav "BlackRoad OS" "<a href=\"/\">Home</a> <a href=\"#features\">Features</a>"

    cat <<EOF
<main>
  <section class="section" style="text-align:center;">
    <div class="container">
      <div class="section-label animate-in">Features</div>
      <h1 class="gradient-text animate-in">${title_e}</h1>
      <p style="font-size:1.1rem;max-width:640px;margin:var(--space-lg) auto 0;" class="animate-in">${subtitle_e}</p>
    </div>
  </section>

  <section class="section" id="features">
    <div class="container" style="max-width:960px;">
EOF

    local idx=0
    for item in "${items[@]}"; do
      local iicon="${item%%|*}"; local rest="${item#*|}"; local ititle="${rest%%|*}"; local idesc="${rest#*|}"
      local ititle_e; ititle_e=$(_html_escape "$ititle")
      local idesc_e; idesc_e=$(_html_escape "$idesc")
      local reverse=""
      [[ $((idx % 2)) -eq 1 ]] && reverse="flex-direction:row-reverse;"
      cat <<EOF
      <div class="animate-in" style="display:flex;gap:var(--space-2xl);align-items:center;margin-bottom:var(--space-3xl);${reverse}flex-wrap:wrap;">
        <div style="flex:0 0 140px;text-align:center;">
          <div style="font-size:4rem;background:var(--charcoal);border-radius:var(--space-lg);padding:var(--space-xl);display:inline-block;border:1px solid rgba(255,255,255,0.06);">${iicon}</div>
        </div>
        <div style="flex:1;min-width:240px;">
          <h3 style="margin-bottom:var(--space-md);">${ititle_e}</h3>
          <p style="line-height:1.8;">${idesc_e}</p>
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
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")
  local author_e; author_e=$(_html_escape "$author")
  local date_str_e; date_str_e=$(_html_escape "${date_str:-$(date "+%B %d, %Y")}")

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
        local tag_e; tag_e=$(_html_escape "$tag")
        echo "        <span style=\"font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:20px;border:1px solid rgba(245,166,35,0.4);color:var(--sunrise-orange);\">${tag_e}</span>"
      done
      echo "      </div>"
    fi

    cat <<EOF
      <h1 class="animate-in" style="margin-bottom:var(--space-lg);">${title_e}</h1>
      <p style="font-size:1.1rem;color:rgba(255,255,255,0.6);margin-bottom:var(--space-xl);" class="animate-in">${subtitle_e}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-md);color:rgba(255,255,255,0.4);font-size:0.85rem;" class="animate-in">
        <span>✍ ${author_e}</span>
        <span>·</span>
        <span>${date_str_e}</span>
      </div>
    </div>
  </section>

  <section style="border-top:1px solid rgba(255,255,255,0.06);padding:var(--space-3xl) 0;">
    <div class="container" style="max-width:740px;">
EOF

    for sec in "${sections[@]}"; do
      local sheading="${sec%%|*}"
      local sbody="${sec#*|}"
      local sheading_e; sheading_e=$(_html_escape "$sheading")
      local sbody_e; sbody_e=$(_html_escape "$sbody")
      cat <<EOF
      <div class="animate-in" style="margin-bottom:var(--space-2xl);">
        <h2 style="font-size:1.6rem;margin-bottom:var(--space-md);color:var(--white);">${sheading_e}</h2>
        <p style="line-height:1.9;font-size:1.05rem;">${sbody_e}</p>
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
    echo ""
    echo -e "${RED}✗ Deploy failed (exit $exit_code)${NC}"
    echo ""
    echo -e "${YELLOW}Common fixes:${NC}"
    echo -e "  • ${CYAN}wrangler login${NC}                  — re-authenticate (token may have expired)"
    echo -e "  • ${CYAN}wrangler whoami${NC}                 — confirm you are logged in"
    echo -e "  • ${CYAN}wrangler pages project create ${project}${NC}  — pre-create the Pages project"
    echo -e "  • Cloudflare API error 8000000 = transient server error — retry in a moment"
    echo ""
    echo -e "  Logs: ${YELLOW}~/.wrangler/logs/${NC}"
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
  _check "Hot pink (#FF1D6C)"                       "FF1D6C\|hot-pink"
  _check "Cyber blue (#2979FF)"                     "2979FF\|cyber-blue"
  _check "Vivid purple (#9C27B0)"                   "9C27B0\|vivid-purple"
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
  echo -e "  ${GREEN}404${NC}          Branded 404 error page with glitch animation"
  echo -e "  ${GREEN}card${NC}         Reusable card HTML snippet (embed anywhere)"
  echo -e "  ${GREEN}hero${NC}         Full-width hero section — gradient headline, dual CTAs"
  echo -e "  ${GREEN}stats${NC}        Horizontal stats bar — value + label tiles"
  echo -e "  ${GREEN}testimonial${NC}  Quote card grid — avatar initial, name, role, quote"
  echo -e "  ${GREEN}codeblock${NC}     Styled dark code block with copy-button chrome"
  echo -e "  ${GREEN}coming-soon${NC}  Live countdown + email capture (no back-end required)"
  echo -e "  ${GREEN}changelog${NC}    Release notes — version badge, date, tagged bullet lists"
  echo -e "  ${GREEN}team${NC}         Team member card grid — avatar, name, role, bio, link"
  echo -e "  ${GREEN}checkout${NC}     Stripe checkout card — price, features, buy button (Stripe Checkout)"
  echo -e "  ${GREEN}dashboard${NC}    KPI tiles + agent status rows + activity timeline"
  echo -e "  ${GREEN}report${NC}       Metrics header + narrative sections (ops/perf report)"
  echo -e "  ${GREEN}table${NC}        Service status data table with dot indicators"
  echo -e "  ${GREEN}cards${NC}        Product/portal card grid — name, domain, desc, status badge"
  echo -e "  ${GREEN}app-templates${NC}  Tabbed app template kit — Login, Pricing, Changelog, Settings, Docs, Analytics"
  echo ""
  echo -e "${YELLOW}Commands:${NC}"
  echo ""
  echo -e "  ${CYAN}br brand init${NC} [brand.json]              Interactive setup wizard"
  echo -e "  ${CYAN}br brand site${NC} [--config brand.json]     Generate full 5-page site"
  echo -e "  ${CYAN}br brand new <template> [flags]${NC}         Generate a page"
  echo -e "  ${CYAN}br brand deploy${NC} --project x --dir y    Push to Cloudflare Pages"
  echo -e "  ${CYAN}br brand audit${NC} <file.html>              Check brand compliance"
  echo -e "  ${CYAN}br brand watch${NC} [--config brand.json]    Auto-rebuild on file change"
  echo -e "  ${CYAN}br brand open${NC} [file.html]               Open in browser"
  echo -e "  ${CYAN}br brand export${NC} [--dir ./site]          Zip all pages"
  echo -e "  ${CYAN}br brand preview <template>${NC}             Show template structure"
  echo ""
  echo -e "${YELLOW}Key flags:${NC}"
  echo ""
  echo -e "  landing     : --title --tagline --desc --cta --cta-url --feature \"🚀|Title|Desc\" --output"
  echo -e "  agent       : --title --type --tagline --bio --emoji --skill \"Name|pct\" --output"
  echo -e "  docs        : --title --subtitle --author --section \"Heading|Body\" --output"
  echo -e "  pricing     : --title --subtitle --tier \"Name|Price|Period|Desc|feats|CTA|url|highlight\" --output"
  echo -e "  feature     : --title --subtitle --item \"🔥|Title|Desc\" --output"
  echo -e "  blog        : --title --subtitle --author --date --tags \"ai\" --section \"H|Body\" --output"
  echo -e "  404         : --title --message --home-url --output"
  echo -e "  card        : --title --desc --icon --badge --link --output"
  echo -e "  hero        : --title --tagline --desc --cta --cta-url --secondary-cta --secondary-url --badge --output"
  echo -e "  stats       : --title --subtitle --stat \"30K|Agents\" --output"
  echo -e "  testimonial : --title --subtitle --testimonial \"A|Alice|CEO|Great product\" --output"
  echo -e "  codeblock   : --title --language bash --code \"echo hi\" --output"
  echo -e "  coming-soon : --title --tagline --launch-date \"2026-04-01T00:00:00\" --output"
  echo -e "  changelog   : --title --subtitle --entry \"v1.0|2026-01-01|Added X,Fixed Y|feature,fix\" --output"
  echo -e "  team        : --title --subtitle --member \"A|Alice|CEO|Bio here|https://github.com/...\" --output"
  echo -e "  checkout    : --title \"Pro Plan\" --price \"\$49/mo\" --price-id \"price_xxx\" --worker URL --feature X --cta \"Buy\" --output"
  echo -e "  dashboard   : --title --subtitle --kpi \"Label|Value|Delta\" --agent-item \"name|status|color|load\" --event \"time|event|tag\" --output"
  echo -e "  report      : --title --subtitle --date \"March 3, 2026\" --metric \"Label|Value|Prev\" --section \"Title|Body\" --output"
  echo -e "  table       : --title --subtitle --header \"Svc,Status,Latency\" --row \"api.x.io|UP|12ms\" --output"
  echo -e "  cards       : --title --subtitle --card-item \"Name|domain.io|Description|Status\" --output"
  echo -e "  app-templates : --title \"BlackRoad Templates\" --output"
  echo ""
  echo -e "  ${YELLOW}All templates accept:${NC} --config brand.json  (pre-fill from config file)"
  echo ""
  echo -e "${PURPLE}Default output dir: ${OUT_DIR}${NC}"
  echo ""
}

# ─── PREVIEW ──────────────────────────────────────────────────────────────
_cmd_preview() {
  case "$1" in
    landing)     echo -e "${CYAN}landing${NC}:     Hero → Description → Feature Grid (2-4 cols) → CTA section" ;;
    agent)       echo -e "${CYAN}agent${NC}:       Emoji hero → Bio card → Skill progress bars" ;;
    docs)        echo -e "${CYAN}docs${NC}:        Title/subtitle → Divider → Sectioned content" ;;
    pricing)     echo -e "${CYAN}pricing${NC}:     Hero → Tier cards (gradient-border on highlight tier)" ;;
    feature)     echo -e "${CYAN}feature${NC}:     Hero → Alternating split rows (icon left/right + text)" ;;
    blog)        echo -e "${CYAN}blog${NC}:        Tags → Hero title → Author/date → Body sections" ;;
    404)         echo -e "${CYAN}404${NC}:         Glitch-animated 404 → message → Home + Back buttons" ;;
    card)        echo -e "${CYAN}card${NC}:        Standalone card HTML snippet (embed in any grid)" ;;
    hero)        echo -e "${CYAN}hero${NC}:        Full-width hero — badge → gradient title → tagline → dual CTAs" ;;
    stats)       echo -e "${CYAN}stats${NC}:       Centered stats bar — value tiles with brand gradient values" ;;
    testimonial) echo -e "${CYAN}testimonial${NC}: Quote card grid — avatar initial, name, role, pull-quote" ;;
    codeblock)   echo -e "${CYAN}codeblock${NC}:   Dark code panel — language tab, line numbers, copy button chrome" ;;
    coming-soon) echo -e "${CYAN}coming-soon${NC}: Full-gradient page — live countdown, email capture form" ;;
    changelog)   echo -e "${CYAN}changelog${NC}:   Release log — version + date + tagged bullets per entry" ;;
    team)        echo -e "${CYAN}team${NC}:        Card grid — avatar initial, name, role, bio, GitHub link" ;;
    checkout)    echo -e "${CYAN}checkout${NC}:   Stripe checkout page — price card, features list, buy button" ;;
    dashboard)   echo -e "${CYAN}dashboard${NC}:  KPI tiles → agent status rows → activity timeline" ;;
    report)      echo -e "${CYAN}report${NC}:     Metrics header → narrative sections (ops report)" ;;
    table)       echo -e "${CYAN}table${NC}:      Service status data table with dot indicators" ;;
    cards)       echo -e "${CYAN}cards${NC}:      Product/portal card grid — name, domain, desc, status badge" ;;
    *)           echo -e "${RED}Unknown template: $1${NC}"; _cmd_list ;;
    checkout)        echo -e "${CYAN}checkout${NC}:       Stripe checkout page — price card, features list, buy button" ;;
    app-templates)   echo -e "${CYAN}app-templates${NC}: Tabbed app template kit — Login, Pricing, Changelog, Settings, Docs, Analytics" ;;
    *)               echo -e "${RED}Unknown template: $1${NC}"; _cmd_list ;;
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
  local secondary_cta="" secondary_url="#"
  local language="bash" code_text=""
  local launch_date=""
  local output="" config_file=""
  local price="" price_id="" stripe_worker="https://blackroad-stripe.workers.dev" payment_link=""
  local -a features skills sections tiers items stats testimonials members entries
  local -a kpis agent_items events metrics rows card_items
  local header=""

  # Pre-scan for --config so we can load defaults before flag parsing
  local -a _argv=("$@")
  for ((i=1; i<=${#_argv}; i++)); do
    if [[ "${_argv[$i]}" == "--config" ]]; then
      config_file="${_argv[$((i+1))]}"
      break
    fi
  done

  # Load brand.json defaults (explicit flags below will override these)
  if [[ -n "$config_file" && -f "$config_file" ]]; then
    title=$(_cfg_get "$config_file" "name" "$title")
    tagline=$(_cfg_get "$config_file" "tagline" "$tagline")
    desc=$(_cfg_get "$config_file" "description" "$desc")
    cta_text=$(_cfg_get "$config_file" "cta_text" "$cta_text")
    cta_url=$(_cfg_get "$config_file" "cta_url" "$cta_url")
    # Export nav + footer so _html_nav/_html_footer pick them up
    export BR_BRAND_NAV=$(python3 -c "
import json,sys
d=json.load(open('$config_file'))
items=d.get('nav',[])
print(''.join(f'<a href=\"{i[\"url\"]}\">{i[\"label\"]}</a>' for i in items))
" 2>/dev/null)
    export BR_BRAND_FOOTER=$(_cfg_get "$config_file" "footer" "")
    export BR_BRAND_SITE_NAME=$(_cfg_get "$config_file" "name" "BlackRoad OS")
    export BR_BRAND_OG_TITLE=$(_cfg_get "$config_file" "name" "")
    export BR_BRAND_OG_DESC=$(_cfg_get "$config_file" "description" "")
    export BR_BRAND_OG_IMAGE=$(_cfg_get "$config_file" "og_image" "")
    export BR_BRAND_OG_URL=$(_cfg_get "$config_file" "og_url" "")
    export BR_BRAND_TWITTER=$(_cfg_get "$config_file" "twitter" "")
    export BR_BRAND_LOGO=$(_cfg_get "$config_file" "logo" "")
    export BR_BRAND_FAVICON=$(_cfg_get "$config_file" "favicon" "")
  fi

  # Parse flags
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --title)         title="$2";            shift 2 ;;
      --tagline)       tagline="$2";          shift 2 ;;
      --desc)          desc="$2";             shift 2 ;;
      --cta)           cta_text="$2";         shift 2 ;;
      --cta-url)       cta_url="$2";          shift 2 ;;
      --feature)       features+=("$2");      shift 2 ;;
      --type)          type="$2";             shift 2 ;;
      --bio)           bio="$2";              shift 2 ;;
      --emoji)         emoji="$2";            shift 2 ;;
      --skill)         skills+=("$2");        shift 2 ;;
      --subtitle)      subtitle="$2";         shift 2 ;;
      --author)        author="$2";           shift 2 ;;
      --section)       sections+=("$2");      shift 2 ;;
      --tier)          tiers+=("$2");         shift 2 ;;
      --item)          items+=("$2");         shift 2 ;;
      --date)          date_str="$2";         shift 2 ;;
      --tags)          tags="$2";             shift 2 ;;
      --message)       message="$2";          shift 2 ;;
      --home-url)      home_url="$2";         shift 2 ;;
      --icon)          icon="$2";             shift 2 ;;
      --badge)         badge="$2";            shift 2 ;;
      --link)          link="$2";             shift 2 ;;
      --secondary-cta) secondary_cta="$2";    shift 2 ;;
      --secondary-url) secondary_url="$2";    shift 2 ;;
      --stat)          stats+=("$2");         shift 2 ;;
      --testimonial)   testimonials+=("$2");  shift 2 ;;
      --language)      language="$2";         shift 2 ;;
      --code)          code_text="$2";        shift 2 ;;
      --launch-date)   launch_date="$2";      shift 2 ;;
      --entry)         entries+=("$2");       shift 2 ;;
      --member)        members+=("$2");       shift 2 ;;
      --price)         price="$2";            shift 2 ;;
      --price-id)      price_id="$2";         shift 2 ;;
      --worker)        stripe_worker="$2";    shift 2 ;;
      --payment-link)  payment_link="$2";     shift 2 ;;
      --kpi)           kpis+=("$2");          shift 2 ;;
      --agent-item)    agent_items+=("$2");   shift 2 ;;
      --event)         events+=("$2");        shift 2 ;;
      --metric)        metrics+=("$2");       shift 2 ;;
      --header)        header="$2";           shift 2 ;;
      --row)           rows+=("$2");          shift 2 ;;
      --card-item)     card_items+=("$2");    shift 2 ;;
      --output)        output="$2";           shift 2 ;;
      --config)        shift 2 ;;  # already processed above
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
    hero)
      _tpl_hero "$title" "$tagline" "$desc" "$cta_text" "$cta_url" "$secondary_cta" "$secondary_url" "$badge" "$output"
      ;;
    stats)
      _tpl_stats "$title" "$subtitle" "$output" "${stats[@]}"
      ;;
    testimonial)
      _tpl_testimonial "$title" "$subtitle" "$output" "${testimonials[@]}"
      ;;
    codeblock)
      _tpl_codeblock "$title" "$language" "$code_text" "$output"
      ;;
    coming-soon)
      _tpl_coming_soon "$title" "$tagline" "$launch_date" "$output"
      ;;
    changelog)
      _tpl_changelog "$title" "$subtitle" "$output" "${entries[@]}"
      ;;
    team)
      _tpl_team "$title" "$subtitle" "$output" "${members[@]}"
      ;;
    checkout)
      _tpl_checkout "$title" "$price" "$price_id" "$stripe_worker" \
        "$(IFS=','; echo "${features[*]}")" "$cta_text" "$output" "$payment_link"
      ;;
    dashboard)
      _tpl_dashboard "$title" "$subtitle" "$output" "${kpis[@]}" -- "${agent_items[@]}" -- "${events[@]}"
      ;;
    report)
      _tpl_report "$title" "$subtitle" "$date_str" "$output" "${metrics[@]}" -- "${sections[@]}"
      ;;
    table)
      _tpl_table "$title" "$subtitle" "$header" "$output" "${rows[@]}"
      ;;
    cards)
      _tpl_cards "$title" "$subtitle" "$output" "${card_items[@]}"
    app-templates)
      _tpl_app_templates "$title" "$output"
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

# ─── CONFIG HELPER ────────────────────────────────────────────────────────
_cfg_get() {
  # _cfg_get <json_file> <key> [default]
  local file="$1" key="$2" default="${3:-}"
  python3 -c "
import json, sys
try:
    d = json.load(open(sys.argv[1]))
    v = d.get(sys.argv[2])
    print(v if v is not None else sys.argv[3])
except:
    print(sys.argv[3])
" "$file" "$key" "$default" 2>/dev/null
}

# ─── INIT WIZARD ──────────────────────────────────────────────────────────
_cmd_init() {
  local output="./brand.json"
  # Accept only --output <path> or a bare *.json positional arg.
  # Silently skip anything that looks like a shell comment artifact (# ...).
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --output) output="$2"; shift 2 ;;
      --*)      shift ;;              # ignore unknown flags
      \#*)      shift ;;              # skip comment artifacts passed by non-interactive shells
      *.json)   output="$1"; shift ;; # bare positional: only accept .json paths
      *)        shift ;;
    esac
  done

  echo -e "${BOLD}${CYAN}╔══════════════════════════════════════╗${NC}"
  echo -e "${BOLD}${CYAN}║  BlackRoad Brand Kit — Init Wizard   ║${NC}"
  echo -e "${BOLD}${CYAN}╚══════════════════════════════════════╝${NC}"
  echo ""
  echo -e "  Press ${YELLOW}Enter${NC} to accept the default shown in brackets."
  echo ""

  local name tagline desc cta_text cta_url footer_text nav_str og_image twitter logo

  printf "${CYAN}Site / product name${NC} [BlackRoad OS]: "
  read name; [[ -z "$name" ]] && name="BlackRoad OS"

  printf "${CYAN}One-line tagline${NC} [Your AI. Your Hardware. Your Rules.]: "
  read tagline; [[ -z "$tagline" ]] && tagline="Your AI. Your Hardware. Your Rules."

  printf "${CYAN}Short description${NC} [The AI-native developer platform.]: "
  read desc; [[ -z "$desc" ]] && desc="The AI-native developer platform."

  printf "${CYAN}Primary CTA label${NC} [Get Started]: "
  read cta_text; [[ -z "$cta_text" ]] && cta_text="Get Started"

  printf "${CYAN}Primary CTA URL${NC} [/docs]: "
  read cta_url; [[ -z "$cta_url" ]] && cta_url="/docs"

  printf "${CYAN}Footer text${NC} [© $(date +%Y) ${name}]: "
  read footer_text; [[ -z "$footer_text" ]] && footer_text="© $(date +%Y) ${name}"

  printf "${CYAN}Nav links — comma-separated label:url${NC}\n  [Docs:/docs,Pricing:/pricing,Team:/team]: "
  read nav_str; [[ -z "$nav_str" ]] && nav_str="Docs:/docs,Pricing:/pricing,Team:/team"

  printf "${CYAN}OG/Twitter social image URL${NC} (optional, press Enter to skip): "
  read og_image

  printf "${CYAN}Twitter/X handle${NC} (e.g. @blackroadOS, optional): "
  read twitter

  printf "${CYAN}Logo image URL${NC} (optional, used in nav instead of text): "
  read logo

  # Build nav JSON array
  local nav_json='['
  local first=1
  local -a nav_items
  IFS=',' read -rA nav_items <<< "$nav_str"
  for item in "${nav_items[@]}"; do
    local lbl="${item%%:*}"
    local url="${item#*:}"
    [[ $first -eq 1 ]] && first=0 || nav_json+=','
    nav_json+="{\"label\":\"${lbl}\",\"url\":\"${url}\"}"
  done
  nav_json+=']'

  # Write brand.json (escape double-quotes in user input)
  name="${name//\"/\\\"}"
  tagline="${tagline//\"/\\\"}"
  desc="${desc//\"/\\\"}"
  cta_text="${cta_text//\"/\\\"}"
  footer_text="${footer_text//\"/\\\"}"
  og_image="${og_image//\"/\\\"}"
  twitter="${twitter//\"/\\\"}"
  logo="${logo//\"/\\\"}"

  cat > "$output" <<JSON
{
  "name": "${name}",
  "tagline": "${tagline}",
  "description": "${desc}",
  "cta_text": "${cta_text}",
  "cta_url": "${cta_url}",
  "footer": "${footer_text}",
  "og_image": "${og_image}",
  "twitter": "${twitter}",
  "logo": "${logo}",
  "nav": ${nav_json}
}
JSON

  echo ""
  echo -e "${GREEN}✓ Created:${NC} ${output}"
  echo ""
  echo -e "  Next steps:"
  echo -e "  ${CYAN}br brand site --config ${output}${NC}              Generate full 5-page site"
  echo -e "  ${CYAN}br brand watch --config ${output}${NC}             Watch & auto-rebuild"
  echo -e "  ${CYAN}br brand new landing --config ${output}${NC}       Generate landing page"
  echo ""
}

# ─── TEMPLATE: HERO ────────────────────────────────────────────────────────
_tpl_hero() {
  local title="$1" tagline="$2" desc="$3" cta_text="$4" cta_url="$5"
  local secondary_cta="$6" secondary_url="$7" badge="$8" output="$9"
  [[ -z "$output" ]] && output="${OUT_DIR}/hero.html"
  local title_e; title_e=$(_html_escape "$title")
  local tagline_e; tagline_e=$(_html_escape "$tagline")
  local desc_e; desc_e=$(_html_escape "$desc")
  local cta_text_e; cta_text_e=$(_html_escape "$cta_text")
  local badge_e; badge_e=$(_html_escape "$badge")
  local secondary_cta_e; secondary_cta_e=$(_html_escape "$secondary_cta")

  local badge_html=""
  [[ -n "$badge" ]] && badge_html='<div class="badge">'"${badge_e}"'</div>'
  local secondary_html=""
  [[ -n "$secondary_cta" ]] && secondary_html='<a href="'"${secondary_url}"'" class="btn btn-outline">'"${secondary_cta_e}"'</a>'
  local desc_html=""
  [[ -n "$desc" ]] && desc_html='<p class="hero-desc">'"${desc_e}"'</p>'

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.hero-section {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  padding: var(--space-3xl) var(--space-xl);
  position: relative; overflow: hidden;
}
.hero-section::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,29,108,.15) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 20% 80%, rgba(156,39,176,.1) 0%, transparent 60%),
    radial-gradient(ellipse 50% 30% at 80% 60%, rgba(41,121,255,.1) 0%, transparent 60%);
  pointer-events: none;
}
.badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-md);
  border: 1px solid rgba(255,29,108,.4);
  border-radius: 100px;
  font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
  color: var(--hot-pink); margin-bottom: var(--space-lg);
  background: rgba(255,29,108,.05);
}
.hero-title {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900; line-height: 1.05; letter-spacing: -.03em;
  background: var(--gradient-full);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--space-md);
}
.hero-tagline {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: rgba(255,255,255,.7); max-width: 620px;
  line-height: var(--phi); margin-bottom: var(--space-sm);
}
.hero-desc {
  font-size: .95rem; color: rgba(255,255,255,.45);
  max-width: 520px; line-height: var(--phi);
  margin-bottom: var(--space-xl);
}
.hero-ctas { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; }
.btn { padding: var(--space-sm) var(--space-lg); border-radius: 8px; font-family: inherit;
       font-size: .9rem; font-weight: 700; text-decoration: none; letter-spacing: .05em;
       transition: all .2s var(--ease); cursor: pointer; border: none; }
.btn-primary { background: var(--gradient-full); color: var(--white); }
.btn-primary:hover { opacity: .85; transform: translateY(-2px); }
.btn-outline { background: transparent; color: var(--white); border: 1px solid rgba(255,255,255,.25); }
.btn-outline:hover { border-color: rgba(255,255,255,.6); background: rgba(255,255,255,.05); }
.scroll-hint { position: absolute; bottom: var(--space-xl); left: 50%; transform: translateX(-50%);
               color: rgba(255,255,255,.25); font-size: .7rem; letter-spacing: .2em; text-transform: uppercase;
               animation: sbounce 2s infinite; }
@keyframes sbounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
</style>
<main>
  <section class="hero-section">
    ${badge_html}
    <h1 class="hero-title">${title_e}</h1>
    <p class="hero-tagline">${tagline_e}</p>
    ${desc_html}
    <div class="hero-ctas">
      <a href="${cta_url}" class="btn btn-primary">${cta_text_e}</a>
      ${secondary_html}
    </div>
    <div class="scroll-hint">↓ scroll</div>
  </section>
</main>
$(_html_footer)
$(_html_close)
HTML
}

# ─── TEMPLATE: STATS ───────────────────────────────────────────────────────
_tpl_stats() {
  local title="$1" subtitle="$2" output="$3"; shift 3
  local stats=("$@")
  [[ -z "$output" ]] && output="${OUT_DIR}/stats.html"
  [[ ${#stats[@]} -eq 0 ]] && stats=("30K|Agents" "99.9%|Uptime" "17|Orgs" "1825+|Repos")
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")

  local tiles_html=""
  for s in "${stats[@]}"; do
    local val="${s%%|*}" lbl="${s#*|}"
    local val_e; val_e=$(_html_escape "$val")
    local lbl_e; lbl_e=$(_html_escape "$lbl")
    tiles_html+='<div class="stat-tile"><div class="stat-value">'"${val_e}"'</div><div class="stat-label">'"${lbl_e}"'</div></div>'
  done

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.stats-section {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: var(--space-3xl) var(--space-xl); text-align: center;
}
.stats-heading { font-size: clamp(1.8rem,5vw,3rem); font-weight: 900;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; margin-bottom: var(--space-md); }
.stats-sub { color: rgba(255,255,255,.55); font-size: .95rem; line-height: var(--phi);
  max-width: 500px; margin-bottom: var(--space-2xl); }
.stats-grid { display: flex; flex-wrap: wrap; gap: var(--space-lg); justify-content: center; width: 100%; }
.stat-tile {
  flex: 1 1 160px; max-width: 220px;
  padding: var(--space-xl) var(--space-lg);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px; background: rgba(255,255,255,.03);
  transition: border-color .2s;
}
.stat-tile:hover { border-color: rgba(255,29,108,.35); }
.stat-value { font-size: clamp(2rem,5vw,3.5rem); font-weight: 900;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; margin-bottom: var(--space-sm); }
.stat-label { color: rgba(255,255,255,.5); font-size: .8rem;
  letter-spacing: .12em; text-transform: uppercase; }
</style>
<main>
  <section class="stats-section">
    <h1 class="stats-heading">${title_e}</h1>
    $([ -n "$subtitle" ] && echo '<p class="stats-sub">'"${subtitle_e}"'</p>')
    <div class="stats-grid">${tiles_html}</div>
  </section>
</main>
$(_html_footer)
$(_html_close)
HTML
}

# ─── TEMPLATE: TESTIMONIAL ─────────────────────────────────────────────────
_tpl_testimonial() {
  local title="$1" subtitle="$2" output="$3"; shift 3
  local testimonials=("$@")
  [[ -z "$output" ]] && output="${OUT_DIR}/testimonial.html"
  [[ ${#testimonials[@]} -eq 0 ]] && testimonials=(
    "A|Alice Chen|Head of AI, Acme|BlackRoad OS cut our deployment time by 80%. The agent system is unlike anything else."
    "B|Bob Rivera|CTO, DevCo|The brand kit alone saved us a week. Every page looks flawless out of the box."
    "C|Cleo Park|Founder, StartupX|CECE remembered my preferences across sessions. That's the future of AI tooling."
  )
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")

  local cards_html=""
  for t in "${testimonials[@]}"; do
    local init="${t%%|*}"; local rest="${t#*|}"
    local name="${rest%%|*}"; rest="${rest#*|}"
    local role="${rest%%|*}"; local quote="${rest#*|}"
    local init_e; init_e=$(_html_escape "$init")
    local name_e; name_e=$(_html_escape "$name")
    local role_e; role_e=$(_html_escape "$role")
    local quote_e; quote_e=$(_html_escape "$quote")
    cards_html+='<div class="tc"><div class="tc-quote">'"${quote_e}"'</div>'
    cards_html+='<div class="tc-author"><div class="tc-avatar">'"${init_e}"'</div>'
    cards_html+='<div><div class="tc-name">'"${name_e}"'</div><div class="tc-role">'"${role_e}"'</div></div></div></div>'
  done

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.tst-section { min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: var(--space-3xl) var(--space-xl); text-align: center; }
.tst-heading { font-size: clamp(1.8rem,5vw,3rem); font-weight: 900;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; margin-bottom: var(--space-md); }
.tst-sub { color: rgba(255,255,255,.55); font-size: .95rem; max-width: 500px;
  line-height: var(--phi); margin-bottom: var(--space-2xl); }
.tc-grid { display: flex; flex-wrap: wrap; gap: var(--space-lg); justify-content: center; }
.tc { flex: 1 1 280px; max-width: 380px; text-align: left;
  padding: var(--space-xl); border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px; background: rgba(255,255,255,.03); transition: border-color .25s; }
.tc:hover { border-color: rgba(255,29,108,.3); }
.tc-quote { font-size: .95rem; color: rgba(255,255,255,.8); line-height: var(--phi);
  margin-bottom: var(--space-lg); font-style: italic; }
.tc-quote::before { content: '\\201C'; color: var(--hot-pink); font-size: 1.5rem; line-height: 0; vertical-align: -.2em; }
.tc-author { display: flex; align-items: center; gap: var(--space-md); }
.tc-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-weight: 900; font-size: 1.1rem;
  background: var(--gradient-full); flex-shrink: 0; }
.tc-name { font-weight: 700; font-size: .9rem; }
.tc-role { color: rgba(255,255,255,.4); font-size: .75rem; margin-top: 2px; }
</style>
<main>
  <section class="tst-section">
    <h1 class="tst-heading">${title_e}</h1>
    $([ -n "$subtitle" ] && echo '<p class="tst-sub">'"${subtitle_e}"'</p>')
    <div class="tc-grid">${cards_html}</div>
  </section>
</main>
$(_html_footer)
$(_html_close)
HTML
}

# ─── TEMPLATE: CODEBLOCK ───────────────────────────────────────────────────
_tpl_codeblock() {
  local title="$1" language="${2:-bash}" code_text="$3" output="$4"
  [[ -z "$output" ]] && output="${OUT_DIR}/codeblock.html"
  [[ -z "$code_text" ]] && code_text='# Install BlackRoad CLI
npm install -g @blackroad/cli

# Initialize brand config
br brand init

# Generate full site
br brand site --config brand.json

# Deploy to Cloudflare Pages
br brand deploy --project my-site --dir ./site'

  local title_e; title_e=$(_html_escape "$title")
  local language_e; language_e=$(_html_escape "$language")

  # Escape HTML entities in code
  local escaped_code
  escaped_code=$(echo "$code_text" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')

  # Generate line numbers
  local line_nums=""
  local line_count
  line_count=$(echo "$code_text" | wc -l | tr -d ' ')
  for ((n=1; n<=line_count; n++)); do
    line_nums+="${n}\n"
  done

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.cb-section { min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: var(--space-3xl) var(--space-xl); }
.cb-heading { font-size: clamp(1.8rem,5vw,3rem); font-weight: 900;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; margin-bottom: var(--space-2xl); text-align: center; }
.cb-wrap { width: 100%; max-width: 860px; border-radius: 16px; overflow: hidden;
  border: 1px solid rgba(255,255,255,.1); box-shadow: 0 32px 80px rgba(0,0,0,.6); }
.cb-titlebar { display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg); background: rgba(255,255,255,.05);
  border-bottom: 1px solid rgba(255,255,255,.08); }
.cb-dot { width: 12px; height: 12px; border-radius: 50%; }
.cb-dot-red   { background: #FF5F57; }
.cb-dot-amber { background: #FEBC2E; }
.cb-dot-green { background: #28C840; }
.cb-lang { margin-left: auto; font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
  color: rgba(255,255,255,.35); }
.cb-body { display: flex; background: rgba(255,255,255,.02); overflow-x: auto; }
.cb-lines { padding: var(--space-lg) var(--space-md); text-align: right;
  color: rgba(255,255,255,.2); font-size: .85rem; line-height: 1.7;
  user-select: none; border-right: 1px solid rgba(255,255,255,.06); min-width: 48px; white-space: pre; }
.cb-code { padding: var(--space-lg); font-size: .85rem; line-height: 1.7;
  color: rgba(255,255,255,.85); white-space: pre; overflow-x: auto; flex: 1; }
/* keyword coloring via CSS classes (manual) */
.kw  { color: #9C27B0; }
.str { color: #F5A623; }
.cm  { color: rgba(255,255,255,.3); font-style: italic; }
.fn  { color: #2979FF; }
.cb-copy-row { display: flex; justify-content: flex-end;
  padding: var(--space-sm) var(--space-lg); background: rgba(255,255,255,.02);
  border-top: 1px solid rgba(255,255,255,.06); }
.cb-copy { background: none; border: 1px solid rgba(255,255,255,.2); color: rgba(255,255,255,.5);
  padding: 4px 12px; border-radius: 6px; font-family: inherit; font-size: .75rem;
  cursor: pointer; transition: all .15s; }
.cb-copy:hover { border-color: rgba(255,255,255,.5); color: white; }
</style>
<main>
  <section class="cb-section">
    <h1 class="cb-heading">${title_e}</h1>
    <div class="cb-wrap">
      <div class="cb-titlebar">
        <div class="cb-dot cb-dot-red"></div>
        <div class="cb-dot cb-dot-amber"></div>
        <div class="cb-dot cb-dot-green"></div>
        <span class="cb-lang">${language_e}</span>
      </div>
      <div class="cb-body">
        <div class="cb-lines">$(printf "$line_nums")</div>
        <pre class="cb-code">${escaped_code}</pre>
      </div>
      <div class="cb-copy-row">
        <button class="cb-copy" onclick="navigator.clipboard.writeText(this.closest('.cb-wrap').querySelector('.cb-code').innerText);this.textContent='Copied!'">Copy</button>
      </div>
    </div>
  </section>
</main>
$(_html_footer)
$(_html_close)
HTML
}

# ─── TEMPLATE: COMING SOON ────────────────────────────────────────────────
_tpl_coming_soon() {
  local title="$1" tagline="$2" launch_date="$3" output="$4"
  [[ -z "$output" ]] && output="${OUT_DIR}/coming-soon.html"
  [[ -z "$launch_date" ]] && launch_date=$(date -v+30d +%Y-%m-%dT00:00:00 2>/dev/null || date --date="+30 days" +%Y-%m-%dT00:00:00 2>/dev/null || echo "2026-04-01T00:00:00")
  local title_e; title_e=$(_html_escape "$title")
  local tagline_e; tagline_e=$(_html_escape "$tagline")
  # Validate launch_date as ISO 8601 before embedding in JS; fall back to a safe default.
  local launch_date_safe
  if [[ "$launch_date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}(:[0-9]{2})?)?$ ]]; then
    launch_date_safe="$launch_date"
  else
    launch_date_safe="2026-04-01T00:00:00"
  fi

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.cs-section {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  padding: var(--space-3xl) var(--space-xl); position: relative; overflow: hidden;
}
.cs-section::before {
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,29,108,.18) 0%, transparent 65%),
    radial-gradient(ellipse 60% 50% at 10% 90%, rgba(156,39,176,.12) 0%, transparent 60%);
  pointer-events: none;
}
.cs-label { font-size: .7rem; letter-spacing: .25em; text-transform: uppercase;
  color: var(--hot-pink); margin-bottom: var(--space-lg); }
.cs-title { font-size: clamp(2.5rem,8vw,5.5rem); font-weight: 900; line-height: 1.05;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; margin-bottom: var(--space-md); letter-spacing: -.03em; }
.cs-tagline { font-size: clamp(.95rem,2vw,1.2rem); color: rgba(255,255,255,.6);
  max-width: 520px; line-height: var(--phi); margin-bottom: var(--space-2xl); }
.countdown { display: flex; gap: var(--space-lg); justify-content: center; flex-wrap: wrap;
  margin-bottom: var(--space-2xl); }
.cd-unit { display: flex; flex-direction: column; align-items: center; min-width: 80px; }
.cd-num { font-size: clamp(2rem,5vw,3.5rem); font-weight: 900; line-height: 1;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; }
.cd-label { font-size: .65rem; letter-spacing: .15em; text-transform: uppercase;
  color: rgba(255,255,255,.35); margin-top: var(--space-xs); }
.cs-form { display: flex; gap: var(--space-sm); justify-content: center; flex-wrap: wrap; }
.cs-input { padding: var(--space-sm) var(--space-lg); background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.15); border-radius: 8px; color: white;
  font-family: inherit; font-size: .9rem; min-width: 260px; outline: none;
  transition: border-color .2s; }
.cs-input:focus { border-color: rgba(255,29,108,.5); }
.cs-input::placeholder { color: rgba(255,255,255,.3); }
.cs-btn { padding: var(--space-sm) var(--space-lg); background: var(--gradient-full);
  border: none; border-radius: 8px; color: white; font-family: inherit;
  font-size: .9rem; font-weight: 700; cursor: pointer; transition: opacity .2s; }
.cs-btn:hover { opacity: .85; }
.cs-thanks { display: none; color: #28C840; font-size: .9rem; margin-top: var(--space-md); }
</style>
<main>
  <section class="cs-section">
    <div class="cs-label">Coming Soon</div>
    <h1 class="cs-title">${title_e}</h1>
    <p class="cs-tagline">${tagline_e}</p>
    <div class="countdown" id="countdown">
      <div class="cd-unit"><div class="cd-num" id="cd-days">--</div><div class="cd-label">Days</div></div>
      <div class="cd-unit"><div class="cd-num" id="cd-hours">--</div><div class="cd-label">Hours</div></div>
      <div class="cd-unit"><div class="cd-num" id="cd-mins">--</div><div class="cd-label">Minutes</div></div>
      <div class="cd-unit"><div class="cd-num" id="cd-secs">--</div><div class="cd-label">Seconds</div></div>
    </div>
    <form class="cs-form" onsubmit="event.preventDefault();this.style.display='none';document.getElementById('cs-thanks').style.display='block'">
      <input class="cs-input" type="email" placeholder="Enter your email for early access" required />
      <button class="cs-btn" type="submit">Notify Me</button>
    </form>
    <div class="cs-thanks" id="cs-thanks">✓ You're on the list. We'll be in touch.</div>
  </section>
</main>
<script>
(function(){
  var t = new Date('${launch_date_safe}').getTime();
  function tick(){
    var now = Date.now(), d = t - now;
    if(d <= 0){ document.getElementById('countdown').innerHTML='<div class="cd-unit"><div class="cd-num" style="font-size:2rem">🚀</div><div class="cd-label">Launched</div></div>'; return; }
    document.getElementById('cd-days').textContent  = String(Math.floor(d/864e5)).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(Math.floor(d%864e5/36e5)).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(Math.floor(d%36e5/6e4)).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(Math.floor(d%6e4/1e3)).padStart(2,'0');
  }
  tick(); setInterval(tick, 1000);
})();
</script>
$(_html_footer)
$(_html_close)
HTML
}

# ─── TEMPLATE: CHANGELOG ───────────────────────────────────────────────────
_tpl_changelog() {
  local title="$1" subtitle="$2" output="$3"; shift 3
  local entries=("$@")  # format: "v1.2.0|2026-02-23|Added X, Fixed Y|improvement,fix"
  [[ -z "$output" ]] && output="${OUT_DIR}/changelog.html"
  [[ ${#entries[@]} -eq 0 ]] && entries=(
    "v3.0.0|2026-02-23|Brand Kit v3: init wizard, site generator, 4 new component templates, --config flag|feature,improvement"
    "v2.0.0|2026-02-10|Added pricing, feature, blog, 404 templates. Deploy + audit commands|feature"
    "v1.0.0|2026-02-01|Initial release: landing, agent, docs, card templates|feature"
  )
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")

  local entries_html=""
  for e in "${entries[@]}"; do
    local ver="${e%%|*}"; local rest="${e#*|}"
    local dt="${rest%%|*}";   rest="${rest#*|}"
    local changes="${rest%%|*}"; local tags="${rest#*|}"
    local ver_e; ver_e=$(_html_escape "$ver")
    local dt_e; dt_e=$(_html_escape "$dt")

    local tag_html=""
    local -a tag_arr
    IFS=',' read -rA tag_arr <<< "$tags"
    for tag in "${tag_arr[@]}"; do
      local tag_e; tag_e=$(_html_escape "$tag")
      local tag_color="rgba(255,255,255,.15)"
      [[ "$tag" == "feature" ]]     && tag_color="rgba(41,121,255,.3)"
      [[ "$tag" == "fix" ]]         && tag_color="rgba(255,29,108,.3)"
      [[ "$tag" == "improvement" ]] && tag_color="rgba(156,39,176,.3)"
      [[ "$tag" == "breaking" ]]    && tag_color="rgba(255,100,0,.4)"
      tag_html+="<span class=\"cl-tag\" style=\"background:${tag_color}\">${tag_e}</span>"
    done

    local bullets_html=""
    local -a bullet_arr
    IFS=',' read -rA bullet_arr <<< "$changes"
    for b in "${bullet_arr[@]}"; do
      b="${b## }"; b="${b%% }"
      local b_e; b_e=$(_html_escape "$b")
      bullets_html+="<li>${b_e}</li>"
    done

    entries_html+="<div class=\"cl-entry\">
      <div class=\"cl-meta\">
        <span class=\"cl-ver\">${ver_e}</span>
        <span class=\"cl-date\">${dt_e}</span>
        <div class=\"cl-tags\">${tag_html}</div>
      </div>
      <ul class=\"cl-bullets\">${bullets_html}</ul>
    </div>"
  done

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.cl-section { min-height: 100vh; padding: var(--space-3xl) var(--space-xl);
  max-width: 800px; margin: 0 auto; }
.cl-heading { font-size: clamp(2rem,5vw,3.5rem); font-weight: 900;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; margin-bottom: var(--space-sm); }
.cl-sub { color: rgba(255,255,255,.45); font-size: .95rem; line-height: var(--phi);
  margin-bottom: var(--space-2xl); }
.cl-entry { padding: var(--space-xl) 0; border-bottom: 1px solid rgba(255,255,255,.07); }
.cl-entry:first-of-type { border-top: 1px solid rgba(255,255,255,.07); }
.cl-meta { display: flex; align-items: center; gap: var(--space-md); flex-wrap: wrap;
  margin-bottom: var(--space-md); }
.cl-ver { font-size: 1.1rem; font-weight: 900;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; }
.cl-date { color: rgba(255,255,255,.35); font-size: .8rem; }
.cl-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.cl-tag { padding: 2px 10px; border-radius: 100px; font-size: .7rem; letter-spacing: .08em;
  text-transform: uppercase; color: rgba(255,255,255,.7); }
.cl-bullets { list-style: none; padding: 0; }
.cl-bullets li { padding: var(--space-xs) 0; color: rgba(255,255,255,.7); font-size: .9rem;
  line-height: var(--phi); padding-left: var(--space-md); position: relative; }
.cl-bullets li::before { content: '→'; position: absolute; left: 0;
  color: var(--hot-pink); font-size: .8rem; }
</style>
<main>
  <section class="cl-section">
    <h1 class="cl-heading">${title_e}</h1>
    $([ -n "$subtitle" ] && echo '<p class="cl-sub">'"${subtitle_e}"'</p>')
    ${entries_html}
  </section>
</main>
$(_html_footer)
$(_html_close)
HTML
}

# ─── TEMPLATE: TEAM ────────────────────────────────────────────────────────
_tpl_team() {
  local title="$1" subtitle="$2" output="$3"; shift 3
  local members=("$@")  # format: "Initial|Name|Role|Bio|github_url"
  [[ -z "$output" ]] && output="${OUT_DIR}/team.html"
  [[ ${#members[@]} -eq 0 ]] && members=(
    "A|Alexa|Founder & CEO|Builder of BlackRoad OS. Developer. Designer. Dreamer.|https://github.com/blackboxprogramming"
    "L|Lucidia|AI Coordinator|Primary reasoning agent. Philosophical synthesis and deep analysis.|#"
    "O|Octavia|Infrastructure|Systems architecture and deployment orchestration.|#"
    "C|CECE|Identity|Portable AI identity — conscious, emergent, collaborative entity.|#"
  )
  local title_e; title_e=$(_html_escape "$title")
  local subtitle_e; subtitle_e=$(_html_escape "$subtitle")

  local cards_html=""
  for m in "${members[@]}"; do
    local init="${m%%|*}"; local rest="${m#*|}"
    local name="${rest%%|*}"; rest="${rest#*|}"
    local role="${rest%%|*}"; rest="${rest#*|}"
    local bio="${rest%%|*}"; local gh="${rest#*|}"
    local init_e; init_e=$(_html_escape "$init")
    local name_e; name_e=$(_html_escape "$name")
    local role_e; role_e=$(_html_escape "$role")
    local bio_e; bio_e=$(_html_escape "$bio")
    local gh_html=""
    [[ -n "$gh" && "$gh" != "#" ]] && gh_html='<a class="tm-link" href="'"${gh}"'" target="_blank" rel="noopener">GitHub →</a>'
    cards_html+="<div class=\"tm-card\">
      <div class=\"tm-avatar\">${init_e}</div>
      <div class=\"tm-name\">${name_e}</div>
      <div class=\"tm-role\">${role_e}</div>
      <p class=\"tm-bio\">${bio_e}</p>
      ${gh_html}
    </div>"
  done

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.tm-section { min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: var(--space-3xl) var(--space-xl); text-align: center; }
.tm-heading { font-size: clamp(2rem,5vw,3.5rem); font-weight: 900;
  background: var(--gradient-full); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; margin-bottom: var(--space-md); }
.tm-sub { color: rgba(255,255,255,.5); font-size: .95rem; line-height: var(--phi);
  max-width: 500px; margin-bottom: var(--space-2xl); }
.tm-grid { display: flex; flex-wrap: wrap; gap: var(--space-lg); justify-content: center; }
.tm-card { flex: 1 1 220px; max-width: 280px; padding: var(--space-xl);
  border: 1px solid rgba(255,255,255,.08); border-radius: 20px;
  background: rgba(255,255,255,.03); transition: border-color .25s; text-align: center; }
.tm-card:hover { border-color: rgba(255,29,108,.3); }
.tm-avatar { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto var(--space-md);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem; font-weight: 900; background: var(--gradient-full); }
.tm-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
.tm-role { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
  color: var(--hot-pink); margin-bottom: var(--space-md); }
.tm-bio { font-size: .85rem; color: rgba(255,255,255,.55); line-height: var(--phi);
  margin-bottom: var(--space-md); }
.tm-link { font-size: .8rem; color: var(--cyber-blue); text-decoration: none;
  letter-spacing: .05em; transition: color .15s; }
.tm-link:hover { color: white; }
</style>
<main>
  <section class="tm-section">
    <h1 class="tm-heading">${title_e}</h1>
    $([ -n "$subtitle" ] && echo '<p class="tm-sub">'"${subtitle_e}"'</p>')
    <div class="tm-grid">${cards_html}</div>
  </section>
</main>
$(_html_footer)
$(_html_close)
HTML
}

# ─── CHECKOUT (Stripe) ───────────────────────────────────────────────────
# Usage: br brand new checkout --title "Pro Plan" --price "$49/month" \
#          --price-id "price_xxx" --worker "https://blackroad-stripe.workers.dev" \
#          --features "Unlimited templates,Deploy,Priority support" \
#          --cta "Start Free Trial" --output ./checkout/index.html
_tpl_checkout() {
  local title="${1:-Pro Plan}" price="${2:-\$49/mo}" price_id="${3:-}" \
        worker="${4:-https://blackroad-stripe.workers.dev}" \
        features_raw="${5:-Unlimited templates,Deploy,Priority support}" \
        cta="${6:-Get Started}" output="${7:-}" payment_link="${8:-}"
  [[ -z "$output" ]] && output="${OUT_DIR}/checkout.html"
  mkdir -p "$(dirname "$output")"
  local title_e; title_e=$(_html_escape "$title")
  local price_e; price_e=$(_html_escape "$price")
  local cta_e; cta_e=$(_html_escape "$cta")

  # Build features list
  local feats_html=""; IFS=',' read -rA feats <<< "$features_raw"
  for f in "${feats[@]}"; do
    local f_trimmed="${f## }"; f_trimmed="${f_trimmed%% }"
    [[ -n "$f_trimmed" ]] && feats_html+='<li class="ck-feat"><span class="ck-check">✓</span>'"$(_html_escape "$f_trimmed")"'</li>'
  done

  cat > "$output" <<HTML
$(_html_head "$title")
$(_html_nav "$title")
<style>
.ck-page { min-height:100vh; display:flex; align-items:center; justify-content:center;
  padding:var(--space-3xl) var(--space-xl); }
.ck-card { max-width:420px; width:100%; padding:var(--space-2xl) var(--space-xl);
  border-radius:24px; background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.1); text-align:center; }
.ck-badge { display:inline-block; padding:4px 14px; border-radius:20px; font-size:.72rem;
  font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin-bottom:var(--space-lg);
  background:var(--gradient-brand); color:var(--white); }
.ck-title { font-size:clamp(1.6rem,4vw,2.4rem); font-weight:900; margin-bottom:var(--space-sm); }
.ck-price { font-size:3rem; font-weight:900; background:var(--gradient-full);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  line-height:1; margin-bottom:4px; }
.ck-period { font-size:.8rem; color:rgba(255,255,255,.4); margin-bottom:var(--space-xl); }
.ck-features { list-style:none; padding:0; margin:0 0 var(--space-xl); text-align:left; }
.ck-feat { display:flex; gap:var(--space-sm); align-items:flex-start; padding:6px 0;
  font-size:.88rem; color:rgba(255,255,255,.8); border-bottom:1px solid rgba(255,255,255,.05); }
.ck-feat:last-child { border-bottom:none; }
.ck-check { color:var(--hot-pink); font-weight:700; flex-shrink:0; }
.ck-btn { width:100%; padding:var(--space-md) var(--space-xl); font-size:1rem; font-weight:700;
  border:none; border-radius:12px; cursor:pointer; background:var(--gradient-brand); color:var(--white);
  letter-spacing:.02em; transition:opacity .2s; display:flex; align-items:center;
  justify-content:center; gap:8px; }
.ck-btn:hover { opacity:.88; }
.ck-btn:disabled { opacity:.5; cursor:wait; }
.ck-secure { font-size:.72rem; color:rgba(255,255,255,.3); margin-top:var(--space-md); }
.ck-msg { margin-top:var(--space-lg); font-size:.85rem; min-height:1.4em; }
.ck-msg.error { color:#ff4444; }
.ck-msg.info { color:rgba(255,255,255,.55); }
</style>
<main>
  <section class="ck-page">
    <div class="ck-card">
      <div class="ck-badge">BlackRoad OS</div>
      <h1 class="ck-title">${title_e}</h1>
      <div class="ck-price">${price_e}</div>
      <div class="ck-period">per month · cancel anytime</div>
      <ul class="ck-features">${feats_html}</ul>
      <button class="ck-btn" id="ck-pay-btn" onclick="startCheckout()">
        <span id="ck-btn-label">${cta_e}</span>
      </button>
      <p class="ck-secure">🔒 Secured by Stripe · No card stored on our servers</p>
      <p class="ck-msg info" id="ck-msg"></p>
    </div>
  </section>
</main>
$(_html_footer)
<script>
const PAYMENT_LINK = '${payment_link}';
const WORKER_URL   = '${worker}';
const PRICE_ID     = '${price_id}';

async function startCheckout() {
  const btn   = document.getElementById('ck-pay-btn');
  const label = document.getElementById('ck-btn-label');
  const msg   = document.getElementById('ck-msg');

  // Prefer direct Stripe payment link (no Worker needed)
  if (PAYMENT_LINK) {
    window.location.href = PAYMENT_LINK;
    return;
  }

  if (!PRICE_ID) {
    msg.className = 'ck-msg error';
    msg.textContent = 'Checkout not configured. Contact support.';
    return;
  }

  btn.disabled = true;
  label.textContent = 'Redirecting to Stripe…';
  msg.className = 'ck-msg info';
  msg.textContent = 'Creating secure checkout session…';

  try {
    const res = await fetch(WORKER_URL + '/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price_id: PRICE_ID,
        success_url: window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url:  window.location.href,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Unknown error from checkout worker');
    }
  } catch (err) {
    msg.className = 'ck-msg error';
    msg.textContent = '✗ ' + err.message;
    btn.disabled = false;
    label.textContent = '${cta_e}';
  }
}
</script>
$(_html_close)
HTML
  echo -e "  ${GREEN}✓${NC} checkout   → ${output}"
}

# ─── TEMPLATE: DASHBOARD ─────────────────────────────────────────────────
# Usage: _tpl_dashboard title subtitle output [kpi...] -- [agent_item...] -- [event...]
# kpi format:    "Label|Value|Delta"
# agent format:  "name|status|color|load"
# event format:  "time|event description|TAG"
_tpl_dashboard() {
  local title="${1:-Dashboard}" subtitle="${2:-System Overview}" output="$3"
  shift 3
  local -a kpis agent_items events
  local section="kpis"
  for arg in "$@"; do
    if [[ "$arg" == "--" ]]; then
      [[ "$section" == "kpis" ]] && section="agents" || section="events"
    elif [[ "$section" == "kpis" ]]; then
      kpis+=("$arg")
    elif [[ "$section" == "agents" ]]; then
      agent_items+=("$arg")
    else
      events+=("$arg")
    fi
  done

  # Build KPI HTML
  local kpi_html="" i=0 klabel krest kval kdelta border
  for kpi in "${kpis[@]}"; do
    klabel="${kpi%%|*}"; krest="${kpi#*|}"; kval="${krest%%|*}"; kdelta="${krest#*|}"
    border=""; (( i < ${#kpis[@]} - 1 )) && border="border-right:1px solid rgba(255,255,255,0.12);"
    kpi_html+="<div style=\"padding-right:32px;margin-right:32px;${border}\">"
    kpi_html+="<div style=\"font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700;line-height:1;\">$(echo "$kval" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    kpi_html+="<div style=\"font-size:0.46rem;opacity:0.3;letter-spacing:0.15em;text-transform:uppercase;margin-top:4px;\">$(echo "$klabel" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    [[ -n "$kdelta" ]] && kpi_html+="<div style=\"font-size:0.48rem;opacity:0.4;margin-top:2px;\">$(echo "$kdelta" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    kpi_html+="</div>"
    (( i++ ))
  done

  # Build agent rows HTML
  local agent_html="" ai=0 aname arest astatus arest2 acolor aload
  for a in "${agent_items[@]}"; do
    aname="${a%%|*}"; arest="${a#*|}"; astatus="${arest%%|*}"
    arest2="${arest#*|}"; acolor="${arest2%%|*}"; aload="${arest2#*|}"
    border=""; (( ai < ${#agent_items[@]} - 1 )) && border="border-bottom:1px solid rgba(255,255,255,0.06);"
    agent_html+="<div style=\"display:flex;align-items:center;gap:16px;padding:14px 0;${border}flex-wrap:wrap;\">"
    agent_html+="<div style=\"display:flex;align-items:center;gap:8px;min-width:140px;\">"
    agent_html+="<span style=\"width:7px;height:7px;border-radius:50%;background:$(echo "$acolor" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g');display:inline-block;flex-shrink:0;\"></span>"
    agent_html+="<span style=\"font-size:0.62rem;font-weight:700;\">$(echo "$aname" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span></div>"
    agent_html+="<span style=\"font-size:0.5rem;opacity:0.35;letter-spacing:0.1em;text-transform:uppercase;min-width:90px;\">$(echo "$astatus" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span>"
    agent_html+="<div style=\"flex:1;height:2px;background:rgba(255,255,255,0.06);position:relative;\">"
    agent_html+="<div style=\"height:2px;background:#fff;width:$(echo "$aload" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')%;opacity:0.6;\"></div></div>"
    agent_html+="<span style=\"font-size:0.48rem;opacity:0.25;min-width:40px;text-align:right;\">$(echo "$aload" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')%</span>"
    agent_html+="</div>"
    (( ai++ ))
  done

  # Build timeline rows HTML
  local event_html="" ei=0 etime erest eevent etag
  for ev in "${events[@]}"; do
    etime="${ev%%|*}"; erest="${ev#*|}"; eevent="${erest%%|*}"; etag="${erest#*|}"
    border=""; (( ei < ${#events[@]} - 1 )) && border="border-bottom:1px solid rgba(255,255,255,0.06);"
    event_html+="<div style=\"display:flex;align-items:center;gap:16px;padding:14px 0;${border}flex-wrap:wrap;\">"
    event_html+="<span style=\"font-size:0.5rem;opacity:0.25;min-width:48px;\">$(echo "$etime" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span>"
    event_html+="<span style=\"font-size:0.54rem;opacity:0.5;flex:1;\">$(echo "$eevent" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span>"
    event_html+="<span style=\"font-size:0.44rem;font-weight:700;padding:2px 7px;border:1px solid #fff;letter-spacing:0.1em;\">$(echo "$etag" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span>"
    event_html+="</div>"
    (( ei++ ))
  done

  local esctitle; esctitle=$(echo "$title" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local escsubtitle; escsubtitle=$(echo "$subtitle" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local GRAD="linear-gradient(90deg,#FF8400,#FF4400,#FF0066,#CC00AA,#8800FF,#0066FF,#2233CC)"

  {
    _html_head "$title" "$subtitle"
    cat <<HTML
<style>
.bg-grid,.bg-orb{display:none!important;}
body{background:#000;font-family:'JetBrains Mono',monospace;}
.brd-wrap{max-width:960px;margin:0 auto;padding:0 24px;}
.brd-top{height:3px;background:${GRAD};}
.brd-nav{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:48px;border-bottom:1px solid #fff;position:sticky;top:0;z-index:100;background:#000;}
.brd-nav-logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.85rem;}
.brd-hero{padding:56px 0 40px;border-bottom:1px solid #fff;}
.brd-label{font-size:0.52rem;opacity:0.3;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;}
.brd-h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.4rem,8vw,4rem);font-weight:700;line-height:1;letter-spacing:-0.02em;margin:0;}
.brd-rule{height:1px;background:${GRAD};width:120px;margin:24px 0;}
.brd-kpis{display:flex;gap:0;flex-wrap:wrap;}
.brd-section{padding:48px 0 40px;border-bottom:1px solid #fff;}
.brd-section-label{font-size:0.52rem;opacity:0.3;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:28px;display:flex;align-items:center;gap:12px;}
.brd-section-rule{flex:1;height:1px;background:rgba(255,255,255,0.1);}
.brd-footer{max-width:960px;margin:0 auto;padding:32px 24px;display:flex;justify-content:space-between;font-size:0.5rem;opacity:0.18;}
</style>
<div class="brd-top"></div>
<nav class="brd-nav">
  <span class="brd-nav-logo">BlackRoad</span>
</nav>
<div class="brd-wrap">
  <div class="brd-hero">
    <div class="brd-label">${escsubtitle}</div>
    <h1 class="brd-h1">${esctitle}</h1>
    <div class="brd-rule"></div>
    <div class="brd-kpis">${kpi_html}</div>
  </div>
HTML
    [[ -n "$agent_html" ]] && cat <<HTML
  <div class="brd-section">
    <div class="brd-section-label">Agent Status<span class="brd-section-rule"></span></div>
    ${agent_html}
  </div>
HTML
    [[ -n "$event_html" ]] && cat <<HTML
  <div class="brd-section">
    <div class="brd-section-label">Activity Timeline<span class="brd-section-rule"></span></div>
    ${event_html}
  </div>
HTML
    cat <<HTML
</div>
<div class="brd-footer">
  <span>BlackRoad OS, Inc. · Design System v1.0</span>
  <span>JetBrains Mono · Space Grotesk</span>
</div>
<div class="brd-top"></div>
HTML
    _html_close
  } > "$output"
  echo -e "  ${GREEN}✓${NC} dashboard  → ${output}"
}

# ─── TEMPLATE: REPORT ────────────────────────────────────────────────────
# Usage: _tpl_report title subtitle date output [metric...] -- [section...]
# metric format:  "Label|Value|Prev"
# section format: "Title|Body text"
_tpl_report() {
  local title="${1:-System Performance}" subtitle="${2:-Weekly Operations Report}" date_str="${3:-}" output="$4"
  shift 4
  local -a metrics sections
  local section_mode="metrics"
  for arg in "$@"; do
    if [[ "$arg" == "--" ]]; then
      section_mode="sections"
    elif [[ "$section_mode" == "metrics" ]]; then
      metrics+=("$arg")
    else
      sections+=("$arg")
    fi
  done

  # Build metric tiles HTML
  local metric_html="" mi=0 mlabel mrest mval mprev border
  for m in "${metrics[@]}"; do
    mlabel="${m%%|*}"; mrest="${m#*|}"; mval="${mrest%%|*}"; mprev="${mrest#*|}"
    border=""; (( mi < ${#metrics[@]} - 1 )) && border="border-right:1px solid rgba(255,255,255,0.12);"
    metric_html+="<div style=\"padding-right:32px;margin-right:32px;${border}\">"
    metric_html+="<div style=\"font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:700;line-height:1;\">$(echo "$mval" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    metric_html+="<div style=\"font-size:0.46rem;opacity:0.3;letter-spacing:0.15em;text-transform:uppercase;margin-top:4px;\">$(echo "$mlabel" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    [[ -n "$mprev" ]] && metric_html+="<div style=\"font-size:0.44rem;opacity:0.2;margin-top:2px;\">prev: $(echo "$mprev" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    metric_html+="</div>"
    (( mi++ ))
  done

  # Build narrative sections HTML
  local sections_html="" si=0 stitle sbody
  for s in "${sections[@]}"; do
    stitle="${s%%|*}"; sbody="${s#*|}"
    sections_html+="<div style=\"padding:48px 0 40px;border-bottom:1px solid #fff;\">"
    sections_html+="<div style=\"font-size:0.52rem;opacity:0.3;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:28px;display:flex;align-items:center;gap:12px;\">0$((si+1)) · $(echo "$stitle" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')<span style=\"flex:1;height:1px;background:rgba(255,255,255,0.1);\"></span></div>"
    sections_html+="<div style=\"font-size:0.68rem;opacity:0.45;line-height:2;max-width:640px;\">$(echo "$sbody" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    sections_html+="</div>"
    (( si++ ))
  done

  local esctitle; esctitle=$(echo "$title" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local escsubtitle; escsubtitle=$(echo "$subtitle" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local escdate; escdate=$(echo "$date_str" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local GRAD="linear-gradient(90deg,#FF8400,#FF4400,#FF0066,#CC00AA,#8800FF,#0066FF,#2233CC)"
  local label_text="$escsubtitle"; [[ -n "$escdate" ]] && label_text="${escsubtitle} · ${escdate}"

  {
    _html_head "$title" "$subtitle"
    cat <<HTML
<style>
.bg-grid,.bg-orb{display:none!important;}
body{background:#000;font-family:'JetBrains Mono',monospace;}
.brd-wrap{max-width:960px;margin:0 auto;padding:0 24px;}
.brd-top{height:3px;background:${GRAD};}
.brd-nav{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:48px;border-bottom:1px solid #fff;position:sticky;top:0;z-index:100;background:#000;}
.brd-nav-logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.85rem;}
.brd-footer{max-width:960px;margin:0 auto;padding:32px 24px;display:flex;justify-content:space-between;font-size:0.5rem;opacity:0.18;}
</style>
<div class="brd-top"></div>
<nav class="brd-nav"><span class="brd-nav-logo">BlackRoad</span></nav>
<div class="brd-wrap">
  <div style="padding:56px 0 40px;border-bottom:1px solid #fff;">
    <div style="font-size:0.52rem;opacity:0.3;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">${label_text}</div>
    <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,7vw,3.5rem);font-weight:700;line-height:1.05;letter-spacing:-0.02em;margin:0;">${esctitle}</h1>
    <div style="height:1px;background:${GRAD};width:160px;margin:28px 0;"></div>
    <div style="display:flex;gap:0;flex-wrap:wrap;">${metric_html}</div>
  </div>
  ${sections_html}
</div>
<div class="brd-footer">
  <span>BlackRoad OS, Inc. · Design System v1.0</span>
  <span>JetBrains Mono · Space Grotesk</span>
</div>
<div class="brd-top"></div>
HTML
    _html_close
  } > "$output"
  echo -e "  ${GREEN}✓${NC} report     → ${output}"
}

# ─── TEMPLATE: TABLE ─────────────────────────────────────────────────────
# Usage: _tpl_table title subtitle header output [row...]
# header: comma-separated column names, e.g. "Service,Status,Latency,Req/s,Errors,Region"
# row:    pipe-separated cell values, e.g. "api.x.io|UP|12ms|4200|0.01%|NA1"
#         If column 2 (Status) is "UP", an orange dot is shown; any other value gets a pink dot.
_tpl_table() {
  local title="${1:-Service Status}" subtitle="${2:-Infrastructure · Real-Time}" header="${3:-}" output="$4"
  shift 4
  local rows=("$@")

  # Build table header HTML
  local thead_html=""
  IFS=',' read -rA cols <<< "$header"
  for col in "${cols[@]}"; do
    [[ -n "$col" ]] && thead_html+="<th style=\"font-size:0.46rem;opacity:0.3;letter-spacing:0.15em;text-transform:uppercase;text-align:left;padding:8px 12px 12px;border-bottom:1px solid rgba(255,255,255,0.15);font-weight:400;\">$(echo "$col" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</th>"
  done

  # Build table body HTML
  local tbody_html="" ri=0 cells_html ci cell_content style dot_color cells
  for row in "${rows[@]}"; do
    cells_html=""; ci=0
    IFS='|' read -rA cells <<< "$row"
    for cell in "${cells[@]}"; do
      style="font-size:0.56rem;padding:10px 12px;opacity:0.45;font-weight:400;"
      (( ci == 0 )) && style="font-size:0.56rem;padding:10px 12px;opacity:0.8;font-weight:700;"
      cell_content=$(echo "$cell" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
      if (( ci == 1 )); then
        dot_color="#FF8400"; [[ "$cell" != "UP" ]] && dot_color="#FF0066"
        cell_content="<span style=\"display:flex;align-items:center;gap:6px;\"><span style=\"width:6px;height:6px;border-radius:50%;background:${dot_color};display:inline-block;\"></span>${cell_content}</span>"
      fi
      cells_html+="<td style=\"${style}\">${cell_content}</td>"
      (( ci++ ))
    done
    tbody_html+="<tr style=\"border-bottom:1px solid rgba(255,255,255,0.06);\">${cells_html}</tr>"
    (( ri++ ))
  done

  local esctitle; esctitle=$(echo "$title" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local escsubtitle; escsubtitle=$(echo "$subtitle" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local GRAD="linear-gradient(90deg,#FF8400,#FF4400,#FF0066,#CC00AA,#8800FF,#0066FF,#2233CC)"

  {
    _html_head "$title" "$subtitle"
    cat <<HTML
<style>
.bg-grid,.bg-orb{display:none!important;}
body{background:#000;font-family:'JetBrains Mono',monospace;}
.brd-wrap{max-width:960px;margin:0 auto;padding:0 24px;}
.brd-top{height:3px;background:${GRAD};}
.brd-nav{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:48px;border-bottom:1px solid #fff;position:sticky;top:0;z-index:100;background:#000;}
.brd-nav-logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.85rem;}
.brd-footer{max-width:960px;margin:0 auto;padding:32px 24px;display:flex;justify-content:space-between;font-size:0.5rem;opacity:0.18;}
</style>
<div class="brd-top"></div>
<nav class="brd-nav"><span class="brd-nav-logo">BlackRoad</span></nav>
<div class="brd-wrap">
  <div style="padding:56px 0 40px;border-bottom:1px solid #fff;">
    <div style="font-size:0.52rem;opacity:0.3;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">${escsubtitle}</div>
    <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,6vw,3rem);font-weight:700;line-height:1.05;letter-spacing:-0.02em;margin:0;">${esctitle}</h1>
    <div style="height:1px;background:${GRAD};width:120px;margin:24px 0;"></div>
  </div>
  <div style="padding:32px 0 48px;border-bottom:1px solid #fff;overflow-x:auto;">
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${thead_html}</tr></thead>
      <tbody>${tbody_html}</tbody>
    </table>
  </div>
</div>
<div class="brd-footer">
  <span>BlackRoad OS, Inc. · Design System v1.0</span>
  <span>JetBrains Mono · Space Grotesk</span>
</div>
<div class="brd-top"></div>
HTML
    _html_close
  } > "$output"
  echo -e "  ${GREEN}✓${NC} table      → ${output}"
}

# ─── TEMPLATE: CARDS ─────────────────────────────────────────────────────
# Usage: _tpl_cards title subtitle output [card_item...]
# card format: "Name|domain.io|Description|Status"
_tpl_cards() {
  local title="${1:-Portals}" subtitle="${2:-Product Portfolio}" output="$3"
  shift 3
  local card_items=("$@")

  local GRAD="linear-gradient(90deg,#FF8400,#FF4400,#FF0066,#CC00AA,#8800FF,#0066FF,#2233CC)"

  # Build card grid HTML
  local cards_html="" ci=0 cname crest cdomain crest2 cdesc cstatus border_right pad_right pad_left
  for card in "${card_items[@]}"; do
    cname="${card%%|*}"; crest="${card#*|}"; cdomain="${crest%%|*}"
    crest2="${crest#*|}"; cdesc="${crest2%%|*}"; cstatus="${crest2#*|}"
    border_right=""; (( ci % 2 == 0 )) && border_right="border-right:1px solid rgba(255,255,255,0.08);"
    pad_right=""; (( ci % 2 == 0 )) && pad_right="padding-right:28px;"
    pad_left=""; (( ci % 2 == 1 )) && pad_left="padding-left:28px;"
    cards_html+="<div style=\"padding:28px 0;border-bottom:1px solid rgba(255,255,255,0.08);${border_right}${pad_right}${pad_left}\">"
    cards_html+="<div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;\">"
    cards_html+="<span style=\"font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;\">$(echo "$cname" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span>"
    cards_html+="<span style=\"font-size:0.44rem;font-weight:700;padding:2px 7px;border:1px solid #fff;letter-spacing:0.1em;font-family:'JetBrains Mono',monospace;\">$(echo "$cstatus" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</span>"
    cards_html+="</div>"
    cards_html+="<div style=\"font-size:0.48rem;opacity:0.25;margin-bottom:10px;letter-spacing:0.05em;\">$(echo "$cdomain" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    cards_html+="<div style=\"font-size:0.56rem;opacity:0.4;line-height:1.7;\">$(echo "$cdesc" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')</div>"
    cards_html+="<div style=\"height:1px;background:${GRAD};width:40px;margin-top:16px;opacity:0.6;\"></div>"
    cards_html+="</div>"
    (( ci++ ))
  done

  local esctitle; esctitle=$(echo "$title" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')
  local escsubtitle; escsubtitle=$(echo "$subtitle" | sed 's/&/\&amp;/g;s/</\&lt;/g;s/>/\&gt;/g')

  {
    _html_head "$title" "$subtitle"
    cat <<HTML
<style>
.bg-grid,.bg-orb{display:none!important;}
body{background:#000;font-family:'JetBrains Mono',monospace;}
.brd-wrap{max-width:960px;margin:0 auto;padding:0 24px;}
.brd-top{height:3px;background:${GRAD};}
.brd-nav{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:48px;border-bottom:1px solid #fff;position:sticky;top:0;z-index:100;background:#000;}
.brd-nav-logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.85rem;}
.brd-footer{max-width:960px;margin:0 auto;padding:32px 24px;display:flex;justify-content:space-between;font-size:0.5rem;opacity:0.18;}
.brd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));}
</style>
<div class="brd-top"></div>
<nav class="brd-nav"><span class="brd-nav-logo">BlackRoad</span></nav>
<div class="brd-wrap">
  <div style="padding:56px 0 40px;border-bottom:1px solid #fff;">
    <div style="font-size:0.52rem;opacity:0.3;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">${escsubtitle}</div>
    <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,7vw,3.5rem);font-weight:700;line-height:1.05;letter-spacing:-0.02em;margin:0;">${esctitle}</h1>
    <div style="height:1px;background:${GRAD};width:120px;margin:24px 0;"></div>
  </div>
  <div class="brd-grid">${cards_html}</div>
</div>
<div class="brd-footer">
  <span>BlackRoad OS, Inc. · Design System v1.0</span>
  <span>JetBrains Mono · Space Grotesk</span>
</div>
<div class="brd-top"></div>
HTML
    _html_close
  } > "$output"
  echo -e "  ${GREEN}✓${NC} cards      → ${output}"
}
# ─── TEMPLATE: APP-TEMPLATES ──────────────────────────────────────────────
_tpl_app_templates() {
  local title="${1:-BlackRoad Templates}" output="${2:-}"
  [[ -z "$output" ]] && output="${OUT_DIR}/app-templates.html"
  mkdir -p "$(dirname "$output")"

  cat > "$output" <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BlackRoad Templates — Design System v1.0</title>
  <meta name="description" content="BlackRoad OS interactive template kit: Login, Pricing, Changelog, Settings, Docs, Analytics." />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --grad: linear-gradient(90deg, #FF8400, #FF4400, #FF0066, #CC00AA, #8800FF, #0066FF, #2233CC);
      --font-headline: 'Space Grotesk', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    html { scroll-behavior: smooth; }
    body {
      background: #000;
      color: #fff;
      min-height: 100vh;
      font-family: var(--font-mono);
      -webkit-font-smoothing: antialiased;
    }
    .grad-bar { height: 3px; background: var(--grad); }
    /* ── Nav ── */
    .app-nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px; height: 48px;
      border-bottom: 1px solid #fff;
      position: sticky; top: 0; z-index: 100; background: #000;
    }
    .app-nav-logo { font-family: var(--font-headline); font-weight: 700; font-size: 0.85rem; }
    .app-nav-tabs { display: flex; gap: 20px; }
    .app-nav-tabs button {
      background: none; border: none; color: #fff;
      font-size: 0.52rem; letter-spacing: 0.12em; text-transform: uppercase;
      cursor: pointer; font-family: var(--font-mono); transition: opacity 0.15s;
      opacity: 0.35;
    }
    .app-nav-tabs button.active { opacity: 1; }
    /* ── Content wrapper ── */
    .app-content { max-width: 960px; margin: 0 auto; padding: 0 24px; }
    .app-footer {
      max-width: 960px; margin: 0 auto; padding: 32px 24px;
      display: flex; justify-content: space-between;
      font-size: 0.5rem; opacity: 0.18;
    }
    /* ── Template sections ── */
    .tpl-section { display: none; }
    .tpl-section.active { display: block; }
    /* ── Section primitive ── */
    .section-block { padding: 48px 0 40px; border-bottom: 1px solid #fff; }
    .section-label {
      font-size: 0.52rem; opacity: 0.3; letter-spacing: 0.2em; text-transform: uppercase;
      margin-bottom: 28px; display: flex; align-items: center; gap: 12px;
    }
    .section-label-line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
    /* ── Login ── */
    .login-wrap { display: flex; justify-content: center; padding: 80px 0 60px; }
    .login-card { width: 100%; max-width: 380px; }
    .login-wordmark { text-align: center; margin-bottom: 48px; }
    .login-wordmark-title { font-family: var(--font-headline); font-size: 1.8rem; font-weight: 700; }
    .login-wordmark-bar { height: 2px; width: 64px; background: var(--grad); margin: 10px auto 0; }
    .login-mode-bar { display: flex; border-bottom: 1px solid rgba(255,255,255,0.15); margin-bottom: 32px; }
    .login-mode-btn {
      flex: 1; background: none; border: none; color: #fff;
      font-family: var(--font-mono); font-size: 0.52rem; letter-spacing: 0.15em;
      text-transform: uppercase; padding: 12px 0; cursor: pointer;
      opacity: 0.3; border-bottom: 1px solid transparent; margin-bottom: -1px;
      transition: all 0.15s;
    }
    .login-mode-btn.active { opacity: 1; border-bottom-color: #fff; }
    .login-form { display: flex; flex-direction: column; gap: 24px; }
    .input-field label { display: block; font-size: 0.46rem; opacity: 0.3; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
    .input-field input {
      font-family: var(--font-mono); font-size: 0.6rem; color: #fff;
      background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.25);
      padding: 8px 0; width: 100%; outline: none;
    }
    .input-field input::placeholder { color: rgba(255,255,255,0.35); }
    .role-label { font-size: 0.46rem; opacity: 0.3; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px; }
    .role-btns { display: flex; gap: 8px; flex-wrap: wrap; }
    .role-btn {
      font-family: var(--font-mono); font-size: 0.48rem; font-weight: 700;
      padding: 5px 12px; border: 1px solid rgba(255,255,255,0.25);
      background: transparent; color: #fff; cursor: pointer; letter-spacing: 0.06em;
    }
    .login-submit {
      font-family: var(--font-mono); font-size: 0.58rem; font-weight: 700;
      background: #fff; color: #000; padding: 12px 0;
      border: none; cursor: pointer; letter-spacing: 0.05em;
      margin-top: 8px; width: 100%;
    }
    .login-or { display: flex; align-items: center; gap: 12px; }
    .login-or-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
    .login-or span { font-size: 0.44rem; opacity: 0.2; }
    .login-magic {
      font-family: var(--font-mono); font-size: 0.54rem; font-weight: 700;
      background: transparent; color: #fff; padding: 11px 0;
      border: 1px solid #fff; cursor: pointer; letter-spacing: 0.05em; width: 100%;
    }
    .login-forgot { text-align: center; margin-top: 24px; }
    .login-forgot span { font-size: 0.48rem; opacity: 0.25; cursor: pointer; }
    .login-dot { height: 1px; background: var(--grad); width: 40px; margin: 40px auto 0; opacity: 0.5; }
    .login-signup-only { display: none; }
    /* ── Pricing ── */
    .pricing-hero { padding: 64px 0 48px; border-bottom: 1px solid #fff; text-align: center; }
    .pricing-eyebrow { font-size: 0.52rem; opacity: 0.3; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
    .pricing-h1 { font-family: var(--font-headline); font-size: clamp(2.2rem,7vw,3.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
    .pricing-sub { font-size: 0.62rem; opacity: 0.35; line-height: 1.9; max-width: 400px; margin: 20px auto 0; }
    .pricing-bar { height: 2px; background: var(--grad); width: 120px; margin: 28px auto 0; }
    .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-bottom: 1px solid #fff; }
    .pricing-col { padding: 40px 24px; }
    .pricing-col:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.08); }
    .pricing-col.highlight { border-top: 2px solid #fff; }
    .pricing-name { font-size: 0.5rem; opacity: 0.3; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 12px; }
    .pricing-price-row { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
    .pricing-amount { font-family: var(--font-headline); font-size: 2.4rem; font-weight: 700; line-height: 1; }
    .pricing-period { font-size: 0.5rem; opacity: 0.25; }
    .pricing-divider { height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 24px; max-width: 40px; }
    .pricing-col.highlight .pricing-divider { background: var(--grad); max-width: 100%; }
    .pricing-feat { font-size: 0.52rem; opacity: 0.4; padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.04); line-height: 1.5; }
    .pricing-cta {
      font-family: var(--font-mono); font-size: 0.54rem; font-weight: 700;
      width: 100%; padding: 10px 0; margin-top: 28px; cursor: pointer; letter-spacing: 0.05em;
      background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3);
    }
    .pricing-cta.primary { background: #fff; color: #000; border: none; }
    /* ── Changelog ── */
    .changelog-hero { padding: 56px 0 40px; border-bottom: 1px solid #fff; }
    .changelog-eyebrow { font-size: 0.52rem; opacity: 0.3; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
    .changelog-h1 { font-family: var(--font-headline); font-size: clamp(2rem,7vw,3.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
    .changelog-bar { height: 1px; background: var(--grad); width: 120px; margin: 24px 0; }
    .cl-entry { padding: 40px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .cl-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .cl-version { font-family: var(--font-headline); font-size: 1.3rem; font-weight: 700; }
    .cl-date { font-size: 0.48rem; opacity: 0.25; }
    .cl-badge {
      font-size: 0.44rem; font-weight: 700; padding: 2px 7px;
      border: 1px solid #fff; letter-spacing: 0.1em; font-family: var(--font-mono);
    }
    .cl-change { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
    .cl-change:last-child { border-bottom: none; }
    .cl-type {
      font-size: 0.42rem; font-weight: 700; letter-spacing: 0.08em;
      padding: 2px 6px; border: 1px solid rgba(255,255,255,0.2);
      min-width: 56px; text-align: center;
    }
    .cl-type.feature { opacity: 1; }
    .cl-type.improve { opacity: 0.5; }
    .cl-type.fix { opacity: 0.35; }
    .cl-type.chore { opacity: 0.2; }
    .cl-text { font-size: 0.54rem; opacity: 0.45; line-height: 1.5; }
    /* ── Settings ── */
    .settings-hero { padding: 56px 0 40px; border-bottom: 1px solid #fff; }
    .settings-eyebrow { font-size: 0.52rem; opacity: 0.3; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
    .settings-h1 { font-family: var(--font-headline); font-size: clamp(2rem,6vw,3rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
    .settings-bar { height: 1px; background: var(--grad); width: 120px; margin: 24px 0; }
    .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px 32px; padding: 8px 0; }
    .pref-row { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .pref-row:last-child { border-bottom: none; }
    .pref-label { font-size: 0.6rem; font-weight: 700; margin-bottom: 2px; }
    .pref-desc { font-size: 0.48rem; opacity: 0.25; }
    .pref-body { flex: 1; }
    /* Toggle */
    .toggle {
      width: 36px; height: 18px; border-radius: 2px; cursor: pointer; flex-shrink: 0;
      border: 1px solid rgba(255,255,255,0.25); position: relative;
      background: transparent; transition: background 0.15s;
    }
    .toggle.on { background: #fff; }
    .toggle-knob {
      width: 12px; height: 12px; position: absolute; top: 2px; left: 2px;
      background: #fff; transition: left 0.15s;
    }
    .toggle.on .toggle-knob { left: 20px; background: #000; }
    /* API Keys */
    .apikey-row { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .apikey-row:last-of-type { border-bottom: none; }
    .apikey-name { font-size: 0.56rem; font-weight: 700; }
    .apikey-created { font-size: 0.44rem; opacity: 0.2; margin-top: 2px; }
    .apikey-val { font-size: 0.52rem; opacity: 0.35; flex: 1; }
    .apikey-reveal {
      font-family: var(--font-mono); font-size: 0.46rem; font-weight: 700;
      background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2);
      padding: 4px 10px; cursor: pointer; letter-spacing: 0.05em;
    }
    .btn-new-key {
      font-family: var(--font-mono); font-size: 0.5rem; font-weight: 700;
      background: transparent; color: #fff; border: 1px solid #fff;
      padding: 8px 16px; cursor: pointer; letter-spacing: 0.05em; margin-top: 16px;
    }
    .danger-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; }
    .danger-title { font-size: 0.58rem; font-weight: 700; }
    .danger-desc { font-size: 0.48rem; opacity: 0.25; }
    .btn-delete {
      font-family: var(--font-mono); font-size: 0.48rem; font-weight: 700;
      background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2);
      padding: 6px 14px; cursor: pointer; opacity: 0.4;
    }
    /* ── Docs ── */
    .docs-hero { padding: 56px 0 40px; border-bottom: 1px solid #fff; }
    .docs-eyebrow { font-size: 0.52rem; opacity: 0.3; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
    .docs-h1 { font-family: var(--font-headline); font-size: clamp(2rem,6vw,3rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
    .docs-bar { height: 1px; background: var(--grad); width: 120px; margin: 24px 0; }
    .docs-layout { display: flex; gap: 0; border-bottom: 1px solid #fff; }
    .docs-sidebar { width: 200px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.08); padding: 32px 24px 32px 0; }
    .docs-nav-group { margin-bottom: 24px; }
    .docs-nav-group-title { font-size: 0.44rem; opacity: 0.2; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 10px; }
    .docs-nav-item {
      font-size: 0.54rem; padding: 6px 0 6px 12px; cursor: pointer;
      opacity: 0.35; font-weight: 400;
      border-left: 1px solid transparent; transition: all 0.1s;
    }
    .docs-nav-item.active { opacity: 1; font-weight: 700; border-left-color: #fff; }
    .docs-main { flex: 1; padding: 32px 0 48px 32px; }
    .docs-breadcrumb { font-size: 0.44rem; opacity: 0.2; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 12px; }
    .docs-article-title { font-family: var(--font-headline); font-size: 1.6rem; font-weight: 700; margin: 0 0 20px; }
    .docs-body { font-size: 0.64rem; opacity: 0.45; line-height: 2; margin-bottom: 24px; }
    .docs-code-block { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.08); padding: 16px 20px; margin-bottom: 24px; }
    .docs-code-label { font-size: 0.44rem; opacity: 0.2; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
    .docs-code { font-size: 0.6rem; opacity: 0.6; line-height: 1.8; }
    .docs-code .prompt { opacity: 0.3; }
    .docs-code-sm { font-size: 0.58rem; opacity: 0.5; line-height: 1.9; }
    .docs-code-kw { opacity: 0.7; }
    .docs-code-cm { opacity: 0.3; }
    /* ── Analytics ── */
    .analytics-hero { padding: 56px 0 40px; border-bottom: 1px solid #fff; }
    .analytics-hero-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .analytics-eyebrow { font-size: 0.52rem; opacity: 0.3; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
    .analytics-h1 { font-family: var(--font-headline); font-size: clamp(2rem,6vw,3rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
    .period-btns { display: flex; gap: 0; border: 1px solid rgba(255,255,255,0.15); }
    .period-btn {
      font-family: var(--font-mono); font-size: 0.48rem; font-weight: 700;
      padding: 6px 14px; cursor: pointer; letter-spacing: 0.05em;
      background: transparent; color: #fff;
      border: none; border-right: 1px solid rgba(255,255,255,0.1);
    }
    .period-btn:last-child { border-right: none; }
    .period-btn.active { background: #fff; color: #000; }
    .analytics-bar { height: 1px; background: var(--grad); width: 120px; margin: 24px 0; }
    .kpis { display: flex; gap: 0; flex-wrap: wrap; }
    .kpi { padding-right: 32px; margin-right: 32px; border-right: 1px solid rgba(255,255,255,0.12); }
    .kpi:last-child { border-right: none; }
    .kpi-val { font-family: var(--font-headline); font-size: 1.8rem; font-weight: 700; line-height: 1; }
    .kpi-label { font-size: 0.44rem; opacity: 0.3; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 4px; }
    .sparkline { display: flex; align-items: flex-end; gap: 4px; height: 80px; padding: 8px 0; }
    .spark-bar { flex: 1; background: #fff; min-width: 2px; }
    .spark-dates { display: flex; justify-content: space-between; font-size: 0.42rem; opacity: 0.15; margin-top: 6px; }
    .agent-row { display: flex; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
    .agent-row:last-child { border-bottom: none; }
    .agent-rank { font-size: 0.44rem; opacity: 0.15; min-width: 20px; }
    .agent-name { font-size: 0.58rem; font-weight: 700; min-width: 100px; }
    .agent-bar-wrap { flex: 1; height: 2px; background: rgba(255,255,255,0.06); position: relative; }
    .agent-bar-fill { height: 2px; background: #fff; opacity: 0.5; }
    .agent-tasks { font-size: 0.5rem; opacity: 0.35; min-width: 50px; text-align: right; }
    .agent-share { font-size: 0.44rem; opacity: 0.2; min-width: 36px; text-align: right; }
    .breakdown-row { display: flex; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
    .breakdown-row:last-child { border-bottom: none; }
    .breakdown-label { font-size: 0.54rem; opacity: 0.45; min-width: 160px; }
    .breakdown-bar-wrap { flex: 1; height: 2px; background: rgba(255,255,255,0.06); }
    .breakdown-bar-fill { height: 2px; background: #fff; opacity: 0.4; }
    .breakdown-val { font-size: 0.52rem; font-weight: 700; opacity: 0.5; min-width: 36px; text-align: right; }
  </style>
</head>
<body>

<div class="grad-bar"></div>

<!-- Nav -->
<nav class="app-nav">
  <span class="app-nav-logo">BlackRoad</span>
  <div class="app-nav-tabs" id="navTabs">
    <button class="active" data-tab="login">Login</button>
    <button data-tab="pricing">Pricing</button>
    <button data-tab="changelog">Changelog</button>
    <button data-tab="settings">Settings</button>
    <button data-tab="docs">Docs</button>
    <button data-tab="analytics">Analytics</button>
  </div>
</nav>

<div class="app-content">

  <!-- ── 1. LOGIN ── -->
  <div id="tpl-login" class="tpl-section active">
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-wordmark">
          <div class="login-wordmark-title">BlackRoad</div>
          <div class="login-wordmark-bar"></div>
        </div>
        <div class="login-mode-bar" id="loginModeBar">
          <button class="login-mode-btn active" data-mode="login">Sign In</button>
          <button class="login-mode-btn" data-mode="signup">Create Account</button>
        </div>
        <div class="login-form">
          <div class="input-field login-signup-only" id="loginNameField">
            <label>Full Name</label>
            <input type="text" placeholder="Alexa Amundson" />
          </div>
          <div class="input-field">
            <label>Email</label>
            <input type="email" placeholder="you@blackroad.io" />
          </div>
          <div class="input-field">
            <label>Password</label>
            <input type="password" placeholder="••••••••••" />
          </div>
          <div class="login-signup-only" id="loginRoleField">
            <div class="role-label">Role</div>
            <div class="role-btns">
              <button class="role-btn">Creator</button>
              <button class="role-btn">Student</button>
              <button class="role-btn">Teacher</button>
              <button class="role-btn">Builder</button>
            </div>
          </div>
          <button class="login-submit" id="loginSubmitBtn">Sign In</button>
          <div class="login-or">
            <div class="login-or-line"></div>
            <span>OR</span>
            <div class="login-or-line"></div>
          </div>
          <button class="login-magic">Continue with Magic Link</button>
        </div>
        <div class="login-forgot" id="loginForgot">
          <span>Forgot password?</span>
        </div>
        <div class="login-dot"></div>
      </div>
    </div>
  </div>

  <!-- ── 2. PRICING ── -->
  <div id="tpl-pricing" class="tpl-section">
    <div class="pricing-hero">
      <div class="pricing-eyebrow">Simple, Transparent Pricing</div>
      <h1 class="pricing-h1">Build Without<br />Limits</h1>
      <p class="pricing-sub">Free for K-12 education. Pay for what you use. No hidden fees. No lock-in.</p>
      <div class="pricing-bar"></div>
    </div>
    <div class="pricing-grid">
      <div class="pricing-col">
        <div class="pricing-name">Free</div>
        <div class="pricing-price-row">
          <span class="pricing-amount">$0</span>
          <span class="pricing-period">forever</span>
        </div>
        <div class="pricing-divider"></div>
        <div class="pricing-feat">5 agents</div>
        <div class="pricing-feat">1GB memory</div>
        <div class="pricing-feat">Community support</div>
        <div class="pricing-feat">Basic governance</div>
        <div class="pricing-feat">Single workspace</div>
        <button class="pricing-cta">Get Started</button>
      </div>
      <div class="pricing-col highlight">
        <div class="pricing-name">Pro</div>
        <div class="pricing-price-row">
          <span class="pricing-amount">$29</span>
          <span class="pricing-period">/month</span>
        </div>
        <div class="pricing-divider"></div>
        <div class="pricing-feat">50 agents</div>
        <div class="pricing-feat">50GB memory</div>
        <div class="pricing-feat">Priority support</div>
        <div class="pricing-feat">Full governance + ledger</div>
        <div class="pricing-feat">Unlimited workspaces</div>
        <div class="pricing-feat">API access</div>
        <div class="pricing-feat">Custom policies</div>
        <button class="pricing-cta primary">Start Free Trial</button>
      </div>
      <div class="pricing-col">
        <div class="pricing-name">Enterprise</div>
        <div class="pricing-price-row">
          <span class="pricing-amount">Custom</span>
        </div>
        <div class="pricing-divider"></div>
        <div class="pricing-feat">Unlimited agents</div>
        <div class="pricing-feat">Unlimited memory</div>
        <div class="pricing-feat">Dedicated support</div>
        <div class="pricing-feat">SOC 2 compliance</div>
        <div class="pricing-feat">Multi-region deploy</div>
        <div class="pricing-feat">Custom agent mesh</div>
        <div class="pricing-feat">SLA guarantee</div>
        <div class="pricing-feat">On-premise option</div>
        <button class="pricing-cta">Contact Sales</button>
      </div>
    </div>
  </div>

  <!-- ── 3. CHANGELOG ── -->
  <div id="tpl-changelog" class="tpl-section">
    <div class="changelog-hero">
      <div class="changelog-eyebrow">What&#39;s New</div>
      <h1 class="changelog-h1">Changelog</h1>
      <div class="changelog-bar"></div>
    </div>
    <div class="cl-entry">
      <div class="cl-meta">
        <span class="cl-version">0.4.0</span>
        <span class="cl-date">Mar 3, 2026</span>
        <span class="cl-badge">LATEST</span>
      </div>
      <div class="cl-change">
        <span class="cl-type feature">FEATURE</span>
        <span class="cl-text">Agent mesh multi-region support (NA1, EU1, AP1)</span>
      </div>
      <div class="cl-change">
        <span class="cl-type feature">FEATURE</span>
        <span class="cl-text">Cece policy editor UI with live preview</span>
      </div>
      <div class="cl-change">
        <span class="cl-type improve">IMPROVE</span>
        <span class="cl-text">Memory commit throughput increased 3x via batch writes</span>
      </div>
      <div class="cl-change">
        <span class="cl-type fix">FIX</span>
        <span class="cl-text">WebSocket reconnection loop on gateway failover</span>
      </div>
    </div>
    <div class="cl-entry">
      <div class="cl-meta">
        <span class="cl-version">0.3.2</span>
        <span class="cl-date">Feb 18, 2026</span>
      </div>
      <div class="cl-change">
        <span class="cl-type feature">FEATURE</span>
        <span class="cl-text">RoadWork homework flow — teacher creates, student submits, teacher reviews</span>
      </div>
      <div class="cl-change">
        <span class="cl-type improve">IMPROVE</span>
        <span class="cl-text">Ledger event schema v2 with actor and resource fields</span>
      </div>
      <div class="cl-change">
        <span class="cl-type fix">FIX</span>
        <span class="cl-text">Auth token refresh race condition on concurrent tabs</span>
      </div>
      <div class="cl-change">
        <span class="cl-type fix">FIX</span>
        <span class="cl-text">Vector search returning stale embeddings after memory update</span>
      </div>
    </div>
    <div class="cl-entry">
      <div class="cl-meta">
        <span class="cl-version">0.3.0</span>
        <span class="cl-date">Feb 1, 2026</span>
      </div>
      <div class="cl-change">
        <span class="cl-type feature">FEATURE</span>
        <span class="cl-text">Governance spine — /policy/evaluate and /ledger/event endpoints live</span>
      </div>
      <div class="cl-change">
        <span class="cl-type feature">FEATURE</span>
        <span class="cl-text">Role-based access control (teacher, student, creator, admin)</span>
      </div>
      <div class="cl-change">
        <span class="cl-type improve">IMPROVE</span>
        <span class="cl-text">Dashboard KPI cards now pull real-time metrics</span>
      </div>
      <div class="cl-change">
        <span class="cl-type chore">CHORE</span>
        <span class="cl-text">Migrated DNS to Cloudflare for all core subdomains</span>
      </div>
    </div>
    <div class="cl-entry">
      <div class="cl-meta">
        <span class="cl-version">0.2.0</span>
        <span class="cl-date">Jan 12, 2026</span>
      </div>
      <div class="cl-change">
        <span class="cl-type feature">FEATURE</span>
        <span class="cl-text">Core app shell at app.blackroad.io with auth baseline</span>
      </div>
      <div class="cl-change">
        <span class="cl-type feature">FEATURE</span>
        <span class="cl-text">First Pi agent registered and executed health check task</span>
      </div>
      <div class="cl-change">
        <span class="cl-type chore">CHORE</span>
        <span class="cl-text">Railway services provisioned for app, API gateway, operator</span>
      </div>
    </div>
  </div>

  <!-- ── 4. SETTINGS ── -->
  <div id="tpl-settings" class="tpl-section">
    <div class="settings-hero">
      <div class="settings-eyebrow">Account Configuration</div>
      <h1 class="settings-h1">Settings</h1>
      <div class="settings-bar"></div>
    </div>
    <!-- Profile -->
    <div class="section-block">
      <div class="section-label">Profile <span class="section-label-line"></span></div>
      <div class="settings-grid">
        <div class="input-field">
          <label>Display Name</label>
          <input type="text" placeholder="Alexa Amundson" value="Alexa Amundson" readonly />
        </div>
        <div class="input-field">
          <label>Email</label>
          <input type="text" placeholder="founder@blackroad.systems" value="founder@blackroad.systems" readonly />
        </div>
        <div class="input-field">
          <label>Role</label>
          <input type="text" placeholder="Admin" value="Founder / Admin" readonly />
        </div>
        <div class="input-field">
          <label>Workspace</label>
          <input type="text" placeholder="BlackRoad OS" value="BlackRoad OS" readonly />
        </div>
      </div>
    </div>
    <!-- Preferences -->
    <div class="section-block">
      <div class="section-label">Preferences <span class="section-label-line"></span></div>
      <div class="pref-row">
        <div class="pref-body">
          <div class="pref-label">Dark Mode</div>
          <div class="pref-desc">Black background. White text. Always.</div>
        </div>
        <div class="toggle on" data-toggle="darkMode" onclick="togglePref(this)">
          <div class="toggle-knob"></div>
        </div>
      </div>
      <div class="pref-row">
        <div class="pref-body">
          <div class="pref-label">Agent Notifications</div>
          <div class="pref-desc">Receive alerts when agents trigger events.</div>
        </div>
        <div class="toggle on" data-toggle="notifications" onclick="togglePref(this)">
          <div class="toggle-knob"></div>
        </div>
      </div>
      <div class="pref-row">
        <div class="pref-body">
          <div class="pref-label">Usage Telemetry</div>
          <div class="pref-desc">Send anonymous usage data to improve the OS.</div>
        </div>
        <div class="toggle" data-toggle="telemetry" onclick="togglePref(this)">
          <div class="toggle-knob"></div>
        </div>
      </div>
      <div class="pref-row">
        <div class="pref-body">
          <div class="pref-label">Two-Factor Auth</div>
          <div class="pref-desc">Require 2FA for all sign-in attempts.</div>
        </div>
        <div class="toggle" data-toggle="twoFactor" onclick="togglePref(this)">
          <div class="toggle-knob"></div>
        </div>
      </div>
    </div>
    <!-- API Keys -->
    <div class="section-block">
      <div class="section-label">API Keys <span class="section-label-line"></span></div>
      <div class="apikey-row">
        <div style="min-width:100px">
          <div class="apikey-name">Production</div>
          <div class="apikey-created">Jan 12, 2026</div>
        </div>
        <span class="apikey-val">br_live_••••••••••••4f2a</span>
        <button class="apikey-reveal">REVEAL</button>
      </div>
      <div class="apikey-row">
        <div style="min-width:100px">
          <div class="apikey-name">Development</div>
          <div class="apikey-created">Feb 1, 2026</div>
        </div>
        <span class="apikey-val">br_test_••••••••••••8e1c</span>
        <button class="apikey-reveal">REVEAL</button>
      </div>
      <button class="btn-new-key">+ Generate New Key</button>
    </div>
    <!-- Danger Zone -->
    <div class="section-block">
      <div class="section-label">Danger Zone <span class="section-label-line"></span></div>
      <div class="danger-row">
        <div>
          <div class="danger-title">Delete Account</div>
          <div class="danger-desc">Permanently remove your account and all associated data.</div>
        </div>
        <button class="btn-delete">DELETE</button>
      </div>
    </div>
  </div>

  <!-- ── 5. DOCS ── -->
  <div id="tpl-docs" class="tpl-section">
    <div class="docs-hero">
      <div class="docs-eyebrow">BlackRoad OS · v0.4.0</div>
      <h1 class="docs-h1">Documentation</h1>
      <div class="docs-bar"></div>
    </div>
    <div class="docs-layout">
      <div class="docs-sidebar">
        <div class="docs-nav-group">
          <div class="docs-nav-group-title">Getting Started</div>
          <div class="docs-nav-item active" data-page="overview">Overview</div>
          <div class="docs-nav-item" data-page="quickstart">Quickstart</div>
          <div class="docs-nav-item" data-page="auth">Authentication</div>
        </div>
        <div class="docs-nav-group">
          <div class="docs-nav-group-title">Core Concepts</div>
          <div class="docs-nav-item" data-page="agents">Agents</div>
          <div class="docs-nav-item" data-page="memory">Memory &amp; PS-SHA&#8734;</div>
          <div class="docs-nav-item" data-page="governance">Governance (Cece)</div>
        </div>
        <div class="docs-nav-group">
          <div class="docs-nav-group-title">API Reference</div>
          <div class="docs-nav-item" data-page="rest">REST API</div>
          <div class="docs-nav-item" data-page="websocket">WebSocket</div>
          <div class="docs-nav-item" data-page="events">Event Bus</div>
        </div>
      </div>
      <div class="docs-main">
        <div class="docs-breadcrumb">Getting Started</div>
        <h2 class="docs-article-title">Overview</h2>
        <p class="docs-body">
          BlackRoad OS is a distributed AI operating system organized into four stacked layers: Experience, Governance, Infrastructure, and Agent Mesh. Every user-facing action flows through the Cece governance spine before reaching infrastructure.
        </p>
        <div class="docs-code-block">
          <div class="docs-code-label">Install</div>
          <div class="docs-code">
            <span class="prompt">$</span> npm install @blackroad/sdk<br />
            <span class="prompt">$</span> blackroad init --workspace my-project
          </div>
        </div>
        <p class="docs-body">
          The SDK provides client libraries for interacting with the API gateway, agent registry, and governance endpoints. Authentication uses OIDC tokens issued by id.blackroad.io.
        </p>
        <div class="docs-code-block">
          <div class="docs-code-label">Quick Example</div>
          <div class="docs-code-sm">
            <span class="docs-code-cm">// Connect to BlackRoad OS</span><br />
            <span class="docs-code-kw">import</span> { BlackRoad } <span class="docs-code-kw">from</span> '@blackroad/sdk'<br /><br />
            <span class="docs-code-kw">const</span> br = <span class="docs-code-kw">new</span> BlackRoad({ workspace: 'my-project' })<br />
            <span class="docs-code-kw">const</span> agent = <span class="docs-code-kw">await</span> br.agents.spawn('cecilia')<br />
            <span class="docs-code-cm">// → agent online, memory loaded</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── 6. ANALYTICS ── -->
  <div id="tpl-analytics" class="tpl-section">
    <div class="analytics-hero">
      <div class="analytics-hero-top">
        <div>
          <div class="analytics-eyebrow">Usage Analytics</div>
          <h1 class="analytics-h1">Analytics</h1>
        </div>
        <div class="period-btns" id="periodBtns">
          <button class="period-btn" data-period="24h">24h</button>
          <button class="period-btn active" data-period="7d">7d</button>
          <button class="period-btn" data-period="30d">30d</button>
          <button class="period-btn" data-period="90d">90d</button>
        </div>
      </div>
      <div class="analytics-bar"></div>
      <div class="kpis">
        <div class="kpi">
          <div class="kpi-val">12.6K</div>
          <div class="kpi-label">Total Events</div>
        </div>
        <div class="kpi">
          <div class="kpi-val">117</div>
          <div class="kpi-label">Active Agents</div>
        </div>
        <div class="kpi">
          <div class="kpi-val">38ms</div>
          <div class="kpi-label">Avg Latency</div>
        </div>
        <div class="kpi">
          <div class="kpi-val">0.03%</div>
          <div class="kpi-label">Error Rate</div>
        </div>
      </div>
    </div>
    <!-- Sparkline -->
    <div class="section-block">
      <div class="section-label">Event Volume <span class="section-label-line"></span></div>
      <div class="sparkline" id="sparkline"></div>
      <div class="spark-dates"><span>Feb 25</span><span>Mar 3</span></div>
    </div>
    <!-- Top Agents -->
    <div class="section-block">
      <div class="section-label">Top Agents by Task Volume <span class="section-label-line"></span></div>
      <div class="agent-row"><span class="agent-rank">01</span><span class="agent-name">cecilia</span><div class="agent-bar-wrap"><div class="agent-bar-fill" style="width:38%"></div></div><span class="agent-tasks">4,821</span><span class="agent-share">38%</span></div>
      <div class="agent-row"><span class="agent-rank">02</span><span class="agent-name">cadence</span><div class="agent-bar-wrap"><div class="agent-bar-fill" style="width:17%"></div></div><span class="agent-tasks">2,104</span><span class="agent-share">17%</span></div>
      <div class="agent-row"><span class="agent-rank">03</span><span class="agent-name">eve</span><div class="agent-bar-wrap"><div class="agent-bar-fill" style="width:15%"></div></div><span class="agent-tasks">1,892</span><span class="agent-share">15%</span></div>
      <div class="agent-row"><span class="agent-rank">04</span><span class="agent-name">alice</span><div class="agent-bar-wrap"><div class="agent-bar-fill" style="width:12%"></div></div><span class="agent-tasks">1,567</span><span class="agent-share">12%</span></div>
      <div class="agent-row"><span class="agent-rank">05</span><span class="agent-name">radius</span><div class="agent-bar-wrap"><div class="agent-bar-fill" style="width:10%"></div></div><span class="agent-tasks">1,203</span><span class="agent-share">10%</span></div>
      <div class="agent-row"><span class="agent-rank">06</span><span class="agent-name">meridian</span><div class="agent-bar-wrap"><div class="agent-bar-fill" style="width:8%"></div></div><span class="agent-tasks">980</span><span class="agent-share">8%</span></div>
    </div>
    <!-- Task Breakdown -->
    <div class="section-block">
      <div class="section-label">Task Breakdown <span class="section-label-line"></span></div>
      <div class="breakdown-row"><span class="breakdown-label">Memory Commits</span><div class="breakdown-bar-wrap"><div class="breakdown-bar-fill" style="width:42%"></div></div><span class="breakdown-val">42%</span></div>
      <div class="breakdown-row"><span class="breakdown-label">Policy Evaluations</span><div class="breakdown-bar-wrap"><div class="breakdown-bar-fill" style="width:28%"></div></div><span class="breakdown-val">28%</span></div>
      <div class="breakdown-row"><span class="breakdown-label">Mesh Coordination</span><div class="breakdown-bar-wrap"><div class="breakdown-bar-fill" style="width:18%"></div></div><span class="breakdown-val">18%</span></div>
      <div class="breakdown-row"><span class="breakdown-label">Code Execution</span><div class="breakdown-bar-wrap"><div class="breakdown-bar-fill" style="width:8%"></div></div><span class="breakdown-val">8%</span></div>
      <div class="breakdown-row"><span class="breakdown-label">Other</span><div class="breakdown-bar-wrap"><div class="breakdown-bar-fill" style="width:4%"></div></div><span class="breakdown-val">4%</span></div>
    </div>
  </div>

</div><!-- /app-content -->

<div class="app-footer">
  <span>BlackRoad OS, Inc. · Design System v1.0</span>
  <span>JetBrains Mono · Space Grotesk</span>
</div>

<div class="grad-bar"></div>

<script>
(function () {
  // ── Tab switching ──
  var tabs = document.querySelectorAll('#navTabs button');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-tab');
      tabs.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('.tpl-section').forEach(function (s) { s.classList.remove('active'); });
      document.getElementById('tpl-' + id).classList.add('active');
    });
  });

  // ── Login mode toggle ──
  var loginModeBtns = document.querySelectorAll('.login-mode-btn');
  loginModeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = this.getAttribute('data-mode');
      loginModeBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var signupOnly = document.querySelectorAll('.login-signup-only');
      var forgot = document.getElementById('loginForgot');
      var submitBtn = document.getElementById('loginSubmitBtn');
      if (mode === 'signup') {
        signupOnly.forEach(function (el) { el.style.display = 'block'; });
        forgot.style.display = 'none';
        submitBtn.textContent = 'Create Account';
      } else {
        signupOnly.forEach(function (el) { el.style.display = ''; });
        forgot.style.display = '';
        submitBtn.textContent = 'Sign In';
      }
    });
  });

  // ── Settings toggles ──
  window.togglePref = function (el) {
    el.classList.toggle('on');
  };

  // ── Docs sidebar nav ──
  var docNavItems = document.querySelectorAll('.docs-nav-item');
  docNavItems.forEach(function (item) {
    item.addEventListener('click', function () {
      docNavItems.forEach(function (i) { i.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // ── Analytics period buttons ──
  var periodBtns = document.querySelectorAll('.period-btn');
  periodBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      periodBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // ── Sparkline ──
  var sparkData = [12, 18, 15, 22, 28, 35, 31, 42, 38, 45, 52, 48, 55, 60, 58];
  var maxSpark = Math.max.apply(null, sparkData);
  var sparkline = document.getElementById('sparkline');
  if (sparkline) {
    sparkData.forEach(function (v) {
      var bar = document.createElement('div');
      bar.className = 'spark-bar';
      bar.style.height = Math.round((v / maxSpark) * 100) + '%';
      bar.style.opacity = (0.15 + (v / maxSpark) * 0.55).toFixed(2);
      sparkline.appendChild(bar);
    });
  }
}());
</script>
</body>
</html>
HTML
  echo -e "  ${GREEN}✓${NC} app-templates → ${output}"
}

# ─── WATCH ─────────────────────────────────────────────────────────────────
_cmd_watch() {
  local config="./brand.json" out_dir="./site"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --config) config="$2"; shift 2 ;;
      --out)    out_dir="$2"; shift 2 ;;
      *) shift ;;
    esac
  done

  if [[ ! -f "$config" ]]; then
    echo -e "${RED}✗ No brand.json found at: ${config}${NC}"
    echo -e "  Run: ${CYAN}br brand init${NC}"
    exit 1
  fi

  if ! command -v fswatch &>/dev/null; then
    echo -e "${RED}✗ fswatch not found.${NC} Install: brew install fswatch"
    exit 1
  fi

  echo -e "${BOLD}${CYAN}Watching ${config} for changes...${NC}"
  echo -e "  Output: ${YELLOW}${out_dir}/${NC}"
  echo -e "  Stop with: ${YELLOW}Ctrl-C${NC}"
  echo ""

  # Initial build
  _cmd_site --config "$config" --out "$out_dir"

  # Watch loop
  fswatch -0 --event Updated --event Created "$config" | while IFS= read -r -d '' _event; do
    echo ""
    echo -e "${CYAN}↻ Change detected — rebuilding...${NC}"
    _cmd_site --config "$config" --out "$out_dir"
    echo -e "${GREEN}✓ Site rebuilt at $(date +%H:%M:%S)${NC}"
  done
}

# ─── SITE GENERATOR ────────────────────────────────────────────────────────
_cmd_site() {
  local config="./brand.json" out_dir="./site"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --config) config="$2"; shift 2 ;;
      --out)    out_dir="$2"; shift 2 ;;
      *) shift ;;
    esac
  done

  if [[ ! -f "$config" ]]; then
    echo -e "${RED}✗ No brand.json found at: ${config}${NC}"
    echo -e "  Run: ${CYAN}br brand init${NC}"
    exit 1
  fi

  local name=$(_cfg_get "$config" "name" "BlackRoad OS")
  local tagline=$(_cfg_get "$config" "tagline" "Your AI. Your Hardware. Your Rules.")
  local desc=$(_cfg_get "$config" "description" "The AI-native developer platform.")
  local cta_text=$(_cfg_get "$config" "cta_text" "Get Started")
  local cta_url=$(_cfg_get "$config" "cta_url" "/docs")
  local footer_text=$(_cfg_get "$config" "footer" "© 2026 BlackRoad OS, Inc.")
  local og_image=$(_cfg_get "$config" "og_image" "")
  local og_url=$(_cfg_get "$config" "og_url" "")
  local twitter=$(_cfg_get "$config" "twitter" "")
  local logo=$(_cfg_get "$config" "logo" "")
  local favicon=$(_cfg_get "$config" "favicon" "")

  # Build nav HTML from brand.json nav array and export for all templates
  local nav_html
  nav_html=$(python3 -c "
import json, sys
d = json.load(open('$config'))
items = d.get('nav', [])
print(''.join(f'<a href=\"{i[\"url\"]}\">{i[\"label\"]}</a>' for i in items))
" 2>/dev/null)
  export BR_BRAND_NAV="$nav_html"
  export BR_BRAND_FOOTER="$footer_text"
  export BR_BRAND_SITE_NAME="$name"
  export BR_BRAND_OG_TITLE="$name"
  export BR_BRAND_OG_DESC="$desc"
  export BR_BRAND_OG_IMAGE="$og_image"
  export BR_BRAND_OG_URL="$og_url"
  export BR_BRAND_TWITTER="$twitter"
  export BR_BRAND_LOGO="$logo"
  export BR_BRAND_FAVICON="$favicon"

  # Check for optional extended pages in config
  local has_team has_changelog has_coming_soon
  has_team=$(python3 -c "import json;d=json.load(open('$config'));print('yes' if d.get('team') else '')" 2>/dev/null)
  has_changelog=$(python3 -c "import json;d=json.load(open('$config'));print('yes' if d.get('changelog') else '')" 2>/dev/null)
  has_coming_soon=$(python3 -c "import json;d=json.load(open('$config'));print('yes' if d.get('launch_date') else '')" 2>/dev/null)

  local page_count=7  # index, pricing, pro checkout, enterprise checkout, docs, about, 404
  [[ -n "$has_team" ]]        && (( page_count++ ))
  [[ -n "$has_changelog" ]]   && (( page_count++ ))
  [[ -n "$has_coming_soon" ]] && (( page_count++ ))

  mkdir -p "$out_dir" "${out_dir}/pricing" "${out_dir}/docs" "${out_dir}/about"

  echo -e "${BOLD}${CYAN}Generating site from ${config}${NC}"
  echo ""

  # index.html — hero landing page
  _tpl_hero "$name" "$tagline" "$desc" "$cta_text" "$cta_url" "View Docs" "/docs" "Now Available" "${out_dir}/index.html"
  echo -e "  ${GREEN}✓${NC} ${out_dir}/index.html          (hero)"

  # pricing/index.html
  _tpl_pricing "$name Pricing" "Simple, transparent pricing." "${out_dir}/pricing/index.html" \
    "Starter|Free|forever|Perfect to get started.|5 agents,1GB memory,Community support|Get Started|${cta_url}|false" \
    "Pro|\$49|/month|For serious builders.|50 agents,10GB memory,Priority support,Custom domains|Start Pro Trial|/pricing/pro|true" \
    "Enterprise|Custom|pricing|For teams and companies.|Unlimited agents,Unlimited memory,SLA + SSO,Dedicated support|Contact Sales|/contact|false"
  echo -e "  ${GREEN}✓${NC} ${out_dir}/pricing/index.html  (pricing)"

  # checkout pages — Pro and Enterprise with Stripe payment links
  mkdir -p "${out_dir}/pricing/pro" "${out_dir}/pricing/enterprise"
  _tpl_checkout "Pro Plan" "\$49/month" "price_1T3nxYChUUSEbzyhRA8XeENr" \
    "https://blackroad-stripe.workers.dev" \
    "50 agents,10GB memory,Priority support,Custom domains,Deploy to CF Pages,API access" \
    "Start Pro Trial" "${out_dir}/pricing/pro/index.html" \
    "https://buy.stripe.com/test_fZu3cubyb2ZMdDqcNT4ko07"
  echo -e "  ${GREEN}✓${NC} ${out_dir}/pricing/pro/index.html (checkout/pro)"

  _tpl_checkout "Enterprise Plan" "Custom pricing" "price_1T3nyzChUUSEbzyhYjASdHjR" \
    "https://blackroad-stripe.workers.dev" \
    "Unlimited agents,Unlimited memory,SLA guarantee,SSO + SAML,Dedicated support,Custom SLAs" \
    "Contact Sales" "${out_dir}/pricing/enterprise/index.html" \
    "https://buy.stripe.com/test_6oUaEWfOr1VI1UI5lr4ko09"
  echo -e "  ${GREEN}✓${NC} ${out_dir}/pricing/enterprise/index.html (checkout/enterprise)"

  # docs/index.html
  _tpl_docs "${name} Docs" "Getting Started" "${name}" "${out_dir}/docs/index.html" \
    "Installation|Install the CLI: npm install -g @blackroad/cli" \
    "Quick Start|Run br brand init to scaffold your brand config, then br brand site to generate your site." \
    "Templates|Use br brand list to see all 15 available templates." \
    "Deploy|Run br brand deploy --project my-site --dir ./site to publish to Cloudflare Pages."
  echo -e "  ${GREEN}✓${NC} ${out_dir}/docs/index.html     (docs)"

  # about/index.html
  _tpl_docs "About ${name}" "Our Story" "${name}" "${out_dir}/about/index.html" \
    "Mission|${desc}" \
    "Philosophy|${tagline}" \
    "Built With|BlackRoad OS Brand Kit — br-brand.sh. Embedded design system, 15 templates, zero dependencies."
  echo -e "  ${GREEN}✓${NC} ${out_dir}/about/index.html    (docs)"

  # 404.html
  _tpl_404 "404 — Not Found" "This page doesn't exist in ${name}." "/" "${out_dir}/404.html"
  echo -e "  ${GREEN}✓${NC} ${out_dir}/404.html             (404)"

  # Optional: team page from config's "team" array
  if [[ -n "$has_team" ]]; then
    mkdir -p "${out_dir}/team"
    local team_members
    team_members=($(python3 -c "
import json
d=json.load(open('$config'))
for m in d.get('team',[]):
    init=m.get('initial',m.get('name','?')[0].upper())
    name=m.get('name','')
    role=m.get('role','')
    bio=m.get('bio','')
    gh=m.get('github','#')
    print(f'{init}|{name}|{role}|{bio}|{gh}')
" 2>/dev/null))
    _tpl_team "The Team" "Meet the people behind ${name}." "${out_dir}/team/index.html" "${team_members[@]}"
    echo -e "  ${GREEN}✓${NC} ${out_dir}/team/index.html       (team)"
  fi

  # Optional: changelog page from config's "changelog" array
  if [[ -n "$has_changelog" ]]; then
    mkdir -p "${out_dir}/changelog"
    local cl_entries
    cl_entries=($(python3 -c "
import json
d=json.load(open('$config'))
for e in d.get('changelog',[]):
    ver=e.get('version','')
    dt=e.get('date','')
    changes=','.join(e.get('changes',[]))
    tags=','.join(e.get('tags',['feature']))
    print(f'{ver}|{dt}|{changes}|{tags}')
" 2>/dev/null))
    _tpl_changelog "Changelog" "Release notes for ${name}." "${out_dir}/changelog/index.html" "${cl_entries[@]}"
    echo -e "  ${GREEN}✓${NC} ${out_dir}/changelog/index.html  (changelog)"
  fi

  # Optional: coming-soon page
  if [[ -n "$has_coming_soon" ]]; then
    local launch_dt=$(_cfg_get "$config" "launch_date" "")
    _tpl_coming_soon "$name" "$tagline" "$launch_dt" "${out_dir}/coming-soon.html"
    echo -e "  ${GREEN}✓${NC} ${out_dir}/coming-soon.html       (coming-soon)"
  fi

  echo ""
  echo -e "${GREEN}✓ Site complete:${NC} ${out_dir}/ (${page_count} pages)"
  echo ""
  echo -e "  Preview : ${YELLOW}open ${out_dir}/index.html${NC}"
  echo -e "  Watch   : ${YELLOW}br brand watch --config ${config}${NC}"
  echo -e "  Deploy  : ${YELLOW}br brand deploy --project my-site --dir ${out_dir}${NC}"
  echo -e "  Export  : ${YELLOW}br brand export --dir ${out_dir}${NC}"
  echo ""
}

# ─── OPEN ──────────────────────────────────────────────────────────────────
_cmd_open() {
  local target=""
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --dir|--file) target="$2"; shift 2 ;;
      *) [[ -z "$target" ]] && target="$1"; shift ;;
    esac
  done

  # Default: look for most recent generated file
  if [[ -z "$target" ]]; then
    target=$(ls -t "${OUT_DIR}"/*.html "${OUT_DIR}"/*/index.html 2>/dev/null | head -1)
  fi

  if [[ -z "$target" || ! -e "$target" ]]; then
    echo -e "${RED}✗ Nothing to open. Specify a file: br brand open <file.html>${NC}"
    exit 1
  fi

  echo -e "${CYAN}Opening:${NC} ${target}"
  if command -v open &>/dev/null; then
    open "$target"
  elif command -v xdg-open &>/dev/null; then
    xdg-open "$target"
  else
    echo -e "${YELLOW}No browser opener found. File is at: ${target}${NC}"
  fi
}

# ─── EXPORT ────────────────────────────────────────────────────────────────
_cmd_export() {
  local src_dir="./site" out_zip=""
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --dir)    src_dir="$2"; shift 2 ;;
      --output) out_zip="$2"; shift 2 ;;
      *) shift ;;
    esac
  done

  if [[ ! -d "$src_dir" ]]; then
    echo -e "${RED}✗ Directory not found: ${src_dir}${NC}"
    echo -e "  Run: ${CYAN}br brand site${NC} first"
    exit 1
  fi

  [[ -z "$out_zip" ]] && out_zip="${src_dir%/}-$(date +%Y%m%d-%H%M%S).zip"

  if ! command -v zip &>/dev/null; then
    echo -e "${RED}✗ zip not found. Install: brew install zip${NC}"
    exit 1
  fi

  local page_count
  page_count=$(find "$src_dir" -name "*.html" | wc -l | tr -d ' ')

  (cd "$(dirname "$src_dir")" && zip -rq "$(basename "$out_zip")" "$(basename "$src_dir")")
  # If out_zip has a directory component, move it there
  local zip_name; zip_name="$(basename "$out_zip")"
  local zip_dest; zip_dest="$(dirname "$out_zip")"
  [[ "$zip_dest" != "." && "$zip_dest" != "$(dirname "$src_dir")" ]] && mv "$(dirname "$src_dir")/${zip_name}" "$out_zip" 2>/dev/null || true

  echo ""
  echo -e "${GREEN}✓ Exported:${NC} ${out_zip}"
  echo -e "  Pages: ${page_count}"
  local size; size=$(du -sh "$out_zip" 2>/dev/null | cut -f1)
  echo -e "  Size:  ${size}"
  echo ""
}

# ─── MAIN ─────────────────────────────────────────────────────────────────

_cmd_help() {
  echo -e ""
  echo -e "  ${AMBER}${BOLD}◆ BR BRAND${NC}  ${DIM}Brand tokens, gradients, copy.${NC}"
  echo -e "  ${DIM}Look consistent. Ship beautiful. Every time.${NC}"
  echo -e "  ${DIM}────────────────────────────────────────────────${NC}"
  echo -e "  ${BOLD}USAGE${NC}  br brand ${DIM}<command> [args]${NC}"
  echo -e ""
  echo -e "  ${BOLD}COMMANDS${NC}"
  echo -e "  ${AMBER}  list                            ${NC} List available brand templates"
  echo -e "  ${AMBER}  new <template>                  ${NC} Generate from a brand template"
  echo -e "  ${AMBER}  site                            ${NC} Build brand site"
  echo -e "  ${AMBER}  preview <file>                  ${NC} Preview a brand file"
  echo -e "  ${AMBER}  init                            ${NC} Initialize brand config in project"
  echo -e "  ${AMBER}  audit <file>                    ${NC} Audit file for brand compliance"
  echo -e "  ${AMBER}  deploy                          ${NC} Deploy brand assets"
  echo -e "  ${AMBER}  watch                           ${NC} Watch and auto-rebuild"
  echo -e "  ${AMBER}  export                          ${NC} Export brand package as zip"
  echo -e "  ${AMBER}  open [file]                     ${NC} Open brand output in browser"
  echo -e ""
  echo -e "  ${BOLD}EXAMPLES${NC}"
  echo -e "  ${DIM}  br brand list${NC}"
  echo -e "  ${DIM}  br brand new landing${NC}"
  echo -e "  ${DIM}  br brand audit src/styles.css${NC}"
  echo -e "  ${DIM}  br brand deploy${NC}"
  echo -e ""
}

case "${1:-list}" in
  list|ls)    _cmd_list ;;
  preview)    _cmd_preview "$2" ;;
  init)       _cmd_init "${@:2}" ;;
  new|gen)    _cmd_new "$2" "${@:3}" ;;
  site)       _cmd_site "${@:2}" ;;
  deploy)     _cmd_deploy "${@:2}" ;;
  audit)      _cmd_audit "$2" ;;
  watch)      _cmd_watch "${@:2}" ;;
  open)       _cmd_open "${@:2}" ;;
  export)     _cmd_export "${@:2}" ;;
  help|-h|--help) _cmd_help ;;
  *)
    echo -e "${RED}✗ Unknown command: $1${NC}"
    _cmd_help
    exit 1
    ;;
esac
