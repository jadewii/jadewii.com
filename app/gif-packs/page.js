'use client'

import SimpleProductCard from '../../../components/SimpleProductCard'
import { gifPacks } from '../../../lib/data/gifPacks'

export default function GifPacksPage() {
  const visualAssets = gifPacks.filter(p => p.category === 'visual-assets')

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">GIF Packs</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          High-quality animated GIFs featuring synthesizers and music equipment
        </p>
      </div>

      {/* VISUAL ASSETS */}
      {visualAssets.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">VISUAL ASSETS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {visualAssets.map((product) => (
              <SimpleProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}