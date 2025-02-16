import * as React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface NetworkVisualization3DProps {
  layers: number[]
  connections: Array<{
    from: { layer: number; node: number }
    to: { layer: number; node: number }
    weight: number
  }>
  className?: string
}

export function NetworkVisualization3D({ layers, connections, className }: NetworkVisualization3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const nodesRef = useRef<THREE.Mesh[][]>([])
  const connectionsRef = useRef<THREE.Line[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Setup
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color('#000000')

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 15

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffd700, 1)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)

    // Create nodes
    const nodeGeometry = new THREE.SphereGeometry(0.3, 32, 32)
    const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 })

    nodesRef.current = layers.map((nodeCount, layerIndex) => {
      const layerNodes: THREE.Mesh[] = []
      const layerX = (layerIndex - (layers.length - 1) / 2) * 4

      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
        const nodeY = (i - (nodeCount - 1) / 2) * 2
        node.position.set(layerX, nodeY, 0)
        scene.add(node)
        layerNodes.push(node)
      }
      return layerNodes
    })

    // Create connections
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.3
    })

    connectionsRef.current = connections.map(connection => {
      const fromNode = nodesRef.current[connection.from.layer][connection.from.node]
      const toNode = nodesRef.current[connection.to.layer][connection.to.node]

      const points = [fromNode.position, toNode.position]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, connectionMaterial)
      scene.add(line)
      return line
    })

    // Animation
    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)

      // Rotate scene
      scene.rotation.y += 0.002

      // Pulse nodes
      const time = Date.now() * 0.001
      nodesRef.current.forEach(layer => {
        layer.forEach((node, i) => {
          const scale = 1 + Math.sin(time + i * 0.5) * 0.1
          node.scale.set(scale, scale, scale)
        })
      })

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId)
      renderer.dispose()
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [layers, connections])

  return (
    <motion.div
      ref={containerRef}
      className={`w-full h-[400px] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    />
  )
}
