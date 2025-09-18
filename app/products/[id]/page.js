'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SimpleAudioPlayer from '../../../components/SimpleAudioPlayer'
import { products } from '../../../lib/data/products'
import { useCartStore } from '../../../lib/store'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const params = useParams()
  const product = products.find(p => p.id === params.id)
  const [selectedFormat, setSelectedFormat] = useState('mp3_320')
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      ...product,
      selectedFormat: product.type === 'album' ? selectedFormat : null
    })
    toast.success(`${product.title} added to cart!`)
  }

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Album/Product Image */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Product Info & Player */}
        <div>
          {/* Product Header */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">{product.artist}</p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl font-medium mb-4">${product.price.toFixed(2)} USD</p>

            {product.description && (
              <p className="text-gray-700 mb-4">{product.description}</p>
            )}

            {/* Format Selection for Albums */}
            {product.type === 'album' && product.downloadFiles && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Format:</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-400"
                >
                  <option value="mp3_320">MP3 320kbps</option>
                  <option value="wav">WAV</option>
                  <option value="flac">FLAC</option>
                </select>
              </div>
            )}

            {/* Sample Pack Features */}
            {product.type === 'sample-pack' && product.features && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Includes:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors mb-4"
            >
              Add to Cart
            </button>

            {/* Audio Player for Albums - Placed right below Add to Cart */}
            {product.type === 'album' && product.trackList && product.trackList.length > 0 && (
              <div className="mb-6">
                <SimpleAudioPlayer
                  tracks={product.trackList}
                  albumTitle={product.title}
                />
              </div>
            )}

            {/* Product Details */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>Type: {product.type === 'album' ? 'Digital Album' : 'Sample Pack'}</p>
              <p>Instant digital download after purchase</p>
              {product.type === 'album' && product.trackList && (
                <p>{product.trackList.length} tracks</p>
              )}
            </div>
          </div>

          {/* Sample Pack Preview */}
          {product.type === 'sample-pack' && product.previewUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <audio controls className="w-full">
                <source src={product.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>

      {/* Back to Products */}
      <div className="mt-12 pt-8 border-t">
        <Link href="/" className="text-gray-600 hover:text-black transition-colors">
          ← Back to all products
        </Link>
      </div>
    </div>
  )
}