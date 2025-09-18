#!/bin/bash

# Create electronic album previews
create_electronic_preview() {
    local album_name="$1"
    local output_file="$2"
    local wav_dir="$3"

    echo "Creating preview for: $album_name"

    # Find first 3 WAV files and sort them
    wav_files=($(find "$wav_dir" -name "*.wav" | sort | head -3))

    if [ ${#wav_files[@]} -eq 0 ]; then
        echo "No WAV files found for $album_name"
        return
    fi

    # Create temp clips
    local temp_files=()
    local list_file="/tmp/${output_file}_list.txt"
    > "$list_file"

    for i in "${!wav_files[@]}"; do
        local temp_mp3="/tmp/${output_file}_${i}.mp3"
        ffmpeg -i "${wav_files[$i]}" -t 10 -acodec mp3 -ab 128k "$temp_mp3" -y 2>/dev/null
        echo "file '$temp_mp3'" >> "$list_file"
        temp_files+=("$temp_mp3")
    done

    # Concatenate all clips
    ffmpeg -f concat -safe 0 -i "$list_file" -c copy "/Users/jade/music-store/public/audio/${output_file}.mp3" -y 2>/dev/null

    # Clean up temp files
    rm -f "${temp_files[@]}" "$list_file"

    echo "Created: ${output_file}.mp3"
}

# Create electronic previews
create_electronic_preview "Acid Waves" "acid-waves" "/Users/jade/Documents/jadewiimusicfinal/ELECTRONIC/JAde Wii - Acid Waves (Remaster)"
create_electronic_preview "Error Code" "error-code" "/Users/jade/Documents/jadewiimusicfinal/ELECTRONIC/JAde Wii - Error Code"
create_electronic_preview "Lone Manta" "lone-manta" "/Users/jade/Documents/jadewiimusicfinal/ELECTRONIC/JAde Wii - Lone Manta (Remaster)"
create_electronic_preview "Orca Vindicated" "orca-vindicated" "/Users/jade/Documents/jadewiimusicfinal/ELECTRONIC/JAde Wii - Orca Vindicated (Remaster)"
create_electronic_preview "Penguin Aspirations" "penguin-aspirations" "/Users/jade/Documents/jadewiimusicfinal/ELECTRONIC/JAde Wii - Penguin Aspirations (Remaster)"

echo "All electronic previews created!"