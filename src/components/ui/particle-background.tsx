import { useEffect, useRef } from 'react'

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 rounded-full bg-primary/30 animate-float'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 5}s`
      container.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 6000)
    }

    const interval = setInterval(() => {
      if (container.children.length < 50) {
        createParticle()
      }
    }, 200)

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      createParticle()
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden bg-black"
    />
  )
}
