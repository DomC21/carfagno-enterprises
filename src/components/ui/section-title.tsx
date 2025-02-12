import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2 
      className={cn(
        "text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12",
        "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
        "animate-fade-in",
        className
      )}
    >
      {children}
    </h2>
  );
}
