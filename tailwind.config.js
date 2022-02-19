const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./public/**/*.html", 
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'mattblack': '#0D0D0D',
        'purewhite': '#FFFFFF',
      },
      fontFamily: {
        berkshireswash: ['Berkshire Swash'],
        titilliumweb: ['Titillium Web'],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    scrollbar: ['dark']
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("@tailwindcss/forms")({
      strategy: 'className',
    }),
  ],
}
