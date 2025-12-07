'use client'

import Link from 'next/link'

export default function AlbumsPage() {
  const streamingLinks = [
    { name: 'Spotify', url: 'https://spoti.fi/40dcYju' },
    { name: 'Apple Music', url: 'https://apple.co/40drqXx' },
    { name: 'YouTube Music', url: 'https://bit.ly/3BWcODv' },
    { name: 'Amazon Music', url: 'https://amzn.to/3W0Q8sQ' },
    { name: 'Bandcamp', url: 'https://bit.ly/3DIR7Hx' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="container-custom py-12 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Music</h1>
          <p className="text-lg text-gray-600 mb-12">Listen on your favorite platform</p>

          <div className="space-y-4">
            {streamingLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-white border-2 border-gray-200 rounded-full text-xl font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all transform hover:scale-105 shadow-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/support"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Support My Work
            </Link>
            <p className="text-gray-600 text-base mt-4">
              Your support helps me keep creating and sharing my work with the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
