import { motion } from 'framer-motion'
import { useState } from 'react'

export interface Node {
  id: string
  label: string
  description: string
  type: 'service' | 'database' | 'api' | 'client'
  x: number
  y: number
}

interface Connection {
  from: string
  to: string
  label?: string
}

interface ArchitectureDiagramProps {
  nodes: Node[]
  connections: Connection[]
  className?: string
}

export function ArchitectureDiagram({ nodes, connections, className }: ArchitectureDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getNodeColor = (type: Node['type'], isHovered: boolean) => {
    const baseColors = {
      service: '#3b82f6',
      database: '#10b981',
      api: '#8b5cf6',
      client: '#f59e0b'
    }

    return isHovered ? `${baseColors[type]}` : `${baseColors[type]}40`
  }

  return (
    <div className={`relative w-full h-[600px] ${className}`}>
      <svg className="w-full h-full">
        {/* Connections */}
        {connections.map((connection, i) => {
          const fromNode = nodes.find(n => n.id === connection.from)
          const toNode = nodes.find(n => n.id === connection.to)
          if (!fromNode || !toNode) return null

          const isHighlighted = hoveredNode === connection.from || hoveredNode === connection.to

          return (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isHighlighted ? '#64748b' : '#1e293b'}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray="4 4"
              />
              {connection.label && (
                <motion.text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                  textAnchor="middle"
                  fill={isHighlighted ? '#94a3b8' : '#64748b'}
                  fontSize="12"
                  dy="-8"
                >
                  {connection.label}
                </motion.text>
              )}
            </motion.g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id

          return (
            <motion.g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={40}
                fill={getNodeColor(node.type, isHovered)}
                stroke={isHovered ? getNodeColor(node.type, true) : 'transparent'}
                strokeWidth={2}
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
              <motion.text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                fill={isHovered ? '#ffffff' : '#94a3b8'}
                fontSize="14"
                fontWeight={isHovered ? 'bold' : 'normal'}
              >
                {node.label}
              </motion.text>
              {isHovered && (
                <motion.foreignObject
                  x={node.x + 50}
                  y={node.y - 40}
                  width={200}
                  height={80}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <div className="p-3 rounded-lg bg-black border border-gray-800">
                    <p className="text-sm text-gray-300">{node.description}</p>
                  </div>
                </motion.foreignObject>
              )}
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
