import { useState, useEffect } from 'react'
import { Card } from '../../ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GreekMetrics {
  timestamp: number
  delta: number
  gamma: number
  theta: number
  vega: number
}

export function GreeksAnalysisDemo() {
  const [metrics, setMetrics] = useState<GreekMetrics[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H')

  useEffect(() => {
    // Initialize with sample data
    const initialData = Array.from({ length: 24 }, (_, i) => ({
      timestamp: Date.now() - (24 - i) * 3600000,
      delta: Math.random() * 0.4 + 0.3, // 0.3 to 0.7
      gamma: Math.random() * 0.2, // 0 to 0.2
      theta: -(Math.random() * 0.3), // -0.3 to 0
      vega: Math.random() * 0.4 // 0 to 0.4
    }))
    setMetrics(initialData)

    // Update every second
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newPoint = {
          timestamp: Date.now(),
          delta: Math.random() * 0.4 + 0.3,
          gamma: Math.random() * 0.2,
          theta: -(Math.random() * 0.3),
          vega: Math.random() * 0.4
        }
        return [...prev.slice(1), newPoint]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeframes = ['1H', '4H', '1D', '1W']

  return (
    <Card className="p-4 bg-black border-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary">Real-Time Greeks Analysis</h3>
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedTimeframe === tf
                  ? 'bg-primary text-white'
                  : 'bg-blue-950/20 text-gray-400 hover:bg-blue-900/30'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

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
              domain={[-0.5, 1]}
              tickFormatter={(value) => value.toFixed(2)}
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
              formatter={(value: number) => value.toFixed(3)}
            />
            <Line 
              type="monotone" 
              dataKey="delta" 
              name="Delta"
              stroke="#22c55e" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="gamma" 
              name="Gamma"
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="theta" 
              name="Theta"
              stroke="#ef4444" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="vega" 
              name="Vega"
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {metrics.length > 0 && (
          <>
            <div className="p-3 rounded-lg bg-green-950/20 border border-green-500/20">
              <span className="text-xs text-gray-400 block">Delta</span>
              <span className="text-lg font-medium text-green-400">
                {metrics[metrics.length - 1].delta.toFixed(3)}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
              <span className="text-xs text-gray-400 block">Gamma</span>
              <span className="text-lg font-medium text-blue-400">
                {metrics[metrics.length - 1].gamma.toFixed(3)}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20">
              <span className="text-xs text-gray-400 block">Theta</span>
              <span className="text-lg font-medium text-red-400">
                {metrics[metrics.length - 1].theta.toFixed(3)}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-yellow-950/20 border border-yellow-500/20">
              <span className="text-xs text-gray-400 block">Vega</span>
              <span className="text-lg font-medium text-yellow-400">
                {metrics[metrics.length - 1].vega.toFixed(3)}
              </span>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
