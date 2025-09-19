# 🏪 HOW TO MAKE YOUR STORE WORK WITH REAL PAYMENTS

## Step 1: Get Your Stripe Account
1. Go to https://stripe.com
2. Sign up for a free account
3. Go to https://dashboard.stripe.com/apikeys
4. Copy your **Test Keys** (for testing)

## Step 2: Add Your Stripe Keys
Edit the `.env.local` file and add:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[your-key-here]
STRIPE_SECRET_KEY=sk_test_[your-secret-key-here]
```

## Step 3: Create Products in Stripe
1. Go to https://dashboard.stripe.com/products
2. Click "Add Product"
3. For each album:
   - Name: Album title
   - Price: Your price
   - One-time payment
4. Copy the Price ID (starts with `price_`)
5. Update `/lib/data/products.js` - replace `price_REPLACE_ME` with your Price ID

## Step 4: Set Up Webhooks (for secure delivery)
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-domain.com/api/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook secret
5. Add to `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_[your-secret]`

---

# 📂 WHERE TO PUT YOUR FILES

## When Adding New Music:

### 1. ZIP File (What customers download)
Drop it in: `/public/downloads/`
Name it: `album-name.zip`

### 2. Album Cover (The artwork)
Drop it in: `/public/artwork/`
Name it: `album-name.jpg`

### 3. Add to Products Database
Edit: `/lib/data/products.js`
Add:
```javascript
{
  id: 'album-name',
  title: 'Your Album Title',
  artist: 'JAde Wii',
  price: 10.00,
  type: 'album',
  category: 'electronic', // or 'mixtapes', 'modular', 'lofi'
  image: '/artwork/album-name.jpg',
  trackList: ['Track 1', 'Track 2'],
  stripePriceId: 'price_YOUR_STRIPE_PRICE_ID',
  downloadFile: '/downloads/album-name.zip'
}
```

### 4. Create Preview (I'll help with this)
- Extract 10 seconds from the ZIP
- Save as: `/public/audio/album-name.mp3`

---

## 🚀 To Deploy Live:

1. Get a domain (like jadewii.com)
2. Deploy to Vercel: https://vercel.com
3. Switch to Stripe Live Keys
4. Update domain in `.env.local`

That's it! Your store will be live and accepting real payments! 💳