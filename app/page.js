'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
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
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
              <svg className="w-10 h-10 md:w-14 md:h-14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="hidden md:inline">Music Apps</span>
              <span className="md:hidden">iOS Music Apps</span>
            </h1>
            <p className="text-xl text-gray-600">
              A collection of creative audio tools for the sound explorer
            </p>
          </div>

          {/* Sticker Book Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {apps.map((app) => (
              <div
                key={app.id}
                className="sticker-slot"
              >
                {app.available ? (
                  // Available app - clickable
                  <Link href={app.link} className="block">
                    <div className="relative">
                      <div className="sticker-card available aspect-square">
                        <div className="relative w-full h-full">
                          <Image
                            src={app.icon}
                            alt={app.name}
                            fill
                            className="object-cover rounded-3xl"
                          />
                        </div>
                      </div>
                      {/* NEW Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        NEW!
                      </div>
                    </div>
                    <h3 className="font-bold text-base md:text-lg text-center mt-3">
                      {app.name}
                    </h3>
                  </Link>
                ) : app.name ? (
                  // Coming soon app with no icon
                  <div>
                    <div className="sticker-card coming-soon aspect-square">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-6xl text-gray-400">?</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-base md:text-lg text-center text-gray-500 mt-3">
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
          <div className="mt-16 text-center">
            <a
              href="https://www.patreon.com/cw/jadewii/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
              </svg>
              Support on Patreon
            </a>
            <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
              Your support on Patreon helps me keep creating and sharing my work with the world.
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
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
