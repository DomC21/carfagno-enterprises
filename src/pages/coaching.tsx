import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'

export function Coaching() {
  return (
    <div className="pt-section px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 items-start"
        >
          {/* About Section */}
          <div>
            <div className="mb-6">
              <img 
                src="/dom-picx.jpg" 
                alt="Dom Carfagno" 
                className="rounded-lg w-full max-w-md mx-auto shadow-lg"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Dom Carfagno</h1>
            <p className="text-lg text-gray-300 mb-6">
              Hi, I'm Dom Carfagno, the founder of Carfagno Enterprises. With a deep passion for innovation and financial markets, I'm dedicated to creating cutting-edge tools that empower investors to succeed.
            </p>
            <Card className="bg-background-secondary/50 border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Expertise</h2>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>AI-Driven Financial Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Market Strategy Development</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Investment Technology</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Trading Systems Architecture</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-background-secondary/50 border-border">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      className="bg-background border-border focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-background border-border focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      className="bg-background border-border focus:border-primary transition-colors min-h-32"
                      placeholder="Tell me about your goals..."
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
