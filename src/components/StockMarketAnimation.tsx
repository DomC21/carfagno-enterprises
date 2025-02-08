import { useEffect, useState, memo } from 'react'
import { animationClasses } from '../utils/styles'
import { StockData, AnimationProps } from '../types/animation'
import { useAnimationControl } from '../hooks/use-animation-control'

const initialStocks: StockData[] = [
  { symbol: 'AAPL', price: 182.63, previousClose: 182.63, change: 0 },
  { symbol: 'MSFT', price: 403.78, previousClose: 403.78, change: 0 },
  { symbol: 'NVDA', price: 621.45, previousClose: 621.45, change: 0 },
  { symbol: 'GOOGL', price: 142.02, previousClose: 142.02, change: 0 },
  { symbol: 'META', price: 149.68, previousClose: 149.68, change: 0 }
];

const StockMarketAnimationComponent = ({}: AnimationProps) => {
  const { isVisible, shouldReduceMotion } = useAnimationControl()
  const [stocks, setStocks] = useState<StockData[]>(initialStocks)
  
  if (!isVisible || shouldReduceMotion) return null
  
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

export const StockMarketAnimation = memo(StockMarketAnimationComponent)
