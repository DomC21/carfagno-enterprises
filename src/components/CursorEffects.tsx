import { useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { animationClasses } from '../utils/styles'

interface CursorEffectsProps {
  mousePos: { x: number; y: number }
}

const layers = [
  { speed: 0.02, className: 'w-16 h-16 bg-teal-500/5 rounded-full blur-lg', maxDistance: 30 },
  { speed: 0.03, className: 'w-12 h-12 bg-blue-500/5 rounded-full blur-md', maxDistance: 40 },
  { speed: 0.04, className: 'w-8 h-8 bg-teal-400/5 rounded-full blur-sm', maxDistance: 50 },
  { speed: 0.015, className: 'w-24 h-24 bg-blue-400/5 rounded-full blur-xl', maxDistance: 25 },
  { speed: 0.025, className: 'w-20 h-20 bg-teal-300/5 rounded-full blur-lg', maxDistance: 35 }
]

const clampDistance = (value: number, max: number) => {
  return Math.min(Math.max(value, -max), max)
}

export function CursorEffects({ mousePos }: CursorEffectsProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((ref, i) => {
      if (!ref) return
      const { speed, maxDistance } = layers[i]
      const x = clampDistance(mousePos.x * speed, maxDistance)
      const y = clampDistance(mousePos.y * speed, maxDistance)
      ref.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${1 + Math.abs(x * y) / (maxDistance * maxDistance * 4)})`
    })
  }, [mousePos])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="relative w-full h-full">
        {layers.map((layer, i) => (
          <div
            key={i}
            ref={el => refs.current[i] = el}
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              layer.className,
              i % 2 === 0 ? animationClasses.shimmer : animationClasses.drift
            )}
            style={{
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform'
            }}
          />
        ))}
      </div>
    </div>
  )
}
