'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function MusicPage() {
  const streamingLinks = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/5LpHMa6ly1rZjlQ30LQhw2', external: true },
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/jade-wii/1450705869', external: true },
    { name: 'YouTube Music', url: 'https://music.youtube.com/browse/MPADUCOvW40W5-DK04izugvu6ubA', external: true },
    { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B07N4JQGGV/jade-wii', external: true },
    { name: 'Digital Albums', url: '/albums', external: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="container-custom py-12 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Portrait */}
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/images/jadewii.webp"
                alt="JAde Wii"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* YouTube Icon */}
          <div className="flex justify-center mb-8">
            <a
              href="https://www.youtube.com/@JAdeWii_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-red-600 transition-colors"
              title="Subscribe on YouTube"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          <p className="text-lg text-gray-600 mb-12">Listen on your favorite platform</p>

          <div className="space-y-4">
            {streamingLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-8 py-4 bg-white border-2 border-gray-200 rounded-full text-xl font-bold text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all transform hover:scale-105 shadow-sm"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.url}
                  className="block w-full px-8 py-4 bg-white border-2 border-gray-200 rounded-full text-xl font-bold text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all transform hover:scale-105 shadow-sm"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="mt-16">
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
    </div>
  )
}
