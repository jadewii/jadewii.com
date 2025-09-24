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
    if (currentTrackIndex === trackIndex && isPlaying) {
      // If clicking the same track that's playing, pause it
      audioRef.current.pause()
      setIsPlaying(false)
      currentlyPlaying = null
    } else {
      // Stop any currently playing audio
      if (audioRef.current && isPlaying) {
        audioRef.current.pause()
      }

      // Stop other players
      if (currentlyPlaying && currentlyPlaying !== audioRef.current) {
        currentlyPlaying.pause()
        currentlyPlaying.dispatchEvent(new Event('force-stop'))
      }

      // Update track index
      setCurrentTrackIndex(trackIndex)

      // Set the audio position to the correct track
      if (audioRef.current && duration > 0) {
        const trackStartTime = trackIndex * (duration / tracks.length)
        audioRef.current.currentTime = trackStartTime

        // Start playing after setting the position
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              currentlyPlaying = audioRef.current
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
      } else {
        // If duration not available yet, just start playing
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              currentlyPlaying = audioRef.current
              // Set position after play starts
              if (duration > 0) {
                const trackStartTime = trackIndex * (duration / tracks.length)
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
      }
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
    <div className="bg-white text-black py-8 mb-8 border-b border-gray-200">
      <div className="container-custom">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{product.title.toUpperCase()}</h2>
          <p className="text-sm text-gray-600">Lossless .WAVs, complete with high-resolution A/B artwork.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative mx-auto">
              <div className="aspect-square relative overflow-hidden bg-gray-100 rounded">
                <img
                  src={product.image || '/placeholder.jpg'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={handlePlayPause}
                    className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-100 transition-all duration-300"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="black">
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

              <div className="bg-gray-100 rounded p-3 mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={handlePlayPause}
                    className="bg-black text-white rounded-full p-2 hover:bg-gray-800 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                    <div className="text-xs font-medium mb-1">
                      {tracks[currentTrackIndex] || 'Select a track'}
                    </div>
                    <div className="text-xs text-gray-500">
                      0:{String(Math.max(10 - Math.floor(currentTime % 10), 0)).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-300 rounded-full h-1">
                  <div
                    className="bg-black h-1 rounded-full transition-all duration-100"
                    style={{ width: `${Math.min(((currentTime % 10) / 10) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="h-full flex flex-col">
              <div className="space-y-1 flex-1">
                {tracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrackSelect(index)}
                    className={`w-full text-left p-3 text-xs rounded transition-colors ${
                      currentTrackIndex === index
                        ? 'bg-gray-200 text-black font-medium'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 flex justify-center">
                        {currentTrackIndex === index ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                            {isPlaying ? (
                              <>
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                              </>
                            ) : (
                              <polygon points="5 3 19 12 5 21 5 3" />
                            )}
                          </svg>
                        ) : (
                          <span className="text-xs font-medium">{index + 1}.</span>
                        )}
                      </div>
                      <span className="flex-1 truncate">{track}</span>
                      {currentTrackIndex === index && isPlaying && (
                        <div className="w-6 h-4">
                          <div className="flex items-center gap-px justify-center">
                            <div className="w-0.5 bg-black animate-bounce" style={{
                              height: `${Math.floor(Math.random() * 12) + 4}px`,
                              animationDuration: '0.6s',
                              animationDelay: '0s'
                            }}></div>
                            <div className="w-0.5 bg-black animate-bounce" style={{
                              height: `${Math.floor(Math.random() * 12) + 4}px`,
                              animationDuration: '0.8s',
                              animationDelay: '0.1s'
                            }}></div>
                            <div className="w-0.5 bg-black animate-bounce" style={{
                              height: `${Math.floor(Math.random() * 12) + 4}px`,
                              animationDuration: '0.5s',
                              animationDelay: '0.2s'
                            }}></div>
                            <div className="w-0.5 bg-black animate-bounce" style={{
                              height: `${Math.floor(Math.random() * 12) + 4}px`,
                              animationDuration: '0.7s',
                              animationDelay: '0.3s'
                            }}></div>
                            <div className="w-0.5 bg-black animate-bounce" style={{
                              height: `${Math.floor(Math.random() * 12) + 4}px`,
                              animationDuration: '0.6s',
                              animationDelay: '0.4s'
                            }}></div>
                            <div className="w-0.5 bg-black animate-bounce" style={{
                              height: `${Math.floor(Math.random() * 12) + 4}px`,
                              animationDuration: '0.9s',
                              animationDelay: '0.5s'
                            }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-black text-white font-bold py-2 px-4 text-sm rounded hover:bg-gray-800 transition-colors mt-4"
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