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
      name: 'WaveFace',
      icon: '/images/apps/waveface-icon.png',
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
            <Image
              src="/images/jade8bit.gif"
              alt="JAde Wii"
              width={80}
              height={80}
              unoptimized
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">A NEW ERA</h1>
            <p className="text-xl text-gray-600">
              A collection of creative audio tools by JAde Wii
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
                    <h3 className="font-bold text-base md:text-lg text-center mt-3">
                      {app.name}
                    </h3>
                  </Link>
                ) : app.icon ? (
                  // Coming soon app
                  <div>
                    <div className="sticker-card coming-soon aspect-square">
                      <div className="relative w-full h-full opacity-40">
                        <Image
                          src={app.icon}
                          alt={app.name}
                          fill
                          className="object-cover rounded-3xl grayscale"
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-base md:text-lg text-center text-gray-500 mt-3">
                      {app.name}
                    </h3>
                    <p className="text-xs text-gray-400 text-center mt-1">Coming Soon</p>
                  </div>
                ) : (
                  // Empty slot
                  <div>
                    <div className="sticker-card empty aspect-square">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-6xl text-gray-300">?</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center text-gray-600">
            <p className="text-sm">More apps coming soon!</p>
          </div>

          {/* Patreon Support Section */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-10 border-2 border-gray-300 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
                Support My Creative Work
              </h3>
              <p className="text-gray-800 mb-6">
                I create apps, music albums, tutorials, reviews, and videos. Your support on Patreon helps me keep creating and sharing my work with the world.
              </p>
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
            </div>
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
          border-color: #9333EA;
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
