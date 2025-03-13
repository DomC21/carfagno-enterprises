import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { RealTimeQuotesDemo } from "../components/demos/zom-ai/RealTimeQuotesDemo"
import { TechnicalIndicatorsDemo } from "../components/demos/zom-ai/TechnicalIndicatorsDemo"
import { OptionsActivityDemo } from "../components/demos/zom-ai/OptionsActivityDemo"
import { AISummariesDemo } from "../components/demos/zom-ai/AISummariesDemo"
import { ChevronRight } from "lucide-react"
import { animationClasses } from "../utils/styles"

export default function ZomAIPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Zom AI: Your Real-Time Stock Analysis Companion
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Ask Zom about any ticker&apos;s fundamentals, technicals, or news—and get instant, AI-driven clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Purpose Overview */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Purpose Overview</h2>
            <p className="text-white/70 text-lg mb-6">
              Zom AI is designed to help investors gather market data from multiple sources in one place, explain key metrics, and highlight important insights—so you can focus on making informed decisions quickly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-black/30 rounded-xl">
                <h3 className="text-teal-400 font-semibold mb-2">Unusual Whales</h3>
                <p className="text-white/70">Real-time options flow, insider trades, dark pool activity</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <h3 className="text-teal-400 font-semibold mb-2">Alpha Vantage</h3>
                <p className="text-white/70">Live market data, technical indicators, fundamentals</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <h3 className="text-teal-400 font-semibold mb-2">FinancialDatasets.ai</h3>
                <p className="text-white/70">Deep company analysis, institutional holdings</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="quotes" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent mb-8">
              <TabsTrigger value="quotes" className="data-[state=active]:bg-teal-500">
                Real-Time Quotes
              </TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-teal-500">
                Technical Indicators
              </TabsTrigger>
              <TabsTrigger value="options" className="data-[state=active]:bg-teal-500">
                Options Activity
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-teal-500">
                AI Summaries
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="mt-4">
              <div className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Real-Time Market Data</h3>
                <p className="text-white/70 mb-6">
                  Get instant access to live market quotes, fundamentals, and key metrics for any ticker.
                </p>
                <RealTimeQuotesDemo />
              </div>
            </TabsContent>

            <TabsContent value="technical" className="mt-4">
              <div className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Technical Analysis Made Simple</h3>
                <p className="text-white/70 mb-6">
                  Understand complex technical indicators with plain English explanations and visual guides.
                </p>
                <TechnicalIndicatorsDemo />
              </div>
            </TabsContent>

            <TabsContent value="options" className="mt-4">
              <div className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Options Flow Intelligence</h3>
                <p className="text-white/70 mb-6">
                  Track unusual options activity and get insights into institutional trading patterns.
                </p>
                <OptionsActivityDemo />
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-4">
              <div className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Insights</h3>
                <p className="text-white/70 mb-6">
                  Let our AI analyze market data and provide clear, actionable insights.
                </p>
                <AISummariesDemo />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">How to Use Zom AI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-teal-400 text-2xl font-bold mb-2">1</div>
                <h3 className="text-white font-semibold mb-2">Enter a Ticker or Question</h3>
                <p className="text-white/70">Type any stock symbol or ask about market conditions</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-teal-400 text-2xl font-bold mb-2">2</div>
                <h3 className="text-white font-semibold mb-2">Zom Gathers Data</h3>
                <p className="text-white/70">We pull real-time data from multiple premium sources</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-teal-400 text-2xl font-bold mb-2">3</div>
                <h3 className="text-white font-semibold mb-2">AI Analysis</h3>
                <p className="text-white/70">Our AI processes and interprets the market data</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-teal-400 text-2xl font-bold mb-2">4</div>
                <h3 className="text-white font-semibold mb-2">Clear Answers</h3>
                <p className="text-white/70">Get plain English explanations and actionable insights</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sample Queries */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Example Queries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-black/30 rounded-xl">
                <p className="text-teal-400 font-mono mb-2">&gt; Compare Tesla and Rivian&apos;s fundamentals</p>
                <p className="text-white/70">Get side-by-side comparison of key metrics</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <p className="text-teal-400 font-mono mb-2">&gt; What&apos;s the RSI of Microsoft right now?</p>
                <p className="text-white/70">Check technical indicators with explanations</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <p className="text-teal-400 font-mono mb-2">&gt; Any unusual options trades for AMD?</p>
                <p className="text-white/70">Monitor options flow and institutional activity</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-4">
            <Button size="lg" className={`${animationClasses.buttonGlow} bg-teal-500 hover:bg-teal-600`}>
              Try Zom Now
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="border-teal-500/20 hover:bg-teal-500/10">
                View Pricing
              </Button>
              <Button variant="ghost" className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
