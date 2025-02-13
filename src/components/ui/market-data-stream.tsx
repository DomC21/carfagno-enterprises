import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface StockData {
  symbol: string
  price: string
  change: string
  isPositive: boolean
}

const generateRandomStockData = (): StockData[] => {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'AMD', 'INTC', 'NFLX']
  return symbols.map(symbol => {
    const price = (Math.random() * 500 + 50).toFixed(2)
    const change = (Math.random() * 10 - 5).toFixed(2)
    return {
      symbol,
      price: `$${price}`,
      change: `${change}%`,
      isPositive: parseFloat(change) > 0
    }
  })
}

export function MarketDataStream() {
  const [stockData, setStockData] = useState<StockData[]>(generateRandomStockData())

  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(generateRandomStockData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-950/95 backdrop-blur-sm border-b border-teal-500/20 overflow-hidden">
      <div className="relative flex whitespace-nowrap animate-ticker">
        {[...stockData, ...stockData].map((stock, index) => (
          <motion.div
            key={`${stock.symbol}-${index}`}
            className="inline-flex items-center space-x-2 px-4 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="font-medium text-sm text-gray-300">{stock.symbol}</span>
            <span className="text-sm text-gray-400">{stock.price}</span>
            <span className={`text-sm ${stock.isPositive ? 'text-teal-400' : 'text-red-400'}`}>
              {stock.isPositive ? '+' : ''}{stock.change}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
