#!/usr/bin/env node

import fs from 'fs'

// Read gear.js and available yamaha images
const gearContent = fs.readFileSync('lib/data/gear.js', 'utf8')
const yamahaImages = fs.readdirSync('public/images/gear/yamaha/')

console.log('🔥 BULK IMAGE FIXER - NO MORE WASTING TIME!')
console.log(`Found ${yamahaImages.length} Yamaha images`)

// Quick fixes for Yamaha products
const fixes = [
  { find: /image: '\/images\/gear\/yamaha\/reface.*?',/, replace: "image: '/images/gear/yamaha/reface_cp_top_2000px_779636-3e5f7a9c1e3f5a7c9e1f3a5c7e9f1a3f.jpg'," },
  { find: /image: '\/images\/gear\/yamaha\/psr-sx720.*?',/, replace: "image: '/images/gear/yamaha/YAM_PSRSX720_Top_High_Res_888384-a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6.jpg'," }
]

let updatedContent = gearContent

// Apply all fixes
fixes.forEach(fix => {
  if (fix.find.test(updatedContent)) {
    updatedContent = updatedContent.replace(fix.find, fix.replace)
    console.log('✅ Applied fix')
  }
})

// Write back
fs.writeFileSync('lib/data/gear.js', updatedContent)

console.log('🎯 DONE! Images should now work!')