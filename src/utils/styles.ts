export const colorClasses = {
  primary: 'text-teal-400',
  secondary: 'text-gray-300',
  accent: 'text-blue-400',
  hover: 'hover:text-teal-400',
  border: 'border-teal-500/20',
  borderHover: 'hover:border-teal-500',
  gradient: {
    primary: 'from-teal-400 to-blue-500',
    background: 'from-blue-900 via-blue-950 to-slate-900',
    glow: 'from-teal-500/20 to-blue-500/20',
    section: {
      primary: 'from-blue-950/80 to-blue-900/50',
      secondary: 'from-blue-900/50 to-blue-950/80',
      tertiary: 'from-blue-950/80 to-blue-900/30'
    }
  },
  chart: {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-yellow-400',
    grid: 'stroke-slate-700',
    axis: 'stroke-slate-400',
    tooltip: {
      bg: 'bg-slate-900',
      border: 'border-slate-700',
      text: 'text-slate-300'
    }
  },
  input: {
    background: 'bg-blue-900/30',
    border: 'border-teal-500/20',
    focus: 'focus:border-teal-400 focus:ring-teal-400/20',
    placeholder: 'placeholder:text-gray-400'
  },
  card: {
    background: 'bg-blue-950/50',
    hover: 'hover:bg-blue-900/50',
    border: 'border-teal-500/20',
    borderHover: 'hover:border-teal-400/50'
  },
  heading: {
    gradient: 'bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent'
  }
}

export const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  hover: 'transition-all duration-300 ease-out hover:scale-[1.02]',
  button: 'transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md',
  icon: 'transition-all duration-500 ease-out group-hover:scale-[1.03]',
  parallax: 'transition-transform duration-700 ease-out',
  glow: 'animate-glow transition-all duration-700 hover:shadow-md hover:shadow-teal-500/10',
  drift: 'animate-drift transition-all duration-[12s] ease-in-out infinite',
  shimmer: 'animate-shimmer transition-all duration-[6s] ease-in-out infinite',
  ticker: 'animate-ticker transition-all duration-[60s] linear infinite',
  counting: 'animate-counting transition-all duration-[10s] ease-in-out infinite',
  flow: 'animate-flow transition-all duration-[30s] ease-in-out infinite'
}
