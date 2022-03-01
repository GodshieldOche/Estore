module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    letterSpacing: {
      custom: '4px',
      widest: '2.5px',
      wide: '1.4px',
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      width: {
        '70': '70px',
        '100': '80px',
      },
      height: {
        '70': '50px',
        '40': '40px',
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
      Quintessential: ['Quintessential']
    }
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('flowbite/plugin')
  ],
}
