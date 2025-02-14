import { useCallback } from 'react'
import { Particles } from '@tsparticles/react'
import { type Container, type Engine, type ISourceOptions } from '@tsparticles/engine'
import { loadFull } from 'tsparticles'

const particleConfig: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        area: 800
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
      animation: {
        enable: true,
        speed: 1,
        startValue: "max",
        destroy: "min",
        sync: false
      }
    },
    size: {
      value: 3,
      animation: {
        enable: true,
        speed: 2,
        startValue: "max",
        destroy: "min",
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
  detectRetina: true
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
