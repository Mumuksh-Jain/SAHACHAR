/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        base: {
          DEFAULT: '#07111F',
          surface: '#0E1A2B',
          elevated: '#142236',
          border: '#1E3248',
          hover: '#1A2E44',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
        },
        red: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'ping-once': 'ping 0.6s cubic-bezier(0, 0, 0.2, 1) 1',
        'draw-line': 'drawLine 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        drawLine: {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
    },
  },
  plugins: [],
}
