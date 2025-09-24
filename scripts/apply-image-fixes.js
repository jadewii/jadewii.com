#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

// Manual mappings for specific products with actual available files
const manualMappings = {
  'korg-volca-sample2': '/images/gear/korg/volca_sample_2_Front_818302-b99c9b74d58e34754a03c829b30e9919.jpg',
  'yamaha-psr-sx920': '/images/gear/yamaha/YAM_PSRSX920_Top_High_Res_888385-b36064090279709b9bd0226cec2e922e-1.jpg'
}

function applyImageFixes() {
  console.log('🔧 Applying manual image fixes...\\n')

  const gearFilePath = '/Users/jade/music-store-fresh/lib/data/gear.js'
  let gearContent = fs.readFileSync(gearFilePath, 'utf8')

  let fixesApplied = 0

  for (const [productId, imagePath] of Object.entries(manualMappings)) {
    // Check if image file exists
    const fullImagePath = `/Users/jade/music-store-fresh/public${imagePath}`

    if (fs.existsSync(fullImagePath)) {
      // Find the product in gear.js and update its image path
      const productRegex = new RegExp(
        `(id: '${productId}'[\\s\\S]*?image: ')([^']*)(')`,
        'g'
      )

      if (productRegex.test(gearContent)) {
        gearContent = gearContent.replace(productRegex, `$1${imagePath}$3`)
        console.log(`✅ Fixed ${productId}: ${imagePath}`)
        fixesApplied++
      } else {
        console.log(`⚠️  Product ${productId} not found in gear.js`)
      }
    } else {
      console.log(`❌ Image not found: ${imagePath}`)
    }
  }

  // Write the updated gear.js file
  fs.writeFileSync(gearFilePath, gearContent)

  console.log(`\\n📊 Applied ${fixesApplied} image fixes`)
  console.log('✨ gear.js has been updated with correct image paths!')
}

applyImageFixes()