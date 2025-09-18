'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '../lib/store'

export default function FloatingCart() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isVisible, setIsVisible] = useState(false)
  const [hideTimeout, setHideTimeout] = useState(null)

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true)

      // Clear any existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }

      // Hide after 5 seconds of inactivity
      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 5000)

      setHideTimeout(timeout)
    } else {
      setIsVisible(false)
    }

    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }
    }
  }, [items])

  const handleCheckout = async () => {
    // Create a combined checkout session for all items
    try {
      const response = await fetch('/api/create-bulk-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  if (!isVisible || items.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-2xl z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold">{items.length} {items.length === 1 ? 'ALBUM' : 'ALBUMS'} ADDED</span>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
        {items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="text-xs text-gray-300">
            {item.title}
          </div>
        ))}
        {items.length > 3 && (
          <div className="text-xs text-gray-400">
            +{items.length - 3} more...
          </div>
        )}
      </div>

      <div className="border-t border-gray-700 pt-3">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm">Total:</span>
          <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          CHECKOUT →
        </button>
      </div>
    </div>
  )
}