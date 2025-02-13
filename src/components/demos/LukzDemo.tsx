import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { generateOptionsData, generateCongressionalTrades, generateMarketSentiment } from '../../utils/fakeData'
import { Card } from '../../components/ui/card'

export function LukzDemo() {
  const [optionsData, setOptionsData] = useState(generateOptionsData(10))
  const [trades, setTrades] = useState(generateCongressionalTrades(5))
  const [sentiment, setSentiment] = useState(generateMarketSentiment(1)[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial data load
    setOptionsData(generateOptionsData(10))
    setTrades(generateCongressionalTrades(5))
    setSentiment(generateMarketSentiment(1)[0])
    setLoading(false)

    // Update data every 10 seconds
    const interval = setInterval(() => {
      setOptionsData(generateOptionsData(10))
      setTrades(generateCongressionalTrades(5))
      setSentiment(generateMarketSentiment(1)[0])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const SENTIMENT_COLORS = {
    bullish: '#22c55e',
    bearish: '#ef4444',
    neutral: '#64748b'
  }

  const sentimentData = [
    { name: 'Bullish', value: sentiment.bullish },
    { name: 'Bearish', value: sentiment.bearish },
    { name: 'Neutral', value: sentiment.neutral }
  ]

  return (
    <div className="space-y-6">
      {/* Options Flow */}
      <Card className="p-4 bg-black border-border">
        <h3 className="text-lg font-semibold mb-4 text-primary">Options Flow</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={optionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="strike" 
                stroke="#64748b"
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '0.375rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="volume" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Congressional Trades */}
        <Card className="p-4 bg-black border-border">
          <h3 className="text-lg font-semibold mb-4 text-primary">Congressional Trades</h3>
          <div className="space-y-4">
            {trades.map((trade, i) => (
              <div 
                key={i}
                className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{trade.date}</span>
                  <span className={`text-sm font-medium ${
                    trade.type === 'buy' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trade.type.toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">{trade.politician}</span>
                    <span className="text-sm font-medium text-primary">${trade.amount.toLocaleString()}</span>
                  </div>
                  <span className="text-sm text-gray-400">{trade.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Market Sentiment */}
        <Card className="p-4 bg-black border-border">
          <h3 className="text-lg font-semibold mb-4 text-primary">Market Sentiment</h3>
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
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '0.375rem'
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {sentimentData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SENTIMENT_COLORS[item.name.toLowerCase() as keyof typeof SENTIMENT_COLORS] }}
                />
                <span className="text-sm text-gray-400">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
