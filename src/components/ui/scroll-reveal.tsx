import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ScrollRevealProps {
  children: React.ReactNode
  /** Delay in seconds before animation starts */
  delay?: number
  /** Direction for reveal animation: 'up' | 'down' | 'left' | 'right' */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Custom classes to apply to the wrapper */
  className?: string
}

const directionVariants = {
  up: { y: 30, opacity: 0 },
  down: { y: -30, opacity: 0 },
  left: { x: 30, opacity: 0 },
  right: { x: -30, opacity: 0 }
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}: ScrollRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  })

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ 
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
