#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

console.log('🚀 ADDING ALL MISSING PRODUCTS - Every image gets a product!')

// Read gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

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

console.log(`\n🎯 TOTAL AVAILABLE IMAGES: ${totalImages}`)

// Find all currently used images
const usedImages = new Set()
const imagePathRegex = /image: '\/images\/gear\/([^\/]+)\/([^']+)'/g
let match

while ((match = imagePathRegex.exec(gearContent)) !== null) {
  usedImages.add(`${match[1]}/${match[2]}`)
}

console.log(`📊 CURRENTLY USED IMAGES: ${usedImages.size}`)

// Find unused images per brand
const unusedImages = {}
let totalUnused = 0

allBrands.forEach(brand => {
  if (allImages[brand]) {
    unusedImages[brand] = allImages[brand].filter(img =>
      !usedImages.has(`${brand}/${img}`)
    )
    if (unusedImages[brand].length > 0) {
      console.log(`🔥 ${brand.toUpperCase()}: ${unusedImages[brand].length} UNUSED images that need products!`)
      totalUnused += unusedImages[brand].length
    }
  }
})

console.log(`\n💥 TOTAL UNUSED IMAGES: ${totalUnused}`)
console.log('🎯 CREATING PRODUCTS FOR ALL OF THEM!\n')

// Generate products for ALL unused images
const newSections = []

Object.entries(unusedImages).forEach(([brand, images]) => {
  if (images.length > 0) {
    const brandCapitalized = brand.charAt(0).toUpperCase() + brand.slice(1)

    newSections.push(`\n  // ${brandCapitalized.toUpperCase()} - ALL REMAINING PRODUCTS`)

    images.forEach((image, index) => {
      // Extract product name from image filename
      const baseName = image.replace(/[-_]\w{32}\.jpg$/, '') // Remove hash suffix
                          .replace(/\.jpg$/, '')
                          .replace(/[-_]/g, ' ')

      // Create meaningful product names
      let productName = baseName
      if (baseName.length < 3) {
        productName = `${brandCapitalized} ${baseName.toUpperCase()}`
      } else {
        // Capitalize each word
        productName = baseName.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      }

      const productId = `${brand}-${baseName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index + 1}`

      // Determine category based on brand and product name
      let category = 'synthesizer'
      const nameLower = productName.toLowerCase()
      if (nameLower.includes('drum') || nameLower.includes('tr-') || nameLower.includes('rytm')) {
        category = 'drum-machine'
      } else if (nameLower.includes('piano') || nameLower.includes('fp-')) {
        category = 'keyboard'
      } else if (nameLower.includes('guitar') || nameLower.includes('amp')) {
        category = 'amplifier'
      } else if (nameLower.includes('interface') || nameLower.includes('audio')) {
        category = 'audio-interface'
      } else if (brand === 'cables') {
        category = 'accessory'
      }

      newSections.push(`  {
    id: '${productId}',
    title: '${productName}',
    brand: '${brandCapitalized}',
    category: '${category}',
    image: '/images/gear/${brand}/${image}',
    zzoundsUrl: 'http://zzounds.com/a--3971462/item--PLACEHOLDER',
    price: 599.00,
    description: 'Professional music equipment'
  },`)
    })
  }
})

// Add ALL new sections to gear.js
if (newSections.length > 0) {
  console.log(`🎉 CREATING ${newSections.filter(s => s.includes('id:')).length} NEW PRODUCTS!`)

  // Insert before the closing bracket
  const insertPoint = gearContent.lastIndexOf(']')
  const updatedContent = gearContent.slice(0, insertPoint) +
    newSections.join('\n') + '\n' +
    gearContent.slice(insertPoint)

  // Write back to gear.js
  fs.writeFileSync(gearFilePath, updatedContent)

  console.log(`\n🎉 COMPLETE SUCCESS!`)
  console.log(`📊 Added ${newSections.filter(s => s.includes('id:')).length} new products`)
  console.log(`🖼️  Now using ALL ${totalImages} images!`)
  console.log('🌐 Every single image now has its own product!')

  // Show breakdown by brand
  Object.entries(unusedImages).forEach(([brand, images]) => {
    if (images.length > 0) {
      console.log(`   ✅ ${brand.toUpperCase()}: +${images.length} products`)
    }
  })
} else {
  console.log('✅ All images already have products!')
}