
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Card } from '../components/ui/card'
import { projectDetails } from '../data/projectDetails'
import { ScrollReveal } from '../components/ui/scroll-reveal'
import { NeuralNetworksDemo } from '../components/demos/NeuralNetworksDemo'
import { ZomAIDemo } from '../components/demos/ZomAIDemo'

const demoComponents = {
  'neural-networks': NeuralNetworksDemo,
  'zom-ai': ZomAIDemo
}

export default function ProjectDetail() {
  const { id } = useParams()
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [id])

  if (!id || !projectDetails[id]) {
    return <Navigate to="/projects" replace />
  }

  const project = projectDetails[id]

  if (isLoading) {
    return (
      <div className="container mx-auto py-section-sm sm:py-section px-4">
        <Card className="bg-black border-border p-6 mb-6">
          <div className="h-8 w-3/4 bg-gray-800 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-1/2 bg-gray-800 rounded-lg animate-pulse mb-8" />
          <div className="h-24 w-full bg-gray-800 rounded-lg animate-pulse" />
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-black border-border p-6">
              <div className="h-6 w-1/3 bg-gray-800 rounded-lg animate-pulse mb-4" />
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 w-full bg-gray-800 rounded-lg animate-pulse" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-section-sm sm:py-section px-4">
      <ScrollReveal>
        <Card className="bg-black border-border p-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">{project.description}</p>
          <div className="text-lg text-gray-200 mb-8">{project.details}</div>
        </Card>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal delay={0.1}>
          <Card className="bg-black border-border p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Card className="bg-black border-border p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Technologies</h2>
            <ul className="space-y-2">
              {project.technologies.map((tech, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {tech}
                </li>
              ))}
            </ul>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Card className="bg-black border-border p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Benefits</h2>
            <ul className="space-y-2">
              {project.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
        </ScrollReveal>
      </div>

      {/* Project Demo */}
      <ScrollReveal delay={0.4}>
        <Card className="bg-black border-border p-6 mt-6">
          <h2 className="text-xl font-semibold mb-6 text-primary">Interactive Demo</h2>
          {id && demoComponents[id as keyof typeof demoComponents] && (
            React.createElement(demoComponents[id as keyof typeof demoComponents])
          )}
        </Card>
      </ScrollReveal>
    </div>
  )
}
