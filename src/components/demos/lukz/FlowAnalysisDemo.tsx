import { useState, useEffect } from 'react'
import { Card } from '../../ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface FlowData {
  strike: number
  volume: number
  openInterest: number
  volumeRatio: number
  isUnusual: boolean
}

export function FlowAnalysisDemo() {
  const [data, setData] = useState<FlowData[]>([])
  const [alerts, setAlerts] = useState<FlowData[]>([])

  useEffect(() => {
    // Generate initial data
    const generateData = () => {
      const baseStrike = 100
      return Array.from({ length: 10 }, (_, i) => {
        const strike = baseStrike + (i - 5) * 5
        const volume = Math.floor(Math.random() * 10000) + 1000
        const openInterest = Math.floor(Math.random() * 20000) + 5000
        const volumeRatio = volume / openInterest
        return {
          strike,
          volume,
          openInterest,
          volumeRatio,
          isUnusual: volumeRatio > 3
        }
      })
    }

    setData(generateData())

    // Update data every 2 seconds
    const interval = setInterval(() => {
      const newData = generateData()
      setData(newData)

      // Update alerts
      const newAlerts = newData.filter(d => d.isUnusual)
      setAlerts(prev => [...prev, ...newAlerts].slice(-5)) // Keep last 5 alerts
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-4 bg-black border-border">
      <h3 className="text-lg font-semibold mb-4 text-primary">Options Flow Analysis</h3>
      <p className="text-gray-300 mb-6">Monitor and analyze unusual trading patterns</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
              <XAxis 
                dataKey="strike"
                stroke="rgba(148, 163, 184, 0.5)"
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                stroke="rgba(148, 163, 184, 0.5)"
                tickFormatter={(value) => `${value.toFixed(1)}x`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(45, 212, 191, 0.2)',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: 'rgba(148, 163, 184, 1)' }}
                formatter={(value: number) => [`${value.toFixed(2)}x`, 'Volume/OI Ratio']}
                labelFormatter={(value) => `Strike: $${value}`}
              />
              <Bar 
                dataKey="volumeRatio"
                fill="rgba(45, 212, 191, 0.4)"
                animationDuration={500}
              >
                {data.map((entry, index) => (
                  <motion.rect
                    key={`cell-${index}`}
                    fillOpacity={entry.isUnusual ? 1 : 0.4}
                    initial={{ y: 300, height: 0 }}
                    animate={{ y: 0, height: entry.volumeRatio * 50 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-teal-400 mb-2">Recent Unusual Activity</h4>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={`${alert.strike}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-red-400 font-medium">
                      Strike: ${alert.strike}
                    </div>
                    <div className="text-sm text-gray-400">
                      Volume: {alert.volume.toLocaleString()} | OI: {alert.openInterest.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      Ratio: {alert.volumeRatio.toFixed(1)}x
                    </div>
                  </div>
                </motion.div>
              ))}
              {alerts.length === 0 && (
                <div className="text-gray-400 text-center py-4">
                  No unusual activity detected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
