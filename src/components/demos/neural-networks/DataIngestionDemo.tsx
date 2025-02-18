import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generateTrainingData, simulateDataStream, type TrainingDataPoint } from '@/lib/demo-data'

export function DataIngestionDemo() {
  const [data, setData] = useState<TrainingDataPoint[]>([])

  useEffect(() => {
    // Start data stream simulation
    const cleanup = simulateDataStream(
      () => generateTrainingData(20),
      1000,
      setData
    )
    return cleanup
  }, [])

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Automated Data Ingestion</h3>
      <p className="text-gray-300 mb-6">Real-time data processing pipeline visualization</p>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke="rgba(148, 163, 184, 0.5)"
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
              dataKey="accuracy"
              stroke="rgba(45, 212, 191, 1)"
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data points visualization */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {data.slice(-4).map((point, index) => (
          <motion.div
            key={point.timestamp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4"
          >
            <div className="text-sm text-gray-400 mb-2">
              {new Date(point.timestamp).toLocaleTimeString()}
            </div>
            <div className="text-lg font-semibold text-teal-400">
              {(point.accuracy * 100).toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
