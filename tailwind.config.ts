import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          DEFAULT: '#fb923c',
          light: '#fdba74',
          dark: '#ea580c',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          DEFAULT: '#059669',
          light: '#34d399',
          dark: '#065f46',
        },
        adventure: {
          sun: '#fb923c',
          forest: '#059669',
          river: '#0ea5e9',
          earth: '#92400e',
          sky: '#38bdf8',
          fire: '#dc2626',
          grass: '#22c55e',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 2s linear infinite',
        'flicker': 'flicker 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 5px rgba(251, 146, 60, 0.5)'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 20px rgba(251, 146, 60, 0.8)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shine': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-adventure': 'linear-gradient(135deg, #fb923c 0%, #0ea5e9 50%, #059669 100%)',
        'gradient-sunset': 'linear-gradient(to right, #fb923c, #ea580c, #9a3412)',
        'gradient-forest': 'linear-gradient(to bottom, #065f46, #059669, #34d399)',
        'gradient-sunrise': 'linear-gradient(to right, #fb923c, #fdba74, #fed7aa)',
      },
      boxShadow: {
        'adventure': '0 10px 30px -3px rgba(251, 146, 60, 0.3), 0 4px 6px -2px rgba(251, 146, 60, 0.1)',
        'adventure-lg': '0 20px 60px -10px rgba(251, 146, 60, 0.4), 0 10px 20px -5px rgba(251, 146, 60, 0.2)',
        'glow-accent': '0 0 20px rgba(251, 146, 60, 0.5)',
      },
    },
  },
  plugins: [],
}

export default config