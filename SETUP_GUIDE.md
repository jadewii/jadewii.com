# Music Store Setup Guide

## How to Add Your Music

### 1. Preview Files (For Streaming)
Place low-quality MP3s (128kbps) in `/public/audio/previews/`
- These are for the website player only
- Name them: `track1.mp3`, `track2.mp3`, etc.

### 2. Album Artwork
Place album covers in `/public/images/albums/`
- Recommended size: 500x500px
- Format: JPG or PNG

### 3. Full Quality Downloads (Secure Storage)

#### Option A: Local Development
Create a folder outside the public directory:
```
/music-store-files/
  /albums/
    album1_320.zip
    album1_wav.zip
    album1_flac.zip
  /sample-packs/
    samplepack1.zip
```

#### Option B: Cloud Storage (Recommended for Production)

**Using Supabase (Free tier available):**
1. Create account at supabase.com
2. Create a new project
3. Go to Storage → Create bucket "music-files"
4. Upload your ZIP files
5. Add Supabase credentials to `.env.local`

**Using AWS S3:**
1. Create S3 bucket
2. Upload files
3. Set bucket to private
4. Add AWS credentials to `.env.local`

## File Preparation

### For Albums:
1. Create separate ZIP files for each format:
   - `album_name_mp3_320.zip` - 320kbps MP3s
   - `album_name_wav.zip` - WAV files
   - `album_name_flac.zip` - FLAC files

2. Include in each ZIP:
   - All track files
   - Cover art (high-res)
   - Credits.txt
   - License.txt (if needed)

### For Sample Packs:
1. Organize samples by type in folders
2. Include BPM in filename (e.g., `kick_808_90bpm.wav`)
3. Add readme with usage rights

## Payment Setup (Stripe)

1. Create Stripe account
2. Get your API keys from Stripe Dashboard
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   ```

## Running the Store

```bash
npm run dev
```

Visit http://localhost:3000

## Customer Purchase Flow

1. Customer browses products
2. Listens to preview tracks
3. Adds to cart
4. Checkout with Stripe
5. Receives email with download link
6. Link expires after 24 hours
7. Can download up to 5 times