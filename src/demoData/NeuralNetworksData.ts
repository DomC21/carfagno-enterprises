// Types for Neural Network data
type DataPoint = {
  date: string
  actualPrice: number
  predictedPrice: number
  volume: number
  rsi: number // Relative Strength Index
  macd: number // Moving Average Convergence Divergence
}

// Generate 30 days of mock data
const generateMockData = (): DataPoint[] => {
  const basePrice = 150
  const data: DataPoint[] = []
  const volatility = 0.02 // 2% daily volatility
  
  let currentPrice = basePrice
  let predictedPrice = basePrice

  for (let i = 0; i < 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (30 - i))
    
    // Simulate price movements
    const priceChange = currentPrice * volatility * (Math.random() - 0.5)
    currentPrice += priceChange
    
    // Simulate predictions (slightly ahead of actual price)
    const predictionAccuracy = 0.8 // 80% accuracy
    const predictionError = currentPrice * volatility * (Math.random() - 0.5) * (1 - predictionAccuracy)
    predictedPrice = currentPrice + priceChange + predictionError

    // Generate mock technical indicators
    const volume = Math.floor(1000000 + Math.random() * 500000)
    const rsi = 30 + Math.random() * 40 // RSI between 30 and 70
    const macd = -2 + Math.random() * 4 // MACD between -2 and 2

    data.push({
      date: date.toLocaleDateString(),
      actualPrice: Number(currentPrice.toFixed(2)),
      predictedPrice: Number(predictedPrice.toFixed(2)),
      volume,
      rsi,
      macd
    })
  }

  return data
}

export const neuralNetworkMockData = generateMockData()
