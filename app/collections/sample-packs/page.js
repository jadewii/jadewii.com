'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { products } from '../../../lib/data/products'

export default function SamplePacksPage() {
  const [sortBy, setSortBy] = useState('featured')
  const samplePacks = products.filter(p => p.type === 'sample-pack')
  const [sortedPacks, setSortedPacks] = useState(samplePacks)

  useEffect(() => {
    let sorted = [...samplePacks]

    switch(sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name-az':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-za':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    setSortedPacks(sorted)
  }, [sortBy])

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Sample Packs</h1>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A-Z</option>
            <option value="name-za">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sortedPacks.map((pack) => (
          <Link
            key={pack.id}
            href={`/products/${pack.id}`}
            className="group block"
          >
            <div className="product-card">
              {/* Pack Artwork */}
              <div className="aspect-square bg-gray-100 mb-3 overflow-hidden">
                {pack.image ? (
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Pack Info */}
              <div className="space-y-1">
                <p className="text-xs text-gray-600 uppercase tracking-wide">{pack.artist}</p>
                <h3 className="text-sm font-medium line-clamp-2">{pack.title}</h3>
                <p className="text-sm font-medium">${pack.price.toFixed(2)} USD</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sortedPacks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No sample packs available yet.</p>
        </div>
      )}
    </div>
  )
}