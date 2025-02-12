import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Brain, Target, TrendingUp } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    name: "Michael R.",
    role: "Portfolio Manager",
    content: "The coaching program provided invaluable insights into market analysis and risk management. My portfolio performance has significantly improved."
  },
  {
    name: "Sarah L.",
    role: "Day Trader",
    content: "Dom's expertise in technical analysis and AI-driven trading strategies has transformed my approach to the markets. Highly recommended!"
  },
  {
    name: "David K.",
    role: "Investment Analyst",
    content: "The combination of traditional financial wisdom and cutting-edge AI tools makes this coaching program unique and extremely valuable."
  }
]

export function Coaching() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_70%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.05)_25%,transparent_25%,transparent_50%,rgba(59,130,246,0.05)_50%,rgba(59,130,246,0.05)_75%,transparent_75%,transparent)] bg-[length:32px_32px] animate-shine opacity-30"></div>

      <div className="container mx-auto py-section-sm sm:py-section px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Expert Financial Coaching
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock your investment potential with personalized coaching that combines traditional financial wisdom with cutting-edge AI tools.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div className="bg-background-secondary/50 border border-border rounded-lg p-6 hover:border-primary transition-colors group animate-float">
            <Brain className="w-12 h-12 text-primary mb-4 group-hover:animate-glow" />
            <h3 className="text-lg font-bold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-400">Access advanced AI tools and analytics to enhance your trading decisions.</p>
          </div>
          <div className="bg-background-secondary/50 border border-border rounded-lg p-6 hover:border-primary transition-colors group animate-float [animation-delay:200ms]">
            <Target className="w-12 h-12 text-accent mb-4 group-hover:animate-glow" />
            <h3 className="text-lg font-bold mb-2">Personalized Strategy</h3>
            <p className="text-gray-400">Develop a customized trading plan tailored to your goals and risk tolerance.</p>
          </div>
          <div className="bg-background-secondary/50 border border-border rounded-lg p-6 hover:border-primary transition-colors group animate-float [animation-delay:400ms]">
            <TrendingUp className="w-12 h-12 text-primary mb-4 group-hover:animate-glow" />
            <h3 className="text-lg font-bold mb-2">Performance Tracking</h3>
            <p className="text-gray-400">Monitor your progress with detailed analytics and regular performance reviews.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-background-secondary/50 border border-border rounded-lg p-6 hover:border-primary transition-colors group animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get Started Today
          </h2>
          <form className="space-y-4 animate-fade-in">
            <Input 
              placeholder="Name" 
              className="bg-background-secondary/50 border-border focus:border-primary transition-colors h-12" 
            />
            <Input 
              type="email" 
              placeholder="Email" 
              className="bg-background-secondary/50 border-border focus:border-primary transition-colors h-12" 
            />
            <Textarea 
              placeholder="Tell us about your trading experience and goals" 
              className="bg-background-secondary/50 border-border focus:border-primary transition-colors min-h-32" 
            />
            <Button className="w-full bg-primary hover:bg-primary-hover group relative overflow-hidden h-12">
              <span className="relative z-10">Request Coaching</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
