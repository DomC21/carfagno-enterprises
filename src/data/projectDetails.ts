interface ProjectDetail {
  id: string
  title: string
  description: string
  features: string[]
  technologies: string[]
  benefits: string[]
  details: string
}

export const projectDetails: Record<string, ProjectDetail> = {
  'neural-networks': {
    id: 'neural-networks',
    title: 'Neural Networks and Data Pipeline',
    description: 'A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends.',
    features: [
      'Advanced neural network architecture for pattern recognition',
      'Real-time market data processing',
      'Automated trading signals',
      'Historical data analysis',
      'Custom indicator development'
    ],
    technologies: [
      'TensorFlow',
      'Python',
      'SQL Databases',
      'REST APIs',
      'Cloud Computing'
    ],
    benefits: [
      'Enhanced market prediction accuracy',
      'Reduced emotional trading decisions',
      'Automated pattern recognition',
      'Real-time market insights',
      'Data-driven trading strategies'
    ],
    details: `Our Neural Networks project leverages state-of-the-art deep learning architectures to analyze market patterns. The system employs:

• Multi-layer perceptron networks for pattern recognition with 85% accuracy
• LSTM networks optimized for time-series prediction of market movements
• Real-time data processing pipeline using Apache Kafka for 100k+ events/second
• Custom TensorFlow models with GPU acceleration for market analysis
• Automated trading signal generation with confidence scoring
• Distributed computing infrastructure for parallel data processing
• Advanced backtesting framework with Monte Carlo simulations
• Real-time model retraining based on market conditions

The architecture processes over 1 million data points daily through a sophisticated pipeline:
1. Data Ingestion: Multiple market data feeds → Apache Kafka
2. Processing: Custom data cleaning and normalization algorithms
3. Analysis: Ensemble of neural networks (CNN, LSTM, Transformer)
4. Signal Generation: ML-based confidence scoring system
5. Execution: Low-latency trading signal distribution

Performance Metrics:
• Pattern Recognition Accuracy: 85%
• Signal Generation Latency: <10ms
• Daily Data Processing: 1M+ points
• Model Update Frequency: Every 5 minutes
• Historical Data Coverage: 20+ years`
  },

  'zom-ai': {
    id: 'zom-ai',
    title: 'Zom AI',
    description: 'Like a hammer in the hands of a skilled carpenter, Zom AI amplifies your investment capabilities by gathering and organizing financial data from top providers, allowing you to focus on making strategic decisions.',
    features: [
      'AI-powered market analysis',
      'Natural language processing',
      'Real-time stock screening',
      'Automated research reports',
      'Sentiment analysis'
    ],
    technologies: [
      'OpenAI GPT',
      'Machine Learning',
      'Natural Language Processing',
      'Real-time Data Processing',
      'Cloud Infrastructure'
    ],
    benefits: [
      'Instant market research',
      'AI-driven stock insights',
      'Automated due diligence',
      'Real-time market updates',
      'Natural language queries'
    ],
    details: `At Carfagno Enterprises, we see technology like a hammer: it doesn't replace the carpenter, it simply amplifies what they can do. Zom AI is designed to gather and organize your financial data so you can focus on strategic decisions.

The Power of Our Tool:
• Instant data consolidation from multiple premium sources
• Natural language queries for complex market analysis
• AI-powered insights that save hours of research time
• Comprehensive market coverage across stocks and options
• Real-time updates and alerts for critical market events

Data Integration:
• Unusual Whales: Real-time options flow, insider trades, dark pool data
• Alpha Vantage: Live market data, technical indicators, fundamentals
• FinancialDatasets.ai: Deep company analysis, institutional holdings

Time-Saving Features:
• Single query interface for multiple data sources
• Automated data consolidation and analysis
• AI-assisted research summaries
• Pattern recognition and trend analysis
• Real-time market monitoring

Technical Capabilities:
• <500ms response time for natural language queries
• Process 10,000+ documents daily
• 92% accuracy in sentiment analysis
• Access to 20+ real-time data sources
• 15+ years of historical data coverage

Our Philosophy:
We believe in empowering human investors, not automating them out of the equation. 
Zom AI handles the heavy lifting of data gathering and analysis, but you remain 
the decision-maker. Like a hammer that extends a carpenter's capabilities, 
Zom AI amplifies your ability to make informed investment decisions.`
  }
}
