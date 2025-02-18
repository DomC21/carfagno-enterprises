import React, { useState, useEffect } from 'react'
import { Card } from '../../ui/card'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { motion } from 'framer-motion'

interface PatternData {
  timestamp: number
  price: number
  volume: number
  pattern?: {
    type: string
    confidence: number
    support?: number
    resistance?: number
  }
}

export function PatternRecognitionDemo() {
  const [data, setData] = useState<PatternData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate initial data
    const generateData = () => {
      const basePrice = 100
      const points = 50
      const data: PatternData[] = []

      for (let i = 0; i < points; i++) {
        const timestamp = Date.now() - (points - i - 1) * 60000
        const noise = Math.random() * 4 - 2
        const trend = Math.sin(i / 10) * 5
        const price = basePrice + trend + noise
        const volume = Math.floor(Math.random() * 10000) + 5000

        // Add patterns occasionally
        const pattern = Math.random() > 0.8 ? {
          type: ['Double Top', 'Double Bottom', 'Head and Shoulders', 'Triangle'][Math.floor(Math.random() * 4)],
          confidence: Math.random() * 0.3 + 0.7,
          support: price - Math.random() * 5,
          resistance: price + Math.random() * 5
        } : undefined

        data.push({ timestamp, price, volume, pattern })
      }

      return data
    }

    setData(generateData())
    setLoading(false)

    const interval = setInterval(() => {
      setData(prev => {
        const newPoint = {
          timestamp: Date.now(),
          price: prev[prev.length - 1].price + (Math.random() * 2 - 1),
          volume: Math.floor(Math.random() * 10000) + 5000,
          pattern: Math.random() > 0.8 ? {
            type: ['Double Top', 'Double Bottom', 'Head and Shoulders', 'Triangle'][Math.floor(Math.random() * 4)],
            confidence: Math.random() * 0.3 + 0.7,
            support: prev[prev.length - 1].price - Math.random() * 5,
            resistance: prev[prev.length - 1].price + Math.random() * 5
          } : undefined
        }
        return [...prev.slice(1), newPoint]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="p-4 bg-black border-border">
        <div className="h-8 w-1/3 bg-gray-800 rounded-lg animate-pulse mb-4" />
        <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
      </Card>
    )
  }

  const latestPattern = [...data].reverse().find(point => point.pattern)

  return (
    <Card className="p-4 bg-black border-border">
      <h3 className="text-lg font-semibold mb-4 text-primary">Technical Pattern Recognition</h3>
      <p className="text-gray-300 mb-6">AI-powered pattern detection and analysis</p>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke="rgba(148, 163, 184, 0.5)"
            />
            <YAxis 
              yAxisId="price"
              orientation="right"
              stroke="rgba(148, 163, 184, 0.5)"
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <YAxis 
              yAxisId="volume"
              orientation="left"
              stroke="rgba(148, 163, 184, 0.5)"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(30, 41, 59, 0.5)',
                borderRadius: '0.375rem'
              }}
              labelStyle={{ color: 'rgba(148, 163, 184, 1)' }}
              formatter={(value: number, name: string) => [
                name === 'price' ? `$${value.toFixed(2)}` : `${(value / 1000).toFixed(0)}K`,
                name === 'price' ? 'Price' : 'Volume'
              ]}
            />
            <Bar
              dataKey="volume"
              yAxisId="volume"
              fill="rgba(59, 130, 246, 0.2)"
              maxBarSize={6}
            />
            <Line
              type="monotone"
              dataKey="price"
              yAxisId="price"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            {data.map((point, index) => {
              if (point.pattern) {
                return (
                  <React.Fragment key={index}>
                    <ReferenceLine
                      x={point.timestamp}
                      stroke="#ffd700"
                      strokeDasharray="3 3"
                      label={{
                        value: point.pattern.type,
                        position: 'top',
                        fill: '#ffd700',
                        fontSize: 10
                      }}
                    />
                    {point.pattern.support && (
                      <ReferenceLine
                        y={point.pattern.support}
                        stroke="#22c55e"
                        strokeDasharray="3 3"
                        label={{
                          value: 'Support',
                          position: 'right',
                          fill: '#22c55e',
                          fontSize: 10
                        }}
                      />
                    )}
                    {point.pattern.resistance && (
                      <ReferenceLine
                        y={point.pattern.resistance}
                        stroke="#ef4444"
                        strokeDasharray="3 3"
                        label={{
                          value: 'Resistance',
                          position: 'right',
                          fill: '#ef4444',
                          fontSize: 10
                        }}
                      />
                    )}
                  </React.Fragment>
                )
              }
              return null
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {latestPattern && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/20"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-primary">Latest Pattern Detected</h4>
            <span className="text-sm text-gray-400">
              {(latestPattern.pattern!.confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
          <p className="text-gray-300">
            {latestPattern.pattern!.type} pattern detected at ${latestPattern.price.toFixed(2)}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="text-sm text-gray-400 block">Support Level</span>
              <span className="text-lg font-medium text-green-400">
                ${latestPattern.pattern!.support!.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-400 block">Resistance Level</span>
              <span className="text-lg font-medium text-red-400">
                ${latestPattern.pattern!.resistance!.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  )
}
