import React from 'react'

export function RouteLoading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  )
}
