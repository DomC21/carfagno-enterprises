import React from 'react'
import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function ScrollReveal({ children, delay = 0, direction = 'up' }: ScrollRevealProps) {
  const getInitialAndAnimate = () => {
    switch (direction) {
      case 'up':
        return { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }
      case 'down':
        return { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 } }
      case 'left':
        return { initial: { x: 20, opacity: 0 }, animate: { x: 0, opacity: 1 } }
      case 'right':
        return { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 } }
      default:
        return { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }
    }
  }

  const { initial, animate } = getInitialAndAnimate()

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
