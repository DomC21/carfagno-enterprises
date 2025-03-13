import { useEffect, useRef } from 'react'

export function measureFrameRate(callback: (fps: number) => void) {
  let frameCount = 0
  let lastTime = performance.now()
  
  function countFrames(currentTime: number) {
    frameCount++
    const elapsedTime = currentTime - lastTime
    
    if (elapsedTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / elapsedTime)
      callback(fps)
      frameCount = 0
      lastTime = currentTime
    }
    
    requestAnimationFrame(countFrames)
  }
  
  requestAnimationFrame(countFrames)
}

export function usePerformanceMonitor() {
  const fpsRef = useRef<number>(0)
  const responseTimeRef = useRef<number[]>([])
  
  useEffect(() => {
    measureFrameRate((fps) => {
      fpsRef.current = fps
      console.log(`Current FPS: ${fps}`)
      if (fps < 55) {
        console.warn('Frame rate dropped below target 60fps')
      }
    })
    
    // Monitor response times
    const originalAddEventListener = EventTarget.prototype.addEventListener
    EventTarget.prototype.addEventListener = function(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (type.startsWith('click') || type.startsWith('keydown')) {
        const wrappedListener = function(this: EventTarget, event: Event) {
          const start = performance.now()
          if (typeof listener === 'function') {
            listener.call(this, event)
          } else if (typeof listener === 'object' && listener.handleEvent) {
            listener.handleEvent.call(listener, event)
          }
          const end = performance.now()
          const responseTime = end - start
          if (responseTimeRef.current) {
            responseTimeRef.current.push(responseTime)
            if (responseTime > 100) {
              console.warn(`Slow response time: ${responseTime.toFixed(2)}ms`)
            }
          }
        }
        return originalAddEventListener.call(this, type, wrappedListener, options)
      }
      return originalAddEventListener.call(this, type, listener, options)
    }
    
    return () => {
      EventTarget.prototype.addEventListener = originalAddEventListener
    }
  }, [])
  
  return {
    getCurrentFPS: () => fpsRef.current,
    getResponseTimes: () => responseTimeRef.current
  }
}
