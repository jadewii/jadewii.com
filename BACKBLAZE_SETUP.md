# Backblaze B2 Setup for Album Storage

## Quick Setup (10 minutes)

### 1. Create Backblaze Account
- Go to: https://www.backblaze.com/b2/
- Sign up (free to start)
- First 10GB free!

### 2. Create a Private Bucket
1. Click "Create a Bucket"
2. Name: `jadewii-albums`
3. Files: **Private** (important!)
4. Click "Create"

### 3. Get Your API Keys
1. Go to "App Keys"
2. Click "Add a New Application Key"
3. Name: "Music Store"
4. Save these:
   - `keyID`: (your key ID)
   - `applicationKey`: (your secret key)

### 4. Upload Your Album Files
Use Backblaze web interface or their CLI:
```bash
# Install B2 CLI
pip install b2

# Login
b2 authorize-account YOUR_KEY_ID YOUR_APP_KEY

# Upload all albums
b2 sync /path/to/albums b2://jadewii-albums/
```

### 5. Update Your .env.local
```
# Backblaze B2
B2_KEY_ID=your_key_id_here
B2_APPLICATION_KEY=your_app_key_here
B2_BUCKET_NAME=jadewii-albums
```

## File Structure in B2:
```
jadewii-albums/
├── mixtapes/
│   ├── charlies-doomed-christmas.zip
│   ├── common-side-effects.zip
│   └── ...
├── modular/
│   ├── a-bit-of-red-in-the-blue.zip
│   └── ...
├── electronic/
│   └── ...
└── lofi/
    └── ...
```

## Why Backblaze?
- **Cost**: ~$6/month for ALL your albums
- **Secure**: Files are private, served with temporary signed URLs
- **Fast**: CDN included
- **Reliable**: 99.9% uptime

That's it! Your files are secure and ready to sell!