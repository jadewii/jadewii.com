#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to get all albums from a directory
function getAlbumsFromDirectory(category, dir) {
  const albums = [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.zip'));

  files.forEach(file => {
    const title = file.replace('JAde Wii - ', '').replace('.zip', '');
    const id = title.toLowerCase()
      .replace(/['']/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-');

    // Get preview MP3 path to check if it exists
    const previewPath = `/Users/jade/music-store/public/audio/${id}.mp3`;
    let trackList = [];

    // Try to extract track list from preview generation output or ZIP
    try {
      const tempDir = `/tmp/tracklist_${Date.now()}`;
      execSync(`unzip -q "${path.join(dir, file)}" -d "${tempDir}"`, { stdio: 'pipe' });
      const audioFiles = execSync(`find "${tempDir}" -type f \\( -iname "*.mp3" -o -iname "*.wav" -o -iname "*.aiff" \\) | sort`, { encoding: 'utf8' })
        .split('\n')
        .filter(f => f)
        .map(f => {
          const basename = path.basename(f);
          // Extract track name from filename (remove number prefix and extension)
          return basename
            .replace(/^[^-]*- /, '') // Remove "Artist - Album - 01 " prefix
            .replace(/\.[^.]+$/, ''); // Remove extension
        });

      if (audioFiles.length > 0) {
        trackList = audioFiles;
      }

      execSync(`rm -rf "${tempDir}"`);
    } catch (e) {
      // Default track list if extraction fails
      trackList = ['Track 1', 'Track 2', 'Track 3'];
    }

    albums.push({
      id,
      title,
      artist: 'JAde Wii',
      price: 10.00,
      type: 'album',
      category,
      image: `/images/albums/${id}.jpg`,
      trackList,
      stripePriceId: 'price_REPLACE_ME',
      downloadFile: `${category}/${file}`
    });
  });

  return albums;
}

// Get all albums from each category
const mixtapes = getAlbumsFromDirectory('mixtapes', '/Users/jade/music-store/downloads/mixtapes');
const modular = getAlbumsFromDirectory('modular', '/Users/jade/music-store/downloads/modular');
const electronic = getAlbumsFromDirectory('electronic', '/Users/jade/music-store/downloads/electronic');
const lofi = getAlbumsFromDirectory('lofi', '/Users/jade/music-store/downloads/lofi');

// Combine all albums
const allAlbums = [...mixtapes, ...modular, ...electronic, ...lofi];

// Generate the products.js content
const productsContent = `// Auto-generated product catalog
// Total albums: ${allAlbums.length}

export const products = [
${allAlbums.map(album => `  {
    id: '${album.id}',
    title: '${album.title.replace(/'/g, "\\'")}',
    artist: '${album.artist}',
    price: ${album.price.toFixed(2)},
    type: '${album.type}',
    category: '${album.category}',
    image: '${album.image}',
    trackList: [${album.trackList.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
    stripePriceId: '${album.stripePriceId}',
    downloadFile: '${album.downloadFile}'
  }`).join(',\n')}
];
`;

// Write the new products.js
fs.writeFileSync('/Users/jade/music-store/lib/data/products.js', productsContent);

console.log('✓ Rebuilt products.js with ALL albums');
console.log('  - Mixtapes:', mixtapes.length);
console.log('  - Modular:', modular.length);
console.log('  - Electronic:', electronic.length);
console.log('  - LoFi:', lofi.length);
console.log('  - Total:', allAlbums.length);