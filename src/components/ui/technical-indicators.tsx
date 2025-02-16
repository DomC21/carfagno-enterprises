import * as React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { cn } from '../../utils/styles'
import { useRealtimeData } from '../../hooks/useRealtimeData'
import { generateStockData, type StockData } from '../../utils/fakeData'
import { calculateIndicators, indicatorDescriptions } from '../../utils/technicalIndicators'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts'

interface TechnicalIndicatorsProps {
  className?: string
  symbol?: string
}

export function TechnicalIndicators({ className, symbol = 'AAPL' }: TechnicalIndicatorsProps) {
  const { data: stockData, isLoading } = useRealtimeData<StockData[]>(
    () => generateStockData(50),
    { interval: 1000 }
  )

  const [selectedIndicator, setSelectedIndicator] = React.useState<string | null>(null)

  if (isLoading || !stockData) {
    return (
      <Card className={cn("p-4", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-blue-950/20 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-blue-950/20 rounded"></div>
            <div className="h-3 bg-blue-950/20 rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    )
  }

  const indicators = stockData.map(data => ({
    ...data,
    ...calculateIndicators([data])
  }))

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary">Technical Analysis</h3>
        <span className="text-sm text-gray-400">{symbol}</span>
      </div>

      <div className="grid gap-4">
        {/* Bollinger Bands */}
        <div 
          className="relative"
          onMouseEnter={() => setSelectedIndicator('bollingerBands')}
          onMouseLeave={() => setSelectedIndicator(null)}
        >
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={indicators}>
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
                  dataKey="upperBB"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                />
                <Line 
                  type="monotone" 
                  dataKey="middleBB"
                  stroke="#3b82f6"
                  strokeDasharray="5 5"
                />
                <Area
                  type="monotone"
                  dataKey="lowerBB"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                />
                <Line 
                  type="monotone" 
                  dataKey="price"
                  stroke="#10b981"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          {selectedIndicator === 'bollingerBands' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 right-0 p-2 bg-black/90 border border-blue-500/20 rounded-lg max-w-xs"
            >
              <h4 className="text-sm font-medium text-primary mb-1">
                {indicatorDescriptions.bollingerBands.title}
              </h4>
              <p className="text-xs text-gray-400 mb-2">
                {indicatorDescriptions.bollingerBands.description}
              </p>
              <div className="space-y-1">
                {Object.entries(indicatorDescriptions.bollingerBands.interpretation).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <span className="text-primary">{key}: </span>
                    <span className="text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Moving Averages */}
        <div 
          className="relative"
          onMouseEnter={() => setSelectedIndicator('sma')}
          onMouseLeave={() => setSelectedIndicator(null)}
        >
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={indicators}>
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
                <Line 
                  type="monotone" 
                  dataKey="price"
                  stroke="#10b981"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="sma20"
                  stroke="#3b82f6"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="sma50"
                  stroke="#8b5cf6"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="sma200"
                  stroke="#ef4444"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {selectedIndicator === 'sma' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 right-0 p-2 bg-black/90 border border-blue-500/20 rounded-lg max-w-xs"
            >
              <h4 className="text-sm font-medium text-primary mb-1">
                {indicatorDescriptions.sma.title}
              </h4>
              <p className="text-xs text-gray-400 mb-2">
                {indicatorDescriptions.sma.description}
              </p>
              <div className="space-y-1">
                {Object.entries(indicatorDescriptions.sma.interpretation).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <span className="text-primary">{key}: </span>
                    <span className="text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Volume Profile */}
        <div 
          className="relative"
          onMouseEnter={() => setSelectedIndicator('volumeProfile')}
          onMouseLeave={() => setSelectedIndicator(null)}
        >
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={indicators[0]?.volumeProfile}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="volume"
                  stroke="#64748b"
                />
                <YAxis 
                  dataKey="price"
                  stroke="#64748b"
                  orientation="right"
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
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
                {indicators[0]?.volumeProfile.map((entry, index) => (
                  <ReferenceLine
                    key={index}
                    x={entry.volume}
                    stroke={entry.type === 'buy' ? '#10b981' : '#ef4444'}
                    strokeWidth={2}
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          {selectedIndicator === 'volumeProfile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 right-0 p-2 bg-black/90 border border-blue-500/20 rounded-lg max-w-xs"
            >
              <h4 className="text-sm font-medium text-primary mb-1">
                {indicatorDescriptions.volumeProfile.title}
              </h4>
              <p className="text-xs text-gray-400 mb-2">
                {indicatorDescriptions.volumeProfile.description}
              </p>
              <div className="space-y-1">
                {Object.entries(indicatorDescriptions.volumeProfile.interpretation).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <span className="text-primary">{key}: </span>
                    <span className="text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}
