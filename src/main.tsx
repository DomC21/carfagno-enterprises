import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './styles/fonts.css'
import './styles/globals.css'
import HomePage from './pages/HomePage'
import { Projects } from './pages/projects'
import CoachingPage from './pages/CoachingPage'
import { ProjectDetail } from './pages/ProjectDetail'
import { Layout } from './components/layout'

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/coaching" element={<CoachingPage />} />
    </Route>
  </Routes>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
