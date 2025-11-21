'use client'

import { useState, useEffect } from 'react'
import SimpleProductCard from '../../components/SimpleProductCard'
import { products } from '../../lib/data/products'

export default function AlbumsPage() {
  const albums = products.filter(p => p.type === 'album' && !p.hidden)
  const mixtapes = albums.filter(p => p.category === 'mixtapes')

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital albums, yours forever.</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">The absolute best way to support me as an independent artist.</p>
      </div>

      {/* MIXTAPES Section */}
      {mixtapes.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">MIXTAPES</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {mixtapes.map((product) => (
              <SimpleProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}