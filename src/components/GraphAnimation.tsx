import { useEffect, useState, useRef, memo } from 'react'
import { animationClasses } from '../utils/styles'
import { useAnimationControl } from '../hooks/use-animation-control'
import { AnimationProps } from '../types/animation'
import { cn } from '../lib/utils'

interface Point {
  x: number
  y: number
}

const GraphAnimationComponent = ({ className }: AnimationProps) => {
  const { isVisible, shouldReduceMotion, isInitialized } = useAnimationControl()
  const [points, setPoints] = useState<Point[]>([])
  const mountedRef = useRef(true)

  useEffect(() => {
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

    if (!isVisible || shouldReduceMotion || !isInitialized) return

    if (mountedRef.current) {
      setPoints(generatePoints())
    }

    const interval = setInterval(() => {
      if (mountedRef.current) {
        setPoints(generatePoints())
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      mountedRef.current = false
    }
  }, [isVisible, shouldReduceMotion, isInitialized])

  if (!isVisible || shouldReduceMotion) return null

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)} aria-hidden="true">
      <svg
        className={cn("w-full h-full opacity-30", animationClasses.graphFloat)}
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

export const GraphAnimation = memo(GraphAnimationComponent);
