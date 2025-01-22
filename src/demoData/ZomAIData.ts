// Types for Zom AI data
type StockAnalysis = {
  metric: string
  value: string | number
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
}

type AIInsight = {
  type: 'technical' | 'fundamental' | 'sentiment'
  insight: string
  confidence: number
  timestamp: string
}

// Generate mock stock analysis data
const generateStockAnalysis = (): StockAnalysis[] => {
  return [
    {
      metric: 'Price to Earnings (P/E)',
      value: 25.4,
      sentiment: 'neutral',
      confidence: 0.85
    },
    {
      metric: 'Revenue Growth (YoY)',
      value: '32.5%',
      sentiment: 'positive',
      confidence: 0.92
    },
    {
      metric: 'Profit Margin',
      value: '15.8%',
      sentiment: 'positive',
      confidence: 0.88
    },
    {
      metric: 'Debt to Equity',
      value: 1.2,
      sentiment: 'negative',
      confidence: 0.78
    },
    {
      metric: 'Cash Flow',
      value: '$2.5B',
      sentiment: 'positive',
      confidence: 0.95
    }
  ]
}

// Generate mock AI insights
const generateAIInsights = (): AIInsight[] => {
  return [
    {
      type: 'technical',
      insight: 'Strong bullish momentum indicated by MACD crossover and RSI trending upward',
      confidence: 0.89,
      timestamp: new Date().toLocaleString()
    },
    {
      type: 'fundamental',
      insight: 'Recent acquisitions and R&D investments suggest potential for significant market share growth',
      confidence: 0.85,
      timestamp: new Date().toLocaleString()
    },
    {
      type: 'sentiment',
      insight: 'Positive sentiment shift observed in social media and news coverage following earnings beat',
      confidence: 0.92,
      timestamp: new Date().toLocaleString()
    },
    {
      type: 'technical',
      insight: 'Support level established at $142.50 with increasing volume',
      confidence: 0.87,
      timestamp: new Date().toLocaleString()
    }
  ]
}

export const stockAnalysisMockData = generateStockAnalysis()
export const aiInsightsMockData = generateAIInsights()
