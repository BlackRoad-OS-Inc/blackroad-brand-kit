# BlackRoad OS — Stripe Checkout Worker

Cloudflare Worker that powers the Stripe checkout flow for BlackRoad OS brand kit sites.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/checkout` | Create a Stripe Checkout Session → returns `{ url }` |
| `POST` | `/portal` | Create a Stripe Billing Portal session |
| `POST` | `/webhook` | Receive & verify Stripe webhook events |
| `GET`  | `/prices` | List all active prices (for dynamic pricing UI) |
| `GET`  | `/health` | Health check |

## Deploy

```bash
# 1. Login to Cloudflare
wrangler login

# 2. Set secrets
wrangler secret put STRIPE_SECRET_KEY       # sk_live_... or sk_test_...
wrangler secret put STRIPE_WEBHOOK_SECRET   # whsec_... from Stripe Dashboard

# 3. Update ALLOWED_ORIGIN in wrangler.toml to your domain

# 4. Deploy
wrangler deploy
```

After deploying, register the webhook URL in Stripe Dashboard:
- URL: `https://blackroad-stripe.<account>.workers.dev/webhook`
- Events: `checkout.session.completed`, `customer.subscription.created`,
  `customer.subscription.updated`, `customer.subscription.deleted`,
  `invoice.payment_succeeded`, `invoice.payment_failed`

## Test

```bash
# Health check
curl https://blackroad-stripe.<account>.workers.dev/health

# List prices
curl https://blackroad-stripe.<account>.workers.dev/prices

# Create checkout session
curl -X POST https://blackroad-stripe.<account>.workers.dev/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "price_id": "price_1T3nxYChUUSEbzyhRA8XeENr",
    "success_url": "https://yourdomain.com/success",
    "cancel_url": "https://yourdomain.com/cancel"
  }'
```

## Current Stripe Products (test mode)

| Plan | Price ID | Amount |
|------|----------|--------|
| Starter | `price_1T3nxXChUUSEbzyhGk3i5V1R` | Free |
| Pro (monthly) | `price_1T3nxYChUUSEbzyhRA8XeENr` | $49/mo |
| Pro (yearly) | `price_1T3nxYChUUSEbzyhNgThPjFQ` | $490/yr |
| Enterprise | `price_1T3nyzChUUSEbzyhYjASdHjR` | $299/mo |

## Without the Worker (static sites)

If you don't need webhook handling, use Stripe Payment Links directly:

```bash
br brand new checkout \
  --title "Pro Plan" \
  --price "$49/mo" \
  --payment-link "https://buy.stripe.com/test_fZu3cubyb2ZMdDqcNT4ko07" \
  --feature "50 agents" --feature "Priority support" \
  --output ./site/checkout/index.html
```
