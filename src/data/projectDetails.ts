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
    title: 'Zom AI: Your Real-Time Stock Analysis Companion',
    description: 'Ask Zom about any ticker\'s fundamentals, technicals, or news - and get instant, AI-driven clarity. Zom AI helps investors gather market data from multiple sources in one place, explain key metrics, and highlight important insights - so you can focus on making informed decisions quickly.',
    features: [
      'Real-time quotes and fundamentals analysis',
      'Technical indicators with plain English explanations',
      'Options flow and unusual activity monitoring',
      'AI-generated market insights and summaries',
      'Personalized stock screening and alerts'
    ],
    technologies: [
      'OpenAI GPT-4',
      'TensorFlow',
      'Natural Language Processing',
      'Real-time Data Processing',
      'Cloud Infrastructure',
      'WebSocket APIs'
    ],
    benefits: [
      'Save hours on market research',
      'Make data-driven decisions',
      'Never miss important signals',
      'Understand complex metrics easily',
      'Stay ahead of market moves'
    ],
    details: `Zom AI is your intelligent market companion, designed to transform complex financial data into clear, actionable insights.

Data Integration:
• Unusual Whales: Real-time options flow, insider trades, dark pool activity
• Alpha Vantage: Live market data, technical indicators, fundamentals
• FinancialDatasets.ai: Deep company analysis, institutional holdings

Core Capabilities:
• Instant Data Analysis: <500ms response time for market queries
• Comprehensive Coverage: Process 10,000+ documents daily
• High Accuracy: 92% accuracy in sentiment analysis
• Extensive Sources: Access to 20+ real-time data feeds
• Historical Context: 15+ years of market data

How Zom AI Works:
1. You Ask a Question: "What's happening with AAPL?"
2. Zom Gathers Data: Pulling real-time quotes, fundamentals, recent trades
3. AI Analysis: Interpreting trends, patterns, and market sentiment
4. Clear Answers: Plain English explanations of complex metrics

Key Features:
• Real-Time Market Pulse: Instant quotes, trends, and momentum indicators
• Technical Analysis Helper: RSI, MACD, and other indicators explained simply
• Options Flow Insights: Spot unusual activity and big institutional moves
• AI Research Assistant: Automated analysis of news and market events
• Custom Alerts: Personalized notifications for your watchlist

Coming Soon (Q2 2025):
• Advanced Pattern Recognition System
• Enhanced Options Chain Analysis
• Real-Time Earnings Impact Assessment
• Institutional Money Flow Tracking

Weekly Updates:
• New technical indicators
• Improved natural language processing
• Enhanced visualization tools
• Expanded data sources`
  }
}
