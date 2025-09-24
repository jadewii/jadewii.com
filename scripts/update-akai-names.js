#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING AKAI PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // MPK Mini Plus
  {
    pattern: /title: 'Akai AD34 MPKminiPlus[^']*'/g,
    replacement: "title: 'Akai MPK Mini Plus 37-Key USB MIDI Keyboard Controller'"
  },

  // Force
  {
    pattern: /title: 'Akai Force'/g,
    replacement: "title: 'Akai Force Grid-Based Music Production System'"
  },

  // APC64
  {
    pattern: /title: 'Akai AKA APC64[^']*'/g,
    replacement: "title: 'Akai APC64 Ableton Live Controller'"
  },

  // MPC Key 37
  {
    pattern: /title: 'Akai AKA MPCKEY37[^']*'/g,
    replacement: "title: 'Akai MPC Key 37 Synthesizer Production Keyboard'"
  },

  // APC Key 25 MK2
  {
    pattern: /title: 'Akai APC Key 25 MK2[^']*'/g,
    replacement: "title: 'Akai APC Key 25 MK2 Ableton Live Controller'"
  },

  // APC Mini MK2
  {
    pattern: /title: 'Akai APC Mini MK2[^']*'/g,
    replacement: "title: 'Akai APC Mini MK2 Ableton Live Controller'"
  },

  // MPC Key 61
  {
    pattern: /title: 'Akai Pro MPCKey61[^']*'/g,
    replacement: "title: 'Akai MPC Key 61 Music Production Keyboard'"
  },

  // LPD8 II RGB
  {
    pattern: /title: 'Akai LPD8 II[^']*'/g,
    replacement: "title: 'Akai LPD8 II RGB USB MIDI Drum Pad Controller'"
  },

  // LPK25 II
  {
    pattern: /title: 'Akai LPK25 II[^']*'/g,
    replacement: "title: 'Akai LPK25 II 25-Key USB MIDI Keyboard Controller'"
  },

  // MIDImix
  {
    pattern: /title: 'Akai MIDImix[^']*'/g,
    replacement: "title: 'Akai MIDImix High-Performance Portable Mixer'"
  },

  // MPC Studio
  {
    pattern: /title: 'Akai MPCStudio[^']*'/g,
    replacement: "title: 'Akai MPC Studio Black Music Production Controller'"
  },

  // MPD218
  {
    pattern: /title: 'Akai MPD218[^']*'/g,
    replacement: "title: 'Akai MPD218 MIDI Drum Pad Controller'"
  },

  // MPK Mini MK3
  {
    pattern: /title: 'Akai Mpk Mini Mk3[^']*'/g,
    replacement: "title: 'Akai MPK Mini MK3 25-Key USB MIDI Keyboard Controller'"
  },

  // MPK Mini Play MK3
  {
    pattern: /title: 'Akai MPKMiniPlayMK3[^']*'/g,
    replacement: "title: 'Akai MPK Mini Play MK3 25-Key Keyboard'"
  },

  // Standalone Music Production Center (likely MPC One)
  {
    pattern: /title: 'Akai Standalone Music Production Center[^']*'/g,
    replacement: "title: 'Akai MPC One Music Production Workstation'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ AKAI NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • Force Grid-Based Music Production System')
console.log('   • MPC Key 37 & 61 Production Keyboards')
console.log('   • MPK Mini Plus, MK3, and Play controllers')
console.log('   • APC64, APC Key 25 MK2, APC Mini MK2')
console.log('   • LPD8 II RGB & LPK25 II controllers')
console.log('   • MPC Studio & MPD218')
console.log('   • MIDImix Portable Mixer')
console.log('   • MPC One Production Workstation')