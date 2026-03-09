# [Service/Platform] Deployment Guide

**Deploy [Service Name] to [Platform] in 5 minutes**

---

## Prerequisites Check

```bash
# Check required tools
which railway && echo "✅ Railway CLI installed" || echo "❌ Install Railway CLI"
which wrangler && echo "✅ Wrangler installed" || echo "❌ Install Wrangler"
which vercel && echo "✅ Vercel CLI installed" || echo "❌ Install Vercel CLI"

# Check environment
cd ~/blackroad-sandbox
[ -f .env ] && echo "✅ .env exists" || echo "❌ Create .env file"
```

---

## Method 1: Automated Deployment (Recommended)

```bash
# Deploy everything with one command
cd ~/blackroad-sandbox
./deploy-[service]-[platform].sh

# Verify deployment
curl https://[service].[domain]/health
```

---

## Method 2: Manual Deployment

### Step 1: Prepare Environment

```bash
# Navigate to project
cd ~/blackroad-sandbox

# Pull latest code
git pull origin main

# Install dependencies
pip3 install -r requirements.txt

# Verify environment variables
source .env
echo "Token: ${PLATFORM_TOKEN:0:10}..."
```

### Step 2: Deploy to [Platform]

```bash
# Link to project
[platform] link [project-id]

# Set environment variables
[platform] env set KEY=value

# Deploy
[platform] deploy

# Verify
[platform] status
```

### Step 3: Verify Deployment

```bash
# Check deployment status
[platform] status

# Test health endpoint
curl https://[service].[domain]/health

# View logs
[platform] logs --tail 100
```

---

## Railway Deployment

### Quick Deploy

```bash
# Set token
export RAILWAY_TOKEN=your-token-here

# Link to project
railway link 0c7bcf07-307b-4db6-9c94-22a456500d68

# Deploy service
railway up --service [service-name]

# Check status
railway status

# View logs
railway logs --tail 100

# Get deployment URL
railway domain --json
```

### Deploy Multiple Services

```bash
# Deploy all services
cd ~/blackroad-sandbox

services=(
  "api-gateway"
  "auth-api"
  "event-bus"
  "integrations-hub"
)

for service in "${services[@]}"; do
  echo "Deploying $service..."
  railway up --service $service
  sleep 5
done

# Verify all
railway status
```

### Update Secrets

```bash
# Set individual secret
railway variables set STRIPE_KEY=sk_live_...

# Set multiple secrets
railway variables set \
  STRIPE_KEY=sk_live_... \
  CLERK_KEY=sk_... \
  OPENAI_KEY=sk-...

# Verify secrets
railway variables
```

---

## Cloudflare Deployment

### Deploy Worker

```bash
# Navigate to workers directory
cd ~/blackroad-sandbox/cloudflare-workers

# Deploy worker
wrangler deploy [worker-name].js --config wrangler-[worker-name].toml

# Initialize database
wrangler d1 execute blackroad-users --file=../cloudflare-d1-schemas.sql

# Verify deployment
curl https://[worker].[domain]/health
```

### Deploy Pages

```bash
# Navigate to site directory
cd ~/blackroad-sandbox/domains/[domain-name]

# Deploy to Cloudflare Pages
wrangler pages deploy . --project-name=[project-name]

# Check deployment
wrangler pages deployment list --project-name=[project-name]

# View live site
open https://[project-name].pages.dev
```

---

## Rollback Procedures

### Railway Rollback

```bash
# View recent deployments
railway status --service [service-name]

# Rollback to previous deployment
railway rollback --service [service-name]

# Verify
railway logs --tail 100
```

### Cloudflare Rollback

```bash
# List deployments
wrangler pages deployment list --project-name=[project-name]

# Rollback to specific deployment
wrangler pages deployment rollback [deployment-id]

# Verify
curl https://[project-name].pages.dev
```

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]

# Verify
vercel inspect
```

---

## Post-Deployment Verification

### Health Checks

```bash
# Check all service endpoints
endpoints=(
  "https://api.blackroad.io/health"
  "https://agents.blackroad.io/health"
  "https://integrations.blackroad.io/api/health"
)

for endpoint in "${endpoints[@]}"; do
  echo "Checking $endpoint..."
  curl -sf "$endpoint" && echo "✅" || echo "❌"
done
```

### Smoke Tests

```bash
# Run smoke tests
cd ~/blackroad-sandbox
pytest tests/smoke/ -v

# Test critical paths
curl https://api.blackroad.io/health
curl https://api.blackroad.io/status
curl https://blackroad.io/
```

---

## Security Checklist

```bash
# ✅ Secrets in environment variables (not code)
# ✅ HTTPS enabled for all endpoints
# ✅ CORS configured properly
# ✅ Rate limiting enabled
# ✅ Authentication required for sensitive endpoints
# ✅ Regular dependency updates
# ✅ Security headers configured

# Verify security headers
curl -I https://[service].[domain]/
```

---

## Next Steps

After deployment:

1. ✅ **Verify all endpoints** respond correctly
2. ✅ **Check logs** for any errors
3. ✅ **Run smoke tests** to validate critical paths
4. ✅ **Monitor metrics** for the first hour
5. ✅ **Update documentation** with any changes
6. ✅ **Notify team** of deployment

---

## Copyright

```
# ============================================================================
# BlackRoad OS - Proprietary Software
# Copyright (c) 2025 BlackRoad OS, Inc. / Alexa Louise Amundson
# All Rights Reserved.
# ============================================================================
```
