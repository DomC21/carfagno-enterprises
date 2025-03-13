import { motion } from "framer-motion"
import { Card } from "../../ui/card"

interface Indicator {
  name: string
  value: string | number
  interpretation: string
  signal: "buy" | "sell" | "neutral"
}

const mockIndicators: Indicator[] = [
  {
    name: "RSI (14)",
    value: 62.5,
    interpretation: "Approaching overbought levels but still showing momentum",
    signal: "neutral"
  },
  {
    name: "MACD",
    value: "Bullish Crossover",
    interpretation: "MACD line crossed above signal line, indicating potential upward momentum",
    signal: "buy"
  },
  {
    name: "Bollinger Bands",
    value: "Upper Band Test",
    interpretation: "Price testing upper band suggests strong upward trend",
    signal: "neutral"
  }
]

export function TechnicalIndicatorsDemo() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {mockIndicators.map((indicator, index) => (
          <motion.div
            key={indicator.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 bg-black/30 border-teal-500/20">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white">{indicator.name}</h3>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  indicator.signal === "buy" 
                    ? "bg-green-500/20 text-green-400"
                    : indicator.signal === "sell"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {indicator.signal.toUpperCase()}
                </span>
              </div>
              <div className="text-xl font-bold text-white mb-2">
                {typeof indicator.value === "number" ? indicator.value.toFixed(1) : indicator.value}
              </div>
              <p className="text-sm text-white/70">
                {indicator.interpretation}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center text-sm text-white/50">
        Demo data - Updates with market conditions
      </div>
    </div>
  )
}
