import { useEffect, useState } from 'react'
import { animationClasses } from '../utils/styles'
import { neuralNetworkMockData } from '../demoData/NeuralNetworksData'

interface StockData {
  symbol: string
  price: number
  previousClose: number
  change: number
}

const initialStocks: StockData[] = neuralNetworkMockData.slice(0, 10).map(data => ({
  symbol: `STOCK${Math.floor(Math.random() * 100)}`,
  price: data.actualPrice,
  previousClose: data.actualPrice,
  change: 0
}))

export function StockMarketAnimation() {
  const [stocks, setStocks] = useState<StockData[]>(initialStocks)
  
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
    <div className="overflow-hidden whitespace-nowrap z-10">
      <div className={animationClasses.stockTicker}>
        {stocks.map((stock, i) => (
          <span key={i} className="inline-flex items-center mx-4">
            <span className="font-mono text-white/80">{stock.symbol}</span>
            <span className={`ml-2 ${stock.change >= 0 ? 'text-green-400/90' : 'text-red-400/90'}`}>
              ${stock.price.toFixed(2)} ({stock.change.toFixed(2)}%)
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
