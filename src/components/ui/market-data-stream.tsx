import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface DataPoint {
  symbol: string
  price: number
  change: number
  volume: string
  marketCap: string
}

// Initial market data with realistic values
const initialMarketData: DataPoint[] = [
  { symbol: 'BTC', price: 48250.75, change: 2.3, volume: '24.5B', marketCap: '934.2B' },
  { symbol: 'ETH', price: 2890.42, change: 1.7, volume: '15.8B', marketCap: '347.1B' },
  { symbol: 'AAPL', price: 182.31, change: -0.8, volume: '12.3B', marketCap: '2.85T' },
  { symbol: 'NVDA', price: 721.28, change: 3.2, volume: '18.7B', marketCap: '1.78T' },
  { symbol: 'MSFT', price: 415.32, change: 1.1, volume: '15.2B', marketCap: '3.12T' },
  { symbol: 'GOOGL', price: 142.56, change: -0.5, volume: '8.9B', marketCap: '1.82T' },
  { symbol: 'TSLA', price: 193.57, change: 4.2, volume: '22.1B', marketCap: '615.3B' },
  { symbol: 'META', price: 468.23, change: 2.8, volume: '13.4B', marketCap: '1.21T' }
]

export function MarketDataStream() {
  const [marketData, setMarketData] = useState(initialMarketData)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => 
        prevData.map(item => ({
          ...item,
          price: Number((item.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2)),
          change: Number((item.change + (Math.random() - 0.5) * 0.1).toFixed(2))
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden pointer-events-none">
      <div className="relative w-full bg-gradient-to-b from-background via-background/95 to-transparent">
        <div className="flex animate-ticker whitespace-nowrap py-3 bg-background/80 backdrop-blur-sm border-b border-border/20">
          {marketData.map((item, index) => (
            <motion.div
              key={`${item.symbol}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05
              }}
              className="flex items-center px-6 border-r border-border/10 last:border-r-0"
            >
              <span className="font-medium text-primary min-w-[4rem] text-center">{item.symbol}</span>
              <span className="text-gray-400 mx-4">${item.price.toLocaleString()}</span>
              <span className={`min-w-[4rem] text-center ${
                item.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex animate-ticker2 whitespace-nowrap py-3 bg-background/80 backdrop-blur-sm border-b border-border/20">
          {marketData.map((item, index) => (
            <motion.div
              key={`${item.symbol}-${index}-duplicate`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05
              }}
              className="flex items-center px-6 border-r border-border/10 last:border-r-0"
            >
              <span className="font-medium text-primary min-w-[4rem] text-center">{item.symbol}</span>
              <span className="text-gray-400 mx-4">${item.price.toLocaleString()}</span>
              <span className={`min-w-[4rem] text-center ${
                item.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
