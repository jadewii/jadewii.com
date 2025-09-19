#!/bin/bash

# Create sample ZIP files for testing B2 integration
# These are placeholder ZIPs with the audio preview file as content

echo "Creating sample ZIP files for testing..."

mkdir -p album-zips/mixtapes

# Create sample ZIPs for first 3 albums
echo "Creating Charlie's DOOMED Christmas ZIP..."
cd /Users/jade/music-store/public/audio
zip -q /Users/jade/music-store/album-zips/mixtapes/charlies-doomed-christmas.zip charlies-doomed-christmas.mp3

echo "Creating Common Side Effects ZIP..."
zip -q /Users/jade/music-store/album-zips/mixtapes/common-side-effects.zip common-side-effects.mp3

echo "Creating Honey ZIP..."
zip -q /Users/jade/music-store/album-zips/mixtapes/honey.zip honey.mp3

cd /Users/jade/music-store

echo ""
echo "✅ Sample ZIP files created!"
echo ""
echo "📦 Test files ready in: /Users/jade/music-store/album-zips/"
echo ""
echo "These are sample files for testing. When ready, you'll create full album ZIPs from your actual music files."
echo ""
echo "Next steps:"
echo "1. Go to https://www.backblaze.com/b2/ and sign up (free)"
echo "2. Create a private bucket called 'jadewii-albums'"
echo "3. Get your API keys"
echo "4. Upload these test ZIPs to B2"
echo "5. Update .env.local with your B2 credentials"
echo ""
echo "Once B2 is set up, purchases will automatically deliver secure download links!"