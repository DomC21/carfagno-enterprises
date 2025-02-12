// No need for explicit React import with JSX transform
import { Link } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Brain, LineChart, Bot } from "lucide-react"
import { motion } from 'framer-motion'
import { FinancialPatterns } from "../components/ui/financial-patterns"

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Stock Ticker */}
      <div className="fixed top-0 w-full overflow-hidden whitespace-nowrap py-2 bg-background/30 backdrop-blur-sm z-50">
        <div className="flex relative">
          <div className="animate-ticker inline-block min-w-full px-2 absolute left-0">
            <span className="mx-4 text-primary font-medium">AAPL +2.3%</span>
            <span className="mx-4 text-accent font-medium">TSLA +5.1%</span>
            <span className="mx-4 text-accent-gold font-medium">GOOGL -0.8%</span>
            <span className="mx-4 text-primary font-medium">MSFT +1.7%</span>
            <span className="mx-4 text-accent font-medium">NVDA +3.2%</span>
            <span className="mx-4 text-primary font-medium">META +2.1%</span>
          </div>
          <div className="animate-ticker-clone inline-block min-w-full px-2 absolute left-full">
            <span className="mx-4 text-primary font-medium">AAPL +2.3%</span>
            <span className="mx-4 text-accent font-medium">TSLA +5.1%</span>
            <span className="mx-4 text-accent-gold font-medium">GOOGL -0.8%</span>
            <span className="mx-4 text-primary font-medium">MSFT +1.7%</span>
            <span className="mx-4 text-accent font-medium">NVDA +3.2%</span>
            <span className="mx-4 text-primary font-medium">META +2.1%</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-section-sm sm:pt-section pb-section-sm sm:pb-section px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-shine"></div>
        <FinancialPatterns />
        <div className="container mx-auto text-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow-text relative"
          >
            AI-Driven Financial Intelligence
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-50 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl -z-10 animate-glow-effect"></div>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="text-xl sm:text-2xl text-gray-300 mb-6 sm:mb-8 px-4"
          >
            Your Competitive Edge in the Market
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Explore Our Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 animate-shine"></div>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-section-sm sm:py-section px-4 bg-background-secondary/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
        <div className="container mx-auto relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
            Cutting-Edge Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-lg sm:max-w-none mx-auto">
            <Link to="/projects/neural-networks">
              <Card className="group bg-background-secondary/50 border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 animate-float will-change-transform">
                <CardHeader className="p-4 sm:p-6">
                  <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:animate-glow transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">Neural Networks</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                    A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/projects/lukz">
              <Card className="group bg-background-secondary/50 border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/10 animate-float [animation-delay:200ms] will-change-transform">
                <CardHeader className="p-4 sm:p-6">
                  <LineChart className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-4 group-hover:animate-glow transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle className="text-lg sm:text-xl group-hover:text-accent transition-colors duration-300">Lukz</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                    A financial analytics platform leveraging API integration for features like Greek flow data and Congressional trades.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/projects/zom-ai">
              <Card className="group bg-background-secondary/50 border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 animate-float [animation-delay:400ms] sm:col-span-2 lg:col-span-1 sm:max-w-md lg:max-w-none mx-auto w-full will-change-transform">
                <CardHeader className="p-4 sm:p-6">
                  <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:animate-glow transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">Zom AI</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                    A cutting-edge stock analysis tool offering real-time updates and ChatGPT-powered insights.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-section-sm sm:py-section px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_70%)] animate-pulse"></div>
        <div className="container mx-auto max-w-md sm:max-w-lg lg:max-w-2xl relative animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <div className="space-y-4 relative px-4 sm:px-0">
            <Input 
              className="bg-background-secondary/50 border-border focus:border-primary transition-colors h-12" 
              placeholder="Name" 
            />
            <Input 
              className="bg-background-secondary/50 border-border focus:border-primary transition-colors h-12" 
              type="email" 
              placeholder="Email" 
            />
            <Textarea 
              className="bg-background-secondary/50 border-border focus:border-primary transition-colors min-h-24 sm:min-h-32" 
              placeholder="Message" 
            />
            <Button className="w-full bg-primary hover:bg-primary-hover group relative overflow-hidden h-12 sm:h-14">
              <span className="relative z-10">Send Message</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
