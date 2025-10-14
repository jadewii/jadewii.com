#!/usr/bin/env node

/**
 * Album Generator Script
 * Automatically creates 10-song albums from Suno music + moduleimages artwork
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  imageFolder: '/Users/jade/Documents/suno covers',
  outputFolder: './generated-albums',
  songsPerAlbum: 10,
  price: 15.00,
  artist: 'JAde Wii',
  sunoBaseUrl: 'https://app.suno.ai' // For future Suno integration
};

// Helper function to clean filename for album ID
function createAlbumId(filename) {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to create album title from filename
function createAlbumTitle(filename) {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/ChatGPT Image .+ at .+/, 'Generated Album') // Clean ChatGPT names
    .replace(/[_-]/g, ' ') // Replace underscores/hyphens with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Title case
}

// Scan available images
function scanImages() {
  console.log('🎨 Scanning images...');

  if (!fs.existsSync(CONFIG.imageFolder)) {
    console.error(`❌ Image folder not found: ${CONFIG.imageFolder}`);
    return [];
  }

  const files = fs.readdirSync(CONFIG.imageFolder)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    })
    .filter(file => !file.startsWith('.')); // Skip hidden files

  console.log(`✅ Found ${files.length} images`);
  return files;
}

// Generate album metadata
function generateAlbumMetadata(imageFile, songList = []) {
  const albumId = createAlbumId(imageFile);
  const albumTitle = createAlbumTitle(imageFile);

  return {
    id: albumId,
    title: albumTitle,
    artist: CONFIG.artist,
    price: CONFIG.price,
    type: 'album',
    category: 'modular', // or determine from songs
    image: `/images/albums/${imageFile}`,
    itchioUrl: '', // To be filled when uploaded to itch.io
    songs: songList.slice(0, CONFIG.songsPerAlbum), // Limit to 10 songs
    description: `A collection of ${songList.length} tracks featuring modular synthesis and electronic compositions.`,
    releaseDate: new Date().toISOString().split('T')[0],
    generated: true,
    sourceImage: imageFile
  };
}

// Main function to generate albums
function generateAlbums(songData = []) {
  console.log('🎵 Starting album generation...');

  const images = scanImages();
  if (images.length === 0) {
    console.error('❌ No images found!');
    return;
  }

  // Create output directory
  if (!fs.existsSync(CONFIG.outputFolder)) {
    fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
  }

  const albums = [];

  // For now, create albums with placeholder songs
  // This will be updated when we integrate with your Suno music
  images.slice(0, 20).forEach((imageFile, index) => { // Limit to first 20 images for testing
    const placeholderSongs = Array.from({ length: CONFIG.songsPerAlbum }, (_, i) => ({
      title: `Track ${i + 1}`,
      duration: '3:30',
      audioUrl: `https://jadewii.github.io/jadewiiwebsiteaudio/generated-${index}-${i}.mp3`
    }));

    const album = generateAlbumMetadata(imageFile, placeholderSongs);
    albums.push(album);
  });

  // Save generated albums
  const outputFile = path.join(CONFIG.outputFolder, 'generated-albums.json');
  fs.writeFileSync(outputFile, JSON.stringify(albums, null, 2));

  console.log(`✅ Generated ${albums.length} albums`);
  console.log(`📁 Saved to: ${outputFile}`);

  return albums;
}

// Integration function to add albums to your website
function integrateAlbumsToWebsite(albums) {
  console.log('🌐 Integrating albums to website...');

  // Read existing products
  const productsFile = './lib/data/products.js';
  if (!fs.existsSync(productsFile)) {
    console.error('❌ Products file not found!');
    return;
  }

  // This would append the new albums to your products.js file
  // For now, just show what would be added
  console.log('📋 Albums ready for integration:');
  albums.forEach(album => {
    console.log(`  - ${album.title} (${album.id})`);
  });
}

// CLI interface
if (require.main === module) {
  console.log('🎵 JAde Wii Album Generator 🎨');
  console.log('================================');

  const albums = generateAlbums();

  if (albums.length > 0) {
    console.log('\n📊 Generation Summary:');
    console.log(`   Images available: ${scanImages().length}`);
    console.log(`   Albums generated: ${albums.length}`);
    console.log(`   Songs per album: ${CONFIG.songsPerAlbum}`);
    console.log('\n⚡ Next steps:');
    console.log('   1. Add your Suno songs to the script');
    console.log('   2. Copy album artwork to public/images/albums/');
    console.log('   3. Run integration to add to website');
  }
}

module.exports = { generateAlbums, scanImages, generateAlbumMetadata };