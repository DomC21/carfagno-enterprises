import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateStockData, simulateDataStream, type StockData } from '@/lib/demo-data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Lightbulb, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react'

interface AIInsight {
  type: 'technical' | 'fundamental' | 'sentiment' | 'pattern'
  title: string
  description: string
  confidence: number
  timestamp: number
  icon: keyof typeof icons
}

const icons = {
  Lightbulb,
  TrendingUp,
  TrendingDown,
  BarChart2
}

export function AIInsightsDemo() {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)
  const [stocks, setStocks] = useState<StockData[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([])

  useEffect(() => {
    const cleanup = simulateDataStream(
      () => generateStockData(10),
      2000,
      setStocks
    )
    return cleanup
  }, [])

  useEffect(() => {
    if (selectedStock) {
      // Generate simulated AI insights based on stock data
      const newInsights: AIInsight[] = [
        {
          type: 'technical',
          title: 'RSI Analysis',
          description: `${selectedStock.symbol}'s RSI at ${selectedStock.indicators.rsi.toFixed(1)} indicates ${
            selectedStock.indicators.rsi > 70 ? 'overbought conditions' :
            selectedStock.indicators.rsi < 30 ? 'oversold conditions' :
            'neutral momentum'
          }`,
          confidence: 0.85 + Math.random() * 0.1,
          timestamp: Date.now(),
          icon: 'BarChart2'
        },
        {
          type: 'pattern',
          title: 'Price Pattern',
          description: `Detected a potential ${
            selectedStock.change > 0 ? 'bullish' : 'bearish'
          } trend forming with ${Math.abs(selectedStock.change).toFixed(1)}% movement`,
          confidence: 0.75 + Math.random() * 0.15,
          timestamp: Date.now(),
          icon: selectedStock.change > 0 ? 'TrendingUp' : 'TrendingDown'
        },
        {
          type: 'fundamental',
          title: 'Volume Analysis',
          description: `Unusual volume activity detected: ${
            (selectedStock.volume / 1000000).toFixed(1)
          }M shares traded, suggesting increased institutional interest`,
          confidence: 0.8 + Math.random() * 0.1,
          timestamp: Date.now(),
          icon: 'Lightbulb'
        }
      ]
      setInsights(newInsights)
    }
  }, [selectedStock])

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">AI-Driven Insights</h3>
      <p className="text-gray-300 mb-6">Real-time AI analysis of market patterns and trends</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Select
            value={selectedStock?.symbol}
            onValueChange={(value) => 
              setSelectedStock(stocks.find(s => s.symbol === value) || null)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a stock" />
            </SelectTrigger>
            <SelectContent>
              {stocks.map(stock => (
                <SelectItem key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} - ${stock.price.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedStock && (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { price: selectedStock.price * 0.95, time: -4 },
                  { price: selectedStock.price * 0.98, time: -3 },
                  { price: selectedStock.price * 0.97, time: -2 },
                  { price: selectedStock.price * 1.01, time: -1 },
                  { price: selectedStock.price, time: 0 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
                  <XAxis 
                    dataKey="time"
                    stroke="rgba(148, 163, 184, 0.5)"
                    tickFormatter={(value) => `${Math.abs(value)}m ago`}
                  />
                  <YAxis 
                    stroke="rgba(148, 163, 184, 0.5)"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(45, 212, 191, 0.2)',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: 'rgba(148, 163, 184, 1)' }}
                  />
                  <Line 
                    type="monotone"
                    dataKey="price"
                    stroke="rgba(45, 212, 191, 1)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = icons[insight.icon]
            return (
              <motion.div
                key={`${insight.type}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="text-teal-400 font-medium">
                        {insight.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {(insight.confidence * 100).toFixed(0)}% confidence
                      </div>
                    </div>
                    <div className="text-gray-300 mt-1">
                      {insight.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          {!selectedStock && (
            <div className="text-gray-400 text-center py-4">
              Select a stock to view AI insights
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
