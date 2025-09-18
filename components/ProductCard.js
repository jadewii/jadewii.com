'use client'

import { useState, useRef, useEffect } from 'react'
import { useCartStore } from '../lib/store'
import toast from 'react-hot-toast'

// Global variable to track currently playing audio
let currentlyPlaying = null

export default function ProductCard({ product, products, currentIndex }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)
  const addItem = useCartStore((state) => state.addItem)

  // Get track list or use product as single track
  const tracks = product.trackList && product.trackList.length > 0
    ? product.trackList
    : ['Preview']

  // Create audio source URL - using the album ID and track index
  const getAudioSrc = () => {
    if (product.previewUrl) return product.previewUrl
    // Use the album ID to find the audio file
    // Audio files are in /public/audio/ directory
    return `/audio/${product.id}.mp3`
  }

  const handlePlayPause = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        currentlyPlaying = null
        // Clear the auto-advance timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      } else {
        // Stop any other playing audio
        if (currentlyPlaying && currentlyPlaying !== audioRef.current) {
          currentlyPlaying.pause()
          currentlyPlaying.dispatchEvent(new Event('force-stop'))
        }

        // Start from the beginning of the entire preview (plays all tracks)
        audioRef.current.currentTime = 0
        setCurrentTrackIndex(0)
        // Try to play, handle errors gracefully
        audioRef.current.play().catch(err => {
          console.log('Audio playback failed:', err)
        })
        currentlyPlaying = audioRef.current
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handlePrevious = (e) => {
    e.preventDefault()
    e.stopPropagation()

    let newIndex = currentTrackIndex - 1
    if (newIndex < 0) {
      newIndex = tracks.length - 1 // Loop to last track
    }
    setCurrentTrackIndex(newIndex)

    if (isPlaying && audioRef.current) {
      // Jump to the start of the previous track's 10-second segment
      const segmentStart = newIndex * 10
      audioRef.current.currentTime = segmentStart
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    e.stopPropagation()

    let newIndex = currentTrackIndex + 1
    if (newIndex >= tracks.length) {
      newIndex = 0 // Loop back to first track
    }
    setCurrentTrackIndex(newIndex)

    if (isPlaying && audioRef.current) {
      // Jump to the start of the next track's 10-second segment
      const segmentStart = newIndex * 10
      audioRef.current.currentTime = segmentStart
    }
  }

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Show checkmark briefly
    setShowCheckmark(true)
    setTimeout(() => setShowCheckmark(false), 500)

    // Add to cart store
    addItem({
      ...product,
      selectedFormat: 'mp3_320'
    })
  }

  // Handle audio playback and track display
  useEffect(() => {
    if (!audioRef.current) return

    const handleTimeUpdate = () => {
      const currentPos = audioRef.current.currentTime
      setCurrentTime(currentPos)

      // Calculate which track should be displayed based on current time
      // Each track is 10 seconds in the preview file
      const trackIndex = Math.floor(currentPos / 10)

      if (trackIndex < tracks.length) {
        setCurrentTrackIndex(trackIndex)
      }
    }

    const handleEnded = () => {
      // When audio ends naturally, loop back to beginning
      setCurrentTrackIndex(0)
      if (audioRef.current && isPlaying) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(err => console.log('Replay failed:', err))
      }
    }

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    audioRef.current.addEventListener('ended', handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.removeEventListener('ended', handleEnded)
      }
    }
  }, [tracks.length, isPlaying])

  // Update audio source
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = getAudioSrc()
    }
  }, [])

  // Listen for force-stop event from other cards
  useEffect(() => {
    const handleForceStop = () => {
      setIsPlaying(false)
      setCurrentTrackIndex(0)
      setCurrentTime(0)
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('force-stop', handleForceStop)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('force-stop', handleForceStop)
      }
    }
  }, [])

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Album Image */}
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay on hover */}
        {showControls && (
          <>
            {/* Center Play/Pause Button with navigation arrows */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4">
              {/* Previous button */}
              <button
                onClick={handlePrevious}
                className="text-white hover:opacity-70"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.445 14.832A1 1 0 0010 14v-8a1 1 0 00-1.555-.832L5 8.048V6a1 1 0 00-2 0v8a1 1 0 002 0v-2.048l3.445 2.88z" />
                </svg>
              </button>

              {/* Play/Pause button */}
              <button
                onClick={handlePlayPause}
                className=""
              >
                {isPlaying ? (
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="6" width="4" height="12" />
                    <rect x="14" y="6" width="4" height="12" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="text-white hover:opacity-70"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.555 5.168A1 1 0 0010 6v8a1 1 0 001.555.832L15 11.952V14a1 1 0 002 0V6a1 1 0 00-2 0v2.048l-3.445-2.88z" />
                </svg>
              </button>
            </div>

            {/* Track Name - Floating at bottom */}
            {isPlaying && tracks[currentTrackIndex] !== 'Preview' && (
              <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                <div className="text-center">
                  <span className="text-white text-sm font-medium drop-shadow-lg">
                    {tracks[currentTrackIndex]}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add to Cart Bar - Below Album Art */}
      <button
        onClick={handleAddToCart}
        className="w-full py-2 text-xs font-semibold"
        style={{
          backgroundColor: showCheckmark ? '#10b981' : '#f3f4f6',
          color: showCheckmark ? 'white' : 'black'
        }}
      >
        {showCheckmark ? '✓ ADDED' : 'BUY +'}
      </button>

      {/* Album Info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium truncate">{product.title}</h3>
        <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onError={(e) => {
          console.log('Audio error:', e)
          setIsPlaying(false)
        }}
      />
    </div>
  )
}