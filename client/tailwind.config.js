/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        charcoal: {
          DEFAULT: '#15171C',
          light: '#1E2129',
          card: '#121418',
          border: '#272B35',
        },
        brand: {
          orange: '#FF7900',
          'orange-hover': '#E06A00',
          'orange-glow': 'rgba(255, 121, 0, 0.25)',
          blue: '#168BFF',
          'blue-hover': '#0074E4',
          'blue-glow': 'rgba(22, 139, 255, 0.25)',
        },
        technova: {
          grey: '#A1A1AA',
          light: '#F4F4F5',
          dark: '#09090B',
          muted: '#71717A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 121, 0, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(22, 139, 255, 0.3)',
        'glow-card': '0 8px 30px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
