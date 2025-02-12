import { useParams } from 'react-router-dom'
import { MetricsCard } from '@/components/ui/metrics-card'
import { PriceChart } from '@/components/ui/price-chart'
import { PerformanceChart } from '@/components/ui/performance-chart'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

interface ProjectData {
  title: string
  description: string
  metrics: {
    cagr: string
    sharpeRatio: string
    maxDrawdown: string
  }
  features: string[]
  roadmap: string[]
  priceData: {
    date: string
    actual: number
    predicted?: number
  }[]
  performanceData: {
    period: string
    return: number
    benchmark?: number
  }[]
}

const projectsData: Record<string, ProjectData> = {
  'neural-networks': {
    title: 'Neural Networks and Data Pipeline',
    description: 'A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends. Our advanced AI models process market data in real-time to identify profitable trading opportunities.',
    metrics: {
      cagr: '32.5%',
      sharpeRatio: '2.8',
      maxDrawdown: '-12.4%'
    },
    features: [
      'Real-time market data processing',
      'Advanced neural network architecture',
      'Automated trading signals',
      'Risk management integration',
      'Performance analytics dashboard'
    ],
    roadmap: [
      'Enhanced model architecture - Q2 2024',
      'Multi-asset support - Q3 2024',
      'Real-time backtesting - Q4 2024',
      'Advanced risk metrics - Q1 2025'
    ],
    priceData: [
      { date: '2024-01', actual: 100, predicted: 102 },
      { date: '2024-02', actual: 105, predicted: 107 },
      { date: '2024-03', actual: 110, predicted: 112 }
    ],
    performanceData: [
      { period: '1M', return: 8.5, benchmark: 2.1 },
      { period: '3M', return: 15.2, benchmark: 5.8 },
      { period: '6M', return: 28.4, benchmark: 12.3 }
    ]
  },
  'lukz': {
    title: 'Lukz',
    description: 'A financial analytics platform leveraging API integration for features like Greek flow data and Congressional trades. Stay ahead of the market with real-time insights from institutional trading patterns.',
    metrics: {
      cagr: '28.7%',
      sharpeRatio: '2.4',
      maxDrawdown: '-15.2%'
    },
    features: [
      'Greek flow analysis',
      'Congressional trade tracking',
      'Real-time alerts',
      'Custom screening tools',
      'Portfolio optimization'
    ],
    roadmap: [
      'Options flow integration - Q2 2024',
      'Machine learning signals - Q3 2024',
      'Social sentiment analysis - Q4 2024',
      'Advanced portfolio analytics - Q1 2025'
    ],
    priceData: [
      { date: '2024-01', actual: 100 },
      { date: '2024-02', actual: 108 },
      { date: '2024-03', actual: 115 }
    ],
    performanceData: [
      { period: '1M', return: 7.2, benchmark: 2.1 },
      { period: '3M', return: 14.8, benchmark: 5.8 },
      { period: '6M', return: 25.6, benchmark: 12.3 }
    ]
  },
  'zom-ai': {
    title: 'Zom AI',
    description: 'A cutting-edge stock analysis tool offering real-time updates and ChatGPT-powered insights. Harness the power of AI to understand market sentiment and make data-driven investment decisions.',
    metrics: {
      cagr: '35.2%',
      sharpeRatio: '2.6',
      maxDrawdown: '-13.8%'
    },
    features: [
      'AI-powered market analysis',
      'Natural language processing',
      'Sentiment analysis',
      'Automated research reports',
      'Real-time news integration'
    ],
    roadmap: [
      'Enhanced AI models - Q2 2024',
      'Custom chatbot training - Q3 2024',
      'Multi-language support - Q4 2024',
      'Advanced visualization tools - Q1 2025'
    ],
    priceData: [
      { date: '2024-01', actual: 100, predicted: 103 },
      { date: '2024-02', actual: 112, predicted: 110 },
      { date: '2024-03', actual: 118, predicted: 115 }
    ],
    performanceData: [
      { period: '1M', return: 9.1, benchmark: 2.1 },
      { period: '3M', return: 16.5, benchmark: 5.8 },
      { period: '6M', return: 30.2, benchmark: 12.3 }
    ]
  }
}

export function ProjectDetail() {
  const { id } = useParams()
  const project = id ? projectsData[id] : null

  if (!project) {
    return (
      <div className="container mx-auto py-section-sm sm:py-section px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Project Not Found
        </h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-section-sm sm:py-section px-4">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          {project.description}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <ScrollReveal delay={0.1} direction="left">
          <MetricsCard 
            title="CAGR" 
            value={project.metrics.cagr} 
            description="Compound Annual Growth Rate" 
          />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <MetricsCard 
            title="Sharpe Ratio" 
            value={project.metrics.sharpeRatio} 
            description="Risk-Adjusted Returns" 
          />
        </ScrollReveal>
        <ScrollReveal delay={0.3} direction="right">
          <MetricsCard 
            title="Max Drawdown" 
            value={project.metrics.maxDrawdown} 
            description="Maximum Peak to Trough Decline" 
          />
        </ScrollReveal>
      </div>

      {/* Charts */}
      <div className="space-y-12 mb-12">
        <ScrollReveal delay={0.4}>
          <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Performance Analysis</h2>
            <PriceChart data={project.priceData} />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Returns Comparison</h2>
            <PerformanceChart data={project.performanceData} />
          </div>
        </ScrollReveal>
      </div>

      {/* Features */}
      <div className="mb-12 animate-fade-in [animation-delay:600ms]">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Key Features
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.features.map((feature, index) => (
            <li 
              key={index}
              className="flex items-center space-x-2 text-gray-400"
            >
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Roadmap */}
      <div className="animate-fade-in [animation-delay:800ms]">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Development Roadmap
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.roadmap.map((milestone, index) => (
            <div 
              key={index}
              className="bg-background-secondary/50 border border-border rounded-lg p-4 hover:border-primary transition-colors"
            >
              {milestone}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
