'use client'

import SimpleProductCard from '../../components/SimpleProductCard'
import { products } from '../../lib/data/products'

export default function AlbumsPage() {
  const albums = products.filter(p => p.type === 'album' && !p.hidden)
  const mixtapes = albums.filter(p => p.category === 'mixtapes')
  const modular = albums.filter(p => p.category === 'modular')
  const electronic = albums.filter(p => p.category === 'electronic')
  const lofi = albums.filter(p => p.category === 'lofi')

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="container-custom py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Albums</h1>
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

        {/* MODULAR Section */}
        {modular.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">MODULAR</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {modular.map((product) => (
                <SimpleProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* ELECTRONIC Section */}
        {electronic.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">ELECTRONIC</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {electronic.map((product) => (
                <SimpleProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* LOFI Section */}
        {lofi.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">LOFI</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {lofi.map((product) => (
                <SimpleProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Donate Button */}
        <div className="mt-12 mb-12 text-center">
          <a
            href="https://www.patreon.com/c/jadewii/membership"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            Donate
          </a>
          <p className="text-gray-600 text-base mt-4">
            Your support helps me keep creating and sharing my work with the world.
          </p>
        </div>
      </div>
    </div>
  )
}
