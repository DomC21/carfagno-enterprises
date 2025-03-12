import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { CheckCircle } from 'lucide-react'

interface SubscriptionCardProps {
  title: string
  price: string
  features: string[]
}

export function SubscriptionCard({ title, price, features }: SubscriptionCardProps) {
  return (
    <Card className="p-6 bg-black border-border hover:border-primary transition-colors">
      <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-6">
        ${price}
        <span className="text-lg text-gray-400">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="text-primary" size={20} />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" size="lg">
        Subscribe Now
      </Button>
    </Card>
  )
}
