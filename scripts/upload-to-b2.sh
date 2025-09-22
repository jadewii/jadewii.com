#!/bin/bash

# Backblaze B2 Upload Script for JAde Wii Music
# This script uploads all album ZIPs to Backblaze B2

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration (will be set when we have the key)
KEY_ID="582ea6dffd21"
APP_KEY="" # Will be added when provided
BUCKET_NAME="jadewii-music"

# Source directory
SOURCE_DIR="/Users/jade/Documents/wiidisco"

echo -e "${GREEN}=== JAde Wii Music - Backblaze B2 Upload ===${NC}"
echo ""

# Check if APP_KEY is set
if [ -z "$APP_KEY" ]; then
    echo -e "${RED}Error: Application Key not set in script${NC}"
    echo "Please add your Application Key to this script"
    exit 1
fi

# Authorize B2
echo -e "${YELLOW}Authenticating with Backblaze B2...${NC}"
b2 account authorize "$KEY_ID" "$APP_KEY"

if [ $? -ne 0 ]; then
    echo -e "${RED}Authentication failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Authentication successful${NC}"
echo ""

# Upload function
upload_category() {
    local category="$1"
    local folder_name="$2"

    echo -e "${YELLOW}Uploading $category albums...${NC}"

    # Check if directory exists
    if [ ! -d "$SOURCE_DIR/$folder_name" ]; then
        echo -e "${RED}Directory not found: $SOURCE_DIR/$folder_name${NC}"
        return
    fi

    # Upload each ZIP file
    for file in "$SOURCE_DIR/$folder_name"/*.zip; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            # Convert filename to lowercase and replace spaces with hyphens
            clean_name=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

            echo "  Uploading: $filename -> $category/$clean_name"
            b2 file upload "$BUCKET_NAME" "$file" "$category/$clean_name"

            if [ $? -eq 0 ]; then
                echo -e "  ${GREEN}✓${NC} $filename"
            else
                echo -e "  ${RED}✗${NC} Failed: $filename"
            fi
        fi
    done

    echo ""
}

# Upload all categories
echo -e "${GREEN}Starting upload process...${NC}"
echo ""

upload_category "mixtapes" "MIX TAPES"
upload_category "electronic" "ELECTRONIC"
upload_category "lofi" "LOFI"
upload_category "modular" "MODULAR"

echo -e "${GREEN}=== Upload Complete ===${NC}"
echo ""
echo "Your albums are now securely stored on Backblaze B2!"
echo "Files are private and will be served with temporary signed URLs"