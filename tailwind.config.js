/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0f172a',
        'brand-blue': '#2563eb',
        'brand-slate': '#f8fafc',
      }
    },
  },
  plugins: [],
}
