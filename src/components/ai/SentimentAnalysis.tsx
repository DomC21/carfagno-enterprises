import * as React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { useRealtimeData } from '../../hooks/useRealtimeData'
import { generateMarketSentiment, MarketSentiment } from '../../utils/fakeData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface SentimentAnalysisProps {
  symbol?: string
}

const SENTIMENT_COLORS = {
  bullish: '#22c55e',
  bearish: '#ef4444',
  neutral: '#64748b'
}

export function SentimentAnalysis({ symbol = 'AAPL' }: SentimentAnalysisProps) {
  const { data: currentSentiment, isLoading: currentLoading } = useRealtimeData(
    () => generateMarketSentiment(1)[0],
    { interval: 3000 }
  )

  const { data: historicalSentiment, isLoading: historyLoading } = useRealtimeData(
    () => generateMarketSentiment(24),
    { interval: 5000 }
  )

  if (currentLoading || historyLoading || !currentSentiment || !historicalSentiment) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-blue-950/20 rounded w-3/4"></div>
          <div className="h-40 bg-blue-950/20 rounded"></div>
        </div>
      </Card>
    )
  }

  const sentimentData = [
    { name: 'Bullish', value: currentSentiment.bullish },
    { name: 'Bearish', value: currentSentiment.bearish },
    { name: 'Neutral', value: currentSentiment.neutral }
  ]

  const getSentimentStatus = (sentiment: MarketSentiment) => {
    if (sentiment.bullish > 50) return 'Bullish'
    if (sentiment.bearish > 50) return 'Bearish'
    return 'Neutral'
  }

  const getConfidenceScore = (sentiment: MarketSentiment) => {
    const highest = Math.max(sentiment.bullish, sentiment.bearish, sentiment.neutral)
    return highest / 100
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Market Sentiment Analysis</h3>
        <div className="text-sm text-gray-400">{symbol}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Sentiment */}
        <div className="space-y-4">
          <div className="h-[200px]">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              getSentimentStatus(currentSentiment) === 'Bullish'
                ? 'bg-green-950/20 border border-green-500/20'
                : getSentimentStatus(currentSentiment) === 'Bearish'
                ? 'bg-red-950/20 border border-red-500/20'
                : 'bg-blue-950/20 border border-blue-500/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">Current Status</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-12 rounded-full overflow-hidden bg-gray-800">
                  <div 
                    className={`h-full ${
                      getConfidenceScore(currentSentiment) >= 0.7 ? 'bg-green-500' :
                      getConfidenceScore(currentSentiment) >= 0.5 ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${getConfidenceScore(currentSentiment) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">
                  {(getConfidenceScore(currentSentiment) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="text-lg font-semibold text-primary">
              {getSentimentStatus(currentSentiment)}
            </div>
          </motion.div>
        </div>

        {/* Historical Trend */}
        <div className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalSentiment}>
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
                  dataKey="bullish" 
                  stroke={SENTIMENT_COLORS.bullish} 
                  name="Bullish"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="bearish" 
                  stroke={SENTIMENT_COLORS.bearish} 
                  name="Bearish"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="neutral" 
                  stroke={SENTIMENT_COLORS.neutral} 
                  name="Neutral"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Object.entries(SENTIMENT_COLORS).map(([key, color]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-400 capitalize">{key}</span>
                </div>
                <div className="text-sm font-medium text-primary">
                  {currentSentiment[key as keyof MarketSentiment]}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
