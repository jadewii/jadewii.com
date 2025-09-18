#!/bin/bash

# Create preview MP3s for all albums
# Each track gets 10 seconds, concatenated into one file

create_album_preview() {
    local album_name="$1"
    local output_file="$2"
    local wav_dir="$3"

    echo "Creating preview for: $album_name"

    # Find all WAV files and sort them
    wav_files=($(find "$wav_dir" -name "*.wav" | sort))

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

# Create mixtape previews
create_album_preview "Charlie's DOOMED Christmas" "charlies-doomed-christmas-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - Charlie's DOOMED Christmas"
create_album_preview "Dan Da Damned" "dan-da-damned-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - Dan Da Damned"
create_album_preview "Drone Sightings" "drone-sightings-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - Drone Sightings"
create_album_preview "Grinch Chilled" "grinch-chilled-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - How The Grinch Chilled Christmas"
create_album_preview "Rudolf LOFI" "rudolf-lofi-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - Rudolf The LOFI Reindeer"
create_album_preview "White Lotus" "white-lotus-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - White Lotus"
create_album_preview "Common Side Effects" "common-side-effects-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - Common Side Effects"
create_album_preview "Tiny Tape Vol. 1" "tiny-tape-vol-1-mix" "/Users/jade/Documents/jadewiimusicfinal/MIX TAPES/JAde Wii - Tiny Tape Vol. 1"

echo "All mixtape previews created!"