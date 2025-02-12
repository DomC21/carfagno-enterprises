import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'ghost';
}

export function GradientButton({ 
  children, 
  fullWidth = false, 
  variant = 'default',
  className,
  ...props 
}: GradientButtonProps) {
  return (
    <Button 
      {...props}
      className={cn(
        "group relative overflow-hidden",
        variant === 'default' && "bg-primary hover:bg-primary-hover",
        variant === 'ghost' && "hover:bg-primary/10",
        fullWidth && "w-full",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'default' && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity"></div>
      )}
    </Button>
  );
}
