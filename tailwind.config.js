/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5409DA',
        'light-gray': '#F5F5F5',
        'medium-gray': '#D9D9D9',
        'dark-gray': '#CCC',
        'text-primary': '#1E1E1E',
        'text-secondary': '#757575',
        'warning': '#FFEA00',
        'danger': '#EC221F',
      },
      fontFamily: {
        karla: ['Karla', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': '96px',
        'section-title': '64px',
        'title': '25px',
        'body-large': '36px',
        'body': '20px',
        'card-name': '20px',
        'card-position': '15px',
        'card-title': '24px',
        'card-body': '16px',
        'description': '18px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
