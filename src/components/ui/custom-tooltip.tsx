import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/styles'

interface CustomTooltipProps {
  className?: string
  title: string
  description: string
  insights?: {
    label: string
    value: string
  }[]
  children: React.ReactNode
}

export function CustomTooltip({ 
  className, 
  title, 
  description, 
  insights,
  children 
}: CustomTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "absolute z-50 p-4 rounded-lg",
            "bg-black/90 backdrop-blur-md",
            "border border-primary/20",
            "shadow-lg shadow-primary/10",
            "min-w-[200px] max-w-[300px]",
            "transform-gpu transition-all duration-200",
            className
          )}
        >
          <h4 className="text-sm font-medium text-primary mb-1">
            {title}
          </h4>
          <p className="text-xs text-gray-400 mb-2">
            {description}
          </p>
          {insights && insights.length > 0 && (
            <div className="space-y-1 border-t border-primary/10 pt-2">
              {insights.map((insight, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-xs text-primary">{insight.label}:</span>
                  <span className="text-xs text-gray-400">{insight.value}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
