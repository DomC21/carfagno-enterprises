import { useState } from 'react'
// Removed unused import
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { generateTrainingData } from '@/lib/demo-data'
import { Button } from '@/components/ui/button'

export function FeatureSelectionDemo() {
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([0, 1, 2])
  const data = generateTrainingData(1)[0]
  
  const featureData = data.features.map((value, index) => ({
    name: `Feature ${index + 1}`,
    importance: value,
    selected: selectedFeatures.includes(index)
  }))

  const toggleFeature = (index: number) => {
    setSelectedFeatures(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Dynamic Feature Selection</h3>
      <p className="text-gray-300 mb-6">Interactive feature importance visualization</p>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={featureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
            <XAxis dataKey="name" stroke="rgba(148, 163, 184, 0.5)" />
            <YAxis stroke="rgba(148, 163, 184, 0.5)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: 'rgba(148, 163, 184, 1)' }}
            />
            <Bar 
              dataKey="importance"
              fill="rgba(45, 212, 191, 0.4)"
              animationDuration={500}
            >
              {featureData.map((entry: { selected: boolean }, index: number) => (
                <Cell 
                  key={`cell-${index}`}
                  fillOpacity={entry.selected ? 1 : 0.4}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {featureData.map((feature, index) => (
          <Button
            key={feature.name}
            variant={feature.selected ? 'default' : 'outline'}
            onClick={() => toggleFeature(index)}
            className="transition-all duration-300"
          >
            {feature.name}
          </Button>
        ))}
      </div>
    </Card>
  )
}
