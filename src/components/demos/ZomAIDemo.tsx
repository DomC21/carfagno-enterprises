import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, ReferenceLine } from 'recharts'
import { generateStockData, type StockData } from '../../utils/fakeData'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Send, FileText, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeatMap } from '../../components/ui/heat-map'
import { MarketStatus } from '../../components/ui/market-status'
import { cn } from '../../utils/styles'

interface Message {
  type: 'user' | 'ai'
  content: string
  timestamp: number
  confidence?: number
  sentiment?: {
    label: 'positive' | 'negative' | 'neutral'
    score: number
    keywords: string[]
  }
}

interface ModelMetrics {
  accuracy: number
  confidence: number
  predictions: number
  timestamp: number
}

const generateAIResponse = (): string => {
  const responses = [
    'Based on our analysis, market sentiment remains cautiously optimistic with a bullish bias.',
    'Technical indicators suggest potential upside momentum in the near term.',
    'Market conditions indicate increased volatility with mixed signals.',
    'Recent price action shows strong support levels and improving momentum.',
    'Analysis suggests a consolidation phase with potential breakout opportunities.'
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export function ZomAIDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [data, setData] = useState<StockData[]>([])

  useEffect(() => {
    // Initialize with some data
    setData(generateStockData(50))

    // Update data periodically with smooth transitions
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), ...generateStockData(1)]
        // Ensure smooth transition by maintaining data structure
        return newData.map(item => ({
          ...item,
          // Add GPU-accelerated transition class
          className: 'transform-gpu transition-all duration-300 ease-out'
        }))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  const [loading, setLoading] = useState(false)
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H')
  // Removed unused sentiment trends state

  useEffect(() => {
    // Initialize model metrics
    const metrics = Array.from({ length: 24 }, (_, i) => ({
      timestamp: Date.now() - (24 - i - 1) * 3600000,
      accuracy: Math.random() * 0.15 + 0.8, // 80-95% accuracy
      confidence: Math.random() * 0.2 + 0.75, // 75-95% confidence
      predictions: Math.floor(Math.random() * 1000 + 500)
    }))
    setModelMetrics(metrics)

    // Update data every 30 seconds with smooth transitions
    const interval = setInterval(() => {
      setModelMetrics(prev => {
        const newMetrics = [
          ...prev.slice(1),
          {
            timestamp: Date.now(),
            accuracy: Math.random() * 0.15 + 0.8,
            confidence: Math.random() * 0.2 + 0.75,
            predictions: Math.floor(Math.random() * 1000 + 500)
          }
        ]
        return newMetrics.map((metric, i) => ({
          ...metric,
          className: 'transform-gpu transition-all duration-500 ease-out',
          animate: {
            opacity: [0, 1],
            y: [20, 0],
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: i * 0.05
            }
          }
        }))
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const sentiment = Math.random() > 0.5 ? 'positive' : Math.random() > 0.5 ? 'negative' : 'neutral'
      const sentimentScore = sentiment === 'positive' ? Math.random() * 0.3 + 0.7 :
                            sentiment === 'negative' ? Math.random() * 0.3 :
                            Math.random() * 0.3 + 0.35

      const keywords = [
        'market trends',
        'technical analysis',
        'trading volume',
        'price action',
        'support levels'
      ].slice(0, Math.floor(Math.random() * 3) + 2)

      const aiResponse: Message = {
        type: 'ai',
        content: generateAIResponse(),
        timestamp: Date.now(),
        confidence: Math.random() * 0.2 + 0.8, // 80-100% confidence
        sentiment: {
          score: sentimentScore,
          label: sentiment as 'positive' | 'negative' | 'neutral',
          keywords
        }
      }
      setMessages(prev => [...prev, aiResponse])
      setLoading(false)
    }, 1000)
  }

  const timeframes = ['1H', '4H', '1D', '1W']
  const screeningResults = [
    { symbol: 'AAPL', score: 85, volume: 12500000 },
    { symbol: 'MSFT', score: 82, volume: 10200000 },
    { symbol: 'GOOGL', score: 78, volume: 8900000 },
    { symbol: 'AMZN', score: 75, volume: 7500000 },
    { symbol: 'META', score: 72, volume: 6800000 }
  ]

  return (
    <div className="space-y-6">
      {/* Model Metrics */}
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
            <h3 className="text-lg font-semibold text-primary">Model Performance</h3>
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={modelMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="#64748b"
                  />
                  <YAxis 
                    stroke="#64748b"
                    domain={[0.7, 1]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(30, 41, 59, 0.5)',
                      borderRadius: '0.375rem',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)',
                      transform: 'translateZ(0)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number) => [
                      `${(value * 100).toFixed(1)}%`,
                      'Model accuracy indicates prediction success rate'
                    ]}
                    wrapperStyle={{ transform: 'translateZ(0)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    name="Accuracy"
                    stroke="#3b82f6" 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    name="Confidence"
                    stroke="#10b981" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={modelMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="#64748b"
                  />
                  <YAxis 
                    stroke="#64748b"
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '0.375rem'
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="predictions"
                    name="Predictions"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {modelMetrics.length > 0 && (
              <>
                <div className="text-center">
                  <span className="text-sm text-gray-400 block">Accuracy</span>
                  <span className="text-lg font-medium text-primary">
                    {(modelMetrics[modelMetrics.length - 1].accuracy * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-400 block">Confidence</span>
                  <span className="text-lg font-medium text-primary">
                    {(modelMetrics[modelMetrics.length - 1].confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-400 block">Predictions</span>
                  <span className="text-lg font-medium text-primary">
                    {modelMetrics[modelMetrics.length - 1].predictions.toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Chat Interface */}
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
        <div className="glassmorphism p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">AI Analysis</h3>
            <MarketStatus />
          </div>
          <div className="h-[300px] overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className={cn(
                  "p-4 rounded-lg glassmorphism transform-gpu transition-all duration-300",
                  message.type === 'user'
                    ? "ml-12 border-blue-500/20 hover:border-blue-500/40"
                    : "mr-12 border-teal-500/20 hover:border-teal-500/40"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-primary">
                    {message.type === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <div className="flex items-center gap-2">
                    {message.type === 'ai' && message.confidence && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-950/30 border border-blue-500/30">
                        {(message.confidence * 100).toFixed(1)}% confidence
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{message.content}</p>
                {message.type === 'ai' && message.sentiment && (
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Sentiment Analysis</span>
                      <span className={`text-xs font-medium ${
                        message.sentiment.label === 'positive' ? 'text-green-400' :
                        message.sentiment.label === 'negative' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {message.sentiment.label.charAt(0).toUpperCase() + message.sentiment.label.slice(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          message.sentiment.label === 'positive' ? 'bg-green-400' :
                          message.sentiment.label === 'negative' ? 'bg-red-400' :
                          'bg-gray-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${message.sentiment.score * 100}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.sentiment.keywords.map((keyword, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-1 rounded-full bg-blue-950/20 border border-blue-500/20"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-2 p-4"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                </div>
                <span className="text-sm text-gray-400">AI is analyzing...</span>
              </motion.div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about market trends, stock analysis, or trading strategies..."
              className={cn(
                "flex-1 glassmorphism border-primary/20 focus:border-primary/40",
                "transition-all duration-300 ease-out transform-gpu",
                "placeholder:text-gray-500"
              )}
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "bg-primary/20 hover:bg-primary/30",
                "border border-primary/40 hover:border-primary/60",
                "text-primary transition-all duration-300",
                "transform-gpu hover:scale-105"
              )}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </motion.div>

      {/* Technical Indicators */}
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
          <h3 className="text-lg font-semibold mb-4 text-primary">Technical Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-primary mb-2">RSI</h4>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      stroke="#64748b"
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      stroke="#64748b"
                      ticks={[0, 30, 70, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #1e293b',
                        borderRadius: '0.375rem'
                      }}
                      labelStyle={{ color: '#94a3b8' }}
                      itemStyle={{ color: '#e2e8f0' }}
                      formatter={(value: number) => `${value.toFixed(2)}`}
                    />
                    <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                    <ReferenceLine y={30} stroke="#10b981" strokeDasharray="3 3" />
                    <Line 
                      type="monotone" 
                      dataKey="technicalIndicators.rsi" 
                      stroke="#8b5cf6"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                RSI measures momentum on a scale of 0 to 100. Values above 70 indicate overbought conditions, while values below 30 suggest oversold conditions.
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-primary mb-2">MACD</h4>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      stroke="#64748b"
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
                      formatter={(value: number) => `${value.toFixed(4)}`}
                    />
                    <Bar 
                      dataKey="technicalIndicators.histogram" 
                      fill="#8b5cf6"
                      opacity={0.5}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="technicalIndicators.signal" 
                      stroke="#ef4444"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="technicalIndicators.macd" 
                      stroke="#10b981"
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                MACD helps identify trend direction and momentum. The histogram shows the difference between MACD and its signal line.
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stock Screening Results */}
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
          <h3 className="text-lg font-semibold mb-4 text-primary">Stock Screening</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={screeningResults}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="symbol" stroke="#64748b" />
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
                  <Bar dataKey="score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {screeningResults.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: i * 0.1 + 0.3
                  }}
                  className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/20"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-primary">{result.symbol}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        result.score >= 80 ? 'bg-green-950/20 border border-green-500/20 text-green-400' :
                        result.score >= 70 ? 'bg-yellow-950/20 border border-yellow-500/20 text-yellow-400' :
                        'bg-red-950/20 border border-red-500/20 text-red-400'
                      }`}>
                        Score: {result.score}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          result.score >= 80 ? 'bg-green-400' :
                          result.score >= 70 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: i * 0.1 + 0.4
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
                    <span>Volume: {result.volume.toLocaleString()}</span>
                    <span>Last Updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Market Sentiment Analysis */}
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
          <h3 className="text-lg font-semibold mb-4 text-primary">Market Sentiment Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <HeatMap
              data={messages
                .filter(m => m.type === 'ai' && m.sentiment)
                .map(m => ({
                  timestamp: m.timestamp,
                  sentiment: m.sentiment!.label,
                  score: m.sentiment!.score,
                  keywords: m.sentiment!.keywords
                }))}
              colors={{
                positive: '#10b981',
                neutral: '#64748b',
                negative: '#ef4444'
              }}
            />
            <div className="space-y-4">
              <div className="text-sm text-gray-400 mb-4">
                Real-time sentiment analysis based on market data, news, and social media trends
              </div>
              {messages
                .filter(m => m.type === 'ai' && m.sentiment)
                .slice(-3)
                .map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1
                    }}
                    className={`p-3 rounded-lg ${
                      message.sentiment?.label === 'positive' ? 'bg-green-950/20 border border-green-500/20' :
                      message.sentiment?.label === 'negative' ? 'bg-red-950/20 border border-red-500/20' :
                      'bg-blue-950/20 border border-blue-500/20'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        message.sentiment?.label === 'positive' ? 'bg-green-950/30 text-green-400' :
                        message.sentiment?.label === 'negative' ? 'bg-red-950/30 text-red-400' :
                        'bg-blue-950/30 text-blue-400'
                      }`}>
                        {message.sentiment?.label.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{message.content}</p>
                  </motion.div>
                ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Research Report */}
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary">AI Research Report</h3>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-400">Auto-generated</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/20">
              <h4 className="text-sm font-medium text-primary mb-2">Market Overview</h4>
              <p className="text-sm text-gray-300">
                Based on our AI analysis, market sentiment remains cautiously optimistic with a bullish bias. 
                Key technical indicators suggest potential upside momentum, while fundamental metrics indicate 
                strong earnings growth across major sectors.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/20">
              <h4 className="text-sm font-medium text-primary mb-2">Top Opportunities</h4>
              <div className="space-y-2">
                {screeningResults.slice(0, 3).map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1 + 0.4
                    }}
                    className="flex justify-between items-center p-2 rounded bg-blue-950/30"
                  >
                    <div>
                      <span className="text-sm font-medium text-primary">{result.symbol}</span>
                      <span className="text-xs text-gray-400 ml-2">Score: {result.score}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">Strong Buy</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/20">
              <h4 className="text-sm font-medium text-primary mb-2">Risk Analysis</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">Market Risk</div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <motion.div
                      className="h-1.5 rounded-full bg-yellow-400"
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.5
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">Volatility</div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <motion.div
                      className="h-1.5 rounded-full bg-red-400"
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.6
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
