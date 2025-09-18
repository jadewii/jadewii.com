#!/bin/bash

# Create placeholder images for albums without artwork
# These are simple colored squares with the album title

IMAGES_DIR="/Users/jade/music-store/public/images/albums"
mkdir -p "$IMAGES_DIR"

# Function to create a placeholder image using ImageMagick or create a simple HTML placeholder
create_placeholder() {
    local id="$1"
    local title="$2"
    local color="$3"
    local output="$IMAGES_DIR/${id}.jpg"

    # Skip if image already exists
    if [ -f "$output" ]; then
        echo "  ✓ Image exists: ${id}.jpg"
        return
    fi

    # Try to use ImageMagick if available
    if command -v convert &> /dev/null; then
        convert -size 500x500 xc:"$color" \
                -gravity center -pointsize 30 -fill white \
                -annotate +0+0 "$title" \
                "$output"
        echo "  ✓ Created: ${id}.jpg"
    else
        # Create a simple placeholder file to mark it needs real artwork
        echo "$title" > "$output.txt"
        echo "  ⚠ Needs artwork: ${id}.jpg"
    fi
}

echo "Creating placeholder artwork for albums..."
echo "=========================================="

# LOFI albums
echo "LOFI Albums:"
create_placeholder "confessions-of-a-samurai" "Confessions\nof a\nSamurai" "#4A5568"
create_placeholder "geisha-dreams" "Geisha\nDreams" "#805AD5"
create_placeholder "habit-garden" "Habit\nGarden" "#48BB78"
create_placeholder "milk-district" "Milk\nDistrict" "#F6E05E"
create_placeholder "propagated-mind" "Propagated\nMind" "#ED8936"
create_placeholder "stealin-dreams" "Stealin'\nDreams" "#4299E1"

echo ""
echo "Note: Replace these placeholder images with actual album artwork"