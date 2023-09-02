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
        'black': {
          '50': '#111',
          '100': '#111',
          '200': '#222',
          '300': '#333',
          '400': '#444',
          '500': '#555',
          '600': '#666',
          '700': '#777',
          '800': '#888',
          '900': '#999',
          '950': '#111',
        },
      }
    },
    screens: {
      '2xl': {'max': '2500px'},
      // => @media (max-width: 1535px) { ultra }

      'xl': {'max': '1879px'},
      // => @media (max-width: 1279px) { wide screen }

      'lg': {'max': '1100px'},
      // => @media (max-width: 1023px) { min wide screen }

      'md': {'max': '950px'},
      // => @media (max-width: 767px) { tablet }

      'sm': {'max': '500px'},
      // => @media (max-width: 639px) { mobile }
    },
  },
  plugins: [],
}