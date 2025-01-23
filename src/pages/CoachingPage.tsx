import { ChevronLeft, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { colorClasses, animationClasses } from '../utils/styles'

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
      <div className="container mx-auto px-4 py-16">
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
          <div className="absolute inset-0 opacity-10 parallax" data-speed="0.15">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(45 212 191) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />
          </div>
        </div>

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
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 ${colorClasses.border} mb-8 ${animationClasses.fadeIn}`}>
              <Sparkles className={`w-5 h-5 ${colorClasses.primary} animate-pulse`} />
              <span className={`${colorClasses.primary} text-sm font-medium`}>Transform Your Financial Future</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent ${animationClasses.slideUp}`}>
              Financial Literacy Coaching with Dom Carfagno
            </h1>
            
            <h2 className={`text-xl sm:text-2xl ${colorClasses.secondary} mb-8 leading-relaxed ${animationClasses.fadeIn}`}>
              Empowering you to take control of your finances, budget effectively, and invest with confidence.
            </h2>

            <div className={`bg-blue-950/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 rounded-xl mb-12 ${animationClasses.fadeIn}`}>
              <p className={`text-lg ${colorClasses.secondary} mb-8 leading-relaxed`}>
                Learn how to budget, invest, and plan for a secure financial future. These one-on-one sessions are tailored to your needs, whether you're just starting or looking to refine your strategies.
              </p>

              <h3 className={`text-xl font-semibold ${colorClasses.primary} mb-6`}>Key Benefits</h3>
              <ul className={`space-y-4 ${colorClasses.secondary} mb-8`}>
                <li className="flex items-start">
                  <span className={`block w-2 h-2 mt-2 mr-3 ${colorClasses.primary} rounded-full`} />
                  <span>Personalized budgeting plans tailored to your goals and lifestyle</span>
                </li>
                <li className="flex items-start">
                  <span className={`block w-2 h-2 mt-2 mr-3 ${colorClasses.primary} rounded-full`} />
                  <span>Introduction to investing and portfolio building strategies</span>
                </li>
                <li className="flex items-start">
                  <span className={`block w-2 h-2 mt-2 mr-3 ${colorClasses.primary} rounded-full`} />
                  <span>Step-by-step guidance on achieving your financial goals</span>
                </li>
              </ul>

              <Button className={`w-full sm:w-auto group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 ${animationClasses.button}`}>
                Book a Coaching Session
              </Button>
            </div>

            {/* Demo Section */}
            <div className={`bg-blue-950/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 rounded-xl mb-12 ${animationClasses.fadeIn}`}>
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

            {/* Signup Form */}
            <div className={`bg-blue-950/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 rounded-xl ${animationClasses.fadeIn}`}>
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
                  <textarea 
                    placeholder="Your Financial Goals"
                    className={`w-full h-32 bg-blue-900/30 ${colorClasses.border} rounded-md p-3 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 focus:ring-2 focus:outline-none text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50`}
                  />
                  <Input 
                    placeholder="Preferred Session Times"
                    className={`bg-blue-900/30 ${colorClasses.border} placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50`}
                  />
                </div>

                <Button className={`w-full sm:w-auto group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 ${animationClasses.button}`}>
                  Submit
                </Button>

                <p className={`text-sm ${colorClasses.secondary} mt-4`}>
                  Thank you for your interest! I'll reach out shortly to confirm your session.
                </p>
              </form>
            </div>

            {/* Testimonials Section - Placeholder */}
            <div className={`bg-blue-950/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 rounded-xl mt-12 ${animationClasses.fadeIn}`}>
              <h2 className={`text-3xl font-bold ${colorClasses.primary} mb-4`}>Success Stories</h2>
              <p className={`text-xl ${colorClasses.secondary} mb-8`}>
                Discover how financial coaching has transformed the lives of our clients.
              </p>
              
              <div className={`bg-blue-900/30 p-6 rounded-lg text-center ${animationClasses.hover}`}>
                <p className={`${colorClasses.secondary} mb-4`}>
                  Success stories coming soon! Join our growing community of financially empowered individuals.
                </p>
                <Button className={`group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 ${animationClasses.button}`}>
                  Be the First to Share Your Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
