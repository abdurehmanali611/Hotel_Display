'use client'

import { useEffect, useState } from 'react'

export default function ServiceWorkerRegistration() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js')
          
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setIsUpdateAvailable(true)
                }
              })
            }
          })

          if (registration.waiting) {
            setIsUpdateAvailable(true)
          }

          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload()
          })

          console.log('Service Worker registered:', registration)
        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }

      window.addEventListener('load', registerServiceWorker)
      
      return () => {
        window.removeEventListener('load', registerServiceWorker)
      }
    }
  }, [])

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
      })
    }
  }

  if (!isUpdateAvailable) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <p className="font-semibold mb-2">Update Available</p>
      <p className="text-sm mb-3">A new version of the app is available.</p>
      <button
        onClick={handleUpdate}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        Update Now
      </button>
    </div>
  )
}