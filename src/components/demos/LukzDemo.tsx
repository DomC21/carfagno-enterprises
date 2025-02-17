import React, { useState, useEffect } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { generateOptionsData, generateCongressionalTrades, generateMarketSentiment, generateGreekMetrics } from '../../utils/fakeData'
import { motion } from 'framer-motion'
import { useRealtimeData } from '../../hooks/useRealtimeData'
import { DashboardLayout } from '../../components/ui/dashboard-layout'
import { OptionsFlow3D } from '../../components/ui/options-flow-3d'
import { DepthChart } from '../../components/ui/depth-chart'
import { DataStreamIndicator } from '../../components/ui/data-stream-indicator'
import { useKeyboard } from '../../providers/KeyboardProvider'
import { useAlert } from '../../contexts/AlertContext'

// Constants
const TIMEFRAMES = ['1H', '1D', '1W', '1M'] as const
const FILTERS = ['all', 'itm', 'otm', 'high_volume', 'high_iv'] as const
const SORTS = ['strike', 'volume', 'iv', 'delta'] as const
const SENTIMENT_COLORS = {
  bullish: '#22c55e',
  bearish: '#ef4444',
  neutral: '#64748b'
} as const

// Types
type TimeframeOption = typeof TIMEFRAMES[number]
type FilterOption = typeof FILTERS[number]
type SortOption = typeof SORTS[number]

interface OptionsData {
  strike: number
  bid: number
  ask: number
  last: number
  callVolume: number
  putVolume: number
  iv: number
  greeks: {
    delta: number
    gamma: number
    theta: number
    vega: number
    rho: number
  }
}

interface Trade {
  type: 'buy' | 'sell'
  date: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  politician: string
  committee: string
  accuracy: number
  frequency: number
  amount: number
  shares: number
  performance: number
  stock: string
  sector: string
  marketCap: number
  volume: number
  pe: number
}

interface MarketSentiment {
  bullish: number
  bearish: number
  neutral: number
}

interface GreekMetrics {
  timestamp: number
  delta: number
  gamma: number
  theta: number
  vega: number
}

interface DashboardItem {
  id: string
  title: string
  defaultSize: { w: number; h: number }
  content: React.ReactNode
}

