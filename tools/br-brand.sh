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

# ─── LIST ─────────────────────────────────────────────────────────────────
_cmd_list() {
  echo ""
  echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════╗${NC}"
  echo -e "${BOLD}${CYAN}║  BR Brand — Template Engine  💜              ║${NC}"
  echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${YELLOW}Available Templates:${NC}"
  echo ""
  echo -e "  ${GREEN}landing${NC}   Full landing page with hero, features, CTA"
  echo -e "  ${GREEN}agent${NC}     Agent profile page with skills bars"
  echo -e "  ${GREEN}docs${NC}      Documentation / article page"
  echo -e "  ${GREEN}card${NC}      Reusable card HTML snippet (no full page)"
  echo ""
  echo -e "${YELLOW}Usage:${NC}"
  echo ""
  echo -e "  ${CYAN}br brand new landing${NC} \\"
  echo -e "    --title \"My Product\" \\"
  echo -e "    --tagline \"Build the future\" \\"
  echo -e "    --desc \"Long description here\" \\"
  echo -e "    --cta \"Get Started\" \\"
  echo -e "    --cta-url \"https://blackroad.ai\" \\"
  echo -e "    --feature \"🚀|Fast|Deploy in seconds\" \\"
  echo -e "    --feature \"🔒|Secure|Enterprise grade\" \\"
  echo -e "    --output index.html"
  echo ""
  echo -e "  ${CYAN}br brand new agent${NC} \\"
  echo -e "    --title \"LUCIDIA\" \\"
  echo -e "    --type \"Reasoning Agent\" \\"
  echo -e "    --tagline \"The Dreamer\" \\"
  echo -e "    --bio \"LUCIDIA reasons across dimensions...\" \\"
  echo -e "    --emoji \"🌀\" \\"
  echo -e "    --skill \"Reasoning|95\" \\"
  echo -e "    --skill \"Memory|88\" \\"
  echo -e "    --output lucidia.html"
  echo ""
  echo -e "  ${CYAN}br brand new docs${NC} \\"
  echo -e "    --title \"Getting Started\" \\"
  echo -e "    --subtitle \"Up and running in 5 minutes\" \\"
  echo -e "    --author \"BlackRoad Docs\" \\"
  echo -e "    --section \"Installation|pip install blackroad\" \\"
  echo -e "    --section \"First Steps|Run br cece init\" \\"
  echo -e "    --output getting-started.html"
  echo ""
  echo -e "  ${CYAN}br brand new card${NC} \\"
  echo -e "    --title \"Agent Mesh\" --desc \"30K agents\" \\"
  echo -e "    --icon \"🕸️\" --badge \"New\" --link \"/mesh\" \\"
  echo -e "    --output card.html"
  echo ""
  echo -e "${PURPLE}Output dir: ${OUT_DIR}${NC}"
  echo ""
}

# ─── PREVIEW ──────────────────────────────────────────────────────────────
_cmd_preview() {
  case "$1" in
    landing) echo -e "${CYAN}landing${NC}: Hero → Description → Feature Grid → CTA section" ;;
    agent)   echo -e "${CYAN}agent${NC}:   Emoji hero → About card → Skill progress bars" ;;
    docs)    echo -e "${CYAN}docs${NC}:    Title/subtitle → Sectioned content with dividers" ;;
    card)    echo -e "${CYAN}card${NC}:    Standalone card HTML snippet (embed anywhere)" ;;
    *)       echo -e "${RED}Unknown template: $1${NC}"; _cmd_list ;;
  esac
}

# ─── NEW ──────────────────────────────────────────────────────────────────
_cmd_new() {
  local tpl="$1"; shift

  # Defaults
  local title="BlackRoad OS" tagline="" desc="" cta_text="Get Started" cta_url="#"
  local type="Agent" bio="" emoji="🤖"
  local subtitle="" author="BlackRoad OS"
  local icon="✦" badge="" link="#"
  local output="" 
  local -a features skills sections

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
  *)
    echo -e "${RED}Unknown command: $1${NC}"
    echo "Usage: br brand [list | new <template> | preview <template>]"
    exit 1
    ;;
esac
