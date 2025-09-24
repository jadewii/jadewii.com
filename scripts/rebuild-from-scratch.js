#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

console.log('🔨 REBUILDING GEAR.JS FROM SCRATCH WITH ALL IMAGES')

// Get all available images by brand
const imageDir = 'public/images/gear'
const allBrands = ['akai', 'korg', 'moog', 'yamaha', 'arturia', 'elektron', 'roland', 'boss', 'novation', 'strymon', 'te', 'cables']

const allImages = {}
let totalImages = 0

allBrands.forEach(brand => {
  const brandDir = path.join(imageDir, brand)
  if (fs.existsSync(brandDir)) {
    allImages[brand] = fs.readdirSync(brandDir).filter(f => f.endsWith('.jpg'))
    console.log(`📁 ${brand.toUpperCase()}: ${allImages[brand].length} images`)
    totalImages += allImages[brand].length
  }
})

console.log(`\n🎯 TOTAL IMAGES: ${totalImages}`)

// Function to extract clean product names from image filenames
function extractProductName(imagePath, brand) {
  const filename = path.basename(imagePath, '.jpg')

  // Remove hash suffixes
  let cleanName = filename.replace(/[-_][a-f0-9]{32}$/, '')
                          .replace(/[-_][a-f0-9]{8,}$/, '')
                          .replace(/_\d{6,}$/, '')

  // Brand-specific name cleaning
  const nameMap = {
    // Korg products
    'volcaModular_top': 'Korg Volca Modular',
    'volcaBeats': 'Korg Volca Beats',
    'volcaKeys': 'Korg Volca Keys',
    'volcaBass': 'Korg Volca Bass',
    'volcaFM': 'Korg Volca FM',
    'volcaSample': 'Korg Volca Sample',
    'volcaDrum': 'Korg Volca Drum',
    'volcaKick': 'Korg Volca Kick',
    'volcaNubass': 'Korg Volca Nubass',

    // Roland products
    'Roland_FP-E50_Digital_Piano': 'Roland FP-E50 Digital Piano',
    'Roland_JD-Xi_Interactive_Analog': 'Roland JD-Xi Synthesizer',
    'Roland_Jupiter-X_Synthesizer': 'Roland Jupiter-X',
    'Roland_MC-707_Groovebox': 'Roland MC-707',
    'Roland_SH-4d_Desktop_Synthesizer': 'Roland SH-4d',

    // Akai products
    'AKA-FORCE-PAK': 'Akai Force',

    // Novation products
    'Bass-Station-II-Top': 'Novation Bass Station II',
    'Circuit-Rhythm_overhead_Track-1_HR': 'Novation Circuit Rhythm',
    'Circuit-Tracks_overhead_Synth1_HR': 'Novation Circuit Tracks',
    'FLKey-49_Overhead_Seq_HR-1': 'Novation FLkey 49',
    'NOV_LNCHCNTRLXL3_Top': 'Novation Launch Control XL'
  }

  // Check direct mapping first
  if (nameMap[cleanName]) {
    return nameMap[cleanName]
  }

  // Clean up the name
  cleanName = cleanName.replace(/[-_]/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())
                      .replace(/\s+/g, ' ')
                      .trim()

  // Add brand prefix if not present
  const brandCap = brand.charAt(0).toUpperCase() + brand.slice(1)
  if (!cleanName.toLowerCase().includes(brand.toLowerCase())) {
    cleanName = `${brandCap} ${cleanName}`
  }

  return cleanName
}

// Function to generate ZZounds URLs
function generateZZoundsUrl(productName, brand) {
  const baseUrl = 'http://zzounds.com/a--3971462/item--'

  // Generate product code based on name
  let code = productName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  if (code.length > 12) {
    code = code.substring(0, 12)
  }

  return baseUrl + code
}

// Generate products for all images
const products = []

Object.entries(allImages).forEach(([brand, images]) => {
  images.forEach((image, index) => {
    const imagePath = `/images/gear/${brand}/${image}`
    const productName = extractProductName(imagePath, brand)
    const productId = `${brand}-${image.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`

    // Determine category
    let category = 'synthesizer'
    const nameLower = productName.toLowerCase()
    if (nameLower.includes('drum') || nameLower.includes('rhythm') || nameLower.includes('beats')) {
      category = 'drum-machine'
    } else if (nameLower.includes('piano') || nameLower.includes('key')) {
      category = 'keyboard'
    } else if (nameLower.includes('guitar') || nameLower.includes('amp')) {
      category = 'amplifier'
    } else if (nameLower.includes('interface') || nameLower.includes('audio')) {
      category = 'audio-interface'
    } else if (nameLower.includes('control') || nameLower.includes('midi')) {
      category = 'controller'
    } else if (brand === 'cables') {
      category = 'accessory'
    }

    // Generate price based on brand and category
    let price = 599.00
    if (brand === 'moog') price = 899.00
    else if (brand === 'elektron') price = 799.00
    else if (brand === 'roland' && nameLower.includes('jupiter')) price = 1299.00
    else if (brand === 'yamaha' && nameLower.includes('montage')) price = 1499.00
    else if (category === 'drum-machine') price = 699.00
    else if (category === 'keyboard') price = 799.00
    else if (category === 'controller') price = 299.00
    else if (brand === 'cables') price = 29.99

    products.push({
      id: productId,
      title: productName,
      brand: brand.charAt(0).toUpperCase() + brand.slice(1),
      category: category,
      image: imagePath,
      zzoundsUrl: generateZZoundsUrl(productName, brand),
      price: price,
      description: `Professional ${brand} music equipment`
    })
  })
})

console.log(`\n🎉 Generated ${products.length} products from ${totalImages} images`)

// Create the gear.js file
const gearContent = `export const gear = [
${products.map(product => `  {
    id: '${product.id}',
    title: '${product.title}',
    brand: '${product.brand}',
    category: '${product.category}',
    image: '${product.image}',
    zzoundsUrl: '${product.zzoundsUrl}',
    price: ${product.price},
    description: '${product.description}'
  }`).join(',\n')}
]`

// Write to gear.js
fs.writeFileSync('lib/data/gear.js', gearContent)

console.log(`\n✅ COMPLETE! Created gear.js with ${products.length} products`)
console.log(`🖼️  Every image now has a unique product`)
console.log(`📦 Products by brand:`)

const brandCounts = {}
products.forEach(product => {
  brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1
})

Object.entries(brandCounts).sort().forEach(([brand, count]) => {
  console.log(`   ${brand}: ${count} products`)
})