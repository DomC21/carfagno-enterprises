import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  lastUpdated?: number
  className?: string
}

export function DataStreamIndicator({ lastUpdated, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className="w-2 h-2 rounded-full bg-green-500"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-xs text-gray-400">
        {lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 'Real-time data'}
      </span>
    </div>
  )
}
