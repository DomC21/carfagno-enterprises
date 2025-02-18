import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generateOptionsData, simulateDataStream, type OptionsData } from '@/lib/demo-data'

interface GreekMetric {
  name: string
  value: number
  description: string
  color: string
}

export function GreeksDashboardDemo() {
  const [data, setData] = useState<OptionsData[]>([])
  const [selectedStrike, setSelectedStrike] = useState<number | null>(null)

  useEffect(() => {
    const cleanup = simulateDataStream(
      () => generateOptionsData(),
      1000,
      setData
    )
    return cleanup
  }, [])

  useEffect(() => {
    if (data.length > 0 && !selectedStrike) {
      setSelectedStrike(data[Math.floor(data.length / 2)].strike)
    }
  }, [data, selectedStrike])

  const selectedOption = data.find(option => option.strike === selectedStrike)

  const greekMetrics: GreekMetric[] = selectedOption ? [
    {
      name: 'Delta',
      value: selectedOption.delta,
      description: 'Rate of change in option price relative to underlying',
      color: 'rgba(45, 212, 191, 1)'
    },
    {
      name: 'Gamma',
      value: selectedOption.gamma,
      description: 'Rate of change in delta',
      color: 'rgba(99, 102, 241, 1)'
    },
    {
      name: 'Theta',
      value: selectedOption.theta,
      description: 'Time decay of option value',
      color: 'rgba(244, 63, 94, 1)'
    },
    {
      name: 'Vega',
      value: selectedOption.vega,
      description: 'Sensitivity to volatility changes',
      color: 'rgba(234, 179, 8, 1)'
    }
  ] : []

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Real-Time Greeks Dashboard</h3>
      <p className="text-gray-300 mb-6">Monitor option Greeks in real-time</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {greekMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4"
          >
            <div className="text-sm text-gray-400 mb-1">{metric.name}</div>
            <div className="text-2xl font-semibold" style={{ color: metric.color }}>
              {metric.value.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500 mt-2">{metric.description}</div>
          </motion.div>
        ))}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
            <XAxis 
              dataKey="strike"
              stroke="rgba(148, 163, 184, 0.5)"
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis stroke="rgba(148, 163, 184, 0.5)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: 'rgba(148, 163, 184, 1)' }}
            />
            <Line 
              type="monotone"
              dataKey="delta"
              stroke="rgba(45, 212, 191, 1)"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone"
              dataKey="gamma"
              stroke="rgba(99, 102, 241, 1)"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone"
              dataKey="theta"
              stroke="rgba(244, 63, 94, 1)"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone"
              dataKey="vega"
              stroke="rgba(234, 179, 8, 1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
