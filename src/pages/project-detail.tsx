import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, LineChart, Bot } from 'lucide-react'
import { getProjectById } from '../data/projects'
import { Card, CardContent } from '@/components/ui/card'

const projectIcons = {
  'neural-networks': Brain,
  'lukz': LineChart,
  'zom-ai': Bot
}

export function ProjectDetail() {
  const { id } = useParams()
  const project = getProjectById(id || '')
  
  if (!project) {
    return (
      <div className="pt-section px-4">
        <h1>Project not found</h1>
        <Link to="/" className="text-primary hover:text-primary-hover">
          Return home
        </Link>
      </div>
    )
  }

  const Icon = projectIcons[project.icon]
  
  return (
    <div className="pt-section px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          to="/"
          className="inline-flex items-center text-primary hover:text-primary-hover mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <Icon className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
          </div>

          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            {project.description}
          </p>

          <Card className="bg-background-secondary/50 border-border mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-background-secondary/50 border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
                <ul className="space-y-2">
                  <li>Advanced AI Models</li>
                  <li>Real-time Data Processing</li>
                  <li>Cloud Infrastructure</li>
                  <li>API Integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background-secondary/50 border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="space-y-2">
                  <li>Enhanced Decision Making</li>
                  <li>Real-time Market Insights</li>
                  <li>Automated Analysis</li>
                  <li>Competitive Edge</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
