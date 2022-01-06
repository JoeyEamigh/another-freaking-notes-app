const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        primary: {
          50: '#EBF2F4',
          100: '#d0e2e6',
          200: '#a1c4cc',
          300: '#72a7b3',
          400: '#438999',
          500: '#146c80',
          600: '#105666',
          700: '#0c414d',
          800: '#082b33',
          900: '#04161a',
        },
        secondary: {
          100: '#fcfbf4',
          200: '#faf7e9',
          300: '#f7f3df',
          400: '#f5efd4',
          500: '#f2ebc9',
          600: '#c2bca1',
          700: '#918d79',
          800: '#615e50',
          900: '#302f28',
        },
        tertiary: {
          50: '#FCF5F5',
          100: '#f2d6d6',
          200: '#e5aeae',
          300: '#d98585',
          400: '#cc5d5d',
          500: '#bf3434',
          600: '#992a2a',
          700: '#731f1f',
          800: '#4c1515',
          900: '#260a0a',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};
