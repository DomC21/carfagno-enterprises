// Component imports
import { motion } from "framer-motion"
import { Card } from "../../ui/card"
import { Bot } from "lucide-react"

interface AISummary {
  type: "technical" | "fundamental" | "sentiment"
  title: string
  summary: string
  confidence: number
  timestamp: string
}

const mockSummaries: AISummary[] = [
  {
    type: "technical",
    title: "Technical Analysis",
    summary: "Multiple technical indicators suggest bullish momentum. RSI shows room for upside, MACD indicates positive trend continuation, and price action remains above key moving averages.",
    confidence: 85,
    timestamp: "2 mins ago"
  },
  {
    type: "fundamental",
    title: "Fundamental Overview",
    summary: "Strong earnings growth with a 15% YoY increase. Healthy balance sheet showing 2.5x cash-to-debt ratio. Market share expansion in key segments continues to drive revenue growth.",
    confidence: 92,
    timestamp: "5 mins ago"
  },
  {
    type: "sentiment",
    title: "Market Sentiment",
    summary: "Positive institutional flow with significant dark pool accumulation. Social sentiment metrics trending upward. Options flow suggests bullish positioning for upcoming catalysts.",
    confidence: 78,
    timestamp: "8 mins ago"
  }
]

export function AISummariesDemo() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {mockSummaries.map((summary, index) => (
          <motion.div
            key={summary.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 bg-black/30 border-teal-500/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold text-white">{summary.title}</h3>
                    <span className="text-sm text-white/50">{summary.timestamp}</span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    {summary.summary}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/50">AI Confidence:</span>
                    <span className={`text-sm font-medium ${
                      summary.confidence >= 85 ? "text-green-400" :
                      summary.confidence >= 70 ? "text-yellow-400" :
                      "text-red-400"
                    }`}>
                      {summary.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center text-sm text-white/50">
        Demo data - AI-generated insights
      </div>
    </div>
  )
}
