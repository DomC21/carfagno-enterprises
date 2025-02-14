
import { Link } from 'react-router-dom'
import { Brain, LineChart, Bot } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FeatureCard } from "@/components/ui/feature-card"

const projects = [
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    description: 'A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends.',
    icon: Brain,
    features: [
      'Advanced pattern recognition',
      'Real-time market data processing',
      'Automated trading signals'
    ]
  },
  {
    id: 'lukz',
    title: 'Lukz',
    description: 'A financial analytics platform leveraging API integration for features like Greek flow data and Congressional trades.',
    icon: LineChart,
    features: [
      'Options flow analysis',
      'Congressional trade tracking',
      'Market sentiment analysis'
    ]
  },
  {
    id: 'zom-ai',
    title: 'Zom AI',
    description: 'A cutting-edge stock analysis tool offering real-time updates and ChatGPT-powered insights.',
    icon: Bot,
    features: [
      'AI-powered market analysis',
      'Real-time stock screening',
      'Natural language processing'
    ]
  }
]

export function Projects() {
  return (
    <div className="container mx-auto py-section-sm sm:py-section px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text-animated">
        Our Projects
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-lg sm:max-w-none mx-auto">
        {projects.map((project, index) => {
          const Icon = project.icon
          return (
            <ScrollReveal 
              key={project.id}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <Link 
                to={`/projects/${project.id}`}
                className="block"
              >
                <FeatureCard
                  className="h-full group"
                  glowColor={
                    project.id === 'neural-networks' ? "rgba(59, 130, 246, 0.5)" :
                    project.id === 'lukz' ? "rgba(147, 51, 234, 0.5)" :
                    "rgba(234, 179, 8, 0.5)"
                  }
                >
                  <div className="p-4 sm:p-6">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:animate-glow" />
                    <h3 className="text-lg sm:text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors mt-2">
                      {project.description}
                    </p>
                    <div className="mt-6 space-y-2 border-t border-border pt-4">
                      <p className="text-sm font-medium text-primary">Key Features:</p>
                      {project.features.map((feature, i) => (
                        <p key={i} className="text-sm text-gray-500 group-hover:text-gray-400 flex items-center">
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                </FeatureCard>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
