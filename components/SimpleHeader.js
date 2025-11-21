'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Image
              src="/images/jade8bit.gif"
              alt="JAde Wii"
              width={28}
              height={28}
              unoptimized
              className="inline-block"
            />
            <span className="hidden md:inline">JAde Wii</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-600">
              HOME
            </Link>
            <Link href="/apps" className="hover:text-gray-600">
              APPS
            </Link>
            <Link href="/albums" className="hover:text-gray-600">
              MUSIC
            </Link>
            <Link href="/sample-packs" className="hover:text-gray-600">
              PACKS
            </Link>
            <Link href="/patches" className="hover:text-gray-600">
              PATCHES
            </Link>
            <Link href="/support" className="hover:text-gray-600">
              DONATE
            </Link>
            <a
              href="https://www.youtube.com/@JAdeWii_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition-colors"
              title="Subscribe on YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}