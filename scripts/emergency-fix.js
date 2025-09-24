#!/usr/bin/env node

import fs from 'fs'

console.log('🚨 EMERGENCY FIX - Using actual image files')

const gearFilePath = '/Users/jade/music-store-fresh/lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Quick fixes with ACTUAL existing files
const fixes = [
  // Use actual MX images that exist
  { find: /yamaha-mx88.*?image: '[^']*'/, replace: `id: 'yamaha-mx88',
    title: 'Yamaha MX88',
    brand: 'Yamaha',
    price: 799.99,
    description: '88-key synthesizer with comprehensive sound library',
    image: '/images/gear/yamaha/MX88-top-2fdddea7a2838841704616c65fc4129e.jpg'` },

  { find: /yamaha-mx61.*?image: '[^']*'/, replace: `id: 'yamaha-mx61',
    title: 'Yamaha MX61',
    brand: 'Yamaha',
    price: 599.99,
    description: '61-key synthesizer with great sound engine',
    image: '/images/gear/yamaha/MX61BK_o_0001-74a0b9e8e66a6835e787eaa89e2de871.jpg'` },

  { find: /yamaha-mx49.*?image: '[^']*'/, replace: `id: 'yamaha-mx49',
    title: 'Yamaha MX49',
    brand: 'Yamaha',
    price: 449.99,
    description: '49-key compact synthesizer',
    image: '/images/gear/yamaha/MX49BK_o_0001-30383ab389bb4a4c39d9c8c1d5ad6e39.jpg'` }
]

// Apply all fixes
fixes.forEach(fix => {
  if (fix.find.test(gearContent)) {
    gearContent = gearContent.replace(fix.find, fix.replace)
    console.log('✅ Applied emergency fix')
  }
})

// Write back
fs.writeFileSync(gearFilePath, gearContent)

console.log('🎯 EMERGENCY FIXES APPLIED!')