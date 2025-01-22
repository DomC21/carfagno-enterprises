import { useState, useEffect } from 'react'
import { ChevronLeft, TrendingUp, TrendingDown, Minus, HelpCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { greekFlowMockData, congressionalTradeMockData } from '../demoData/LukzData'
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"

export default function Lukz() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

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

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">Key Features</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Real-time Greek flow data analysis and visualization</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Congressional trade tracking and analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Premium flow analysis with actionable insights</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Interactive data visualizations and charts</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">Platform Integration</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>API integration with major financial data providers</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Real-time data updates and notifications</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Custom alerts and monitoring systems</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Demo Preview</h2>
              <div className="space-y-8">
                {/* Greek Flow Chart */}
                <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">Greek Flow Analysis</h3>
                  <div className="space-y-2">
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
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={greekFlowMockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                              backgroundColor: 'rgb(15 23 42)',
                              border: '1px solid rgb(51 65 85)',
                              borderRadius: '0.375rem'
                            }}
                            labelStyle={{ color: 'rgb(148 163 184)' }}
                            itemStyle={{ color: 'rgb(45 212 191)' }}
                          />
                          <Legend />
                          <Bar dataKey="delta" fill="#14b8a6" name="Delta (Δ)" />
                          <Bar dataKey="gamma" fill="#3b82f6" name="Gamma (Γ)" />
                          <Bar dataKey="theta" fill="#f59e0b" name="Theta (Θ)" />
                          <Bar dataKey="vega" fill="#8b5cf6" name="Vega" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {greekFlowMockData.map((data, index) => (
                        <div key={index} className="bg-blue-900/30 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-400">{data.symbol}</span>
                            {data.sentiment === 'bullish' && <TrendingUp className="w-5 h-5 text-green-400" />}
                            {data.sentiment === 'bearish' && <TrendingDown className="w-5 h-5 text-red-400" />}
                            {data.sentiment === 'neutral' && <Minus className="w-5 h-5 text-yellow-400" />}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">Confidence</span>
                              <span className="text-sm font-medium text-teal-400">{(data.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-blue-900/50 rounded-full h-1.5">
                              <div 
                                className="bg-teal-400 h-1.5 rounded-full"
                                style={{ width: `${data.confidence * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Congressional Trades Table */}
                <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">Recent Congressional Trades</h3>
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
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
