import { useState, useEffect } from 'react'
import { ChevronLeft, HelpCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { ChatInsight } from '../components/ui/chat-insight'
import { useNavigate } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts'
import {
  greekFlowMockData,
  congressionalTradeMockData,
  earningsReportMockData,
  insiderTradeMockData,
  premiumFlowMockData,
  mockInsights,
  type InsiderTrade
} from '../demoData/LukzData'
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"

function Lukz() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // Filter states for Congress Trades
  const [selectedTicker, setSelectedTicker] = useState<string>('AAPL')
  const [selectedSector, setSelectedSector] = useState<string>('All')

  // Get unique values for filters
  const uniqueTickers = Array.from(new Set([...greekFlowMockData.map(data => data.symbol), ...congressionalTradeMockData.map(trade => trade.symbol)]))
  const uniqueSectors = Array.from(new Set([...congressionalTradeMockData.map(trade => trade.sector), ...insiderTradeMockData.map(trade => trade.sector)]))

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        // Log data flow
        console.log('Loading Lukz data...')
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        console.log('Greek Flow data loaded:', greekFlowMockData)
        console.log('Congressional Trade data loaded:', congressionalTradeMockData)
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading Lukz data:', err)
        setError(err as Error)
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-300">Loading financial data...</p>
        </div>
      </div>
    )
  }

  if (error || !greekFlowMockData || !congressionalTradeMockData || 
      greekFlowMockData.length === 0 || congressionalTradeMockData.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">No Data Available</h2>
          <p className="text-gray-300">Unable to load financial analysis data.</p>
          <Button
            variant="ghost"
            className="mt-4 text-teal-400 hover:text-teal-300 group"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          className="mb-8 text-teal-400 hover:text-teal-300 group"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Lukz
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            A financial analytics platform leveraging API integration for features like Greek flow data, Congressional trades, and premium flow analysis. It includes interactive visualizations and real-time data updates for investors.
          </p>

          {/* Stock Identifier Section */}
          <section className="mb-12">
            <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-teal-400">AAPL</h2>
                  <p className="text-gray-400">Apple Inc.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">$182.63</p>
                  <p className="text-green-400">+1.24 (0.68%)</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Volume</p>
                  <p className="text-lg text-teal-400">58.2M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="text-lg text-teal-400">$2.8T</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">52W Range</p>
                  <p className="text-lg text-teal-400">$124.17 - $188.52</p>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Analysis Section */}
          <section className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Technical Analysis</h2>
            
            {/* Greek Flow Analysis */}
            <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-teal-400">Greek Flow Analysis</h3>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-5 h-5 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delta (Δ): Stock price sensitivity</p>
                        <p>Gamma (Γ): Delta change rate</p>
                        <p>Theta (Θ): Time decay</p>
                        <p>Vega: Volatility sensitivity</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <Select value={selectedTicker} onValueChange={setSelectedTicker}>
                  <SelectTrigger className="w-[180px] bg-blue-900/30 border-teal-500/20 text-gray-300">
                    <SelectValue placeholder="Select Stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueTickers.map(ticker => (
                      <SelectItem key={ticker} value={ticker}>{ticker}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={greekFlowMockData.filter(data => data.symbol === selectedTicker)} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8' }}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a',
                        border: '1px solid #1e293b',
                        borderRadius: '0.375rem'
                      }}
                      labelStyle={{ color: '#94a3b8' }}
                      itemStyle={{ color: '#14b8a6' }}
                    />
                    <Legend />
                    <Bar dataKey="delta" fill="#14b8a6" name="Delta (Δ)" />
                    <Bar dataKey="gamma" fill="#3b82f6" name="Gamma (Γ)" />
                    <Bar dataKey="theta" fill="#f59e0b" name="Theta (Θ)" />
                    <Bar dataKey="vega" fill="#8b5cf6" name="Vega" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <ChatInsight 
                insight={mockInsights.greekFlow.insight}
                confidence={mockInsights.greekFlow.confidence}
                type={mockInsights.greekFlow.type}
                className="mt-4"
              />
            </div>

            {/* After-Hours Earnings */}
            <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-semibold text-teal-400">After-Hours Earnings</h3>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Earnings surprises vs. stock price movements</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      dataKey="surprise" 
                      name="Earnings Surprise (%)"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8' }}
                    />
                    <YAxis 
                      dataKey="priceChange"
                      name="Price Change (%)"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a',
                        border: '1px solid #1e293b',
                        borderRadius: '0.375rem'
                      }}
                      labelStyle={{ color: '#94a3b8' }}
                      itemStyle={{ color: '#14b8a6' }}
                    />
                    <Legend />
                    <Scatter 
                      data={earningsReportMockData} 
                      fill="#14b8a6"
                      name="Earnings Reports"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <ChatInsight 
                insight={mockInsights.earnings.insight}
                confidence={mockInsights.earnings.confidence}
                type={mockInsights.earnings.type}
                className="mt-4"
              />
            </div>
          </section>

          {/* Fundamental Data Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Fundamental Data</h2>

            {/* Congressional Trades */}
            <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-400 mb-4">Recent Congressional Trades</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Representative</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Symbol</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {congressionalTradeMockData.map((trade, index) => (
                      <tr key={index} className="border-b border-blue-800/50">
                        <td className="py-3 px-4 text-gray-300">{trade.date}</td>
                        <td className="py-3 px-4 text-gray-300">{trade.representative}</td>
                        <td className="py-3 px-4 text-teal-400 font-medium">{trade.symbol}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            trade.type === 'BUY' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                          }`}>
                            {trade.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{trade.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ChatInsight 
                insight={mockInsights.congress.insight}
                confidence={mockInsights.congress.confidence}
                type={mockInsights.congress.type}
                className="mt-4"
              />
            </div>

            {/* Insider Trading Activity */}
            <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-teal-400">Insider Trading Activity</h3>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="w-[180px] bg-blue-900/30 border-teal-500/20 text-gray-300">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Sectors</SelectItem>
                    {uniqueSectors.map(sector => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6">
                {/* Custom Heatmap */}
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(insiderTradeMockData.reduce((acc: Record<string, { buyValue: number; sellValue: number; totalTrades: number }>, trade: InsiderTrade) => {
                    if (!acc[trade.sector]) {
                      acc[trade.sector] = { buyValue: 0, sellValue: 0, totalTrades: 0 }
                    }
                    acc[trade.sector].totalTrades++
                    if (trade.type === 'BUY') {
                      acc[trade.sector].buyValue += trade.total_value
                    } else {
                      acc[trade.sector].sellValue += trade.total_value
                    }
                    return acc
                  }, {} as Record<string, { buyValue: number; sellValue: number; totalTrades: number }>)).map(([sector, data]) => {
                    const intensity = Math.min(data.totalTrades / 5, 1) // Normalize by assuming max 5 trades
                    const netValue = data.buyValue - data.sellValue
                    const color = netValue > 0 ? 'bg-green-400' : 'bg-red-400'
                    return (
                      <div key={sector} className="p-4 rounded-lg bg-blue-900/30">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">{sector}</h4>
                        <div className={`h-2 rounded-full ${color}`} style={{ opacity: intensity }} />
                        <div className="mt-2 text-xs text-gray-400">
                          {data.totalTrades} trades
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Insider</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Shares</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insiderTradeMockData
                      .filter(trade => selectedSector === 'All' || trade.sector === selectedSector)
                      .map((trade, index) => (
                        <tr key={index} className="border-b border-blue-800/50">
                          <td className="py-3 px-4 text-gray-300">{trade.date}</td>
                          <td className="py-3 px-4 text-gray-300">{trade.insider_name}</td>
                          <td className="py-3 px-4 text-gray-300">{trade.title}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              trade.type === 'BUY' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                            }`}>
                              {trade.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{trade.shares.toLocaleString()}</td>
                          <td className="py-3 px-4 text-gray-300">${trade.total_value.toLocaleString()}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ChatInsight 
                insight={mockInsights.insider.insight}
                confidence={mockInsights.insider.confidence}
                type={mockInsights.insider.type}
                className="mt-4"
              />
            </div>

            {/* Market-Wide Premium Flow */}
            <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-400 mb-4">Market-Wide Premium Flow</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sector Heatmap */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(premiumFlowMockData.reduce((acc, flow) => {
                    if (!acc[flow.sector]) {
                      acc[flow.sector] = { callVolume: 0, putVolume: 0, ratio: 0 }
                    }
                    acc[flow.sector].callVolume += flow.callVolume
                    acc[flow.sector].putVolume += flow.putVolume
                    acc[flow.sector].ratio = acc[flow.sector].callVolume / acc[flow.sector].putVolume
                    return acc
                  }, {} as Record<string, { callVolume: number; putVolume: number; ratio: number }>)).map(([sector, data]) => {
                    const intensity = Math.min(Math.abs(data.ratio - 1), 1) // Normalize ratio difference from 1
                    const color = data.ratio > 1 ? 'bg-teal-400' : 'bg-orange-400'
                    return (
                      <div key={sector} className="p-4 rounded-lg bg-blue-900/30">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">{sector}</h4>
                        <div className={`h-2 rounded-full ${color}`} style={{ opacity: intensity }} />
                        <div className="mt-2 text-xs text-gray-400">
                          {data.ratio.toFixed(2)} C/P ratio
                        </div>
                      </div>
                    )
                  })}
                </div>
                {/* Premium Flow Chart */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={premiumFlowMockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis 
                        dataKey="symbol" 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a',
                          border: '1px solid #1e293b',
                          borderRadius: '0.375rem'
                        }}
                        labelStyle={{ color: '#94a3b8' }}
                        itemStyle={{ color: '#14b8a6' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="callPremium" 
                        stroke="#14b8a6" 
                        name="Call Premium"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="putPremium" 
                        stroke="#f59e0b" 
                        name="Put Premium"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <ChatInsight 
                  insight={mockInsights.premiumFlow.insight}
                  confidence={mockInsights.premiumFlow.confidence}
                  type={mockInsights.premiumFlow.type}
                  className="mt-4"
                />
              </div>
            </div>
          </div>

          {/* Development Status Section */}
          <section className="mt-16 mb-8">
            <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">Development Status</h2>
              <p className="text-xl text-gray-300 mb-6">
                This project is actively under development, with new features and improvements being added regularly. Our goal is to provide users with cutting-edge financial analysis tools powered by real-time market data and AI insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">Coming Soon</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Live market data integration with real-time updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Advanced backtesting framework with detailed performance metrics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Interactive model parameter tuning capabilities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">In Progress</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Enhanced AI-powered market insights and predictions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Custom timeframe selection for all analyses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Advanced data visualization options and export capabilities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Lukz
