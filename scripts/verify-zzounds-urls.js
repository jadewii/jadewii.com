#!/usr/bin/env node

// Script to verify ZZounds affiliate URLs work correctly
// Usage: node scripts/verify-zzounds-urls.js

// Using built-in fetch (Node.js 18+)
import { gearProducts } from '../lib/data/gear.js'

const AFFILIATE_ID = 'a--3971462'

async function checkUrl(url, productName) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual' // Don't follow redirects, just check if they exist
    })

    if (response.status === 301 || response.status === 302) {
      const location = response.headers.get('location')
      return {
        status: 'redirect',
        location: location,
        working: true
      }
    } else if (response.status === 200) {
      return {
        status: 'direct',
        working: true
      }
    } else {
      return {
        status: 'error',
        working: false,
        statusCode: response.status
      }
    }
  } catch (error) {
    return {
      status: 'error',
      working: false,
      error: error.message
    }
  }
}

async function verifyAllUrls() {
  console.log('🔍 Verifying ZZounds affiliate URLs...\n')

  const results = {
    working: [],
    broken: [],
    total: 0
  }

  for (const product of gearProducts) {
    if (product.zzoundsUrl) {
      results.total++
      const result = await checkUrl(product.zzoundsUrl, product.title)

      if (result.working) {
        results.working.push({
          title: product.title,
          url: product.zzoundsUrl,
          status: result.status
        })
        console.log(`✅ ${product.title} - ${result.status}`)
      } else {
        results.broken.push({
          title: product.title,
          url: product.zzoundsUrl,
          error: result.error || `Status: ${result.statusCode}`
        })
        console.log(`❌ ${product.title} - ${result.error || result.statusCode}`)
      }

      // Add small delay to be polite to ZZounds servers
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  console.log(`\n📊 Results: ${results.working.length}/${results.total} URLs working`)

  if (results.broken.length > 0) {
    console.log('\n🚨 Broken URLs to fix:')
    results.broken.forEach(item => {
      console.log(`   ${item.title}: ${item.url}`)
    })
  }

  return results
}

// Manual URL builder helper
function buildZZoundsUrl(productCode) {
  return `http://zzounds.com/${AFFILIATE_ID}/item--${productCode}`
}

// Common product code patterns
const codePatterns = {
  'korg': {
    'monologue': ['KORMONOBK', 'KORMONOLOGUE', 'KORMONOWHITE'],
    'minilogue': ['KORMINILOGUE', 'KORMINIXD'],
    'volca': ['KORVOLCA*'],
    'nautilus': ['KORNAUTILUS*'],
    'kronos': ['KORKRONOS*']
  },
  'moog': {
    'mother-32': ['MOOGMOTHER32'],
    'grandmother': ['MOOGGRANDMOTHER'],
    'subsequent': ['MOOGSUBSEQ37'],
    'dfam': ['MOOGDFAM']
  },
  'roland': {
    'jupiter': ['ROLJUPITERX'],
    'tr-8s': ['ROLTR8S'],
    'mc-707': ['ROLMC707']
  }
}

console.log('ZZounds URL Verification Tool')
console.log('============================')
console.log('Common product code patterns:')
Object.entries(codePatterns).forEach(([brand, products]) => {
  console.log(`\n${brand.toUpperCase()}:`)
  Object.entries(products).forEach(([product, codes]) => {
    console.log(`  ${product}: ${codes.join(', ')}`)
  })
})

console.log('\nExample usage:')
console.log('node scripts/verify-zzounds-urls.js')
console.log('')
console.log('To test a single URL:')
console.log(`console.log(buildZZoundsUrl('KORMONOBK'))`)

if (process.argv.includes('--verify')) {
  verifyAllUrls().catch(console.error)
}