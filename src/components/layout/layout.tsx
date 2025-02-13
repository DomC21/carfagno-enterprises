import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Twitter } from 'lucide-react'

import { MarketDataStream } from '@/components/ui/market-data-stream'

export function Layout() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <MarketDataStream />
      {/* Navigation */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-glow">
            Carfagno Enterprises
          </Link>
          <div className="flex space-x-2 sm:space-x-6">
            <Link to="/coaching"><Button variant="ghost" className="hover:bg-primary/10 transition-colors text-sm sm:text-base px-2 sm:px-4">Coaching</Button></Link>
            <Link to="/projects"><Button variant="ghost" className="hover:bg-primary/10 transition-colors text-sm sm:text-base px-2 sm:px-4">Projects</Button></Link>
            <Link to="/contact"><Button variant="ghost" className="hover:bg-primary/10 transition-colors text-sm sm:text-base px-2 sm:px-4">Contact</Button></Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-border py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.05)_25%,transparent_25%,transparent_50%,rgba(59,130,246,0.05)_50%,rgba(59,130,246,0.05)_75%,transparent_75%,transparent)] bg-[length:32px_32px] sm:bg-[length:64px_64px] animate-shine opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center animate-fade-in">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Carfagno Enterprises
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">Empowering Investors Everywhere</p>
            <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github className="w-5 h-5 sm:w-6 sm:h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5 sm:w-6 sm:h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5 sm:w-6 sm:h-6" /></a>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">© 2024 Carfagno Enterprises. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
