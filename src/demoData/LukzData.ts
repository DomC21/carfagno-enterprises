import { faker } from '@faker-js/faker'
import { generateRandomSymbol, generateRelatedSymbols } from '../utils/symbolGenerator'

export interface GreekFlowData {
  id: string
  timestamp: string
  symbol: string
  delta: number // Stock price sensitivity
  gamma: number // Delta change rate
  theta: number // Time decay
  vega: number // Volatility sensitivity
  rho: number // Interest rate sensitivity
  volume: number
  openInterest: number
  impliedVolatility: number
  historicalVolatility: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  confidence: number
  sector: string
  marketCap: number
  beta: number
  correlations: Record<string, number>
}

export interface CongressionalTrade {
  id: string
  date: string
  representative: string
  symbol: string
  type: 'BUY' | 'SELL'
  amount: string
  sector: string
  committee: string
  disclosure_date: string
  party: 'D' | 'R' | 'I'
  state: string
  historicalTrades: number
  successRate: number
  avgHoldingPeriod: number
  relatedBills: string[]
  confidence: number
}

export interface EarningsReport {
  id: string
  symbol: string
  date: string
  timeOfDay: 'pre-market' | 'after-hours'
  expectedEPS: number
  actualEPS: number
  surprise: number
  priceChange: number
  volume: number
  sector: string
  revenue: {
    expected: number
    actual: number
    growth: number
  }
  guidance: {
    eps: { low: number; high: number }
    revenue: { low: number; high: number }
  }
  metrics: {
    grossMargin: number
    operatingMargin: number
    netMargin: number
    fcf: number
  }
  callTranscript?: string
  analystRatings: {
    buy: number
    hold: number
    sell: number
  }
  confidence: number
}

export interface InsiderTrade {
  id: string
  date: string
  symbol: string
  insider_name: string
  title: string
  type: 'BUY' | 'SELL'
  shares: number
  price_per_share: number
  total_value: number
  sector: string
  historicalTrades: {
    date: string
    type: 'BUY' | 'SELL'
    shares: number
    price: number
  }[]
  relationToEarnings: number // days before/after earnings
  stockPerformance: {
    oneDay: number
    oneWeek: number
    oneMonth: number
  }
  confidence: number
}

export interface PremiumFlowData {
  id: string
  timestamp: string
  symbol: string
  sector: string
  expiry: string
  strike: number
  type: 'call' | 'put'
  callVolume: number
  putVolume: number
  openInterest: number
  premium: number
  impliedVolatility: number
  greeks: {
    delta: number
    gamma: number
    theta: number
    vega: number
    rho: number
  }
  unusualActivity: boolean
  historicalVolume: number[]
  priceAction: {
    current: number
    open: number
    high: number
    low: number
  }
  sentiment: 'bullish' | 'bearish' | 'neutral'
  confidence: number
}

export interface ChatGPTInsight {
  id: string
  timestamp: string
  symbol: string
  insight: string
  type: 'technical' | 'fundamental' | 'sentiment'
  confidence: number
  sources: string[]
  relatedSymbols: string[]
  metrics: {
    sentiment: number
    momentum: number
    volatility: number
  }
  historicalAccuracy: number
  validUntil: string
  tags: string[]
}

// Generate mock Greek flow data
export const generateGreekFlowData = (count: number = 5): GreekFlowData[] => {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'NVDA']
  const sectors = ['Technology', 'Technology', 'Technology', 'Consumer', 'Technology']
  
  return Array.from({ length: count }, (_, i) => {
    const index = i % symbols.length
    const delta = faker.number.float({ min: -1, max: 1, fractionDigits: 3 })
    const sentiment = delta > 0.3 ? 'bullish' : delta < -0.3 ? 'bearish' : 'neutral'
    
    return {
      id: faker.string.uuid(),
      timestamp: new Date().toISOString(),
      symbol: symbols[index],
      delta,
      gamma: faker.number.float({ min: 0, max: 0.2, fractionDigits: 4 }),
      theta: faker.number.float({ min: -1, max: 0, fractionDigits: 3 }),
      vega: faker.number.float({ min: 0, max: 1, fractionDigits: 3 }),
      rho: faker.number.float({ min: -0.5, max: 0.5, fractionDigits: 3 }),
      volume: faker.number.int({ min: 1000, max: 100000 }),
      openInterest: faker.number.int({ min: 5000, max: 500000 }),
      impliedVolatility: faker.number.float({ min: 0.1, max: 1, fractionDigits: 3 }),
      historicalVolatility: faker.number.float({ min: 0.1, max: 1, fractionDigits: 3 }),
      sentiment,
      confidence: faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 }),
      sector: sectors[index],
      marketCap: faker.number.int({ min: 1e8, max: 1e12 }),
      beta: faker.number.float({ min: 0.5, max: 2, fractionDigits: 2 }),
      correlations: symbols.reduce((acc, sym) => ({
        ...acc,
        [sym]: faker.number.float({ min: -1, max: 1, fractionDigits: 2 })
      }), {})
    }
  })
}

