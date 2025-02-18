import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { generateOptionsData, simulateDataStream } from '@/lib/demo-data'
import { AlertTriangle } from 'lucide-react'

interface UnusualActivity {
  strike: number
  volume: number
  openInterest: number
  volumeRatio: number
  isUnusual: boolean
}

export function UnusualActivityDemo() {
  const [data, setData] = useState<UnusualActivity[]>([])
  const [alerts, setAlerts] = useState<UnusualActivity[]>([])

  useEffect(() => {
    const cleanup = simulateDataStream(
      () => {
        const optionsData = generateOptionsData()
        const processedData = optionsData.map(option => {
          const volumeRatio = option.volume / (option.openInterest || 1)
          return {
            strike: option.strike,
            volume: option.volume,
            openInterest: option.openInterest,
            volumeRatio,
            isUnusual: volumeRatio > 3 // Volume > 3x Open Interest
          }
        })

        // Update alerts
        const newAlerts = processedData.filter(d => d.isUnusual)
        setAlerts(prev => [...prev, ...newAlerts].slice(-5)) // Keep last 5 alerts

        return processedData
      },
      2000,
      setData
    )
    return cleanup
  }, [])

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Unusual Options Activity</h3>
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
                {data.map((entry: { isUnusual: boolean }, index: number) => (
                  <Cell 
                    key={`cell-${index}`}
                    fillOpacity={entry.isUnusual ? 1 : 0.4}
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
