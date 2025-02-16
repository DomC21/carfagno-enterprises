import { useState, useEffect } from 'react'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts'
import { generateStockData, type StockData } from '../../utils/fakeData'
import { Card } from '../../components/ui/card'
import { motion } from 'framer-motion'
import { Slider } from '../../components/ui/slider'

interface ModelParams {
  learningRate: number
  epochs: number
  layers: number
  confidence: number
}

export function NeuralNetworksDemo() {
  const [data, setData] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<ModelParams>({
    learningRate: 0.001,
    epochs: 100,
    layers: 3,
    confidence: 0.85
  })

  useEffect(() => {
    // Initial data load
    setData(generateStockData(50))
    setLoading(false)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), ...generateStockData(1)]
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-4 bg-black border-border">
          <div className="h-8 w-1/3 bg-gray-800 rounded-lg animate-pulse mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-1/4 bg-gray-800 rounded-lg animate-pulse" />
                <div className="h-2 w-full bg-gray-800 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4 bg-black border-border">
          <div className="h-8 w-1/2 bg-gray-800 rounded-lg animate-pulse mb-4" />
          <div className="h-[200px] bg-gray-800 rounded-lg animate-pulse" />
        </Card>
      </div>
    )
  }

  const handleParamChange = (param: keyof ModelParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [param]: value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="space-y-6 transform-gpu"
    >
      {/* Model Parameters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Card className="p-4 bg-black border-border">
          <h3 className="text-lg font-semibold mb-4 text-primary">Model Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Learning Rate: {params.learningRate}</label>
              <Slider
                defaultValue={[params.learningRate]}
                max={0.01}
                min={0.0001}
                step={0.0001}
                onValueChange={([value]) => handleParamChange('learningRate', value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Epochs: {params.epochs}</label>
              <Slider
                defaultValue={[params.epochs]}
                max={500}
                min={10}
                step={10}
                onValueChange={([value]) => handleParamChange('epochs', value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Hidden Layers: {params.layers}</label>
              <Slider
                defaultValue={[params.layers]}
                max={10}
                min={1}
                step={1}
                onValueChange={([value]) => handleParamChange('layers', value)}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Model Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1
        }}
      >
        <Card className="p-4 bg-black border-border">
          <h3 className="text-lg font-semibold mb-4 text-primary">Model Architecture</h3>
          <div className="relative h-[300px] w-full">
            {/* Input Layer */}
            <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={`input-${i}`}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-400 mb-4 relative"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: i * 0.1
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-400"
                    initial={{ scale: 0.6, opacity: 0.4 }}
                    animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {['Price', 'Volume', 'RSI', 'MACD'][i]}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Hidden Layers */}
            {Array.from({ length: params.layers }).map((_, layerIndex) => (
              <div
                key={`layer-${layerIndex}`}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: `${25 + (layerIndex * 50 / params.layers)}%`,
                }}
              >
                {Array.from({ length: 6 - layerIndex }).map((_, nodeIndex) => (
                  <motion.div
                    key={`node-${layerIndex}-${nodeIndex}`}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-yellow-600 border border-primary mb-4 relative"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: layerIndex * 0.2 + nodeIndex * 0.1
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ scale: 0.6, opacity: 0.4 }}
                      animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 0.8, 0.4] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: layerIndex * 0.2
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Output Layer */}
            <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`output-${i}`}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 border border-green-400 mb-4 relative"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: params.layers * 0.2 + i * 0.1
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-400"
                    initial={{ scale: 0.6, opacity: 0.4 }}
                    animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: params.layers * 0.2
                    }}
                  />
                  <span className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {['Buy', 'Hold', 'Sell'][i]}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Neural Connections */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <defs>
                <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
                  <stop offset="50%" style={{ stopColor: '#ffd700', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0.2 }} />
                </linearGradient>
              </defs>
              <g className="connections">
                {/* Connection lines will be drawn here */}
                <path
                  d="M100,150 C200,150 300,150 400,150"
                  stroke="url(#connection-gradient)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4,4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;8"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </svg>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
              <div className="text-sm text-gray-400 mb-1">Model Confidence</div>
              <div className="text-lg font-medium text-primary">
                {(params.confidence * 100).toFixed(1)}%
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${params.confidence * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20">
              <div className="text-sm text-gray-400 mb-1">Training Progress</div>
              <div className="text-lg font-medium text-primary">
                {params.epochs} epochs
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Learning Rate: {params.learningRate}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-950/20 border border-green-500/20">
              <div className="text-sm text-gray-400 mb-1">Network Size</div>
              <div className="text-lg font-medium text-primary">
                {params.layers} layers
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {4 + params.layers * 6 + 3} total nodes
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Price and Confidence Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Card className="p-4 bg-black border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary">AI-Powered Price Analysis</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                params.confidence > 0.8 ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`} />
              <span className="text-sm text-gray-400">
                {params.confidence > 0.8 ? 'High Confidence Signals' : 'Analyzing Patterns'}
              </span>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  stroke="#64748b"
                />
                <YAxis stroke="#64748b" domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(30, 41, 59, 0.5)',
                    borderRadius: '0.375rem',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  formatter={(value: any, name: string) => {
                    const explanations: Record<string, string> = {
                      volume: 'Real-time trading volume with AI-detected anomalies',
                      open: 'Opening price with pattern recognition markers',
                      close: 'Closing price with predicted support/resistance',
                      high: 'Peak price with volatility analysis',
                      low: 'Bottom price with trend reversal signals',
                      confidence: 'Neural network prediction confidence',
                      prediction: 'AI-generated price target based on pattern analysis',
                      momentum: 'Market momentum score from -100 to 100',
                      volatility: 'Price volatility index with risk assessment'
                    }
                    const key = name.toLowerCase()
                    return [
                      typeof value === 'number' ? value.toFixed(2) : value,
                      `${name.charAt(0).toUpperCase() + name.slice(1)}: ${key in explanations ? explanations[key] : ''}`
                    ]
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke="#FFD700"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                  dot={false}
                />
                <Bar
                  dataKey="volume"
                  fill="#3b82f6"
                  opacity={0.3}
                  yAxisId={1}
                />
                {data.map((point, index) => {
                  if (point.pattern) {
                    return (
                      <ReferenceLine
                        key={index}
                        x={point.timestamp}
                        stroke="#FFD700"
                        strokeDasharray="3 3"
                        label={{
                          value: point.pattern.type,
                          position: 'top',
                          fill: '#FFD700',
                          fontSize: 10
                        }}
                      />
                    )
                  }
                  return null
                })}
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <motion.div
                className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xs text-gray-400 block">Current Price</span>
                <span className="text-lg font-medium text-primary">
                  ${data[data.length - 1]?.close.toFixed(2)}
                </span>
                <div className="mt-1 text-xs text-gray-500">
                  Vol: {(data[data.length - 1]?.volume / 1000).toFixed(1)}K
                </div>
              </motion.div>
              <motion.div
                className="p-3 rounded-lg bg-green-950/20 border border-green-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xs text-gray-400 block">AI Prediction</span>
                <span className="text-lg font-medium text-green-400">
                  ${(data[data.length - 1]?.close * (1 + Math.random() * 0.05)).toFixed(2)}
                </span>
                <div className="mt-1 text-xs text-green-500">
                  +{(Math.random() * 5).toFixed(1)}% potential
                </div>
              </motion.div>
              <motion.div
                className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xs text-gray-400 block">Pattern Strength</span>
                <span className="text-lg font-medium text-purple-400">
                  {(params.confidence * 100).toFixed(1)}%
                </span>
                <div className="mt-1 text-xs text-purple-500">
                  {params.confidence > 0.8 ? 'Strong Signal' : 'Analyzing'}
                </div>
              </motion.div>
              <motion.div
                className="p-3 rounded-lg bg-yellow-950/20 border border-yellow-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xs text-gray-400 block">Market Momentum</span>
                <span className="text-lg font-medium text-yellow-400">
                  {Math.floor(Math.random() * 100 - 50)}
                </span>
                <div className="mt-1 text-xs text-yellow-500">
                  Bullish Trend
                </div>
              </motion.div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2 text-primary">Real-Time Model Performance</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="#64748b"
                  />
                  <YAxis 
                    stroke="#64748b"
                    domain={[0, 1]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #1e293b',
                      borderRadius: '0.375rem'
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                  />
                  <Area
                    type="monotone"
                    dataKey="confidence"
                    stroke="#FFD700"
                    strokeWidth={2}
                    fill="url(#confidenceGradient)"
                  />
                  <ReferenceLine y={0.8} stroke="#FFD700" strokeDasharray="3 3" label={{
                    value: 'High Confidence Threshold',
                    position: 'right',
                    fill: '#FFD700',
                    fontSize: 10
                  }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
                <div className="text-sm text-gray-400">Accuracy Score</div>
                <div className="text-lg font-medium text-primary mt-1">
                  {(85 + Math.random() * 10).toFixed(1)}%
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20">
                <div className="text-sm text-gray-400">Pattern Recognition</div>
                <div className="text-lg font-medium text-primary mt-1">
                  {(90 + Math.random() * 5).toFixed(1)}%
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-950/20 border border-green-500/20">
                <div className="text-sm text-gray-400">Profit Potential</div>
                <div className="text-lg font-medium text-primary mt-1">
                  {(15 + Math.random() * 10).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Order Book */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.2
        }}
      >
        <Card className="p-4 bg-black border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary">Order Book</h3>
            <div className="text-sm text-gray-400">
              Spread: ${data[data.length - 1]?.orderBook?.spread.toFixed(2)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Asks */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-400 mb-2">Asks</div>
              {data[data.length - 1]?.orderBook?.asks.map((level, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between items-center text-xs bg-red-950/20 border border-red-500/20 rounded px-2 py-1"
                >
                  <span className="text-red-400">${level.price.toFixed(2)}</span>
                  <span className="text-gray-400">{level.size.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
            {/* Bids */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-400 mb-2">Bids</div>
              {data[data.length - 1]?.orderBook?.bids.map((level, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between items-center text-xs bg-green-950/20 border border-green-500/20 rounded px-2 py-1"
                >
                  <span className="text-green-400">${level.price.toFixed(2)}</span>
                  <span className="text-gray-400">{level.size.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Pattern Recognition and Trading Signals */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2
          }}
        >
          <Card className="p-4 bg-black border-border">
            <h3 className="text-lg font-semibold mb-4 text-primary">Pattern Recognition</h3>
            <div className="space-y-4">
              {data
                .filter(d => d.pattern)
                .slice(-3)
                .map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1 + 0.3
                    }}
                    className={`p-3 rounded-lg ${
                      d.pattern?.type === 'double-bottom' || d.pattern?.type === 'triangle'
                        ? 'bg-green-950/20 border border-green-500/20' 
                        : 'bg-red-950/20 border border-red-500/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        {new Date(d.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`text-sm font-medium ${
                        d.pattern?.type === 'double-bottom' || d.pattern?.type === 'triangle'
                          ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {d.pattern?.type.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-300">
                        Confidence: {(d.pattern?.confidence ?? 0) * 100}%
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>
        </motion.div>

        {/* Trading Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.4
          }}
        >
          <Card className="p-4 bg-black border-border">
            <h3 className="text-lg font-semibold mb-4 text-primary">Trading Signals</h3>
            <div className="space-y-4">
              {data
                .filter(d => d.pattern)
                .slice(-3)
                .map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1 + 0.5
                    }}
                    className="flex items-center justify-between p-3 rounded-lg bg-blue-950/20 border border-blue-500/20"
                  >
                    <div className="space-y-1">
                      <span className="text-sm text-gray-400">
                        {new Date(d.timestamp).toLocaleTimeString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">Price:</span>
                        <span className="text-sm font-medium text-primary">
                          ${d.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-300">Volume:</span>
                      <div className="text-sm font-medium text-primary">
                        {d.volume.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
