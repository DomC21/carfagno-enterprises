import { useState } from 'react'
import { Card } from '../../ui/card'
import { Slider } from '../../ui/slider'
import { motion } from 'framer-motion'

interface ModelParams {
  layers: number
  neuronsPerLayer: number
  activationThreshold: number
}

export function ModelArchitectureDemo() {
  const [params, setParams] = useState<ModelParams>({
    layers: 3,
    neuronsPerLayer: 6,
    activationThreshold: 0.5
  })

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
      transition={{ duration: 0.5 }}
      className="transform-gpu"
    >
      <Card className="p-4 bg-black border-border">
        <h3 className="text-lg font-semibold mb-4 text-primary">Neural Network Architecture</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm text-gray-400">Hidden Layers: {params.layers}</label>
            <Slider
              defaultValue={[params.layers]}
              max={5}
              min={1}
              step={1}
              onValueChange={([value]) => handleParamChange('layers', value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Neurons per Layer: {params.neuronsPerLayer}</label>
            <Slider
              defaultValue={[params.neuronsPerLayer]}
              max={10}
              min={2}
              step={1}
              onValueChange={([value]) => handleParamChange('neuronsPerLayer', value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Activation Threshold: {params.activationThreshold.toFixed(2)}</label>
            <Slider
              defaultValue={[params.activationThreshold]}
              max={1}
              min={0}
              step={0.1}
              onValueChange={([value]) => handleParamChange('activationThreshold', value)}
            />
          </div>
        </div>

        <div className="relative h-[200px] border border-primary/20 rounded-lg p-4">
          {/* Input Layer */}
          <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`input-${i}`}
                className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-400 mb-4"
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
              {Array.from({ length: params.neuronsPerLayer }).map((_, nodeIndex) => (
                <motion.div
                  key={`node-${layerIndex}-${nodeIndex}`}
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent border border-primary mb-4"
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
                className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 border border-green-400 mb-4"
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
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Total Neurons</span>
            <span className="text-lg font-medium text-primary">
              {4 + (params.layers * params.neuronsPerLayer) + 3}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Connections</span>
            <span className="text-lg font-medium text-primary">
              {((4 * params.neuronsPerLayer) + 
                (params.layers > 1 ? (params.layers - 1) * params.neuronsPerLayer * params.neuronsPerLayer : 0) + 
                (params.neuronsPerLayer * 3)).toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
            <span className="text-xs text-gray-400 block">Complexity</span>
            <span className="text-lg font-medium text-primary">
              {params.layers > 3 ? 'High' : params.layers > 1 ? 'Medium' : 'Low'}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
