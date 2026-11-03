/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Skill Revolution — warm white + beige paper, navy ink, brand red
        bg: '#FBF8F2',
        surface: '#F3EBDC',
        surfaceLight: '#E9DEC9',
        line: 'rgba(70, 52, 24, 0.13)',
        lineLight: 'rgba(70, 52, 24, 0.24)',
        text: '#16192A',
        muted: '#6E6656',
        accent: '#D62A33', // brand red
        'accent-hover': '#B21F28',
        'accent-dim': 'rgba(214, 42, 51, 0.10)',
        'accent-2': '#2B3A67', // navy
        cobalt: '#1E2B48',
        steel: '#57585A',
      },
      fontFamily: {
        headline: ['Archivo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['Manrope', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
        'super-wide': '0.2em',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'scroll-dot': 'scrollDot 1.8s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-reverse': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } },
        pulseSubtle: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        scrollDot: { '0%': { transform: 'translateY(0)', opacity: 1 }, '80%': { transform: 'translateY(12px)', opacity: 0 }, '100%': { opacity: 0 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};
