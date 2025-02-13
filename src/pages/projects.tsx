import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain, LineChart, Bot } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const projects = [
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    description: 'A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends.',
    icon: Brain
  },
  {
    id: 'lukz',
    title: 'Lukz',
    description: 'A financial analytics platform leveraging API integration for features like Greek flow data and Congressional trades.',
    icon: LineChart
  },
  {
    id: 'zom-ai',
    title: 'Zom AI',
    description: 'A cutting-edge stock analysis tool offering real-time updates and ChatGPT-powered insights.',
    icon: Bot
  }
]

export function Projects() {
  return (
    <div className="container mx-auto py-section-sm sm:py-section px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
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
                <Card className="bg-black border-border hover:border-primary transition-all hover:transform hover:scale-105 duration-300 animate-float hover:animate-bounce-hover group h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:animate-glow" />
                    <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
