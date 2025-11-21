#!/usr/bin/env node

/**
 * Comprehensive Itch.io to Website Sync Tool
 *
 * This script:
 * 1. Fetches all products from jadewii.itch.io
 * 2. Categorizes them (albums, sample packs, GIF packs)
 * 3. Compares with existing website products
 * 4. Generates missing product entries
 * 5. Links to existing images or identifies missing ones
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Current website products
import { products as currentAlbums } from '../lib/data/products.js';
import { samplePacks as currentSamplePacks } from '../lib/data/samplePacks.js';

// Real itch.io product data from jadewii.itch.io
const ITCH_IO_PRODUCTS = [
  // ALBUMS
  { title: 'Tongue Drum', price: 20, type: 'album', category: 'modular' },
  { title: 'Remedies Granted Through Dreams', price: 15, type: 'album', category: 'modular' },
  { title: 'Enlightened Ape', price: 15, type: 'album', category: 'modular' },
  { title: 'OP-1 Field Tape No. 1', price: 10, type: 'album', category: 'electronic' },
  { title: 'Above the Quadi', price: 15, type: 'album', category: 'modular' },
  { title: 'Beneath the Bohdi', price: 15, type: 'album', category: 'modular' },
  { title: 'Wabi Sabi', price: 20, type: 'album', category: 'modular' },

  // SAMPLE PACKS - DRUMS (Percussion Packs)
  { title: 'Glitch Drum', price: 20, type: 'sample-pack', category: 'drums-kits' },
  { title: 'World Drums', price: 20, type: 'sample-pack', category: 'drums-kits' },
  { title: 'PM Drums', price: 20, type: 'sample-pack', category: 'drums-kits' },
  { title: 'Household Drums', price: 20, type: 'sample-pack', category: 'drums-kits' },
  { title: 'Fat Buddha Lofi Drums', price: 20, type: 'sample-pack', category: 'drums-kits' },
  { title: 'FM Drums', price: 20, type: 'sample-pack', category: 'drums-kits' },

  // SAMPLE PACKS - INSTRUMENTS (Melodic Packs)
  { title: 'Shahi Baaja', price: 20, type: 'sample-pack', category: 'sampled-instruments' },
  { title: 'MU-16 Synth', price: 10, type: 'sample-pack', category: 'sampled-instruments' },
  { title: 'Ambient Chords', price: 15, type: 'sample-pack', category: 'sampled-instruments' },

  // GIF PACKS (Visual Assets)
  { title: 'Mini Keys Collection', price: 5, type: 'gif-pack', category: 'visual-assets' },
  { title: 'SP-404 MKII', price: 10, type: 'gif-pack', category: 'visual-assets' },
  { title: 'Modular Synth Vol. 3', price: 10, type: 'gif-pack', category: 'visual-assets' },
  { title: 'SP-404 OG', price: 5, type: 'gif-pack', category: 'visual-assets' },
  { title: 'Modular Synth Vol. 2', price: 10, type: 'gif-pack', category: 'visual-assets' },
  { title: 'Modular Synth Vol. 1', price: 10, type: 'gif-pack', category: 'visual-assets' }
];

/**
 * Convert title to URL-safe slug
 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Find existing images for product (front/back album covers, hover images)
 */
function findExistingImages(productTitle, type) {
  const slug = slugify(productTitle);
  const baseImagePath = type === 'sample-pack' ? '/images/sample-packs/' : '/images/albums/';
  const extensions = ['.jpg', '.jpeg', '.png', '.gif'];

  const result = {
    image: null,
    hoverImage: null,
    backImage: null
  };

  // Check for main image
  for (const ext of extensions) {
    const imagePath = `${baseImagePath}${slug}${ext}`;
    const fullPath = path.join(__dirname, '..', 'public', imagePath);

    if (fs.existsSync(fullPath)) {
      result.image = imagePath;
      break;
    }
  }

  // Check for back/hover images - matching your naming convention like "fearmongerback.png"
  const backSuffixes = ['back'];
  for (const suffix of backSuffixes) {
    for (const ext of extensions) {
      const hoverImagePath = `${baseImagePath}${slug}${suffix}${ext}`;
      const fullHoverPath = path.join(__dirname, '..', 'public', hoverImagePath);

      if (fs.existsSync(fullHoverPath)) {
        result.hoverImage = hoverImagePath;
        result.backImage = hoverImagePath;
        break;
      }
    }
    if (result.hoverImage) break;
  }

  // If no main image found, set placeholder
  if (!result.image) {
    result.image = type === 'sample-pack' ? '/images/sample-packs/placeholder.png' : '/images/albums/placeholder.jpg';
  }

  return result;
}

/**
 * Check if product already exists on website
 */
function productExists(itchProduct) {
  const slug = slugify(itchProduct.title);

  if (itchProduct.type === 'album') {
    return currentAlbums.some(album =>
      album.id === slug || album.title.toLowerCase() === itchProduct.title.toLowerCase()
    );
  } else if (itchProduct.type === 'sample-pack') {
    return currentSamplePacks.some(pack =>
      pack.id === slug || pack.title.toLowerCase() === itchProduct.title.toLowerCase()
    );
  }

  return false;
}

/**
 * Generate product entry for website
 */
