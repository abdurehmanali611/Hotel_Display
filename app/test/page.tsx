'use client'

import { useState } from 'react'
import { useOfflineStorage } from '@/hooks/useOfflineStorage'

export default function TestPage() {
  const [count, setCount, clearCount] = useOfflineStorage('test-counter', 0)
  const [notes, setNotes, clearNotes] = useOfflineStorage('test-notes', '')
  const [isOnline, setIsOnline] = useState(true)

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => setIsOnline(true))
    window.addEventListener('offline', () => setIsOnline(false))
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Offline PWA Test</h1>
        
        <div className="mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Counter Example */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Offline Counter</h2>
            <p className="text-gray-600 mb-4">This counter persists even when offline.</p>
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setCount(count - 1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-3xl font-bold">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={clearCount}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Clear Counter
            </button>
          </div>

          {/* Notes Example */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Offline Display</h2>
            <p className="text-gray-600 mb-4">Displays are saved locally and sync across tabs.</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-3 border rounded mb-4"
              placeholder="Type your displays here..."
            />
            <button
              onClick={clearNotes}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Clear displays
            </button>
          </div>
        </div>

        {/* Service Worker Info */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Service Worker Status</h2>
          <div className="space-y-2">
            <p>
              Service Worker Supported:{' '}
              <span className="font-semibold">
                {typeof window !== 'undefined' && 'serviceWorker' in navigator ? 'Yes' : 'No'}
              </span>
            </p>
            <p>
              Cache API Supported:{' '}
              <span className="font-semibold">
                {typeof window !== 'undefined' && 'caches' in window ? 'Yes' : 'No'}
              </span>
            </p>
            <p>
              IndexedDB Supported:{' '}
              <span className="font-semibold">
                {typeof window !== 'undefined' && 'indexedDB' in window ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}