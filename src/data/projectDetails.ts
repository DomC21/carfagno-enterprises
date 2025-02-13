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
    details: 'Our Neural Networks project combines cutting-edge artificial intelligence with robust data pipelines to create a powerful trading tool. The system processes vast amounts of market data in real-time, identifying patterns and generating trading signals based on historical performance and current market conditions.'
  },
  'lukz': {
    id: 'lukz',
    title: 'Lukz Financial Analytics',
    description: 'A financial analytics platform leveraging API integration for features like Greek flow data and Congressional trades.',
    features: [
      'Real-time options flow analysis',
      'Congressional trade tracking',
      'Greek metrics visualization',
      'Market sentiment analysis',
      'Custom alert system'
    ],
    technologies: [
      'React',
      'Node.js',
      'WebSocket',
      'GraphQL',
      'Time-series databases'
    ],
    benefits: [
      'Institutional-grade market insights',
      'Advanced options analysis',
      'Political trading intelligence',
      'Real-time market alerts',
      'Professional-grade analytics'
    ],
    details: 'Lukz is our flagship financial analytics platform that brings institutional-grade tools to retail traders. By tracking Congressional trades and analyzing options flow data, users gain unique insights into market movements and potential trading opportunities.'
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
    details: 'Zom AI revolutionizes stock analysis by combining the power of ChatGPT with real-time market data. Users can ask questions in natural language and receive instant, AI-powered insights based on current market conditions and historical data.'
  }
}
