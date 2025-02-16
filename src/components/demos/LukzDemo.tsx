import { useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { generateOptionsData, generateCongressionalTrades, generateMarketSentiment, generateGreekMetrics } from '../../utils/fakeData'
import { motion } from 'framer-motion'
import { useRealtimeData } from '../../hooks/useRealtimeData'
import { DashboardLayout } from '@/components/ui/dashboard-layout'

// Types for Greek metrics data
type GreekMetricsData = {
  delta: number
  gamma: number
  theta: number
  vega: number
}

// Data streaming status indicator component
const DataStreamIndicator = ({ lastUpdated, isLoading }: { lastUpdated: Date | null, isLoading: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${
      isLoading ? 'bg-blue-500 animate-pulse' : 
      lastUpdated ? 'bg-green-500' : 'bg-red-500'
    }`} />
    <span className="text-xs text-gray-400">
      {isLoading ? 'Updating...' : 
       lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : 
       'Waiting for data...'}
    </span>
  </div>
)

export function LukzDemo() {
  // State
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const timeframes = ['1H', '1D', '1W', '1M']
  // No need to track dashboard layout state since it's handled by DashboardLayout component

  // Constants
  const SENTIMENT_COLORS = {
    bullish: '#22c55e',
    bearish: '#ef4444',
    neutral: '#64748b'
  }

  // Data hooks
  const {
    data: optionsData,
    error: optionsError,
    isLoading: optionsLoading,
    lastUpdated: optionsLastUpdated
  } = useRealtimeData(() => generateOptionsData(10), {
    interval: 2000,
    retryAttempts: 3
  })

  const {
    data: trades,
    error: tradesError,
    isLoading: tradesLoading,
    lastUpdated: tradesLastUpdated
  } = useRealtimeData(() => generateCongressionalTrades(5), {
    interval: 5000,
    retryAttempts: 3
  })

  const {
    data: sentiment,
    error: sentimentError,
    isLoading: sentimentLoading,
    lastUpdated: sentimentLastUpdated
  } = useRealtimeData(() => generateMarketSentiment(1)[0], {
    interval: 3000,
    retryAttempts: 3
  })

  const {
    data: greekMetrics,
    error: greekMetricsError,
    isLoading: greekMetricsLoading,
    lastUpdated: greekMetricsLastUpdated
  } = useRealtimeData<GreekMetricsData[]>(
    () => generateGreekMetrics(
      selectedTimeframe === '1H' ? 24 : 
      selectedTimeframe === '1D' ? 48 : 
      selectedTimeframe === '1W' ? 168 : 720
    ),
    {
      interval: 1000,
      retryAttempts: 3
    }
  )

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe)
  }

  const sentimentData = sentiment ? [
    { name: 'Bullish', value: sentiment.bullish },
    { name: 'Bearish', value: sentiment.bearish },
    { name: 'Neutral', value: sentiment.neutral }
  ] : []

  // Show loading state if any data stream is loading
  if (optionsLoading || tradesLoading || sentimentLoading || greekMetricsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <div className="text-sm text-gray-400">Loading real-time data...</div>
        </div>
      </div>
    )
  }

  // Show error state if any data stream has an error
  if (optionsError || tradesError || sentimentError || greekMetricsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-red-400">
          <div className="text-lg font-medium">Error loading data</div>
          <div className="text-sm">
            {optionsError?.message || tradesError?.message || sentimentError?.message || greekMetricsError?.message}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-950/20 border border-red-500/20 rounded-lg hover:bg-red-900/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Ensure all data is available
  if (!optionsData || !trades || !sentiment || !greekMetrics) {
    return null
  }

  const dashboardItems = [
    {
      id: 'greek-metrics',
      title: 'Greek Metrics',
      defaultSize: { w: 3, h: 2 },
      content: (
        <div className="w-full h-full">
          <div className="flex gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
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
          <DataStreamIndicator 
            lastUpdated={greekMetricsLastUpdated} 
            isLoading={greekMetricsLoading} 
          />
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={greekMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#64748b"
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <YAxis stroke="#64748b" />
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
                />
                <Line type="monotone" dataKey="delta" stroke="#3b82f6" name="Delta" dot={false} />
                <Line type="monotone" dataKey="gamma" stroke="#10b981" name="Gamma" dot={false} />
                <Line type="monotone" dataKey="theta" stroke="#f59e0b" name="Theta" dot={false} />
                <Line type="monotone" dataKey="vega" stroke="#8b5cf6" name="Vega" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      id: 'options-flow',
      title: 'Options Flow',
      defaultSize: { w: 3, h: 2 },
      content: (
        <div className="w-full h-full">
          <DataStreamIndicator 
            lastUpdated={optionsLastUpdated} 
            isLoading={optionsLoading} 
          />
          <div className="h-[400px] mt-4 overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 gap-2 text-xs mb-2">
                <div className="font-medium text-primary">Strike</div>
                <div className="text-center font-medium text-primary">Bid</div>
                <div className="text-center font-medium text-primary">Ask</div>
                <div className="text-center font-medium text-primary">Last</div>
                <div className="text-center font-medium text-primary">Volume</div>
                <div className="text-center font-medium text-primary">IV</div>
                <div className="text-center font-medium text-primary">Greeks</div>
              </div>
              <div className="space-y-1">
                {optionsData.map((option) => (
                  <div key={option.strike} className="grid grid-cols-7 gap-2 text-xs py-2 px-2 rounded-lg hover:bg-blue-950/20 transition-colors">
                    <div className="font-medium text-primary">${option.strike.toFixed(2)}</div>
                    <div className="text-center text-red-400">${option.bid.toFixed(2)}</div>
                    <div className="text-center text-green-400">${option.ask.toFixed(2)}</div>
                    <div className="text-center text-primary">${option.last.toFixed(2)}</div>
                    <div className="text-center text-gray-400">{(option.callVolume + option.putVolume).toLocaleString()}</div>
                    <div className="text-center text-primary">{option.iv.toFixed(1)}%</div>
                    <div className="text-center">
                      <div className="group relative inline-block">
                        <span className="cursor-help text-primary">Greeks</span>
                        <div className="invisible group-hover:visible absolute z-10 w-48 p-2 mt-1 text-xs rounded-lg bg-black border border-border -translate-x-1/2 left-1/2">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-gray-400">Delta (Δ):</div>
                            <div className="text-right text-primary">{option.greeks.delta.toFixed(3)}</div>
                            <div className="text-gray-400">Gamma (Γ):</div>
                            <div className="text-right text-primary">{option.greeks.gamma.toFixed(3)}</div>
                            <div className="text-gray-400">Theta (Θ):</div>
                            <div className="text-right text-primary">{option.greeks.theta.toFixed(3)}</div>
                            <div className="text-gray-400">Vega (ν):</div>
                            <div className="text-right text-primary">{option.greeks.vega.toFixed(3)}</div>
                            <div className="text-gray-400">Rho (ρ):</div>
                            <div className="text-right text-primary">{option.greeks.rho.toFixed(3)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'congressional-trades',
      title: 'Congressional Trades',
      defaultSize: { w: 2, h: 2 },
      content: (
        <div className="w-full h-full">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              Last {trades.length} Transactions
            </div>
            <DataStreamIndicator 
              lastUpdated={tradesLastUpdated} 
              isLoading={tradesLoading} 
            />
          </div>
          <div className="space-y-4 mt-4">
            {trades.map((trade, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.1
                }}
                className={`p-4 rounded-lg ${
                  trade.type === 'buy' 
                    ? 'bg-green-950/20 border border-green-500/20' 
                    : 'bg-red-950/20 border border-red-500/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{trade.date}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      trade.type === 'buy' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.type.toUpperCase()}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      trade.type === 'buy' ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-primary block">{trade.politician}</span>
                      <span className="text-xs text-gray-500">{trade.committee}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary block">${trade.amount.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">{trade.shares} shares</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                    <div>
                      <span className="text-sm text-gray-300 block">{trade.stock}</span>
                      <span className="text-xs text-gray-500">{trade.sector}</span>
                    </div>
                    <span className={`text-xs ${
                      trade.performance > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.performance > 0 ? '+' : ''}{trade.performance}% since trade
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'market-sentiment',
      title: 'Market Sentiment',
      defaultSize: { w: 2, h: 2 },
      content: (
        <div className="w-full h-full">
          <DataStreamIndicator 
            lastUpdated={sentimentLastUpdated} 
            isLoading={sentimentLoading} 
          />
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={SENTIMENT_COLORS[entry.name.toLowerCase() as keyof typeof SENTIMENT_COLORS]} 
                      />
                    ))}
                  </Pie>
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
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {sentimentData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.1 + 0.4
                  }}
                  className={`p-4 rounded-lg ${
                    item.name === 'Bullish' 
                      ? 'bg-green-950/20 border border-green-500/20'
                      : item.name === 'Bearish'
                      ? 'bg-red-950/20 border border-red-500/20'
                      : 'bg-blue-950/20 border border-blue-500/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: SENTIMENT_COLORS[item.name.toLowerCase() as keyof typeof SENTIMENT_COLORS] }}
                      />
                      <span className="text-sm font-medium text-primary">{item.name}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">{item.value}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="w-full transform-gpu"
    >
      <DashboardLayout
        items={dashboardItems}
        onLayoutChange={() => {}}
        className="w-full"
      />
    </motion.div>
  )
}
