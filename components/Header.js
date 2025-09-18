'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '../lib/store'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)
  const getItemCount = useCartStore((state) => state.getItemCount)
  const setCartOpen = useCartStore((state) => state.setCartOpen)
  const isCartOpen = useCartStore((state) => state.isCartOpen)

  useEffect(() => {
    setItemCount(getItemCount())

    // Subscribe to store changes
    const unsubscribe = useCartStore.subscribe(() => {
      setItemCount(getItemCount())
    })

    return unsubscribe
  }, [])

  return (
    <header className="fixed top-0 w-full bg-black text-white z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold" style={{fontFamily: 'Player2'}}>
              JADE WII
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              Home
            </Link>
            <Link href="/collections/albums" className="hover:text-gray-400 transition-colors">
              Digital Albums
            </Link>
            <Link href="/collections/sample-packs" className="hover:text-gray-400 transition-colors">
              Drum & Sample Kits
            </Link>
            <Link href="/about" className="hover:text-gray-400 transition-colors">
              About
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <button className="hover:text-gray-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setCartOpen(!isCartOpen)}
              className="relative hover:text-gray-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-gray-400 transition-colors">
                Home
              </Link>
              <Link href="/collections/albums" className="hover:text-gray-400 transition-colors">
                Digital Albums
              </Link>
              <Link href="/collections/sample-packs" className="hover:text-gray-400 transition-colors">
                Drum & Sample Kits
              </Link>
              <Link href="/about" className="hover:text-gray-400 transition-colors">
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}