import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string
  description: string
  className?: string
}

export function MetricsCard({ title, value, description, className }: MetricsCardProps) {
  return (
    <div className={cn(
      "bg-background-secondary/50 border border-border rounded-lg p-4 sm:p-6",
      "hover:border-primary transition-colors duration-300",
      "group animate-fade-in",
      className
    )}>
      <h3 className="text-lg font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
        {title}
      </h3>
      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
        {value}
      </p>
      <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  )
}
