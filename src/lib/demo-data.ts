// Data simulation utilities

// Types for data simulation
export interface TrainingDataPoint {
  timestamp: number
  features: number[]
  target: number
  accuracy: number
}

export interface OptionsData {
  strike: number
  expiry: string
  price: number
  delta: number
  gamma: number
  theta: number
  vega: number
  volume: number
  openInterest: number
}

export interface StockData {
  symbol: string
  price: number
  change: number
  volume: number
  indicators: {
    rsi: number
    macd: number
    sma: number
  }
}

// Neural Networks data simulation
export const generateTrainingData = (numPoints: number = 100): TrainingDataPoint[] => {
  const now = Date.now()
  return Array.from({ length: numPoints }, (_, i) => {
    const features = Array.from({ length: 5 }, () => Math.random())
    const target = features.reduce((a, b) => a + b) / features.length
    return {
      timestamp: now - (numPoints - i) * 60000, // One minute intervals
      features,
      target,
      accuracy: 0.85 + Math.random() * 0.1 // Random accuracy between 85-95%
    }
  })
}

// Lukz data simulation
export const generateOptionsData = (numStrikes: number = 10): OptionsData[] => {
  const basePrice = 100
  const strikes = Array.from({ length: numStrikes }, (_, i) => basePrice - 20 + i * 4)
  
  return strikes.map(strike => {
    const distanceFromBase = Math.abs(strike - basePrice)
    return {
      strike,
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days out
      price: Math.max(0, basePrice - strike) + 2 + Math.random() * 2,
      delta: Math.max(-1, Math.min(1, 1 - distanceFromBase / basePrice)),
      gamma: Math.max(0, 0.1 - distanceFromBase / basePrice / 10),
      theta: -0.1 - Math.random() * 0.1,
      vega: Math.max(0, 0.2 - distanceFromBase / basePrice / 5),
      volume: Math.floor(Math.random() * 1000),
      openInterest: Math.floor(Math.random() * 5000)
    }
  })
}

// Zom AI data simulation
export const generateStockData = (numStocks: number = 20): StockData[] => {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'AMD', 'INTC', 'NFLX',
                  'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'V', 'MA', 'PYPL', 'SQ']
  
  return symbols.slice(0, numStocks).map(symbol => {
    const basePrice = 100 + Math.random() * 400
    const change = (Math.random() * 10 - 5)
    return {
      symbol,
      price: basePrice,
      change,
      volume: Math.floor(Math.random() * 1000000),
      indicators: {
        rsi: 30 + Math.random() * 40, // RSI between 30-70
        macd: Math.random() * 2 - 1, // MACD between -1 and 1
        sma: basePrice * (1 + (Math.random() * 0.1 - 0.05)) // SMA within 5% of price
      }
    }
  })
}

// Helper function to simulate real-time data updates
export const simulateDataStream = <T>(
  generator: () => T[],
  interval: number = 1000,
  callback: (data: T[]) => void
): () => void => {
  const intervalId = setInterval(() => {
    callback(generator())
  }, interval)
  
  return () => clearInterval(intervalId)
}
