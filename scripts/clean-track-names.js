#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read products.js
const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.js');
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Function to clean track names
function cleanTrackName(trackName) {
  // Remove "Album Name - 01 " prefix pattern
  // Handles formats like:
  // "Charlie's DOOMED Christmas - 01 I'm Still Not Happy" -> "I'm Still Not Happy"
  // "Honey - 01 Honey" -> "Honey"

  // First try to match the pattern with number
  let cleaned = trackName.replace(/^[^-]+ - \d+ /, '');

  // If no change, try without number (some might just have "Album - Track")
  if (cleaned === trackName) {
    cleaned = trackName.replace(/^[^-]+ - /, '');
  }

  return cleaned;
}

// Process the file - clean all trackList arrays
let updatedContent = productsContent.replace(
  /trackList: \[([^\]]+)\]/g,
  (match, tracks) => {
    // Parse the track list
    const trackArray = [];
    const regex = /'([^'\\]|(\\.))*'/g;
    let trackMatch;

    while ((trackMatch = regex.exec(tracks)) !== null) {
      let track = trackMatch[0];
      // Remove outer quotes
      track = track.slice(1, -1);
      // Unescape inner quotes
      track = track.replace(/\\'/g, "'");
      // Clean the track name
      track = cleanTrackName(track);
      // Re-escape quotes for output
      track = track.replace(/'/g, "\\'");
      trackArray.push(`'${track}'`);
    }

    return `trackList: [${trackArray.join(', ')}]`;
  }
);

// Write the updated content
fs.writeFileSync(productsPath, updatedContent);

console.log('✓ Cleaned all track names - removed album prefixes and track numbers');
console.log('  Now showing just the song titles!');