
import { ChevronLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { Footer } from '../components/Footer'
import { animationClasses } from '../utils/styles'

export default function AboutPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[980px] mx-auto px-6 py-3">
          <Logo className={"w-32 " + animationClasses.fadeInScale + " hover:opacity-80 transition-all duration-300 cursor-pointer"} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-8 text-white">
            About Dom Carfagno
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Founder of Carfagno Enterprises, dedicated to revolutionizing financial technology through innovative solutions and cutting-edge tools.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={"bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
            <h2 className="text-2xl font-semibold text-white mb-4">Vision & Mission</h2>
            <p className="text-white/70 mb-4">
              My mission is to bridge the gap between complex financial data and actionable insights. Through Carfagno Enterprises, I'm building cutting-edge tools that combine AI technology with financial expertise to revolutionize how investors interact with market data.
            </p>
            <p className="text-white/70">
              With a strong foundation in financial analysis and strategic investment planning, I focus on developing innovative solutions that transform complex market data into actionable insights.
            </p>
          </div>
        </div>

        {/* Achievements Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-teal-400 mb-8">Key Milestones</h2>
          <div className="space-y-8">
            <div className={"relative pl-8 pb-8 border-l-2 border-white/10 " + animationClasses.fadeInScale}>
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white/70"></div>
              <h3 className="text-xl font-semibold text-white mb-2">St. Joe's Investment Competition Winner</h3>
              <p className="text-white/70">
                Led a team to victory in the St. Joe's Investment Competition, demonstrating exceptional skills in financial analysis and strategic investment planning.
              </p>
            </div>
            <div className={"relative pl-8 pb-8 border-l-2 border-white/10 " + animationClasses.fadeInScale} style={{ animationDelay: '0.2s' }}>
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white/70"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Financial Technology Innovation</h3>
              <p className="text-white/70">
                Developed multiple cutting-edge financial tools, including neural network-based trading systems and advanced data analytics platforms.
              </p>
            </div>
            <div className={"relative pl-8 border-l-2 border-white/10 " + animationClasses.fadeInScale} style={{ animationDelay: '0.4s' }}>
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white/70"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Leadership Excellence</h3>
              <p className="text-white/70">
                Recognized for exceptional leadership skills and innovative approach to financial technology development.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <div className={"bg-white/5 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
            <h2 className="text-2xl font-semibold text-white mb-4">Let's Connect</h2>
            <p className="text-white/70 mb-6">
              Interested in learning more about our innovative financial tools or discussing potential collaborations?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="group bg-white/10 hover:bg-white/20 text-white border-0 transition-all duration-300"
                onClick={() => navigate('/#contact')}
              >
                Contact Me
                <ChevronLeft className="ml-2 w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                className="group bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-0 transition-all duration-300"
                onClick={() => navigate('/#subscribe')}
              >
                Subscribe for Updates
                <ChevronLeft className="ml-2 w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
