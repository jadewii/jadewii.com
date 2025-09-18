#!/bin/bash

# Create album ZIPs for JAde Wii music store
# This script creates downloadable ZIP files for each album containing:
# - Full-length tracks (MP3 or WAV)
# - Album artwork
# - Track list metadata

MUSIC_DIR="/Users/jade/Library/Mobile Documents/com~apple~CloudDocs/Music/JAde Wii Discography"
OUTPUT_DIR="/Users/jade/music-store/album-zips"

# Create output directory
mkdir -p "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/singles"
mkdir -p "$OUTPUT_DIR/mixtapes"
mkdir -p "$OUTPUT_DIR/modular"
mkdir -p "$OUTPUT_DIR/electronic"

echo "Creating album ZIPs for JAde Wii music store..."
echo "==========================================="

# Function to create ZIP for an album
create_album_zip() {
    local album_path="$1"
    local output_path="$2"
    local album_name="$(basename "$album_path")"

    if [ -d "$album_path" ]; then
        echo "Creating ZIP for: $album_name"

        # Create temp directory for album contents
        temp_dir="/tmp/album_${RANDOM}"
        mkdir -p "$temp_dir"

        # Copy all audio files (MP3, WAV, AIFF)
        find "$album_path" -type f \( -iname "*.mp3" -o -iname "*.wav" -o -iname "*.aiff" \) -exec cp {} "$temp_dir/" \;

        # Copy album artwork if exists
        find "$album_path" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec cp {} "$temp_dir/" \;

        # Create track list file
        echo "Track List for $album_name" > "$temp_dir/tracklist.txt"
        echo "========================" >> "$temp_dir/tracklist.txt"
        find "$album_path" -type f \( -iname "*.mp3" -o -iname "*.wav" -o -iname "*.aiff" \) -exec basename {} \; | sort >> "$temp_dir/tracklist.txt"

        # Create the ZIP file
        cd "$temp_dir"
        zip -r "$output_path/${album_name}.zip" .
        cd -

        # Clean up temp directory
        rm -rf "$temp_dir"

        echo "✓ Created: $output_path/${album_name}.zip"
    fi
}

# Process MIX TAPES
echo ""
echo "Processing MIX TAPES..."
echo "-----------------------"
if [ -d "$MUSIC_DIR/MIX TAPES" ]; then
    for album in "$MUSIC_DIR/MIX TAPES"/*; do
        if [ -d "$album" ]; then
            create_album_zip "$album" "$OUTPUT_DIR/mixtapes"
        fi
    done
fi

# Process SINGLES
echo ""
echo "Processing SINGLES..."
echo "--------------------"
if [ -d "$MUSIC_DIR/SINGLES" ]; then
    for single in "$MUSIC_DIR/SINGLES"/*; do
        if [ -f "$single" ] && [[ "$single" == *.mp3 || "$single" == *.wav ]]; then
            single_name="$(basename "$single" | sed 's/\.[^.]*$//')"
            echo "Creating ZIP for single: $single_name"

            temp_dir="/tmp/single_${RANDOM}"
            mkdir -p "$temp_dir"
            cp "$single" "$temp_dir/"

            cd "$temp_dir"
            zip -r "$OUTPUT_DIR/singles/${single_name}.zip" .
            cd -

            rm -rf "$temp_dir"
            echo "✓ Created: $OUTPUT_DIR/singles/${single_name}.zip"
        fi
    done
fi

# Process MODULAR
echo ""
echo "Processing MODULAR..."
echo "--------------------"
if [ -d "$MUSIC_DIR/MODULAR" ]; then
    for album in "$MUSIC_DIR/MODULAR"/*; do
        if [ -d "$album" ]; then
            create_album_zip "$album" "$OUTPUT_DIR/modular"
        fi
    done
fi

# Process ELECTRONIC
echo ""
echo "Processing ELECTRONIC..."
echo "------------------------"
if [ -d "$MUSIC_DIR/ELECTRONIC" ]; then
    for album in "$MUSIC_DIR/ELECTRONIC"/*; do
        if [ -d "$album" ]; then
            create_album_zip "$album" "$OUTPUT_DIR/electronic"
        fi
    done
fi

echo ""
echo "==========================================="
echo "✓ Album ZIP creation complete!"
echo "Output directory: $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "1. Review the generated ZIP files"
echo "2. Upload them to your S3 bucket"
echo "3. Update products.js with the correct S3 paths"
echo ""
echo "Total ZIPs created:"
find "$OUTPUT_DIR" -name "*.zip" | wc -l