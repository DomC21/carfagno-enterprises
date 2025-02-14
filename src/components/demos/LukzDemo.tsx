import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { generateOptionsData, generateCongressionalTrades, generateMarketSentiment, generateGreekMetrics } from '../../utils/fakeData'
import { Card } from '../../components/ui/card'
import { motion } from 'framer-motion'
// Removed unused Slider import

interface GreekMetrics {
  delta: number
  gamma: number
  theta: number
  vega: number
}

export function LukzDemo() {
  const [optionsData, setOptionsData] = useState(generateOptionsData(10))
  const [trades, setTrades] = useState(generateCongressionalTrades(5))
  const [sentiment, setSentiment] = useState(generateMarketSentiment(1)[0])
  const [greekMetrics, setGreekMetrics] = useState<GreekMetrics[]>(generateGreekMetrics(24))
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [loading, setLoading] = useState(true)

  const timeframes = ['1H', '1D', '1W', '1M']

  useEffect(() => {
    // Initial data load
    setOptionsData(generateOptionsData(10))
    setTrades(generateCongressionalTrades(5))
    setSentiment(generateMarketSentiment(1)[0])
    setGreekMetrics(generateGreekMetrics(24))
    setLoading(false)

    // Update data every 10 seconds
    const interval = setInterval(() => {
      setOptionsData(generateOptionsData(10))
      setTrades(generateCongressionalTrades(5))
      setSentiment(generateMarketSentiment(1)[0])
      setGreekMetrics(generateGreekMetrics(24))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe)
    // Update Greek metrics based on timeframe
    setGreekMetrics(generateGreekMetrics(timeframe === '1H' ? 24 : timeframe === '1D' ? 48 : timeframe === '1W' ? 168 : 720))
  }

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
      {/* Greek Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Card className="p-4 bg-black border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary">Greek Metrics</h3>
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
          </div>
          <div className="h-[300px]">
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
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '0.375rem'
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
          <div className="mt-4 grid grid-cols-4 gap-4">
            {Object.entries(greekMetrics[greekMetrics.length - 1] || {}).map(([key, value]) => (
              key !== 'timestamp' && (
                <div key={key} className="text-center">
                  <span className="text-sm text-gray-400 block">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="text-lg font-medium text-primary">{value.toFixed(4)}</span>
                </div>
              )
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Options Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1
        }}
      >
        <Card className="p-4 bg-black border-border">
          <h3 className="text-lg font-semibold mb-4 text-primary">Options Flow</h3>
          <div className="h-[400px]">
            <div className="overflow-x-auto">
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
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span className="text-sm text-gray-400">Calls</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="text-sm text-gray-400">Puts</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Put/Call Ratio: {(optionsData.reduce((acc, curr) => acc + curr.putVolume, 0) / 
                              optionsData.reduce((acc, curr) => acc + curr.callVolume, 0)).toFixed(2)}
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Congressional Trades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2
          }}
        >
          <Card className="p-4 bg-black border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primary">Congressional Trades</h3>
              <div className="text-sm text-gray-400">
                Last {trades.length} Transactions
              </div>
            </div>
            <div className="space-y-4">
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
          </Card>
        </motion.div>

        {/* Market Sentiment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.3
          }}
        >
          <Card className="p-4 bg-black border-border">
            <h3 className="text-lg font-semibold mb-4 text-primary">Market Sentiment</h3>
            <div className="grid grid-cols-2 gap-6">
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
                    <div className="mt-2">
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: SENTIMENT_COLORS[item.name.toLowerCase() as keyof typeof SENTIMENT_COLORS]
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: index * 0.1 + 0.5
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="text-sm text-gray-400 mt-4">
                  Market sentiment is calculated based on real-time analysis of news, social media, and trading patterns
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
