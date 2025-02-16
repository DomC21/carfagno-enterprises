import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/styles'

interface MarketStatusProps {
  className?: string
}

export function MarketStatus({ className = '' }: MarketStatusProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [currentTime, setCurrentTime] = React.useState(new Date())
  
  React.useEffect(() => {
    // Update market status every second
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      // Market hours: 9:30 AM - 4:00 PM EST, Monday-Friday
      const hour = now.getHours()
      const minute = now.getMinutes()
      const day = now.getDay()
      
      const isMarketHours = 
        day >= 1 && day <= 5 && // Monday-Friday
        ((hour === 9 && minute >= 30) || // After 9:30 AM
         (hour > 9 && hour < 16) || // 10 AM - 3 PM
         (hour === 16 && minute === 0)) // Until 4:00 PM

      setIsOpen(isMarketHours)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div
        animate={{
          scale: isOpen ? [1, 1.2, 1] : 1,
          opacity: isOpen ? [1, 0.8, 1] : 0.6
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          "w-2 h-2 rounded-full transform-gpu market-status-indicator",
          isOpen ? "bg-green-400" : "bg-red-400"
        )}
      />
      <div className="flex flex-col">
        <span className={cn(
          "text-sm font-medium",
          isOpen ? "text-green-400" : "text-red-400"
        )}>
          Market {isOpen ? "Open" : "Closed"}
        </span>
        <span className="text-xs text-gray-400">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/New_York"
          })} EST
        </span>
      </div>
    </div>
  )
}
