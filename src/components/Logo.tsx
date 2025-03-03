import * as React from "react"
import { cn } from "../lib/utils"

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <img 
        src="/images/ce-logo.svg" 
        alt="CE Logo" 
        className="h-8 w-8 dark:invert"
      />
      <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Carfagno Enterprises
      </span>
    </div>
  )
}
