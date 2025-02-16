import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnhancedTooltipProps {
  content: string | React.ReactNode
  description?: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function EnhancedTooltip({
  content,
  description,
  children,
  side = 'top',
  align = 'center',
  className
}: EnhancedTooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    setCoords({ x, y })
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const getPosition = () => {
    if (!tooltipRef.current) return { x: 0, y: 0 }
    const rect = tooltipRef.current.getBoundingClientRect()
    const offset = 8 // Gap between tooltip and target

    switch (side) {
      case 'top':
        return {
          x: align === 'start' ? coords.x : 
             align === 'end' ? coords.x - rect.width :
             coords.x - rect.width / 2,
          y: coords.y - rect.height - offset
        }
      case 'right':
        return {
          x: coords.x + offset,
          y: align === 'start' ? coords.y : 
             align === 'end' ? coords.y - rect.height :
             coords.y - rect.height / 2
        }
      case 'bottom':
        return {
          x: align === 'start' ? coords.x : 
             align === 'end' ? coords.x - rect.width :
             coords.x - rect.width / 2,
          y: coords.y + offset
        }
      case 'left':
        return {
          x: coords.x - rect.width - offset,
          y: align === 'start' ? coords.y : 
             align === 'end' ? coords.y - rect.height :
             coords.y - rect.height / 2
        }
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            style={{
              position: 'fixed',
              ...getPosition(),
              zIndex: 50,
              pointerEvents: 'none'
            }}
            className={`p-2 rounded-lg bg-black/90 border border-primary/20 backdrop-blur-sm shadow-lg ${className}`}
          >
            <div className="text-sm font-medium text-primary">
              {content}
            </div>
            {description && (
              <div className="text-xs text-gray-400 mt-1">
                {description}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
