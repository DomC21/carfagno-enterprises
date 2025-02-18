import { useState, useEffect } from 'react'
import { Card } from '../../ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

interface SentimentData {
  name: string
  value: number
  color: string
}

export function MarketSentimentDemo() {
  const [data, setData] = useState<SentimentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize with sample data
    const updateData = () => {
      const total = 100
      const bullish = Math.floor(Math.random() * 40 + 30) // 30-70%
      const bearish = Math.floor(Math.random() * 30) // 0-30%
      const neutral = total - bullish - bearish

      return [
        { name: 'Bullish', value: bullish, color: '#22c55e' },
        { name: 'Bearish', value: bearish, color: '#ef4444' },
        { name: 'Neutral', value: neutral, color: '#64748b' }
      ]
    }

    setData(updateData())
    setLoading(false)

    const interval = setInterval(() => {
      setData(updateData())
    }, 5000)

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

  const latestSentiment = data.reduce((max, item) => 
    item.value > max.value ? item : max
  , data[0])

  return (
    <Card className="p-4 bg-black border-border">
      <h3 className="text-lg font-semibold mb-4 text-primary">Market Sentiment Analysis</h3>
      <p className="text-gray-300 mb-6">AI-powered market sentiment tracking</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(30, 41, 59, 0.5)',
                  borderRadius: '0.375rem'
                }}
                formatter={(value: number) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
            <h4 className="text-lg font-semibold text-primary mb-2">Current Sentiment</h4>
            <div className="flex items-center gap-4">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: latestSentiment.color }}
              />
              <span className="text-2xl font-bold text-gray-200">
                {latestSentiment.name}
              </span>
            </div>
            <p className="text-gray-400 mt-2">
              {latestSentiment.value}% of market participants are {latestSentiment.name.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {data.map((item) => (
              <motion.div
                key={item.name}
                className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs text-gray-400 block">{item.name}</span>
                <span 
                  className="text-lg font-medium"
                  style={{ color: item.color }}
                >
                  {item.value}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