// Generate mock Congressional trade data
export const generateCongressionalTrades = (count: number = 10): CongressionalTrade[] => {
  const committees = [
    'Finance Committee',
    'Banking Committee',
    'Budget Committee',
    'Ways and Means Committee'
  ]
  const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'MA']
  const parties = ['D', 'R', 'I'] as const

  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    representative: faker.person.fullName(),
    symbol: generateRandomSymbol(),
    type: faker.helpers.arrayElement(['BUY', 'SELL']),
    amount: `$${faker.number.int({ min: 10000, max: 1000000 }).toLocaleString()}-${faker.number.int({ min: 1000000, max: 5000000 }).toLocaleString()}`,
    sector: faker.helpers.arrayElement(['Technology', 'Healthcare', 'Finance', 'Energy']),
    committee: faker.helpers.arrayElement(committees),
    disclosure_date: faker.date.recent().toISOString(),
    party: faker.helpers.arrayElement(parties),
    state: faker.helpers.arrayElement(states),
    historicalTrades: faker.number.int({ min: 0, max: 50 }),
    successRate: faker.number.float({ min: 0.3, max: 0.9, fractionDigits: 2 }),
    avgHoldingPeriod: faker.number.int({ min: 30, max: 365 }),
    relatedBills: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.lorem.sentence()
    ),
    confidence: faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 })
  }))
}

// Generate mock earnings report data
export const generateEarningsReports = (count: number = 5): EarningsReport[] => {
  return Array.from({ length: count }, () => {
    const expectedEPS = faker.number.float({ min: 0.5, max: 5, fractionDigits: 2 })
    const actualEPS = expectedEPS * faker.number.float({ min: 0.8, max: 1.2, fractionDigits: 2 })
    const expectedRevenue = faker.number.int({ min: 1e8, max: 1e10 })
    const actualRevenue = expectedRevenue * faker.number.float({ min: 0.8, max: 1.2, fractionDigits: 2 })
    
    return {
      id: faker.string.uuid(),
      symbol: generateRandomSymbol(),
      date: faker.date.recent().toISOString(),
      timeOfDay: faker.helpers.arrayElement(['pre-market', 'after-hours']),
      expectedEPS,
      actualEPS,
      surprise: ((actualEPS - expectedEPS) / expectedEPS) * 100,
      priceChange: faker.number.float({ min: -10, max: 10, fractionDigits: 1 }),
      volume: faker.number.int({ min: 1e5, max: 1e7 }),
      sector: faker.helpers.arrayElement(['Technology', 'Healthcare', 'Finance', 'Energy']),
      revenue: {
        expected: expectedRevenue,
        actual: actualRevenue,
        growth: faker.number.float({ min: -20, max: 50, fractionDigits: 1 })
      },
      guidance: {
        eps: {
          low: actualEPS * 0.9,
          high: actualEPS * 1.1
        },
        revenue: {
          low: actualRevenue * 0.9,
          high: actualRevenue * 1.1
        }
      },
      metrics: {
        grossMargin: faker.number.float({ min: 0.2, max: 0.8, fractionDigits: 2 }),
        operatingMargin: faker.number.float({ min: 0.1, max: 0.4, fractionDigits: 2 }),
        netMargin: faker.number.float({ min: 0.05, max: 0.3, fractionDigits: 2 }),
        fcf: faker.number.int({ min: 1e7, max: 1e9 })
      },
      callTranscript: faker.lorem.paragraphs(3),
      analystRatings: {
        buy: faker.number.int({ min: 5, max: 30 }),
        hold: faker.number.int({ min: 2, max: 15 }),
        sell: faker.number.int({ min: 0, max: 10 })
      },
      confidence: faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 })
    }
  })
}

// Generate mock insider trading data
export const generateInsiderTrades = (count: number = 5): InsiderTrade[] => {
  return Array.from({ length: count }, () => {
    const shares = faker.number.int({ min: 1000, max: 100000 })
    const price = faker.number.float({ min: 10, max: 1000, fractionDigits: 2 })
    const type = faker.helpers.arrayElement(['BUY', 'SELL'])
    
    return {
      id: faker.string.uuid(),
      date: faker.date.recent().toISOString(),
      symbol: generateRandomSymbol(),
      insider_name: faker.person.fullName(),
      title: faker.helpers.arrayElement(['CEO', 'CFO', 'CTO', 'Director', 'VP']),
      type,
      shares,
      price_per_share: price,
      total_value: shares * price,
      sector: faker.helpers.arrayElement(['Technology', 'Healthcare', 'Finance', 'Energy']),
      historicalTrades: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        date: faker.date.past().toISOString(),
        type: faker.helpers.arrayElement(['BUY', 'SELL']),
        shares: faker.number.int({ min: 1000, max: 100000 }),
        price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 })
      })),
      relationToEarnings: faker.number.int({ min: -30, max: 30 }),
      stockPerformance: {
        oneDay: faker.number.float({ min: -5, max: 5, fractionDigits: 1 }),
        oneWeek: faker.number.float({ min: -10, max: 10, fractionDigits: 1 }),
        oneMonth: faker.number.float({ min: -20, max: 20, fractionDigits: 1 })
      },
      confidence: faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 })
    }
  })
}

