'use client'

import SimpleProductCard from '../../components/SimpleProductCard'
import { patches } from '../../lib/data/patches'

export default function PatchesPage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Synth Patches</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          High-quality patches and presets for your favorite synthesizers
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {patches.map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}