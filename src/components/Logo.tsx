import * as React from "react"
import { cn } from "../lib/utils"

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex items-center justify-center min-h-[3rem] w-full", className)} {...props}>
      <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Carfagno Enterprises
      </span>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <img 
          src={`${import.meta.env.BASE_URL}images/ce-logo.png?v=2`}
          alt="CE Logo" 
          className="h-8 w-8"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
