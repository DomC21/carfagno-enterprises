import { ChevronLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import { greekFlowMockData, congressionalTradeMockData } from '../demoData/LukzData'

export default function Lukz() {
  const navigate = useNavigate()
  
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
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Key Features</h2>
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
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Platform Integration</h2>
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
                <div className="bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">Greek Flow Analysis</h3>
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
                            backgroundColor: '#0f172a',
                            border: '1px solid #1e293b',
                            borderRadius: '0.375rem'
                          }}
                          labelStyle={{ color: '#94a3b8' }}
                          itemStyle={{ color: '#14b8a6' }}
                        />
                        <Bar dataKey="delta" fill="#14b8a6" name="Delta" />
                        <Bar dataKey="gamma" fill="#3b82f6" name="Gamma" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Congressional Trades Table */}
                <div className="bg-blue-900/20 p-6 rounded-lg">
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
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
