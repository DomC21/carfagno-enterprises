import React from "react"
import { motion } from "framer-motion"
import { Card } from "../../ui/card"

interface Quote {
  symbol: string
  price: number
  change: number
  volume: number
  marketCap: string
  peRatio: number
}

const mockQuotes: Quote[] = [
  {
    symbol: "AAPL",
    price: 175.84,
    change: 2.31,
    volume: 52436789,
    marketCap: "2.89T",
    peRatio: 28.5
  },
  {
    symbol: "MSFT",
    price: 402.56,
    change: -1.24,
    volume: 23567890,
    marketCap: "3.01T",
    peRatio: 34.2
  },
  {
    symbol: "GOOGL",
    price: 142.89,
    change: 0.78,
    volume: 18234567,
    marketCap: "1.82T",
    peRatio: 25.7
  }
]

export function RealTimeQuotesDemo() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockQuotes.map((quote) => (
          <motion.div
            key={quote.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 bg-black/30 border-teal-500/20">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{quote.symbol}</h3>
                <span className={`text-sm font-medium ${quote.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)}%
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-4">
                ${quote.price.toFixed(2)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-white/50">Volume</span>
                  <div className="text-white font-medium">
                    {(quote.volume / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div>
                  <span className="text-white/50">Market Cap</span>
                  <div className="text-white font-medium">{quote.marketCap}</div>
                </div>
                <div>
                  <span className="text-white/50">P/E Ratio</span>
                  <div className="text-white font-medium">{quote.peRatio}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center text-sm text-white/50">
        Demo data - Refreshes every 5 seconds
      </div>
    </div>
  )
}
