// Component uses JSX which implicitly imports React
import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { generateTradingPattern } from '../../utils/tradingPatterns'
import { useRealtimeData } from '../../hooks/useRealtimeData'

interface ChatGPTInsight {
  insight: string
  confidence: number
  type: 'technical' | 'fundamental'
}

interface InsightsPanelProps {
  symbol?: string
  price?: number
}

const generateMockInsights = (price: number): Record<string, ChatGPTInsight> => ({
  greekFlow: {
    insight: "Delta values indicate strong bullish momentum, particularly in tech sector. Gamma exposure suggests potential for accelerated moves.",
    confidence: 0.92,
    type: 'technical'
  },
  congress: {
    insight: "Recent congressional trading activity shows increased interest in technology sector, with multiple representatives initiating large positions.",
    confidence: 0.88,
    type: 'fundamental'
  },
  sentiment: {
    insight: "Social media sentiment analysis reveals growing bullish consensus among retail traders, with positive sentiment reaching 3-month highs.",
    confidence: 0.85,
    type: 'technical'
  },
  pattern: {
    insight: `Technical analysis indicates a potential ${generateTradingPattern(price).type} pattern forming, suggesting a possible move to $${generateTradingPattern(price).priceTarget.toFixed(2)}.`,
    confidence: generateTradingPattern(price).confidence,
    type: 'technical'
  }
})

export function InsightsPanel({ symbol = 'AAPL', price = 180.0 }: InsightsPanelProps) {
  const { data: insights, isLoading } = useRealtimeData(() => generateMockInsights(price), {
    interval: 5000
  })

  if (isLoading || !insights) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-blue-950/20 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-blue-950/20 rounded"></div>
            <div className="h-3 bg-blue-950/20 rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">AI Insights</h3>
        <div className="text-sm text-gray-400">{symbol}</div>
      </div>

      <div className="space-y-4">
        {Object.entries(insights).map(([key, insight]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className={`p-4 rounded-lg ${
              insight.type === 'technical' 
                ? 'bg-blue-950/20 border border-blue-500/20' 
                : 'bg-purple-950/20 border border-purple-500/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  insight.type === 'technical' ? 'bg-blue-400' : 'bg-purple-400'
                }`} />
                <span className="text-sm font-medium text-gray-400">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-12 rounded-full overflow-hidden bg-gray-800`}>
                  <div 
                    className={`h-full ${
                      insight.confidence >= 0.9 ? 'bg-green-500' :
                      insight.confidence >= 0.8 ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${insight.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">
                  {(insight.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300">{insight.insight}</p>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
