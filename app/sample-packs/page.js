'use client'

import SimpleProductCard from '../../components/SimpleProductCard'
import { samplePacks } from '../../lib/data/samplePacks'
import { products } from '../../lib/data/products'

export default function SamplePacksPage() {
  const drumsKits = samplePacks.filter(p => p.category === 'drums-kits')
  const sampledInstruments = samplePacks.filter(p => p.category === 'sampled-instruments')
  const modularAlbums = products.filter(p => p.type === 'album' && p.category === 'modular' && !p.hidden)

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sound Packs</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          High-quality sounds, samples, and modular textures for music production
        </p>
      </div>

      {/* DRUMS & KITS */}
      {drumsKits.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">DRUMS & KITS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {drumsKits.map((product) => (
              <SimpleProductCard key={product.id} product={product} showTransportControls={false} />
            ))}
          </div>
        </>
      )}

      {/* SAMPLED INSTRUMENTS */}
      {sampledInstruments.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">SAMPLED INSTRUMENTS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {sampledInstruments.map((product) => (
              <SimpleProductCard key={product.id} product={product} showTransportControls={false} />
            ))}
          </div>
        </>
      )}

      {/* MODULAR TEXTURES */}
      {modularAlbums.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">MODULAR TEXTURES</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {modularAlbums.map((product) => (
              <SimpleProductCard key={product.id} product={product} showTransportControls={false} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}