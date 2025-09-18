#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Actual track lists from the ZIPs
const trackListUpdates = {
  'acid-waves-remaster': ['Elephant Bonsai', 'Caterpillar Dreams', 'Fussy Bear', 'Dragon Eggs', 'Midnight Owl', 'Jellyfish Nebula', 'Iriyani', 'Iska', 'Fasel', 'I Wanna Be in Florida', 'Sakura Tree', 'Only One Sun'],
  'end-in-mind-remaster': ['Ignorantly Unaware', 'Pa Delante', 'Amatea', 'Liquid Honey', 'Vases Without Flowers', 'Leaves have Fallen', 'End in Mind'],
  'lone-manta-remaster': ['Lone Manta', 'Track 2', 'Track 3'], // Will update when preview completes
  'orca-vindicated-remaster': ['Track 1', 'Track 2', 'Track 3'],
  'penguin-aspirations-remaster': ['Track 1', 'Track 2', 'Track 3']
};

// Read products.js
const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.js');
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Update track lists
Object.entries(trackListUpdates).forEach(([id, tracks]) => {
  const regex = new RegExp(`(id: '${id}'[^}]*trackList: \\[)[^\\]]+\\]`, 's');
  const trackListStr = tracks.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ');

  productsContent = productsContent.replace(regex, `$1${trackListStr}]`);
});

// Write back
fs.writeFileSync(productsPath, productsContent);

console.log('✓ Updated track lists for remastered albums');