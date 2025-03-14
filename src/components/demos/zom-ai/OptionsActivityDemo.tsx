// Component imports
import { motion } from "framer-motion"
import { Card } from "../../ui/card"

interface OptionsFlow {
  time: string
  strike: number
  type: "CALL" | "PUT"
  expiry: string
  premium: number
  volume: number
  sentiment: "bullish" | "bearish" | "neutral"
}

const mockOptionsFlow: OptionsFlow[] = [
  {
    time: "10:31 AM",
    strike: 180,
    type: "CALL",
    expiry: "Mar 15",
    premium: 3200000,
    volume: 2500,
    sentiment: "bullish"
  },
  {
    time: "10:28 AM",
    strike: 175,
    type: "PUT",
    expiry: "Mar 15",
    premium: 1500000,
    volume: 1200,
    sentiment: "bearish"
  },
  {
    time: "10:25 AM",
    strike: 177.5,
    type: "CALL",
    expiry: "Mar 22",
    premium: 800000,
    volume: 750,
    sentiment: "neutral"
  }
]

export function OptionsActivityDemo() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {mockOptionsFlow.map((flow, index) => (
          <motion.div
            key={`${flow.time}-${flow.strike}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 bg-black/30 border-teal-500/20">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50">{flow.time}</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    flow.type === "CALL" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {flow.type}
                  </span>
                </div>
                <span className={`text-sm font-medium ${
                  flow.sentiment === "bullish" 
                    ? "text-green-400"
                    : flow.sentiment === "bearish"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}>
                  {flow.sentiment.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <span className="text-white/50 text-sm">Strike</span>
                  <div className="text-white font-bold">${flow.strike}</div>
                </div>
                <div>
                  <span className="text-white/50 text-sm">Expiry</span>
                  <div className="text-white font-bold">{flow.expiry}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-white/50 text-sm">Premium</span>
                  <div className="text-white font-bold">
                    ${(flow.premium / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div>
                  <span className="text-white/50 text-sm">Volume</span>
                  <div className="text-white font-bold">
                    {flow.volume.toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center text-sm text-white/50">
        Demo data - Real-time options flow
      </div>
    </div>
  )
}
