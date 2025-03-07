import * as React from "react"
import { cn } from "../lib/utils"

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex items-center w-full", className)} {...props}>
      <img 
        src={`${import.meta.env.BASE_URL}images/ce-logo.png?v=2`}
        alt="CE Logo" 
        className="h-8 w-8"
        style={{ objectFit: 'contain' }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Carfagno Enterprises
        </span>
      </div>
    </div>
  )
}
