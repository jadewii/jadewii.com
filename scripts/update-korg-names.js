#!/usr/bin/env node

import fs from 'fs'

console.log('🎯 UPDATING KORG PRODUCT NAMES')

// Read current gear.js
const gearFilePath = 'lib/data/gear.js'
let gearContent = fs.readFileSync(gearFilePath, 'utf8')

// Map current product patterns to proper ZZounds names based on actual filenames
const nameUpdates = [
  // Volca Series
  {
    pattern: /title: 'Korg 01volcakick Top[^']*'/g,
    replacement: "title: 'Korg Volca Kick Analog Bass Drum Machine'"
  },
  {
    pattern: /title: 'Korg HighReso01 Volcakeys Top[^']*'/g,
    replacement: "title: 'Korg Volca Keys Analog Loop Synthesizer'"
  },
  {
    pattern: /title: 'Korg HighReso07 Volcabeats Top[^']*'/g,
    replacement: "title: 'Korg Volca Beats Analog Rhythm Machine'"
  },
  {
    pattern: /title: 'KORGVOLCABASS Top[^']*'/g,
    replacement: "title: 'Korg Volca Bass Analog Bass Machine'"
  },
  {
    pattern: /title: 'Korg Volca Modular[^']*'/g,
    replacement: "title: 'Korg Volca Modular Semi-Modular Analog Synthesizer'"
  },
  {
    pattern: /title: 'Korg Volca Drum Slant[^']*'/g,
    replacement: "title: 'Korg Volca Drum Digital Percussion Synthesizer'"
  },
  {
    pattern: /title: 'Korg Volca Mix Top Rev[^']*'/g,
    replacement: "title: 'Korg Volca Mix 4-Channel Analog Performance Mixer'"
  },
  {
    pattern: /title: 'Korg Volca Nubass Top[^']*'/g,
    replacement: "title: 'Korg Volca NuBass Vacuum Tube Bass Synthesizer'"
  },
  {
    pattern: /title: 'Korg Volca Sample 2 Front[^']*'/g,
    replacement: "title: 'Korg Volca Sample 2 Digital Sample Sequencer'"
  },

  // Minilogue Series
  {
    pattern: /title: 'Korg 2 Minilogue Perspective[^']*'/g,
    replacement: "title: 'Korg Minilogue 4-Voice Polyphonic Analog Synthesizer'"
  },
  {
    pattern: /title: 'Korg Minilogue Xd Inverted Top Copy[^']*'/g,
    replacement: "title: 'Korg Minilogue XD 4-Voice Polyphonic Analog Synthesizer'"
  },
  {
    pattern: /title: 'Korg Minilogue Xd Module Top[^']*'/g,
    replacement: "title: 'Korg Minilogue XD Module Desktop Synthesizer'"
  },

  // Monologue
  {
    pattern: /title: 'Korg 5 MonologueBK Top[^']*'/g,
    replacement: "title: 'Korg Monologue Monophonic Analog Synthesizer'"
  },

  // MicroKORG Series
  {
    pattern: /title: 'MicroKORG2 Pers Copy[^']*'/g,
    replacement: "title: 'Korg MicroKorg 2 37-Key Synthesizer Vocoder'"
  },
  {
    pattern: /title: 'MicroKORG S Pers Mic Rgb[^']*'/g,
    replacement: "title: 'Korg MicroKorg S 37-Key Synthesizer Vocoder'"
  },
  {
    pattern: /title: 'MiniKORG700Sm Pers[^']*'/g,
    replacement: "title: 'Korg MiniKorg 700S Analog Synthesizer'"
  },

  // KRONOS Series
  {
    pattern: /title: 'Korg KRONOS 61 Pers[^']*'/g,
    replacement: "title: 'Korg Kronos 61 61-Key Music Workstation'"
  },
  {
    pattern: /title: 'Korg KRONOS 73 Pers[^']*'/g,
    replacement: "title: 'Korg Kronos 73 73-Key Music Workstation'"
  },
  {
    pattern: /title: 'Korg KRONOS 88 Pers 1[^']*'/g,
    replacement: "title: 'Korg Kronos 88 88-Key Music Workstation'"
  },

  // NAUTILUS Series
  {
    pattern: /title: 'Korg KOR NAUTILUS61ATG Top[^']*'/g,
    replacement: "title: 'Korg Nautilus 61 Music Workstation'"
  },
  {
    pattern: /title: 'Korg KOR NAUTILUS88ATG Top[^']*'/g,
    replacement: "title: 'Korg Nautilus 88 Music Workstation'"
  },
  {
    pattern: /title: 'Korg NAUTILUS 61 Pers[^']*'/g,
    replacement: "title: 'Korg Nautilus 61 Music Workstation'"
  },
  {
    pattern: /title: 'Korg NAUTILUS 73 Pers[^']*'/g,
    replacement: "title: 'Korg Nautilus 73 Music Workstation'"
  },
  {
    pattern: /title: 'Korg NAUTILUS 88 Pers[^']*'/g,
    replacement: "title: 'Korg Nautilus 88 Music Workstation'"
  },

  // KROSS
  {
    pattern: /title: 'Korg KROSS2 61MB[^']*'/g,
    replacement: "title: 'Korg Kross 2 61-Key Synthesizer Workstation'"
  },

  // Pa Series
  {
    pattern: /title: 'Korg HighReso 01 Top Pa600 Re[^']*'/g,
    replacement: "title: 'Korg Pa600 61-Key Professional Arranger'"
  },
  {
    pattern: /title: 'Korg Pa1000 Top 1[^']*'/g,
    replacement: "title: 'Korg Pa1000 61-Key Professional Arranger'"
  },
  {
    pattern: /title: 'Korg Pa5X 61 Top[^']*'/g,
    replacement: "title: 'Korg Pa5X 61-Key Professional Arranger'"
  },
  {
    pattern: /title: 'Korg Pa5X 88 Pers[^']*'/g,
    replacement: "title: 'Korg Pa5X 88-Key Professional Arranger'"
  },
  {
    pattern: /title: 'Korg Pa5X ORT Slant 76 2000PX[^']*'/g,
    replacement: "title: 'Korg Pa5X 76-Key Oriental Professional Arranger'"
  },
  {
    pattern: /title: 'Korg Pa5X ORT Top 61 2000px[^']*'/g,
    replacement: "title: 'Korg Pa5X 61-Key Oriental Professional Arranger'"
  },

  // SV-2 Stage Piano
  {
    pattern: /title: 'Korg SV2S 88 Top[^']*'/g,
    replacement: "title: 'Korg SV-2S 88-Key Stage Piano'"
  },

  // Grandstage
  {
    pattern: /title: 'Korg Grandstage X Stage Piano MAIN[^']*'/g,
    replacement: "title: 'Korg Grandstage X 88-Key Digital Stage Piano'"
  },

  // Wavestate Series
  {
    pattern: /title: 'Korg Wavestate Desk Synth Module MAIN[^']*'/g,
    replacement: "title: 'Korg Wavestate Module Wave Sequencing Synthesizer'"
  },
  {
    pattern: /title: 'Korg Wavestate Mk2 MAIN[^']*'/g,
    replacement: "title: 'Korg Wavestate MK2 Wave Sequencing Synthesizer'"
  },

  // OPSIX Series
  {
    pattern: /title: 'Korg OPSIXMK2 Synthesizer TOP[^']*'/g,
    replacement: "title: 'Korg OPSIX MK2 Altered FM Synthesizer'"
  },
  {
    pattern: /title: 'Korg OPSIXM Module MAIN[^']*'/g,
    replacement: "title: 'Korg OPSIX Module FM Synthesizer'"
  },

  // Modwave
  {
    pattern: /title: 'Korg Modwave MKII TOP[^']*'/g,
    replacement: "title: 'Korg Modwave MK2 Wavetable Synthesizer'"
  },
  {
    pattern: /title: 'Korg MODWAVEM Wavetable Synth Module Side MAIN[^']*'/g,
    replacement: "title: 'Korg Modwave Module Wavetable Synthesizer'"
  },

  // Multi/Poly
  {
    pattern: /title: 'Korg Multi Poly Module Top[^']*'/g,
    replacement: "title: 'Korg Multi/Poly Module Analog Modeling Synthesizer'"
  },
  {
    pattern: /title: 'Korg Multi Poly Top Rev[^']*'/g,
    replacement: "title: 'Korg Multi/Poly Analog Modeling Synthesizer'"
  },

  // NuTekt Series
  {
    pattern: /title: 'Korg NuTekt NTS1 MKII Digital Synth Kit MAIN[^']*'/g,
    replacement: "title: 'Korg NuTekt NTS-1 MK2 Digital Synthesizer Kit'"
  },
  {
    pattern: /title: 'Korg NuTekt NTS3 KAOSS Pad Kit MAIN[^']*'/g,
    replacement: "title: 'Korg NuTekt NTS-3 Kaoss Pad Kit'"
  },

  // Controllers and Accessories
  {
    pattern: /title: 'Korg KOR NANOKEYFOLDBK Main[^']*'/g,
    replacement: "title: 'Korg nanoKEY Fold 25-Key Bluetooth MIDI Controller'"
  },
  {
    pattern: /title: 'Korg Keystage 49 MAIN[^']*'/g,
    replacement: "title: 'Korg Keystage 49-Key MIDI Controller'"
  },

  // Drum Machines and Samplers
  {
    pattern: /title: 'Korg KR11 Rhythm Box Main[^']*'/g,
    replacement: "title: 'Korg KR-11 Rhythm Machine'"
  },
  {
    pattern: /title: 'Korg MPS10 Sample Pad Angle[^']*'/g,
    replacement: "title: 'Korg MPS-10 Sample Pad'"
  },

  // Effects and Special Products
  {
    pattern: /title: 'Korg Kaoss Replay MAIN[^']*'/g,
    replacement: "title: 'Korg Kaoss Replay Dynamic Effect Processor'"
  },

  // Sequencers
  {
    pattern: /title: 'Korg PhotosHighReso1 SQ 1 Top[^']*'/g,
    replacement: "title: 'Korg SQ-1 2x8 Step Sequencer'"
  },

  // Electribe Series
  {
    pattern: /title: 'Korg Electribe BL Top Rgb S[^']*'/g,
    replacement: "title: 'Korg Electribe 2 Music Production Station'"
  },
  {
    pattern: /title: 'Korg Electribe Sampler RD Top Rgb S[^']*'/g,
    replacement: "title: 'Korg Electribe 2 Sampler Music Production Station'"
  },

  // Handytraxx
  {
    pattern: /title: 'Korg KOR HANDYTRAXPLAY Image 13[^']*'/g,
    replacement: "title: 'Korg Handytraxx Play Handheld Music Player'"
  },
  {
    pattern: /title: 'Korg Handytraxx 1bit Pers1[^']*'/g,
    replacement: "title: 'Korg Handytraxx 1-bit Music Player'"
  },
  {
    pattern: /title: 'Korg Handytraxx Tube Pers1[^']*'/g,
    replacement: "title: 'Korg Handytraxx Tube Music Player'"
  },

  // MS-20 Mini
  {
    pattern: /title: 'Korg USA MS Namm 20mini 1000 2[^']*'/g,
    replacement: "title: 'Korg MS-20 Mini Monophonic Analog Synthesizer'"
  },

  // Generic/Unknown products
  {
    pattern: /title: 'Korg FRONTPER[^']*'/g,
    replacement: "title: 'Korg Prologue 8-Voice Polyphonic Analog Synthesizer'"
  },
  {
    pattern: /title: 'Korg Front 1[^']*'/g,
    replacement: "title: 'Korg Prologue 16-Voice Polyphonic Analog Synthesizer'"
  },
  {
    pattern: /title: 'KorgKINGNEOVIRTUALANALOGSYNTHTOP[^']*'/g,
    replacement: "title: 'Korg KingKORG NEO Virtual Analog Synthesizer'"
  },
  {
    pattern: /title: 'Korg Agdam[^']*'/g,
    replacement: "title: 'Korg ARP Odyssey Analog Synthesizer'"
  }
]

// Apply all name updates
let updatedContent = gearContent
nameUpdates.forEach(update => {
  updatedContent = updatedContent.replace(update.pattern, update.replacement)
})

// Write the updated file
fs.writeFileSync(gearFilePath, updatedContent)

console.log('✅ KORG NAMES UPDATED!')
console.log('📝 Updated to proper ZZounds product names:')
console.log('   • Volca Series (Keys, Beats, Bass, Kick, Drum, etc.)')
console.log('   • Minilogue & Minilogue XD Synthesizers')
console.log('   • Kronos & Nautilus Workstations')
console.log('   • Pa Series Professional Arrangers')
console.log('   • Wavestate & Modwave Synthesizers')
console.log('   • OPSIX FM Synthesizers')
console.log('   • Multi/Poly Analog Modeling Synths')
console.log('   • MicroKorg & MS-20 Mini')
console.log('   • SV-2S & Grandstage Pianos')
console.log('   • NuTekt DIY Synthesizer Kits')