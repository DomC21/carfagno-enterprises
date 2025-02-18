import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
// Removed unused imports
import { generateStockData, simulateDataStream, type StockData } from '@/lib/demo-data'

interface FilterCriteria {
  minPrice: number
  maxPrice: number
  minVolume: number
  minRSI: number
  maxRSI: number
}

export function StockScreenerDemo() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([])
  const [filters, setFilters] = useState<FilterCriteria>({
    minPrice: 0,
    maxPrice: 1000,
    minVolume: 0,
    minRSI: 0,
    maxRSI: 100
  })

  useEffect(() => {
    const cleanup = simulateDataStream(
      () => generateStockData(20),
      2000,
      setStocks
    )
    return cleanup
  }, [])

  useEffect(() => {
    setFilteredStocks(stocks.filter(stock => 
      stock.price >= filters.minPrice &&
      stock.price <= filters.maxPrice &&
      stock.volume >= filters.minVolume &&
      stock.indicators.rsi >= filters.minRSI &&
      stock.indicators.rsi <= filters.maxRSI
    ))
  }, [stocks, filters])

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Interactive Stock Screener</h3>
      <p className="text-gray-300 mb-6">Filter and analyze stocks based on custom criteria</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Min Price</label>
              <Input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  minPrice: parseFloat(e.target.value) || 0 
                }))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Max Price</label>
              <Input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  maxPrice: parseFloat(e.target.value) || 0 
                }))}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Min Volume</label>
            <Input
              type="number"
              value={filters.minVolume}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                minVolume: parseFloat(e.target.value) || 0 
              }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Min RSI</label>
              <Input
                type="number"
                value={filters.minRSI}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  minRSI: parseFloat(e.target.value) || 0 
                }))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Max RSI</label>
              <Input
                type="number"
                value={filters.maxRSI}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  maxRSI: parseFloat(e.target.value) || 0 
                }))}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-4">
              Found {filteredStocks.length} matching stocks
            </div>
            <div className="space-y-3">
              {filteredStocks.map((stock) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between bg-blue-950/50 border border-teal-500/20 rounded-lg p-3"
                >
                  <div>
                    <div className="text-teal-400 font-medium">{stock.symbol}</div>
                    <div className="text-sm text-gray-400">
                      Vol: {stock.volume.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-300">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredStocks.length === 0 && (
                <div className="text-gray-400 text-center py-4">
                  No stocks match the current criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
