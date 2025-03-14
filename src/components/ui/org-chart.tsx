import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  reports?: string[]
  profilePicture?: string
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
        positions[ceo.id] = { x: 400, y: 120 }
      }
      
      // Position direct reports in a row below CEO
      const directReports = members.filter(m => ceo?.reports?.includes(m.id))
      const reportWidth = 800 / (directReports.length + 1)
      
      directReports.forEach((member, index) => {
        positions[member.id] = { 
          x: reportWidth * (index + 1), 
          y: 300 
        }
      })
      
      // Position indirect reports
      directReports.forEach(manager => {
        if (manager.reports && manager.reports.length > 0) {
          const indirectReports = members.filter(m => manager.reports?.includes(m.id))
          const managerPos = positions[manager.id]
          
          indirectReports.forEach((member) => {
            positions[member.id] = {
              x: managerPos.x,
              y: 480
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
    <div className={`relative w-full h-[600px] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-900/5 to-transparent mix-blend-overlay rounded-xl"></div>
      <svg className="w-full h-full">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Connections */}
        {connections.map((connection, i) => {
          const fromMember = members.find(m => m.id === connection.from)
          const toMember = members.find(m => m.id === connection.to)
          if (!fromMember || !toMember || !positions[fromMember.id] || !positions[toMember.id]) return null
          
          const fromPos = positions[fromMember.id]
          const toPos = positions[toMember.id]
          const isHighlighted = hoveredMember === connection.from || hoveredMember === connection.to
          
          // Calculate node sizes for connection points
          const fromIsCEO = fromMember.role.includes('CEO')
          const fromHasReports = fromMember.reports && fromMember.reports.length > 0
          const fromNodeSize = fromIsCEO ? 110 : fromHasReports ? 90 : 80
          
          const toIsCEO = toMember.role.includes('CEO')
          const toHasReports = toMember.reports && toMember.reports.length > 0
          const toNodeSize = toIsCEO ? 110 : toHasReports ? 90 : 80
          
          return (
            <motion.path
              key={i}
              d={`M ${fromPos.x} ${fromPos.y + fromNodeSize/2 + 5} C ${fromPos.x} ${(fromPos.y + toPos.y) / 2}, ${toPos.x} ${(fromPos.y + toPos.y) / 2}, ${toPos.x} ${toPos.y - toNodeSize/2 - 5}`}
              fill="none"
              stroke={isHighlighted ? '#64f4b8' : 'rgba(20, 184, 166, 0.4)'}
              strokeWidth={isHighlighted ? 3 : 2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          )
        })}
        
        {/* Member Nodes */}
        {members.map((member) => {
          if (!positions[member.id]) return null
          const pos = positions[member.id]
          const isHovered = hoveredMember === member.id
          const isCEO = member.role.includes('CEO')
          const hasReports = member.reports && member.reports.length > 0
          const nodeSize = isCEO ? 110 : hasReports ? 90 : 80
          
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
              {/* Glow effect */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={nodeSize / 2 + 5}
                fill="rgba(20, 184, 166, 0.1)"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
              
              {/* Profile picture or placeholder */}
              <defs>
                <clipPath id={`clip-${member.id}`}>
                  <circle cx={pos.x} cy={pos.y} r={nodeSize / 2} />
                </clipPath>
              </defs>
              
              {/* Border circle */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={nodeSize / 2}
                fill="none"
                stroke={isHovered ? '#14b8a6' : 'rgba(20, 184, 166, 0.5)'}
                strokeWidth={3}
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
              
              {/* Profile image or placeholder */}
              {member.profilePicture ? (
                <image
                  href={member.profilePicture}
                  x={pos.x - nodeSize / 2}
                  y={pos.y - nodeSize / 2}
                  height={nodeSize}
                  width={nodeSize}
                  clipPath={`url(#clip-${member.id})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <g>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeSize / 2 - 2}
                    fill="rgba(20, 184, 166, 0.15)"
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#e2e8f0"
                    fontSize={nodeSize / 4}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </text>
                </g>
              )}
              
              {/* Name text */}
              <motion.text
                x={pos.x}
                y={pos.y + nodeSize / 2 + 20}
                textAnchor="middle"
                fill={isHovered ? '#ffffff' : '#e2e8f0'}
                fontSize={isCEO ? "18" : "16"}
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {member.name}
              </motion.text>
              
              {/* Role text */}
              <motion.text
                x={pos.x}
                y={pos.y + nodeSize / 2 + 45}
                textAnchor="middle"
                fill={isHovered ? '#14b8a6' : '#94a3b8'}
                fontSize="14"
                fontWeight="medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {member.role}
              </motion.text>
              
              {/* Bio popup on hover */}
              {isHovered && (
                <motion.foreignObject
                  x={pos.x + 70}
                  y={pos.y - 50}
                  width={250}
                  height={100}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <div className="p-4 rounded-lg bg-black/90 border border-teal-500/30 shadow-lg shadow-teal-500/10">
                    <p className="text-sm text-gray-200 leading-relaxed">{member.bio}</p>
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
