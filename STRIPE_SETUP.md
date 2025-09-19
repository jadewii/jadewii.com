# Setting Up Stripe Payment Links for JAde Wii Music Store

## Quick Setup - Using Payment Links (Simplest Method!)

Payment Links are the easiest way - no webhooks, no API keys needed for basic sales!

### Step 1: Go to Stripe Dashboard
Log into: https://dashboard.stripe.com/payment-links

### Step 2: Create Your First Payment Link

1. Click **"Create payment link"**
2. Fill in:
   - **Product name**: Charlie's DOOMED Christmas
   - **Description**: Digital Album by JAde Wii
   - **Price**: $10.00
   - **Quantity**: Customer can't adjust quantity

3. Under **"After payment"**:
   - ✅ Don't show confirmation page
   - ✅ Collect customer emails
   - Add success URL: `https://jadewii.com/thank-you`

4. Click **"Create link"**
5. Copy the payment link (looks like: `https://buy.stripe.com/...`)

### Step 3: Speed Up - Use Duplicate!

After creating your first Payment Link:
1. Click the "..." menu → **Duplicate**
2. Just change the product name
3. Save and copy the new link
4. Repeat for all albums

### Step 4: Update Your products.js

Open `/Users/jade/music-store/lib/data/products.js` and add Payment Links:

```javascript
{
  id: 'charlies-doomed-christmas',
  title: 'Charlie\'s DOOMED Christmas',
  stripePaymentLink: 'https://buy.stripe.com/YOUR_ACTUAL_LINK_HERE',  // ← Add your link here
  // ... rest of product data
}
```

## All Your Albums to Create Links For:

### MIXTAPES ($10 each)
```
☐ Charlie's DOOMED Christmas
☐ Common Side Effects
☐ Dan Da Damned
☐ Drone Sightings
☐ Honey
☐ How The Grinch Chilled Christmas
☐ Rudolf The LOFI Reindeer
☐ Tiny Tape Vol. 1
☐ White Lotus
```

### MODULAR ($10 each)
```
☐ A Bit of Red in the Blue
☐ Above The Quadi
☐ Artificially Unfavored
☐ Behind the Sun
☐ Beneath the Bohdi
☐ Between the Redwood
☐ Birds of Paradise
☐ Blobs
☐ Celestial Kunzite
☐ Cosmos
☐ Creatures of the Sea
☐ Curious Pez
☐ Demodex
☐ Eidos
☐ Elder Of Agraban
☐ Enlightened Ape
☐ Euro & Chill
☐ Fish Out of Water
☐ Gem In Eye
☐ Kolossos
☐ Lady of Lords
☐ Melting Waters
☐ Mountains of Shidoh
☐ Organic Parts
☐ Pollinated Memories
☐ Remedies Granted Through Dreams
☐ Sacred Spaces
☐ Saturnian Moons
☐ Shaman's Quest
☐ Shrine of Elderon
☐ Shrooms of Discovery
☐ Silver Servant
☐ Space Dali
☐ Strange Worlds
☐ Through the Graph
☐ Tidal Dialogues
☐ Translucent Dreams
☐ Twisted Strings
☐ Unimpressed
☐ Wabi Sabi
☐ Wilderness Watts
```

### ELECTRONIC ($10 each)
```
☐ Acid Waves (Remaster)
☐ Aphids
☐ End in Mind (Remaster)
☐ Error Code
☐ Lone Manta (Remaster)
☐ Operation Love
☐ Orca Vindicated (Remaster)
☐ Penguin Aspirations (Remaster)
☐ Tiny Overtures
```

### LOFI ($10 each)
```
☐ Confessions of a Samurai
☐ Geisha Dreams
☐ Habit Garden
☐ Milk District
☐ Propagated Mind
☐ Stealin' Dreams
```

### SAMPLE PACKS ($30)
```
☐ Boombap Drumbreaks Vol. 1 - $30
```

## Test Your Setup

1. Click any "BUY +" button on your site
2. Should redirect to Stripe checkout
3. Use test card: `4242 4242 4242 4242`
4. Check payment in Stripe Dashboard

## Deploy Your Site

Once Payment Links are added:
```bash
git add .
git commit -m "Add Stripe Payment Links"
git push
```

Then deploy to Vercel/Netlify - should work now without API issues!

## Handling Digital Downloads

For now, Payment Links will just process payment. For digital delivery, you can:

**Option 1: Manual Delivery (Easiest to start)**
- Check Stripe Dashboard for new orders
- Email files manually to customers

**Option 2: Use Gumroad or SendOwl (Automated)**
- These services handle both payment AND file delivery
- More expensive but fully automated

**Option 3: Add Automation Later**
- Start with Payment Links
- Add webhook + file delivery later when ready

## That's it! 🎉

Payment Links are the simplest way to start selling. No complex setup needed!