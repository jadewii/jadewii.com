'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AppsPage() {
  const apps = [
    {
      id: 'noiseface',
      name: 'NoiseFace',
      icon: '/images/apps/noiseface-icon.png',
      available: true,
      link: '/apps/noiseface'
    },
    {
      id: 'waveface',
      name: 'Up Next...',
      icon: null,
      available: false,
      link: null
    },
    // Empty slots for future apps
    ...Array(6).fill(null).map((_, i) => ({
      id: `slot-${i + 3}`,
      name: null,
      icon: null,
      available: false,
      link: null
    }))
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="container-custom py-12 md:py-24">
        <div className="max-w-5xl mx-auto text-center">

          {/* Header */}
          <div className="mb-10 md:mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
              <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="hidden md:inline">Music Apps</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 px-4">
              A collection of creative audio tools for the sound explorer
            </p>
          </div>

          {/* Featured Released Apps */}
          <div className="mb-16 px-4">
            {apps.filter(app => app.available).map((app) => (
              <Link
                key={app.id}
                href={app.link}
                className="block max-w-sm mx-auto group"
              >
                <div className="relative mb-4">
                  <div className="app-cover aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={app.icon}
                      alt={app.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* NEW Badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse z-10">
                    NEW!
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 group-hover:text-purple-600 transition-colors">
                  {app.name}
                </h2>
                <p className="text-center text-gray-600 text-sm">Tap to learn more</p>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">
              Coming Soon
            </h2>
          </div>

          {/* Sticker Book Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto px-4 md:px-0">
            {apps.filter(app => !app.available).map((app) => (
              <div
                key={app.id}
                className="sticker-slot"
              >
                {app.name ? (
                  // Coming soon app with no icon
                  <div>
                    <div className="sticker-card coming-soon aspect-square">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-6xl text-gray-400">?</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg md:text-xl text-center text-gray-500 mt-3">
                      {app.name}
                    </h3>
                  </div>
                ) : (
                  // Empty slot
                  <div>
                    <div className="sticker-card empty aspect-square">
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Patreon Support Button */}
          <div className="mt-12 md:mt-16 text-center px-4">
            <a
              href="https://www.patreon.com/cw/jadewii/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
              </svg>
              Support on Patreon
            </a>
            <p className="text-gray-600 text-base mt-4 max-w-md mx-auto px-4">
              Your support on Patreon helps me keep creating and sharing my work with the world.
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        .app-cover {
          position: relative;
          width: 100%;
          max-width: 280px;
          margin: 0 auto;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        @media (min-width: 768px) {
          .app-cover {
            max-width: 400px;
          }
        }

        .app-cover:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .sticker-slot {
          position: relative;
        }

        .sticker-card {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .sticker-card.available {
          border: 3px solid #E5E7EB;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          overflow: hidden;
        }

        .sticker-card.available:hover {
          transform: translateY(-4px) rotate(2deg);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .sticker-card.coming-soon {
          background: #FFFFFF;
          border: 3px dashed #D1D5DB;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .sticker-card.empty {
          background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
          border: 3px dashed #E5E7EB;
        }
      `}</style>
    </div>
  )
}
