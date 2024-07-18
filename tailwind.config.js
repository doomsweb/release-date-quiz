/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/background.jpg')",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

