/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        brand: '#94F871',
        off: '#ededed',
        primary: '#FFD700'
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '1rem',
      },
    },
    fontFamily:{
      pop: ["Poppins", "serif"],
    },
  },
  plugins: [],
}