import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { neuralNetworkMockData } from '../demoData/NeuralNetworksData'

export default function NeuralNetworks() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        // Log data flow
        console.log('Loading Neural Networks data...')
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        console.log('Neural Networks data loaded:', neuralNetworkMockData)
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading Neural Networks data:', err)
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
          <p className="text-gray-300">Loading analysis data...</p>
        </div>
      </div>
    )
  }

  if (error || !neuralNetworkMockData || neuralNetworkMockData.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">No Data Available</h2>
          <p className="text-gray-300">Unable to load neural network analysis data.</p>
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
            Neural Networks and Data Pipeline
          </h1>
          
          <p className="text-xl text-gray-300 mb-4">
            A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends, predict market movements, and generate actionable signals. Key components include technical indicators, backtesting, and an intuitive dashboard.
          </p>

          <div className="bg-blue-900/30 border border-yellow-500/20 text-yellow-300 p-4 mb-8 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              <strong>Development Status:</strong>
            </div>
            <p>This project is actively under development. The following features are coming soon:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Live market data integration</li>
              <li>Advanced backtesting framework with detailed performance metrics</li>
              <li>Interactive model parameter tuning</li>
              <li>Custom timeframe selection</li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-2">CAGR</h3>
                <p className="text-2xl font-bold text-teal-400">32.5%</p>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Above Market</span>
                </div>
              </div>
              <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Sharpe Ratio</h3>
                <p className="text-2xl font-bold text-teal-400">2.1</p>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Strong Risk-Adjusted Returns</span>
                </div>
              </div>
              <div className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Max Drawdown</h3>
                <p className="text-2xl font-bold text-red-400">-15.2%</p>
                <div className="mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-yellow-400">Within Risk Limits</span>
                </div>
              </div>
            </div>

            {/* Price Prediction Chart */}
            <section className="bg-blue-950/50 border border-teal-500/20 hover:border-teal-400/50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">Price Predictions vs Actual</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={neuralNetworkMockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-700" />
                    <XAxis 
                      dataKey="date" 
                      className="stroke-slate-400"
                      tick={{ fill: 'rgb(148 163 184)' }}
                    />
                    <YAxis 
                      className="stroke-slate-400"
                      tick={{ fill: 'rgb(148 163 184)' }}
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
                    <Line 
                      type="monotone" 
                      dataKey="actualPrice" 
                      stroke="#14b8a6" 
                      name="Actual Price"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predictedPrice" 
                      stroke="#3b82f6" 
                      name="Predicted Price"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Technical Indicators */}
            <section className="bg-blue-900/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Technical Indicators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">RSI</h3>
                  <p className="text-2xl font-bold text-teal-400">
                    {neuralNetworkMockData[neuralNetworkMockData.length - 1].rsi.toFixed(2)}
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-blue-900/50 rounded-full h-1.5">
                      <div 
                        className="bg-teal-400 h-1.5 rounded-full"
                        style={{ width: `${(neuralNetworkMockData[neuralNetworkMockData.length - 1].rsi / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">MACD</h3>
                  <p className="text-2xl font-bold text-teal-400">
                    {neuralNetworkMockData[neuralNetworkMockData.length - 1].macd.toFixed(2)}
                  </p>
                  <div className="mt-2 flex items-center">
                    {neuralNetworkMockData[neuralNetworkMockData.length - 1].macd > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm ${neuralNetworkMockData[neuralNetworkMockData.length - 1].macd > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {neuralNetworkMockData[neuralNetworkMockData.length - 1].macd > 0 ? 'Bullish' : 'Bearish'} Signal
                    </span>
                  </div>
                </div>
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Volume</h3>
                  <p className="text-2xl font-bold text-teal-400">
                    {(neuralNetworkMockData[neuralNetworkMockData.length - 1].volume / 1000000).toFixed(2)}M
                  </p>
                  <div className="mt-2 text-sm text-gray-400">
                    Daily Trading Volume
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-blue-950/50 border border-teal-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">Core Feature Details</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-teal-400 mb-2">AI-Driven Predictions</h3>
                  <p className="text-gray-300">This demo uses neural networks to forecast short-term market movements based on historical price trends and volatility. Our models analyze patterns in price action, volume, and technical indicators to generate trading signals.</p>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-teal-400 mb-2">Data Integration</h3>
                  <p className="text-gray-300">Future releases will include live market feeds and additional fundamental data for a holistic analysis. This will enable real-time trading signals and comprehensive market insights through multiple data sources.</p>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-teal-400 mb-2">Backtesting Framework</h3>
                  <p className="text-gray-300">This system can eventually run backtests against historical data to validate trading strategies, measuring performance metrics like CAGR and Drawdown. Users will be able to optimize their strategies using comprehensive performance analytics.</p>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-teal-400 mb-2">Interactive Dashboard</h3>
                  <p className="text-gray-300">We plan to implement configurable charts, user-selected timeframes, and interactive overlays for deeper analysis. The dashboard will provide customizable views and real-time updates of market conditions.</p>
                </div>
              </div>
            </section>

            <section className="bg-blue-900/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Data Pipeline Architecture</h2>
              <div className="bg-blue-950/50 border border-teal-500/20 rounded-lg p-4 mb-4">
                <img 
                  src="/pipeline-flowchart.svg"
                  alt="Neural Network Data Pipeline"
                  className="w-full h-auto mx-auto my-4"
                />
              </div>
              <p className="text-gray-300 mb-6">
                The diagram above illustrates how market data flows through our neural network pipeline. Raw data is processed through our AI models to generate trading signals and performance metrics, which are then presented through an interactive dashboard.
              </p>
              
              <h3 className="text-xl font-semibold text-teal-400 mb-4">Technology Stack</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>TensorFlow and PyTorch for neural network implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Python-based data pipeline for efficient processing</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Interactive dashboards for real-time monitoring</span>
                </li>
              </ul>
            </section>

            <section className="bg-blue-950/50 border border-teal-500/20 p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Development Roadmap</h2>
              <ul className="space-y-4 text-gray-300 list-disc list-inside">
                <li><strong>Q2 2025:</strong> Real-time data integration and AI parameter tuning.</li>
                <li><strong>Q3 2025:</strong> Backtesting interface with in-depth performance reports.</li>
                <li><strong>Q4 2025:</strong> Interactive dashboard with user-defined metrics, custom timeframes, and multi-asset comparisons.</li>
                <li><strong>2026:</strong> Additional AI model support (LSTM, Transformers), machine learning pipeline enhancements, and advanced trading strategy modules.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Demo Preview</h2>
              <div className="bg-blue-900/20 p-6 rounded-lg">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={neuralNetworkMockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        domain={['auto', 'auto']}
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
                      <Line 
                        type="monotone" 
                        dataKey="actualPrice" 
                        stroke="#14b8a6" 
                        name="Actual Price"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predictedPrice" 
                        stroke="#3b82f6" 
                        name="Predicted Price"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-900/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">RSI</h3>
                    <p className="text-2xl font-bold text-teal-400">
                      {neuralNetworkMockData[neuralNetworkMockData.length - 1].rsi.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-blue-900/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">MACD</h3>
                    <p className="text-2xl font-bold text-teal-400">
                      {neuralNetworkMockData[neuralNetworkMockData.length - 1].macd.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-blue-900/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Volume</h3>
                    <p className="text-2xl font-bold text-teal-400">
                      {(neuralNetworkMockData[neuralNetworkMockData.length - 1].volume / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-blue-900/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">We Value Your Feedback</h2>
              <p className="text-gray-300 mb-6">
                Share your thoughts on this project and help shape its future. Your insights are invaluable in guiding our development roadmap and ensuring we build features that truly benefit our users.
              </p>
              <Button 
                onClick={() => navigate('/contact')}
                className="group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-3 px-6 transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl border-0"
              >
                Send Feedback
                <ChevronRight className="ml-2 w-5 h-5 inline-block transition-transform group-hover:translate-x-1" />
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
