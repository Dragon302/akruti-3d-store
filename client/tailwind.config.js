/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f0c29", // Deep Space Black
        surface: "#1a163a",    // Dark Purple Card Background
        primary: "#ff0080",    // Neon Pink
        secondary: "#00d4ff",  // Neon Cyan
        textMain: "#ffffff",
        textMuted: "#aab2bd",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #ff0080 0deg, #00d4ff 180deg, #ff0080 360deg)',
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 212, 255, 0.5)",
        pink: "0 0 20px rgba(255, 0, 128, 0.5)",
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
}