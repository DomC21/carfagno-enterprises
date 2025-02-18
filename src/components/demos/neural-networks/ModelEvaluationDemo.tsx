import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generateTrainingData, simulateDataStream, type TrainingDataPoint } from '@/lib/demo-data'

export function ModelEvaluationDemo() {
  const [data, setData] = useState<TrainingDataPoint[]>([])
  const [metrics, setMetrics] = useState({
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0
  })

  useEffect(() => {
    // Start data stream simulation
    const cleanup = simulateDataStream(
      () => {
        const newData = generateTrainingData(1)[0]
        // Simulate other metrics based on accuracy
        const baseAccuracy = newData.accuracy
        setMetrics({
          accuracy: baseAccuracy,
          precision: baseAccuracy * (0.9 + Math.random() * 0.2),
          recall: baseAccuracy * (0.85 + Math.random() * 0.3),
          f1Score: baseAccuracy * (0.87 + Math.random() * 0.25)
        })
        return [newData]
      },
      2000,
      (newData) => setData(prev => [...prev.slice(-19), ...newData])
    )
    return cleanup
  }, [])

  const metricCards = [
    { label: 'Accuracy', value: metrics.accuracy },
    { label: 'Precision', value: metrics.precision },
    { label: 'Recall', value: metrics.recall },
    { label: 'F1 Score', value: metrics.f1Score }
  ]

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Model Evaluation Metrics</h3>
      <p className="text-gray-300 mb-6">Real-time performance monitoring dashboard</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4"
          >
            <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
            <div className="text-2xl font-semibold text-teal-400">
              {(metric.value * 100).toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke="rgba(148, 163, 184, 0.5)"
            />
            <YAxis stroke="rgba(148, 163, 184, 0.5)" domain={[0.7, 1]} />
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
    </Card>
  )
}
