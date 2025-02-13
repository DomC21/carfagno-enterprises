import { useState, useEffect } from 'react'

export function useRealtimeData<T>(
  generator: () => T,
  interval: number = 5000
): T {
  const [data, setData] = useState<T>(generator())

  useEffect(() => {
    // Initial data load
    setData(generator())

    // Update data at specified interval
    const intervalId = setInterval(() => {
      setData(generator())
    }, interval)

    // Cleanup on unmount
    return () => clearInterval(intervalId)
  }, [generator, interval])

  return data
}
