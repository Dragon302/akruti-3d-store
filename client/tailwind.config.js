/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: "#2563eb", // Tech Blue (Like SafeTag's button)
        secondary: "#1e293b", // Slate (Dark Gray)
        dark: "#020617", // Deep Black (Footer/Hero bg)
        light: "#f8fafc", // Very light gray (Section bg)
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}