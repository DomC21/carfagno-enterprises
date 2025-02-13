/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter var', 'system-ui', 'sans-serif'],
    },
  	extend: {
      colors: {
        background: {
          DEFAULT: '#000000', // Pure black
          secondary: '#000000', // Pure black
        },
        primary: {
          DEFAULT: '#3B82F6', // Neon blue
          hover: '#60A5FA',
          muted: '#1D4ED8',
        },
        accent: {
          DEFAULT: '#14B8A6', // Teal
          hover: '#2DD4BF',
          gold: '#F59E0B',
        },
        border: {
          DEFAULT: '#1E293B',
          hover: '#3B82F6',
        },
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
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
            ticker: {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-100%)' }
            },
            'ticker-reverse': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(0)' }
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
            'scale-up': {
              '0%': { transform: 'scale(1)' },
              '100%': { transform: 'scale(1.05)' }
            },
            'slide-in': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(0)' }
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
            'ticker-clone': 'ticker 45s linear infinite',
            'glow': 'glow-pulse 2s ease-in-out infinite',
            'float': 'float 3s ease-in-out infinite',
            'fade-in': 'fade-in-up 0.5s ease-out forwards',
            'shine': 'background-shine 8s linear infinite',
            'data-stream': 'data-flow 20s linear infinite',
            'glow-effect': 'pulse-glow 3s ease-in-out infinite',
            'hover-scale': 'scale-up 0.2s ease-out forwards',
            'slide-in': 'slide-in 0.3s ease-out',
            'glow-text': 'glow-text 3s ease-in-out infinite'
          }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

