import { type ReactElement } from "react"
import { motion } from "framer-motion"
import { Card } from "../components/ui/card"
import { Hammer, Zap, Brain } from "lucide-react"

export default function ZomAIPage(): ReactElement {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Zom AI: Your Hammer for Smarter Investing
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            At Carfagno Enterprises, we see technology like a hammer: it doesn't replace the carpenter, 
            it simply amplifies what they can do. Zom AI is designed to gather and organize your 
            financial data so you can focus on strategic decisions.
          </p>
        </motion.div>
      </section>

      {/* Hammer Analogy Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-black to-black/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-teal-400 mb-6">
                Your Tool for Better Decisions
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Just as a hammer doesn't replace the carpenter but amplifies their capabilities,
                  Zom AI is your tool for making smarter investment decisions.
                </p>
                <p>
                  We emphasize that Zom AI is a tool—not a decision-maker. It handles the heavy lifting
                  by scanning multiple APIs (Unusual Whales, Alpha Vantage, FinancialDatasets.ai),
                  analyzing fundamentals, and summarizing metrics—freeing you to decide how to act.
                </p>
              </div>
            </div>
            <Card className="p-8 bg-black/50 backdrop-blur border-teal-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-lg bg-teal-500/10">
                  <Hammer className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-2xl font-semibold text-teal-400">The Hammer Analogy</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                  <span>Quickly pull and organize relevant data from multiple sources</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                  <span>Present complex information in an understandable format</span>
                </li>
                <li className="flex items-start gap-3">
                  <Hammer className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                  <span>Amplify your decision-making capabilities without replacing human judgment</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-black/50 backdrop-blur border-teal-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-teal-500/10">
                <Hammer className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-teal-400">Powerful Tools</h3>
            </div>
            <p className="text-gray-300">
              Like a hammer helps a builder, Zom helps investors quickly pull relevant data 
              and present it in an understandable way.
            </p>
          </Card>

          <Card className="p-6 bg-black/50 backdrop-blur border-teal-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-teal-500/10">
                <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-teal-400">Instant Analysis</h3>
            </div>
            <p className="text-gray-300">
              Scan multiple APIs, analyze fundamentals, and summarize metrics—freeing you 
              to focus on making strategic decisions.
            </p>
          </Card>

          <Card className="p-6 bg-black/50 backdrop-blur border-teal-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-teal-500/10">
                <Brain className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-teal-400">AI-Powered</h3>
            </div>
            <p className="text-gray-300">
              Leverage artificial intelligence to process complex data patterns and highlight 
              key insights for better decision-making.
            </p>
          </Card>
        </div>
      </section>

      {/* Scenario Comparison */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-12">
          The Zom AI Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Traditional Approach */}
          <Card className="p-8 bg-black/50 backdrop-blur border-red-500/20">
            <h3 className="text-2xl font-semibold text-red-400 mb-6">Without Zom (Traditional Approach)</h3>
            <div className="space-y-6 text-gray-300">
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Data Hunting</h4>
                <p>
                  A user wants to research three potential stocks. They open multiple tabs for each ticker,
                  rummaging through different websites for fundamentals, technical indicators, insider trades, etc.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Time & Complexity</h4>
                <p>
                  They might spend 2–3 hours pulling data from half a dozen sources—some free,
                  some behind logins, or scattered across finance sites.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Manual Interpretation</h4>
                <p>
                  Each site might present data differently, requiring the user to piece everything
                  together and guess if the stock is undervalued or if there's unusual options flow.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Risk of Missing Key Info</h4>
                <p>
                  If they overlook something (like a big insider sale or a high-risk options bet),
                  they could make a misinformed decision.
                </p>
              </div>
            </div>
          </Card>

          {/* Zom Approach */}
          <Card className="p-8 bg-black/50 backdrop-blur border-teal-500/20">
            <h3 className="text-2xl font-semibold text-teal-400 mb-6">With Zom (Using Our Hammer)</h3>
            <div className="space-y-6 text-gray-300">
              <div>
                <h4 className="font-semibold text-teal-400 mb-2">Single Query</h4>
                <p>
                  The user opens Zom AI, types: "Compare TSLA, AAPL, and NVDA. Show me fundamentals,
                  options flow, and any insider trades in the last 30 days."
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-teal-400 mb-2">Data Consolidation</h4>
                <p>
                  Zom instantly aggregates all relevant stats: real-time quotes, P/E ratios,
                  recent insider buying/selling, even big options trades (all in one dashboard).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-teal-400 mb-2">AI-Assisted Summaries</h4>
                <p>
                  Zom highlights major differences (e.g., "AAPL's P/E is lower, TSLA had large
                  insider selling, NVDA shows bullish options flow"), saving hours of manual sifting.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-teal-400 mb-2">Time Saved</h4>
                <p>
                  The entire process might take 10 minutes—not hours—leaving the user with a
                  clear snapshot to make an informed call.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-teal-400 mb-2">Confidence & Clarity</h4>
                <p>
                  The user can then decide which stock aligns best with their goals—Zom simply
                  streamlines the data-collection and analysis process.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
