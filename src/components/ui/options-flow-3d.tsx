import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { motion } from 'framer-motion'

interface OptionsData {
  strike: number
  bid: number
  ask: number
  last: number
  callVolume: number
  putVolume: number
  iv: number
  greeks: {
    delta: number
    gamma: number
    theta: number
    vega: number
    rho: number
  }
}

interface Props {
  data: OptionsData[]
}

export function OptionsFlow3D({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const pointsRef = useRef<THREE.Points | null>(null)
  const trailsRef = useRef<THREE.LineSegments | null>(null)
  const gridRef = useRef<THREE.GridHelper | null>(null)

  // Memoize data transformations
  const { positions, colors, trailPositions, trailColors } = useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []
    const trailPositions: number[] = []
    const trailColors: number[] = []

    data.forEach((option, i) => {
      // Position based on strike price and volume
      const x = (option.strike - data[0].strike) / 10
      const y = Math.log(option.callVolume + option.putVolume) / 10
      const z = option.iv / 100

      positions.push(x, y, z)

      // Color based on call/put ratio and greek metrics
      const ratio = option.callVolume / (option.callVolume + option.putVolume)
      const deltaInfluence = Math.abs(option.greeks.delta)
      const gammaInfluence = Math.abs(option.greeks.gamma) * 2
      
      const color = new THREE.Color()
      color.setHSL(
        ratio * 0.3, // Hue based on call/put ratio
        deltaInfluence, // Saturation based on delta
        gammaInfluence // Lightness based on gamma
      )
      colors.push(color.r, color.g, color.b)

      // Add trails between points
      if (i < data.length - 1) {
        const x2 = (data[i + 1].strike - data[0].strike) / 10
        const y2 = Math.log(data[i + 1].callVolume + data[i + 1].putVolume) / 10
        const z2 = data[i + 1].iv / 100

        trailPositions.push(x, y, z, x2, y2, z2)
        trailColors.push(color.r, color.g, color.b, color.r, color.g, color.b)
      }
    })

    return { positions, colors, trailPositions, trailColors }
  }, [data])

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene with fog for depth
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.FogExp2(0x000000, 0.05)

    // Initialize camera with dynamic position
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    cameraRef.current = camera
    camera.position.set(5, 5, 8)
    camera.lookAt(0, 0, 0)

    // Initialize renderer with advanced features
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    containerRef.current.appendChild(renderer.domElement)

    // Initialize post-processing
    const composer = new EffectComposer(renderer)
    composerRef.current = composer
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // Intensity
      0.4, // Radius
      0.85 // Threshold
    )
    composer.addPass(bloomPass)

    // Initialize controls with smooth damping
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.zoomSpeed = 0.7
    controls.minDistance = 3
    controls.maxDistance = 20

    // Add lights for dramatic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x00ff00, 0.5, 10)
    pointLight.position.set(0, 5, 0)
    scene.add(pointLight)

    // Add grid for reference
    const grid = new THREE.GridHelper(20, 20, 0x404040, 0x404040)
    grid.position.y = -2
    gridRef.current = grid
    scene.add(grid)

    // Animation loop with dynamic camera movement
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame++

      // Subtle camera movement
      if (pointLight.position) {
        pointLight.position.x = Math.sin(frame * 0.02) * 5
        pointLight.position.z = Math.cos(frame * 0.02) * 5
      }

      controls.update()
      composer.render()
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      composer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      composer.dispose()
    }
  }, [])

  useEffect(() => {
    if (!sceneRef.current || !data.length) return

    // Remove existing visualizations
    if (pointsRef.current) {
      sceneRef.current.remove(pointsRef.current)
    }
    if (trailsRef.current) {
      sceneRef.current.remove(trailsRef.current)
    }

    // Create geometry for options data points
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    // Create points with advanced material
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const points = new THREE.Points(geometry, pointsMaterial)
    pointsRef.current = points
    sceneRef.current.add(points)

    // Create trails with glowing effect
    const trailGeometry = new THREE.BufferGeometry()
    trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3))
    trailGeometry.setAttribute('color', new THREE.Float32BufferAttribute(trailColors, 3))

    const trailMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const trails = new THREE.LineSegments(trailGeometry, trailMaterial)
    trailsRef.current = trails
    sceneRef.current.add(trails)
  }, [data, positions, colors, trailPositions, trailColors])

  return (
    <motion.div 
      ref={containerRef} 
      className="w-full h-full relative rounded-lg overflow-hidden"
      style={{ minHeight: '400px' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-4 left-4 text-xs text-gray-400 space-y-1 bg-black/50 p-2 rounded">
        <div>Strike Price: X axis</div>
        <div>Volume: Y axis</div>
        <div>Implied Volatility: Z axis</div>
        <div>Color: Call/Put Ratio + Greeks</div>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-black/50 p-2 rounded">
        <div>Mouse: Rotate View</div>
        <div>Scroll: Zoom</div>
        <div>Shift + Mouse: Pan</div>
      </div>
    </motion.div>
  )
}
