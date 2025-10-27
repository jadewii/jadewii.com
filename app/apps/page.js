'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AppsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">iOS Apps</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creative audio tools for iOS, iPadOS, and visionOS
            </p>
          </div>

          {/* NoiseFace Hero Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/images/apps/noiseface-hero.png"
                alt="NoiseFace Character"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Apps Section */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* NoiseFace Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src="/images/apps/noiseface-icon.png"
                    alt="NoiseFace Icon"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">NoiseFace</h2>
                <p className="text-gray-700 text-lg mb-4">
                  A cute noise generator that visualizes sound through an adorable animated character.
                  Mix up to 12 different noise colors, save your favorite combinations, and watch the waveforms dance!
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Noise Generator
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Audio Visualization
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    iOS/iPadOS/visionOS
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <p className="mb-2">
                    <strong>Features:</strong> 12 noise types • Real-time waveform display •
                    Preset saving • Dark mode • Universal app
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WaveFace Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src="/images/apps/waveface-icon.png"
                    alt="WaveFace Icon"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">WaveFace</h2>
                <p className="text-gray-700 text-lg mb-4">
                  Professional waveform generator for iOS. Create and customize audio waveforms with 20+
                  different wave types including sine, square, sawtooth, triangle, and many more.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Waveform Generator
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    20+ Wave Types
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    iOS/iPadOS/visionOS
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <p className="mb-2">
                    <strong>Features:</strong> 20+ waveforms • Frequency control •
                    Amplitude adjustment • Real-time preview • Universal app
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Download Section with QR Code */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-10 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Download Now</h3>
            <p className="text-gray-700 mb-6">
              Scan the QR code with your iPhone or iPad to download
            </p>

            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48 bg-white p-4 rounded-xl shadow-md">
                <Image
                  src="/images/apps/qr-code.jpg"
                  alt="Download QR Code"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Available on the App Store for iPhone, iPad, and Apple Vision Pro
            </p>
          </div>
        </div>

        {/* Support Links */}
        <div className="max-w-2xl mx-auto mt-12 text-center text-sm text-gray-600">
          <p>
            Need help? Check out the{' '}
            <a href="/support" className="text-blue-600 hover:underline">
              support page
            </a>
            {' '}or{' '}
            <a href="mailto:support@jadewii.com" className="text-blue-600 hover:underline">
              contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
