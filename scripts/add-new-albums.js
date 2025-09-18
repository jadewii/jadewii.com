#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// New LOFI albums to add
const lofiAlbums = [
  {
    id: 'confessions-samurai',
    title: 'Confessions of a Samurai',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'lofi',
    image: '/images/albums/confessions-samurai.jpg',
    trackList: ['Domo', 'Paper Swan', 'Nine Tailed Fox', 'Speechless', 'Obstacles', 'First Day', 'Confucius'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'lofi/JAde Wii - Confessions of a Samurai.zip'
  },
  {
    id: 'geisha-dreams',
    title: 'Geisha Dreams',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'lofi',
    image: '/images/albums/geisha-dreams.jpg',
    trackList: ['Blubalubi', 'I Want You to Forget', 'Tree of Kyoto', 'Bonsai Leaf', 'Dream Chasin\'', 'Technicalities', 'Sunville', 'Feng-Shui', 'Dream Team'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'lofi/JAde Wii - Geisha Dreams.zip'
  },
  {
    id: 'habit-garden',
    title: 'Habit Garden',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'lofi',
    image: '/images/albums/habit-garden.jpg',
    trackList: ['Pink and Blue Skies', 'Vegetable Garden', 'Butterfly Tracks', 'Beeism', 'Koi Death', 'Organismosis', 'Focusanity'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'lofi/JAde Wii - Habit Garden.zip'
  },
  {
    id: 'milk-district',
    title: 'Milk District',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'lofi',
    image: '/images/albums/milk-district.jpg',
    trackList: ['Moloko', 'Milch', 'Miruku', 'Latte', 'Tej', 'Melk', 'Gatas', 'Leche', 'Doodh', 'Halib', 'Susu'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'lofi/JAde Wii - Milk District.zip'
  },
  {
    id: 'propagated-mind',
    title: 'Propagated Mind',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'lofi',
    image: '/images/albums/propagated-mind.jpg',
    trackList: ['Stringed Away', 'Sad Caterpillar', 'Trails of Chamomile', 'Circumstances', 'Living in OZ', 'Spirit Forest', 'Running Squares', 'Like a Flower'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'lofi/JAde Wii - Propagated Mind.zip'
  },
  {
    id: 'stealin-dreams',
    title: "Stealin' Dreams",
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'lofi',
    image: '/images/albums/stealin-dreams.jpg',
    trackList: ['Stealing Dreams', 'Cuando', 'Hesitant', 'Caught Up', "Gossamer's Flight", 'Atmospheric Plums'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: "lofi/JAde Wii - Stealin' Dreams.zip"
  }
];

// New remastered electronic albums
const newElectronicAlbums = [
  {
    id: 'acid-waves-remaster',
    title: 'Acid Waves (Remaster)',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'electronic',
    image: '/images/albums/acid-waves-remaster.jpg',
    trackList: ['Track 1', 'Track 2', 'Track 3'], // Will update with actual tracks
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'electronic/JAde Wii - Acid Waves (Remaster).zip'
  },
  {
    id: 'end-in-mind-remaster',
    title: 'End in Mind (Remaster)',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'electronic',
    image: '/images/albums/end-in-mind-remaster.jpg',
    trackList: ['Track 1', 'Track 2', 'Track 3'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'electronic/JAde Wii - End in Mind (Remaster).zip'
  },
  {
    id: 'lone-manta-remaster',
    title: 'Lone Manta (Remaster)',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'electronic',
    image: '/images/albums/lone-manta-remaster.jpg',
    trackList: ['Track 1', 'Track 2', 'Track 3'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'electronic/JAde Wii - Lone Manta (Remaster).zip'
  },
  {
    id: 'orca-vindicated-remaster',
    title: 'Orca Vindicated (Remaster)',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'electronic',
    image: '/images/albums/orca-vindicated-remaster.jpg',
    trackList: ['Track 1', 'Track 2', 'Track 3'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'electronic/JAde Wii - Orca Vindicated (Remaster).zip'
  },
  {
    id: 'penguin-aspirations-remaster',
    title: 'Penguin Aspirations (Remaster)',
    artist: 'JAde Wii',
    price: 10.00,
    type: 'album',
    category: 'electronic',
    image: '/images/albums/penguin-aspirations-remaster.jpg',
    trackList: ['Track 1', 'Track 2', 'Track 3'],
    stripePriceId: 'price_REPLACE_ME',
    downloadFile: 'electronic/JAde Wii - Penguin Aspirations (Remaster).zip'
  }
];

// Read current products.js
const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.js');
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Find the products array
const productsMatch = productsContent.match(/export const products = \[([\s\S]*?)\];/);

if (productsMatch) {
  // Parse existing products (careful with this in production!)
  const existingProductsStr = productsMatch[1];

  // Add new albums to the end of the array
  const newAlbumsStr = [...lofiAlbums, ...newElectronicAlbums]
    .map(album => `  ${JSON.stringify(album, null, 2).replace(/\n/g, '\n  ')}`)
    .join(',\n');

  // Insert before the closing bracket
  const updatedProducts = productsContent.replace(
    /export const products = \[([\s\S]*?)\];/,
    (match, p1) => {
      // Remove trailing comma and whitespace from existing products
      const cleanedProducts = p1.trimRight().replace(/,\s*$/, '');
      return `export const products = [${cleanedProducts},\n${newAlbumsStr}\n];`;
    }
  );

  fs.writeFileSync(productsPath, updatedProducts);
  console.log('✓ Added', lofiAlbums.length, 'LOFI albums');
  console.log('✓ Added', newElectronicAlbums.length, 'new Electronic albums');
} else {
  console.error('Could not find products array in products.js');
}