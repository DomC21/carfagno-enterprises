/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    safelist: [
      'animate-fade-in',
      'animate-slide-up',
      'animate-float',
      'animate-pulse',
      'animate-drift',
      'animate-shimmer',
      'animate-ticker',
      'animate-counting',
      'animate-flow',
      'animate-stock-ticker',
      'animate-data-flow',
      'animate-graph-float',
      'animate-fade-in-scale',
      {
        pattern: /^opacity-/,
        variants: ['hover', 'group-hover']
      },
      {
        pattern: /^transform-/,
        variants: ['hover', 'group-hover']
      }
    ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        primary: {
          DEFAULT: '#000000',
          accent: '#3B82F6',
          muted: '#1E293B'
        },
        secondary: {
          DEFAULT: '#0F172A',
          accent: '#2DD4BF',
          muted: '#334155'
        },
        highlight: {
          blue: '#60A5FA',
          teal: '#2DD4BF',
          gold: '#F59E0B'
        },
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'fade-in': {
  				from: { opacity: '0' },
  				to: { opacity: '1' }
  			},
  			'slide-up': {
  				from: { transform: 'translateY(20px)', opacity: '0' },
  				to: { transform: 'translateY(0)', opacity: '1' }
  			},
  			'float': {
  				'0%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
  				'50%': { transform: 'translateY(-4px) translateX(2px) rotate(0.5deg)' },
  				'100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' }
  			},
  			'pulse': {
  				'0%': { opacity: '0.2' },
  				'50%': { opacity: '0.3' },
  				'100%': { opacity: '0.2' }
  			},
  			'drift': {
  				'0%': { transform: 'translateX(0px) scale(1)' },
  				'50%': { transform: 'translateX(8px) scale(1.01)' },
  				'100%': { transform: 'translateX(0px) scale(1)' }
  			},
  			'shimmer': {
  				'0%': { opacity: '0.15', filter: 'brightness(0.95)' },
  				'50%': { opacity: '0.25', filter: 'brightness(1.05)' },
  				'100%': { opacity: '0.15', filter: 'brightness(0.95)' }
  			},
  			'ticker': {
  				'0%': { transform: 'translateX(0)', opacity: '0.2' },
  				'50%': { opacity: '0.3' },
  				'100%': { transform: 'translateX(-100%)', opacity: '0.2' }
  			},
  			'counting': {
  				'0%': { opacity: '0.2', transform: 'scale(1) translateY(0)' },
  				'25%': { opacity: '0.3', transform: 'scale(1.005) translateY(-0.5px)' },
  				'75%': { opacity: '0.3', transform: 'scale(1.005) translateY(-0.5px)' },
  				'100%': { opacity: '0.2', transform: 'scale(1) translateY(0)' }
  			},
  			'flow': {
  				'0%': { strokeDashoffset: '0', opacity: '0.15' },
  				'50%': { opacity: '0.25' },
  				'100%': { strokeDashoffset: '-10', opacity: '0.15' }
  			},
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)', filter: 'brightness(1.1)' },
          '40%': { transform: 'translate(2px, -2px)', filter: 'brightness(0.9)' },
          '60%': { transform: 'translate(-1px, 1px)', filter: 'brightness(1.05)' },
          '80%': { transform: 'translate(1px, -1px)', filter: 'brightness(0.95)' },
          '100%': { transform: 'translate(0)', filter: 'brightness(1)' }
        },
        'stock-ticker': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'data-flow': {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '0.7', transform: 'translateY(-10px)' }
        },
        'graph-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.8s ease-out forwards',
  			'slide-up': 'slide-up 0.8s ease-out forwards',
  			'float': 'float 6s ease-in-out infinite',
  			'pulse': 'pulse 4s ease-in-out infinite',
  			'drift': 'drift 12s ease-in-out infinite',
  			'shimmer': 'shimmer 6s ease-in-out infinite',
  			'ticker': 'ticker 60s linear infinite',
  			'counting': 'counting 10s ease-in-out infinite',
  			'flow': 'flow 30s ease-in-out infinite',
        'glitch': 'glitch 3s ease-in-out infinite',
        'stock-ticker': 'stock-ticker 30s linear infinite',
        'data-flow': 'data-flow 15s ease-in-out infinite',
        'graph-float': 'graph-float 20s ease-in-out infinite',
        'fade-in-scale': 'fade-in-scale 0.3s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

