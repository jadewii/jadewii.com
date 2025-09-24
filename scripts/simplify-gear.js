#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 SIMPLIFYING GEAR DATA - Just images and ZZounds links!')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Extract all products using regex
const productRegex = /\{\s*id: '([^']+)',\s*title: '([^']+)',\s*brand: '([^']+)',\s*category: '([^']+)',\s*image: '([^']+)',\s*zzoundsUrl: '([^']+)',\s*price: ([0-9.]+),\s*description: '([^']+)'\s*\}/g

const products = []
let match

while ((match = productRegex.exec(gearContent)) !== null) {
  const [, id, title, brand, category, image, zzoundsUrl, price, description] = match

  products.push({
    id,
    title,
    brand,
    image,
    zzoundsUrl
  })
}

console.log(`📊 Simplified ${products.length} products`)

// Generate simplified gear.js
const newGearContent = `export const gear = [
${products.map(product => `  {
    id: '${product.id}',
    title: '${product.title}',
    brand: '${product.brand}',
    image: '${product.image}',
    zzoundsUrl: '${product.zzoundsUrl}'
  }`).join(',\n')}
]`

// Write simplified gear.js
fs.writeFileSync(gearFilePath, newGearContent)

console.log(`\n✅ SIMPLIFICATION COMPLETE!`)
console.log(`🖼️  Just images + ZZounds links`)
console.log(`🔗 Clean affiliate setup`)
console.log(`📱 Users click image → go to ZZounds for real product info`)

// Show breakdown by brand
const brandCounts = {}
products.forEach(product => {
  brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1
})

console.log(`\n📦 Products by brand:`)
Object.entries(brandCounts).sort().forEach(([brand, count]) => {
  console.log(`   ${brand}: ${count} products`)
})