import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  reports?: string[]
}

interface OrgChartProps {
  members: TeamMember[]
  className?: string
}

export function OrgChart({ members, className }: OrgChartProps) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)
  const [positions, setPositions] = useState<Record<string, { x: number, y: number }>>({})
  
  // Find CEO (root node)
  const ceo = members.find(m => m.role.includes('CEO'))
  
  useEffect(() => {
    // Calculate positions for the org chart
    const calculatePositions = () => {
      const positions: Record<string, { x: number, y: number }> = {}
      
      // Position CEO at the top center
      if (ceo) {
        positions[ceo.id] = { x: 400, y: 80 }
      }
      
      // Position direct reports in a row below CEO
      const directReports = members.filter(m => ceo?.reports?.includes(m.id))
      const reportWidth = 800 / (directReports.length + 1)
      
      directReports.forEach((member, index) => {
        positions[member.id] = { 
          x: reportWidth * (index + 1), 
          y: 220 
        }
      })
      
      // Position indirect reports
      directReports.forEach(manager => {
        if (manager.reports && manager.reports.length > 0) {
          const indirectReports = members.filter(m => manager.reports?.includes(m.id))
          const managerPos = positions[manager.id]
          const indirectWidth = 160
          
          indirectReports.forEach((member, index) => {
            positions[member.id] = {
              x: managerPos.x - (indirectReports.length - 1) * indirectWidth / 2 + index * indirectWidth,
              y: 360
            }
          })
        }
      })
      
      // Adjust for responsive design
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        // Adjust for mobile: stack vertically with less horizontal spread
        Object.keys(positions).forEach(id => {
          positions[id].x = positions[id].x / 2 + 100
          positions[id].y = positions[id].y * 0.8
        })
      }
      
      return positions
    }
    
    setPositions(calculatePositions())
    
    // Add resize listener
    const handleResize = () => {
      setPositions(calculatePositions())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ceo, members])
  
  // Generate connections between nodes
  const connections = members
    .filter(m => m.reports && m.reports.length > 0)
    .flatMap(manager => 
      manager.reports!.map(reportId => ({
        from: manager.id,
        to: reportId
      }))
    )
  
  return (
    <div className={`relative w-full h-[400px] ${className}`}>
      <svg className="w-full h-full">
        {/* Connections */}
        {connections.map((connection, i) => {
          const fromMember = members.find(m => m.id === connection.from)
          const toMember = members.find(m => m.id === connection.to)
          if (!fromMember || !toMember || !positions[fromMember.id] || !positions[toMember.id]) return null
          
          const fromPos = positions[fromMember.id]
          const toPos = positions[toMember.id]
          const isHighlighted = hoveredMember === connection.from || hoveredMember === connection.to
          
          return (
            <motion.line
              key={i}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={isHighlighted ? '#64f4b8' : '#1e293b'}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          )
        })}
        
        {/* Member Nodes */}
        {members.map((member) => {
          if (!positions[member.id]) return null
          const pos = positions[member.id]
          const isHovered = hoveredMember === member.id
          const isCEO = member.role.includes('CEO')
          
          return (
            <motion.g
              key={member.id}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: members.indexOf(member) * 0.1
              }}
            >
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isCEO ? 50 : 40}
                fill={isHovered ? 'rgba(20, 184, 166, 0.3)' : 'rgba(20, 184, 166, 0.1)'}
                stroke={isHovered ? '#14b8a6' : 'rgba(20, 184, 166, 0.3)'}
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
                x={pos.x}
                y={pos.y - 10}
                textAnchor="middle"
                fill={isHovered ? '#ffffff' : '#94a3b8'}
                fontSize={isCEO ? "16" : "14"}
                fontWeight={isHovered ? 'bold' : 'normal'}
              >
                {member.name}
              </motion.text>
              <motion.text
                x={pos.x}
                y={pos.y + 10}
                textAnchor="middle"
                fill={isHovered ? '#14b8a6' : '#64748b'}
                fontSize="12"
              >
                {member.role}
              </motion.text>
              {isHovered && (
                <motion.foreignObject
                  x={pos.x + 60}
                  y={pos.y - 40}
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
                  <div className="p-3 rounded-lg bg-black/80 border border-teal-500/20">
                    <p className="text-sm text-gray-300">{member.bio}</p>
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
