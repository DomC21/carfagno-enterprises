import * as React from "react"
import { cn } from "../lib/utils"

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4 relative group", className)} {...props}>
      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/40 to-blue-500/40 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow"></div>
      <div className="relative">
        <svg
          width="80"
          height="80"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-teal-400 animate-float transition-all duration-700 hover:scale-110 hover:rotate-3"
        >
          <path
            d="M20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2ZM20 6C27.732 6 34 12.268 34 20C34 27.732 27.732 34 20 34C12.268 34 6 27.732 6 20C6 12.268 12.268 6 20 6Z"
            fill="currentColor"
          />
          <path
            d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10ZM20 14C23.3137 14 26 16.6863 26 20C26 23.3137 23.3137 26 20 26C16.6863 26 14 23.3137 14 20C14 16.6863 16.6863 14 20 14Z"
            fill="currentColor"
          />
          <path
            d="M20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18Z"
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
