import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

export function FeatureCard({ icon, title, description, delay = "" }: FeatureCardProps) {
  return (
    <Card className={`bg-background-secondary/50 border-border hover:border-primary transition-all hover:transform hover:scale-105 duration-300 animate-float ${delay} group`}>
      <CardHeader className="p-4 sm:p-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:animate-glow">
          {icon}
        </div>
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
