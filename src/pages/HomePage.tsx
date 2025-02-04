import { useEffect } from 'react'
import { ChevronRight, Sparkles, User } from 'lucide-react'
import { Logo } from '../components/Logo'
import { MoneyBackground } from '../components/MoneyBackground'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../components/ui/form'

interface EarlyAccessForm {
  name: string
  email: string
  interest: string
}

interface ContactForm {
  name: string
  email: string
  message: string
}

export default function HomePage() {
  const navigate = useNavigate()
  
  const earlyAccessForm = useForm<EarlyAccessForm>({
    defaultValues: {
      name: '',
      email: '',
      interest: ''
    },
    mode: 'onBlur',
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email'),
        interest: z.enum(['neural-networks', 'lukz', 'zom-ai'], {
          required_error: 'Please select your interest'
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

  const onEarlyAccessSubmit = async (data: EarlyAccessForm) => {
    try {
      await api.post('/api/early-access', data)
      toast.success('Thank you for your interest! We will be in touch soon.')
      earlyAccessForm.reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
      console.error('Early access submission error:', error)
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

  // Animation keyframes are now defined in tailwind.config.js

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
      <MoneyBackground />
      {/* Hero Section */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-teal-500/20">
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
            className="sm:hidden text-teal-400 hover:text-teal-300 p-5 text-2xl flex items-center justify-center"
            onClick={() => {
              const nav = document.createElement('div');
              nav.className = 'fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-10 px-6';
              nav.innerHTML = `
                <button class="absolute top-5 right-5 text-teal-400 hover:text-teal-300 p-5 text-3xl">✕</button>
                <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Coaching</button>
                <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Projects</button>
                <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Contact</button>
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

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950/95 via-blue-900/90 to-slate-900/95 pt-16">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/60 backdrop-blur-sm border border-teal-500/20 animate-float">
              <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
              <span className="text-teal-400 text-sm font-medium">Innovating Financial Technology</span>
            </div>

            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent leading-tight animate-slide-up px-4 group">
                <span className="relative">
                  <span className="absolute -inset-1 bg-gradient-to-r from-teal-500/40 to-blue-500/40 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-pulse"></span>
                  <span className="relative">The Future of AI-Driven Financial Intelligence Starts Here</span>
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-[300px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-gray-300 leading-relaxed animate-slide-up px-4">
                Carfagno Enterprises harnesses AI-driven analytics, cutting-edge investment strategies, and proprietary tools to revolutionize financial decision-making.
              </p>
            </div>

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
      <section id="projects" className="relative py-12 sm:py-16 md:py-20 overflow-visible z-10 bg-gradient-to-br from-blue-950/80 via-blue-900/70 to-slate-900/80">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
          <div className="text-center mb-6 sm:mb-8 md:mb-10 parallax" data-speed="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 backdrop-blur-sm border border-teal-500/20 mb-6 sm:mb-8 animate-float">
              <span className="text-teal-400 text-sm font-medium">Our Solutions</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 sm:mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Cutting-Edge Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {/* Neural Networks Card */}
            <div className="group relative bg-gradient-to-br from-blue-950/50 to-blue-900/30 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="relative z-10 text-xl sm:text-2xl font-bold mb-4 text-teal-400 tracking-tight transition-all duration-500 group-hover:text-blue-400">
                Neural Networks and Data Pipeline
              </h3>
              <p className="relative z-10 text-gray-300 text-base sm:text-lg mb-6 max-w-xs">
                A robust trading tool integrating neural networks and a structured data pipeline to analyze stock price trends.
              </p>
              <Button 
                className="relative z-10 w-full group/button bg-blue-900/50 border border-teal-500/20 hover:border-teal-400/50 text-teal-400 transition-all duration-300"
                onClick={() => navigate('/projects/neural-networks')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>

            {/* Lukz Card */}
            <div className="group relative bg-gradient-to-br from-blue-950/50 to-blue-900/30 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="relative z-10 text-xl sm:text-2xl font-bold mb-4 text-teal-400 tracking-tight transition-all duration-500 group-hover:text-blue-400">
                Lukz
              </h3>
              <p className="relative z-10 text-gray-300 text-base sm:text-lg mb-6 max-w-xs">
                A financial analytics platform leveraging API integration for features like Greek flow data and Congressional trades.
              </p>
              <Button 
                className="relative z-10 w-full group/button bg-blue-900/50 border border-teal-500/20 hover:border-teal-400/50 text-teal-400 transition-all duration-300"
                onClick={() => navigate('/projects/lukz')}
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>

            {/* Zom AI Card */}
            <div className="group relative bg-gradient-to-br from-blue-950/50 to-blue-900/30 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="relative z-10 text-xl sm:text-2xl font-bold mb-4 text-teal-400 tracking-tight transition-all duration-500 group-hover:text-blue-400">
                Zom AI
              </h3>
              <p className="relative z-10 text-gray-300 text-base sm:text-lg mb-6 max-w-xs">
                A cutting-edge stock analysis tool offering real-time updates and ChatGPT-powered insights.
              </p>
              <Button 
                className="relative z-10 w-full group/button bg-blue-900/50 border border-teal-500/20 hover:border-teal-400/50 text-teal-400 transition-all duration-300"
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
      <section className="relative py-12 sm:py-16 md:py-20 overflow-visible z-20 bg-gradient-to-br from-blue-900/60 via-blue-950/70 to-slate-900/60">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 backdrop-blur-sm border border-teal-500/20 mb-6 animate-float">
                <span className="text-teal-400 text-sm font-medium">Early Access</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Get Early Access to Our Tools
              </h2>
              
              <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Subscribe to be the first to explore our cutting-edge financial tools and receive exclusive insights.
              </p>
            </div>

            <div className="relative">
              <div className="relative bg-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 md:p-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Form {...earlyAccessForm}>
                    <form onSubmit={earlyAccessForm.handleSubmit(onEarlyAccessSubmit)} className="space-y-6 relative z-50">
                      <div className="space-y-4 relative">
                        <FormField
                          control={earlyAccessForm.control}
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
                          control={earlyAccessForm.control}
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
                          control={earlyAccessForm.control}
                          name="interest"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="relative z-50 bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm border-teal-500/20 text-gray-300 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50">
                                    <SelectValue placeholder="Select your interest" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-blue-950/90 backdrop-blur-sm border-teal-500/20">
                                    <SelectItem value="neural-networks" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Neural Networks</SelectItem>
                                    <SelectItem value="lukz" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Lukz</SelectItem>
                                    <SelectItem value="zom-ai" className="hover:bg-teal-500/10 focus:bg-teal-500/10">Zom AI</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="relative z-10 w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl border-0">
                        Get Early Access
                        <ChevronRight className="ml-2 w-5 h-5 transition-all duration-500 ease-out group-hover:scale-110" />
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
      <section className="relative py-12 sm:py-16 overflow-hidden z-20 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-slate-900/90">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/60 border border-teal-500/20 mb-6 animate-float">
                <User className="w-5 h-5 text-teal-400 animate-pulse" />
                <span className="text-teal-400 text-sm font-medium">About Me</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6 md:px-8">
              {/* Left Column - Photo */}
              <div className="relative group mx-auto max-w-[280px] sm:max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-teal-500/20 group-hover:border-teal-400/40 transition-colors duration-500">
                  <img
                    src="/dom-picx.jpg"
                    alt="Dom Carfagno"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
      <section id="contact" className="relative py-12 sm:py-16 md:py-20 overflow-hidden z-30 bg-gradient-to-br from-blue-900/80 via-blue-950/90 to-slate-900/80">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 backdrop-blur-sm border border-teal-500/20 mb-6 animate-float">
                <User className="w-5 h-5 text-teal-400" />
                <span className="text-teal-400 text-sm font-medium">Get in Touch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Contact Us
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 group text-center sm:text-left">
                <a 
                  href="mailto:DominicCarfagno@carfagnoenterprises.com" 
                  className="text-base sm:text-lg md:text-xl text-teal-400 hover:text-blue-400 transition-all duration-300 transform-gpu hover:scale-[1.02] group font-medium break-all sm:break-normal"
                >
                  DominicCarfagno@carfagnoenterprises.com
                </a>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-blue-950/50 to-blue-900/30 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 sm:p-8 md:p-10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                              className="relative z-10 bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
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
                              className="relative z-10 bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm border-teal-500/20 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
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
                              className="relative z-10 w-full h-32 bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm border border-teal-500/20 rounded-md p-3 sm:p-4 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 focus:ring-2 focus:outline-none text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-teal-400/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="relative z-10 w-full group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-6 text-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl border-0">
                    Send Message
                    <ChevronRight className="ml-2 w-5 h-5 transition-all duration-500 ease-out group-hover:scale-110" />
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
