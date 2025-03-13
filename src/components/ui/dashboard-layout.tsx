import React, { useState, useEffect } from 'react'
import { GridLayout } from './grid-layout'
import { Card } from './card'
import { motion } from 'framer-motion'

interface DashboardItem {
  id: string
  title: string
  content: React.ReactNode
  defaultSize: {
    w: number
    h: number
  }
  defaultPosition?: {
    x: number
    y: number
  }
}

interface DashboardLayoutProps {
  items: DashboardItem[]
  onLayoutChange?: (layout: LayoutItem[]) => void
  className?: string
}

interface LayoutItem {
  id: string
  x: number
  y: number
  w: number
  h: number
  content: React.ReactNode
}

const LAYOUT_PRESETS = {
  desktop: [
    { x: 0, y: 0, w: 2, h: 2 }, // Large chart
    { x: 2, y: 0, w: 1, h: 1 }, // Small widget
    { x: 2, y: 1, w: 1, h: 1 }, // Small widget
    { x: 0, y: 2, w: 3, h: 1 }  // Full width widget
  ],
  tablet: [
    { x: 0, y: 0, w: 2, h: 2 },
    { x: 0, y: 2, w: 2, h: 1 },
    { x: 0, y: 3, w: 2, h: 1 },
    { x: 0, y: 4, w: 2, h: 1 }
  ],
  mobile: [
    { x: 0, y: 0, w: 1, h: 1 },
    { x: 0, y: 1, w: 1, h: 1 },
    { x: 0, y: 2, w: 1, h: 1 },
    { x: 0, y: 3, w: 1, h: 1 }
  ]
}

export function DashboardLayout({ items, onLayoutChange, className = '' }: DashboardLayoutProps) {
  const [layout, setLayout] = useState<LayoutItem[]>([])
  const [breakpoint, setBreakpoint] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1024) {
        setBreakpoint('desktop')
      } else if (width >= 768) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('mobile')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize layout based on breakpoint
  useEffect(() => {
    const preset = LAYOUT_PRESETS[breakpoint]
    const newLayout = items.map((item, index) => ({
      id: item.id,
      content: (
        <Card className="w-full h-full bg-black border-border">
          <motion.div
            className="p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <h3 className="text-lg font-semibold mb-4 text-primary">{item.title}</h3>
            {item.content}
          </motion.div>
        </Card>
      ),
      ...preset[index],
      ...item.defaultPosition && breakpoint === 'desktop' ? { x: item.defaultPosition.x, y: item.defaultPosition.y } : {},
      w: breakpoint === 'desktop' ? item.defaultSize.w : preset[index].w,
      h: breakpoint === 'desktop' ? item.defaultSize.h : preset[index].h
    }))
    setLayout(newLayout)
  }, [items, breakpoint])

  const handleLayoutChange = (newLayout: LayoutItem[]) => {
    setLayout(newLayout)
    onLayoutChange?.(newLayout)
  }

  return (
    <div className={`w-full ${className}`}>
      <GridLayout
        items={layout}
        onLayoutChange={handleLayoutChange}
        className="min-h-[800px] lg:min-h-[600px]"
      />
    </div>
  )
}
