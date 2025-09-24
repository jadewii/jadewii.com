#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING BOSS PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // VE-22 Vocal Processor
  {
    pattern: /title: 'Boss BOS VE22 Front[^']*'/g,
    replacement: "title: 'Boss VE-22 Vocal Processor'"
  },

  // GX-100 Guitar Effects Processor
  {
    pattern: /title: 'Boss GX 100 F[^']*'/g,
    replacement: "title: 'Boss GX-100 Guitar Effects Processor'"
  },

  // ME-90B Bass Multi-Effects
  {
    pattern: /title: 'Boss ME 90B Top Copy[^']*'/g,
    replacement: "title: 'Boss ME-90B Bass Multi-Effects Pedal'"
  },

  // RC Loop Stations
  {
    pattern: /title: 'Boss RC 500 F[^']*'/g,
    replacement: "title: 'Boss RC-500 Loop Station'"
  },
  {
    pattern: /title: 'Boss RC 505mk2 F[^']*'/g,
    replacement: "title: 'Boss RC-505 MK2 Loop Station'"
  },
  {
    pattern: /title: 'Boss RC 600 F[^']*'/g,
    replacement: "title: 'Boss RC-600 Loop Station'"
  },

  // RT-2 Rotary Ensemble
  {
    pattern: /title: 'Boss RT 2 Front[^']*'/g,
    replacement: "title: 'Boss RT-2 Rotary Ensemble Pedal'"
  },

  // RV-6 Reverb
  {
    pattern: /title: 'Boss RV6F2[^']*'/g,
    replacement: "title: 'Boss RV-6 Digital Reverb Pedal'"
  },

  // VE-8 Vocal Processor
  {
    pattern: /title: 'Boss VE 8 F[^']*'/g,
    replacement: "title: 'Boss VE-8 Vocal Processor'"
  },

  // GE-7 Graphic Equalizer
  {
    pattern: /title: 'Boss Ge 7[^']*'/g,
    replacement: "title: 'Boss GE-7 Graphic Equalizer Pedal'"
  },

  // Generic entries
  {
    pattern: /title: 'Boss 1[^']*'/g,
    replacement: "title: 'Boss DD-8 Digital Delay Pedal'"
  },
  {
    pattern: /title: 'Boss Top L Clipped[^']*'/g,
    replacement: "title: 'Boss OD-3 OverDrive Pedal'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ BOSS NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • VE-22 & VE-8 Vocal Processors')
console.log('   • GX-100 Guitar Effects Processor')
console.log('   • ME-90B Bass Multi-Effects Pedal')
console.log('   • RC-500, RC-505 MK2, RC-600 Loop Stations')
console.log('   • RT-2 Rotary Ensemble Pedal')
console.log('   • RV-6 Digital Reverb Pedal')
console.log('   • GE-7 Graphic Equalizer Pedal')
console.log('   • DD-8 Digital Delay Pedal')
console.log('   • OD-3 OverDrive Pedal')