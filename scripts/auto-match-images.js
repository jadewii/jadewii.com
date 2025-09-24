#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

console.log('🚀 AUTO IMAGE MATCHER - Using ALL available images!')

// Read gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Get all available images by brand
const imageDir = 'public/images/gear'
const brands = ['akai', 'korg', 'moog', 'yamaha', 'arturia', 'elektron', 'roland']

const allImages = {}
brands.forEach(brand => {
  const brandDir = path.join(imageDir, brand)
  if (fs.existsSync(brandDir)) {
    allImages[brand] = fs.readdirSync(brandDir).filter(f => f.endsWith('.jpg'))
    console.log(`📁 ${brand.toUpperCase()}: ${allImages[brand].length} images`)
  }
})

// Extract products with empty images
const productMatches = []
const lines = gearContent.split('\n')

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("image: '',")) {
    // Find the product ID and title from previous lines
    let productId = null
    let productTitle = null
    let brandName = null

    for (let j = i - 10; j < i; j++) {
      if (j >= 0 && lines[j].includes("id: '")) {
        productId = lines[j].match(/id: '([^']+)'/)?.[1]
      }
      if (j >= 0 && lines[j].includes("title: '")) {
        productTitle = lines[j].match(/title: '([^']+)'/)?.[1]
      }
      if (j >= 0 && lines[j].includes("brand: '")) {
        brandName = lines[j].match(/brand: '([^']+)'/)?.[1]
      }
    }

    if (productId && productTitle && brandName) {
      productMatches.push({ productId, productTitle, brandName, lineIndex: i })
    }
  }
}

console.log(`\n🎯 Found ${productMatches.length} products with empty images`)

// Smart matching function
function findBestImageMatch(product, brandImages) {
  if (!brandImages || brandImages.length === 0) return null

  const { productTitle, productId } = product
  const searchTerms = [
    productTitle.toLowerCase(),
    productId.toLowerCase(),
    ...productTitle.toLowerCase().split(/[\s\-_]+/),
    ...productId.toLowerCase().split(/[\s\-_]+/)
  ]

  let bestMatch = null
  let bestScore = 0

  brandImages.forEach(imageName => {
    const imageNameLower = imageName.toLowerCase()
    let score = 0

    searchTerms.forEach(term => {
      if (term.length > 2 && imageNameLower.includes(term)) {
        score += term.length * 2 // Longer matches are better
      }
    })

    // Bonus for exact model number matches
    const modelNumbers = productTitle.match(/\d+/g) || []
    modelNumbers.forEach(num => {
      if (imageNameLower.includes(num)) {
        score += 10
      }
    })

    if (score > bestScore) {
      bestScore = score
      bestMatch = imageName
    }
  })

  return bestMatch
}

// Apply automatic matching
let fixCount = 0
const updates = []

productMatches.forEach(product => {
  const brandKey = product.brandName.toLowerCase()
  const brandImages = allImages[brandKey]

  if (brandImages) {
    const bestImage = findBestImageMatch(product, brandImages)
    if (bestImage) {
      const imagePath = `/images/gear/${brandKey}/${bestImage}`
      updates.push({
        product,
        imagePath,
        lineIndex: product.lineIndex
      })
      console.log(`✅ ${product.productTitle} → ${bestImage}`)
      fixCount++
    } else {
      console.log(`❌ No match found for: ${product.productTitle}`)
    }
  } else {
    console.log(`❌ No images available for brand: ${product.brandName}`)
  }
})

// Apply all updates to gear.js
console.log(`\n🔧 Applying ${fixCount} image fixes...`)

let updatedContent = gearContent
updates.forEach(update => {
  const oldPattern = "image: '',"
  const newPattern = `image: '${update.imagePath}',`

  // Find and replace the specific empty image line
  const lines = updatedContent.split('\n')
  if (lines[update.lineIndex] && lines[update.lineIndex].includes("image: '',")) {
    lines[update.lineIndex] = lines[update.lineIndex].replace(oldPattern, newPattern)
    updatedContent = lines.join('\n')
  }
})

// Write back to gear.js
fs.writeFileSync(gearFilePath, updatedContent)

console.log(`\n🎉 SUCCESS! Fixed ${fixCount} product images automatically!`)
console.log(`📊 Remaining empty images: ${productMatches.length - fixCount}`)
console.log('🌐 Your site should now show real product images!')