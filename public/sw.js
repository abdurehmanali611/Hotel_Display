// Custom service worker for additional offline functionality

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-posts') {
    event.waitUntil(syncOfflinePosts())
  }
})

async function syncOfflinePosts() {
  try {
    const offlinePosts = await getOfflinePosts()
    // Sync logic here
    console.log('Syncing offline posts:', offlinePosts)
  } catch (error) {
    console.error('Sync failed:', error)
  }
}

async function getOfflinePosts() {
  return []
}