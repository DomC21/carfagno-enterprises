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
    interval = 100, // Default to 100ms updates for real-time data
    onError,
    onUpdate,
    initialDelay = 0,
    retryAttempts = 3,
    retryDelay = 50 // Faster retry for real-time data
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
      
      // Use requestAnimationFrame for smoother state updates
      requestAnimationFrame(() => {
        setData(result)
        setError(null)
        setLastUpdated(new Date())
        setUpdateCount(prev => prev + 1)
        onUpdate?.(result)
        setIsLoading(false)
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred')
      if (attempt < retryAttempts) {
        // Use requestAnimationFrame for retry scheduling
        requestAnimationFrame(() => {
          setTimeout(() => fetchData(attempt + 1), retryDelay)
        })
      } else {
        requestAnimationFrame(() => {
          setError(error)
          onError?.(error)
          setIsLoading(false)
        })
      }
    }
  }, [generator, onError, onUpdate, retryAttempts, retryDelay])

  // Memoize state updates for better performance
  const updateState = useCallback((result: T) => {
    requestAnimationFrame(() => {
      setData(result)
      setError(null)
      setLastUpdated(new Date())
      setUpdateCount(prev => prev + 1)
      onUpdate?.(result)
      setIsLoading(false)
    })
  }, [onUpdate])

  useEffect(() => {
    let mounted = true
    let frameId: number
    let timeoutId: NodeJS.Timeout | undefined
    let intervalId: NodeJS.Timeout | undefined

    const update = async () => {
      if (!mounted) return
      
      try {
        setIsLoading(true)
        const result = await (generator instanceof Promise ? generator : generator())
        if (mounted) {
          updateState(result)
        }
      } catch (err) {
        if (!mounted) return
        const error = err instanceof Error ? err : new Error('Unknown error occurred')
        setError(error)
        onError?.(error)
        setIsLoading(false)
      }
    }

    // Initial load with delay
    timeoutId = setTimeout(() => {
      update()
    }, initialDelay)

    // High-performance interval updates
    intervalId = setInterval(() => {
      frameId = requestAnimationFrame(() => {
        update()
      })
    }, interval)

    // Cleanup
    return () => {
      mounted = false
      clearTimeout(timeoutId)
      clearInterval(intervalId)
      cancelAnimationFrame(frameId)
    }
  }, [generator, interval, initialDelay, updateState, onError])

  return {
    data,
    error,
    isLoading,
    lastUpdated,
    updateCount
  }
}
