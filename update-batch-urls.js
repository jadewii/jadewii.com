const fs = require('fs');

// Map of album IDs to Itch.io checkout URLs
const updates = {
  'fish-out-of-water': 'https://itch.io/checkout/26300978?sig=%2BO2zTMpG2nPmyxQqMxN%2BQD674vs%3D',
  'unimpressed': 'https://itch.io/checkout/26301005?sig=SsXpp%2FJZjKh%2FJu9iD5zM4qAkTVQ%3D',
  'translucent-dreams': 'https://itch.io/checkout/26301013?sig=Q92hCJgC4sKwpAewrO2TuylTvFw%3D',
  'tiny-overtures': 'https://itch.io/checkout/26301018?sig=Pta8evlViItWu6x62ccOViXvRhI%3D',
  'through-the-graph': 'https://itch.io/checkout/26301022?sig=B3oEs6ZW4Es1XDjN2UHyYdfMitk%3D',
  'strange-worlds': 'https://itch.io/checkout/26301027?sig=3f9bYmMFdKAe2JN15iDAhQC%2Fpq0%3D',
  'space-dali': 'https://itch.io/checkout/26301032?sig=bmCLkVB01Lise%2FXg8ZzXEuzGfeU%3D',
  'silver-servant': 'https://itch.io/checkout/26301034?sig=7GvTdwnF%2BVXJpKUio5V4%2BeRYkt4%3D',
  'shrooms-of-discovery': 'https://itch.io/checkout/26301038?sig=cllMWOb4HGOz6nNa4iwY2qJ0lJU%3D',
  'shrine-of-elderon': 'https://itch.io/checkout/26301048?sig=hlofvLU%2Fh2iiq59bpPXn0zWkCNQ%3D',
  'operation-love': 'https://itch.io/checkout/26301054?sig=S2sbrSHgbPNwGKwnU3Wb868ZZxA%3D',
  'milk-district': 'https://itch.io/checkout/26301057?sig=qe%2F6DnwQVPQ1AheDi6yBmRoeTtA%3D',
  'lady-of-lords': 'https://itch.io/checkout/26301065?sig=Uoe9nGDvUz5Sy8CBrf%2ByckA7KOs%3D',
  'wilderness-watts': 'https://itch.io/checkout/26301068?sig=7UZ925C98qGzSqPeQ7vjJmxg8Zo%3D',
  'twisted-strings': 'https://itch.io/checkout/26301070?sig=khyV1PuxzCebGMOk6I%2B68xAEqIU%3D',
  'shamans-quest': 'https://itch.io/checkout/26301072?sig=2bL3yLKkacJ3IqHGp3vJO%2FTY1cY%3D',
  'saturnian-moons': 'https://itch.io/checkout/26301075?sig=eL4B%2BSJ8QrXQvoqzxNbFZyHOJ7o%3D',
  'sacred-spaces': 'https://itch.io/checkout/26301078?sig=c%2FI651b1%2BefekNQDG7ekO7xCfsg%3D',
  'pollinated-memories': 'https://itch.io/checkout/26301082?sig=ECOvJPkYDjzd0idFam6ji%2F8Pst8%3D',
  'organic-parts': 'https://itch.io/checkout/26301087?sig=h3VVK4rmN6xXmg21KJmyKLoJUFw%3D',
  'mountains-of-shidoh': 'https://itch.io/checkout/26301095?sig=Gsfk%2BAJ8lLTwRPZYdGg%2Ba7IwJ%2B0%3D',
  'melting-waters': 'https://itch.io/checkout/26301100?sig=kzw7xwIiNtwxZOfpRNcrTayrtuU%3D',
  'gem-in-eye': 'https://itch.io/checkout/26301104?sig=2L8y%2BdD%2F3wOiSpYmbL60ynV7HQU%3D',
  'error-code': 'https://itch.io/checkout/26301107?sig=Kyp0C%2F0rJOT%2BRfWhyL4aq719KmU%3D',
  'celestial-kunzite': 'https://itch.io/checkout/26301113?sig=%2FM%2B3IVnq%2Fa89CyFKwR4x0T7lKs8%3D',
  'between-the-redwood': 'https://itch.io/checkout/26301119?sig=acGKZRZPFVKNVsKarLgTO54QIag%3D'
};

// Read the products file
const filePath = './lib/data/products.js';
let content = fs.readFileSync(filePath, 'utf8');

// Update each album
let updatedCount = 0;
for (const [albumId, itchioUrl] of Object.entries(updates)) {
  // Create regex to find the album block
  const regex = new RegExp(`(id: '${albumId}'[\\s\\S]*?)stripePriceId: 'price_REPLACE_ME',\\s*stripePaymentLink: 'https://buy\\.stripe\\.com/YOUR_LINK_HERE',`, 'g');

  if (content.includes(`id: '${albumId}'`)) {
    content = content.replace(regex, `$1itchioUrl: '${itchioUrl}',`);
    updatedCount++;
    console.log(`✓ Updated ${albumId}`);
  } else {
    console.log(`✗ Album not found: ${albumId}`);
  }
}

// Write the updated content back
fs.writeFileSync(filePath, content);
console.log(`\nTotal albums updated: ${updatedCount}`);