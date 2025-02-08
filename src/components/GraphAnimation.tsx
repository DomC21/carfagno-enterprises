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
      for (let i = 0; i < 50; i++) {
        newPoints.push({
          x: (i / 50) * 100,
          y: 50 + Math.sin(i * 0.2) * 20 + Math.random() * 10
        })
      }
      return newPoints
    }

    setPoints(generatePoints())
    const interval = setInterval(() => {
      setPoints(generatePoints())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <svg
        className={`w-full h-full opacity-30 ${animationClasses.graphFloat}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-teal-400"
        />
      </svg>
    </div>
  )
}
