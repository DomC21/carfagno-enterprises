import { useEffect, useRef } from 'react'

interface Particle {
  id: string
  x: number
  y: number
  size: number
  type: 'dot' | 'line' | 'candlestick' | 'arrow'
  direction: number
  opacity: number
  color: string
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const type = Math.random() > 0.7 
        ? 'candlestick' as const
        : Math.random() > 0.5 
          ? 'line' as const
          : Math.random() > 0.3 
            ? 'arrow' as const
            : 'dot' as const

      return {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.5 + 0.5,
        type,
        direction: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      }
    }

    const renderParticle = (particle: Particle) => {
      const element = document.createElement('div')
      element.id = particle.id
      element.className = 'absolute transform-gpu'
      element.style.left = `${particle.x}%`
      element.style.top = `${particle.y}%`
      element.style.opacity = particle.opacity.toString()

      switch (particle.type) {
        case 'dot':
          element.className += ' w-1 h-1 rounded-full bg-gradient-to-r from-primary to-accent animate-float'
          break
        case 'line':
          element.className += ' w-3 h-px bg-gradient-to-r from-primary to-accent animate-float'
          element.style.transform = `rotate(${particle.direction}deg) scale(${particle.size})`
          break
        case 'candlestick':
          element.innerHTML = `
            <div class="w-0.5 h-3 bg-gradient-to-b from-green-500 to-red-500 animate-float">
              <div class="w-2 h-px bg-primary absolute top-0 -left-0.75"></div>
              <div class="w-2 h-px bg-primary absolute bottom-0 -left-0.75"></div>
            </div>
          `
          break
        case 'arrow':
          element.innerHTML = `
            <div class="w-2 h-2 animate-float" style="transform: rotate(${particle.direction}deg)">
              <div class="w-1.5 h-px bg-primary absolute top-1/2 left-0"></div>
              <div class="w-1 h-px bg-primary absolute top-1/4 right-0 rotate-45"></div>
              <div class="w-1 h-px bg-primary absolute bottom-1/4 right-0 -rotate-45"></div>
            </div>
          `
          break
      }

      container.appendChild(element)
      setTimeout(() => {
        element.remove()
      }, 6000)
    }

    const interval = setInterval(() => {
      if (container.children.length < 50) {
        const particle = createParticle()
        renderParticle(particle)
      }
    }, 200)

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      const particle = createParticle()
      renderParticle(particle)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden bg-black z-0"
    >
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
    </div>
  )
}
