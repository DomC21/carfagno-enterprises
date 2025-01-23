import * as React from "react"
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { Logo } from './Logo'
import { colorClasses } from '../utils/styles'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer className={`border-t border-teal-500/20 bg-black/50 backdrop-blur-sm ${className}`} {...props}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <Logo className="hover:opacity-80 transition-opacity" />
            <p className={`${colorClasses.secondary} text-sm`}>
              Empowering Investors Everywhere
            </p>
          </div>

          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${colorClasses.primary}`}>Contact</h3>
            <a 
              href="mailto:DominicCarfagno@carfagnoenterprises.com"
              className={`flex items-center gap-2 ${colorClasses.secondary} hover:text-teal-400 transition-colors text-sm`}
            >
              <Mail className="w-4 h-4" />
              DominicCarfagno@carfagnoenterprises.com
            </a>
          </div>

          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${colorClasses.primary}`}>Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className={`${colorClasses.secondary} hover:text-teal-400 transition-colors`}
                aria-label="Github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className={`${colorClasses.secondary} hover:text-teal-400 transition-colors`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className={`${colorClasses.secondary} hover:text-teal-400 transition-colors`}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-teal-500/20 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Carfagno Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
