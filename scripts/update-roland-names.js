#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING ROLAND PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // Piano/Keyboard Series
  {
    pattern: /title: 'Roland A88MKII[^']*'/g,
    replacement: "title: 'Roland A-88MKII 88-Key MIDI Keyboard Controller'"
  },
  {
    pattern: /title: 'Roland AE20[^']*'/g,
    replacement: "title: 'Roland AE-20 Aerophone Electronic Wind Instrument'"
  },
  {
    pattern: /title: 'Roland AE30[^']*'/g,
    replacement: "title: 'Roland AE-30 Aerophone Electronic Wind Instrument'"
  },
  {
    pattern: /title: 'Roland Aerophone Go[^']*'/g,
    replacement: "title: 'Roland Aerophone GO Electronic Wind Instrument'"
  },
  {
    pattern: /title: 'Roland AerophoneMini[^']*'/g,
    replacement: "title: 'Roland Aerophone Mini Electronic Wind Instrument'"
  },

  // Synthesizer Series
  {
    pattern: /title: 'Roland E A7[^']*'/g,
    replacement: "title: 'Roland E-A7 61-Key Arranger Keyboard'"
  },
  {
    pattern: /title: 'Roland E4[^']*'/g,
    replacement: "title: 'Roland E-4 Voice Tweaker'"
  },
  {
    pattern: /title: 'Roland Fantom07[^']*'/g,
    replacement: "title: 'Roland FANTOM-07 Music Workstation'"
  },
  {
    pattern: /title: 'Roland Fantom08[^']*'/g,
    replacement: "title: 'Roland FANTOM-08 Music Workstation'"
  },
  {
    pattern: /title: 'Roland Fantomex07[^']*'/g,
    replacement: "title: 'Roland FANTOM-0 Series 7 Music Workstation'"
  },
  {
    pattern: /title: 'Roland Fantomex08[^']*'/g,
    replacement: "title: 'Roland FANTOM-0 Series 8 Music Workstation'"
  },

  // GO Series
  {
    pattern: /title: 'Roland GO KEYS 5[^']*'/g,
    replacement: "title: 'Roland GO:KEYS 5 Music Creation Keyboard'"
  },
  {
    pattern: /title: 'Roland GOKEYS3[^']*'/g,
    replacement: "title: 'Roland GO:KEYS 3 Entry-level Music Keyboard'"
  },

  // Drum Machines & Pads
  {
    pattern: /title: 'Roland Hpd 20[^']*'/g,
    replacement: "title: 'Roland HPD-20 HandSonic Percussion Pad'"
  },
  {
    pattern: /title: 'Roland SPD 30[^']*'/g,
    replacement: "title: 'Roland SPD-30 Octapad Digital Percussion Pad'"
  },
  {
    pattern: /title: 'Roland SPD SX[^']*'/g,
    replacement: "title: 'Roland SPD-SX Sampling Pad'"
  },
  {
    pattern: /title: 'Roland SPD SX PRO[^']*'/g,
    replacement: "title: 'Roland SPD-SX PRO Sample Pad'"
  },
  {
    pattern: /title: 'Roland Tm 6[^']*'/g,
    replacement: "title: 'Roland TM-6 PRO Trigger Module'"
  },

  // Jupiter/JD Series
  {
    pattern: /title: 'Roland J6[^']*'/g,
    replacement: "title: 'Roland J-6 Chord Synthesizer'"
  },
  {
    pattern: /title: 'Roland JD Xi[^']*'/g,
    replacement: "title: 'Roland JD-Xi Interactive Analog/Digital Crossover Synthesizer'"
  },
  {
    pattern: /title: 'Roland JD08[^']*'/g,
    replacement: "title: 'Roland JD-08 Synthesizer'"
  },
  {
    pattern: /title: 'Roland JU06A[^']*'/g,
    replacement: "title: 'Roland JU-06A Synthesizer'"
  },
  {
    pattern: /title: 'Roland JUPITERX[^']*'/g,
    replacement: "title: 'Roland JUPITER-X Synthesizer'"
  },
  {
    pattern: /title: 'Roland JUPITERXm[^']*'/g,
    replacement: "title: 'Roland JUPITER-Xm Synthesizer Module'"
  },
  {
    pattern: /title: 'Roland JX08[^']*'/g,
    replacement: "title: 'Roland JX-08 Synthesizer'"
  },

  // MC Series
  {
    pattern: /title: 'Roland MC101[^']*'/g,
    replacement: "title: 'Roland MC-101 Groovebox'"
  },
  {
    pattern: /title: 'Roland MC707[^']*'/g,
    replacement: "title: 'Roland MC-707 Groovebox'"
  },

  // Other Synths
  {
    pattern: /title: 'Roland MV1[^']*'/g,
    replacement: "title: 'Roland MV-1 Verselab Music Production Studio'"
  },
  {
    pattern: /title: 'Roland P6[^']*'/g,
    replacement: "title: 'Roland P-6 Creative Sampler'"
  },
  {
    pattern: /title: 'Roland S 1[^']*'/g,
    replacement: "title: 'Roland S-1 Tweak Synthesizer'"
  },
  {
    pattern: /title: 'Roland SH 01A[^']*'/g,
    replacement: "title: 'Roland SH-01A Synthesizer'"
  },
  {
    pattern: /title: 'Roland SH4d[^']*'/g,
    replacement: "title: 'Roland SH-4d Desktop Synthesizer'"
  },

  // Piano Series
  {
    pattern: /title: 'Roland RD 08[^']*'/g,
    replacement: "title: 'Roland RD-08 Eletric Piano'"
  },
  {
    pattern: /title: 'Roland RD 2000EX[^']*'/g,
    replacement: "title: 'Roland RD-2000EX Stage Piano'"
  },
  {
    pattern: /title: 'Roland Roland FP E50[^']*'/g,
    replacement: "title: 'Roland FP-E50 Digital Piano'"
  },

  // TR Series (Drum Machines)
  {
    pattern: /title: 'Roland SP404MK2[^']*'/g,
    replacement: "title: 'Roland SP-404MKII Creative Sampler & Effector'"
  },
  {
    pattern: /title: 'Roland T8[^']*'/g,
    replacement: "title: 'Roland T-8 Beat Machine'"
  },
  {
    pattern: /title: 'Roland TB03[^']*'/g,
    replacement: "title: 'Roland TB-03 Bass Line Synthesizer'"
  },
  {
    pattern: /title: 'Roland Tr 08[^']*'/g,
    replacement: "title: 'Roland TR-08 Rhythm Composer'"
  },
  {
    pattern: /title: 'Roland Tr 8s[^']*'/g,
    replacement: "title: 'Roland TR-8S Rhythm Performer'"
  },
  {
    pattern: /title: 'Roland TR06[^']*'/g,
    replacement: "title: 'Roland TR-06 Drumatix'"
  },
  {
    pattern: /title: 'Roland TR6S[^']*'/g,
    replacement: "title: 'Roland TR-6S Rhythm Performer'"
  },

  // V-Stage Series
  {
    pattern: /title: 'Roland V STAGE 76[^']*'/g,
    replacement: "title: 'Roland V-Stage 76 Stage Piano'"
  },
  {
    pattern: /title: 'Roland V STAGE 88[^']*'/g,
    replacement: "title: 'Roland V-Stage 88 Stage Piano'"
  },

  // Other
  {
    pattern: /title: 'Roland VR 09[^']*'/g,
    replacement: "title: 'Roland VR-09 V-Combo Live Performance Keyboard'"
  },
  {
    pattern: /title: 'Roland VT4[^']*'/g,
    replacement: "title: 'Roland VT-4 Voice Transformer'"
  },
  {
    pattern: /title: 'Roland K 25m[^']*'/g,
    replacement: "title: 'Roland K-25m Boutique Keyboard Unit'"
  },
  {
    pattern: /title: 'Roland Rolamd Gaia 2[^']*'/g,
    replacement: "title: 'Roland GAIA 2 Synthesizer'"
  },
  {
    pattern: /title: 'Roland ROL JUNOD8[^']*'/g,
    replacement: "title: 'Roland JUNO-D8 Synthesizer'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ ROLAND NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • FANTOM Series Workstations')
console.log('   • JUPITER-X Series Synthesizers')
console.log('   • TR Series Drum Machines')
console.log('   • Aerophone Wind Instruments')
console.log('   • GO Series Entry Keyboards')
console.log('   • SPD Series Sampling Pads')
console.log('   • V-Stage Pianos')
console.log('   • And many more!')