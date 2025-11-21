'use client'

import { useState, useRef, useEffect } from 'react'

// Global variable to track currently playing audio
let currentlyPlaying = null

export default function SimpleProductCard({ product, showTransportControls = true }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [leftButtonPressed, setLeftButtonPressed] = useState(false)
  const [rightButtonPressed, setRightButtonPressed] = useState(false)
  const audioRef = useRef(null)

  // Get track list
  const tracks = product.trackList && product.trackList.length > 0
    ? product.trackList
    : ['Preview']

  const getAudioSrc = () => {
    // Always use GitHub Pages for audio since we removed local audio files
    const baseUrl = 'https://jadewii.github.io/jadewiiwebsiteaudio'
    const audioUrl = `${baseUrl}/${product.id}.mp3`
    console.log('Audio URL for', product.title, ':', audioUrl)
    return audioUrl
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

        // Load and play the audio
        audioRef.current.load()

        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio started successfully
              audioRef.current.currentTime = currentTrackIndex * 10
            })
            .catch(err => {
              console.error('Play failed:', err)
              console.error('Audio src:', audioRef.current.src)
              // Show user-friendly error
              if (err.name === 'NotAllowedError') {
                alert('Please click play again. Browser requires user interaction for audio playback.')
              } else {
                alert(`Audio error: ${err.message}`)
              }
            })
        }

        currentlyPlaying = audioRef.current
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Simple direct purchase - link to Itch.io or Bandcamp!
  const handleBuyNow = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // If we have an Itch.io link, use it
    if (product.itchioUrl) {
      window.open(product.itchioUrl, '_blank')
    } else if (product.bandcampUrl) {
      // Use Bandcamp if available
      window.open(product.bandcampUrl, '_blank')
    } else if (product.stripePaymentLink) {
      // Fall back to Stripe if configured
      window.location.href = product.stripePaymentLink
    } else {
      alert('Purchase link coming soon!')
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
      onMouseEnter={() => {
        setShowControls(true)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setShowControls(false)
        setIsHovered(false)
      }}
    >
      {/* Album Cover */}
      <div
        className="aspect-square relative overflow-hidden bg-gray-100 cursor-pointer"
        onClick={handleBuyNow}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        {/* Main image */}
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered && product.hoverImage ? 0 : 1
          }}
        />

        {/* Hover image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.title} - Back`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0
            }}
          />
        )}

        {/* Hover Controls - Only show for albums when transport controls enabled */}
        {showControls && product.type === 'album' && showTransportControls && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Previous Track Button - Circle with Arrow */}
            {tracks.length > 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setLeftButtonPressed(true)
                  setTimeout(() => setLeftButtonPressed(false), 200)
                  const newIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1
                  setCurrentTrackIndex(newIndex)
                  if (isPlaying && audioRef.current) {
                    audioRef.current.currentTime = newIndex * 10
                  }
                }}
                className="mr-6"
                style={{
                  filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))',
                  transform: leftButtonPressed ? 'scale(1.5)' : 'scale(1)',
                  transition: 'transform 0.2s'
                }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                  <path d="M14 7l-5 5 5 5V7z"/>
                </svg>
              </button>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="hover:scale-110 transition-transform"
              style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))' }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
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

            {/* Next Track Button - Circle with Arrow */}
            {tracks.length > 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setRightButtonPressed(true)
                  setTimeout(() => setRightButtonPressed(false), 200)
                  const newIndex = (currentTrackIndex + 1) % tracks.length
                  setCurrentTrackIndex(newIndex)
                  if (isPlaying && audioRef.current) {
                    audioRef.current.currentTime = newIndex * 10
                  }
                }}
                className="ml-6"
                style={{
                  filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))',
                  transform: rightButtonPressed ? 'scale(1.5)' : 'scale(1)',
                  transition: 'transform 0.2s'
                }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                  <path d="M10 17l5-5-5-5v10z"/>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Buy Button Bar - Below Album Art */}
      <button
        onClick={handleBuyNow}
        className={`w-full py-2 text-xs font-semibold transition-colors ${
          isImageHovered
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-black hover:bg-gray-800 hover:text-white'
        }`}
      >
        BUY +
      </button>

      {/* Album Info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium truncate">{product.title}</h3>
        <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={getAudioSrc()} preload="none" />
    </div>
  )
}