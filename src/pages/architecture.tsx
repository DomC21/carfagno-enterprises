import { ArchitectureDiagram } from '@/components/ui/architecture-diagram'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

import { Node } from '../components/ui/architecture-diagram'

const neuralNetworksArchitecture: { nodes: Node[], connections: { from: string, to: string, label?: string }[] } = {
  nodes: [
    {
      id: 'data-feed',
      label: 'Market Data Feed',
      description: 'Real-time market data ingestion from multiple sources',
      type: 'service',
      x: 100,
      y: 100
    },
    {
      id: 'kafka',
      label: 'Apache Kafka',
      description: 'High-throughput message broker for data streaming',
      type: 'service',
      x: 300,
      y: 100
    },
    {
      id: 'processor',
      label: 'Data Processor',
      description: 'Custom data cleaning and normalization pipeline',
      type: 'service',
      x: 500,
      y: 100
    },
    {
      id: 'neural-net',
      label: 'Neural Network',
      description: 'Ensemble of CNN, LSTM, and Transformer models',
      type: 'service',
      x: 300,
      y: 300
    },
    {
      id: 'database',
      label: 'Time Series DB',
      description: 'High-performance time series database for market data',
      type: 'database',
      x: 500,
      y: 300
    },
    {
      id: 'api',
      label: 'REST API',
      description: 'RESTful API for external system integration',
      type: 'api',
      x: 100,
      y: 300
    }
  ],
  connections: [
    { from: 'data-feed', to: 'kafka', label: 'Raw Data' },
    { from: 'kafka', to: 'processor', label: 'Events' },
    { from: 'processor', to: 'neural-net', label: 'Clean Data' },
    { from: 'neural-net', to: 'database', label: 'Predictions' },
    { from: 'database', to: 'api', label: 'Results' }
  ]
}



const zomAiArchitecture: { nodes: Node[], connections: { from: string, to: string, label?: string }[] } = {
  nodes: [
    {
      id: 'market-feed',
      label: 'Market Feed',
      description: 'Real-time market data streaming',
      type: 'service',
      x: 100,
      y: 100
    },
    {
      id: 'chatgpt',
      label: 'ChatGPT API',
      description: 'Natural language processing integration',
      type: 'service',
      x: 300,
      y: 100
    },
    {
      id: 'analyzer',
      label: 'AI Analyzer',
      description: 'Advanced market analysis engine',
      type: 'service',
      x: 500,
      y: 100
    },
    {
      id: 'database',
      label: 'Vector DB',
      description: 'Vector database for AI embeddings',
      type: 'database',
      x: 300,
      y: 300
    },
    {
      id: 'websocket',
      label: 'WebSocket',
      description: 'Real-time data streaming to clients',
      type: 'api',
      x: 100,
      y: 300
    },
    {
      id: 'client',
      label: 'Web Client',
      description: 'React-based web interface',
      type: 'client',
      x: 500,
      y: 300
    }
  ],
  connections: [
    { from: 'market-feed', to: 'analyzer', label: 'Market Data' },
    { from: 'chatgpt', to: 'analyzer', label: 'NLP' },
    { from: 'analyzer', to: 'database', label: 'Analysis' },
    { from: 'database', to: 'websocket', label: 'Stream' },
    { from: 'websocket', to: 'client', label: 'Updates' }
  ]
}

export function Architecture() {
  return (
    <div className="container mx-auto py-section-sm sm:py-section px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text-animated">
          Technical Architecture
        </h1>

        <div className="space-y-12">
          {/* Neural Networks Architecture */}
          <Card className="p-6 bg-black border-border">
            <h2 className="text-2xl font-bold mb-6 text-primary">Neural Networks Architecture</h2>
            <ArchitectureDiagram
              nodes={neuralNetworksArchitecture.nodes}
              connections={neuralNetworksArchitecture.connections}
            />
          </Card>



          {/* Zom AI Architecture */}
          <Card className="p-6 bg-black border-border">
            <h2 className="text-2xl font-bold mb-6 text-primary">Zom AI Architecture</h2>
            <ArchitectureDiagram
              nodes={zomAiArchitecture.nodes}
              connections={zomAiArchitecture.connections}
            />
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
