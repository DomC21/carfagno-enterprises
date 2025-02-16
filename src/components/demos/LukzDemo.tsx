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
                <Line 
                  type="monotone" 
                  dataKey="delta" 
                  stroke="#FFD700" 
                  name="Delta (Δ)" 
                  dot={false}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="gamma" 
                  stroke="#10b981" 
                  name="Gamma (Γ)" 
                  dot={false}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="theta" 
                  stroke="#f59e0b" 
                  name="Theta (Θ)" 
                  dot={false}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="vega" 
                  stroke="#8b5cf6" 
                  name="Vega (ν)" 
                  dot={false}
                  strokeWidth={2}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-4 rounded-lg bg-black/90 border border-primary/20 backdrop-blur-sm">
                          <div className="text-xs text-gray-400 mb-2">
                            {new Date(payload[0].payload.timestamp).toLocaleTimeString()}
                          </div>
                          {payload.map((entry, index) => (
                            <div key={index} className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm font-medium text-primary">
                                  {entry.name}
                                </span>
                                <span className="text-sm text-gray-300">
                                  {typeof entry.value === 'number' ? entry.value.toFixed(4) : entry.value}
                                </span>
                              </div>
                              <div className="text-xs text-gray-400 ml-4">
                                {entry.name === 'Delta (Δ)' && 'Rate of change in option price relative to underlying'}
                                {entry.name === 'Gamma (Γ)' && 'Rate of change in delta relative to underlying'}
                                {entry.name === 'Theta (Θ)' && 'Time decay of option value'}
                                {entry.name === 'Vega (ν)' && 'Sensitivity to volatility changes'}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
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
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Filter by:</span>
              <select 
                className="px-3 py-1 rounded-md text-sm bg-blue-950/20 text-gray-400 border border-primary/20 focus:border-primary/40 outline-none"
                onChange={(e) => {
                  // Filter logic would go here in a real implementation
                  console.log('Filter by:', e.target.value)
                }}
              >
                <option value="all">All Options</option>
                <option value="itm">In the Money</option>
                <option value="otm">Out of the Money</option>
                <option value="high_volume">High Volume</option>
                <option value="high_iv">High IV</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by:</span>
              <select 
                className="px-3 py-1 rounded-md text-sm bg-blue-950/20 text-gray-400 border border-primary/20 focus:border-primary/40 outline-none"
                onChange={(e) => {
                  // Sort logic would go here in a real implementation
                  console.log('Sort by:', e.target.value)
                }}
              >
                <option value="strike">Strike Price</option>
                <option value="volume">Volume</option>
                <option value="iv">Implied Volatility</option>
                <option value="delta">Delta</option>
              </select>
            </div>
          </div>
          <div className="h-[400px] overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 gap-2 text-xs mb-2 bg-blue-950/20 p-2 rounded-lg">
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
                    ? 'bg-green-950/20 border border-green-500/20 hover:bg-green-950/30' 
                    : 'bg-red-950/20 border border-red-500/20 hover:bg-red-950/30'
                } transition-all duration-300 transform-gpu hover:scale-[1.02]`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      trade.type === 'buy' ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      trade.type === 'buy' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{trade.date}</span>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        trade.sentiment === 'bullish' ? 'bg-green-950/20 border border-green-500/20 text-green-400' :
                        trade.sentiment === 'bearish' ? 'bg-red-950/20 border border-red-500/20 text-red-400' :
                        'bg-blue-950/20 border border-blue-500/20 text-blue-400'
                      }`}>
                        {trade.sentiment.charAt(0).toUpperCase() + trade.sentiment.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium text-primary block">{trade.politician}</span>
                      <span className="text-xs text-gray-500 block">{trade.committee}</span>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950/20 border border-blue-500/20 text-blue-400">
                          {trade.accuracy}% accuracy
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950/20 border border-purple-500/20 text-purple-400">
                          {trade.frequency} trades/month
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary block">${trade.amount.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 block">{trade.shares.toLocaleString()} shares</span>
                      <span className={`text-xs block mt-2 ${
                        trade.performance > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {trade.performance > 0 ? '+' : ''}{trade.performance}% since trade
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-primary font-medium block">{trade.stock}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{trade.sector}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950/20 border border-blue-500/20">
                            Market Cap: ${(trade.marketCap / 1e9).toFixed(1)}B
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1">
                      <motion.div
                        className={`h-1 rounded-full ${
                          trade.performance > 0 ? 'bg-green-400' : 'bg-red-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(Math.abs(trade.performance), 100)}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950/20 border border-blue-500/20">
                        Volume: {(trade.volume / 1e6).toFixed(1)}M
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950/20 border border-blue-500/20">
                        P/E: {trade.pe.toFixed(1)}
                      </span>
                    </div>
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
