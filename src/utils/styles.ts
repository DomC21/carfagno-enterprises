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
    glow: 'from-teal-500/20 to-blue-500/20'
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
  hover: 'transition-all duration-500 ease-out hover:scale-105',
  button: 'transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl',
  icon: 'transition-all duration-500 ease-out group-hover:scale-110',
  parallax: 'transition-transform duration-1000 ease-out'
}
