import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { animationClasses } from '../utils/styles'
import { StockData, AnimationProps } from '../types/animation'
import { useAnimationControl } from '../hooks/use-animation-control'
import { api } from '../lib/api'
import { cn } from '../lib/utils'

const initialStocks: StockData[] = [
  { symbol: 'AAPL', price: 182.63, previousClose: 182.63, change: 0 },
  { symbol: 'MSFT', price: 403.78, previousClose: 403.78, change: 0 },
  { symbol: 'NVDA', price: 621.45, previousClose: 621.45, change: 0 },
  { symbol: 'GOOGL', price: 142.02, previousClose: 142.02, change: 0 },
  { symbol: 'META', price: 149.68, previousClose: 149.68, change: 0 }
];

const StockMarketAnimationComponent = ({ className }: AnimationProps) => {
  const { isVisible, shouldReduceMotion } = useAnimationControl()
  const [stocks, setStocks] = useState<StockData[]>(initialStocks)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchStockData = useCallback(async () => {
    try {
      const response = await api.get('/api/market-data')
      const data = response.data
      if (mountedRef.current) {
        setStocks(prevStocks => 
          prevStocks.map(stock => {
            const newData = data[stock.symbol]
            if (!newData) return stock
            return {
              ...stock,
              price: newData.price,
              previousClose: newData.previousClose,
              change: ((newData.price - newData.previousClose) / newData.previousClose) * 100
            }
          })
        )
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error('Failed to fetch market data:', err)
        setError('Unable to fetch real-time market data')
        // Fallback to simulated data
        setStocks(prev => {
          const newStocks = [...prev]
          newStocks.forEach(stock => {
            stock.price *= (1 + (Math.random() - 0.5) * 0.02)
            stock.change = (stock.price - stock.previousClose) / stock.previousClose * 100
          })
          return newStocks
        })
      }
    }
  }, [])
  
  useEffect(() => {
    if (!isVisible || shouldReduceMotion) return
    
    fetchStockData() // Initial fetch
    const interval = setInterval(fetchStockData, 10000) // Update every 10 seconds
    
    return () => clearInterval(interval)
  }, [isVisible, shouldReduceMotion, fetchStockData])
  
  if (!isVisible || shouldReduceMotion) return null

  return (
    <div className={cn("overflow-hidden whitespace-nowrap fixed top-0 left-0 right-0", className)}>
      <div className={cn("py-2 px-4 bg-black/50 backdrop-blur-sm", animationClasses.stockTicker)}>
        {error ? (
          <span className="text-yellow-400/90 px-4 animate-pulse">{error}</span>
        ) : (
          stocks.map((stock, i) => (
            <span key={i} className="inline-flex items-center mx-4 hover:scale-105 transition-transform">
              <span className="font-mono text-white/90">{stock.symbol}</span>
              <span className={cn("ml-2", stock.change >= 0 ? "text-green-400" : "text-red-400")}>
                ${stock.price.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%)
              </span>
            </span>
          ))
        )}
      </div>
    </div>
  )
}

export const StockMarketAnimation = memo(StockMarketAnimationComponent)
