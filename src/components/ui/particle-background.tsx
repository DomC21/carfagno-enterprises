import { useCallback } from 'react'
import { Particles } from '@tsparticles/react'
import type { Container, Engine } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

const particleConfig: any = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#3b82f6"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: false,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: false,
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.3,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "out"
      }
    }
  },
  interactivity: {
    detectsOn: "window",
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
  detectRetina: true,
  fpsLimit: 60
}

export function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const handleParticlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log('Particles loaded', container)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Particles
        id="tsparticles"
        className="h-full"
        options={particleConfig}
        particlesInit={particlesInit}
        particlesLoaded={handleParticlesLoaded}
      />
    </div>
  )
}
