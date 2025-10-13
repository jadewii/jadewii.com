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
    <div className="bg-gradient-to-br from-gray-900 to-black text-white py-16 mb-16">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">LATEST RELEASE</h1>
          <p className="text-xl text-gray-300">Experience the complete album before you buy</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square relative overflow-hidden bg-gray-800 rounded-lg shadow-2xl">
                <img
                  src={product.image || '/placeholder.jpg'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={handlePlayPause}
                    className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 hover:bg-opacity-30 transition-all duration-300"
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
                </div>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
                <p className="text-xl text-gray-300 mb-4">{product.artist}</p>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Track List</h3>

              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={handlePlayPause}
                    className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors"
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
                    <div className="text-xs text-gray-400">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-100"
                    style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 mb-8 max-h-96 overflow-y-auto">
                {tracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrackSelect(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentTrackIndex === index
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium w-8">{index + 1}.</span>
                      <span className="flex-1">{track}</span>
                      {currentTrackIndex === index && isPlaying && (
                        <div className="w-4 h-4">
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-3 bg-white animate-pulse"></div>
                            <div className="w-1 h-2 bg-white animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-white text-black font-bold py-4 px-8 text-lg rounded-lg hover:bg-gray-200 transition-colors"
              >
                BUY DIGITAL ALBUM - ${product.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={getAudioSrc()} preload="metadata" />
      </div>
    </div>
  )
}
