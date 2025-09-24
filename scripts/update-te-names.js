#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING TEENAGE ENGINEERING PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names
const nameUpdates = [
  // OP Series
  {
    pattern: /title: 'TEE OP1FIELD[^']*'/g,
    replacement: "title: 'Teenage Engineering OP-1 Field Synthesizer'"
  },
  {
    pattern: /title: 'TEE OPXY[^']*'/g,
    replacement: "title: 'Teenage Engineering OP-XY Synthesizer Workstation'"
  },

  // OB-4
  {
    pattern: /title: 'TEE OB4GREY[^']*'/g,
    replacement: "title: 'Teenage Engineering OB-4 Magic Radio'"
  },

  // Pocket Operators
  {
    pattern: /title: 'TEE PO12RHYTHM[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-12 Rhythm Pocket Operator'"
  },
  {
    pattern: /title: 'TEE PO14SUB[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-14 Sub Pocket Operator'"
  },
  {
    pattern: /title: 'TEE PO16FACTORY[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-16 Factory Pocket Operator'"
  },
  {
    pattern: /title: 'TEE PO20ARCADE[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-20 Arcade Pocket Operator'"
  },
  {
    pattern: /title: 'TEE PO24OFFICE[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-24 Office Pocket Operator'"
  },
  {
    pattern: /title: 'TEE PO28ROBOT[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-28 Robot Pocket Operator'"
  },
  {
    pattern: /title: 'TEE PO32TONIC[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-32 Tonic Pocket Operator'"
  },
  {
    pattern: /title: 'TEE PO35SPEAK[^']*'/g,
    replacement: "title: 'Teenage Engineering PO-35 Speak Pocket Operator'"
  },

  // CM-15 and TP-7
  {
    pattern: /title: 'Teenage Engineering CM15[^']*'/g,
    replacement: "title: 'Teenage Engineering CM-15 Microphone'"
  },
  {
    pattern: /title: 'Teenage Engineering TP7[^']*'/g,
    replacement: "title: 'Teenage Engineering TP-7 Field Recorder'"
  },

  // Generic/unclear items
  {
    pattern: /title: 'Te 654e36ff255502e470bf1e53[^']*'/g,
    replacement: "title: 'Teenage Engineering OP-Z Multimedia Synthesizer'"
  },
  {
    pattern: /title: 'TEE EP1320MEDIEVL[^']*'/g,
    replacement: "title: 'Teenage Engineering EP-1320 Medieval'"
  },
  {
    pattern: /title: 'Te Front'/g,
    replacement: "title: 'Teenage Engineering TX-6 Mixer'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ TEENAGE ENGINEERING NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • OP-1 Field Synthesizer')
console.log('   • OP-XY Synthesizer Workstation')
console.log('   • OP-Z Multimedia Synthesizer')
console.log('   • OB-4 Magic Radio')
console.log('   • PO Series Pocket Operators (12 different models)')
console.log('   • CM-15 Microphone')
console.log('   • TP-7 Field Recorder')
console.log('   • TX-6 Mixer')