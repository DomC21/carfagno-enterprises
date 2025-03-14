import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Layout } from '@/components/layout'
import { KeyboardProvider } from '@/providers/KeyboardProvider'
import { AccessibilityProvider } from '@/providers/AccessibilityProvider'
import { AlertProvider } from '@/contexts/AlertContext'
import { PreferencesProvider } from '@/providers/PreferencesProvider'

// Lazy load route components with proper default exports
const HomePage = lazy(() => import('@/pages/HomePage'))
const Projects = lazy(() => import('@/pages/projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const AboutUsPage = lazy(() => import('@/pages/AboutUsPage'))
const OurMission = lazy(() => import('@/pages/OurMission'))
const ZomAIPage = lazy(() => import('@/pages/ZomAIPage'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
)

export default function App() {
  return (
    <AlertProvider>
      <PreferencesProvider>
        <AccessibilityProvider>
          <KeyboardProvider>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tools" element={<Projects />} />
                  <Route path="/tools/:id" element={<ProjectDetail />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/our-mission" element={<OurMission />} />
                  <Route path="/zom-ai" element={<ZomAIPage />} />
                </Route>
              </Routes>
            </Suspense>
          </KeyboardProvider>
        </AccessibilityProvider>
      </PreferencesProvider>
    </AlertProvider>
  )
}
