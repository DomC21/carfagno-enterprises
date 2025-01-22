import { ChevronLeft, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { stockAnalysisMockData, aiInsightsMockData } from '../demoData/ZomAIData'

export default function ZomAI() {
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
            Zom AI
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            A cutting-edge stock analysis tool offering real-time updates, technical and fundamental metrics, and ChatGPT-powered insights to bridge the gap between data and understanding.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Key Features</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Real-time stock market analysis and updates</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Comprehensive technical and fundamental metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>AI-powered market insights and predictions</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Natural language processing for market analysis</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">AI Integration</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>ChatGPT-powered market analysis and insights</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Machine learning models for pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Automated report generation and analysis</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Demo Preview</h2>
              <div className="space-y-8">
                {/* Stock Analysis Metrics */}
                <div className="bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">Key Metrics Analysis</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stockAnalysisMockData.map((metric, index) => (
                      <div key={index} className="bg-blue-900/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-400">{metric.metric}</h4>
                          {metric.sentiment === 'positive' && (
                            <TrendingUp className="w-5 h-5 text-green-400" />
                          )}
                          {metric.sentiment === 'negative' && (
                            <TrendingDown className="w-5 h-5 text-red-400" />
                          )}
                          {metric.sentiment === 'neutral' && (
                            <AlertCircle className="w-5 h-5 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-2xl font-bold text-teal-400">{metric.value}</p>
                        <div className="mt-2 flex items-center">
                          <div className="flex-1 bg-blue-900/50 rounded-full h-2">
                            <div 
                              className="bg-teal-400 h-2 rounded-full"
                              style={{ width: `${metric.confidence * 100}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-400">
                            {(metric.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">AI-Generated Insights</h3>
                  <div className="space-y-4">
                    {aiInsightsMockData.map((insight, index) => (
                      <div key={index} className="bg-blue-900/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            insight.type === 'technical' ? 'bg-purple-900/50 text-purple-400' :
                            insight.type === 'fundamental' ? 'bg-blue-900/50 text-blue-400' :
                            'bg-orange-900/50 text-orange-400'
                          }`}>
                            {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                          </span>
                          <span className="text-sm text-gray-400">{insight.timestamp}</span>
                        </div>
                        <p className="text-gray-300">{insight.insight}</p>
                        <div className="mt-2 flex items-center">
                          <div className="flex-1 bg-blue-900/50 rounded-full h-2">
                            <div 
                              className="bg-teal-400 h-2 rounded-full"
                              style={{ width: `${insight.confidence * 100}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-400">
                            {(insight.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
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
