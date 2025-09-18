#!/bin/bash

# Script to create 10-second preview MP3s from ZIP files
# Each album gets one MP3 with all tracks concatenated (10 seconds each)

DOWNLOADS_DIR="/Users/jade/music-store/downloads"
AUDIO_DIR="/Users/jade/music-store/public/audio"
TEMP_DIR="/tmp/music-previews"

# Create directories
mkdir -p "$AUDIO_DIR"
mkdir -p "$TEMP_DIR"

echo "Creating 10-second preview MP3s for all albums..."
echo "================================================"

# Function to create preview for an album
create_preview() {
    local zip_file="$1"
    local output_name="$2"
    local temp_extract="$TEMP_DIR/extract_$$"

    echo "Processing: $(basename "$zip_file")"

    # Create temp extraction directory
    mkdir -p "$temp_extract"

    # Extract ZIP
    unzip -q "$zip_file" -d "$temp_extract"

    # Find all audio files and sort them
    audio_files=$(find "$temp_extract" -type f \( -iname "*.mp3" -o -iname "*.wav" -o -iname "*.aiff" -o -iname "*.m4a" \) | sort)

    if [ -z "$audio_files" ]; then
        echo "  ⚠ No audio files found in $(basename "$zip_file")"
        rm -rf "$temp_extract"
        return
    fi

    # Create list file for concatenation
    concat_list="$temp_extract/concat.txt"
    preview_parts="$temp_extract/parts"
    mkdir -p "$preview_parts"

    # Process each audio file
    track_num=0
    while IFS= read -r audio_file; do
        if [ -f "$audio_file" ]; then
            track_name=$(basename "$audio_file" | sed 's/\.[^.]*$//')
            echo "  - Processing track: $track_name"

            # Create 10-second preview of this track
            ffmpeg -i "$audio_file" -t 10 -acodec mp3 -ab 128k \
                   -loglevel error \
                   "$preview_parts/part_${track_num}.mp3"

            # Add to concat list
            echo "file '$preview_parts/part_${track_num}.mp3'" >> "$concat_list"

            ((track_num++))
        fi
    done <<< "$audio_files"

    # Concatenate all previews into one file
    if [ -f "$concat_list" ] && [ $track_num -gt 0 ]; then
        ffmpeg -f concat -safe 0 -i "$concat_list" \
               -acodec mp3 -ab 128k \
               -loglevel error \
               "$AUDIO_DIR/${output_name}.mp3"

        echo "  ✓ Created preview: ${output_name}.mp3 (${track_num} tracks)"
    else
        echo "  ⚠ No tracks found for preview"
    fi

    # Cleanup
    rm -rf "$temp_extract"
}

# Process MIX TAPES
echo ""
echo "Processing MIX TAPES..."
echo "----------------------"
for zip in "$DOWNLOADS_DIR/mixtapes"/*.zip; do
    if [ -f "$zip" ]; then
        # Extract album name from filename
        album_name=$(basename "$zip" .zip | sed 's/JAde Wii - //')

        # Create ID-friendly name
        case "$album_name" in
            "Charlie's DOOMED Christmas") id="charlies-doomed-christmas" ;;
            "Common Side Effects") id="common-side-effects" ;;
            "Dan Da Damned") id="dan-da-damned" ;;
            "Drone Sightings") id="drone-sightings" ;;
            "Honey") id="honey-mix" ;;
            "How The Grinch Chilled Christmas") id="grinch-chilled-christmas" ;;
            "Rudolf The LOFI Reindeer") id="rudolf-lofi-reindeer" ;;
            "Tiny Tape Vol. 1") id="tiny-tape-1" ;;
            "White Lotus") id="white-lotus" ;;
            *) id=$(echo "$album_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g; s/[^a-z0-9-]//g') ;;
        esac

        create_preview "$zip" "$id"
    fi
done

# Process ELECTRONIC
echo ""
echo "Processing ELECTRONIC..."
echo "-----------------------"
for zip in "$DOWNLOADS_DIR/electronic"/*.zip; do
    if [ -f "$zip" ]; then
        album_name=$(basename "$zip" .zip | sed 's/JAde Wii - //')

        case "$album_name" in
            "Aphids") id="aphids" ;;
            "Error Code") id="error-code" ;;
            "Operation Love") id="operation-love" ;;
            "Tiny Overtures") id="tiny-overtures" ;;
            *) id=$(echo "$album_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g; s/[^a-z0-9-]//g') ;;
        esac

        create_preview "$zip" "$id"
    fi
done

# Process MODULAR
echo ""
echo "Processing MODULAR..."
echo "--------------------"
for zip in "$DOWNLOADS_DIR/modular"/*.zip; do
    if [ -f "$zip" ]; then
        album_name=$(basename "$zip" .zip | sed 's/JAde Wii - //')

        # Convert to ID format (matching products.js)
        id=$(echo "$album_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g; s/[^a-z0-9-]//g')

        create_preview "$zip" "$id"
    fi
done

# Process LOFI
echo ""
echo "Processing LOFI..."
echo "-----------------"
for zip in "$DOWNLOADS_DIR/lofi"/*.zip; do
    if [ -f "$zip" ]; then
        album_name=$(basename "$zip" .zip | sed 's/JAde Wii - //')
        id=$(echo "$album_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g; s/[^a-z0-9-]//g')
        create_preview "$zip" "$id"
    fi
done

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo ""
echo "================================================"
echo "✓ Preview creation complete!"
echo ""
echo "Preview MP3s created in: $AUDIO_DIR"
echo "Total previews created:"
ls -1 "$AUDIO_DIR"/*.mp3 2>/dev/null | wc -l