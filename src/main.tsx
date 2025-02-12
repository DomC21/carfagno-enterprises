// No need for explicit React import with JSX transform
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './styles/fonts.css'
import './styles/globals.css'
import { Home } from './pages/home'
import { ProjectDetail } from './pages/project-detail'
import { Coaching } from './pages/coaching'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/coaching" element={<Coaching />} />
    </Routes>
  </BrowserRouter>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
