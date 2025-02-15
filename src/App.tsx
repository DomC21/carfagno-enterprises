import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Layout } from './components/layout'
import { KeyboardProvider } from './providers/KeyboardProvider'
import { AccessibilityProvider } from './providers/AccessibilityProvider'
import { AlertProvider } from './contexts/AlertContext'

// Lazy load route components
const HomePage = lazy(() => import('./pages/HomePage'))
const CoachingPage = lazy(() => import('./pages/CoachingPage'))
const NeuralNetworks = lazy(() => import('./projects/NeuralNetworks'))
const Lukz = lazy(() => import('./projects/Lukz'))
const ZomAI = lazy(() => import('./projects/ZomAI'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary transform-gpu"></div>
  </div>
)

export default function App() {
  return (
    <AccessibilityProvider>
      <KeyboardProvider>
        <AlertProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/coaching" element={<CoachingPage />} />
                <Route path="/projects/neural-networks" element={<NeuralNetworks />} />
                <Route path="/projects/lukz" element={<Lukz />} />
                <Route path="/projects/zom-ai" element={<ZomAI />} />
              </Route>
            </Routes>
          </Suspense>
        </AlertProvider>
      </KeyboardProvider>
    </AccessibilityProvider>
  )
}
