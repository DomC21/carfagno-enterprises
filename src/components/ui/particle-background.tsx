import { useCallback } from 'react'
import { Particles } from '@tsparticles/react'
import type { Engine, ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

const particleConfig: ISourceOptions = {
  particles: {
    number: { 
      value: 50, 
      density: { enable: true, area: 800 } 
    },
    color: { value: "#3b82f6" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true,
      animation: { 
        enable: true, 
        speed: 1, 
        min: 0.1 
      }
    },
    size: {
      value: 3,
      random: true,
      animation: { 
        enable: true, 
        speed: 2, 
        min: 0.3 
      }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#3b82f6",
      opacity: 0.2,
      width: 1
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      },
      onClick: {
        enable: true,
        mode: "push"
      }
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.4
        }
      },
      push: {
        quantity: 4
      }
    }
  },
  background: {
    color: "#000000"
  },
  fullScreen: {
    enable: false,
    zIndex: -1
  },
  detectRetina: true
}

export function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {
    console.log('Particles loaded')
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Particles
        id="tsparticles"
        className="h-full"
        particlesLoaded={particlesInit}
        options={particleConfig}
      />
    </div>
  )
}