// Generate mock premium flow data
export const generatePremiumFlow = (count: number = 10): PremiumFlowData[] => {
  return Array.from({ length: count }, () => {
    const basePrice = faker.number.float({ min: 50, max: 500, fractionDigits: 2 })
    const type = faker.helpers.arrayElement(['call', 'put'])
    const callVolume = faker.number.int({ min: 100, max: 10000 })
    const putVolume = faker.number.int({ min: 100, max: 10000 })
    const historicalVolume = Array.from({ length: 10 }, () => 
      faker.number.int({ min: 50, max: 15000 })
    )
    
    return {
      id: faker.string.uuid(),
      timestamp: new Date().toISOString(),
      symbol: generateRandomSymbol(),
      sector: faker.helpers.arrayElement(['Technology', 'Healthcare', 'Finance', 'Energy']),
      expiry: faker.date.future().toISOString(),
      strike: basePrice * faker.number.float({ min: 0.8, max: 1.2 }),
      type,
      callVolume,
      putVolume,
      openInterest: faker.number.int({ min: 1000, max: 50000 }),
      premium: faker.number.float({ min: 0.5, max: 10, fractionDigits: 2 }),
      impliedVolatility: faker.number.float({ min: 0.1, max: 1, fractionDigits: 2 }),
      greeks: {
        delta: type === 'call'
          ? faker.number.float({ min: 0, max: 1, fractionDigits: 2 })
          : faker.number.float({ min: -1, max: 0, fractionDigits: 2 }),
        gamma: faker.number.float({ min: 0, max: 0.2, fractionDigits: 3 }),
        theta: faker.number.float({ min: -1, max: 0, fractionDigits: 2 }),
        vega: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
        rho: faker.number.float({ min: -0.5, max: 0.5, fractionDigits: 2 })
      },
      unusualActivity: (callVolume + putVolume) > Math.max(...historicalVolume) * 1.5,
      historicalVolume,
      priceAction: {
        current: basePrice,
        open: basePrice * faker.number.float({ min: 0.98, max: 1.02 }),
        high: basePrice * faker.number.float({ min: 1.02, max: 1.05 }),
        low: basePrice * faker.number.float({ min: 0.95, max: 0.98 })
      },
      sentiment: faker.helpers.arrayElement(['bullish', 'bearish', 'neutral']),
      confidence: faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 })
    }
  })
}

// Generate mock insights
export const generateChatGPTInsights = (count: number = 5): ChatGPTInsight[] => {
  const technicalInsights = [
    'Strong bullish momentum with increasing volume',
    'Potential double bottom pattern forming',
    'RSI indicates oversold conditions',
    'MACD showing bullish crossover'
  ]

  const fundamentalInsights = [
    'Strong earnings growth expected next quarter',
    'Recent insider buying activity',
    'Positive analyst coverage with price target upgrades',
    'Expanding market share in key segments'
  ]

  const sentimentInsights = [
    'Social media sentiment trending positive',
    'Institutional investors increasing positions',
    'Growing retail investor interest',
    'Positive news coverage momentum'
  ]

  return Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(['technical', 'fundamental', 'sentiment'])
    const insights = type === 'technical'
      ? technicalInsights
      : type === 'fundamental'
      ? fundamentalInsights
      : sentimentInsights

    return {
      id: faker.string.uuid(),
      timestamp: faker.date.recent().toISOString(),
      symbol: generateRandomSymbol(),
      insight: faker.helpers.arrayElement(insights),
      type,
      confidence: faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 }),
      sources: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
        faker.helpers.arrayElement([
          'Market Data',
          'SEC Filings',
          'News Articles',
          'Social Media',
          'Technical Analysis'
        ])
      ),
      relatedSymbols: generateRelatedSymbols(faker.number.int({ min: 1, max: 3 })),
      metrics: {
        sentiment: faker.number.float({ min: -1, max: 1, fractionDigits: 2 }),
        momentum: faker.number.float({ min: -1, max: 1, fractionDigits: 2 }),
        volatility: faker.number.float({ min: 0, max: 1, fractionDigits: 2 })
      },
      historicalAccuracy: faker.number.float({ min: 0.6, max: 0.9, fractionDigits: 2 }),
      validUntil: faker.date.future().toISOString(),
      tags: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
        faker.helpers.arrayElement([
          'Momentum',
          'Value',
          'Growth',
          'Technical',
          'Fundamental',
          'Sentiment',
          'Options Flow',
          'Insider Activity'
        ])
      )
    }
  })
}

// Export initial mock data
export const greekFlowMockData = generateGreekFlowData(5)
export const congressionalTradeMockData = generateCongressionalTrades(10)
export const earningsReportMockData = generateEarningsReports(5)
export const insiderTradeMockData = generateInsiderTrades(5)
export const premiumFlowMockData = generatePremiumFlow(10)
export const mockInsights = {
  greekFlow: generateChatGPTInsights(1)[0],
  congress: generateChatGPTInsights(1)[0],
  earnings: generateChatGPTInsights(1)[0],
  insider: generateChatGPTInsights(1)[0],
  premiumFlow: generateChatGPTInsights(1)[0]
}
