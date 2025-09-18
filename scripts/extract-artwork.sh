#!/bin/bash

# Extract artwork from all ZIP files and organize them

DOWNLOADS_DIR="/Users/jade/music-store/downloads"
IMAGES_DIR="/Users/jade/music-store/public/images/albums"
TEMP_DIR="/tmp/artwork-extraction"

# Create directories
mkdir -p "$IMAGES_DIR"
mkdir -p "$TEMP_DIR"

echo "Extracting artwork from all album ZIPs..."
echo "=========================================="
echo ""

# Function to extract and copy artwork
extract_artwork() {
    local zip_file="$1"
    local category="$2"
    local temp_extract="$TEMP_DIR/extract_$$_$RANDOM"

    # Get album name from ZIP filename
    local album_name=$(basename "$zip_file" .zip | sed 's/JAde Wii - //')

    # Create ID-friendly name (matching products.js)
    local album_id=$(echo "$album_name" | tr '[:upper:]' '[:lower:]' | sed "s/['']//" | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/-$//')

    echo "Checking: $album_name"

    # Create temp extraction directory
    mkdir -p "$temp_extract"

    # Extract only image files from ZIP
    unzip -j -q "$zip_file" "*.jpg" "*.jpeg" "*.png" "*.JPG" "*.JPEG" "*.PNG" -d "$temp_extract" 2>/dev/null

    # Check if any images were extracted
    image_count=$(ls -1 "$temp_extract" 2>/dev/null | wc -l)

    if [ $image_count -gt 0 ]; then
        # Find the largest image (usually the album cover)
        largest_image=$(ls -S "$temp_extract" | head -1)

        if [ -n "$largest_image" ]; then
            # Copy and rename to match album ID
            cp "$temp_extract/$largest_image" "$IMAGES_DIR/${album_id}.jpg"
            echo "  ✓ Extracted artwork: ${album_id}.jpg"
        fi
    else
        echo "  ⚠ No artwork found"
    fi

    # Clean up temp directory
    rm -rf "$temp_extract"
}

# Process each category
for category in mixtapes modular electronic lofi; do
    echo ""
    echo "=== Processing $category ==="
    echo "----------------------------"

    if [ -d "$DOWNLOADS_DIR/$category" ]; then
        for zip_file in "$DOWNLOADS_DIR/$category"/*.zip; do
            if [ -f "$zip_file" ]; then
                extract_artwork "$zip_file" "$category"
            fi
        done
    fi
done

# Clean up
rm -rf "$TEMP_DIR"

echo ""
echo "=========================================="
echo "✓ Artwork extraction complete!"
echo ""

# Count results
total_images=$(ls -1 "$IMAGES_DIR"/*.jpg 2>/dev/null | wc -l)
echo "Total album artwork files: $total_images"
echo "Location: $IMAGES_DIR"
echo ""

# List albums still missing artwork
echo "Albums that may need artwork:"
echo "------------------------------"
missing_count=0
for category in mixtapes modular electronic lofi; do
    if [ -d "$DOWNLOADS_DIR/$category" ]; then
        for zip_file in "$DOWNLOADS_DIR/$category"/*.zip; do
            if [ -f "$zip_file" ]; then
                album_name=$(basename "$zip_file" .zip | sed 's/JAde Wii - //')
                album_id=$(echo "$album_name" | tr '[:upper:]' '[:lower:]' | sed "s/['']//" | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/-$//')

                if [ ! -f "$IMAGES_DIR/${album_id}.jpg" ]; then
                    echo "  - $album_name (${album_id}.jpg)"
                    ((missing_count++))
                fi
            fi
        done
    fi
done

if [ $missing_count -eq 0 ]; then
    echo "  None - all albums have artwork!"
fi

echo ""
echo "Next steps:"
echo "1. Review extracted artwork in $IMAGES_DIR"
echo "2. Replace any incorrect images if needed"
echo "3. Add artwork for any missing albums"