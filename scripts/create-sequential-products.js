#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

console.log('🎹 CREATING SEQUENTIAL PRODUCTS')

// Read the Sequential images to get the product list
const sequentialImageDir = 'public/images/gear/sequential-zz'
const imageFiles = fs.readdirSync(sequentialImageDir)

console.log('Found Sequential images:', imageFiles)

// Map filenames to proper Sequential product names based on ZZounds catalog
const sequentialProducts = [
  {
    id: 'sequential-prophet-6',
    title: 'Sequential Prophet-6 Polyphonic Analog Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 2799.00,
    image: '/images/gear/sequential-zz/DSI_Prophet-6_top-020a73cd4da1dc66908f354be909a793.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQPROPHET6'
  },
  {
    id: 'sequential-ob-6',
    title: 'Sequential OB-6 Polyphonic Analog Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 2999.00,
    image: '/images/gear/sequential-zz/OB-6-Top-e4f17405cf7d41cc5b35acd2b4a8fe40.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQOB6'
  },
  {
    id: 'sequential-ob-6-desktop',
    title: 'Sequential OB-6 Desktop Module',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 2299.00,
    image: '/images/gear/sequential-zz/OB-6DesktopModule-c2c71c9a4e5d2ab00ddb1242b62e4fb7.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQOB6DESKTOP'
  },
  {
    id: 'sequential-prophet-10',
    title: 'Sequential Prophet-10 Polyphonic Analog Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 4499.00,
    image: '/images/gear/sequential-zz/Prophet-10_Front_Angle_2_820177-81728cc03e860577f7dbca09af7d9b06.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQPROPHET10'
  },
  {
    id: 'sequential-prophet-10-module',
    title: 'Sequential Prophet-10 Desktop Module',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 3799.00,
    image: '/images/gear/sequential-zz/P-10-Front-Angle-2_835752-42a511a941755af2ae70531ba2a3e446.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQPROPHET10MOD'
  },
  {
    id: 'sequential-prophet-5',
    title: 'Sequential Prophet-5 Polyphonic Analog Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 3999.00,
    image: '/images/gear/sequential-zz/Prophet-5_Top_820175-b27ac0221771a87eba7cbbe7476eea62.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQPROPHET5'
  },
  {
    id: 'sequential-prophet-rev2',
    title: 'Sequential Prophet REV2 Polyphonic Analog Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 1999.00,
    image: '/images/gear/sequential-zz/ProphetRev2_Toasp-c7423bf821f2bba95972baf46e2306ca.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQPROPHETREV2'
  },
  {
    id: 'sequential-pro-3',
    title: 'Sequential Pro 3 Hybrid Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 1599.00,
    image: '/images/gear/sequential-zz/Pro_3_Front_Angle_812393-1208a6e2fe6e1ba08feee79c1561d347.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQPRO3'
  },
  {
    id: 'sequential-take-5',
    title: 'Sequential Take 5 Polyphonic Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 1299.00,
    image: '/images/gear/sequential-zz/Take-5-Top-853e5ac8b587d978fcc99ad8a0537bbc.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQTAKE5'
  },
  {
    id: 'sequential-take-5-desktop',
    title: 'Sequential Take 5 Desktop Module',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 999.00,
    image: '/images/gear/sequential-zz/SEQ_TAKE5DESKTOP_Angle_1_901477-e9340634fbf289e28e90159f669b23cd.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQTAKE5DESKTOP'
  },
  {
    id: 'sequential-trigon-6',
    title: 'Sequential Trigon-6 Desktop Analog Synthesizer',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 1799.00,
    image: '/images/gear/sequential-zz/Trigon6_top_2101_Transparent_6800px_858848-a7017b3486b001ed99ffe674018726c1.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQTRIGON6'
  },
  {
    id: 'sequential-trigon-6-desktop',
    title: 'Sequential Trigon-6 Desktop Module',
    brand: 'Sequential',
    category: 'synthesizer',
    price: 1499.00,
    image: '/images/gear/sequential-zz/Trigon6_DM_Front1_7161_transparent_873843-d1f472eb860f9366d74a2325b0e6df80.jpg',
    zzoundsUrl: 'https://www.zzounds.com/item--SEQTRIGON6DESKTOP'
  }
]

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Add Sequential products to the gear array
const productsToAdd = sequentialProducts.map(product => {
  return `  {
    id: '${product.id}',
    title: '${product.title}',
    brand: '${product.brand}',
    category: '${product.category}',
    price: ${product.price},
    image: '${product.image}',
    zzoundsUrl: '${product.zzoundsUrl}'
  }`
}).join(',\n')

// Find the last product in the array and insert Sequential products before the closing bracket
const lastProductMatch = gearContent.lastIndexOf('  }')
const insertPosition = gearContent.indexOf('\n]', lastProductMatch)

const updatedContent = gearContent.slice(0, insertPosition) + ',\n\n  // Sequential Products\n' + productsToAdd + '\n' + gearContent.slice(insertPosition)

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ SEQUENTIAL PRODUCTS ADDED!')
console.log('📝 Added products:')
sequentialProducts.forEach(product => {
  console.log(`   • ${product.title}`)
})