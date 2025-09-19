'use client'

import { useState, useEffect } from 'react'
import ProductCard from '../../../components/ProductCard'
import { products } from '../../../lib/data/products'

export default function AlbumsPage() {
  const [sortBy, setSortBy] = useState('featured')
  const singles = products.filter(p => p.category === 'single')
  const mixtapes = products.filter(p => p.category === 'mixtapes')
  const modular = products.filter(p => p.category === 'modular')
  const electronic = products.filter(p => p.category === 'electronic')
  const lofi = products.filter(p => p.category === 'lofi')
  const [sortedSingles, setSortedSingles] = useState(singles)

  useEffect(() => {
    let sorted = [...singles]

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

    setSortedSingles(sorted)
  }, [sortBy])

  return (
    <div className="container-custom py-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 ml-auto">
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

      {/* SINGLES Section */}
      {singles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Singles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedSingles.map((single) => (
              <ProductCard key={single.id} product={single} />
            ))}
          </div>
        </div>
      )}

      {/* MIX TAPES Section */}
      {mixtapes.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Mix Tapes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {mixtapes.map((mixtape) => (
              <ProductCard key={mixtape.id} product={mixtape} />
            ))}
          </div>
        </div>
      )}

      {/* MODULAR Section */}
      {modular.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Modular</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {modular.map((mod) => (
              <ProductCard key={mod.id} product={mod} />
            ))}
          </div>
        </div>
      )}

      {/* ELECTRONIC Section */}
      {electronic.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Electronic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {electronic.map((elec) => (
              <ProductCard key={elec.id} product={elec} />
            ))}
          </div>
        </div>
      )}

      {/* LOFI Section */}
      {lofi.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">LoFi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {lofi.map((lo) => (
              <ProductCard key={lo.id} product={lo} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}