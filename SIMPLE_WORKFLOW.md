# 🎵 SIMPLE ALBUM WORKFLOW

Stop fighting with complicated setups. Here's your dead-simple workflow:

## How It Works

1. **Drop album covers in folders** (you already have these):
   - Front covers: `~/Documents/albums-optimized/`
   - Back covers: `~/Documents/backcovers/`

2. **Run one script**:
   ```bash
   cd ~/jadewii.com
   ./add-album.sh
   ```

3. **Choose what to do**:
   - Option 1: Copy album art to website
   - Option 2: Build and deploy
   - Option 3: Do both
   - Option 4: Open the folders

## That's It!

No more:
- ❌ Repeating yourself
- ❌ Remembering complex commands
- ❌ Waiting for Claude to push
- ❌ Fighting with git

Just:
- ✅ Drop images in folders
- ✅ Run the script
- ✅ Done

## Quick Start

```bash
# Go to website folder
cd ~/jadewii.com

# Run the script
./add-album.sh

# Choose option 3 (copy + deploy)
# Wait 2 minutes
# Check https://jadewii.com
```

## Your Folders

Front covers: `~/Documents/albums-optimized/`
Back covers: `~/Documents/backcovers/`

The script automatically:
- Finds all images in those folders
- Copies them to your website
- Builds the site
- Pushes to GitHub
- Netlify auto-deploys (takes 1-2 mins)

## Need Help?

The script is at: `/Users/jade/jadewii.com/add-album.sh`

You can edit it if you want to change folders or behavior.
