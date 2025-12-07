'use client'

import Image from 'next/image'

export default function AppsPage() {
  const apps = [
    {
      id: 'noiseface',
      name: 'NoiseFace',
      icon: '/images/apps/noiseface-icon.webp',
      link: 'https://apps.apple.com/us/app/noiseface/id6754266069'
    },
    {
      id: 'waveface',
      name: 'WaveFace',
      icon: '/images/apps/waveface-icon.webp',
      link: 'https://apps.apple.com/us/app/waveface/id6754204480'
    }
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

          {/* App Cards */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-xl mx-auto px-4 md:px-0">
            {apps.map((app) => (
              <div key={app.id} className="sticker-slot">
                <a href={app.link} target="_blank" rel="noopener noreferrer" className="block">
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
                  <h3 className="font-bold text-lg md:text-xl text-center text-black mt-3">
                    {app.name}
                  </h3>
                </a>
              </div>
            ))}
          </div>

          {/* Support Button */}
          <div className="mt-12 md:mt-16 text-center px-4">
            <a
              href="https://www.patreon.com/c/jadewii/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Patreon
            </a>
            <p className="text-gray-600 text-base mt-4 max-w-md mx-auto px-4">
              Your support helps me keep creating and sharing my work with the world.
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
      `}</style>
    </div>
  )
}
