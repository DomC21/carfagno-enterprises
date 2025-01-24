import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from './ui/button'
import { colorClasses, animationClasses } from '../utils/styles'

type Testimonial = {
  quote: string
  author: string
  role?: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Dom's tools and coaching helped me grow my portfolio by 25% in just 6 months! The AI-driven insights from Zom AI were game-changing.",
    author: "Sarah M.",
    role: "Software Engineer"
  },
  {
    quote: "Using Lukz's Congressional trade tracking and premium flow analysis, I've made significantly better investment decisions. Dom's guidance in using these tools has been invaluable.",
    author: "Michael R.",
    role: "Business Owner"
  },
  {
    quote: "The combination of personalized coaching and cutting-edge tools helped me achieve my financial goals in half the time I expected. The technical analysis from Rust is exceptional.",
    author: "Jennifer K.",
    role: "Marketing Director"
  },
  {
    quote: "Dom's expertise and AI-powered tools helped me diversify my portfolio across both traditional markets and cryptocurrency. My returns have increased by 15% since starting.",
    author: "Alex T.",
    role: "Healthcare Professional"
  }
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const next = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((current) => (current + 1) % testimonials.length)
  }

  const previous = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className={`bg-gradient-to-br ${colorClasses.gradient.section.secondary} p-6 sm:p-8 rounded-xl ${animationClasses.fadeIn}`}>
        <div className="flex items-start gap-3 sm:gap-4">
          <Quote className={`w-6 h-6 sm:w-8 sm:h-8 ${colorClasses.primary} shrink-0 mt-1`} />
          <div className="space-y-3 sm:space-y-4">
            <p className={`${colorClasses.secondary} text-base sm:text-lg italic`}>
              {testimonials[currentIndex].quote}
            </p>
            <div>
              <p className={`font-medium ${colorClasses.primary} text-sm sm:text-base`}>{testimonials[currentIndex].author}</p>
              {testimonials[currentIndex].role && (
                <p className="text-xs sm:text-sm text-gray-400">{testimonials[currentIndex].role}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 right-4 flex gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`${colorClasses.primary} hover:bg-blue-900/50 p-2 sm:p-3`}
          onClick={previous}
        >
          <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${colorClasses.primary} hover:bg-blue-900/50 p-2 sm:p-3`}
          onClick={next}
        >
          <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  )
}
