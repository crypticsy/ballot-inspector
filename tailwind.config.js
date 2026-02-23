/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4edd8',
        'paper-dark': '#e8d9b8',
        'paper-aged': '#d4c9a0',
        desk: '#0f0805',
        'desk-light': '#1e1208',
        'desk-mid': '#2c1a0c',
        'stamp-red': '#8b0000',
        'stamp-red-light': '#cc2222',
        'stamp-green': '#004d00',
        'stamp-green-light': '#1a6b1a',
        ink: '#1a1208',
        'ink-light': '#3a2a18',
        gold: '#b8960c',
        'gold-light': '#d4b030',
      },
      fontFamily: {
        typewriter: ['"Special Elite"', 'Courier New', 'monospace'],
        nepali: ['"Noto Sans Devanagari"', 'serif'],
        mono: ['"Courier Prime"', 'Courier New', 'monospace'],
      },
      boxShadow: {
        ballot: '4px 6px 20px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
        stamp: '2px 2px 8px rgba(0,0,0,0.6)',
        'inner-desk': 'inset 0 2px 10px rgba(0,0,0,0.8)',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(120%) rotate(3deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-120%) rotate(-3deg)', opacity: '0' },
        },
        stampDrop: {
          '0%': { transform: 'scale(3) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'scale(0.9) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-5deg)', opacity: '1' },
        },
        flashGreen: {
          '0%': { backgroundColor: 'rgba(0, 100, 0, 0)' },
          '30%': { backgroundColor: 'rgba(0, 100, 0, 0.3)' },
          '100%': { backgroundColor: 'rgba(0, 100, 0, 0)' },
        },
        flashRed: {
          '0%': { backgroundColor: 'rgba(139, 0, 0, 0)' },
          '30%': { backgroundColor: 'rgba(139, 0, 0, 0.3)' },
          '100%': { backgroundColor: 'rgba(139, 0, 0, 0)' },
        },
        ticker: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        slideOut: 'slideOut 0.4s ease-in forwards',
        stampDrop: 'stampDrop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        flashGreen: 'flashGreen 0.6s ease-out forwards',
        flashRed: 'flashRed 0.6s ease-out forwards',
        ticker: 'ticker 1s ease-in-out infinite',
        flicker: 'flicker 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
