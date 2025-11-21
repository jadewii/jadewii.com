#!/usr/bin/env node

/**
 * Update itch.io page URLs in products.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of album IDs to their itch.io page URLs
const ITCH_PAGE_URLS = {
  // MODULAR
  'behind-the-sun': 'https://jadewii.itch.io/behind-the-sun-jade-wii',
  'between-the-redwood': 'https://jadewii.itch.io/jade-wii-between-the-redwood',
  'birds-of-paradise': 'https://jadewii.itch.io/birds-of-paradise',
  'blobs': 'https://jadewii.itch.io/blobs-jade-wii',
  'celestial-kunzite': 'https://jadewii.itch.io/jade-wii-celestial-kunzite',
  'creatures-of-the-sea': 'https://jadewii.itch.io/creatures-of-the-sea-jade-wii',
  'curious-pez': 'https://jadewii.itch.io/curious-pez-jade-wii',
  'demodex': 'https://jadewii.itch.io/demodex-jade-wii',
  'eidos': 'https://jadewii.itch.io/eidos-jade-wii',
  'elder-of-agraban': 'https://jadewii.itch.io/elder-of-agraban-jade-wii',
  'euro-chill': 'https://jadewii.itch.io/euro-chill',
  'fish-out-of-water': 'https://jadewii.itch.io/fish-out-of-water-jade-wii-music-pack',
  'gem-in-eye': 'https://jadewii.itch.io/jade-wii-gem-in-eye',
  'kolossos': 'https://jadewii.itch.io/kolossos-jade-wii-music-pack',
  'lady-of-lords': 'https://jadewii.itch.io/lady-of-lords-jade-wii',
  'melting-waters': 'https://jadewii.itch.io/jade-wii-melting-waters',
  'mountains-of-shidoh': 'https://jadewii.itch.io/jade-wii-mountains-of-shidoh',
  'organic-parts': 'https://jadewii.itch.io/jade-wii-organic-parts',
  'pollinated-memories': 'https://jadewii.itch.io/jade-wii-pollinated-memories',
  'sacred-spaces': 'https://jadewii.itch.io/jade-wii-sacred-spaces',
  'saturnian-moons': 'https://jadewii.itch.io/jade-wii-saturnian-moons',
  'shamans-quest': 'https://jadewii.itch.io/jade-wii-shaman',
  'shrine-of-elderon': 'https://jadewii.itch.io/shrine-of-elderon-jade-wii',
  'shrooms-of-discovery': 'https://jadewii.itch.io/shrooms-of-discovery-jade-wii',
  'silver-servant': 'https://jadewii.itch.io/silver-servant-jade-wii',
  'space-dali': 'https://jadewii.itch.io/space-dali-jade-wii',
  'strange-worlds': 'https://jadewii.itch.io/strange-worlds-jade-wii',
  'through-the-graph': 'https://jadewii.itch.io/through-the-graph',
  'tidal-dialogues': 'https://jadewii.itch.io/jade-wii-tidal-dialogues',
  'translucent-dreams': 'https://jadewii.itch.io/translucent-dreams-jade-wii',
  'twisted-strings': 'https://jadewii.itch.io/jade-wii-twisted-strings',
  'unimpressed': 'https://jadewii.itch.io/unimpressed-jade-wii',
  'wilderness-watts': 'https://jadewii.itch.io/jade-wii-wilderness-watts',
  'tongue-drum': 'https://jadewii.itch.io/jade-wii-tongue-drum',
  'remedies-granted-through-dreams': 'https://jadewii.itch.io/remedies-granted-through-dreams',
  'enlightened-ape': 'https://jadewii.itch.io/enlightened-ape',
  'above-the-quadi': 'https://jadewii.itch.io/jade-wii-above-the-quadi',
  'beneath-the-bohdi': 'https://jadewii.itch.io/jade-wii-beneath-the-bohdi',
  'wabi-sabi': 'https://jadewii.itch.io/wabi-sabi-jade-wii-music-pack',

  // ELECTRONIC
  'error-code': 'https://jadewii.itch.io/jade-wii-error-code',
  'operation-love': 'https://jadewii.itch.io/operation-love',
  'tiny-overtures': 'https://jadewii.itch.io/tiny-overtures',
  'op-1-field-tape-no-1': 'https://jadewii.itch.io/op-1-field-tape-no-1',

  // LOFI
  'milk-district': 'https://jadewii.itch.io/jade-wii-milk-district'
};

function updateItchPageUrls() {
  const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.js');
  let content = fs.readFileSync(productsPath, 'utf8');

  console.log('🔄 Updating itch.io page URLs in products.js...\\n');

  let updatedCount = 0;

  Object.entries(ITCH_PAGE_URLS).forEach(([albumId, pageUrl]) => {
    // Pattern to match itchioUrl in the album object
    const pattern = new RegExp(`(id: '${albumId}'[\\s\\S]*?itchioUrl: ')([^']*)(')`, 'g');

    if (content.match(pattern)) {
      content = content.replace(pattern, `$1${pageUrl}$3`);
      console.log(`✅ Updated ${albumId}: ${pageUrl}`);
      updatedCount++;
    } else {
      console.log(`⚠️  Could not find ${albumId} in products.js`);
    }
  });

  fs.writeFileSync(productsPath, content);
  console.log(`\\n🎉 Updated ${updatedCount} itch.io page URLs!`);
}

// Run the script
if (import.meta.url === `file://${__filename}`) {
  try {
    updateItchPageUrls();
    console.log('\\n🚀 ALL DONE! Itch.io page URLs updated in products.js');
  } catch (error) {
    console.error('❌ Error updating itch.io URLs:', error);
    process.exit(1);
  }
}

export { updateItchPageUrls };