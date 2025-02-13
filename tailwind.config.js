/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter var', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
    },
  	extend: {
      colors: {
        background: {
          DEFAULT: '#030711',
          secondary: '#0A1324',
        },
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#60A5FA',
          muted: '#1D4ED8',
        },
        accent: {
          DEFAULT: '#14B8A6',
          hover: '#2DD4BF',
          gold: '#F59E0B',
        },
        border: {
          DEFAULT: '#1E293B',
          hover: '#3B82F6',
        },
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
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'background-shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        'data-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: 0.5, 
            boxShadow: '0 0 20px rgba(59,130,246,0.1)' 
          },
          '50%': { 
            opacity: 0.8, 
            boxShadow: '0 0 30px rgba(59,130,246,0.2)' 
          }
        },
        'glow-text': {
          '0%, 100%': { 
            textShadow: '0 0 8px rgba(59,130,246,0.3)',
            filter: 'brightness(1)'
          },
          '50%': { 
            textShadow: '0 0 16px rgba(59,130,246,0.6)',
            filter: 'brightness(1.2)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ticker': 'ticker 45s linear infinite',
        'glow': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fade-in-up 0.5s ease-out forwards',
        'shine': 'background-shine 8s linear infinite',
        'data-stream': 'data-flow 20s linear infinite',
        'glow-effect': 'pulse-glow 3s ease-in-out infinite',
        'glow-text': 'glow-text 3s ease-in-out infinite',
        'bounce': 'bounce 2s ease-in-out infinite',
        'bounce-hover': 'bounce 0.5s ease-out'
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

