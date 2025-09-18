#!/bin/bash

# Script to create previews only for new albums

DOWNLOADS_DIR="/Users/jade/music-store/downloads"
AUDIO_DIR="/Users/jade/music-store/public/audio"
TEMP_DIR="/tmp/music-previews-new"

mkdir -p "$AUDIO_DIR"
mkdir -p "$TEMP_DIR"

echo "Creating previews for NEW albums..."
echo "==================================="

# Function to create preview
create_preview() {
    local zip_file="$1"
    local output_name="$2"

    # Skip if preview already exists
    if [ -f "$AUDIO_DIR/${output_name}.mp3" ]; then
        echo "  ✓ Preview already exists: ${output_name}.mp3"
        return
    fi

    local temp_extract="$TEMP_DIR/extract_$$"

    echo "Processing: $(basename "$zip_file")"

    mkdir -p "$temp_extract"
    unzip -q "$zip_file" -d "$temp_extract"

    audio_files=$(find "$temp_extract" -type f \( -iname "*.mp3" -o -iname "*.wav" -o -iname "*.aiff" -o -iname "*.m4a" \) | sort)

    if [ -z "$audio_files" ]; then
        echo "  ⚠ No audio files found"
        rm -rf "$temp_extract"
        return
    fi

    concat_list="$temp_extract/concat.txt"
    preview_parts="$temp_extract/parts"
    mkdir -p "$preview_parts"

    track_num=0
    while IFS= read -r audio_file; do
        if [ -f "$audio_file" ]; then
            track_name=$(basename "$audio_file" | sed 's/\.[^.]*$//')
            echo "  - Processing: $track_name"

            ffmpeg -i "$audio_file" -t 10 -acodec mp3 -ab 128k \
                   -loglevel error \
                   "$preview_parts/part_${track_num}.mp3"

            echo "file '$preview_parts/part_${track_num}.mp3'" >> "$concat_list"
            ((track_num++))
        fi
    done <<< "$audio_files"

    if [ -f "$concat_list" ] && [ $track_num -gt 0 ]; then
        ffmpeg -f concat -safe 0 -i "$concat_list" \
               -acodec mp3 -ab 128k \
               -loglevel error \
               "$AUDIO_DIR/${output_name}.mp3"

        echo "  ✓ Created: ${output_name}.mp3 (${track_num} tracks)"
    fi

    rm -rf "$temp_extract"
}

# Process new Electronic remastered albums
echo ""
echo "Processing NEW ELECTRONIC albums..."
echo "-----------------------------------"
create_preview "$DOWNLOADS_DIR/electronic/JAde Wii - Acid Waves (Remaster).zip" "acid-waves-remaster"
create_preview "$DOWNLOADS_DIR/electronic/JAde Wii - End in Mind (Remaster).zip" "end-in-mind-remaster"
create_preview "$DOWNLOADS_DIR/electronic/JAde Wii - Lone Manta (Remaster).zip" "lone-manta-remaster"
create_preview "$DOWNLOADS_DIR/electronic/JAde Wii - Orca Vindicated (Remaster).zip" "orca-vindicated-remaster"
create_preview "$DOWNLOADS_DIR/electronic/JAde Wii - Penguin Aspirations (Remaster).zip" "penguin-aspirations-remaster"

# Clean up
rm -rf "$TEMP_DIR"

echo ""
echo "==================================="
echo "✓ New preview creation complete!"
echo ""