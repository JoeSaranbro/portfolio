/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens:{
        'deletemodal': '745px',
      },
      screens:{
        'input_date': '840px',
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
