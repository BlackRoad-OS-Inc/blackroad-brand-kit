<div align="center">

<img src="https://img.shields.io/badge/BlackRoad%20OS-Brand%20Kit-FF0066?style=for-the-badge&labelColor=0A0A0A" />
<img src="https://img.shields.io/badge/Templates-8-FF9D00?style=for-the-badge&labelColor=0A0A0A" />
<img src="https://img.shields.io/badge/Brand%20Audit-12%2F12-00CC88?style=for-the-badge&labelColor=0A0A0A" />
<img src="https://img.shields.io/badge/License-Proprietary-7700FF?style=for-the-badge&labelColor=0A0A0A" />

<br/><br/>

# BlackRoad OS — Brand Kit

**Official design system, HTML templates, and CLI generator for all BlackRoad OS projects.**

*Every page this kit produces scores 12/12 on brand compliance.*

</div>

---

## 🎨 Template Gallery

### `landing` — Landing Page

> Hero · Feature grid · CTA section

![landing preview](previews/landing.svg)

```bash
br brand new landing \
  --title "My Product" \
  --tagline "Build the future" \
  --desc "Long description here" \
  --feature "🚀|Fast|Deploy in seconds" \
  --feature "🔒|Secure|Enterprise grade" \
  --feature "⚡|Edge|Runs everywhere" \
  --cta "Get Started" --cta-url "https://blackroad.ai" \
  --output index.html
```

---

### `agent` — Agent Profile Page

> Emoji hero · Bio card · Skill progress bars

![agent preview](previews/agent.svg)

```bash
br brand new agent \
  --title "LUCIDIA" \
  --type "Reasoning Agent" \
  --tagline "The Dreamer — deep analysis, philosophical synthesis" \
  --bio "LUCIDIA is the primary AI coordinator..." \
  --emoji "🌀" \
  --skill "Reasoning|95" \
  --skill "Analysis|90" \
  --skill "Memory|80" \
  --output lucidia.html
```

---

### `docs` — Documentation Page

> Author label · Title · Divider · Sectioned content

![docs preview](previews/docs.svg)

```bash
br brand new docs \
  --title "Getting Started" \
  --subtitle "Up and running in 5 minutes" \
  --author "BlackRoad Docs" \
  --section "Installation|Clone the repo and add br to your PATH." \
  --section "First Steps|Run br cece init to set up your identity." \
  --output getting-started.html
```

---

### `pricing` — Pricing Tiers

> Tier cards · Gradient border on highlighted tier · Feature lists

![pricing preview](previews/pricing.svg)

```bash
br brand new pricing \
  --title "Pricing" \
  --subtitle "Scale from zero to 30,000 agents" \
  --tier "Starter|Free|month|For indie builders|br CLI,3 agents,Community|Get Started|/signup|false" \
  --tier "Pro|\$99|month|For teams|Everything in Starter,30 agents,Priority|Start Trial|/trial|true" \
  --tier "Enterprise|Custom|month|For orgs|Unlimited agents,SLA,Infra|Contact Us|/contact|false" \
  --output pricing.html
```

> Tier format: `"Name|Price|Period|Desc|feat1,feat2,feat3|CTA text|CTA url|highlight"`  
> Set `highlight=true` to wrap a tier in the brand gradient border.

---

### `feature` — Feature Showcase

> Alternating split rows · Icon block · Text description

![feature preview](previews/feature.svg)

```bash
br brand new feature \
  --title "Why BlackRoad OS" \
  --subtitle "Built different. Built for agents." \
  --item "🔒|Tokenless Architecture|Agents never touch API keys..." \
  --item "⚡|Edge-Native Deployment|Ship to Cloudflare, Railway, Pi..." \
  --item "💾|PS-SHA∞ Memory|Hash-chained journals — every action auditable." \
  --output why.html
```

---

### `blog` — Blog Post

> Tags · Title · Author & date · Body sections

![blog preview](previews/blog.svg)

```bash
br brand new blog \
  --title "Introducing CECE 2.2" \
  --subtitle "The portable AI identity that follows you everywhere" \
  --author "Alexa" \
  --tags "ai,identity,agents" \
  --section "What is CECE?|CECE is an identity layer that persists..." \
  --section "What is new in 2.2|Relationships now track bond strength..." \
  --output cece-2-2.html
```

---

### `404` — Error Page

> Glitch-animated 404 · Message · Home + Back CTAs

![404 preview](previews/404.svg)

```bash
br brand new 404 \
  --title "Lost in the mesh" \
  --message "The agent you are looking for has gone offline." \
  --home-url "https://blackroad.ai" \
  --output 404.html
```

---

### `card` — Embeddable Card Snippet

> Icon · Badge · Title · Description · CTA link

![card preview](previews/card.svg)

```bash
br brand new card \
  --title "Agent Mesh" \
  --desc "30,000 autonomous agents across every cloud and device." \
  --icon "🕸️" \
  --badge "New" \
  --link "/mesh" \
  --output card.html
```

> Outputs a standalone HTML snippet — paste into any brand-compliant page grid.

---

## 🛠️ Commands

| Command | Description |
|---|---|
| `br brand list` | List all templates and usage |
| `br brand new <template> [flags]` | Generate a page |
| `br brand audit <file.html>` | 12-point brand compliance check |
| `br brand deploy --project x --file y.html` | Push to Cloudflare Pages |
| `br brand preview <template>` | Show template structure |

---

## ✅ Brand Audit

Every generated page passes a 12-point compliance check automatically:

```
✓ Brand colors defined (--sunrise-orange)
✓ Brand gradient (--gradient-brand)
✓ Hot pink (#FF0066)
✓ Cyber blue (#0066FF)
✓ Vivid purple (#7700FF)
✓ Golden ratio spacing (--space-)
✓ Scroll progress bar
✓ backdrop-filter / glassmorphism
✓ animate-in class
✓ Gradient text
✓ Brand font stack
✓ Golden ratio line-height (1.618)
```

Run anytime:

```bash
br brand audit my-page.html
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| `--sunrise-orange` | `#FF9D00` |
| `--hot-pink` | `#FF0066` |
| `--deep-magenta` | `#D600AA` |
| `--vivid-purple` | `#7700FF` |
| `--cyber-blue` | `#0066FF` |
| `--gradient-brand` | `180deg` full spectrum |
| `--space-xs … --space-3xl` | `8 13 21 34 55 89 144px` (φ) |
| `line-height` | `1.618` (Golden Ratio) |
| Font | `JetBrains Mono` / `SF Mono` / `Courier New` |

Full CSS: [`css/brand.css`](css/brand.css)

---

## 🚀 Install

```bash
# The tool ships with the blackroad monorepo
git clone https://github.com/BlackRoad-OS-Inc/blackroad-brand-kit
# or use via br CLI (already wired in)
br brand list
```

---

<div align="center">

© 2026 BlackRoad OS, Inc. All rights reserved. Proprietary — not open source.

</div>
