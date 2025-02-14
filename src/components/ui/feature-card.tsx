import { motion } from 'framer-motion'
import * as React from 'react'

interface FeatureCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function FeatureCard({ children, className, glowColor = "rgba(59, 130, 246, 0.5)" }: FeatureCardProps) {
  return (
    <motion.div
      className={`relative bg-black border border-primary/20 rounded-lg p-6 ${className}`}
      initial={{ scale: 1, rotateY: 0, z: 0 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 15,
        z: 150,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 1.2
        }
      }}
      whileTap={{
        scale: 0.98,
        rotateY: 5,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 20
        }
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity blur-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.4 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          transform: "translateZ(40px)"
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
