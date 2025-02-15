import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface GridItem {
  id: string
  x: number
  y: number
  w: number
  h: number
  content: React.ReactNode
}

interface GridLayoutProps {
  items: GridItem[]
  onLayoutChange?: (items: GridItem[]) => void
  className?: string
}

export function GridLayout({ items, onLayoutChange, className = '' }: GridLayoutProps) {
  const [layout, setLayout] = useState(items)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (id: string, info: { point: { x: number; y: number } }) => {
    setIsDragging(false)
    const newLayout = layout.map(item => {
      if (item.id === id) {
        // Calculate new grid position based on drag coordinates
        const gridX = Math.round(info.point.x / 100)
        const gridY = Math.round(info.point.y / 100)
        return { ...item, x: gridX, y: gridY }
      }
      return item
    })
    setLayout(newLayout)
    onLayoutChange?.(newLayout)
  }

  return (
    <div className={`relative min-h-[600px] ${className}`}>
      {layout.map(item => (
        <motion.div
          key={item.id}
          drag
          dragMomentum={false}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDragEnd={(_, info) => handleDragEnd(item.id, info)}
          initial={false}
          animate={{
            x: item.x * 100,
            y: item.y * 100,
            width: item.w * 100,
            height: item.h * 100,
            zIndex: isDragging ? 10 : 1
          }}
          className="absolute bg-black border border-border rounded-lg overflow-hidden transform-gpu"
          style={{
            cursor: 'grab',
            touchAction: 'none'
          }}
        >
          <div className="w-full h-full p-4">
            {item.content}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
