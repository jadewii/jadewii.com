#!/usr/bin/env node

/**
 * Update remaining sample pack URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Additional URLs to update
const ADDITIONAL_PACK_URLS = {
  'pm-drums': 'https://jadewii.itch.io/pm-drums-jade-wii-drum-pack',
  'world-drums': 'https://jadewii.itch.io/world-drums-jade-wii-drum-pack',
  'household-drums': 'https://jadewii.itch.io/household-drums-jade-wii-drum-pack',
  'shahi-baaja': 'https://jadewii.itch.io/shahi-baaja-jade-wii-instrument-pack',
  'tongue-drum': 'https://jadewii.itch.io/tongue-drum'
};

function updateRemainingPackUrls() {
  const packsPath = path.join(__dirname, '..', 'lib', 'data', 'samplePacks.js');
  let content = fs.readFileSync(packsPath, 'utf8');

  console.log('🔄 Updating remaining sample pack URLs...\\n');

  let updatedCount = 0;

  Object.entries(ADDITIONAL_PACK_URLS).forEach(([packId, pageUrl]) => {
    // Pattern to match itchioUrl in the sample pack object
    const pattern = new RegExp(`(id: '${packId}'[\\s\\S]*?itchioUrl: ')([^']*)(')`, 'g');

    if (content.match(pattern)) {
      content = content.replace(pattern, `$1${pageUrl}$3`);
      console.log(`✅ Updated ${packId}: ${pageUrl}`);
      updatedCount++;
    } else {
      console.log(`⚠️  Could not find ${packId} in samplePacks.js`);
    }
  });

  fs.writeFileSync(packsPath, content);
  console.log(`\\n🎉 Updated ${updatedCount} more sample pack URLs!`);
}

// Run the script
if (import.meta.url === `file://${__filename}`) {
  try {
    updateRemainingPackUrls();
    console.log('\\n🚀 All sample pack URLs updated!');
  } catch (error) {
    console.error('❌ Error updating sample pack URLs:', error);
    process.exit(1);
  }
}