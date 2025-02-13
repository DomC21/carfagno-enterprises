import { useEffect } from 'react'
import { Brain, LineChart, Bot, Mail, ChevronRight, Sparkles, Code, Network } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FinancialPatterns } from '@/components/ui/financial-patterns'
import { MarketDataStream } from '@/components/ui/market-data-stream'

function App() {
  // Define consistent color and animation classes for reuse
  const colorClasses = {
    primary: 'text-teal-400',
    secondary: 'text-gray-300',
    accent: 'text-blue-400',
    hover: 'hover:text-teal-400',
    border: 'border-teal-500/20',
    borderHover: 'hover:border-teal-500',
    gradient: {
      primary: 'from-teal-400 to-blue-500',
      background: 'from-blue-900 via-blue-950 to-slate-900',
      glow: 'from-teal-500/20 to-blue-500/20'
    }
  }

  const animationClasses = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    hover: 'transition-all duration-500 ease-out hover:scale-105',
    button: 'transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl',
    icon: 'transition-all duration-500 ease-out group-hover:scale-110',
    parallax: 'transition-transform duration-1000 ease-out'
  }

  // Add custom animations to index.css
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

  // Parallax scroll effect
  const handleScroll = () => {
    const scrolled = window.scrollY
    const parallaxElements = document.querySelectorAll('.parallax')
    
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-speed') || '0.5'
      const yPos = -(scrolled * parseFloat(speed))
      const el = element as HTMLElement;
      el.style.transform = 'translateY(' + yPos + 'px)';
    })
  }

  // Add scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      id: 'neural-networks',
      title: 'Neural Networks and Data Pipeline',
      description: 'A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends, predict market movements, and generate actionable signals. Key components include technical indicators, backtesting, and an intuitive dashboard.'
    },
    {
      id: 'lukz',
      title: 'Lukz',
      description: 'A financial analytics platform leveraging API integration for features like Greek flow data, Congressional trades, and premium flow analysis. It includes interactive visualizations and real-time data updates for investors.'
    },
    {
      id: 'zom-ai',
      title: 'Zom AI',
      description: 'A cutting-edge stock analysis tool offering real-time updates, technical and fundamental metrics, and ChatGPT-powered insights to bridge the gap between data and understanding.'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MarketDataStream />
      <FinancialPatterns />
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-blue-950/95 backdrop-blur-sm border-b border-teal-500/20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4 md:p-6 lg:p-8 space-y-4 md:space-y-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight transition-all duration-300">
            <span className={`bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent`}>Carfagno</span>
            <span className="text-white"> Enterprises</span>
          </h1>
          <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12">
            <a href="#home" className={`text-sm sm:text-base md:text-lg font-semibold ${colorClasses.secondary} ${colorClasses.hover} transition-all duration-300`}>Home</a>
            <a href="#projects" className={`text-sm sm:text-base md:text-lg font-semibold ${colorClasses.secondary} ${colorClasses.hover} transition-all duration-300`}>Projects</a>
            <a href="#contact" className={`text-sm sm:text-base md:text-lg font-semibold ${colorClasses.secondary} ${colorClasses.hover} transition-all duration-300`}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br ${colorClasses.gradient.background} text-white py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden`}>
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Technology-themed pattern overlay */}
          <div className="absolute inset-0 opacity-10 parallax" data-speed="0.1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent" />
            {/* Circuit board pattern */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: `
                linear-gradient(to right, ${colorClasses.primary.replace('text-', '')}1a 1px, transparent 1px),
                linear-gradient(to bottom, ${colorClasses.primary.replace('text-', '')}1a 1px, transparent 1px),
                radial-gradient(circle at 24px 24px, ${colorClasses.primary.replace('text-', '')}1a 2px, transparent 2px)
              `,
              backgroundSize: '48px 48px, 48px 48px, 96px 96px'
            }} />
          </div>
          
          {/* Technology Shapes with Parallax */}
          <div className="absolute inset-0">
            {/* Central glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.15)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
            
            {/* Floating tech orbs */}
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-30 animate-float parallax`} data-speed="0.3" style={{ animationDelay: '0s' }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.4)_0%,transparent_70%)] animate-pulse-slow" />
            </div>
            
            <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-30 animate-float parallax`} data-speed="0.4" style={{ animationDelay: '2s' }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.4)_0%,transparent_70%)] animate-pulse-slow" />
            </div>
            
            {/* Additional tech elements */}
            <div className={`absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br ${colorClasses.gradient.glow} rounded-full blur-xl opacity-20 animate-float parallax`} data-speed="0.25" style={{ animationDelay: '1s' }} />
            <div className={`absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-tl ${colorClasses.gradient.glow} rounded-full blur-xl opacity-20 animate-float parallax`} data-speed="0.35" style={{ animationDelay: '3s' }} />
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-blue-950/30 backdrop-blur-sm parallax" data-speed="0.15" />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center relative">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border ${colorClasses.border} mb-6 transform-gpu ${animationClasses.fadeIn}`} style={{ animationDelay: '0.1s' }}>
            <Sparkles className={`w-5 h-5 ${colorClasses.primary} animate-pulse`} />
            <span className={`${colorClasses.primary} text-sm font-medium`}>Innovating Financial Technology</span>
          </div>

          <h2 className={`text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black tracking-tight mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent leading-tight transform-gpu ${animationClasses.slideUp}`} style={{ animationDelay: '0.2s' }}>
            Shaping the Future of Financial Innovation
          </h2>

          <p className={`text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 md:mb-12 max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-gray-300 leading-relaxed transform-gpu ${animationClasses.slideUp}`} style={{ animationDelay: '0.3s' }}>
            Carfagno Enterprises empowers investors with cutting-edge solutions for trading, analysis, and insights.
          </p>

          <Button className={`group w-full sm:w-auto bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-bold tracking-wide ${animationClasses.button} border-0 hover:shadow-lg hover:shadow-teal-500/20 transform-gpu ${animationClasses.fadeIn}`} style={{ animationDelay: '0.4s' }}>
            Explore Our Projects
            <ChevronRight className="ml-2 w-5 h-5 inline-block transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Message Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
          
          {/* Collaborative Pattern with Parallax */}
          <div className="absolute inset-0 opacity-10 parallax" data-speed="0.15">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `radial-gradient(circle at 2px 2px, ${colorClasses.primary.replace('text-', '')} 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }} />
          </div>

          {/* Floating Elements */}
          <div className={`absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-30 animate-float parallax`} data-speed="0.3" style={{ animationDelay: '1s' }} />
          <div className={`absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-l ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-30 animate-float parallax`} data-speed="0.4" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-teal-500/20 mb-8">
              <Code className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400 text-sm font-medium">Revolutionary Technology</span>
            </div>
            
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-8 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent`}>
              Innovative Tools for a Changing World
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-12">
              Join us as we revolutionize financial insights and empower investors to make smarter decisions.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className={`group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20 border-0`}>
                Get Started
                <ChevronRight className="ml-2 w-5 h-5 inline-block transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 parallax" data-speed="0.15">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `radial-gradient(circle at 2px 2px, ${colorClasses.primary.replace('text-', '')} 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }} />
          </div>

          {/* Floating Elements */}
          <div className={`absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-30 animate-float parallax`} data-speed="0.3" style={{ animationDelay: '1s' }} />
          <div className={`absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-l ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-30 animate-float parallax`} data-speed="0.4" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-teal-500/20 mb-8">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400 text-sm font-medium">About Me</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse-slow" />
                <img
                  src="/images/dom-profile.jpg"
                  alt="Dom Carfagno"
                  className="relative w-full h-full object-cover rounded-full border-2 border-teal-500/20 shadow-xl shadow-teal-500/10"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent ${animationClasses.slideUp}`}>
                  Dom Carfagno
                </h2>
                
                <p className={`text-xl text-gray-300 leading-relaxed mb-8 ${animationClasses.fadeIn}`} style={{ animationDelay: '0.2s' }}>
                  Hi, I'm Dom Carfagno, the founder of Carfagno Enterprises. With a passion for innovation and financial markets, I strive to empower investors through cutting-edge tools and insights.
                </p>

                <div className={`flex justify-center md:justify-start ${animationClasses.fadeIn}`} style={{ animationDelay: '0.4s' }}>
                  <Button 
                    className={`group bg-gradient-to-r ${colorClasses.gradient.primary} text-white px-8 py-6 text-lg font-semibold ${animationClasses.button} border-0 hover:shadow-lg hover:shadow-teal-500/20`}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Contact Me
                    <ChevronRight className="ml-2 w-5 h-5 inline-block transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 opacity-5 parallax" data-speed="0.15">
            <Network className="w-full h-full text-teal-400 animate-pulse-slow" />
          </div>
          
          {/* Floating Elements */}
          <div className={`absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.2" style={{ animationDelay: '1.5s' }} />
          <div className={`absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-l ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.25" style={{ animationDelay: '3.5s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 parallax" data-speed="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-teal-500/20 mb-8 animate-float" style={{ animationDelay: '0.5s' }}>
              <Sparkles className={`w-5 h-5 text-teal-400 ${animationClasses.icon}`} />
              <span className="text-teal-400 text-sm font-medium">Our Solutions</span>
            </div>
            
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-8 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent ${animationClasses.slideUp}`}>
              Cutting-Edge Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`group relative bg-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 
                  transition-all duration-500 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10
                  hover:animate-bounce-hover cursor-pointer
                  ${animationClasses.fadeIn}`}
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.glow} blur-xl`} />
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-center mb-6 sm:mb-8">
                    {project.id === 'neural-networks' && 
                      <Brain className={`w-12 sm:w-16 h-12 sm:h-16 ${colorClasses.primary} transition-all duration-500 group-hover:scale-110 group-hover:text-blue-400 animate-float`} style={{ animationDelay: '0.2s' }} />}
                    {project.id === 'lukz' && 
                      <LineChart className={`w-12 sm:w-16 h-12 sm:h-16 ${colorClasses.primary} transition-all duration-500 group-hover:scale-110 group-hover:text-blue-400 animate-float`} style={{ animationDelay: '0.4s' }} />}
                    {project.id === 'zom-ai' && 
                      <Bot className={`w-12 sm:w-16 h-12 sm:h-16 ${colorClasses.primary} transition-all duration-500 group-hover:scale-110 group-hover:text-blue-400 animate-float`} style={{ animationDelay: '0.6s' }} />}
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${colorClasses.primary} tracking-tight transition-all duration-500 group-hover:text-blue-400 ${animationClasses.slideUp}`} style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                    {project.title}
                  </h3>

                  {/* Short Description (Always Visible) */}
                  <p className={`text-gray-300 text-base sm:text-lg mb-4 ${animationClasses.fadeIn}`} style={{ animationDelay: `${0.4 + index * 0.2}s` }}>
                    {project.description.split('. ')[0]}.
                  </p>

                  {/* Extended Description (Visible on Hover) */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-48 opacity-0 group-hover:opacity-100">
                    <p className={`text-gray-400 text-sm sm:text-base mb-8`}>
                      {project.description.split('. ').slice(1).join('. ')}
                    </p>
                  </div>

                  <Button 
                    className={`w-full group/button bg-blue-900/50 border border-teal-500/20 hover:border-teal-400/50 text-teal-400 transition-all duration-300 ${animationClasses.fadeIn}`} 
                    style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                    onClick={() => {
                      const element = document.getElementById(`${project.id}-details`)
                      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }}
                  >
                    Learn More
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/button:translate-x-1" />
                  </Button>

                  {/* Hidden anchor for scroll target */}
                  <div id={`${project.id}-details`} className="hidden" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Access & Subscription */}
      <section className="relative py-12 sm:py-24 overflow-hidden">
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
          <div className="absolute inset-0 opacity-10 parallax" data-speed="0.15">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `radial-gradient(circle at 2px 2px, ${colorClasses.primary.replace('text-', '')} 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
          
          {/* Floating Elements */}
          <div className={`absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.3" style={{ animationDelay: '1s' }} />
          <div className={`absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-l ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.4" style={{ animationDelay: '2.5s' }} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-900/50 border border-teal-500/20 mb-6 sm:mb-8">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                <span className="text-teal-400 text-xs sm:text-sm font-medium">Early Access</span>
              </div>
              
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 sm:mb-8 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent`}>
                Get Early Access to Our Tools
              </h2>
              
              <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Subscribe to be the first to explore our cutting-edge financial tools and receive exclusive insights.
              </p>
            </div>

            <div className="relative">
              {/* Glow Effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-75" />
              
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

                  <Button className="w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 border-0 transform-gpu hover:scale-[1.02]">
                    Get Early Access
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 transform-gpu" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
          
          {/* Floating Elements */}
          <div className={`absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.3" style={{ animationDelay: '1.5s' }} />
          <div className={`absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-l ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.4" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent text-center ${animationClasses.slideUp}`}>Contact Us</h2>
          <div className={`max-w-sm sm:max-w-md md:max-w-xl mx-auto ${animationClasses.fadeIn}`} style={{ animationDelay: '0.2s' }}>
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10 group text-center sm:text-left ${animationClasses.fadeIn}`} style={{ animationDelay: '0.4s' }}>
              <Mail className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${colorClasses.primary} ${animationClasses.icon}`} />
              <a 
                href="mailto:DominicCarfagno@carfagnoenterprises.com" 
                className={`text-base sm:text-lg md:text-xl lg:text-2xl ${colorClasses.primary} hover:${colorClasses.accent.replace('text-', '')} transition-all duration-300 transform-gpu hover:scale-[1.02] group font-medium break-all sm:break-normal`}
              >
                DominicCarfagno@carfagnoenterprises.com
              </a>
            </div>
            <form className={`relative space-y-3 sm:space-y-4 md:space-y-6 bg-blue-950/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl border border-teal-500/20 ${animationClasses.fadeIn}`} style={{ animationDelay: '0.6s' }}>
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-75" />
              
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
                <Button className="w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 border-0 transform-gpu hover:scale-[1.02]">
                  Send Message
                  <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 transform-gpu" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 border-t border-teal-500/20 overflow-hidden">
        {/* Background Pattern with Parallax */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient.background} parallax`} data-speed="0.1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow parallax" data-speed="0.2" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 parallax" data-speed="0.15">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `radial-gradient(circle at 2px 2px, ${colorClasses.primary.replace('text-', '')} 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }} />
          </div>

          {/* Floating Elements */}
          <div className={`absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.3" style={{ animationDelay: '1s' }} />
          <div className={`absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-l ${colorClasses.gradient.glow} rounded-full blur-3xl opacity-20 animate-float parallax`} data-speed="0.4" style={{ animationDelay: '2.5s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
              {/* Contact Information */}
              <div className="text-center md:text-left space-y-6">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent ${animationClasses.slideUp}`}>
                  Contact Us
                </h3>
                <a 
                  href="mailto:DominicCarfagno@carfagnoenterprises.com"
                  className="group inline-flex items-center gap-2 text-gray-300 hover:text-teal-400 transition-all duration-300 transform-gpu hover:scale-[1.02]"
                >
                  <Mail className="w-5 h-5 text-teal-400 transition-transform group-hover:scale-110 transform-gpu" />
                  <span>DominicCarfagno@carfagnoenterprises.com</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="text-center md:text-right">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent mb-6 ${animationClasses.slideUp}`}>
                  Connect With Us
                </h3>
                <div className="flex justify-center md:justify-end space-x-6">
                  <button className="p-2 rounded-lg bg-blue-900/30 border border-teal-500/20 text-teal-400 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:border-teal-400/50 cursor-not-allowed disabled:opacity-50" disabled>
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg bg-blue-900/30 border border-teal-500/20 text-teal-400 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:border-teal-400/50 cursor-not-allowed disabled:opacity-50" disabled>
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg bg-blue-900/30 border border-teal-500/20 text-teal-400 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:border-teal-400/50 cursor-not-allowed disabled:opacity-50" disabled>
                    <span className="sr-only">GitHub</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-teal-500/20 text-center">
              <p className={`text-gray-400 ${animationClasses.fadeIn}`} style={{ animationDelay: '0.4s' }}>
                © 2025 Carfagno Enterprises. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
