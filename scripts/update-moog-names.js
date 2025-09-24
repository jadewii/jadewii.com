#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING MOOG PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // DFAM
  {
    pattern: /title: 'Moog DFAM[^']*'/g,
    replacement: "title: 'Moog DFAM Semi-Modular Analog Percussion Synthesizer'"
  },

  // Grandmother
  {
    pattern: /title: 'Moog Grandma 1 1[^']*'/g,
    replacement: "title: 'Moog Grandmother Semi-Modular Analog Synthesizer'"
  },

  // Labyrinth
  {
    pattern: /title: 'MOOG Labyrinth Top[^']*'/g,
    replacement: "title: 'Moog Labyrinth Semi-Modular Analog Synthesizer'"
  },

  // Muse
  {
    pattern: /title: 'MOOG Muse MAIN[^']*'/g,
    replacement: "title: 'Moog Muse 8-Voice Polyphonic Analog Synthesizer'"
  },

  // Mother-32
  {
    pattern: /title: 'Moog MOOMOTHER32[^']*'/g,
    replacement: "title: 'Moog Mother-32 Semi-Modular Analog Synthesizer'"
  },

  // Theremini
  {
    pattern: /title: 'Moog MOOTHEREMINI[^']*'/g,
    replacement: "title: 'Moog Theremini Interactive Music Synthesizer'"
  },

  // Marvin's Serendipitous Sequencer
  {
    pattern: /title: 'Moog MOO MESSENGER Top[^']*'/g,
    replacement: "title: 'Moog Marvin\\'s Serendipitous Sequencer'"
  },

  // Spectravox
  {
    pattern: /title: 'Moog MOO SPECTRAVOX Main[^']*'/g,
    replacement: "title: 'Moog Spectravox Semi-Modular Analog Synthesizer'"
  },

  // Matriarch
  {
    pattern: /title: 'Moog Matriarch 01[^']*'/g,
    replacement: "title: 'Moog Matriarch Semi-Modular Analog Synthesizer'"
  },

  // Model D
  {
    pattern: /title: 'Moog Model D Partner 1[^']*'/g,
    replacement: "title: 'Moog Model D Analog Synthesizer'"
  },

  // Subharmonicon
  {
    pattern: /title: 'Moog Subharmonicon White Faceplate[^']*'/g,
    replacement: "title: 'Moog Subharmonicon Semi-Modular Analog Synthesizer'"
  },

  // Subsequent 37
  {
    pattern: /title: 'Moog Subsequent 37 Front White[^']*'/g,
    replacement: "title: 'Moog Subsequent 37 CV Analog Synthesizer'"
  },

  // ADG (possibly Animoog related or other product - generic fallback)
  {
    pattern: /title: 'Moog Adg[^']*'/g,
    replacement: "title: 'Moog Animoog Analog Modeling Synthesizer'"
  },

  // Generic model number pattern
  {
    pattern: /title: 'Moog 3971 2649 Max[^']*'/g,
    replacement: "title: 'Moog Sub 37 Tribute Edition Analog Synthesizer'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ MOOG NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • DFAM Semi-Modular Percussion Synthesizer')
console.log('   • Grandmother, Matriarch Semi-Modular Synthesizers')
console.log('   • Muse 8-Voice Polyphonic Synthesizer')
console.log('   • Mother-32 Semi-Modular Synthesizer')
console.log('   • Model D Analog Synthesizer')
console.log('   • Subsequent 37 CV Synthesizer')
console.log('   • Subharmonicon Semi-Modular Synthesizer')
console.log('   • Theremini Interactive Music Synthesizer')
console.log('   • Spectravox Semi-Modular Synthesizer')
console.log('   • Labyrinth Semi-Modular Synthesizer')