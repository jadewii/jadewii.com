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
    // Use GitHub Pages for production, local for dev
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://jadewii.github.io/jadewiiwebsiteaudio'
      : '/audio'
    return `${baseUrl}/${product.id}.mp3`
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
  const handleBuyNow = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
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

      {/* Buy Button Bar - Below Album Art */}
      <button
        onClick={handleBuyNow}
        className="w-full py-2 text-xs font-semibold bg-gray-100 text-black hover:bg-gray-200 transition-colors"
      >
        BUY +
      </button>

      {/* Album Info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium truncate">{product.title}</h3>
        <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={getAudioSrc()} preload="metadata" crossOrigin="anonymous" />
    </div>
  )
}