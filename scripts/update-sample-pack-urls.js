#!/usr/bin/env node

/**
 * Update sample pack URLs with correct itch.io page URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of sample pack IDs to their correct itch.io page URLs
const SAMPLE_PACK_URLS = {
  'fat-buddha': 'https://jadewii.itch.io/fat-buddha-lofi-drums-jade-wii-drum-pack',
  'fm-drums': 'https://jadewii.itch.io/fm-drums-jade-wii-drum-pack',
  'glitch': 'https://jadewii.itch.io/glitch-drum-jade-wii-drum-pack',
  'glitch-drum': 'https://jadewii.itch.io/glitch-drum-jade-wii-drum-pack',
  'mu-16-synth': 'https://jadewii.itch.io/mu-16-synth-jade-wii-instrument-pack',
  'ambient-chords': 'https://jadewii.itch.io/ambient-chords-jade-wii-chord-pack'
};

function updateSamplePackUrls() {
  const packsPath = path.join(__dirname, '..', 'lib', 'data', 'samplePacks.js');
  let content = fs.readFileSync(packsPath, 'utf8');

  console.log('🔄 Updating sample pack URLs...\\n');

  let updatedCount = 0;

  Object.entries(SAMPLE_PACK_URLS).forEach(([packId, pageUrl]) => {
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
  console.log(`\\n🎉 Updated ${updatedCount} sample pack URLs!`);
}

// Run the script
if (import.meta.url === `file://${__filename}`) {
  try {
    updateSamplePackUrls();
    console.log('\\n🚀 Sample pack URLs updated!');
  } catch (error) {
    console.error('❌ Error updating sample pack URLs:', error);
    process.exit(1);
  }
}

export { updateSamplePackUrls };