import { ChevronLeft, ChevronRight, Sparkles, BarChart, BookOpen, Mail } from 'lucide-react'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useEffect } from 'react'
import { DataFlowAnimation } from '../components/DataFlowAnimation'
import { colorClasses, animationClasses } from '../utils/styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

interface CoachingForm {
  name: string
  email: string
  goals: string
  time: string
}

export default function CoachingPage() {
  const navigate = useNavigate()
  const form = useForm<CoachingForm>({
    defaultValues: {
      name: '',
      email: '',
      goals: '',
      time: 'morning'
    },
    mode: 'onBlur',
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email'),
        goals: z.string().min(10, 'Please describe your goals in at least 10 characters'),
        time: z.enum(['morning', 'afternoon', 'evening'], {
          required_error: 'Please select your preferred time'
        })
      })
    )
  })

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[980px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Logo 
              className={"w-32 " + animationClasses.fadeInScale + " hover:opacity-80 transition-all duration-300 cursor-pointer"}
              onClick={() => document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })} 
            />
            <nav className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                className="group bg-white/5 hover:bg-white/10 text-white border-0 transition-all duration-300"
                onClick={() => navigate('/')}
              >
                <ChevronLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Dynamic Background */}
      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <DataFlowAnimation />
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay"></div>
        </div>
          {/* Additional Financial Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-drift">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 2L28 20L20 38L12 20L20 2Z" stroke="currentColor" strokeOpacity="0.5" />
              </svg>
            </div>
            <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 animate-float">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 ${colorClasses.border} mb-8 ${animationClasses.fadeIn}`}>
            <Sparkles className={`w-5 h-5 ${colorClasses.primary} animate-pulse`} />
            <span className={`${colorClasses.primary} text-sm font-medium`}>Transform Your Financial Future</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 sm:mb-8 px-4 bg-gradient-to-r ${colorClasses.gradient.primary} bg-clip-text text-transparent ${animationClasses.slideUp} max-w-[320px] sm:max-w-[600px] mx-auto leading-tight`}>
            Master Your Money with Dom Carfagno's Expertise
          </h1>
          
          <h2 className={`text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-10 leading-relaxed max-w-[280px] sm:max-w-xl md:max-w-2xl mx-auto px-4 ${animationClasses.fadeIn}`}>
            Gain access to cutting-edge tools like Lukz, Zom AI, and Rust, alongside proven investment strategies and personalized guidance to transform your financial future.
          </h2>

          <Button 
            className={"group bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg font-semibold hover:scale-[1.02] border-0 transition-all duration-300 " + animationClasses.fadeInScale}
            onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Book Your Coaching Session Now!
            <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* What I Bring to the Table Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent mix-blend-overlay"></div>
        <section className={"relative bg-white/5 p-8 sm:p-10 md:p-12 rounded-3xl mb-12 hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay rounded-3xl"></div>
          <h2 className="text-3xl font-semibold text-white mb-6 relative z-10">What I Bring to the Table</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-white/70 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Lukz</h3>
                <p className="text-white/70 text-lg">A financial analytics platform providing real-time flow data, Congressional trades, and alerts.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-white/70 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Zom AI</h3>
                <p className="text-white/70 text-lg">AI-powered tool offering advanced metrics, market sentiment, and personalized insights.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-white/70 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Rust</h3>
                <p className="text-white/70 text-lg">A robust investment tracking tool focusing on portfolio optimization.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Dom's Photo Section */}
      <div className="relative min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] flex items-center justify-center z-20 bg-gradient-to-br from-blue-900/60 via-blue-950/70 to-slate-900/60">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-blue-950/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" style={{ height: '60%', bottom: 0 }} />
        <div className="container mx-auto px-4">
          <div className="relative w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 mx-auto group">
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-950/50 to-transparent opacity-50"></div>
            <img
              src="/dom-picx.jpg"
              alt="Dom Carfagno"
              className="relative w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full object-cover object-center border-4 border-teal-500/20 group-hover:border-teal-400/50 transition-all duration-300 group-hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/20"
              loading="eager"
              draggable="false"
            />
            <div className="absolute -bottom-28 sm:-bottom-24 left-1/2 transform -translate-x-1/2 w-full px-4">
              <p className="text-gray-300 text-center text-base sm:text-lg md:text-xl max-w-[300px] sm:max-w-md md:max-w-lg mx-auto leading-relaxed">
                "Hi, I'm Dom Carfagno, the founder of Carfagno Enterprises. With over $100,000 in assets under management at just 18 years old, I've developed proven strategies and tools that empower clients to achieve their financial goals."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent"></div>
        <div className="relative">
          <Button
            variant="ghost"
            className={`mb-12 ${colorClasses.primary} ${colorClasses.hover} group ${animationClasses.button}`}
            onClick={() => navigate('/')}
          >
            <ChevronLeft className={`w-5 h-5 mr-2 ${animationClasses.icon}`} />
            Back to Home
          </Button>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Why Work with Dom Section */}
            <section className={`relative bg-gradient-to-br from-blue-950/80 to-blue-900/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 sm:p-10 md:p-12 rounded-xl mb-12 ${animationClasses.fadeIn}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent"></div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colorClasses.primary} mb-6 sm:mb-8 relative z-10`}>Why Work with Dom Carfagno?</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-teal-400 shrink-0" />
                  <p className="text-lg text-gray-200 leading-relaxed">
                    At just 18 years old, I manage over <span className="text-teal-400 font-semibold">$100,000 in assets</span>, leveraging advanced trading strategies and financial expertise.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-teal-400 shrink-0" />
                  <p className="text-lg text-gray-200 leading-relaxed">
                    Years of hands-on experience in investing, budgeting, and portfolio management, achieving significant results in both stock and cryptocurrency markets.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-teal-400 shrink-0" />
                  <p className="text-lg text-gray-200 leading-relaxed">
                    My strategies are backed by in-depth research, data analysis, and a deep understanding of financial tools and market trends.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-teal-400 shrink-0" />
                  <p className="text-lg text-gray-200 leading-relaxed">
                    Award-winning performance in financial competitions, including success in the St. Joe's Investment Competition, demonstrating practical expertise in market analysis.
                  </p>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className={`relative bg-gradient-to-br from-blue-950/80 to-blue-900/50 ${colorClasses.border} ${colorClasses.borderHover} p-8 sm:p-10 md:p-12 rounded-xl mb-12 ${animationClasses.fadeIn}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent"></div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colorClasses.primary} mb-6 sm:mb-8 relative z-10`}>Services I Offer</h2>
              <div className="space-y-8">
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2.5 rounded-full bg-teal-400 shrink-0" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-teal-400 mb-3">Budgeting Expertise</h3>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        Learn how to create a sustainable budget tailored to your goals. We'll identify areas to cut unnecessary expenses, optimize your savings, and build a step-by-step plan for financial stability and growth.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-teal-400 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-teal-400 mb-2">Investment Coaching</h3>
                      <p className={`${colorClasses.secondary} text-lg`}>
                        Gain actionable insights into stock markets, cryptocurrency, and portfolio diversification. Learn how to analyze trends, minimize risks, and maximize returns with personalized guidance for long-term investment success.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-teal-400 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-teal-400 mb-2">Goal-Setting &amp; Planning</h3>
                      <p className={`${colorClasses.secondary} text-lg`}>
                        Develop clear financial goals and create a roadmap to achieve them. We'll focus on emergency fund setup, planning for major purchases, and building a comprehensive strategy for long-term financial independence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-teal-400 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-teal-400 mb-2">AI-Driven Insights</h3>
                      <p className={`${colorClasses.secondary} text-lg`}>
                        Gain access to cutting-edge AI tools that analyze market trends and provide personalized recommendations tailored to your financial needs. Leverage tools like Lukz and Zom AI for data-driven decision making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Urgency Banner */}
            <div className="relative bg-gradient-to-r from-amber-900/50 via-yellow-900/50 to-amber-900/50 border border-amber-500/20 text-amber-300 p-8 sm:p-10 rounded-xl mb-12 text-center group hover:border-amber-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 animate-pulse" />
              <div className="relative flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <p className="text-lg font-semibold">
                  Limited Time Offer: Sign up by February 15th to get your first coaching session free!
                </p>
              </div>
            </div>

            {/* Success Stories */}
            <div className={"relative bg-white/5 p-8 sm:p-10 md:p-12 rounded-3xl mb-12 hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay rounded-3xl"></div>
              <div className="absolute top-0 right-0 p-4 z-10">
                <BarChart className="w-6 h-6 text-white/50" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 relative z-10">Success Stories</h3>
              <div className="relative z-10">
                <TestimonialCarousel />
              </div>
            </div>

            {/* FAQ Section */}
            <div className={"relative bg-white/5 p-8 sm:p-10 md:p-12 rounded-3xl mb-12 hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay rounded-3xl"></div>
              <div className="absolute top-0 right-0 p-4">
                <BookOpen className="w-6 h-6 text-white/50" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 relative z-10">Frequently Asked Questions</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-white">What will I get in a coaching session?</h4>
                <p className="text-white/70">You'll receive a personalized budget plan, investment guidelines, and ongoing support.</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-white">How long are the sessions?</h4>
                <p className="text-white/70">Each session typically lasts one hour, conducted via video call.</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-white">What topics are covered?</h4>
                <p className="text-white/70">Budgeting, investing, debt management, and more.</p>
              </div>
            </div>

            {/* Signup Form */}
            <div id="signup-form" className={"relative bg-white/5 p-8 sm:p-10 md:p-12 rounded-3xl hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay rounded-3xl"></div>
              <div className="absolute top-0 right-0 p-4">
                <Mail className="w-6 h-6 text-white/50" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-6 relative z-10">Take the first step toward financial freedom</h2>
              <p className="text-xl text-white/70 mb-8">
                Sign up for a personalized coaching session tailored to your goals.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(async (data) => {
                  try {
                    await api.post('/api/contact', {
                      name: data.name,
                      email: data.email,
                      message: `Financial Goals: ${data.goals}\nPreferred Time: ${data.time}`,
                    });
                    toast.success('Thank you! I will contact you within 24 hours to confirm your session.');
                    form.reset();
                  } catch (error) {
                    toast.error('Sorry, there was an error submitting your request. Please try again.');
                    console.error('Coaching form submission error:', error);
                  }
                })} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Name" 
                              className="bg-white/5 border-white/10 placeholder:text-white/50 focus:border-white/20 focus:ring-white/10 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-white/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Email" 
                              type="email"
                              className="bg-white/5 border-white/10 placeholder:text-white/50 focus:border-white/20 focus:ring-white/10 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-white/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea 
                              placeholder="Your Financial Goals"
                              className="w-full h-24 bg-white/5 border-white/10 rounded-md p-3 placeholder:text-white/50 focus:border-white/20 focus:ring-white/10 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-white/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue="morning">
                              <SelectTrigger className="bg-white/5 border-white/10 text-white/70 focus:border-white/20 focus:ring-white/10 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-white/20">
                                <SelectValue placeholder="Preferred Session Time" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 border-white/10">
                                <SelectItem value="morning" className="hover:bg-white/5 focus:bg-white/5">Morning (9AM - 12PM)</SelectItem>
                                <SelectItem value="afternoon" className="hover:bg-white/5 focus:bg-white/5">Afternoon (1PM - 5PM)</SelectItem>
                                <SelectItem value="evening" className="hover:bg-white/5 focus:bg-white/5">Evening (6PM - 8PM)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className={"w-full group bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg font-semibold hover:scale-[1.02] border-0 transition-all duration-300 " + animationClasses.fadeInScale}
                  >
                    Schedule Your Session
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>

                  <p className="text-sm text-white/70 mt-4">
                    I'll reach out within 24 hours to confirm your session details.
                  </p>
                </form>
              </Form>
            </div>


          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
