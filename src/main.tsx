import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/fonts.css'
import './styles/globals.css'
import { RouteLoading } from '@/components/RouteLoading'
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
      <Suspense fallback={<RouteLoading />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