export function LukzDemo() {
  // State
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption>('1D')
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all')
  const [selectedSort, setSelectedSort] = useState<SortOption>('strike')
  const { registerShortcut } = useKeyboard()
  const { showInfo } = useAlert()

  // Register keyboard shortcuts
  useEffect(() => {
    const shortcuts = [
      {
        key: 't',
        description: 'Change timeframe',
        action: () => {
          const currentIndex = TIMEFRAMES.indexOf(selectedTimeframe)
          const nextIndex = (currentIndex + 1) % TIMEFRAMES.length
          setSelectedTimeframe(TIMEFRAMES[nextIndex])
          showInfo(`Timeframe changed to ${TIMEFRAMES[nextIndex]}`)
        }
      },
      {
        key: 'f',
        description: 'Change filter',
        action: () => {
          const currentIndex = FILTERS.indexOf(selectedFilter)
          const nextIndex = (currentIndex + 1) % FILTERS.length
          setSelectedFilter(FILTERS[nextIndex])
          showInfo(`Filter changed to ${FILTERS[nextIndex]}`)
        }
      },
      {
        key: 's',
        description: 'Change sort',
        action: () => {
          const currentIndex = SORTS.indexOf(selectedSort)
          const nextIndex = (currentIndex + 1) % SORTS.length
          setSelectedSort(SORTS[nextIndex])
          showInfo(`Sort changed to ${SORTS[nextIndex]}`)
        }
      }
    ]

    shortcuts.forEach(shortcut => registerShortcut(shortcut))
  }, [selectedTimeframe, selectedFilter, selectedSort, registerShortcut, showInfo])

  // Data hooks
  const {
    data: optionsData,
    error: optionsError,
    isLoading: optionsLoading,
    lastUpdated: optionsLastUpdated
  } = useRealtimeData<OptionsData[]>(() => generateOptionsData(10), {
    interval: 2000,
    retryAttempts: 3
  })

  const {
    data: trades,
    error: tradesError,
    isLoading: tradesLoading,
    lastUpdated: tradesLastUpdated
  } = useRealtimeData<Trade[]>(() => generateCongressionalTrades(5), {
    interval: 5000,
    retryAttempts: 3
  })

  const {
    data: sentiment,
    error: sentimentError,
    isLoading: sentimentLoading,
    lastUpdated: sentimentLastUpdated
  } = useRealtimeData<MarketSentiment>(() => generateMarketSentiment(1)[0], {
    interval: 3000,
    retryAttempts: 3
  })

  const {
    data: greekMetrics,
    error: greekMetricsError,
    isLoading: greekMetricsLoading,
    lastUpdated: greekMetricsLastUpdated
  } = useRealtimeData<GreekMetrics[]>(() => generateGreekMetrics(
    selectedTimeframe === '1H' ? 24 : 
    selectedTimeframe === '1D' ? 48 : 
    selectedTimeframe === '1W' ? 168 : 720
  ), {
    interval: 1000,
    retryAttempts: 3
  })

  // Transform sentiment data for pie chart
  const sentimentData = sentiment ? [
    { name: 'Bullish', value: sentiment.bullish },
    { name: 'Bearish', value: sentiment.bearish },
    { name: 'Neutral', value: sentiment.neutral }
  ] : []

  // Show loading state if any data stream is loading
  if (optionsLoading || tradesLoading || sentimentLoading || greekMetricsLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1),transparent_70%)] animate-pulse"></div>
            </div>
          </div>
          <div className="text-sm text-gray-400">Loading real-time market data...</div>
        </div>
      </motion.div>
    )
  }

  // Show error state if any data stream has an error
  if (optionsError || tradesError || sentimentError || greekMetricsError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="flex flex-col items-center gap-4 text-red-400">
          <div className="text-lg font-medium">Error loading market data</div>
          <div className="text-sm text-center max-w-md">
            {optionsError?.message || tradesError?.message || sentimentError?.message || greekMetricsError?.message}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-950/20 border border-red-500/20 rounded-lg hover:bg-red-900/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    )
  }

  // Ensure all data is available
  if (!optionsData || !trades || !sentiment || !greekMetrics) {
    return null
  }

  // Define dashboard items
  const dashboardItems: DashboardItem[] = [
    {
      id: 'options-flow-3d',
      title: 'Options Flow Analysis',
      defaultSize: { w: 4, h: 3 },
      content: (
        <div className="w-full h-full">
          <DataStreamIndicator 
            lastUpdated={optionsLastUpdated} 
            isLoading={optionsLoading} 
          />
          <div className="h-[400px] mt-4">
            <OptionsFlow3D data={optionsData} />
          </div>
        </div>
      )
    },
    {
      id: 'depth-chart',
      title: 'Market Depth',
      defaultSize: { w: 4, h: 3 },
      content: (
        <div className="w-full h-full">
          <DataStreamIndicator 
            lastUpdated={optionsLastUpdated} 
            isLoading={optionsLoading} 
          />
          <div className="h-[400px] mt-4">
            <DepthChart 
              data={{
                bids: optionsData.map(d => ({ price: d.strike, size: d.callVolume })),
                asks: optionsData.map(d => ({ price: d.strike, size: d.putVolume }))
              }}
            />
          </div>
        </div>
      )
    },
    {
      id: 'greek-metrics',
      title: 'Greek Metrics',
      defaultSize: { w: 4, h: 3 },
      content: (
        <div className="w-full h-full">
          <DataStreamIndicator 
            lastUpdated={greekMetricsLastUpdated} 
            isLoading={greekMetricsLoading} 
          />
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={greekMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '0.5rem'
                  }}
                  labelStyle={{ color: '#64748b' }}
                />
                <Line type="monotone" dataKey="delta" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="gamma" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="theta" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="vega" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
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
          <div className="h-[300px] mt-4">
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
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '0.5rem'
                  }}
                  labelStyle={{ color: '#64748b' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    }
  ]

  return (
    <DashboardLayout items={dashboardItems} />
  )
}
