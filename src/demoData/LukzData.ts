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

type EarningsReport = {
  symbol: string
  date: string
  timeOfDay: 'pre-market' | 'after-hours'
  expectedEPS: number
  actualEPS: number
  surprise: number
  priceChange: number
  volume: number
  sector: string
}

export type InsiderTrade = {
  date: string
  symbol: string
  insider_name: string
  title: string
  type: 'BUY' | 'SELL'
  shares: number
  price_per_share: number
  total_value: number
  sector: string
}

type PremiumFlowData = {
  timestamp: string
  symbol: string
  sector: string
  call_volume: number
  put_volume: number
  call_premium: number
  put_premium: number
  premium_ratio: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
}

type ChatGPTInsight = {
  insight: string
  confidence: number
  type: 'technical' | 'fundamental' | 'sentiment'
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

// Generate mock earnings report data
const generateEarningsReports = (): EarningsReport[] => {
  return [
    {
      symbol: 'AAPL',
      date: '2024-01-25',
      timeOfDay: 'after-hours',
      expectedEPS: 2.10,
      actualEPS: 2.18,
      surprise: 3.81,
      priceChange: 4.2,
      volume: 1250000,
      sector: 'Technology'
    },
    {
      symbol: 'MSFT',
      date: '2024-01-24',
      timeOfDay: 'after-hours',
      expectedEPS: 2.65,
      actualEPS: 2.93,
      surprise: 10.57,
      priceChange: 6.8,
      volume: 980000,
      sector: 'Technology'
    }
  ]
}

// Generate mock insider trading data
const generateInsiderTrades = (): InsiderTrade[] => {
  return [
    {
      date: '2024-01-20',
      symbol: 'TSLA',
      insider_name: 'John Smith',
      title: 'Director',
      type: 'BUY',
      shares: 5000,
      price_per_share: 218.75,
      total_value: 1093750,
      sector: 'Automotive'
    },
    {
      date: '2024-01-21',
      symbol: 'NVDA',
      insider_name: 'Sarah Johnson',
      title: 'CFO',
      type: 'SELL',
      shares: 2500,
      price_per_share: 547.90,
      total_value: 1369750,
      sector: 'Technology'
    }
  ]
}

// Generate mock premium flow data
const generatePremiumFlow = (): PremiumFlowData[] => {
  const symbols = ['SPY', 'QQQ', 'AAPL', 'MSFT']
  const sectors = ['ETF', 'ETF', 'Technology', 'Technology']
  
  return symbols.map((symbol, index) => ({
    timestamp: new Date().toLocaleTimeString(),
    symbol,
    sector: sectors[index],
    call_volume: Math.floor(5000 + Math.random() * 15000),
    put_volume: Math.floor(3000 + Math.random() * 12000),
    call_premium: Math.floor(1000000 + Math.random() * 3000000),
    put_premium: Math.floor(800000 + Math.random() * 2500000),
    premium_ratio: 1.2 + Math.random() * 0.5,
    sentiment: Math.random() > 0.5 ? 'bullish' : 'bearish'
  }))
}

// Generate mock insights
const generateMockInsights = (): Record<string, ChatGPTInsight> => ({
  greekFlow: {
    insight: "Delta values indicate strong bullish momentum in tech sector, particularly in AAPL and MSFT. Gamma exposure suggests potential for accelerated moves.",
    confidence: 0.92,
    type: 'technical'
  },
  congress: {
    insight: "Recent congressional trading activity shows increased interest in technology sector, with multiple representatives initiating large positions in MSFT.",
    confidence: 0.88,
    type: 'fundamental'
  },
  earnings: {
    insight: "Companies reporting positive earnings surprises are seeing stronger after-hours price movements compared to previous quarter.",
    confidence: 0.85,
    type: 'technical'
  },
  insider: {
    insight: "Notable increase in insider buying within the technology sector, particularly among C-level executives, suggesting strong internal confidence.",
    confidence: 0.90,
    type: 'fundamental'
  },
  premiumFlow: {
    insight: "Unusual call option activity in technology sector with premium ratios significantly above historical averages.",
    confidence: 0.87,
    type: 'sentiment'
  }
})

export const greekFlowMockData = generateGreekFlowData()
export const congressionalTradeMockData = generateCongressionalTrades()
export const earningsReportMockData = generateEarningsReports()
export const insiderTradeMockData = generateInsiderTrades()
export const premiumFlowMockData = generatePremiumFlow()
export const mockInsights = generateMockInsights()
