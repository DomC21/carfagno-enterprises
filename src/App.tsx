import { Routes, Route } from 'react-router-dom'
import NeuralNetworks from './projects/NeuralNetworks'
import Lukz from './projects/Lukz'
import ZomAI from './projects/ZomAI'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CoachingPage from './pages/CoachingPage'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coaching" element={<CoachingPage />} />
        <Route path="/projects/neural-networks" element={<NeuralNetworks />} />
        <Route path="/projects/lukz" element={<Lukz />} />
        <Route path="/projects/zom-ai" element={<ZomAI />} />
      </Routes>
    </div>
  )
}
