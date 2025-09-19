#!/bin/bash

# Create directory structure for album ZIPs
mkdir -p album-zips/mixtapes
mkdir -p album-zips/modular
mkdir -p album-zips/electronic
mkdir -p album-zips/lofi

ICLOUD_DIR="/Users/jade/Library/Mobile Documents/com~apple~CloudDocs/Music/Discography"

echo "Creating ZIP files for all albums..."

# MIXTAPES
echo "Processing Mixtapes..."
cd "$ICLOUD_DIR/Mixtapes"

for album in "Charlie's DOOMED Christmas" "Common Side Effects" "Honey" "Battle of Wolves" \
             "Artificially Unfavored" "Dan Da Damned" "Drone Sightings" "Enlightened Ape" \
             "How The Grinch Chilled Christmas"; do
  if [ -d "$album" ]; then
    slug=$(echo "$album" | tr '[:upper:]' '[:lower:]' | sed "s/'//g" | sed 's/ /-/g')
    echo "  Zipping: $album -> $slug.zip"
    zip -r "/Users/jade/music-store/album-zips/mixtapes/$slug.zip" "$album" -q
  fi
done

# MODULAR JAMS
echo "Processing Modular Jams..."
cd "$ICLOUD_DIR/Modular Jams"

for album in "A Bit of Red in the Blue" "White Lotus" "Kame House Session One"; do
  if [ -d "$album" ]; then
    slug=$(echo "$album" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    echo "  Zipping: $album -> $slug.zip"
    zip -r "/Users/jade/music-store/album-zips/modular/$slug.zip" "$album" -q
  fi
done

# ELECTRONIC
echo "Processing Electronic..."
cd "$ICLOUD_DIR/Electronic"

for album in *; do
  if [ -d "$album" ]; then
    slug=$(echo "$album" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    echo "  Zipping: $album -> $slug.zip"
    zip -r "/Users/jade/music-store/album-zips/electronic/$slug.zip" "$album" -q
  fi
done

# LOFI
echo "Processing Lofi..."
cd "$ICLOUD_DIR/Lofi"

for album in *; do
  if [ -d "$album" ]; then
    slug=$(echo "$album" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    echo "  Zipping: $album -> $slug.zip"
    zip -r "/Users/jade/music-store/album-zips/lofi/$slug.zip" "$album" -q
  fi
done

echo ""
echo "✅ All albums zipped successfully!"
echo ""
echo "📦 ZIP files created in: /Users/jade/music-store/album-zips/"
echo ""
echo "Next steps:"
echo "1. Sign up for Backblaze B2: https://www.backblaze.com/b2/"
echo "2. Create a private bucket named 'jadewii-albums'"
echo "3. Get your API keys from Backblaze"
echo "4. Upload the album-zips folder to B2"
echo "5. Update .env.local with your B2 credentials"