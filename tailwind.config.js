/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/assets/bg.png')",
        'sidebar-bg': "url('/src/assets/bg-sidebar.svg')",
        'header-bg': "url('/src/assets/bg-header.svg')",
      },
    },
  },
  plugins: [],
}