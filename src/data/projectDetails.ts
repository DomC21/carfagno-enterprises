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
    description: 'A cutting-edge stock analysis tool designed to make complex financial data and advanced market insights accessible to everyone. By combining real-time data from top providers with next-generation language models, Zom empowers investors of all levels.',
    features: [
      'Natural language stock queries',
      'Real-time market data analysis',
      'AI-powered insights',
      'Interactive research tools',
      'Comprehensive data integration'
    ],
    technologies: [
      'OpenAI GPT',
      'Machine Learning',
      'Natural Language Processing',
      'Real-time Data Processing',
      'Cloud Infrastructure'
    ],
    benefits: [
      'All-in-One Platform',
      'Easy-to-Understand Explanations',
      'Educational & Empowering',
      'High-Tech & Futuristic',
      'Institutional-Grade Insights'
    ],
    details: `Zom AI is a cutting-edge stock analysis tool designed to make complex financial data and advanced market insights accessible to everyone. By combining real-time data from top providers with next-generation language models, Zom empowers investors of all levels.

Ask Any Stock Question
• Get immediate answers about earnings, insider trades, or options flow activity
• No more sifting through dense reports or navigating multiple platforms
• Type your query and receive clear, concise explanations

Leverage AI Insights
• Advanced language modeling interprets financial metrics in plain English
• Like having a personal research analyst available 24/7
• Break down everything from P/E ratios to insider transactions

Access Vast Market Data in Real-Time
• Options flow and congressional trades via Unusual Whales
• Historical stock prices and technical indicators from Alpha Vantage
• Deep fundamental statements through FinancialDatasets.ai
• Up-to-the-second updates on volatility, earnings, and institutional holdings

Conduct Deeper Research
• Highlight major news events and unusual market activity
• Incorporate economic calendar data for context
• Compare company fundamentals and analyze sector impacts
• AI-powered analysis and summaries on demand

Technical Capabilities
• <500ms response time for natural language queries
• Process 10,000+ documents daily
• 92% accuracy in sentiment analysis
• Access to 20+ real-time data sources
• 15+ years of historical data coverage

Zom AI's Vision
Our mission is to democratize financial analysis, removing barriers and bringing institutional-grade insights to every investor. Zom AI bridges the gap between raw market data and actionable knowledge, so you can focus on making decisions instead of drowning in spreadsheets and technical documents.`
  }
}
