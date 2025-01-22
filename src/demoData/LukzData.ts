// Types for Lukz data
type GreekFlowData = {
  timestamp: string
  symbol: string
  delta: number // Stock price sensitivity
  gamma: number // Delta change rate
  theta: number // Time decay
  vega: number // Volatility sensitivity
  volume: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  confidence: number
}

type CongressionalTrade = {
  date: string
  representative: string
  symbol: string
  type: 'BUY' | 'SELL'
  amount: string
  sector: string
  committee?: string
  disclosure_date?: string
}

// Generate mock Greek flow data
const generateGreekFlowData = (): GreekFlowData[] => {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'NVDA']
  return symbols.map(symbol => {
    const delta = Number((Math.random() * 2 - 1).toFixed(3))
    const sentiment = delta > 0.3 ? 'bullish' : delta < -0.3 ? 'bearish' : 'neutral'
    return {
      timestamp: new Date().toLocaleTimeString(),
      symbol,
      delta,
      gamma: Number((Math.random() * 0.1).toFixed(4)),
      theta: Number((-Math.random() * 0.5).toFixed(3)),
      vega: Number((Math.random() * 0.3).toFixed(3)),
      volume: Math.floor(1000 + Math.random() * 9000),
      sentiment,
      confidence: Number((0.7 + Math.random() * 0.3).toFixed(2))
    }
  })
}

// Generate mock Congressional trade data
const generateCongressionalTrades = (): CongressionalTrade[] => {
  const trades: CongressionalTrade[] = [
    {
      date: '2024-01-15',
      representative: 'Rep. Smith',
      symbol: 'AAPL',
      type: 'BUY',
      amount: '$50,000-$100,000',
      sector: 'Technology'
    },
    {
      date: '2024-01-18',
      representative: 'Sen. Johnson',
      symbol: 'XOM',
      type: 'SELL',
      amount: '$100,000-$250,000',
      sector: 'Energy'
    },
    {
      date: '2024-01-22',
      representative: 'Rep. Davis',
      symbol: 'PFE',
      type: 'BUY',
      amount: '$15,000-$50,000',
      sector: 'Healthcare'
    },
    {
      date: '2024-01-25',
      representative: 'Sen. Wilson',
      symbol: 'MSFT',
      type: 'BUY',
      amount: '$250,000-$500,000',
      sector: 'Technology'
    }
  ]
  return trades
}

export const greekFlowMockData = generateGreekFlowData()
export const congressionalTradeMockData = generateCongressionalTrades()
