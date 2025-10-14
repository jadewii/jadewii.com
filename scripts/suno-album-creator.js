#!/usr/bin/env node

/**
 * Suno Album Creator
 * Complete workflow for creating albums from Suno songs + artwork
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  imageFolder: '/Users/jade/Documents/suno covers',
  outputFolder: './generated-albums',
  albumsFolder: './public/images/albums',
  songsPerAlbum: 10,
  price: 15.00,
  artist: 'JAde Wii'
};

// Helper functions
function createAlbumId(filename) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createAlbumTitle(filename) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/Image_fx - \d{4}-\d{2}-\d{2}T\d+\.\d+/, 'AI Generated')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim() || 'Untitled Album';
}

function scanImages() {
  console.log('🎨 Scanning Suno cover images...');

  if (!fs.existsSync(CONFIG.imageFolder)) {
    console.error(`❌ Image folder not found: ${CONFIG.imageFolder}`);
    return [];
  }

  const files = fs.readdirSync(CONFIG.imageFolder)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    })
    .filter(file => !file.startsWith('.'));

  console.log(`✅ Found ${files.length} cover images`);
  return files;
}

// Step 1: Prepare album structure (without songs yet)
function createAlbumStructure() {
  console.log('🏗️  Creating album structure...');

  const images = scanImages();
  const albums = [];

  // Create albums for first 20 images (you can adjust this)
  images.slice(0, 20).forEach((imageFile, index) => {
    const albumId = createAlbumId(imageFile);
    const albumTitle = createAlbumTitle(imageFile);

    const album = {
      id: albumId,
      title: albumTitle,
      artist: CONFIG.artist,
      price: CONFIG.price,
      type: 'album',
      category: 'modular',
      image: `/images/albums/${imageFile}`,
      itchioUrl: '', // Add when uploaded to itch.io
      songs: [], // To be filled with Suno songs
      description: `An AI-generated album featuring experimental electronic compositions.`,
      releaseDate: new Date().toISOString().split('T')[0],
      sourceImage: imageFile,
      generated: true,
      sunoSongs: [] // Placeholder for Suno song URLs/IDs
    };

    albums.push(album);
  });

  // Create output directory
  if (!fs.existsSync(CONFIG.outputFolder)) {
    fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
  }

  // Save album structure
  const outputFile = path.join(CONFIG.outputFolder, 'album-structure.json');
  fs.writeFileSync(outputFile, JSON.stringify(albums, null, 2));

  console.log(`✅ Created structure for ${albums.length} albums`);
  return albums;
}

// Step 2: Copy selected images to albums folder
function copyImagesToAlbums(albums) {
  console.log('📁 Copying selected images to albums folder...');

  if (!fs.existsSync(CONFIG.albumsFolder)) {
    fs.mkdirSync(CONFIG.albumsFolder, { recursive: true });
  }

  let copiedCount = 0;

  albums.forEach(album => {
    const sourcePath = path.join(CONFIG.imageFolder, album.sourceImage);
    const destPath = path.join(CONFIG.albumsFolder, album.sourceImage);

    try {
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        copiedCount++;
        console.log(`  ✅ ${album.sourceImage}`);
      } else {
        console.log(`  ⚠️  Source not found: ${album.sourceImage}`);
      }
    } catch (error) {
      console.log(`  ❌ Error copying ${album.sourceImage}: ${error.message}`);
    }
  });

  console.log(`📋 Copied ${copiedCount}/${albums.length} images`);
}

// Step 3: Create manual Suno integration template
function createSunoIntegrationGuide(albums) {
  console.log('📖 Creating Suno integration guide...');

  const guide = `
# 🎵 Suno Integration Guide

You have ${albums.length} albums ready for Suno songs!

## Manual Steps (since songs are still on Suno):

### Option 1: Bulk Download from Suno
1. Go to your Suno account
2. Download all your songs (if Suno allows bulk download)
3. Organize into batches of 10 songs each
4. Run: \`node scripts/add-songs-to-albums.js\`

### Option 2: Manual Assignment
For each album below, assign 10 songs from your Suno collection:

${albums.map((album, i) => `
## Album ${i + 1}: ${album.title}
- **ID**: ${album.id}
- **Cover**: ${album.sourceImage}
- **Songs needed**: 10 tracks
- **Suno song IDs/URLs**: [Add your 10 Suno song URLs here]

`).join('')}

### Option 3: Suno API (Advanced)
If Suno has an API, we can automate this process.

## Next Steps:
1. Choose one of the options above
2. Run: \`node scripts/finalize-albums.js\` when songs are ready
3. Upload to your website: \`node scripts/deploy-albums.js\`

Generated: ${new Date().toISOString()}
`;

  const guideFile = path.join(CONFIG.outputFolder, 'SUNO_INTEGRATION_GUIDE.md');
  fs.writeFileSync(guideFile, guide);

  console.log(`📖 Guide created: ${guideFile}`);
}

// Step 4: Create helper script for adding songs
function createSongAdderScript() {
  const script = `#!/usr/bin/env node

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
console.log(\`Found \${albums.length} albums ready for songs\\n\`);

// Example of how to add songs to an album
function addSongsToAlbum(albumId, songUrls) {
  const album = albums.find(a => a.id === albumId);
  if (!album) {
    console.error(\`❌ Album not found: \${albumId}\`);
    return;
  }

  album.songs = songUrls.slice(0, 10).map((url, i) => ({
    title: \`Track \${i + 1}\`, // You can customize these
    duration: '3:30', // You can get actual durations
    audioUrl: url
  }));

  console.log(\`✅ Added \${album.songs.length} songs to "\${album.title}"\`);
}

// Example usage - customize this section:
console.log('📝 To add songs, edit this script and use:');
console.log('addSongsToAlbum("album-id", ["url1", "url2", ...]);\\n');

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
`;

  const scriptFile = './scripts/add-songs-to-albums.js';
  fs.writeFileSync(scriptFile, script);
  console.log(`🔧 Helper script created: ${scriptFile}`);
}

// Main execution
function main() {
  console.log('🎵 Suno Album Creator 🎨');
  console.log('========================');

  // Step 1: Create album structure
  const albums = createAlbumStructure();

  // Step 2: Copy images
  copyImagesToAlbums(albums);

  // Step 3: Create integration guide
  createSunoIntegrationGuide(albums);

  // Step 4: Create helper scripts
  createSongAdderScript();

  console.log('\n🎉 Setup Complete!');
  console.log('📋 Summary:');
  console.log(`   - ${albums.length} albums created`);
  console.log(`   - ${scanImages().length} images available`);
  console.log(`   - Images copied to: ${CONFIG.albumsFolder}`);
  console.log('\n⚡ Next: Check generated-albums/SUNO_INTEGRATION_GUIDE.md');
}

if (require.main === module) {
  main();
}

module.exports = { createAlbumStructure, copyImagesToAlbums };