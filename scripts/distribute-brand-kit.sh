#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════
# BlackRoad OS — Brand Kit Distribution Script
# ═══════════════════════════════════════════════════════
# Distributes the official brand kit to all repos in the
# BlackRoad-OS-Inc organization.
#
# Usage:
#   bash scripts/distribute-brand-kit.sh [--dry-run]
#
# Environment:
#   GH_TOKEN or GITHUB_TOKEN — PAT with 'repo' scope for cross-repo push
#
# The script:
#   1. Clones each target repo (shallow)
#   2. Creates a brand-kit/ directory with core assets
#   3. Commits and pushes to the default branch
# ═══════════════════════════════════════════════════════

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRAND_KIT_ROOT="$(dirname "$SCRIPT_DIR")"
WORK_DIR="/tmp/brand-kit-distribute"
DRY_RUN=false

# Parse args
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
  esac
done

# Determine clone URL base
TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
if [ -n "$TOKEN" ]; then
  CLONE_BASE="https://x-access-token:${TOKEN}@github.com"
else
  CLONE_BASE="https://github.com"
fi

ORG="BlackRoad-OS-Inc"

# All repos in the org (excluding blackroad-brand-kit itself)
TARGET_REPOS=(
  blackroad-cli
  blackroad-os-inc.github.io
  blackroad-web
  blackroad-gateway
  blackroad-infra
  .github
  blackroad-chat
  blackroad-workerd-edge
  blackroad-sf
  blackroad-hardware
  demo-repository
  blackroad-agents
  blackroad-docs
  blackroad-operator
  blackroad
  blackroad-api
  blackroad-math
  blackroad-sdk
  blackroad-core
  blackroad-design
)

echo "═══════════════════════════════════════════════════════"
echo "  BlackRoad OS — Brand Kit Distribution"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "  Source:  $BRAND_KIT_ROOT"
echo "  Auth:    $([ -n "$TOKEN" ] && echo "PAT configured" || echo "No token (may fail on push)")"
echo "  Targets: ${#TARGET_REPOS[@]} repos"
echo "  Dry run: $DRY_RUN"
echo ""

# Clean workspace
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR"

SUCCESS=0
FAILED=0
SKIPPED=0

for REPO in "${TARGET_REPOS[@]}"; do
  echo "─── $REPO ───"
  REPO_URL="${CLONE_BASE}/${ORG}/${REPO}.git"
  REPO_DIR="${WORK_DIR}/${REPO}"

  # Clone (shallow, single branch)
  if ! git clone --depth 1 "$REPO_URL" "$REPO_DIR" 2>/dev/null; then
    echo "  SKIP: Could not clone $REPO"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Detect default branch
  DEFAULT_BRANCH=$(git -C "$REPO_DIR" rev-parse --abbrev-ref HEAD)

  # Create brand-kit directory
  BRAND_DEST="${REPO_DIR}/brand-kit"
  mkdir -p "${BRAND_DEST}/css"
  mkdir -p "${BRAND_DEST}/scripts"

  # Copy core brand assets
  cp "$BRAND_KIT_ROOT/css/brand.css"              "${BRAND_DEST}/css/brand.css"
  cp "$BRAND_KIT_ROOT/docs-brand-system.md"        "${BRAND_DEST}/docs-brand-system.md"
  cp "$BRAND_KIT_ROOT/scripts/brand-validator.js"  "${BRAND_DEST}/scripts/brand-validator.js"
  cp "$BRAND_KIT_ROOT/br-brand.sh"                 "${BRAND_DEST}/br-brand.sh"
  chmod +x "${BRAND_DEST}/br-brand.sh"

  # Write a manifest
  cat > "${BRAND_DEST}/README.md" << 'KITEOF'
# BlackRoad OS — Brand Kit

Official design system, CLI generator, and compliance tools distributed from
[`blackroad-brand-kit`](https://github.com/BlackRoad-OS-Inc/blackroad-brand-kit).

## Contents

| File | Purpose |
|------|---------|
| `css/brand.css` | Official design tokens — colors, spacing, typography, animations |
| `docs-brand-system.md` | Brand rules and usage guidelines |
| `scripts/brand-validator.js` | Color compliance scanner |
| `br-brand.sh` | CLI template generator (15 templates) |

## Quick Start

```bash
# Validate brand compliance in this repo
node brand-kit/scripts/brand-validator.js --dir=src/

# Generate a branded page
zsh brand-kit/br-brand.sh new landing \
  --title "My Page" \
  --tagline "Built with BlackRoad OS" \
  --output index.html
```

## Design Tokens

| Token | Value |
|-------|-------|
| `--sunrise-orange` | `#F5A623` |
| `--hot-pink` | `#FF1D6C` |
| `--vivid-purple` | `#9C27B0` |
| `--cyber-blue` | `#2979FF` |
| `--gradient-brand` | 135deg full spectrum |
| Spacing | Golden Ratio (φ = 1.618) |
| Font | JetBrains Mono / SF Mono |

---

**Source:** [blackroad-brand-kit](https://github.com/BlackRoad-OS-Inc/blackroad-brand-kit)
**Do not modify** — updates are distributed from the source repo.
KITEOF

  # Check if there are changes
  cd "$REPO_DIR"
  git add -A
  if git diff --cached --quiet; then
    echo "  SKIP: No changes needed (brand-kit already up to date)"
    SKIPPED=$((SKIPPED + 1))
    cd "$BRAND_KIT_ROOT"
    continue
  fi

  if $DRY_RUN; then
    echo "  DRY RUN: Would commit and push brand-kit/ to $REPO ($DEFAULT_BRANCH)"
    SUCCESS=$((SUCCESS + 1))
    cd "$BRAND_KIT_ROOT"
    continue
  fi

  # Commit
  git commit -m "$(cat <<'EOF'
chore: distribute official BlackRoad OS brand kit

Add brand-kit/ directory with the official design system, CSS tokens,
brand validator, and CLI template generator from blackroad-brand-kit.

Contents:
- css/brand.css — design tokens (colors, spacing, typography, animations)
- docs-brand-system.md — brand rules and usage guidelines
- scripts/brand-validator.js — color compliance scanner
- br-brand.sh — CLI template generator (15 templates)

Source: https://github.com/BlackRoad-OS-Inc/blackroad-brand-kit
EOF
)" 2>/dev/null

  # Push with retry (exponential backoff)
  PUSHED=false
  for ATTEMPT in 1 2 3 4; do
    if git push origin "$DEFAULT_BRANCH" 2>/dev/null; then
      PUSHED=true
      break
    fi
    DELAY=$((2 ** ATTEMPT))
    echo "  Retry $ATTEMPT — waiting ${DELAY}s..."
    sleep "$DELAY"
  done

  if $PUSHED; then
    echo "  OK: brand-kit/ pushed to $REPO ($DEFAULT_BRANCH)"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "  FAIL: Could not push to $REPO"
    FAILED=$((FAILED + 1))
  fi

  cd "$BRAND_KIT_ROOT"
done

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Distribution Complete"
echo "  ✓ Success: $SUCCESS"
echo "  ✗ Failed:  $FAILED"
echo "  ○ Skipped: $SKIPPED"
echo "═══════════════════════════════════════════════════════"

# Cleanup
rm -rf "$WORK_DIR"

exit $FAILED
