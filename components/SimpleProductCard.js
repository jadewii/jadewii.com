'use client'

import { useState, useRef, useEffect } from 'react'

// Global variable to track currently playing audio
let currentlyPlaying = null

export default function SimpleProductCard({ product }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef(null)

  // Get track list
  const tracks = product.trackList && product.trackList.length > 0
    ? product.trackList
    : ['Preview']

  const getAudioSrc = () => {
    if (product.previewUrl) return product.previewUrl
    return `/audio/${product.id}.mp3`
  }

  const handlePlayPause = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        currentlyPlaying = null
      } else {
        // Stop any other playing audio
        if (currentlyPlaying && currentlyPlaying !== audioRef.current) {
          currentlyPlaying.pause()
          currentlyPlaying.dispatchEvent(new Event('force-stop'))
        }

        audioRef.current.currentTime = currentTrackIndex * 10
        audioRef.current.play()
        currentlyPlaying = audioRef.current
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Simple direct purchase - no cart!
  const handleBuyNow = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.stripePaymentLink && product.stripePaymentLink !== 'https://buy.stripe.com/YOUR_LINK_HERE') {
      window.location.href = product.stripePaymentLink
    } else {
      alert(`Payment link coming soon for "${product.title}"`)
    }
  }

  useEffect(() => {
    if (!audioRef.current) return

    const handleTimeUpdate = () => {
      const currentPos = audioRef.current.currentTime
      const trackIndex = Math.floor(currentPos / 10)
      if (trackIndex < tracks.length) {
        setCurrentTrackIndex(trackIndex)
      }
    }

    const handleEnded = () => {
      setCurrentTrackIndex(0)
      if (audioRef.current && isPlaying) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(err => console.log('Replay failed:', err))
      }
    }

    const handleForceStop = () => {
      setIsPlaying(false)
    }

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    audioRef.current.addEventListener('ended', handleEnded)
    audioRef.current.addEventListener('force-stop', handleForceStop)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.removeEventListener('force-stop', handleForceStop)
      }
    }
  }, [isPlaying, tracks.length, currentTrackIndex])

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Album Cover */}
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* Hover Controls */}
        {showControls && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="text-white hover:scale-110 transition-transform"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                {isPlaying ? (
                  <>
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </>
                ) : (
                  <polygon points="5 3 19 12 5 21 5 3" />
                )}
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium truncate">{product.title}</h3>
        <p className="text-xs text-gray-600 truncate">{product.artist}</p>

        {/* Track Display */}
        {isPlaying && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            ▶ {tracks[currentTrackIndex]}
          </p>
        )}

        {/* Price and Buy Button */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold">${product.price}</span>
          <button
            onClick={handleBuyNow}
            className="px-3 py-1 bg-black text-white text-xs hover:bg-gray-800 transition-colors"
          >
            BUY
          </button>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={getAudioSrc()} preload="metadata" />
    </div>
  )
}