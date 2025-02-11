export const theme = {
  colors: {
    primary: {
      background: 'bg-black',
      text: 'text-white',
      accent: 'text-blue-400',
      muted: 'text-gray-400'
    },
    secondary: {
      background: 'bg-slate-900',
      text: 'text-gray-200',
      accent: 'text-teal-400',
      muted: 'text-gray-500'
    },
    highlight: {
      blue: 'text-blue-400 hover:text-blue-300',
      teal: 'text-teal-400 hover:text-teal-300',
      gold: 'text-amber-400 hover:text-amber-300'
    },
    gradients: {
      primary: 'bg-gradient-to-br from-black via-slate-900 to-black',
      accent: 'bg-gradient-to-r from-blue-400/10 via-teal-400/10 to-blue-400/10',
      glow: 'bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-amber-500/20'
    }
  },
  animations: {
    transition: 'transition-all duration-300',
    hover: 'hover:scale-105 hover:brightness-110',
    glow: 'animate-glow',
    float: 'animate-float',
    shimmer: 'animate-shimmer',
    ticker: 'animate-ticker'
  },
  effects: {
    glass: 'backdrop-blur-md bg-black/80',
    glow: 'after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-r after:from-blue-500/20 after:via-teal-500/20 after:to-amber-500/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity',
    border: 'border border-white/10 hover:border-white/20'
  },
  layout: {
    section: 'py-16 md:py-24',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    card: 'rounded-lg bg-slate-900/50 backdrop-blur-lg'
  }
}

export type Theme = typeof theme
