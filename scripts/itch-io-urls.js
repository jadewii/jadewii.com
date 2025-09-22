// Helper to generate Itch.io URLs for all albums
// Format: https://jadewii.itch.io/[album-slug]/purchase

const albums = [
  'charlies-doomed-christmas',
  'common-side-effects',
  'dan-da-damned',
  'drone-sightings',
  'honey',
  'how-the-grinch-chilled-christmas',
  'rudolf-the-lofi-reindeer',
  'tiny-tape-vol-1',
  'white-lotus',
  'a-bit-of-red-in-the-blue',
  'battle-of-wolves',
  'enlightened-ape',
  // Add more as you upload them to Itch.io
];

console.log('Add these URLs to your products.js file:\n');

albums.forEach(slug => {
  console.log(`itchioUrl: 'https://jadewii.itch.io/${slug}/purchase',`);
});

console.log('\nDirect checkout URLs generated!');
console.log('Remember to upload each album to Itch.io first.');