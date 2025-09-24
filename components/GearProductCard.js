'use client'

import { useState } from 'react'

export default function GearProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleBuyNow = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Open zzounds affiliate link in new tab
    if (product.zzoundsUrl) {
      window.open(product.zzoundsUrl, '_blank')
    } else {
      alert('Product link coming soon!')
    }
  }

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleBuyNow}
    >
      {/* Gear Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-white">
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-full object-contain absolute inset-0"
          onError={(e) => {
            console.log('Image failed to load:', product.image)
            e.target.src = '/placeholder.jpg'
          }}
        />
      </div>



      {/* Product title */}
      <div className="mt-2">
        <h3 className="text-sm truncate">
          {(() => {
            const cleanTitle = product.title.replace(/^(Teenage Engineering|Akai|Arturia|Elektron|Korg|Moog|Roland|Yamaha|Boss|Novation|Strymon|Sequential)\s+/, '')

            // Split into product name and description
            const match = cleanTitle.match(/^(.+?)\s+((?:USB\s+|MIDI\s+|Music\s+|Synthesizer|Controller|Keyboard|Drum\s+Pad|Ableton\s+Live|Production|Workstation|Portable\s+Mixer|High-Performance).*)$/i)

            if (!match) {
              return <span className="font-medium">{cleanTitle}</span>
            }

            const productName = match[1].trim()
            const description = match[2].trim()

            return (
              <>
                <span className="font-medium">{productName}</span>
                {description && <span className="text-sm font-medium text-gray-500"> {description}</span>}
              </>
            )
          })()}
        </h3>
        <p className="text-sm font-bold mt-1">${product.price?.toFixed(2) || '599.00'}</p>
      </div>
    </div>
  )
}