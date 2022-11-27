/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens:{
        'deletemodal': '745px',
      },
    },
    minHeight: {
      'vh': '40vh',
    },
    maxHeight:{
      'vh': '100vh',
    },
  },
  plugins: [],
}
