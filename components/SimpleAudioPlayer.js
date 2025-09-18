'use client'

import { useState, useRef, useEffect } from 'react'

export default function SimpleAudioPlayer({ tracks, albumTitle }) {
  const audioRef = useRef(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [currentTrackIndex])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skipTrack = (direction) => {
    let newIndex = currentTrackIndex + direction
    if (newIndex < 0) newIndex = tracks.length - 1
    if (newIndex >= tracks.length) newIndex = 0

    setCurrentTrackIndex(newIndex)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleProgressChange = (e) => {
    const newValue = parseFloat(e.target.value)
    const newTime = (newValue / 100) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    audioRef.current.volume = newVolume
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
      <audio
        ref={audioRef}
        src={currentTrack?.previewUrl || `/audio/previews/${currentTrack?.id || 'default'}.mp3`}
        onEnded={() => skipTrack(1)}
      />

      {/* Track Info */}
      <div className="mb-3 text-center">
        <h3 className="text-sm font-medium">{currentTrack?.title || 'No track selected'}</h3>
        <p className="text-xs text-gray-600">{albumTitle}</p>
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-3">
        <button
          onClick={() => skipTrack(-1)}
          className="p-2 hover:bg-gray-100 rounded transition"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.445 14.832A1 1 0 0010 14v-8a1 1 0 00-1.555-.832L5 8.048V6a1 1 0 00-2 0v8a1 1 0 002 0v-2.048l3.445 2.88z" />
            <path d="M14 5a1 1 0 011 1v8a1 1 0 01-2 0V6a1 1 0 011-1z" />
          </svg>
        </button>

        <button
          onClick={togglePlayPause}
          className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <button
          onClick={() => skipTrack(1)}
          className="p-2 hover:bg-gray-100 rounded transition"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.555 5.168A1 1 0 0010 6v8a1 1 0 001.555.832L15 11.952V14a1 1 0 002 0V6a1 1 0 00-2 0v2.048l-3.445-2.88z" />
            <path d="M6 5a1 1 0 00-1 1v8a1 1 0 002 0V6a1 1 0 00-1-1z" />
          </svg>
        </button>
      </div>

      {/* Volume Control with Progress */}
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
          }}
        />
      </div>

      {/* Track List - Optional, can be toggled */}
      {tracks && tracks.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <select
            value={currentTrackIndex}
            onChange={(e) => {
              setCurrentTrackIndex(parseInt(e.target.value))
              setIsPlaying(false)
            }}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-400"
          >
            {tracks.map((track, index) => (
              <option key={index} value={index}>
                {index + 1}. {track.title || track}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}