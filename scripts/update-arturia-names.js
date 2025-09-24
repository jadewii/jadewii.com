#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING ARTURIA PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // DrumBrute Impact
  {
    pattern: /title: 'Arturia AUA DRMBRTIMP1984 On[^']*'/g,
    replacement: "title: 'Arturia DrumBrute Impact Analog Drum Machine'"
  },
  {
    pattern: /title: 'Arturia DrumBruteImpact Top[^']*'/g,
    replacement: "title: 'Arturia DrumBrute Impact Analog Drum Machine'"
  },

  // KeyLab Series
  {
    pattern: /title: 'Arturia AUA KEYLAB61MK3BK Top[^']*'/g,
    replacement: "title: 'Arturia KeyLab 61 MK3 MIDI Controller'"
  },
  {
    pattern: /title: 'Arturia KEYLAB88 BLACK WEBSTORE 3 4 LEFT Nolegs[^']*'/g,
    replacement: "title: 'Arturia KeyLab 88 MK3 MIDI Controller'"
  },

  // KeyLab Essential Series
  {
    pattern: /title: 'Arturia KeyLab Essential 88 Mk3 Black Top Copy[^']*'/g,
    replacement: "title: 'Arturia KeyLab Essential 88 MK3 MIDI Controller'"
  },
  {
    pattern: /title: 'Arturia Keylab Essential 61 Mk3 White 1[^']*'/g,
    replacement: "title: 'Arturia KeyLab Essential 61 MK3 MIDI Controller'"
  },

  // KeyStep Pro
  {
    pattern: /title: 'Arturia AUA KEYSTEPPROCHR Main[^']*'/g,
    replacement: "title: 'Arturia KeyStep Pro Sequencer Controller'"
  },

  // MiniFreak
  {
    pattern: /title: 'Arturia AUA MINIFREAKVCDR Right Mic[^']*'/g,
    replacement: "title: 'Arturia MiniFreak Hybrid Synthesizer'"
  },
  {
    pattern: /title: 'Arturia Top Minifreak 03[^']*'/g,
    replacement: "title: 'Arturia MiniFreak Hybrid Synthesizer'"
  },

  // MiniLab
  {
    pattern: /title: 'Arturia MInilab3[^']*'/g,
    replacement: "title: 'Arturia MiniLab 3 25-Key MIDI Controller'"
  },

  // AstroLab
  {
    pattern: /title: 'Arturia PACKSHOT ASTROLAB TOPSHOOT Copy[^']*'/g,
    replacement: "title: 'Arturia AstroLab 61-Key Stage Keyboard'"
  },

  // BeatStep Pro
  {
    pattern: /title: 'Arturia BeatStepPro Top Smallcopy[^']*'/g,
    replacement: "title: 'Arturia BeatStep Pro Controller & Sequencer'"
  },

  // V Collection
  {
    pattern: /title: 'Arturia V Collection11 Pro Main[^']*'/g,
    replacement: "title: 'Arturia V Collection 11 Software Bundle'"
  },

  // Generic model number
  {
    pattern: /title: 'Arturia L81868000000000 00 2000x2000[^']*'/g,
    replacement: "title: 'Arturia PolyBrute 6-Voice Analog Synthesizer'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ ARTURIA NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • DrumBrute Impact Analog Drum Machine')
console.log('   • KeyLab 61 & 88 MK3 MIDI Controllers')
console.log('   • KeyLab Essential 61 & 88 MK3 Controllers')
console.log('   • KeyStep Pro Sequencer Controller')
console.log('   • MiniFreak Hybrid Synthesizer')
console.log('   • MiniLab 3 25-Key MIDI Controller')
console.log('   • AstroLab 61-Key Stage Keyboard')
console.log('   • BeatStep Pro Controller & Sequencer')
console.log('   • V Collection 11 Software Bundle')
console.log('   • PolyBrute 6-Voice Analog Synthesizer')