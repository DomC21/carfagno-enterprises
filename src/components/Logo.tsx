import * as React from "react"
import { cn } from "../lib/utils"

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center min-h-[3rem]", className)} {...props}>
      <div className="ml-4">
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
