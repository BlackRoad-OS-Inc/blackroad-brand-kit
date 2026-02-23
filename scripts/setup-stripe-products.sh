#!/usr/bin/env bash
# scripts/setup-stripe-products.sh
# Creates BlackRoad OS products + prices in Stripe via REST API
# Usage: STRIPE_SECRET_KEY=sk_test_... bash scripts/setup-stripe-products.sh
#
# Run once against test keys first, then production keys.
# Output: prints all created product/price IDs → save to .stripe-ids.env

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

if [[ -z "${STRIPE_SECRET_KEY:-}" ]]; then
  echo -e "${RED}✗${NC} STRIPE_SECRET_KEY is not set."
  echo -e "  Run: ${CYAN}STRIPE_SECRET_KEY=sk_test_... bash $0${NC}"
  exit 1
fi

STRIPE="https://api.stripe.com/v1"

stripe_post() {
  local path="$1"; shift
  curl -s -X POST "$STRIPE/$path" -u "${STRIPE_SECRET_KEY}:" "$@"
}

echo -e "${CYAN}BlackRoad OS — Stripe Product Setup${NC}"
echo -e "────────────────────────────────────"
echo -e "Key prefix: ${STRIPE_SECRET_KEY:0:12}..."
echo ""

# ── 1. Starter — Free ─────────────────────────────────────────────────────
echo -n "Creating product: BlackRoad Starter ... "
STARTER=$(stripe_post products \
  -d "name=BlackRoad Starter" \
  -d "description=Get started with BlackRoad OS brand tools. Free forever." \
  -d "metadata[plan]=starter" \
  -d "metadata[features]=5 brand templates,br brand CLI,Community support")
STARTER_ID=$(echo "$STARTER" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo -e "${GREEN}✓${NC} $STARTER_ID"

echo -n "Creating price: Starter \$0/mo ... "
STARTER_PRICE=$(stripe_post prices \
  -d "product=$STARTER_ID" \
  -d "unit_amount=0" \
  -d "currency=usd" \
  -d "recurring[interval]=month" \
  -d "nickname=Starter Monthly")
STARTER_PRICE_ID=$(echo "$STARTER_PRICE" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo -e "${GREEN}✓${NC} $STARTER_PRICE_ID"

# ── 2. Pro — $49/month ────────────────────────────────────────────────────
echo -n "Creating product: BlackRoad Pro ... "
PRO=$(stripe_post products \
  -d "name=BlackRoad Pro" \
  -d "description=Full brand kit access. Unlimited templates, CI/CD deploy, priority support." \
  -d "metadata[plan]=pro" \
  -d "metadata[features]=All 15+ templates,br brand deploy,Stripe checkout,Priority support,Custom domain deploy")
PRO_ID=$(echo "$PRO" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo -e "${GREEN}✓${NC} $PRO_ID"

echo -n "Creating price: Pro \$49/mo ... "
PRO_MONTHLY=$(stripe_post prices \
  -d "product=$PRO_ID" \
  -d "unit_amount=4900" \
  -d "currency=usd" \
  -d "recurring[interval]=month" \
  -d "nickname=Pro Monthly")
PRO_MONTHLY_ID=$(echo "$PRO_MONTHLY" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo -e "${GREEN}✓${NC} $PRO_MONTHLY_ID (monthly)"

echo -n "Creating price: Pro \$490/yr (2 months free) ... "
PRO_YEARLY=$(stripe_post prices \
  -d "product=$PRO_ID" \
  -d "unit_amount=49000" \
  -d "currency=usd" \
  -d "recurring[interval]=year" \
  -d "nickname=Pro Yearly")
PRO_YEARLY_ID=$(echo "$PRO_YEARLY" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo -e "${GREEN}✓${NC} $PRO_YEARLY_ID (yearly)"

# ── 3. Enterprise — $299/month ────────────────────────────────────────────
echo -n "Creating product: BlackRoad Enterprise ... "
ENT=$(stripe_post products \
  -d "name=BlackRoad Enterprise" \
  -d "description=Multi-seat, white-label, dedicated infrastructure, SLA guarantee." \
  -d "metadata[plan]=enterprise" \
  -d "metadata[features]=Everything in Pro,Multi-seat teams,White-label,Custom templates,Dedicated support,SLA 99.9%")
ENT_ID=$(echo "$ENT" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo -e "${GREEN}✓${NC} $ENT_ID"

echo -n "Creating price: Enterprise \$299/mo ... "
ENT_MONTHLY=$(stripe_post prices \
  -d "product=$ENT_ID" \
  -d "unit_amount=29900" \
  -d "currency=usd" \
  -d "recurring[interval]=month" \
  -d "nickname=Enterprise Monthly")
ENT_MONTHLY_ID=$(echo "$ENT_MONTHLY" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo -e "${GREEN}✓${NC} $ENT_MONTHLY_ID"

# ── Output env file ────────────────────────────────────────────────────────
OUTPUT=".stripe-ids.env"
cat > "$OUTPUT" << EOF
# BlackRoad Stripe Product & Price IDs
# Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
# Add these to your worker env vars / Pages env / brand.json

STRIPE_PRODUCT_STARTER=$STARTER_ID
STRIPE_PRICE_STARTER=$STARTER_PRICE_ID

STRIPE_PRODUCT_PRO=$PRO_ID
STRIPE_PRICE_PRO_MONTHLY=$PRO_MONTHLY_ID
STRIPE_PRICE_PRO_YEARLY=$PRO_YEARLY_ID

STRIPE_PRODUCT_ENTERPRISE=$ENT_ID
STRIPE_PRICE_ENTERPRISE_MONTHLY=$ENT_MONTHLY_ID
EOF

echo ""
echo -e "${GREEN}✓ All products created!${NC}"
echo -e "  Saved to: ${CYAN}.stripe-ids.env${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Set worker secrets:"
echo -e "     ${CYAN}cd workers/stripe && wrangler secret put STRIPE_SECRET_KEY${NC}"
echo -e "     ${CYAN}cd workers/stripe && wrangler secret put STRIPE_WEBHOOK_SECRET${NC}"
echo -e ""
echo -e "  2. Deploy worker:"
echo -e "     ${CYAN}cd workers/stripe && wrangler deploy${NC}"
echo -e ""
echo -e "  3. Register webhook in Stripe Dashboard:"
echo -e "     URL: https://blackroad-stripe.<account>.workers.dev/webhook"
echo -e "     Events: checkout.session.completed, customer.subscription.*, invoice.payment_*"
echo -e ""
echo -e "  4. Update STRIPE_WEBHOOK_SECRET from Stripe Dashboard signing secret"
echo ""
cat "$OUTPUT"
