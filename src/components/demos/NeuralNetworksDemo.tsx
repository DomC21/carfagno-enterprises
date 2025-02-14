import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
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
    <div className="space-y-6">
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
          <div className="relative h-[200px] w-full">
            {Array.from({ length: params.layers }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: `${(i + 1) * (100 / (params.layers + 1))}%`,
                  width: '40px',
                  height: `${120 - (i * 10)}px`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.1
                }}
              >
                <div className="w-full h-full rounded-lg bg-gradient-to-b from-primary/20 to-primary/40 border border-primary/30" />
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Model Confidence: {(params.confidence * 100).toFixed(1)}%
            </p>
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
          <h3 className="text-lg font-semibold mb-4 text-primary">Price Analysis</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  stroke="#64748b"
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '0.375rem'
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2 text-primary">Model Confidence</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
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
                      backgroundColor: '#0f172a',
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
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Model confidence indicates prediction accuracy based on historical patterns and current market conditions
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
                      d.pattern?.type === 'bullish' 
                        ? 'bg-green-950/20 border border-green-500/20' 
                        : 'bg-red-950/20 border border-red-500/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        {new Date(d.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`text-sm font-medium ${
                        d.pattern?.type === 'bullish' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {d.pattern?.type.toUpperCase()}
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
    </div>
  )
}
