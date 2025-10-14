#!/bin/bash

# Simple Album Manager for jadewii.com
# Just drag and drop your album art!

echo "🎵 JADEWII.COM ALBUM MANAGER"
echo "================================"
echo ""

# Folders
FRONT_COVERS_DIR="$HOME/Documents/albums-optimized"
BACK_COVERS_DIR="$HOME/Documents/backcovers"
WEBSITE_DIR="$HOME/jadewii.com"
PUBLIC_ARTWORK_DIR="$WEBSITE_DIR/public/artwork"

# Create directories if they don't exist
mkdir -p "$FRONT_COVERS_DIR"
mkdir -p "$BACK_COVERS_DIR"
mkdir -p "$PUBLIC_ARTWORK_DIR"

echo "📁 Your folders:"
echo "   Front covers: $FRONT_COVERS_DIR"
echo "   Back covers:  $BACK_COVERS_DIR"
echo ""

# Function to optimize and copy images
process_albums() {
    echo "🔄 Processing album art..."
    echo ""

    # Copy front covers
    if [ -d "$FRONT_COVERS_DIR" ]; then
        for img in "$FRONT_COVERS_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
            [ -f "$img" ] || continue
            filename=$(basename "$img")
            echo "✓ Front: $filename"
            cp "$img" "$PUBLIC_ARTWORK_DIR/"
        done
    fi

    # Copy back covers
    if [ -d "$BACK_COVERS_DIR" ]; then
        for img in "$BACK_COVERS_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
            [ -f "$img" ] || continue
            filename=$(basename "$img")
            echo "✓ Back:  $filename"
            cp "$img" "$PUBLIC_ARTWORK_DIR/"
        done
    fi

    echo ""
    echo "✅ Done! Album art copied to website."
}

# Function to build and deploy
deploy() {
    echo ""
    echo "🚀 Building and deploying website..."
    echo ""

    cd "$WEBSITE_DIR" || exit

    # Build
    echo "Building..."
    npm run build

    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Build successful!"
        echo ""
        echo "📤 Deploying..."

        # Commit and push
        git add public/artwork
        git commit -m "Update album artwork

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
        git push origin main

        echo ""
        echo "✅ DEPLOYED! Your site will update in 1-2 minutes."
        echo "   Visit: https://jadewii.com"
    else
        echo "❌ Build failed. Check errors above."
    fi
}

# Main menu
while true; do
    echo ""
    echo "What do you want to do?"
    echo "1. Copy album art from folders"
    echo "2. Build and deploy website"
    echo "3. Do both (copy + deploy)"
    echo "4. Open album art folders"
    echo "5. Quit"
    echo ""
    read -p "Choose (1-5): " choice

    case $choice in
        1)
            process_albums
            ;;
        2)
            deploy
            ;;
        3)
            process_albums
            deploy
            ;;
        4)
            open "$FRONT_COVERS_DIR"
            open "$BACK_COVERS_DIR"
            echo "📂 Opened folders"
            ;;
        5)
            echo "👋 Bye!"
            exit 0
            ;;
        *)
            echo "Invalid choice"
            ;;
    esac
done
