import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '../../ui/card'
import { motion } from 'framer-motion'

interface MetricPoint {
  timestamp: number
  accuracy: number
  loss: number
  predictions: number
}

export function PerformanceMetricsDemo() {
  const [metrics, setMetrics] = useState<MetricPoint[]>([])

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 24 }, (_, i) => ({
      timestamp: Date.now() - (24 - i) * 3600000,
      accuracy: Math.random() * 0.15 + 0.8, // 80-95% accuracy
      loss: Math.random() * 0.3, // 0-0.3 loss
      predictions: Math.floor(Math.random() * 1000 + 500)
    }))
    setMetrics(initialData)

    // Update every 30 seconds
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newPoint = {
          timestamp: Date.now(),
          accuracy: Math.random() * 0.15 + 0.8,
          loss: Math.random() * 0.3,
          predictions: Math.floor(Math.random() * 1000 + 500)
        }
        return [...prev.slice(1), newPoint]
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="transform-gpu"
    >
      <Card className="p-4 bg-black border-border">
        <h3 className="text-lg font-semibold mb-4 text-primary">Model Performance Metrics</h3>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                stroke="#64748b"
              />
              <YAxis 
                stroke="#64748b"
                domain={[0, 1]}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(30, 41, 59, 0.5)',
                  borderRadius: '0.375rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="loss" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Current Accuracy</span>
            <span className="text-lg font-medium text-primary">
              {(metrics[metrics.length - 1]?.accuracy * 100).toFixed(1)}%
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Loss Value</span>
            <span className="text-lg font-medium text-primary">
              {metrics[metrics.length - 1]?.loss.toFixed(3)}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Predictions</span>
            <span className="text-lg font-medium text-primary">
              {metrics[metrics.length - 1]?.predictions.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
