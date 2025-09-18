#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Map product titles to actual ZIP filenames
const downloadMappings = {
  // MIX TAPES
  "Charlie's DOOMED Christmas": "mixtapes/JAde Wii - Charlie's DOOMED Christmas.zip",
  "Common Side Effects": "mixtapes/JAde Wii - Common Side Effects.zip",
  "Dan Da Damned": "mixtapes/JAde Wii - Dan Da Damned.zip",
  "Drone Sightings": "mixtapes/JAde Wii - Drone Sightings.zip",
  "Honey": "mixtapes/JAde Wii - Honey.zip",
  "How The Grinch Chilled Christmas": "mixtapes/JAde Wii - How The Grinch Chilled Christmas.zip",
  "Rudolf The LOFI Reindeer": "mixtapes/JAde Wii - Rudolf The LOFI Reindeer.zip",
  "Tiny Tape Vol. 1": "mixtapes/JAde Wii - Tiny Tape Vol. 1.zip",
  "White Lotus": "mixtapes/JAde Wii - White Lotus.zip",

  // ELECTRONIC
  "Aphids": "electronic/JAde Wii - Aphids.zip",
  "Error Code": "electronic/JAde Wii - Error Code.zip",
  "Operation Love": "electronic/JAde Wii - Operation Love.zip",
  "Tiny Overtures": "electronic/JAde Wii - Tiny Overtures.zip",

  // MODULAR
  "A Bit of Red in the Blue": "modular/JAde Wii - A Bit of Red in the Blue.zip",
  "Above The Quadi": "modular/JAde Wii - Above The Quadi.zip",
  "Artificially Unfavored": "modular/JAde Wii - Artificially Unfavored.zip",
  "Behind the Sun": "modular/JAde Wii - Behind the Sun.zip",
  "Beneath the Bohdi": "modular/JAde Wii - Beneath the Bohdi.zip",
  "Between the Redwood": "modular/JAde Wii - Between the Redwood.zip",
  "Birds of Paradise": "modular/JAde Wii - Birds of Paradise.zip",
  "Blobs": "modular/JAde Wii - Blobs.zip",
  "Celestial Kunzite": "modular/JAde Wii - Celestial Kunzite.zip",
  "Cosmos": "modular/JAde Wii - Cosmos.zip",
  "Creatures of the Sea": "modular/JAde Wii - Creatures of the Sea.zip",
  "Curious Pez": "modular/JAde Wii - Curious Pez.zip",
  "Demodex": "modular/JAde Wii - Demodex.zip",
  "Eidos": "modular/JAde Wii - Eidos.zip",
  "Elder Of Agraban": "modular/JAde Wii - Elder Of Agraban.zip",
  "Enlightened Ape": "modular/JAde Wii - Enlightened Ape.zip",
  "Epsilon Gate": "modular/JAde Wii - Epsilon Gate.zip",
  "Fillemental": "modular/JAde Wii - Fillemental.zip",
  "Floating Gardens": "modular/JAde Wii - Floating Gardens.zip",
  "Future Plants": "modular/JAde Wii - Future Plants.zip",
  "Generations": "modular/JAde Wii - Generations.zip",
  "Glowstone": "modular/JAde Wii - Glowstone.zip",
  "Infested Ruins": "modular/JAde Wii - Infested Ruins.zip",
  "Jadenite": "modular/JAde Wii - Jadenite.zip",
  "Jungle Apes": "modular/JAde Wii - Jungle Apes.zip",
  "Kame House": "modular/JAde Wii - Kame House.zip",
  "Kid Nimbus": "modular/JAde Wii - Kid Nimbus.zip",
  "Kotas": "modular/JAde Wii - Kotas.zip",
  "Laser Caves": "modular/JAde Wii - Laser Caves.zip",
  "Long Long Time Ago": "modular/JAde Wii - Long Long Time Ago.zip",
  "Lucky Sushi": "modular/JAde Wii - Lucky Sushi.zip",
  "Modular Visions": "modular/JAde Wii - Modular Visions.zip",
  "Nova": "modular/JAde Wii - Nova.zip",
  "Opus On Ice": "modular/JAde Wii - Opus On Ice.zip",
  "Oscillations": "modular/JAde Wii - Oscillations.zip",
  "Owls": "modular/JAde Wii - Owls.zip",
  "Phantom Pluto": "modular/JAde Wii - Phantom Pluto.zip",
  "Pixelated Cave": "modular/JAde Wii - Pixelated Cave.zip",
  "Reflective": "modular/JAde Wii - Reflective.zip",
  "Sea of Simulation": "modular/JAde Wii - Sea of Simulation.zip",
  "The Fall of Draconia": "modular/JAde Wii - The Fall of Draconia.zip",
  "Topaz Palace": "modular/JAde Wii - Topaz Palace.zip",
  "Wake Up": "modular/JAde Wii - Wake Up.zip",

  // LOFI
  "Confessions of a Samurai": "lofi/JAde Wii - Confessions of a Samurai.zip",
  "Geisha Dreams": "lofi/JAde Wii - Geisha Dreams.zip",
  "Habit Garden": "lofi/JAde Wii - Habit Garden.zip",
  "Milk District": "lofi/JAde Wii - Milk District.zip",
  "Propagated Mind": "lofi/JAde Wii - Propagated Mind.zip",
  "Stealin' Dreams": "lofi/JAde Wii - Stealin' Dreams.zip",
};

// Read the current products.js file
const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.js');
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Function to update download paths
function updateDownloadPaths() {
  let updatedCount = 0;

  Object.entries(downloadMappings).forEach(([title, downloadPath]) => {
    // Create regex to find the product by title
    const titleRegex = new RegExp(`title:\\s*['"]${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');

    if (productsContent.includes(`title: '${title}'`) || productsContent.includes(`title: "${title}"`)) {
      // Find the product block and update its downloadFile
      const productRegex = new RegExp(
        `(title:\\s*['"]${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][^}]*)(downloadFile:\\s*['"][^'"]*['"])`,
        'gs'
      );

      if (productsContent.match(productRegex)) {
        productsContent = productsContent.replace(productRegex, `$1downloadFile: '${downloadPath}'`);
        updatedCount++;
        console.log(`✓ Updated download path for: ${title}`);
      } else {
        // Add downloadFile if it doesn't exist
        const addFieldRegex = new RegExp(
          `(title:\\s*['"]${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][^}]*)(stripePriceId:[^,]*,)`,
          'gs'
        );
        productsContent = productsContent.replace(addFieldRegex, `$1$2\n    downloadFile: '${downloadPath}',`);
        updatedCount++;
        console.log(`✓ Added download path for: ${title}`);
      }
    }
  });

  console.log(`\n✓ Updated ${updatedCount} products with download paths`);
  return productsContent;
}

// Update the file
const updatedContent = updateDownloadPaths();
fs.writeFileSync(productsPath, updatedContent);

console.log('\n✓ products.js has been updated with download paths!');
console.log('\nNext steps:');
console.log('1. Upload the /downloads folder to your S3 bucket');
console.log('2. Update Stripe Price IDs in products.js');
console.log('3. Configure environment variables in .env.local');