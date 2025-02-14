import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  depth?: number
}

export function InteractiveCard({ children, className = '', glowColor = 'rgba(59, 130, 246, 0.5)', depth = 20 }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  const calculateTransform = () => {
    if (!isHovered) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'

    const rotateX = (mousePosition.y - 0.5) * -depth
    const rotateY = (mousePosition.x - 0.5) * depth

    return `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-black border border-primary/20 rounded-lg p-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0.5, y: 0.5 })
      }}
      style={{
        transform: calculateTransform(),
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor}, transparent 40%)`,
          transition: 'opacity 0.3s ease-out'
        }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
      />

      {/* Content with 3D effect */}
      <div
        style={{
          transform: isHovered ? `translateZ(${depth}px)` : 'none',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
