import { useEffect } from 'react'
import { ChevronRight, Sparkles, User } from 'lucide-react'
import { Logo } from '../components/Logo'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Input } from '../components/ui/input'

export default function HomePage() {
  const navigate = useNavigate()

  // Add custom animations to index.css
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { opacity: 0.4; }
        50% { opacity: 0.6; }
        100% { opacity: 0.4; }
      }
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }
      .animate-slide-up {
        animation: slideUp 0.8s ease-out forwards;
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-pulse-slow {
        animation: pulse 4s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5'
        const yPos = -(scrolled * parseFloat(speed))
        const el = element as HTMLElement
        el.style.transform = 'translateY(' + yPos + 'px)'
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-teal-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo className="hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <nav className="hidden sm:flex items-center gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              className="text-teal-400 hover:text-teal-300 px-2 md:px-4"
              onClick={() => navigate('/coaching')}
            >
              Coaching
            </Button>
            <Button 
              variant="ghost" 
              className="text-teal-400 hover:text-teal-300 px-2 md:px-4"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Projects
            </Button>
            <Button 
              variant="ghost" 
              className="text-teal-400 hover:text-teal-300 px-2 md:px-4"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact
            </Button>
          </nav>
          <button 
            className="sm:hidden text-teal-400 hover:text-teal-300 p-2"
            onClick={() => {
              const nav = document.createElement('div');
              nav.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4';
              nav.innerHTML = `
                <button class="absolute top-4 right-4 text-teal-400 hover:text-teal-300 p-2">✕</button>
                <button class="text-teal-400 hover:text-teal-300 px-4 py-2">Coaching</button>
                <button class="text-teal-400 hover:text-teal-300 px-4 py-2">Projects</button>
                <button class="text-teal-400 hover:text-teal-300 px-4 py-2">Contact</button>
              `;
              document.body.appendChild(nav);
              
              // Add click handlers
              const buttons = nav.querySelectorAll('button');
              buttons[0].onclick = () => nav.remove();
              buttons[1].onclick = () => { navigate('/coaching'); nav.remove(); };
              buttons[2].onclick = () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); nav.remove(); };
              buttons[3].onclick = () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); nav.remove(); };
            }}
          >
            ☰
          </button>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-teal-500/20 mb-8 animate-float">
              <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
              <span className="text-teal-400 text-sm font-medium">Innovating Financial Technology</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black tracking-tight mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent leading-tight animate-slide-up">
              Shaping the Future of Financial Innovation
            </h2>

            <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 md:mb-12 max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-gray-300 leading-relaxed animate-slide-up">
              Carfagno Enterprises empowers investors with cutting-edge solutions for trading, analysis, and insights.
            </p>

            <Button 
              className="group w-full sm:w-auto bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-bold tracking-wide border-0 hover:shadow-lg hover:shadow-teal-500/20 animate-fade-in"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Projects
              <ChevronRight className="ml-2 w-5 h-5 inline-block transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 parallax" data-speed="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-teal-500/20 mb-8 animate-float">
              <span className="text-teal-400 text-sm font-medium">Our Solutions</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Cutting-Edge Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Neural Networks Card */}
            <div className="group relative bg-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400 tracking-tight transition-all duration-500 group-hover:text-blue-400">
                Neural Networks and Data Pipeline
              </h3>
              <p className="text-gray-300 text-base sm:text-lg mb-4">
                A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends.
              </p>
              <Button 
                className="w-full group/button bg-blue-900/50 border border-teal-500/20 hover:border-teal-400/50 text-teal-400 transition-all duration-300"
                onClick={() => navigate('/projects/neural-networks')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>

            {/* Lukz Card */}
            <div className="group relative bg-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400 tracking-tight transition-all duration-500 group-hover:text-blue-400">
                Lukz
              </h3>
              <p className="text-gray-300 text-base sm:text-lg mb-4">
                A financial analytics platform leveraging API integration for features like Greek flow data and Congressional trades.
              </p>
              <Button 
                className="w-full group/button bg-blue-900/50 border border-teal-500/20 hover:border-teal-400/50 text-teal-400 transition-all duration-300"
                onClick={() => navigate('/projects/lukz')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>

            {/* Zom AI Card */}
            <div className="group relative bg-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400 tracking-tight transition-all duration-500 group-hover:text-blue-400">
                Zom AI
              </h3>
              <p className="text-gray-300 text-base sm:text-lg mb-4">
                A cutting-edge stock analysis tool offering real-time updates and ChatGPT-powered insights.
              </p>
              <Button 
                className="w-full group/button bg-blue-900/50 border border-teal-500/20 hover:border-teal-400/50 text-teal-400 transition-all duration-300"
                onClick={() => navigate('/projects/zom-ai')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Access & Subscription */}
      <section className="relative py-12 sm:py-24 overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 sm:mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Get Early Access to Our Tools
              </h2>
              
              <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Subscribe to be the first to explore our cutting-edge financial tools and receive exclusive insights.
              </p>
            </div>

            <div className="relative">
              <div className="relative bg-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8 sm:p-10">
                <form className="space-y-6 relative z-50">
                  <div className="space-y-4 relative">
                    <Input 
                      placeholder="Name" 
                      className="relative z-50 bg-blue-900/30 border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                    />
                    <Input 
                      placeholder="Email" 
                      type="email" 
                      className="relative z-50 bg-blue-900/30 border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                    />
                    <Select>
                      <SelectTrigger className="relative z-50 bg-blue-900/30 border-teal-500/20 text-gray-300 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-950 border-teal-500/20">
                        <SelectItem value="neural-networks" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Neural Networks</SelectItem>
                        <SelectItem value="lukz" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Lukz</SelectItem>
                        <SelectItem value="zom-ai" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Zom AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl border-0">
                    Get Early Access
                    <ChevronRight className="ml-2 w-5 h-5 transition-all duration-500 ease-out group-hover:scale-110" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative py-12 sm:py-24 overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-teal-500/20 mb-8 animate-float">
                <User className="w-5 h-5 text-teal-400 animate-pulse" />
                <span className="text-teal-400 text-sm font-medium">About Me</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Photo */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-teal-500/20 group-hover:border-teal-400/40 transition-colors duration-500">
                  <img
                    src="/dom-picx.jpg"
                    alt="Dom Carfagno"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                  About Dom Carfagno
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Hi, I'm Dom Carfagno, the founder of Carfagno Enterprises. With a deep passion for innovation and financial markets, I'm dedicated to creating cutting-edge tools that empower investors to succeed.
                  </p>
                  <Button
                    className="w-full sm:w-auto group bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-teal-500/20 border-0 transition-all duration-500 hover:scale-[1.02]"
                    onClick={() => navigate('/about')}
                    data-devinid="learn-more-button"
                  >
                    Learn More About Me
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent text-center">
            Contact Us
          </h2>
          <div className="max-w-sm sm:max-w-md md:max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10 group text-center sm:text-left">
              <a 
                href="mailto:DominicCarfagno@carfagnoenterprises.com" 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-400 hover:text-blue-400 transition-all duration-300 transform-gpu hover:scale-[1.02] group font-medium break-all sm:break-normal"
              >
                DominicCarfagno@carfagnoenterprises.com
              </a>
            </div>
            <form className="relative space-y-3 sm:space-y-4 md:space-y-6 bg-blue-950/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl border border-teal-500/20">
              <div className="relative space-y-4">
                <Input 
                  placeholder="Name" 
                  className="relative z-50 bg-blue-900/30 border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50" 
                />
                <Input 
                  placeholder="Email" 
                  type="email" 
                  className="relative z-50 bg-blue-900/30 border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50" 
                />
                <textarea 
                  placeholder="Message"
                  className="relative z-50 w-full h-28 sm:h-32 md:h-40 bg-blue-900/30 border border-teal-500/20 rounded-md p-3 sm:p-4 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 focus:ring-2 focus:outline-none text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                />
                <Button className="w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl border-0">
                  Send Message
                  <ChevronRight className="ml-2 w-5 h-5 transition-all duration-500 ease-out group-hover:scale-110" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
