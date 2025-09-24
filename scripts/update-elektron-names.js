#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING ELEKTRON PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // Analog Rytm
  {
    pattern: /title: 'Elektron Analog Rytm Top[^']*'/g,
    replacement: "title: 'Elektron Analog Rytm MK2 Drum Machine'"
  },

  // Digitakt II
  {
    pattern: /title: 'Elektron Digitakt II Top Transperent Copy[^']*'/g,
    replacement: "title: 'Elektron Digitakt II Sampling Drum Machine'"
  },

  // Model:Cycles
  {
    pattern: /title: 'Elektron ModelCycles Top[^']*'/g,
    replacement: "title: 'Elektron Model:Cycles Groovebox'"
  },

  // Octatrack MKII
  {
    pattern: /title: 'Elektron Octatrack MKII Black Top With[^']*'/g,
    replacement: "title: 'Elektron Octatrack MK2 8-Track Sampler'"
  },

  // Syntakt
  {
    pattern: /title: 'Elektron Syntakt Top[^']*'/g,
    replacement: "title: 'Elektron Syntakt Drum Computer & Synthesizer'"
  },

  // Digitone II
  {
    pattern: /title: 'Elektron Digitone II Topview[^']*'/g,
    replacement: "title: 'Elektron Digitone II FM Synthesizer & Sequencer'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ ELEKTRON NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • Analog Rytm MK2 Drum Machine')
console.log('   • Digitakt II Sampling Drum Machine')
console.log('   • Model:Cycles Groovebox')
console.log('   • Octatrack MK2 8-Track Sampler')
console.log('   • Syntakt Drum Computer & Synthesizer')
console.log('   • Digitone II FM Synthesizer & Sequencer')