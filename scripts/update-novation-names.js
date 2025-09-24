#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING NOVATION PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // Bass Station II
  {
    pattern: /title: 'Novation Bass Station II[^']*'/g,
    replacement: "title: 'Novation Bass Station II Analog Synthesizer'"
  },
  {
    pattern: /title: 'Novation BSII Swifty Top Down HR[^']*'/g,
    replacement: "title: 'Novation Bass Station II Analog Synthesizer'"
  },

  // Circuit Series
  {
    pattern: /title: 'Novation Circuit Rhythm[^']*'/g,
    replacement: "title: 'Novation Circuit Rhythm Drum Machine'"
  },
  {
    pattern: /title: 'Novation Circuit Tracks[^']*'/g,
    replacement: "title: 'Novation Circuit Tracks Groovebox'"
  },

  // FLKey Series
  {
    pattern: /title: 'Novation FLKey 49 Overhead Seq HR 1[^']*'/g,
    replacement: "title: 'Novation FLkey 49 MIDI Keyboard Controller'"
  },

  // Launchkey Series
  {
    pattern: /title: 'Novation LK49 Straight Top[^']*'/g,
    replacement: "title: 'Novation Launchkey 49 MK3 MIDI Controller'"
  },
  {
    pattern: /title: 'Novation LK61 Straight Top Low Res[^']*'/g,
    replacement: "title: 'Novation Launchkey 61 MK3 MIDI Controller'"
  },

  // Launch Control
  {
    pattern: /title: 'Novation Launch Control XL[^']*'/g,
    replacement: "title: 'Novation Launch Control XL MIDI Controller'"
  },

  // Launchpad
  {
    pattern: /title: 'Novation Launchpad Pro MK3 Sessionmode Overhead HR[^']*'/g,
    replacement: "title: 'Novation Launchpad Pro MK3 Grid Controller'"
  },

  // MiniNova
  {
    pattern: /title: 'Novation NOV MININOVA RESIZED[^']*'/g,
    replacement: "title: 'Novation MiniNova 37-Key Synthesizer'"
  },

  // Summit
  {
    pattern: /title: 'Novation Summit Overhead HR[^']*'/g,
    replacement: "title: 'Novation Summit 16-Voice Polyphonic Synthesizer'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ NOVATION NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • Bass Station II Analog Synthesizer')
console.log('   • Circuit Rhythm Drum Machine')
console.log('   • Circuit Tracks Groovebox')
console.log('   • FLkey 49 MIDI Controller')
console.log('   • Launchkey 49 & 61 MK3 Controllers')
console.log('   • Launch Control XL Controller')
console.log('   • Launchpad Pro MK3 Grid Controller')
console.log('   • MiniNova 37-Key Synthesizer')
console.log('   • Summit 16-Voice Polyphonic Synthesizer')