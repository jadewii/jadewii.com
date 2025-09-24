#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

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
  const productBrand = product.brand.toLowerCase()

  // Filter by brand first
  const brandImages = availableImages.filter(img =>
    img.brand.toLowerCase() === productBrand
  )

  if (brandImages.length === 0) {
    console.log(`No images found for brand: ${productBrand}`)
    return null
  }

  // Extract key words from product name for matching
  const productWords = productName
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 1)

  console.log(`Looking for ${product.title} (${productWords.join(', ')})`)

  // Score each image based on how many product words it contains
  const scoredImages = brandImages.map(img => {
    const filename = img.filename.toLowerCase()
    let score = 0

    productWords.forEach(word => {
      if (filename.includes(word)) {
        score += 1
        console.log(`  Match: "${word}" found in ${img.filename}`)
      }
    })

    return { ...img, score }
  })

  // Sort by score (highest first)
  scoredImages.sort((a, b) => b.score - a.score)

  if (scoredImages[0].score > 0) {
    console.log(`  ✅ Best match: ${scoredImages[0].filename} (score: ${scoredImages[0].score})`)
    return scoredImages[0].fullPath
  }

  // If no matches, return first available image from brand
  console.log(`  ⚠️ No good matches, using first available: ${brandImages[0].filename}`)
  return brandImages[0].fullPath
}

// Apply image fixes to gear.js
function applyAllImageFixes() {
  console.log('🔍 Smart Image Matcher')
  console.log('=====================\\n')

  const availableImages = findAllImages()
  console.log(`Found ${availableImages.length} available images\\n`)

  const gearFilePath = '/Users/jade/music-store-fresh/lib/data/gear.js'
  let gearContent = fs.readFileSync(gearFilePath, 'utf8')

  // Parse the gear products from the file
  const gearProductsMatch = gearContent.match(/export const gearProducts = \[([\s\S]*)\]/)
  if (!gearProductsMatch) {
    console.error('Could not parse gearProducts from gear.js')
    return
  }

  let fixesApplied = 0

  // Import the gear products to get the actual data
  import('../lib/data/gear.js').then(({ gearProducts }) => {
    for (const product of gearProducts) {
      // Check if current image exists
      const currentImagePath = `/Users/jade/music-store-fresh/public${product.image}`

      if (!fs.existsSync(currentImagePath)) {
        console.log(`\\n🔧 Fixing missing image for: ${product.title}`)
        const bestMatch = findBestImageMatch(product, availableImages)

        if (bestMatch && bestMatch !== product.image) {
          // Update the image path in the gear.js content
          const productRegex = new RegExp(
            `(id: '${product.id}'[\\s\\S]*?image: ')([^']*)(')`,
            'g'
          )

          if (productRegex.test(gearContent)) {
            gearContent = gearContent.replace(productRegex, `$1${bestMatch}$3`)
            console.log(`    Updated to: ${bestMatch}`)
            fixesApplied++
          }
        }
      } else {
        console.log(`✅ ${product.title} - image exists`)
      }
    }

    // Write the updated gear.js file
    fs.writeFileSync(gearFilePath, gearContent)

    console.log(`\\n📊 Summary:`)
    console.log(`✅ Applied ${fixesApplied} image fixes`)
    console.log(`🎯 ${gearProducts.length - fixesApplied} products already had working images`)
    console.log('\\n✨ gear.js has been updated!')
  })
}

applyAllImageFixes()