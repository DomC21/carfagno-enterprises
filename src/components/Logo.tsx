import * as React from "react"
import { cn } from "../lib/utils"

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4 relative group", className)} {...props}>
      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-shimmer"></div>
      <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent relative">
        Carfagno Enterprises
      </span>
    </div>
  )
}
