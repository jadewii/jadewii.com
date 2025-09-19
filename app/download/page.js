'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function DownloadContent() {
  const searchParams = useSearchParams()
  const album = searchParams.get('album')
  const sessionId = searchParams.get('session_id')
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [albumTitle, setAlbumTitle] = useState('')

  // Album titles mapping
  const albumTitles = {
    'charlies-doomed-christmas': "Charlie's DOOMED Christmas",
    'common-side-effects': 'Common Side Effects',
    'honey': 'Honey',
    'battle-of-wolves': 'Battle of Wolves',
    'artificially-unfavored': 'Artificially Unfavored',
    'dan-da-damned': 'Dan Da Damned',
    'drone-sightings': 'Drone Sightings',
    'enlightened-ape': 'Enlightened Ape',
    'how-the-grinch-chilled-christmas': 'How The Grinch Chilled Christmas',
    'a-bit-of-red-in-the-blue': 'A Bit of Red in the Blue',
    'white-lotus': 'White Lotus',
    'kame-house-session-one': 'Kame House Session One',
  }

  useEffect(() => {
    // Check if we have a valid album and session
    if (!album || !sessionId) {
      setLoading(false)
      return
    }

    // Get secure download URL from API
    const fetchDownloadUrl = async () => {
      try {
        const response = await fetch('/api/generate-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            albumId: album,
            sessionId: sessionId
          })
        })

        if (response.ok) {
          const data = await response.json()
          setDownloadUrl(data.downloadUrl)
          setAlbumTitle(albumTitles[album] || 'Unknown Album')
        }
      } catch (error) {
        console.error('Error fetching download:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDownloadUrl()
  }, [album, sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Preparing your download...</p>
        </div>
      </div>
    )
  }

  if (!album || !sessionId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Download Link</h1>
          <p>Please complete your purchase to access downloads.</p>
        </div>
      </div>
    )
  }

  if (!albumTitle || !downloadUrl) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Album Not Found</h1>
          <p>Please contact support if you believe this is an error.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-8">Your purchase was successful</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{albumTitle}</h2>
            <a
              href={downloadUrl}
              className="inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
              download
            >
              Download Album
            </a>
          </div>

          <p className="text-sm text-gray-500">
            Download link expires in 24 hours. Please save your files.
          </p>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600">
              Having issues? Email support@jadewii.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <DownloadContent />
    </Suspense>
  )
}