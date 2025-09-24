#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

console.log('🔍 VISUAL PRODUCT IDENTIFICATION HELPER')
console.log('This script will help you identify products by showing image paths for manual lookup')

// Get all available images by brand
const imageDir = 'public/images/gear'
const allBrands = ['akai', 'korg', 'moog', 'yamaha', 'arturia', 'elektron', 'roland', 'boss', 'novation', 'strymon', 'te', 'cables']

const allImages = {}
let totalImages = 0

allBrands.forEach(brand => {
  const brandDir = path.join(imageDir, brand)
  if (fs.existsSync(brandDir)) {
    allImages[brand] = fs.readdirSync(brandDir).filter(f => f.endsWith('.jpg'))
    totalImages += allImages[brand].length
  }
})

console.log(`\n📊 Total images to identify: ${totalImages}`)
console.log('\n🎯 BRAND BREAKDOWN:')

// Show images by brand for systematic identification
Object.entries(allImages).forEach(([brand, images]) => {
  console.log(`\n=== ${brand.toUpperCase()} (${images.length} images) ===`)
  images.forEach((image, index) => {
    console.log(`${index + 1}. ${image}`)
    console.log(`   View: http://localhost:3003/images/gear/${brand}/${image}`)
  })
})

console.log('\n📝 INSTRUCTIONS:')
console.log('1. Open each image URL in your browser')
console.log('2. Identify the product by looking at the image')
console.log('3. Search for it on zzounds.com to get the exact name and URL')
console.log('4. Create a mapping file with the correct information')

// Create a template mapping file
const templateMapping = `// Product identification mapping
// Fill this out after visually identifying each product

export const productMapping = {
${Object.entries(allImages).map(([brand, images]) => {
  return `  // ${brand.toUpperCase()} PRODUCTS\n` +
         images.map(image => `  '${image}': {\n    name: '',\n    zzoundsUrl: '',\n    category: 'synthesizer',\n    price: 599.00\n  }`).join(',\n')
}).join(',\n\n')}
}`

fs.writeFileSync('scripts/product-mapping.js', templateMapping)

console.log('\n✅ Created template mapping file: scripts/product-mapping.js')
console.log('💡 Fill out this file with correct product information after visual identification')