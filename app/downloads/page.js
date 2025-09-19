'use client'

import { products } from '../../lib/data/products'

export default function DownloadsPage() {
  // For testing - show the last 3 purchased items
  const testItems = products.slice(0, 3)

  const handleDownload = (item) => {
    const link = document.createElement('a')
    link.href = item.downloadFile
    link.download = `${item.id}.zip`
    link.click()
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Your Downloads</h1>
          <p className="text-gray-400 text-lg">Test page - showing your recent purchase</p>
        </div>

        <div className="grid gap-4">
          {testItems.map((item) => (
            <div key={item.id} className="bg-gray-900 rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-400">{item.artist}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(item)}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
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
    </div>
  )
}