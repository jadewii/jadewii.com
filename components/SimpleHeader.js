'use client'

import Link from 'next/link'

export default function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            JAde Wii
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/albums" className="hover:text-gray-600">
              ALBUMS
            </Link>
            <Link href="/sounds/" className="hover:text-gray-600">
              SAMPLE PACKS
            </Link>
            <a
              href="https://www.patreon.com/cw/jadewii/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              PATREON
            </a>
            <a
              href="https://www.youtube.com/@JAdeWii_"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
            >
              YOUTUBE
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}