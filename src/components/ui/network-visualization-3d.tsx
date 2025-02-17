import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { motion } from 'framer-motion'

interface NetworkNode {
  id: number
  layer: number
  position: [number, number, number]
  type: 'input' | 'hidden' | 'output'
  value?: number
  activation?: number
}

interface NetworkConnection {
  from: NetworkNode
  to: NetworkNode
  weight: number
}

interface Props {
  nodes: NetworkNode[]
  connections: NetworkConnection[]
  width?: number
  height?: number
}

export function NetworkVisualization3D({ nodes, connections, width = 800, height = 400 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const nodesRef = useRef<THREE.Group | null>(null)
  const connectionsRef = useRef<THREE.Group | null>(null)

  // Memoize node and connection geometries
  const { nodeGeometries, connectionGeometries } = useMemo(() => {
    const nodeGeometries: THREE.Mesh[] = []
    const connectionGeometries: THREE.Line[] = []

    // Create node geometries
    nodes.forEach(node => {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: node.type === 'input' ? 0x3b82f6 : 
               node.type === 'output' ? 0x22c55e : 
               0xffd700,
        transparent: true,
        opacity: 0.8,
        emissive: node.type === 'input' ? 0x1d4ed8 :
                  node.type === 'output' ? 0x166534 :
                  0xb7791f,
        emissiveIntensity: 0.5
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...node.position)
      nodeGeometries.push(mesh)
    })

    // Create connection geometries
    connections.forEach(connection => {
      const points = [
        new THREE.Vector3(...connection.from.position),
        new THREE.Vector3(...connection.to.position)
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: Math.abs(connection.weight) * 0.5,
        linewidth: Math.abs(connection.weight) * 2
      })
      const line = new THREE.Line(geometry, material)
      connectionGeometries.push(line)
    })

    return { nodeGeometries, connectionGeometries }
  }, [nodes, connections])

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene with fog for depth
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.FogExp2(0x000000, 0.05)

    // Initialize camera with dynamic position
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    cameraRef.current = camera
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)

    // Initialize renderer with advanced features
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    containerRef.current.appendChild(renderer.domElement)

    // Initialize post-processing
    const composer = new EffectComposer(renderer)
    composerRef.current = composer
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
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
    controls.minDistance = 2
    controls.maxDistance = 10

    // Add lights for dramatic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffd700, 0.5, 10)
    pointLight.position.set(0, 5, 0)
    scene.add(pointLight)

    // Create node and connection groups
    const nodesGroup = new THREE.Group()
    const connectionsGroup = new THREE.Group()
    nodesRef.current = nodesGroup
    connectionsRef.current = connectionsGroup
    scene.add(nodesGroup)
    scene.add(connectionsGroup)

    // Animation loop with dynamic lighting
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame++

      // Subtle point light movement
      if (pointLight.position) {
        pointLight.position.x = Math.sin(frame * 0.02) * 5
        pointLight.position.z = Math.cos(frame * 0.02) * 5
      }

      // Update node materials based on activation
      nodeGeometries.forEach((mesh, i) => {
        const node = nodes[i]
        if (node.activation !== undefined) {
          const material = mesh.material as THREE.MeshPhongMaterial
          material.emissiveIntensity = 0.5 + node.activation * 0.5
        }
      })

      controls.update()
      composer.render()
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
      composer.setSize(newWidth, newHeight)
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
  }, [width, height])

  useEffect(() => {
    if (!sceneRef.current || !nodesRef.current || !connectionsRef.current) return

    // Clear existing nodes and connections
    while (nodesRef.current.children.length) {
      nodesRef.current.remove(nodesRef.current.children[0])
    }
    while (connectionsRef.current.children.length) {
      connectionsRef.current.remove(connectionsRef.current.children[0])
    }

    // Add new nodes and connections
    nodeGeometries.forEach(mesh => nodesRef.current?.add(mesh))
    connectionGeometries.forEach(line => connectionsRef.current?.add(line))
  }, [nodeGeometries, connectionGeometries])

  return (
    <motion.div 
      ref={containerRef} 
      className="w-full h-full relative rounded-lg overflow-hidden"
      style={{ width, height }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-4 left-4 text-xs text-gray-400 space-y-1 bg-black/50 p-2 rounded">
        <div>Input Layer: Blue nodes</div>
        <div>Hidden Layers: Gold nodes</div>
        <div>Output Layer: Green nodes</div>
        <div>Connection opacity: Weight strength</div>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-black/50 p-2 rounded">
        <div>Mouse: Rotate View</div>
        <div>Scroll: Zoom</div>
        <div>Shift + Mouse: Pan</div>
      </div>
    </motion.div>
  )
}
