import { ChevronLeft, ChevronRight, Mail, Users } from 'lucide-react'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useEffect } from 'react'
import { DataFlowAnimation } from '../components/DataFlowAnimation'
import { animationClasses } from '../utils/styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../components/ui/form'
import { OrgChart, TeamMember } from '../components/ui/org-chart'

interface SupportForm {
  name: string
  email: string
  question: string
}

// Team member data
const teamMembers = [
  {
    id: "dom",
    name: "Dom Carfagno",
    role: "CEO & Founder",
    bio: "Founded Carfagno Enterprises with a vision to revolutionize financial technology through AI-driven tools and solutions.",
    reports: ["cole", "nolan", "max", "jack"]
  },
  {
    id: "cole",
    name: "Cole Cowan",
    role: "CFO",
    bio: "Oversees financial operations and strategy, ensuring sustainable growth while maintaining focus on innovation."
  },
  {
    id: "nolan",
    name: "Nolan Corcorann",
    role: "Head of Product",
    bio: "Leads product development, translating market needs into powerful financial tools that empower users.",
    reports: ["darryl"]
  },
  {
    id: "darryl",
    name: "Darryl Kurriger",
    role: "APM (Product Management)",
    bio: "Works closely with development teams to refine features and enhance user experience across all products."
  },
  {
    id: "max",
    name: "Max Wickersham",
    role: "CMO",
    bio: "Directs marketing strategy to communicate the value of our AI-driven financial tools to potential users."
  },
  {
    id: "jack",
    name: "Jack Luethe",
    role: "Head of Media & Design",
    bio: "Creates the visual identity and user interfaces that make our complex tools accessible and intuitive."
  }
];

function AboutUsPage() {
  const navigate = useNavigate()
  const form = useForm<SupportForm>({
    defaultValues: {
      name: '',
      email: '',
      question: ''
    },
    mode: 'onBlur',
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email'),
        question: z.string().min(10, 'Please describe your question in at least 10 characters')
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
        <DataFlowAnimation />
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
            <Users className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white text-sm font-medium">Meet Our Team</span>
          </div>

          <h1 className={"text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 sm:mb-8 text-white " + animationClasses.fadeInScale + " max-w-[320px] sm:max-w-[600px] mx-auto leading-tight"}>
            About Carfagno Enterprises
          </h1>
          
          <h2 className={"text-lg sm:text-xl md:text-2xl text-white/70 mb-8 sm:mb-10 leading-relaxed max-w-[280px] sm:max-w-xl md:max-w-2xl mx-auto " + animationClasses.fadeInScale}>
            We build AI-driven financial tools to empower users, not provide one-on-one coaching.
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent mix-blend-overlay"></div>
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <div className={"relative bg-white/5 p-8 sm:p-10 md:p-12 rounded-3xl mb-12 hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay rounded-3xl"></div>
              <h2 className="text-3xl font-semibold text-white mb-6 relative z-10">Our Mission</h2>
              <p className="text-white/70 text-lg mb-6 relative z-10">
                At Carfagno Enterprises, we're dedicated to building AI-driven financial tools that empower users to make informed investment decisions. Our mission is to democratize access to sophisticated financial analysis through intuitive, powerful technology.
              </p>
              <p className="text-white/70 text-lg relative z-10">
                We believe that by combining cutting-edge AI with deep financial expertise, we can create tools that transform how people interact with financial markets, making complex data accessible and actionable for everyone.
              </p>
            </div>

            <div className="relative py-16 sm:py-20 md:py-24 z-20">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent mix-blend-overlay"></div>
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-semibold text-white mb-10 text-center">Our Team</h2>
                  
                  {/* Visual Org Chart */}
                  <div className="mb-12">
                    <OrgChart members={teamMembers as TeamMember[]} className="mb-8" />
                    <p className="text-center text-white/70 text-sm">Interactive org chart - hover over team members to see their bios</p>
                  </div>
                  
                  {/* Team Grid (for mobile and as additional detail) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 border border-teal-500/20">
                        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-teal-400 text-sm mb-4">{member.role}</p>
                        <p className="text-white/70">{member.bio}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div id="support-form" className={"relative bg-white/5 p-8 sm:p-10 md:p-12 rounded-3xl hover:bg-white/10 transition-all duration-300 " + animationClasses.fadeInScale}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-900/30 mix-blend-overlay rounded-3xl"></div>
              <div className="absolute top-0 right-0 p-4">
                <Mail className="w-6 h-6 text-white/50" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-6 relative z-10">Need Help With Our Tools?</h2>
              <p className="text-xl text-white/70 mb-8">
                Schedule a call for assistance with Zom AI or any of our other solutions.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(async (data) => {
                  try {
                    await api.post('/api/contact', {
                      name: data.name,
                      email: data.email,
                      message: `Tool Support Question: ${data.question}`,
                    });
                    toast.success('Thank you! We will contact you within 24 hours to schedule a tool help session.');
                    form.reset();
                  } catch (error) {
                    toast.error('Sorry, there was an error submitting your request. Please try again.');
                    console.error('Support form submission error:', error);
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
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea 
                              placeholder="What do you need help with?"
                              className="w-full h-24 bg-white/5 border-white/10 rounded-md p-3 placeholder:text-white/50 focus:border-white/20 focus:ring-white/10 text-base sm:text-lg transition-all duration-300 transform-gpu hover:border-white/20"
                              {...field}
                            />
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
                    Schedule a Tool Help Session
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>

                  <p className="text-sm text-white/70 mt-4">
                    We'll reach out within 24 hours to schedule your tool help session.
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

export default AboutUsPage;
