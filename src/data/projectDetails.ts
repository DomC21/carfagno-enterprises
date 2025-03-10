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
    description: 'A cutting-edge stock analysis tool offering real-time updates and ChatGPT-powered insights.',
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
    details: `Zom AI harnesses cutting-edge artificial intelligence to revolutionize stock analysis. The system features:

• Custom-trained GPT models optimized for financial analysis
• Real-time market data integration via multiple data providers
• Advanced natural language processing for sentiment analysis
• Automated research report generation with ML-based insights
• Real-time stock screening with custom metrics
• Multi-model ensemble for market predictions
• Automated due diligence pipeline
• Real-time news sentiment analysis

Technical Architecture:
1. AI Core: Custom-trained GPT models + ML ensemble
2. Data Pipeline: Real-time market feeds + news aggregation
3. Analysis Engine: NLP models + sentiment analysis
4. Research Generation: Automated report creation
5. Query Interface: Natural language processing

Performance Metrics:
• Query Response Time: <500ms
• Daily Document Analysis: 10,000+
• Sentiment Analysis Accuracy: 92%
• Real-time Data Sources: 20+
• Historical Data Coverage: 15+ years

AI Capabilities:
• Natural language market analysis
• Automated technical analysis
• Fundamental analysis automation
• News impact assessment
• Risk analysis and scoring
• Pattern recognition in market data
• Predictive analytics for market trends`
  }
}
