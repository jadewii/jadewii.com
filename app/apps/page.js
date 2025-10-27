'use client'

import Image from 'next/image'

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Announcement Badge */}
          <div className="inline-block mb-6 animate-bounce">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg">
              MY FIRST IOS APP!
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-black animate-fade-in">
            NoiseFace
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Interactive noise generator and mixer
          </p>

          {/* Hero Image */}
          <div className="flex justify-center mb-12">
            <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float">
              <Image
                src="/images/apps/noiseface-hero.png"
                alt="NoiseFace Character"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* App Store Button */}
          <div className="mb-12">
            <a
              href="https://apps.apple.com/us/app/noiseface/id6754266069"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/images/apps/appstore.svg"
                alt="Download on the App Store"
                width={180}
                height={60}
                className="drop-shadow-md"
              />
            </a>
          </div>

          {/* Features Grid */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="flex flex-col items-center">
                <div className="arcade-button pink-button mb-4"></div>
                <h3 className="font-bold text-lg mb-2">12 Noise Colors</h3>
                <p className="text-sm text-gray-600 text-center">Mix and blend different noise types to create your perfect sound</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="arcade-button blue-button mb-4"></div>
                <h3 className="font-bold text-lg mb-2">Oscilloscope</h3>
                <p className="text-sm text-gray-600 text-center">Watch the mouth animate as you interact with sliders and sounds</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="arcade-button white-button mb-4"></div>
                <h3 className="font-bold text-lg mb-2">Save Presets</h3>
                <p className="text-sm text-gray-600 text-center">Store your favorite combinations for instant recall</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white border-2 border-purple-200 text-gray-700 rounded-full text-sm font-medium shadow-sm">
                📱 iOS/iPadOS
              </span>
              <span className="px-4 py-2 bg-white border-2 border-blue-200 text-gray-700 rounded-full text-sm font-medium shadow-sm">
                ⚡ Real-time Audio
              </span>
              <span className="px-4 py-2 bg-white border-2 border-purple-200 text-gray-700 rounded-full text-sm font-medium shadow-sm">
                🎧 High Quality
              </span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 shadow-2xl border-2 border-gray-200 max-w-md mx-auto hover:shadow-3xl transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-black">Scan to Download 🥳</h3>
            <p className="text-gray-700 mb-6">
              Point your camera at the QR code
            </p>

            <div className="flex justify-center mb-6">
              <div className="relative w-56 h-56 bg-white p-4 rounded-2xl shadow-lg">
                <Image
                  src="/images/apps/qr-code.jpg"
                  alt="Download QR Code"
                  fill
                  className="object-contain p-3"
                />
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Available for iPhone & iPad.<br />
              MACOS and VisionOS versions coming soon.
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        /* Arcade button style - 3D sphere like the app */
        .arcade-button {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          position: relative;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          transform-style: preserve-3d;
          animation: rotate3d 8s ease-in-out infinite;
        }

        @keyframes rotate3d {
          0%, 100% {
            transform: rotateY(0deg) rotateX(5deg);
          }
          25% {
            transform: rotateY(15deg) rotateX(-5deg);
          }
          50% {
            transform: rotateY(0deg) rotateX(5deg);
          }
          75% {
            transform: rotateY(-15deg) rotateX(-5deg);
          }
        }

        /* Outer rim (white border) */
        .arcade-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: white;
          z-index: 1;
          transform-style: preserve-3d;
        }

        /* Inner dome with 3D gradient */
        .arcade-button::after {
          content: '';
          position: absolute;
          top: 15%;
          left: 15%;
          right: 15%;
          bottom: 15%;
          border-radius: 50%;
          z-index: 2;
          transform-style: preserve-3d;
        }

        /* Pink button */
        .pink-button::after {
          background: radial-gradient(
            circle at 40% 35%,
            #FFB6C1,
            #FF69B4 50%,
            #FF1493
          );
          box-shadow:
            inset -5px -5px 15px rgba(0, 0, 0, 0.15),
            inset 5px 5px 15px rgba(255, 255, 255, 0.6);
        }

        /* Blue button */
        .blue-button::after {
          background: radial-gradient(
            circle at 40% 35%,
            #87CEEB,
            #4682B4 50%,
            #1E90FF
          );
          box-shadow:
            inset -5px -5px 15px rgba(0, 0, 0, 0.15),
            inset 5px 5px 15px rgba(255, 255, 255, 0.6);
        }

        /* Green button */
        .white-button::after {
          background: radial-gradient(
            circle at 40% 35%,
            #90EE90,
            #32CD32 50%,
            #228B22
          );
          box-shadow:
            inset -5px -5px 15px rgba(0, 0, 0, 0.15),
            inset 5px 5px 15px rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  )
}
