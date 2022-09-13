const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans' : ['League Spartan', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}