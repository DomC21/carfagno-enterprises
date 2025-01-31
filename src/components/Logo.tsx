import * as React from "react"
import { cn } from "../lib/utils"

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4 relative group", className)} {...props}>
      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/40 to-blue-500/40 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow glow-effect"></div>
      <div className="relative">
        <svg
          width="80"
          height="80"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-teal-400 animate-float transition-transform duration-700 hover:scale-110 hover:rotate-3 glow-effect"
        >
          <path
            d="M20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2ZM20 6C27.732 6 34 12.268 34 20C34 27.732 27.732 34 20 34C12.268 34 6 27.732 6 20C6 12.268 12.268 6 20 6Z"
            fill="currentColor"
          />
          <path
            d="M24 14C21.2386 14 19 16.2386 19 19V21C19 23.7614 21.2386 26 24 26C25.3062 26 26.5039 25.5178 27.4142 24.7071L25.2929 22.5858C24.9023 22.8457 24.4674 23 24 23C22.8954 23 22 22.1046 22 21V19C22 17.8954 22.8954 17 24 17C24.4674 17 24.9023 17.1543 25.2929 17.4142L27.4142 15.2929C26.5039 14.4822 25.3062 14 24 14Z"
            fill="currentColor"
          />
          <path
            d="M16 14H12V26H16V21H15V19H16V14Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent relative">
        Carfagno Enterprises
      </span>
    </div>
  )
}
