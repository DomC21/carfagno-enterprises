import { ChevronLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

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
          </div>
        </div>
      </div>
    </div>
  )
}
