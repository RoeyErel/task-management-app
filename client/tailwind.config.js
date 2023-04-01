/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'spectra': {
          '50': '#f4f9f8',
          '100': '#dbece9',
          '200': '#b8d7d3',
          '300': '#8cbcb8',
          '400': '#649d9a',
          '500': '#4a8280',
          '600': '#396867',
          '700': '#2e4f4f',
          '800': '#2a4545',
          '900': '#263b3b',
          '950': '#122121',
      },
      
      }
    },
  },
  plugins: [],
}