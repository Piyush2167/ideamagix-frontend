/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"General Sans"', 'sans-serif'],
        trench: ['"Trench Slab"', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#171B1A',
          soft: '#4B5451',
        },
        canvas: '#FAFAF9',
        line: '#E5E7E4',
        clinic: {
          50: '#EAF3F1',
          100: '#CFE4DF',
          400: '#3F8F82',
          500: '#1F7A6C',
          600: '#166358',
          700: '#124F47',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(23, 27, 26, 0.04), 0 8px 24px -12px rgba(23, 27, 26, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
