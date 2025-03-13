import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card } from './card'

interface DataPoint {
  timestamp: number
  value: number
  confidence?: number
  trend?: 'up' | 'down' | 'neutral'
}

interface DataVisualizationProps {
  title: string
  data: DataPoint[]
  yAxisLabel?: string
  showConfidence?: boolean
  showTrends?: boolean
  className?: string
  glowColor?: string
}

export function DataVisualization({
  title,
  data,
  yAxisLabel,
  showConfidence = false,
  showTrends = false,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)'
}: DataVisualizationProps) {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  interface TooltipProps {
    active?: boolean
    payload?: Array<{
      payload: DataPoint
    }>
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (!active || !payload?.[0]) return null

    const point = payload[0].payload as DataPoint
    setHoveredPoint(point)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-black border border-primary/20 rounded-lg p-3 shadow-xl"
        style={{
          boxShadow: `0 0 20px ${glowColor}`,
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="space-y-1">
          <div className="text-sm font-medium text-primary">
            {new Date(point.timestamp).toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-400">
            {yAxisLabel || 'Value'}: <span className="text-primary">{point.value.toFixed(2)}</span>
          </div>
          {showConfidence && point.confidence && (
            <div className="text-xs text-gray-400">
              Confidence: <span className="text-primary">{(point.confidence * 100).toFixed(1)}%</span>
            </div>
          )}
          {showTrends && point.trend && (
            <div className="text-xs text-gray-400 flex items-center gap-1">
              Trend:{' '}
              <span className={`
                ${point.trend === 'up' ? 'text-green-400' : 
                  point.trend === 'down' ? 'text-red-400' : 
                  'text-gray-400'}
              `}>
                {point.trend.charAt(0).toUpperCase() + point.trend.slice(1)}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <Card className={`bg-black border-border relative overflow-hidden ${className}`}>
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: hoveredPoint
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 60%)`
            : 'none'
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} onMouseLeave={() => setHoveredPoint(null)}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={glowColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={glowColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                stroke="#64748b"
              />
              <YAxis stroke="#64748b" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={glowColor}
                fill="url(#colorGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: glowColor,
                  stroke: '#000',
                  strokeWidth: 2
                }}
              />
              {showConfidence && (
                <Area
                  type="monotone"
                  dataKey="confidence"
                  stroke="rgba(16, 185, 129, 0.5)"
                  fill="none"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
