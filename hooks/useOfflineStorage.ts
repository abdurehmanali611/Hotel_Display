import { useState, useEffect, useCallback } from 'react'

interface OfflineData<T> {
  data: T
  timestamp: number
  version: number
}

export function useOfflineStorage<T>(key: string, initialValue: T, version: number = 1) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const parsed: OfflineData<T> = JSON.parse(item)
        if (parsed.version === version) {
          return parsed.data
        }
      }
      return initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        const offlineData: OfflineData<T> = {
          data: valueToStore,
          timestamp: Date.now(),
          version
        }
        window.localStorage.setItem(key, JSON.stringify(offlineData))
        
        // Dispatch custom event for other tabs/windows
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: JSON.stringify(offlineData)
        }))
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [key, storedValue, version])

  const clearValue = useCallback(() => {
    setStoredValue(initialValue)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  }, [key, initialValue])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsed: OfflineData<T> = JSON.parse(e.newValue)
          if (parsed.version === version) {
            setStoredValue(parsed.data)
          }
        } catch (error) {
          console.error('Error parsing storage change:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, version])

  return [storedValue, setValue, clearValue] as const
}