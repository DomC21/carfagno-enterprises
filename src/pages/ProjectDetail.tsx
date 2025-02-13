
import { useParams } from 'react-router-dom'
import { Card } from '../components/ui/card'

export function ProjectDetail() {
  const { id } = useParams()

  return (
    <div className="container mx-auto py-section-sm sm:py-section px-4">
      <Card className="bg-black border-border p-6">
        <h1 className="text-3xl font-bold mb-4">Project Details: {id}</h1>
        <p className="text-gray-400">Detailed information about {id} will be displayed here.</p>
      </Card>
    </div>
  )
}
