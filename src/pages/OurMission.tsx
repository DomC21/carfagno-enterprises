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
            className={cn("text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent text-center mb-6", 
              animationClasses.fadeIn
            )}
          >
            Democratizing AI-driven investing for everyone
          </motion.h1>
          <motion.p 
            className={cn("text-2xl sm:text-3xl text-white/90 max-w-3xl mx-auto text-center mb-6", 
              animationClasses.fadeIn
            )}
          >
            Empowering investors at all levels with intuitive AI tools, transparent data, and hands-on education
          </motion.p>
          <p className={cn("text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto text-center", animationClasses.fadeIn)}>
            Our intuitive AI tools let everyday investors make data-driven decisions—while retaining full control.
          </p>
        </div>

        {/* Core Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.fadeInScale)}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Our Philosophy: Empowering, Not Replacing</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white/70 text-lg">
                Think of our AI tools like a hammer—they amplify your capabilities but rely on your expertise and judgment to be effective. We're not here to replace human decision-making, we're here to enhance it.
              </p>
              <p className="text-white/70 text-lg">
                Every feature we build focuses on making complex financial data clear and actionable, putting you in the driver's seat of your investment journey.
              </p>
              <div className="mt-6">
                <a href="/projects/zom-ai" className="text-teal-400 hover:text-teal-300 font-medium flex items-center gap-2">
                  Learn more about our approach
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.slideFromLeft)}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Accessibility</h3>
                <p className="text-white/70">Making sophisticated investment tools available to everyone, not just Wall Street.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Transparency</h3>
                <p className="text-white/70">Clear explanations of how our AI makes recommendations, no black boxes.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Education</h3>
                <p className="text-white/70">Tools that teach as they work, helping you grow as an investor.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Innovation</h3>
                <p className="text-white/70">Constantly improving our technology while keeping humans in control.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How We're Making It Happen */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.slideFromRight)}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">How We're Making It Happen</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Zom AI: Your Investment Co-pilot</h3>
                <p className="text-white/70 mb-2">Real-time market analysis that saves hours of research time while enhancing your understanding. It's like having a tireless research assistant who never sleeps.</p>
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <p className="text-white/90 font-medium">Why Zom AI Matters:</p>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Real-time insights from multiple data sources</li>
                    <li>Personalized dashboards for your strategy</li>
                    <li>Clear explanations behind every recommendation</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Neural Networks: Pattern Recognition</h3>
                <p className="text-white/70">Advanced algorithms that process vast amounts of market data to identify patterns, while always leaving the final decision in your hands.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-2">Educational Resources</h3>
                <p className="text-white/70">Comprehensive guides, tutorials, and real-time explanations that help you understand not just what to do, but why.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitments */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={cn("bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300", animationClasses.fadeInScale)}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Our Commitments</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-teal-400">1</span>
                </div>
                <div>
                  <p className="text-white/70 text-lg mb-2">Expand our AI capabilities while maintaining our commitment to human-centered design</p>
                  <p className="text-white/50 text-sm">Next milestone: Advanced pattern recognition system launching Q2 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-teal-400">2</span>
                </div>
                <div>
                  <p className="text-white/70 text-lg mb-2">Continue developing educational resources that empower investors at all levels</p>
                  <p className="text-white/50 text-sm">Coming soon: Interactive learning modules and live strategy sessions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-teal-400">3</span>
                </div>
                <div>
                  <p className="text-white/70 text-lg mb-2">Keep pushing the boundaries while ensuring accessibility</p>
                  <p className="text-white/50 text-sm">Ongoing: Weekly feature updates based on user feedback and market needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <motion.div className={cn("inline-block", animationClasses.fadeIn)}>
            <a 
              href="/projects"
              className="inline-flex items-center px-8 py-4 text-lg border border-transparent font-medium rounded-xl text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
            >
              See Our Tools in Action
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
