import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './index.css'
import './styles/fonts.css'
import './styles/globals.css'
import { Home } from './pages/home'
import { Projects } from './pages/projects'
import { ProjectDetail } from './pages/project-detail'
import { Coaching } from './pages/coaching'
import { Layout } from './components/layout'

const App = () => (
  <Routes>
    <Route element={<Layout><Outlet /></Layout>}>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/coaching" element={<Coaching />} />
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
