'use client'

import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../lib/data/products'

export default function HomePage() {
  const mixtapes = products.filter(p => p.category === 'mixtapes')
  const modular = products.filter(p => p.category === 'modular')
  const electronic = products.filter(p => p.category === 'electronic')
  const lofi = products.filter(p => p.category === 'lofi')

  return (
    <div className="container-custom py-8">
      {/* MIXTAPES Section - FIRST */}
      {mixtapes.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">MIXTAPES</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {mixtapes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* MODULAR Section */}
      {modular.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">MODULAR</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {modular.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* ELECTRONIC Section */}
      {electronic.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">ELECTRONIC</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {electronic.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* LOFI Section */}
      {lofi.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-6">LOFI</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {lofi.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}