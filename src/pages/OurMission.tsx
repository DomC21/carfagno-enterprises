import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const animationClasses = {
  fadeIn: 'animate-in fade-in duration-700',
  fadeInScale: 'animate-in fade-in zoom-in duration-700',
  slideFromLeft: 'animate-in slide-in-from-left duration-700',
  slideFromRight: 'animate-in slide-in-from-right duration-700'
}

export default function OurMission() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className={cn("text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent", 
              animationClasses.fadeIn
            )}
          >
            Our Mission: Empowering People Through AI
          </motion.h1>
          <p className={cn("mt-6 text-xl text-white/70", animationClasses.fadeIn)}>
            At Carfagno Enterprises, we believe in building AI tools that streamline complex tasks, allowing humans to make confident, informed choices.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.fadeInScale)}>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Core Philosophy</h2>
            <p className="text-white/70 mb-4">
              We believe that AI should augment human intelligence, not replace it. Our solutions—like Zom—are designed to enhance your decision-making process by providing clear, actionable insights while keeping you in control.
            </p>
            <p className="text-white/70">
              Transparency, innovation, and education are central to everything we do. We're committed to demystifying complex financial data and making it accessible to investors at all levels.
            </p>
          </div>
        </div>

        {/* AI for Humans Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.slideFromLeft)}>
            <h2 className="text-2xl font-semibold text-white mb-4">AI for Humans</h2>
            <p className="text-white/70 mb-4">
              Our approach combines advanced analytics, comprehensive data aggregation, and intuitive interfaces to simplify complex financial decisions. Think of our AI tools as a hammer—they amplify your capabilities but rely on your expertise and judgment to be effective.
            </p>
            <p className="text-white/70">
              By focusing on user-friendly design and clear explanations, we ensure that our tools enhance your understanding while streamlining your workflow.
            </p>
          </div>
        </div>

        {/* Impact Examples */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.slideFromRight)}>
            <h2 className="text-2xl font-semibold text-white mb-4">Making an Impact</h2>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>Neural Networks: Automated data processing that highlights key patterns while preserving your strategic control</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>Zom AI: Real-time market analysis that saves hours of research time while enhancing your understanding</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>Educational Focus: Tools that explain their insights, helping you learn and grow as an investor</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Future Vision */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.fadeInScale)}>
            <h2 className="text-2xl font-semibold text-white mb-4">Looking Forward</h2>
            <p className="text-white/70 mb-4">
              As we continue to expand our suite of tools, our commitment remains unchanged: more AI integrations, broader data coverage, and deeper insights—always with the human investor in control.
            </p>
            <p className="text-white/70">
              We're building a future where financial technology empowers rather than replaces human judgment, making sophisticated investment strategies accessible to everyone.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <motion.div className={cn("inline-block", animationClasses.fadeIn)}>
            <a 
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Explore Our Tools
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
