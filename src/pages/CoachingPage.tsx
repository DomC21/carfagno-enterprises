import { ChevronLeft, ChevronRight, Sparkles, Target, BarChart, BookOpen, Mail } from 'lucide-react'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useEffect } from 'react'
import { colorClasses, animationClasses } from '../utils/styles'
import { BudgetDemo } from '../components/BudgetDemo'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

export default function CoachingPage() {
  const navigate = useNavigate()

  // Add parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5'
        const yPos = -(scrolled * parseFloat(speed))
        const el = element as HTMLElement
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-teal-500/20">
        <div className="container mx-auto px-4 py-4">
          <Logo className="hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
      </header>

      {/* Hero Section with Dynamic Background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.15)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
          <div className="absolute inset-0 opacity-20 parallax" data-speed="0.15">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(45 212 191) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />
          </div>
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 ${colorClasses.border} mb-8 ${animationClasses.fadeIn}`}>
            <Sparkles className={`w-5 h-5 ${colorClasses.primary} animate-pulse`} />
            <span className={`${colorClasses.primary} text-sm font-medium`}>Transform Your Financial Future</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent ${animationClasses.slideUp}`}>
            Transform Your Financial Future Today!
          </h1>
          
          <h2 className={`text-xl sm:text-2xl md:text-3xl ${colorClasses.secondary} mb-8 leading-relaxed max-w-4xl mx-auto ${animationClasses.fadeIn}`}>
            Learn to budget, invest, and secure your future with expert guidance and personalized strategies.
          </h2>

          <Button 
            className={`group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 ${animationClasses.button}`}
            onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now!
            <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Dom's Photo Section */}
      <div className="relative -mt-12 mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black to-black" style={{ height: '50%', bottom: 0 }} />
        <div className="container mx-auto px-4">
          <div className="relative w-48 h-48 mx-auto group">
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/Dom PICX.jpg"
              alt="Dom Carfagno"
              className="relative w-48 h-48 rounded-full object-cover border-4 border-teal-500/20 group-hover:border-teal-400/50 transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-max">
              <p className="text-gray-300 text-center text-lg">
                "Hi, I'm Dom Carfagno, and I'm here to help you<br />
                take control of your financial journey."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="relative">
          <Button
            variant="ghost"
            className={`mb-8 ${colorClasses.primary} ${colorClasses.hover} group ${animationClasses.button}`}
            onClick={() => navigate('/')}
          >
            <ChevronLeft className={`w-5 h-5 mr-2 ${animationClasses.icon}`} />
            Back to Home
          </Button>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Urgency Banner */}
            <div className="relative bg-gradient-to-r from-yellow-900/50 via-amber-900/50 to-yellow-900/50 border border-yellow-500/20 text-yellow-300 p-6 rounded-xl mb-8 text-center group hover:border-yellow-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-yellow-500/5 animate-pulse" />
              <div className="relative flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <p className="text-lg font-semibold">
                  Limited Time Offer: Sign up by December 31st to get your first coaching session free!
                </p>
              </div>
            </div>

            <div className="mb-12">
              <BudgetDemo />
            </div>

            {/* Demo Section */}
            <div className={`relative bg-gradient-to-br from-blue-950/80 to-blue-900/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 rounded-xl mb-12 ${animationClasses.fadeIn}`}>
              <div className="absolute top-0 right-0 p-4">
                <Target className={`w-6 h-6 ${colorClasses.primary} opacity-50`} />
              </div>
              <h2 className={`text-3xl font-bold ${colorClasses.primary} mb-4`}>Experience a Demo Coaching Session</h2>
              <p className={`text-xl ${colorClasses.secondary} mb-8`}>
                Get a sneak peek into how coaching can transform your financial life.
              </p>

              {/* Video Placeholder */}
              <div className={`relative aspect-video bg-blue-900/30 rounded-lg mb-8 overflow-hidden group ${animationClasses.hover}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`${colorClasses.secondary} mb-4`}>Demo Video Coming Soon</p>
                    <ul className="text-sm text-gray-500 space-y-2 mb-4">
                      <li>• Brief explanation of budgeting techniques</li>
                      <li>• Simple investing tips</li>
                      <li>• How to approach financial goal-setting</li>
                    </ul>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <Button className={`w-full sm:w-auto group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 ${animationClasses.button}`}>
                Watch the Full Demo
              </Button>
            </div>

            {/* Success Stories */}
            <div className="relative mb-12">
              <div className="absolute top-0 right-0 p-4 z-10">
                <BarChart className={`w-6 h-6 ${colorClasses.primary} opacity-50`} />
              </div>
              <h3 className="text-2xl font-bold text-teal-400 mb-4">Success Stories</h3>
              <TestimonialCarousel />
            </div>

            {/* FAQ Section */}
            <div className="relative bg-gradient-to-br from-blue-950/80 to-blue-900/30 p-6 rounded-xl mb-12">
              <div className="absolute top-0 right-0 p-4">
                <BookOpen className={`w-6 h-6 ${colorClasses.primary} opacity-50`} />
              </div>
              <h3 className="text-2xl font-bold text-teal-400 mb-4">Frequently Asked Questions</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-300">What will I get in a coaching session?</h4>
                <p className="text-gray-400">You'll receive a personalized budget plan, investment guidelines, and ongoing support.</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-300">How long are the sessions?</h4>
                <p className="text-gray-400">Each session typically lasts one hour, conducted via video call.</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-300">What topics are covered?</h4>
                <p className="text-gray-400">Budgeting, investing, debt management, and more.</p>
              </div>
            </div>

            {/* Signup Form */}
            <div id="signup-form" className={`relative bg-gradient-to-br from-blue-900/30 to-blue-950/80 ${colorClasses.border} ${colorClasses.borderHover} p-8 rounded-xl ${animationClasses.fadeIn}`}>
              <div className="absolute top-0 right-0 p-4">
                <Mail className={`w-6 h-6 ${colorClasses.primary} opacity-50`} />
              </div>
              <h2 className={`text-3xl font-bold ${colorClasses.primary} mb-4`}>Sign Up for Coaching</h2>
              <p className={`text-xl ${colorClasses.secondary} mb-8`}>
                Take the first step towards your financial goals. Fill out the form below and I'll reach out to confirm your session.
              </p>

              <form className="space-y-6">
                <div className="space-y-4">
                  <Input 
                    placeholder="Name" 
                    className={`bg-blue-900/30 ${colorClasses.border} placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50`}
                  />
                  <Input 
                    placeholder="Email" 
                    type="email"
                    className={`bg-blue-900/30 ${colorClasses.border} placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50`}
                  />
                  <Input 
                    placeholder="Your Financial Goals" 
                    className={`bg-blue-900/30 ${colorClasses.border} placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50`}
                  />
                  <Select>
                    <SelectTrigger className={`bg-blue-900/30 ${colorClasses.border} text-gray-300 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50`}>
                      <SelectValue placeholder="Preferred Session Time" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-teal-500/20">
                      <SelectItem value="morning" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Afternoon (1PM - 5PM)</SelectItem>
                      <SelectItem value="evening" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Evening (6PM - 8PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className={`w-full group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 ${animationClasses.button}`}>
                  Start My Financial Journey!
                </Button>

                <p className={`text-sm ${colorClasses.secondary} mt-4`}>
                  Thank you for your interest! I'll reach out shortly to confirm your session.
                </p>
              </form>
            </div>


          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
