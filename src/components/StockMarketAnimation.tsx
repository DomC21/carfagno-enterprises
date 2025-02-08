import React, { useEffect, useState } from 'react'
import { animationClasses } from '../utils/styles'
import { neuralNetworkMockData } from '../demoData/NeuralNetworksData'

interface StockData {
  symbol: string
  price: number
  previousClose: number
  change: number
}

export function StockMarketAnimation() {
  const [stocks, setStocks] = useState<StockData[]>(neuralNetworkMockData.slice(0, 10))
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => {
        const newStocks = [...prev]
        newStocks.forEach(stock => {
          stock.price *= (1 + (Math.random() - 0.5) * 0.02)
          stock.change = (stock.price - stock.previousClose) / stock.previousClose * 100
        })
        return newStocks
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={animationClasses.stockTicker}>
        {stocks.map((stock, i) => (
          <span key={i} className="inline-flex items-center mx-4">
            <span className="font-mono text-white/70">{stock.symbol}</span>
            <span className={`ml-2 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${stock.price.toFixed(2)} ({stock.change.toFixed(2)}%)
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
