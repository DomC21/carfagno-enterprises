import { ChevronLeft, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
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
          
          <p className="text-xl text-gray-300 mb-8">
            A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends, predict market movements, and generate actionable signals. Key components include technical indicators, backtesting, and an intuitive dashboard.
          </p>

          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-2">CAGR</h3>
                <p className="text-2xl font-bold text-teal-400">32.5%</p>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Above Market</span>
                </div>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Sharpe Ratio</h3>
                <p className="text-2xl font-bold text-teal-400">2.1</p>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Strong Risk-Adjusted Returns</span>
                </div>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Max Drawdown</h3>
                <p className="text-2xl font-bold text-red-400">-15.2%</p>
                <div className="mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-yellow-400">Within Risk Limits</span>
                </div>
              </div>
            </div>

            {/* Price Prediction Chart */}
            <section className="bg-blue-900/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Price Predictions vs Actual</h2>
              <div className="h-80">
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
            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Key Features</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Advanced neural network architecture for precise market analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Comprehensive technical indicators and pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Robust backtesting framework for strategy validation</span>
                </li>
                <li className="flex items-start">
                  <span className="block w-2 h-2 mt-2 mr-3 bg-teal-400 rounded-full" />
                  <span>Real-time market data integration and signal generation</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Technology Stack</h2>
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
          </div>
        </div>
      </div>
    </div>
  )
}