function generateProductEntry(itchProduct) {
  const slug = slugify(itchProduct.title);
  const images = findExistingImages(itchProduct.title, itchProduct.type);

  const baseEntry = {
    id: slug,
    title: itchProduct.title,
    artist: 'JAde Wii',
    price: itchProduct.price,
    type: itchProduct.type,
    category: itchProduct.category,
    image: images.image,
    itchioUrl: '', // TODO: Extract actual checkout URLs
  };

  // Add hover/back image if it exists
  if (images.hoverImage) {
    baseEntry.hoverImage = images.hoverImage;
  }

  if (itchProduct.type === 'album') {
    return {
      ...baseEntry,
      trackList: ['Track 1', 'Track 2', 'Track 3'], // Placeholder
      downloadFile: `${itchProduct.category}/JAde Wii - ${itchProduct.title}.zip`
    };
  }

  return baseEntry;
}

/**
 * Main sync function
 */
function syncItchToWebsite() {
  console.log('🔄 Starting Itch.io to Website Sync...\n');

  const missing = {
    albums: [],
    samplePacks: [],
    gifPacks: [],
    missingImages: []
  };

  // Check each itch.io product
  ITCH_IO_PRODUCTS.forEach(itchProduct => {
    if (!productExists(itchProduct)) {
      const productEntry = generateProductEntry(itchProduct);

      if (itchProduct.type === 'album') {
        missing.albums.push(productEntry);
      } else if (itchProduct.type === 'sample-pack') {
        missing.samplePacks.push(productEntry);
      } else if (itchProduct.type === 'gif-pack') {
        missing.gifPacks.push(productEntry);
      }

      // Check if image exists
      const fullImagePath = path.join(__dirname, '..', 'public', productEntry.image);
      if (!fs.existsSync(fullImagePath)) {
        missing.missingImages.push({
          product: itchProduct.title,
          expectedPath: productEntry.image
        });
      }

      console.log(`❌ Missing: ${itchProduct.title} (${itchProduct.type})`);
    } else {
      console.log(`✅ Exists: ${itchProduct.title} (${itchProduct.type})`);
    }
  });

  // Generate output
  console.log('\n📊 SYNC RESULTS:');
  console.log(`📀 Missing Albums: ${missing.albums.length}`);
  console.log(`🎵 Missing Sample Packs: ${missing.samplePacks.length}`);
  console.log(`🎨 Missing GIF Packs: ${missing.gifPacks.length}`);
  console.log(`🖼️ Missing Images: ${missing.missingImages.length}`);

  // Write missing products to files
  if (missing.albums.length > 0) {
    const albumsToAdd = JSON.stringify(missing.albums, null, 2);
    fs.writeFileSync(
      path.join(__dirname, 'missing-albums.json'),
      albumsToAdd
    );
    console.log('\n📝 Missing albums written to scripts/missing-albums.json');
  }

  if (missing.samplePacks.length > 0) {
    const packsToAdd = JSON.stringify(missing.samplePacks, null, 2);
    fs.writeFileSync(
      path.join(__dirname, 'missing-sample-packs.json'),
      packsToAdd
    );
    console.log('📝 Missing sample packs written to scripts/missing-sample-packs.json');
  }

  if (missing.gifPacks.length > 0) {
    const gifsToAdd = JSON.stringify(missing.gifPacks, null, 2);
    fs.writeFileSync(
      path.join(__dirname, 'missing-gif-packs.json'),
      gifsToAdd
    );
    console.log('📝 Missing GIF packs written to scripts/missing-gif-packs.json');
  }

  if (missing.missingImages.length > 0) {
    const imagesToCreate = JSON.stringify(missing.missingImages, null, 2);
    fs.writeFileSync(
      path.join(__dirname, 'missing-images.json'),
      imagesToCreate
    );
    console.log('📝 Missing images list written to scripts/missing-images.json');
  }

  return missing;
}

/**
 * Generate update scripts for each data file
 */
function generateUpdateScripts(missing) {
  console.log('\n🛠️ Generating update scripts...');

  // Generate products.js update
  if (missing.albums.length > 0) {
    const albumUpdates = missing.albums.map(album => `  ${JSON.stringify(album, null, 2).split('\n').join('\n  ')}`).join(',\n');
    const updateScript = `
// Add these albums to lib/data/products.js
// Append to the products array:

${albumUpdates}
`;

    fs.writeFileSync(
      path.join(__dirname, 'update-products.js.txt'),
      updateScript
    );
    console.log('📝 Products update script written to scripts/update-products.js.txt');
  }

  // Generate samplePacks.js update
  if (missing.samplePacks.length > 0) {
    const packUpdates = missing.samplePacks.map(pack => `  ${JSON.stringify(pack, null, 2).split('\n').join('\n  ')}`).join(',\n');
    const updateScript = `
// Add these sample packs to lib/data/samplePacks.js
// Append to the samplePacks array:

${packUpdates}
`;

    fs.writeFileSync(
      path.join(__dirname, 'update-sample-packs.js.txt'),
      updateScript
    );
    console.log('📝 Sample packs update script written to scripts/update-sample-packs.js.txt');
  }

  // Generate GIF packs data file if needed
  if (missing.gifPacks.length > 0) {
    const gifPacksData = `// GIF Packs Data
export const gifPacks = ${JSON.stringify(missing.gifPacks, null, 2)};
`;

    fs.writeFileSync(
      path.join(__dirname, '../lib/data/gifPacks.js'),
      gifPacksData
    );
    console.log('📝 Created new GIF packs data file at lib/data/gifPacks.js');
  }
}

// Run the sync
if (import.meta.url === `file://${__filename}`) {
  try {
    const results = syncItchToWebsite();
    generateUpdateScripts(results);
    console.log('\n🎉 Sync complete!');
  } catch (error) {
    console.error('❌ Error during sync:', error);
    process.exit(1);
  }
}

export { syncItchToWebsite, generateUpdateScripts };