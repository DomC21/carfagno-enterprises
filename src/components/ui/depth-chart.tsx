import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface DepthData {
  bids: Array<{ price: number; size: number }>
  asks: Array<{ price: number; size: number }>
}

interface Props {
  data: DepthData
  width?: number
  height?: number
}

export function DepthChart({ data, width = 800, height = 400 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x000000)

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    cameraRef.current = camera
    camera.position.set(0, 5, 10)
    camera.lookAt(0, 0, 0)

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    containerRef.current.appendChild(renderer.domElement)

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x404040, 0x404040)
    scene.add(gridHelper)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [width, height])

  useEffect(() => {
    if (!sceneRef.current || !data) return

    // Remove existing meshes
    sceneRef.current.children = sceneRef.current.children.filter(
      child => child instanceof THREE.Light || child instanceof THREE.GridHelper
    )

    // Create bid/ask surfaces
    const createSurface = (
      orders: Array<{ price: number; size: number }>,
      color: number,
      side: 'bid' | 'ask'
    ) => {
      const geometry = new THREE.BufferGeometry()
      const material = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      })

      const vertices: number[] = []
      const indices: number[] = []

      orders.forEach((order, i) => {
        const x = side === 'bid' ? -order.price : order.price
        const y = order.size
        const z = i * 0.1

        vertices.push(x, 0, z)
        vertices.push(x, y, z)

        if (i < orders.length - 1) {
          const base = i * 2
          indices.push(base, base + 1, base + 2)
          indices.push(base + 1, base + 3, base + 2)
        }
      })

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      geometry.setIndex(indices)
      geometry.computeVertexNormals()

      const mesh = new THREE.Mesh(geometry, material)
      sceneRef.current?.add(mesh)
    }

    createSurface(data.bids, 0x22c55e, 'bid') // Green for bids
    createSurface(data.asks, 0xef4444, 'ask') // Red for asks

  }, [data])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative"
      style={{ width, height }}
    >
      <div className="absolute top-4 left-4 text-xs text-gray-400 space-y-1">
        <div>Price: X axis</div>
        <div>Size: Y axis</div>
        <div>Time: Z axis</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-3 h-3 bg-green-500 rounded-sm" /> Bids
          <div className="w-3 h-3 bg-red-500 rounded-sm" /> Asks
        </div>
      </div>
    </div>
  )
}
