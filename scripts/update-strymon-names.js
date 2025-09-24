#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING STRYMON PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // BigSky Series
  {
    pattern: /title: 'Strymon BigSky 3 4View HIRES[^']*'/g,
    replacement: "title: 'Strymon BigSky Multi-Dimensional Reverb Pedal'"
  },
  {
    pattern: /title: 'Strymon STM BIGSKYMX Main[^']*'/g,
    replacement: "title: 'Strymon BigSky MX Multi-Dimensional Reverb Pedal'"
  },

  // BlueSky
  {
    pattern: /title: 'Strymon STM BLUSKYV2 Main[^']*'/g,
    replacement: "title: 'Strymon BlueSky Reverberator Pedal'"
  },

  // Brigadier
  {
    pattern: /title: 'Strymon STM BRIG Front[^']*'/g,
    replacement: "title: 'Strymon Brigadier dBucket Delay Pedal'"
  },

  // CloudBurst
  {
    pattern: /title: 'Strymon STM CLOUDBURST Main[^']*'/g,
    replacement: "title: 'Strymon CloudBurst Ambient Reverb Pedal'"
  },

  // El Capistan
  {
    pattern: /title: 'Strymon STM ELCAPISTANV2 Main[^']*'/g,
    replacement: "title: 'Strymon El Capistan dTape Echo Pedal'"
  },

  // Dig
  {
    pattern: /title: 'Strymon STM DIGV2 Main[^']*'/g,
    replacement: "title: 'Strymon Dig Dual Digital Delay Pedal'"
  },

  // Flint
  {
    pattern: /title: 'Strymon STM FLINTV2 Main[^']*'/g,
    replacement: "title: 'Strymon Flint Tremolo & Reverb Pedal'"
  },

  // Iridium
  {
    pattern: /title: 'Strymon STM IRIDIUM Front[^']*'/g,
    replacement: "title: 'Strymon Iridium Amp & IR Cab Simulator Pedal'"
  },

  // Lex
  {
    pattern: /title: 'Strymon STM LEXV2 Front[^']*'/g,
    replacement: "title: 'Strymon Lex Rotary Speaker Simulator Pedal'"
  },

  // Ultraviolet
  {
    pattern: /title: 'Strymon STM ULTRAVIOLET Front[^']*'/g,
    replacement: "title: 'Strymon Ultraviolet Vintage Vibe Pedal'"
  },

  // TimeLine
  {
    pattern: /title: 'Strymon TimeLine 3 4View HIRES 1[^']*'/g,
    replacement: "title: 'Strymon TimeLine Multidimensional Delay Pedal'"
  },

  // Mobius
  {
    pattern: /title: 'Strymon Mobius 3 4View HIRES[^']*'/g,
    replacement: "title: 'Strymon Mobius Modulation Pedal'"
  },

  // Magneto
  {
    pattern: /title: 'Strymon Magneto AngleOnWhite HIRES[^']*'/g,
    replacement: "title: 'Strymon Magneto Four Head dTape Echo & Looper'"
  },

  // Riverside
  {
    pattern: /title: 'Strymon Riverside Angle Hires 1[^']*'/g,
    replacement: "title: 'Strymon Riverside Multistage Drive Pedal'"
  },

  // AA1 (Algorithmic Analog)
  {
    pattern: /title: 'Strymon AA1 Circuitboard HIRES 1[^']*'/g,
    replacement: "title: 'Strymon AA.1 Algorithmic Analog Delay'"
  },

  // EC1 (Echo Degrader)
  {
    pattern: /title: 'Strymon EC1 Top[^']*'/g,
    replacement: "title: 'Strymon EC1 Lo-Fi Echo Degrader'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ STRYMON NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • BigSky & BigSky MX Multi-Dimensional Reverb Pedals')
console.log('   • BlueSky Reverberator Pedal')
console.log('   • Brigadier dBucket Delay Pedal')
console.log('   • CloudBurst Ambient Reverb Pedal')
console.log('   • El Capistan dTape Echo Pedal')
console.log('   • Dig Dual Digital Delay Pedal')
console.log('   • Flint Tremolo & Reverb Pedal')
console.log('   • Iridium Amp & IR Cab Simulator')
console.log('   • Lex Rotary Speaker Simulator')
console.log('   • TimeLine Multidimensional Delay')
console.log('   • Mobius Modulation Pedal')
console.log('   • Magneto Four Head dTape Echo & Looper')
console.log('   • Riverside Multistage Drive Pedal')
console.log('   • AA.1 Algorithmic Analog Delay')
console.log('   • EC1 Lo-Fi Echo Degrader')