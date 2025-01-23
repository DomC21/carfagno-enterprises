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
    quote: "Dom's coaching helped me save $500 a month and start investing confidently!",
    author: "Sarah M.",
    role: "Software Engineer"
  },
  {
    quote: "I doubled my monthly investment budget in 3 months!",
    author: "Michael R.",
    role: "Business Owner"
  },
  {
    quote: "The personalized strategies helped me achieve my financial goals faster than I expected.",
    author: "Jennifer K.",
    role: "Marketing Director"
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
      <div className={`bg-gradient-to-br ${colorClasses.gradient.section.secondary} p-8 rounded-xl ${animationClasses.fadeIn}`}>
        <div className="flex items-start gap-4">
          <Quote className={`w-8 h-8 ${colorClasses.primary} shrink-0 mt-1`} />
          <div className="space-y-4">
            <p className={`${colorClasses.secondary} text-lg italic`}>
              {testimonials[currentIndex].quote}
            </p>
            <div>
              <p className={`font-medium ${colorClasses.primary}`}>{testimonials[currentIndex].author}</p>
              {testimonials[currentIndex].role && (
                <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`${colorClasses.primary} hover:bg-blue-900/50`}
          onClick={previous}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${colorClasses.primary} hover:bg-blue-900/50`}
          onClick={next}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
