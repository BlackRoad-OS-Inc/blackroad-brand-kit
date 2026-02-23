# Stripe Integration Guide

## Overview

BlackRoad Brand Kit includes full Stripe Checkout infrastructure:

| Component | Location | Purpose |
|-----------|----------|---------|
| **Stripe Worker** | `workers/stripe/index.js` | Cloudflare Worker — checkout sessions, webhooks, portal |
| **Checkout Template** | `br brand new checkout` | Payment page with Stripe buy button |
| **Products Script** | `scripts/setup-stripe-products.sh` | Create Stripe products/prices via REST API |

---

## Quick Start

### 1. Create Stripe Products

```bash
# Test mode first
STRIPE_SECRET_KEY=sk_test_... bash scripts/setup-stripe-products.sh

# Production
STRIPE_SECRET_KEY=sk_live_... bash scripts/setup-stripe-products.sh
```

Output: `.stripe-ids.env` with all product/price IDs.

### 2. Deploy the Worker

```bash
cd workers/stripe

# Set secrets (never commit keys)
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET

# Deploy
wrangler deploy
```

### 3. Register Webhook

In [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks):
- **URL:** `https://blackroad-stripe.<account>.workers.dev/webhook`
- **Events:** `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`
- Copy the **Signing Secret** (`whsec_...`) → set as `STRIPE_WEBHOOK_SECRET`

### 4. Generate Checkout Page

```bash
source .stripe-ids.env

br brand new checkout \
  --title "BlackRoad Pro" \
  --price '$49/mo' \
  --price-id "$STRIPE_PRICE_PRO_MONTHLY" \
  --worker "https://blackroad-stripe.<account>.workers.dev" \
  --feature "All 16 brand templates" \
  --feature "br brand deploy" \
  --feature "Stripe checkout" \
  --cta "Start Free Trial" \
  --output ./site/checkout/index.html
```

---

## Worker Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/health` | Status check |
| `POST` | `/checkout` | Create Checkout Session → `{ url }` |
| `POST` | `/portal` | Create Billing Portal session → `{ url }` |
| `POST` | `/webhook` | Stripe event webhook (signature verified) |
| `GET` | `/prices` | List all active prices with product info |

---

## Products

| Product | Price | Notes |
|---------|-------|-------|
| BlackRoad Starter | $0/mo | Free forever |
| BlackRoad Pro | $49/mo or $490/yr | Full brand kit |
| BlackRoad Enterprise | $299/mo | Multi-seat + SLA |

---

## Security

- API keys are **never in source code** — only set via `wrangler secret put`
- Webhook signatures verified with HMAC-SHA256 (5-minute tolerance window)
- CORS locked to `ALLOWED_ORIGIN`
- All Stripe API calls are server-side — keys never reach the browser
