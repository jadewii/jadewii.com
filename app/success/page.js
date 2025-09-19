'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '../../lib/store'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [purchasedItems, setPurchasedItems] = useState([])
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/get-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPurchasedItems(data.items)
            setCustomerEmail(data.customerEmail)
            // Clear the cart after successful purchase
            const { clearCart } = useCartStore.getState()
            clearCart()
          }
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching session:', err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const handleDownload = (item) => {
    // Create a download link
    const link = document.createElement('a')
    link.href = item.downloadFile
    link.download = `${item.id}.zip`
    link.click()
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
          <p className="text-gray-600 text-lg">Your purchase was successful</p>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Loading your purchases...</p>
          </div>
        ) : purchasedItems.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Your Downloads</h2>
              <div className="grid gap-4">
                {purchasedItems.map((item) => (
                  <div key={item.id} className="bg-gray-100 border border-gray-200 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.artist}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(item)}
                      className="bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 border border-gray-200 p-6 mb-8">
              <p className="text-lg mb-2">📧 Email sent to: {customerEmail}</p>
              <p className="text-sm text-gray-600">
                We've also sent download links to your email address.
                The links will be valid for 30 days.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-gray-100 border border-gray-200 p-6 mb-8 text-center">
            <p className="text-lg mb-2">📧 Check your email</p>
            <p className="text-sm text-gray-600">
              We've sent your download links to your email address.
              The links will be valid for 30 days.
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/collections/albums"
            className="inline-block bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}