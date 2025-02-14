import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generateStockData, type StockData } from '../../utils/fakeData'
import { Card } from '../../components/ui/card'
import { motion } from 'framer-motion'

export function NeuralNetworksDemo() {
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Price Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Card className="p-4 bg-black border-border">
          <h3 className="text-lg font-semibold mb-4 text-primary">Price Analysis</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  stroke="#64748b"
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '0.375rem'
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Pattern Recognition and Trading Signals */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2
          }}
        >
          <Card className="p-4 bg-black border-border">
            <h3 className="text-lg font-semibold mb-4 text-primary">Pattern Recognition</h3>
            <div className="space-y-4">
              {data
                .filter(d => d.pattern)
                .slice(-3)
                .map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1 + 0.3
                    }}
                    className={`p-3 rounded-lg ${
                      d.pattern?.type === 'bullish' 
                        ? 'bg-green-950/20 border border-green-500/20' 
                        : 'bg-red-950/20 border border-red-500/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        {new Date(d.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`text-sm font-medium ${
                        d.pattern?.type === 'bullish' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {d.pattern?.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-300">
                        Confidence: {(d.pattern?.confidence ?? 0) * 100}%
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>
        </motion.div>

        {/* Trading Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.4
          }}
        >
          <Card className="p-4 bg-black border-border">
            <h3 className="text-lg font-semibold mb-4 text-primary">Trading Signals</h3>
            <div className="space-y-4">
              {data
                .filter(d => d.pattern)
                .slice(-3)
                .map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1 + 0.5
                    }}
                    className="flex items-center justify-between p-3 rounded-lg bg-blue-950/20 border border-blue-500/20"
                  >
                    <div className="space-y-1">
                      <span className="text-sm text-gray-400">
                        {new Date(d.timestamp).toLocaleTimeString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">Price:</span>
                        <span className="text-sm font-medium text-primary">
                          ${d.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-300">Volume:</span>
                      <div className="text-sm font-medium text-primary">
                        {d.volume.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
