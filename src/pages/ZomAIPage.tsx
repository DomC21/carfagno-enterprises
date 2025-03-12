import { type ReactElement } from "react"
import { motion } from "framer-motion"
import { Card } from "../components/ui/card"
import { Hammer, Zap, Clock, Brain } from "lucide-react"

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

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  )
}
