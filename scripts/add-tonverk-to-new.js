#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 MOVING TONVERK TO NEW SECTION')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Change tonverk from Elektron to NEW brand
const updatedContent = gearContent.replace(
  /title: 'Elektron ELK TONVERK Main',\s*brand: 'Elektron',/g,
  "title: 'Elektron ELK TONVERK Main',\n    brand: 'NEW',"
)

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ TONVERK MOVED TO NEW SECTION!')
console.log('📝 The Elektron TONVERK is now in the NEW section')