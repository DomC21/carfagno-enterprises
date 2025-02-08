import { useEffect, useState } from 'react'
import { animationClasses } from '../utils/styles'

interface DataFlowProps {
  maxElements?: number
}

export function DataFlowAnimation({ maxElements = 20 }: DataFlowProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldAnimate(!mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => setShouldAnimate(!e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  if (!shouldAnimate) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      {Array.from({ length: maxElements }).map((_, i) => (
        <div
          key={i}
          className={`absolute ${animationClasses.dataFlow}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`
          }}
        >
          <span className="font-mono text-xs text-white/40 backdrop-blur-sm">
            {Math.random().toString(16).substring(2, 8)}
          </span>
        </div>
      ))}
    </div>
  )
}
