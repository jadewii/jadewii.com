#!/usr/bin/env node

/**
 * Add Songs to Albums
 * Helper script for adding Suno songs to generated albums
 */

const fs = require('fs');
const path = require('path');

// Load album structure
const albumsFile = './generated-albums/album-structure.json';
if (!fs.existsSync(albumsFile)) {
  console.error('❌ Album structure not found! Run suno-album-creator.js first');
  process.exit(1);
}

const albums = JSON.parse(fs.readFileSync(albumsFile, 'utf8'));

console.log('🎵 Song Assignment Helper');
console.log('========================');
console.log(`Found ${albums.length} albums ready for songs\n`);

// Example of how to add songs to an album
function addSongsToAlbum(albumId, songUrls) {
  const album = albums.find(a => a.id === albumId);
  if (!album) {
    console.error(`❌ Album not found: ${albumId}`);
    return;
  }

  album.songs = songUrls.slice(0, 10).map((url, i) => ({
    title: `Track ${i + 1}`, // You can customize these
    duration: '3:30', // You can get actual durations
    audioUrl: url
  }));

  console.log(`✅ Added ${album.songs.length} songs to "${album.title}"`);
}

// Example usage - customize this section:
console.log('📝 To add songs, edit this script and use:');
console.log('addSongsToAlbum("album-id", ["url1", "url2", ...]);\n');

// CUSTOMIZE THIS SECTION:
// addSongsToAlbum('ai-generated', [
//   'https://cdn1.suno.ai/your-song-1.mp3',
//   'https://cdn1.suno.ai/your-song-2.mp3',
//   // ... add 8 more songs
// ]);

// Save updated albums
function saveAlbums() {
  fs.writeFileSync(albumsFile, JSON.stringify(albums, null, 2));
  console.log('💾 Albums saved!');
}

// Uncomment when you've added songs:
// saveAlbums();

module.exports = { addSongsToAlbum, saveAlbums };
