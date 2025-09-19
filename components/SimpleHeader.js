'use client'

import Link from 'next/link'

export default function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            JAde Wii
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/collections/albums" className="hover:text-gray-300">
              ALBUMS
            </Link>
            <Link href="/collections/sample-packs" className="hover:text-gray-300">
              SAMPLE PACKS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}