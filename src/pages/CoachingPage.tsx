import { ChevronLeft, ChevronRight, Sparkles, BarChart, BookOpen, Mail } from 'lucide-react'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useEffect } from 'react'
import { animationClasses } from '../utils/styles'
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

function CoachingPage() {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        const el = element as HTMLElement;
        el.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay"></div>
        </div>
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
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className={"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-8 " + animationClasses.fadeInScale}>
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white text-sm font-medium">Transform Your Financial Future</span>
          </div>

          <h1 className={"text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 sm:mb-8 text-white " + animationClasses.fadeInScale + " max-w-[320px] sm:max-w-[600px] mx-auto leading-tight"}>
            Master Your Money with Dom Carfagno's Expertise
          </h1>
          
          <h2 className={"text-lg sm:text-xl md:text-2xl text-white/70 mb-8 sm:mb-10 leading-relaxed max-w-[280px] sm:max-w-xl md:max-w-2xl mx-auto " + animationClasses.fadeInScale}>
            Gain access to cutting-edge tools like Zom AI and Rust, alongside proven investment strategies and personalized guidance to transform your financial future.
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

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent mix-blend-overlay"></div>
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <div className={"relative bg-white/5 p-8 sm:p-10 md:p-12 rounded-3xl mb-12 hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay rounded-3xl"></div>
              <h2 className="text-3xl font-semibold text-white mb-6 relative z-10">What I Bring to the Table</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-white/70 shrink-0" />
                  <div>
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
            </div>

            <div className="relative py-16 sm:py-20 md:py-24 z-20">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent mix-blend-overlay"></div>
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col items-center gap-8 sm:gap-12">
                    <div className="relative w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 group">
                      <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                      <img
                        src="/dom-picx.jpg"
                        alt="Dom Carfagno"
                        className="relative w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full object-cover object-center border-4 border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-[1.02]"
                        loading="eager"
                        draggable="false"
                      />
                    </div>
                    <div className="text-center max-w-3xl">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">Meet Dom Carfagno</h2>
                      <div className="space-y-4 text-white/70 text-base sm:text-lg md:text-xl">
                        <p>
                          Hi, I'm Dom Carfagno, the founder of Carfagno Enterprises. At just 18 years old, I've grown my assets under management to over $100,000, but for me, investing has never just been about the money. It's been about learning, growing, and using finance as a tool to create something bigger than myself. I got into investing early because I was fascinated by how money works, how markets move, and how people make decisions that can change their financial future. I spent hours researching, testing strategies, and figuring out what works. The more I learned, the more I realized that most people never get the chance to truly understand investing, and that's something I want to change.
                        </p>
                        <p>
                          One of the biggest parts of my journey has been founding the <strong className="text-white">Wyndmoor Way Fund</strong> at La Salle College High School. I created it as a student-run investment fund with one mission: to help students who can't afford tuition. Education changed my life, and I believe no one should miss out on opportunities because of financial barriers. Through this fund, we apply real-world investing strategies while directly making an impact on students who need it most. It's more than just an investment portfolio. It's a way to use finance for something real, something that changes lives.
                        </p>
                        <p>
                          Through Carfagno Enterprises, I want to spread financial literacy and give people the tools they need to take control of their future. I believe investing isn't just about making money. It's about building something bigger than yourself. Whether it's helping a family save for college, guiding someone toward financial independence, or supporting students through the Wyndmoor Way Fund, my goal is to use what I've learned to give back and help others succeed.
                        </p>
                        <p>
                          I also believe that technology is one of the greatest tools we have to make finance more accessible. That's why I created Zom AI and Rust—not to replace human decision-making, but to enhance it. These tools make it easier for people to understand the markets, analyze trends, and make smarter financial decisions without getting lost in complicated data.
                        </p>
                        <p>
                          At the end of the day, Carfagno Enterprises is about more than just finance. It's about empowering people, creating opportunities, and using the knowledge I've gained to make an impact. I'm still learning every day, but I know one thing for sure—investing has the power to change lives, and I want to help as many people as possible realize that potential.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
  );
}

export default CoachingPage;
