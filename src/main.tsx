import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/fonts.css'
import './styles/globals.css'
import App from './App'

// Performance optimizations
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.error('Service Worker registration failed:', error)
    })
  })
}

// Preload critical assets
const preloadLinks = [
  { rel: 'preload', href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: '/images/logo.svg', as: 'image' }
]

preloadLinks.forEach(({ rel, href, as, type, crossOrigin }) => {
  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  if (as) link.setAttribute('as', as)
  if (type) link.setAttribute('type', type)
  if (crossOrigin) link.setAttribute('crossorigin', crossOrigin)
  document.head.appendChild(link)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-black">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-primary">Loading...</div>
          </div>
        </div>
      }>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
