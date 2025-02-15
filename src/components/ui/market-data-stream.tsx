

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TickerData {
  symbol: string
  price: number
  change: number
}

const streamAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20
  }
}

export function MarketDataStream() {
  const [tickers, setTickers] = useState<TickerData[]>([
    { symbol: 'BTC', price: 48235.67, change: 2.5 },
    { symbol: 'ETH', price: 2891.44, change: 1.8 },
    { symbol: 'SPY', price: 478.12, change: -0.5 },
    { symbol: 'AAPL', price: 182.31, change: 1.2 },
    { symbol: 'MSFT', price: 402.15, change: 0.8 },
    { symbol: 'NVDA', price: 721.28, change: 3.1 },
    { symbol: 'GOOGL', price: 142.71, change: -0.7 },
    { symbol: 'AMZN', price: 171.81, change: 1.5 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(ticker => ({
        ...ticker,
        price: ticker.price * (1 + (Math.random() * 0.002 - 0.001)),
        change: ticker.change + (Math.random() * 0.4 - 0.2)
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-black/80 backdrop-blur-sm border-b border-border overflow-hidden z-50">
      <AnimatePresence>
        <div className="flex gap-8 animate-ticker whitespace-nowrap transform-gpu">
          {tickers.map((ticker, index) => (
            <motion.span
              key={`${ticker.symbol}-${index}`}
              initial={streamAnimation.initial}
              animate={streamAnimation.animate}
              exit={streamAnimation.exit}
              transition={streamAnimation.transition}
              className={`text-sm font-mono ${
                ticker.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {ticker.symbol} ${ticker.price.toFixed(2)} {ticker.change > 0 ? '▲' : '▼'}
            </motion.span>
          ))}
        </div>
        <div className="flex gap-8 animate-ticker-clone whitespace-nowrap absolute top-0 left-[100%] transform-gpu">
          {tickers.map((ticker, index) => (
            <motion.span
              key={`${ticker.symbol}-clone-${index}`}
              initial={streamAnimation.initial}
              animate={streamAnimation.animate}
              exit={streamAnimation.exit}
              transition={streamAnimation.transition}
              className={`text-sm font-mono ${
                ticker.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {ticker.symbol} ${ticker.price.toFixed(2)} {ticker.change > 0 ? '▲' : '▼'}
            </motion.span>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
