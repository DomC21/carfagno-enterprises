
import { ChevronLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'

export default function AboutPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-teal-500/20">
        <div className="container mx-auto px-4 py-4">
          <Logo className="hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 pt-24">
        <Button
          variant="ghost"
          className="mb-8 text-teal-400 hover:text-teal-300 group"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            About Dom Carfagno
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Founder of Carfagno Enterprises, dedicated to revolutionizing financial technology through innovative solutions and cutting-edge tools.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-blue-950/50 border border-teal-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-teal-400 mb-4">Vision & Mission</h2>
            <p className="text-gray-300 mb-4">
              My mission is to bridge the gap between complex financial data and actionable insights. Through Carfagno Enterprises, I'm building cutting-edge tools that combine AI technology with financial expertise to revolutionize how investors interact with market data.
            </p>
            <p className="text-gray-300">
              With a strong foundation in financial analysis and strategic investment planning, I focus on developing innovative solutions that transform complex market data into actionable insights.
            </p>
          </div>
        </div>

        {/* Achievements Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-teal-400 mb-8">Key Milestones</h2>
          <div className="space-y-8">
            <div className="relative pl-8 pb-8 border-l-2 border-teal-500/20">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-teal-400"></div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">St. Joe's Investment Competition Winner</h3>
              <p className="text-gray-300">
                Led a team to victory in the St. Joe's Investment Competition, demonstrating exceptional skills in financial analysis and strategic investment planning.
              </p>
            </div>
            <div className="relative pl-8 pb-8 border-l-2 border-teal-500/20">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-teal-400"></div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">Financial Technology Innovation</h3>
              <p className="text-gray-300">
                Developed multiple cutting-edge financial tools, including neural network-based trading systems and advanced data analytics platforms.
              </p>
            </div>
            <div className="relative pl-8 border-l-2 border-teal-500/20">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-teal-400"></div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">Leadership Excellence</h3>
              <p className="text-gray-300">
                Recognized for exceptional leadership skills and innovative approach to financial technology development.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-teal-400 mb-4">Let's Connect</h2>
            <p className="text-gray-300 mb-6">
              Interested in learning more about our innovative financial tools or discussing potential collaborations?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="group bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                onClick={() => navigate('/#contact')}
              >
                Contact Me
                <ChevronLeft className="ml-2 w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                className="group bg-blue-900/50 border border-teal-500/20 text-teal-400"
                onClick={() => navigate('/#subscribe')}
              >
                Subscribe for Updates
                <ChevronLeft className="ml-2 w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
