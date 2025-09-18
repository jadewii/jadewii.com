'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '../lib/store'

export default function CartDrawer() {
  const { items, removeItem, getTotalPrice, clearCart, isCartOpen, setCartOpen } = useCartStore()

  const handleCheckout = async () => {
    if (items.length === 0) return

    try {
      // For single item, use simple checkout
      if (items.length === 1 && items[0].stripePriceId && items[0].stripePriceId !== 'price_REPLACE_ME') {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId: items[0].stripePriceId,
            productName: items[0].title
          })
        })

        if (response.ok) {
          const { url } = await response.json()
          window.location.href = url
        }
      } else {
        // For multiple items, create a bulk checkout
        const response = await fetch('/api/create-bulk-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items })
        })

        if (response.ok) {
          const { url } = await response.json()
          window.location.href = url
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  return (
    <>
      {/* Cart Drawer - slides in from right when open, shifts content left */}
      <div className={`fixed right-0 top-16 h-[calc(100vh-64px)] w-72 bg-white shadow-2xl z-40 transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-sm font-bold">YOUR CART</h2>
            <button
              onClick={() => setCartOpen(!isCartOpen)}
              className="text-xl hover:opacity-70"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-3 text-sm">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 pb-2 border-b">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs truncate">{item.title}</h3>
                      <p className="text-xs text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-black text-sm px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-3">
              <div className="flex justify-between mb-3">
                <span className="font-medium text-sm">Total</span>
                <span className="font-bold text-lg">${getTotalPrice().toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-2 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                CHECKOUT →
              </button>

            </div>
          )}
        </div>
      </div>
    </>
  )
}