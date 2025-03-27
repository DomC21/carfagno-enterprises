import { useEffect, useState } from 'react'
import { ChevronRight, Sparkles, User } from 'lucide-react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { animationClasses } from '../utils/styles'
import { MoneyBackground } from '../components/MoneyBackground'
import { CursorEffects } from '../components/CursorEffects'
import { StockMarketAnimation } from '../components/StockMarketAnimation'
import { DataFlowAnimation } from '../components/DataFlowAnimation'
import { GraphAnimation } from '../components/GraphAnimation'
import { Logo } from '../components/Logo'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../lib/api'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../components/ui/form'
const toast = {
  success: (msg: string) => console.log('Success:', msg),
  error: (msg: string) => console.error('Error:', msg)
}

interface MousePosition {
  x: number
  y: number
}

interface WaitlistForm {
  name: string
  email: string
  phoneNumber: string
  preferredPlan: 'basic' | 'pro' | 'enterprise'
}

interface ContactForm {
  name: string
  email: string
  message: string
}

export default function HomePage() {
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Mouse tracking with requestAnimationFrame for performance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    if (!isMobile) {
      let rafId: number
      const handleMouseMove = (e: MouseEvent) => {
        rafId = requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY })
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])
  
  const waitlistForm = useForm<WaitlistForm>({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      preferredPlan: 'basic'
    },
    mode: 'onBlur',
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email'),
        phoneNumber: z.string().optional(),
        preferredPlan: z.enum(['basic', 'pro', 'enterprise'], {
          required_error: 'Please select your preferred plan'
        })
      })
    )
  })
  
  const contactForm = useForm<ContactForm>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
    mode: 'onBlur',
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email'),
        message: z.string().min(10, 'Message must be at least 10 characters')
      })
    )
  })

  const onWaitlistSubmit = async (data: WaitlistForm) => {
    try {
      await api.post('/api/waitlist', data)
      toast.success('Thank you for joining the Zom AI waitlist! We will notify you about early access and special discounts.')
      waitlistForm.reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
      console.error('Waitlist submission error:', error)
    }
  }

  const onContactSubmit = async (data: ContactForm) => {
    try {
      await api.post('/api/contact', data)
      toast.success('Message sent successfully! We will get back to you soon.')
      contactForm.reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
      console.error('Contact form submission error:', error)
    }
  }

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal-up')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
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
      {!isMobile && <CursorEffects mousePos={mousePos} />}
      {/* Hero Section */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-white/10">
        <div className="max-w-[980px] mx-auto px-6 py-3 flex items-center justify-between">
          <Logo className="w-32 hover:opacity-80 transition-all duration-300 cursor-pointer" onClick={() => document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
          <nav className="hidden sm:flex items-center gap-6">
            <Button 
              variant="ghost" 
              className="nav-link text-white/90 hover:text-white px-2 transition-all duration-300"
              onClick={() => navigate('/about')}
            >
              About Us
            </Button>
            <Button 
              variant="ghost" 
              className="nav-link text-white/90 hover:text-white px-2 transition-all duration-300"
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Tools
            </Button>
            <Button 
              variant="ghost" 
              className="nav-link text-white/90 hover:text-white px-2 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Contact
            </Button>
            <Button 
              variant="ghost" 
              className="nav-link text-white/90 hover:text-white px-2 transition-all duration-300"
              onClick={() => navigate('/our-mission')}
            >
              Our Mission
            </Button>
          </nav>
          <button 
            className="sm:hidden text-teal-400 hover:text-teal-300 p-5 text-2xl flex items-center justify-center"
            onClick={() => {
              const nav = document.createElement('div');
              nav.className = 'fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-10 px-6';
              nav.innerHTML = `
                <button class="absolute top-5 right-5 text-teal-400 hover:text-teal-300 p-5 text-3xl">✕</button>
                <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">About Us</button>
                <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Tools</button>
                <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Contact</button>
                <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Our Mission</button>
              `;
              document.body.appendChild(nav);
              
              // Add click handlers
              const buttons = nav.querySelectorAll('button');
              buttons[0].onclick = () => nav.remove();
              buttons[1].onclick = () => { navigate('/about'); nav.remove(); };
              buttons[2].onclick = () => { navigate('/tools'); nav.remove(); };
              buttons[3].onclick = () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); nav.remove(); };
              buttons[4].onclick = () => { navigate('/our-mission'); nav.remove(); };
            }}
          >
            ☰
          </button>
        </div>
      </header>

      <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
        <ErrorBoundary>
          <div className="absolute inset-0 z-0">
            <MoneyBackground className="opacity-90" />
          </div>
          <div className="absolute inset-0 z-10">
            <DataFlowAnimation maxElements={15} className="opacity-95" />
          </div>
          <div className="absolute inset-0 z-20">
            <GraphAnimation className="opacity-90" />
          </div>
          <div className="fixed top-0 left-0 right-0 py-2 z-50">
            <StockMarketAnimation className="bg-black backdrop-blur-md border-b border-white/10" />
          </div>
        </ErrorBoundary>
        <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent mix-blend-overlay pointer-events-none"></div>
        <div className="relative w-full max-w-[980px] mx-auto px-6 py-16 sm:py-20 md:py-24 z-40">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 relative z-40">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">AI-Powered Financial Analysis</span>
            </div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* Large Branding Text */}
              <div className="relative w-full">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1] relative z-40">
                  <span className="relative inline-block">
                    <span className="absolute -inset-2 bg-gradient-to-r from-teal-500/10 via-blue-400/10 to-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></span>
                    <span className="relative inline-block">
                      Introducing Zom AI
                    </span>
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white relative z-40">
                Your AI Companion in the Market
              </h2>

              <p className="text-base sm:text-lg md:text-xl max-w-[600px] mx-auto text-white/80 leading-relaxed relative z-40">
                Get real-time insights, save hours of research, and make more informed decisions—Zom AI does the heavy lifting, so you don't have to.
              </p>
            </div>

            <Button 
              className={cn(
                "group bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto",
                "relative overflow-hidden",
                animationClasses.buttonBase,
                animationClasses.buttonHover,
                animationClasses.buttonGlow,
                animationClasses.fadeInScale
              )}
              onClick={() => navigate('/zom-ai')}
            >
              Learn More About Zom AI
              <ChevronRight className="ml-2 w-5 h-5 inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-visible z-10 bg-black">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6 md:mb-8 parallax" data-speed="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 sm:mb-8">
              <span className="text-white/70 text-sm font-medium">Our Solutions</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 sm:mb-8 text-white">
              Cutting-Edge Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Zom AI Real-Time Analysis */}
            <div className="group relative bg-black rounded-3xl p-8 hover:bg-black/80 transition-all duration-300 border border-teal-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Real-Time Stock Analysis
              </h3>
              <p className="text-white/70 mb-6">
                Get instant insights on any stock you query with comprehensive data and metrics.
              </p>
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 text-white border-0"
                onClick={() => navigate('/zom-ai')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Zom AI Time-Saving */}
            <div className="group relative bg-black rounded-3xl p-8 hover:bg-black/80 transition-all duration-300 border border-teal-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Time-Saving Research
              </h3>
              <p className="text-white/70 mb-6">
                No more hours of research—ask Zom, and get comprehensive answers in seconds.
              </p>
              <Button
                className="w-full bg-white/10 hover:bg-white/20 text-white border-0"
                onClick={() => navigate('/zom-ai')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </div>

            {/* Zom AI Companion */}
            <div className="group relative bg-black rounded-3xl p-8 hover:bg-black/80 transition-all duration-300 border border-teal-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                AI Companion
              </h3>
              <p className="text-white/70 mb-6">
                Zom interprets complex data into plain English so you can make confident decisions.
              </p>
              <Button
                className="w-full bg-white/10 hover:bg-white/20 text-white border-0"
                onClick={() => navigate('/zom-ai')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-visible z-15 bg-black py-12">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <span className="text-white/70 text-sm font-medium">What Users Say</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
              Transforming Trading Decisions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-black/50 border border-teal-500/20 rounded-xl p-8 reveal-on-scroll">
            <p className="text-xl text-white/80 italic mb-6">
              "Zom AI has completely transformed how I research stocks. What used to take me hours now takes minutes. The AI explanations of technical indicators have helped me make more confident trading decisions."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div className="ml-4 text-left">
                <p className="text-white font-medium">John Doe</p>
                <p className="text-white/60 text-sm">Active Trader, 3 years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Access & Subscription */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-visible z-20 bg-black">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4 sm:mb-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 backdrop-blur-sm border border-teal-500/20 mb-6 animate-float">
                <span className="text-teal-400 text-sm font-medium">Waitlist</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Join the Zom AI Waitlist
              </h2>
              
              <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Sign up now for early access and exclusive discounts when Zom AI launches. Be among the first to transform your trading decisions with AI-powered insights.
              </p>
            </div>

            <div className="relative">
              <div className="relative bg-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 md:p-10 reveal-on-scroll">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Form {...waitlistForm}>
                    <form onSubmit={waitlistForm.handleSubmit(onWaitlistSubmit)} className="space-y-6 relative z-50">
                      <div className="space-y-4 relative">
                        <FormField
                          control={waitlistForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="Name" 
                                  className="relative z-50 bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={waitlistForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="Email" 
                                  type="email" 
                                  className="relative z-50 bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={waitlistForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="Phone Number (Optional)" 
                                  type="tel" 
                                  className="relative z-50 bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={waitlistForm.control}
                          name="preferredPlan"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="relative z-50 bg-black backdrop-blur-sm border-teal-500/20 text-gray-300 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50">
                                    <SelectValue placeholder="Select your preferred plan" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black backdrop-blur-sm border-teal-500/20">
                                    <SelectItem value="basic" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Basic Plan</SelectItem>
                                    <SelectItem value="pro" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Pro Plan</SelectItem>
                                    <SelectItem value="enterprise" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Enterprise Plan</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="relative z-10 w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-300 transform-gpu hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/20 hover:brightness-110 border-0">
                        Join the Waitlist
                        <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] flex items-center justify-center overflow-hidden z-20 bg-black">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/60 border border-teal-500/20 mb-6 animate-float">
                <User className="w-5 h-5 text-teal-400 animate-pulse" />
                <span className="text-teal-400 text-sm font-medium">About Me</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6 md:px-8">
              {/* Left Column - Photo */}
              <div className="relative group mx-auto max-w-[280px] sm:max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-teal-500/20 group-hover:border-teal-400/40 transition-colors duration-300">
                  <img
                    src="/dom-picx.jpg"
                    alt="Dom Carfagno"
                    className="w-full h-full object-cover object-center transition-transform duration-300 transform-gpu group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="relative space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent max-w-[320px] sm:max-w-none mx-auto md:mx-0">
                  About Dom Carfagno
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-[300px] sm:max-w-none mx-auto md:mx-0">
                    Hi, I'm Dom Carfagno, the founder of Carfagno Enterprises. With a deep passion for innovation and financial markets, I'm dedicated to creating cutting-edge tools that empower investors to succeed.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden z-30 bg-black">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4 sm:mb-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 backdrop-blur-sm border border-teal-500/20 mb-6 animate-float">
                <User className="w-5 h-5 text-teal-400" />
                <span className="text-teal-400 text-sm font-medium">Get in Touch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Contact Us
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 group text-center sm:text-left">
                <a 
                  href="mailto:support@carfagnoenterprises.com" 
                  className="text-base sm:text-lg md:text-xl text-teal-400 hover:text-blue-400 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:brightness-110 group font-medium break-all sm:break-normal"
                >
                  support@carfagnoenterprises.com
                </a>
              </div>
            </div>

            <div className="relative bg-black backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 md:p-10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6 relative z-10">
                  <div className="space-y-4">
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Name" 
                              className="relative z-10 bg-black backdrop-blur-sm border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Email" 
                              type="email"
                              className="relative z-10 bg-black backdrop-blur-sm border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea 
                              placeholder="Message"
                              className="relative z-10 w-full h-32 bg-black backdrop-blur-sm border border-teal-500/20 rounded-md p-3 sm:p-4 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 focus:ring-2 focus:outline-none text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="relative z-10 w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-300 transform-gpu hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/20 border-0">
                    Send Message
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
