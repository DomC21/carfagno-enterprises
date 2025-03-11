
import { Link } from 'react-router-dom'
import { Brain, Bot, UserPlus } from "lucide-react"
import { FeatureCard } from "../components/ui/feature-card"
import { motion } from "framer-motion"
import { EnhancedTooltip } from "../components/ui/enhanced-tooltip"
import { type LucideIcon } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  gradient: string
}

const projects: Project[] = [
  {
    id: 'follow-dom',
    title: 'Follow Dom',
    description: 'Subscribe to see Dom\'s trades in real-time, complete with risk scores and instant SMS alerts for both equities and options.',
    icon: UserPlus,
    features: [
      'Real-time trade alerts',
      'Risk scoring (0-10)',
      'SMS notifications'
    ],
    gradient: 'from-emerald-500 via-emerald-600 to-emerald-700'
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    description: 'A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends.',
    icon: Brain,
    features: [
      'Advanced pattern recognition',
      'Real-time market data processing',
      'Automated trading signals'
    ],
    gradient: 'from-blue-500 via-blue-600 to-blue-700'
  },
  {
    id: 'zom-ai',
    title: 'Zom AI',
    description: 'Zom AI taps into a vast amount of market, fundamental, and alternative data from top providers such as Unusual Whales, Alpha Vantage, and FinancialDatasets.ai, delivering up-to-date insights on stocks, options, insider trades, and more.',
    icon: Bot,
    features: [
      'AI-powered market analysis',
      'Real-time stock screening',
      'Natural language processing'
    ],
    gradient: 'from-yellow-500 via-yellow-600 to-yellow-700'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

export default function Projects() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text-animated">
            Our Projects
          </h1>
          <p className="text-gray-300 text-xl sm:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Explore our cutting-edge financial technology solutions powered by artificial intelligence
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link 
                  to={`/projects/${project.id}`}
                  className="block h-full"
                >
                  <EnhancedTooltip
                    content={project.title}
                    description="Click to explore detailed features and live demo"
                    side="top"
                  >
                    <FeatureCard
                      className="h-full group transform-gpu transition-all duration-300 hover:translate-y-[-4px]"
                      glowColor={
                        project.id === 'follow-dom' ? "rgba(16, 185, 129, 0.5)" :
                        project.id === 'neural-networks' ? "rgba(59, 130, 246, 0.5)" :
                        "rgba(234, 179, 8, 0.5)"
                      }
                    >
                      <div className="p-8 sm:p-10">
                        <div className={`w-20 h-20 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br ${project.gradient} shadow-xl transform-gpu transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}>
                          <Icon className="w-10 h-10 text-white transform-gpu transition-transform duration-300 group-hover:rotate-3" />
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-extrabold mb-6 tracking-tight">
                          {project.title}
                        </h3>
                        
                        <p className="text-lg sm:text-xl text-gray-300 group-hover:text-white transition-colors duration-300 mb-10 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="space-y-5">
                          <h4 className="text-xl font-bold text-primary tracking-tight">Key Features</h4>
                          {project.features.map((feature, i) => (
                            <EnhancedTooltip
                              key={i}
                              content="Feature Detail"
                              description={feature}
                              side="right"
                            >
                              <div 
                                className="flex items-center gap-4 text-gray-400 group-hover:text-gray-200 transition-all duration-300 transform-gpu hover:translate-x-2"
                              >
                                <div className="w-3 h-3 rounded-full bg-primary transform-gpu transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-lg">{feature}</span>
                              </div>
                            </EnhancedTooltip>
                          ))}
                        </div>
                      </div>
                    </FeatureCard>
                  </EnhancedTooltip>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
