import { useState, useEffect, useCallback } from 'react'

interface UseRealtimeDataOptions {
  interval?: number
  onError?: (error: Error) => void
  onUpdate?: (data: any) => void
  initialDelay?: number
  retryAttempts?: number
  retryDelay?: number
}

interface UseRealtimeDataResult<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  lastUpdated: Date | null
  updateCount: number
}

export function useRealtimeData<T>(
  generator: () => T | Promise<T>,
  {
    interval = 5000,
    onError,
    onUpdate,
    initialDelay = 0,
    retryAttempts = 3,
    retryDelay = 1000
  }: UseRealtimeDataOptions = {}
): UseRealtimeDataResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [updateCount, setUpdateCount] = useState(0)

  const fetchData = useCallback(async (attempt = 0) => {
    try {
      setIsLoading(true)
      const result = await (generator instanceof Promise ? generator : generator())
      setData(result)
      setError(null)
      setLastUpdated(new Date())
      setUpdateCount(prev => prev + 1)
      onUpdate?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred')
      if (attempt < retryAttempts) {
        setTimeout(() => fetchData(attempt + 1), retryDelay)
      } else {
        setError(error)
        onError?.(error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [generator, onError, onUpdate, retryAttempts, retryDelay])

  useEffect(() => {
    // Initial data load with optional delay
    const initialLoadTimeout = setTimeout(() => {
      fetchData()
    }, initialDelay)

    // Update data at specified interval
    const intervalId = setInterval(() => {
      fetchData()
    }, interval)

    // Cleanup on unmount
    return () => {
      clearTimeout(initialLoadTimeout)
      clearInterval(intervalId)
    }
  }, [fetchData, interval, initialDelay])

  return {
    data,
    error,
    isLoading,
    lastUpdated,
    updateCount
  }
}
