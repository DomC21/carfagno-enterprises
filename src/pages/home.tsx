
import { MarketDataStream } from '@/components/ui/market-data-stream'
import { FinancialPatterns } from '@/components/ui/financial-patterns'

export function Home() {
  return (
    <div className="min-h-screen bg-black">
      <MarketDataStream />
      <FinancialPatterns />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI-Driven Financial Intelligence
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-400 max-w-3xl mx-auto">
          Your competitive edge in the market. We combine cutting-edge AI technology with deep financial expertise.
        </p>
      </div>
    </div>
  )
}
