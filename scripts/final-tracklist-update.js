#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Complete track lists from the preview generation output
const finalTrackLists = {
  'lone-manta-remaster': ['Lone Manta', 'Grape Vines', 'Gotcha', 'Metronome', 'Muisca', "Sad Fish, But He's Ok"],
  'orca-vindicated-remaster': ['Orca Vindicated', 'Oddie', 'Patience', 'Nippon', 'Pilot Man', 'Octapus Legs', 'Lionesse'],
  'penguin-aspirations-remaster': ['Boom Go The Bells', 'Penguin Aspirations', 'Rainy Nights', 'Mango Biche', 'Wayuunaiki', 'Jupiter', 'Guayabal']
};

// Read products.js
const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.js');
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Update remaining track lists
Object.entries(finalTrackLists).forEach(([id, tracks]) => {
  const regex = new RegExp(`(id: '${id}'[^}]*trackList: \\[)[^\\]]+\\]`, 's');
  const trackListStr = tracks.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ');

  productsContent = productsContent.replace(regex, `$1${trackListStr}]`);
});

// Write back
fs.writeFileSync(productsPath, productsContent);

console.log('✓ Updated final track lists for all remastered albums');