import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Logo } from '../Logo'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    window.history.pushState(null, '', window.location.pathname)
    
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.pathname)
    }
    
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [location.pathname])

  const handleMobileMenu = () => {
    const nav = document.createElement('div')
    nav.className = 'fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-10 px-6'
    nav.innerHTML = `
      <button class="absolute top-5 right-5 text-teal-400 hover:text-teal-300 p-5 text-3xl">✕</button>
      <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">About Us</button>
      <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Tools</button>
      <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Contact</button>
      <button class="text-teal-400 hover:text-teal-300 px-8 py-5 text-2xl font-medium w-full text-center">Our Mission</button>
    `
    document.body.appendChild(nav)
    
    const buttons = nav.querySelectorAll('button')
    buttons[0].onclick = () => nav.remove()
    buttons[1].onclick = () => { navigate('/about'); nav.remove() }
    buttons[2].onclick = () => { navigate('/tools'); nav.remove() }
    buttons[3].onclick = () => { 
      if (location.pathname === '/') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        navigate('/')
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
      nav.remove()
    }
    buttons[4].onclick = () => { navigate('/our-mission'); nav.remove() }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-white/10">
      <div className="max-w-[980px] mx-auto px-6 py-3 flex items-center justify-between">
        <Logo 
          className="w-32 hover:opacity-80 transition-all duration-300 cursor-pointer" 
          onClick={() => {
            if (location.pathname === '/') {
              document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            } else {
              navigate('/')
            }
          }} 
        />
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
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                navigate('/tools')
              }
            }}
          >
            Tools
          </Button>
          <Button 
            variant="ghost" 
            className="nav-link text-white/90 hover:text-white px-2 transition-all duration-300"
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 100)
              }
            }}
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
          onClick={handleMobileMenu}
        >
          ☰
        </button>
      </div>
    </header>
  )
}
