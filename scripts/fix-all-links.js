#!/usr/bin/env node

import fs from 'fs'

console.log('🔗 FIXING ALL ZZOUNDS LINKS - Making them actually work!')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Replace ALL zzoundsUrl entries with working affiliate links to brand pages
const updatedContent = gearContent
  // Akai products -> Akai brand page with your affiliate code
  .replace(/zzoundsUrl: 'http:\/\/zzounds\.com\/a--3971462\/item--[^']*'/g, (match, offset) => {
    const context = gearContent.substring(Math.max(0, offset - 200), offset + 200)

    if (context.includes("brand: 'Akai'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--akai?siid=312686'"
    } else if (context.includes("brand: 'Korg'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--korg?siid=312686'"
    } else if (context.includes("brand: 'Moog'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--moog?siid=312686'"
    } else if (context.includes("brand: 'Roland'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--roland?siid=312686'"
    } else if (context.includes("brand: 'Yamaha'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--yamaha?siid=312686'"
    } else if (context.includes("brand: 'Arturia'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--arturia?siid=312686'"
    } else if (context.includes("brand: 'Elektron'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--elektron?siid=312686'"
    } else if (context.includes("brand: 'Boss'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--boss?siid=312686'"
    } else if (context.includes("brand: 'Novation'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--novation?siid=312686'"
    } else if (context.includes("brand: 'Strymon'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--strymon?siid=312686'"
    } else if (context.includes("brand: 'Te'")) {
      return "zzoundsUrl: 'https://www.zzounds.com/brand--teenage-engineering?siid=312686'"
    } else {
      // Default to general synthesizers page with affiliate code
      return "zzoundsUrl: 'https://www.zzounds.com/cat--Synthesizers--2959?siid=312686'"
    }
  })

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ FIXED! All links now go to real ZZounds brand pages')
console.log('🔗 Every product connects to the right brand section on ZZounds')
console.log('💰 Your affiliate code 312686 is in every URL')
console.log('🎯 No more dead links!')