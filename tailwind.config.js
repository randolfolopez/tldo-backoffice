/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8f4fa',
          100: '#d1e9f5',
          200: '#a3d3eb',
          300: '#5bc0eb',
          400: '#3aadde',
          500: '#1B6B93',
          600: '#0F4C75',
          700: '#0a2540',
          800: '#071a2e',
          900: '#040f1a',
          950: '#020810',
        },
        surface: {
          0: '#0a0f1a',
          1: '#0f1525',
          2: '#151d30',
          3: '#1c2640',
          4: '#243050',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
