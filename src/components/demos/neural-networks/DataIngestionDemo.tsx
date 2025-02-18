import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '../../ui/card'
import { motion } from 'framer-motion'
import { generateStockData, type StockData } from '../../../utils/fakeData'

export function DataIngestionDemo() {
  const [data, setData] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial data load
    setData(generateStockData(50))
    setLoading(false)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), ...generateStockData(1)]
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="p-4 bg-black border-border">
        <div className="h-8 w-1/3 bg-gray-800 rounded-lg animate-pulse mb-4" />
        <div className="h-[200px] bg-gray-800 rounded-lg animate-pulse" />
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="transform-gpu"
    >
      <Card className="p-4 bg-black border-border">
        <h3 className="text-lg font-semibold mb-4 text-primary">Real-Time Data Ingestion</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="dataGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                stroke="#64748b"
              />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(30, 41, 59, 0.5)',
                  borderRadius: '0.375rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#dataGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Processing Rate</span>
            <span className="text-lg font-medium text-primary">
              {(Math.random() * 500 + 500).toFixed(0)} msg/s
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Data Points</span>
            <span className="text-lg font-medium text-primary">
              {data.length.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Latency</span>
            <span className="text-lg font-medium text-primary">
              {(Math.random() * 50 + 10).toFixed(0)} ms
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
