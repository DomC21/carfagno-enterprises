// Component uses JSX which implicitly imports React
import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { useRealtimeData } from '../../hooks/useRealtimeData'
import { generateStockData, StockData } from '../../utils/fakeData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PatternRecognitionProps {
  symbol?: string
}

export function PatternRecognition({ symbol = 'AAPL' }: PatternRecognitionProps) {
  const { data: stockData, isLoading } = useRealtimeData<StockData[]>(
    () => generateStockData(50),
    { interval: 1000 }
  )

  if (isLoading || !stockData) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-blue-950/20 rounded w-3/4"></div>
          <div className="h-40 bg-blue-950/20 rounded"></div>
        </div>
      </Card>
    )
  }

  const pattern = stockData[stockData.length - 1]?.pattern
  const supportLevels = stockData[stockData.length - 1]?.supportLevels || []
  const resistanceLevels = stockData[stockData.length - 1]?.resistanceLevels || []

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Pattern Recognition</h3>
        <div className="text-sm text-gray-400">{symbol}</div>
      </div>

      {pattern && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/20"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">
              Detected Pattern
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-12 rounded-full overflow-hidden bg-gray-800">
                <div 
                  className={`h-full ${
                    pattern.confidence >= 0.9 ? 'bg-green-500' :
                    pattern.confidence >= 0.8 ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${pattern.confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {(pattern.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary">
              {pattern.type.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
            <span className={`text-sm ${
              pattern.priceTarget > stockData[stockData.length - 1].price
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              Target: ${pattern.priceTarget.toFixed(2)}
            </span>
          </div>
        </motion.div>
      )}

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="timestamp" 
              stroke="#64748b"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis 
              stroke="#64748b"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(30, 41, 59, 0.5)',
                borderRadius: '0.375rem',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
              }}
              labelStyle={{ color: '#94a3b8' }}
              itemStyle={{ color: '#e2e8f0' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              dot={false}
              strokeWidth={2}
            />
            {/* Support Levels */}
            {supportLevels.map((level, index) => (
              <Line
                key={`support-${index}`}
                type="monotone"
                data={[
                  { timestamp: stockData[0].timestamp, price: level },
                  { timestamp: stockData[stockData.length - 1].timestamp, price: level }
                ]}
                stroke="#22c55e"
                strokeDasharray="3 3"
                dot={false}
              />
            ))}
            {/* Resistance Levels */}
            {resistanceLevels.map((level, index) => (
              <Line
                key={`resistance-${index}`}
                type="monotone"
                data={[
                  { timestamp: stockData[0].timestamp, price: level },
                  { timestamp: stockData[stockData.length - 1].timestamp, price: level }
                ]}
                stroke="#ef4444"
                strokeDasharray="3 3"
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Support Levels</div>
          <div className="space-y-1">
            {supportLevels.map((level, index) => (
              <div
                key={index}
                className="text-sm text-green-400 flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-green-400" />
                ${level.toFixed(2)}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Resistance Levels</div>
          <div className="space-y-1">
            {resistanceLevels.map((level, index) => (
              <div
                key={index}
                className="text-sm text-red-400 flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-400" />
                ${level.toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
