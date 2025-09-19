# 🚀 SIMPLIFIED DEPLOYMENT GUIDE FOR JADE WII MUSIC STORE

## Overview
Your store now uses a **simple, secure setup**:
- ✅ Stripe Payment Links (no complex checkout)
- ✅ Secure file storage (B2/S3)
- ✅ JWT-based download system
- ✅ Email delivery with Resend
- ✅ Two serverless functions total

## STEP 1: Create Stripe Products & Payment Links

1. Go to https://dashboard.stripe.com/products
2. For each album/product:
   - Click **+ Add Product**
   - Name: Album title
   - Price: Your price
   - Click **Create Payment Link**
   - Save:
     - The Payment Link URL
     - The Price ID (starts with `price_`)

## STEP 2: Set Up Backblaze B2 (File Storage)

1. **Create B2 Account** (free 10GB): https://www.backblaze.com/b2/
2. **Create a Private Bucket** called `jadewii-music`
3. **Upload your ZIP files** to folders like:
   - `albums/honey.zip`
   - `albums/wabi-sabi.zip`
   - `packs/boombap-drumbreaks-vol-1.zip`
4. **Get your API credentials**:
   - Go to App Keys → Create New App Key
   - Save the `keyID` and `applicationKey`

## STEP 3: Update Your Code

### Update the PRODUCT_MAP in `/app/api/claim/route.js`:
Map your Stripe Price IDs to B2 file paths:
```javascript
const PRODUCT_MAP = {
  "price_1QaBC123": ["albums/honey.zip"],
  "price_1QaBC456": ["albums/wabi-sabi.zip"],
  // Add all your products
}
```

### Update Payment Links in `/lib/stripe-products.js`:
```javascript
export const PAYMENT_LINKS = {
  'honey': 'https://buy.stripe.com/xxx',
  'wabi-sabi': 'https://buy.stripe.com/yyy',
  // Add all your payment links
}
```

### Update products in `/lib/data/products.js`:
Add the payment link to each product:
```javascript
{
  id: 'honey',
  title: 'HONEY',
  paymentLink: 'https://buy.stripe.com/xxx', // Add this line
  // ... rest of product data
}
```

## STEP 4: Environment Variables

Create `.env.local`:
```env
# Site URL
SITE_URL=https://jadewii.vercel.app
NEXT_PUBLIC_SITE_URL=https://jadewii.vercel.app

# JWT Secret (generate a random string)
DOWNLOAD_JWT_SECRET=your_random_secret_string_here

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Backblaze B2 (works with S3 API)
AWS_REGION=us-west-002
S3_BUCKET=jadewii-music
AWS_ACCESS_KEY_ID=your_b2_keyID
AWS_SECRET_ACCESS_KEY=your_b2_applicationKey
AWS_ENDPOINT=https://s3.us-west-002.backblazeb2.com

# Resend (for emails)
RESEND_API_KEY=re_xxx
EMAIL_FROM=JAde Wii <downloads@jadewii.com>
```

## STEP 5: Push to GitHub

```bash
git init
git add .
git commit -m "JAde Wii Music Store"
git branch -M main
git remote add origin https://github.com/yourusername/music-store.git
git push -u origin main
```

## STEP 6: Deploy to Vercel

1. **Import to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repo
   - Add ALL environment variables from Step 4
   - Deploy!

2. **Set up Stripe Webhook**:
   - In Stripe Dashboard → Webhooks
   - Add endpoint: `https://jadewii.vercel.app/api/webhook`
   - Select event: `checkout.session.completed`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET` env var

## STEP 7: Test Everything

1. Make a test purchase with Stripe test mode
2. Check that email is sent
3. Click the claim link in email
4. Downloads should work!

## How It Works:

1. **Customer clicks Buy** → Goes to Stripe Payment Link
2. **Customer pays** → Stripe sends webhook to your site
3. **Webhook sends email** → With JWT claim link
4. **Customer clicks link** → Gets 24-hour download URLs
5. **Files stay secure** → In private B2 storage

## File Structure:

```
/public
  /artwork        ← Album covers (public)
  /audio         ← Preview MP3s (public)

/app/api
  /webhook       ← Stripe webhook (sends emails)
  /claim        ← Download page (verifies JWT, creates S3 links)

Backblaze B2:
  /albums        ← Full album ZIPs (private)
  /packs        ← Sample pack ZIPs (private)
```

## Costs:
- **Stripe**: 2.9% + 30¢ per sale
- **Backblaze B2**: First 10GB free, then $0.006/GB
- **Vercel**: Free tier (100GB bandwidth/month)
- **Resend**: 100 emails/day free

## Security:
✅ Files are NOT publicly accessible
✅ Download links expire after 24 hours
✅ JWT tokens expire after 30 days
✅ No user accounts needed
✅ Simple, secure, scalable

---

## Quick Commands:

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Deploy (after pushing to GitHub)
# Vercel auto-deploys from GitHub
```

## Need Help?

The system is now MUCH simpler:
- Just 2 API endpoints
- No complex checkout flow
- No user management
- Stripe handles all payment complexity
- B2/S3 handles secure storage