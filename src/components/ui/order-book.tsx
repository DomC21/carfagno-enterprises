import * as React from 'react'
import { motion } from 'framer-motion'
import { useRealtimeData } from '../../hooks/useRealtimeData'
import { cn } from '../../utils/styles'
import { Card } from './card'

interface OrderBookEntry {
  price: number
  size: number
  total: number
}

interface OrderBookProps {
  className?: string
  symbol?: string
}

export function OrderBook({ className, symbol = 'AAPL' }: OrderBookProps) {
  const { data, isLoading } = useRealtimeData(() => {
    const basePrice = 180 + Math.random() * 5
    
    const generateOrders = (count: number, isAsk: boolean): OrderBookEntry[] => {
      let total = 0
      return Array.from({ length: count }, (_, i) => {
        const offset = (i + 1) * (0.01 + Math.random() * 0.02)
        const price = isAsk ? basePrice + offset : basePrice - offset
        const size = Math.floor(100 + Math.random() * 900)
        total += size
        return {
          price,
          size,
          total
        }
      }).sort((a, b) => isAsk ? a.price - b.price : b.price - a.price)
    }

    return {
      bids: generateOrders(10, false),
      asks: generateOrders(10, true)
    }
  }, { interval: 1000 })

  if (isLoading || !data) {
    return (
      <Card className={cn("p-4", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-blue-950/20 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-blue-950/20 rounded"></div>
            <div className="h-3 bg-blue-950/20 rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    )
  }

  const maxTotal = Math.max(
    ...data.bids.map(bid => bid.total),
    ...data.asks.map(ask => ask.total)
  )

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary">Order Book</h3>
        <span className="text-sm text-gray-400">{symbol}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Bids */}
        <div className="space-y-1">
          <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
            <span>Price</span>
            <span className="text-right">Size</span>
            <span className="text-right">Total</span>
          </div>
          {data.bids.map((bid, i) => (
            <motion.div
              key={`${bid.price}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i * 0.05
              }}
              className="relative grid grid-cols-3 text-sm"
            >
              <div
                className="absolute inset-0 bg-green-500/20"
                style={{
                  width: `${(bid.total / maxTotal) * 100}%`,
                  zIndex: 0
                }}
              />
              <span className="relative z-10 text-green-400">
                ${bid.price.toFixed(2)}
              </span>
              <span className="relative z-10 text-right">
                {bid.size.toLocaleString()}
              </span>
              <span className="relative z-10 text-right text-gray-400">
                {bid.total.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Asks */}
        <div className="space-y-1">
          <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
            <span>Price</span>
            <span className="text-right">Size</span>
            <span className="text-right">Total</span>
          </div>
          {data.asks.map((ask, i) => (
            <motion.div
              key={`${ask.price}-${i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i * 0.05
              }}
              className="relative grid grid-cols-3 text-sm"
            >
              <div
                className="absolute inset-0 bg-red-500/20"
                style={{
                  width: `${(ask.total / maxTotal) * 100}%`,
                  zIndex: 0
                }}
              />
              <span className="relative z-10 text-red-400">
                ${ask.price.toFixed(2)}
              </span>
              <span className="relative z-10 text-right">
                {ask.size.toLocaleString()}
              </span>
              <span className="relative z-10 text-right text-gray-400">
                {ask.total.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        Real-time order book simulation with bid-ask spread visualization
      </div>
    </Card>
  )
}
