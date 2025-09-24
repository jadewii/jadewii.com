#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { gearProducts } from '../lib/data/gear.js'

// Find all available images
function findAllImages() {
  const imagesDir = '/Users/jade/music-store-fresh/public/images/gear'
  const images = []

  function scanDir(dir) {
    try {
      const items = fs.readdirSync(dir)
      for (const item of items) {
        const fullPath = path.join(dir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          scanDir(fullPath)
        } else if (item.match(/\.(jpg|jpeg|png|webp)$/i)) {
          // Convert to relative path for web use
          const relativePath = fullPath.replace('/Users/jade/music-store-fresh/public', '')
          images.push({
            filename: item,
            fullPath: relativePath,
            brand: path.dirname(fullPath).split('/').pop()
          })
        }
      }
    } catch (err) {
      console.log(`Could not scan ${dir}:`, err.message)
    }
  }

  scanDir(imagesDir)
  return images
}

// Smart matching function
function findBestImageMatch(product, availableImages) {
  const productName = product.title.toLowerCase()
  const productId = product.id.toLowerCase()

  // Filter by brand first
  const brandImages = availableImages.filter(img =>
    img.brand.toLowerCase() === product.brand.toLowerCase()
  )

  if (brandImages.length === 0) {
    return null
  }

  // Look for exact matches in filename
  for (const img of brandImages) {
    const filename = img.filename.toLowerCase()

    // Extract key words from product name
    const productWords = productName
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2)

    // Check if filename contains key product words
    const matches = productWords.filter(word => filename.includes(word))

    if (matches.length >= 2) {
      return img.fullPath
    }
  }

  // Fallback: return first image from brand
  return brandImages[0]?.fullPath || null
}

// Fix images
function fixImages() {
  console.log('🖼️ Fixing missing images...\n')

  const availableImages = findAllImages()
  console.log(`Found ${availableImages.length} available images`)

  let fixed = 0
  const updates = []

  for (const product of gearProducts) {
    // Check if current image exists
    const currentImagePath = `/Users/jade/music-store-fresh/public${product.image}`

    if (!fs.existsSync(currentImagePath)) {
      const bestMatch = findBestImageMatch(product, availableImages)

      if (bestMatch) {
        updates.push({
          id: product.id,
          title: product.title,
          oldImage: product.image,
          newImage: bestMatch
        })
        fixed++
      }
    }
  }

  console.log(`\n📊 Results:`)
  console.log(`✅ ${fixed} images can be fixed`)
  console.log(`❌ ${gearProducts.length - fixed} products still need images`)

  if (updates.length > 0) {
    console.log('\n🔧 Image fixes needed:')
    updates.forEach(update => {
      console.log(`${update.title}: ${update.newImage}`)
    })
  }

  return updates
}

// Test affiliate links
async function testLinks() {
  console.log('\n🔗 Testing affiliate links...\n')

  const testProducts = gearProducts.slice(0, 10) // Test first 10

  for (const product of testProducts) {
    if (product.zzoundsUrl) {
      try {
        const response = await fetch(product.zzoundsUrl, { method: 'HEAD' })
        const status = response.status

        if (status === 200 || status === 301 || status === 302) {
          console.log(`✅ ${product.title}: ${status}`)
        } else {
          console.log(`❌ ${product.title}: ${status}`)
        }
      } catch (err) {
        console.log(`❌ ${product.title}: ${err.message}`)
      }

      // Small delay to be polite
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
}

// Main execution
console.log('🛠️ Gear Images & Links Fixer')
console.log('============================\n')

const imageUpdates = fixImages()

if (process.argv.includes('--test-links')) {
  testLinks()
}

if (process.argv.includes('--show-available')) {
  console.log('\n📁 Available images by brand:')
  const availableImages = findAllImages()
  const byBrand = {}

  availableImages.forEach(img => {
    if (!byBrand[img.brand]) byBrand[img.brand] = []
    byBrand[img.brand].push(img.filename)
  })

  Object.entries(byBrand).forEach(([brand, files]) => {
    console.log(`\n${brand.toUpperCase()}: ${files.length} images`)
    files.slice(0, 5).forEach(file => console.log(`  ${file}`))
    if (files.length > 5) console.log(`  ... and ${files.length - 5} more`)
  })
}