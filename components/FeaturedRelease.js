'use client'

import { useState, useRef, useEffect } from 'react'

let currentlyPlaying = null

export default function FeaturedRelease({ product }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const tracks = product.trackList && product.trackList.length > 0
    ? product.trackList
    : ['Preview']

  const getAudioSrc = () => {
    const baseUrl = 'https://jadewii.github.io/jadewiiwebsiteaudio'
    const audioUrl = `${baseUrl}/${product.id}.mp3`
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
        if (currentlyPlaying && currentlyPlaying !== audioRef.current) {
          currentlyPlaying.pause()
          currentlyPlaying.dispatchEvent(new Event('force-stop'))
        }

        audioRef.current.load()

        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (duration > 0) {
                const trackStartTime = currentTrackIndex * (duration / tracks.length)
                audioRef.current.currentTime = trackStartTime
              }
            })
            .catch(err => {
              console.error('Play failed:', err)
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

  const handleTrackSelect = (trackIndex) => {
    setCurrentTrackIndex(trackIndex)
    if (audioRef.current && duration > 0) {
      const trackStartTime = trackIndex * (duration / tracks.length)
      audioRef.current.currentTime = trackStartTime
    }
  }

  const handleBuyNow = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.itchioUrl) {
      window.open(product.itchioUrl, '_blank')
    } else if (product.bandcampUrl) {
      window.open(product.bandcampUrl, '_blank')
    } else if (product.stripePaymentLink) {
      window.location.href = product.stripePaymentLink
    } else {
      alert('Purchase link coming soon!')
    }
  }

  useEffect(() => {
    if (!audioRef.current) return

    const handleTimeUpdate = () => {
      const current = audioRef.current.currentTime
      setCurrentTime(current)

      if (duration > 0) {
        const trackDuration = duration / tracks.length
        const trackIndex = Math.floor(current / trackDuration)
        if (trackIndex < tracks.length && trackIndex !== currentTrackIndex) {
          setCurrentTrackIndex(trackIndex)
        }
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration)
    }

    const handleEnded = () => {
      setCurrentTrackIndex(0)
      setIsPlaying(false)
      currentlyPlaying = null
    }

    const handleForceStop = () => {
      setIsPlaying(false)
    }

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
    audioRef.current.addEventListener('ended', handleEnded)
    audioRef.current.addEventListener('force-stop', handleForceStop)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.removeEventListener('force-stop', handleForceStop)
      }
    }
  }, [isPlaying, tracks.length, currentTrackIndex, duration])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white text-black py-16 mb-16">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">LATEST RELEASE</h1>
          <p className="text-xl text-gray-600">Digital albums, yours forever</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="relative group">
                <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg shadow-lg">
                  {/* Main album cover */}
                  <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                  />

                  {/* Back cover - shows on hover */}
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.title} - Back`}
                      className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                  )}

                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
                  <p className="text-xl text-gray-600 mb-4">{product.artist}</p>
                  <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Now Playing Player - directly under album */}
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={handlePlayPause}
                    className="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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

                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">
                      {tracks[currentTrackIndex] || 'Select a track'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all duration-100"
                    style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-black text-white font-bold py-4 px-8 text-lg rounded-lg hover:bg-gray-800 transition-colors"
              >
                BUY DIGITAL ALBUM - ${product.price.toFixed(2)}
              </button>
            </div>

            <div className="space-y-1">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => handleTrackSelect(index)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors border text-sm ${
                    currentTrackIndex === index
                      ? 'bg-gray-100 border-gray-300 text-black'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium w-6">{index + 1}.</span>
                    <span className="flex-1">{track}</span>
                    {currentTrackIndex === index && isPlaying && (
                      <div className="w-4 h-4">
                        <div className="flex items-center gap-1">
                          <div className="w-0.5 h-2 bg-black animate-pulse"></div>
                          <div className="w-0.5 h-1.5 bg-black animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-0.5 h-3 bg-black animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={getAudioSrc()} preload="metadata" />
      </div>
    </div>
  )
}
