import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { Card } from './card'

interface Parameter {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
}

interface ParameterPanelProps {
  title: string
  parameters: Parameter[]
  onUpdate: (id: string, value: number) => void
  className?: string
}

export function ParameterPanel({ title, parameters, onUpdate, className = '' }: ParameterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredParam, setHoveredParam] = useState<string | null>(null)

  return (
    <Card className={`bg-black border-border ${className}`}>
      <motion.div
        className="p-4"
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : '64px',
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30
          }
        }}
      >
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            className="w-6 h-6 flex items-center justify-center text-primary"
          >
            ▼
          </motion.div>
        </div>

        <motion.div
          animate={{
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : -20
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            delay: isExpanded ? 0.2 : 0
          }}
          className="mt-4 space-y-4"
        >
          {parameters.map((param) => (
            <motion.div
              key={param.id}
              className="relative"
              onMouseEnter={() => setHoveredParam(param.id)}
              onMouseLeave={() => setHoveredParam(null)}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">{param.label}</label>
                <span className="text-sm text-primary">
                  {param.value.toFixed(2)}{param.unit}
                </span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={param.value}
                  onChange={(e) => onUpdate(param.id, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(param.value - param.min) / (param.max - param.min) * 100}%, #1e293b ${(param.value - param.min) / (param.max - param.min) * 100}%, #1e293b 100%)`
                  }}
                />

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    opacity: hoveredParam === param.id ? 0.2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'var(--primary)',
                    filter: 'blur(8px)'
                  }}
                />
              </div>

              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{param.min}</span>
                <span className="text-xs text-gray-500">{param.max}</span>
              </div>
            </motion.div>
          ))}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                parameters.forEach(param => {
                  onUpdate(param.id, (param.max + param.min) / 2)
                })
              }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              Apply
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  )
}
