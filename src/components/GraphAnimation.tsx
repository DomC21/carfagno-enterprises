import { useEffect, useState } from 'react'
import { animationClasses } from '../utils/styles'
import { useReducedMotion } from '../hooks/use-reduced-motion'

interface Point {
  x: number
  y: number
}

export function GraphAnimation() {
  const shouldReduceMotion = useReducedMotion()
  const [points, setPoints] = useState<Point[]>([])

  useEffect(() => {
    if (shouldReduceMotion) return
    const generatePoints = () => {
      const newPoints: Point[] = []
      const phase = Date.now() * 0.001
      for (let i = 0; i < 50; i++) {
        const x = (i / 50) * 100
        const trend = Math.sin(phase * 0.5) * 10
        const volatility = Math.sin(i * 0.3 + phase) * 5
        const noise = Math.random() * 3
        newPoints.push({
          x,
          y: 50 + trend + volatility + noise
        })
      }
      return newPoints
    }

    setPoints(generatePoints())
    const interval = setInterval(() => {
      setPoints(generatePoints())
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-1000 ${points.length ? 'opacity-100' : 'opacity-0'}`} />
      <svg
        className={`w-full h-full opacity-30 ${animationClasses.graphFloat} transition-opacity duration-1000 ${points.length ? 'opacity-30' : 'opacity-0'}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-white/60"
        />
      </svg>
    </div>
  )
}
