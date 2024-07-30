/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        review: '#fee2e2', // custom color for review
        completed: '#cffafe', // custom color for completed
        todo: '#e0e7ff', // custom color for todo
        'in-progress': '#d1fae5' // custom color for
      }
    }
  },
  plugins: []
  // corePlugins: {
  //   preflight: false
  // }
}
