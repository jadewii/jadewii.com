# Stripe Setup Guide for JAde Wii Music Store

## Prerequisites
- Stripe account (https://dashboard.stripe.com)
- AWS S3 account for file hosting
- Resend account for email delivery (https://resend.com)

## Step 1: Create Album ZIP Files
Run the script to create ZIP files for all your albums:
```bash
./scripts/create-album-zips.sh
```
This will create ZIPs in `/Users/jade/music-store/album-zips/`

## Step 2: Upload to S3
1. Create an S3 bucket (e.g., `jadewii-music-downloads`)
2. Upload all ZIP files maintaining the folder structure:
   - singles/
   - mixtapes/
   - modular/
   - electronic/

## Step 3: Create Stripe Products
For each album in Stripe Dashboard:

1. Go to Products → Add Product
2. Fill in:
   - Name: Album title (e.g., "Honey")
   - Description: Album description
   - Price: Set your price (e.g., $10.00)
   - Currency: USD
   - Payment type: One-time

3. After creating, copy the Price ID (starts with `price_`)

## Step 4: Update products.js
Update each product with:
```javascript
stripePriceId: 'price_YOUR_ACTUAL_ID',
downloadFile: 'mixtapes/Honey.zip' // S3 path
```

## Step 5: Configure Environment Variables
Create/update `.env.local`:
```
# Stripe
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
S3_BUCKET=jadewii-music-downloads

# Email (Resend)
RESEND_API_KEY=re_YOUR_KEY
EMAIL_FROM=JAde Wii <noreply@your-domain.com>

# Site
SITE_URL=https://your-domain.com

# Security
DOWNLOAD_JWT_SECRET=YOUR_RANDOM_SECRET_KEY
```

## Step 6: Set Up Stripe Webhook
1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhook`
3. Select event: `checkout.session.completed`
4. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

## Step 7: Test the Flow
1. Use Stripe test mode
2. Test card: 4242 4242 4242 4242
3. Any future expiry and CVC

## Monitoring
- Check Stripe Dashboard for payments
- Monitor webhook events in Stripe
- Check server logs for email delivery

## Production Checklist
- [ ] All album ZIPs uploaded to S3
- [ ] All products created in Stripe
- [ ] products.js updated with real Price IDs
- [ ] Environment variables configured
- [ ] Webhook endpoint configured
- [ ] Email domain verified in Resend
- [ ] SSL certificate active on domain
- [ ] Switch to Stripe live mode keys