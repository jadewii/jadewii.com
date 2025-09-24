#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING YAMAHA PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // Stage Keyboards
  {
    pattern: /title: 'Yamaha 61 Key Stage Keyboard 1[^']*'/g,
    replacement: "title: 'Yamaha CP88 88-Key Stage Piano'"
  },
  {
    pattern: /title: 'Yamaha 88 Key Stage Keyboard 1[^']*'/g,
    replacement: "title: 'Yamaha CP73 73-Key Stage Piano'"
  },

  // MX Series
  {
    pattern: /title: 'Yamaha MX49BK O 0001[^']*'/g,
    replacement: "title: 'Yamaha MX49 49-Key Music Production Synthesizer'"
  },
  {
    pattern: /title: 'Yamaha MX61BK O 0001[^']*'/g,
    replacement: "title: 'Yamaha MX61 61-Key Music Production Synthesizer'"
  },
  {
    pattern: /title: 'Yamaha MX88 Top[^']*'/g,
    replacement: "title: 'Yamaha MX88 88-Key Music Production Synthesizer'"
  },

  // PSR Series
  {
    pattern: /title: 'Yamaha PSR E383 A 0001[^']*'/g,
    replacement: "title: 'Yamaha PSR-E383 61-Key Portable Keyboard'"
  },
  {
    pattern: /title: 'Yamaha PSR E473 O 0001[^']*'/g,
    replacement: "title: 'Yamaha PSR-E473 61-Key Portable Keyboard'"
  },
  {
    pattern: /title: 'Yamaha PSR EW425 O 0001[^']*'/g,
    replacement: "title: 'Yamaha PSR-EW425 76-Key Portable Keyboard'"
  },
  {
    pattern: /title: 'Yamaha PSR SX600 O 0001[^']*'/g,
    replacement: "title: 'Yamaha PSR-SX600 61-Key Arranger Workstation'"
  },
  {
    pattern: /title: 'Yamaha YAM PSRSX720 Front[^']*'/g,
    replacement: "title: 'Yamaha PSR-SX720 61-Key Arranger Workstation'"
  },
  {
    pattern: /title: 'Yamaha YAM PSRSX920 Top High Res[^']*'/g,
    replacement: "title: 'Yamaha PSR-SX920 61-Key Arranger Workstation'"
  },

  // MONTAGE Series
  {
    pattern: /title: 'Yamaha YAM MONTAGEM6 Top Cropped[^']*'/g,
    replacement: "title: 'Yamaha MONTAGE M6 61-Key Synthesizer Workstation'"
  },
  {
    pattern: /title: 'Yamaha YAM MONTAGEM7 Top Cropped[^']*'/g,
    replacement: "title: 'Yamaha MONTAGE M7 76-Key Synthesizer Workstation'"
  },
  {
    pattern: /title: 'Yamaha YAM MONTAGEM8X Top Cropped[^']*'/g,
    replacement: "title: 'Yamaha MONTAGE M8X 88-Key Synthesizer Workstation'"
  },

  // YC Series
  {
    pattern: /title: 'Yamaha YC61 O 0001[^']*'/g,
    replacement: "title: 'Yamaha YC61 61-Key Stage Keyboard'"
  },
  {
    pattern: /title: 'Yamaha YC73 O 0001[^']*'/g,
    replacement: "title: 'Yamaha YC73 73-Key Stage Keyboard'"
  },
  {
    pattern: /title: 'Yamaha YC88 O 0001[^']*'/g,
    replacement: "title: 'Yamaha YC88 88-Key Stage Keyboard'"
  },

  // Piaggero Series
  {
    pattern: /title: 'Yamaha Piaggero NP 35 Black TOP[^']*'/g,
    replacement: "title: 'Yamaha Piaggero NP-35 76-Key Digital Piano'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ YAMAHA NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • CP73 & CP88 Stage Pianos')
console.log('   • MX49, MX61, MX88 Music Production Synthesizers')
console.log('   • PSR-E383, PSR-E473 Portable Keyboards')
console.log('   • PSR-EW425 76-Key Portable Keyboard')
console.log('   • PSR-SX600, PSR-SX720, PSR-SX920 Arranger Workstations')
console.log('   • MONTAGE M6, M7, M8X Synthesizer Workstations')
console.log('   • YC61, YC73, YC88 Stage Keyboards')
console.log('   • Piaggero NP-35 Digital Piano')