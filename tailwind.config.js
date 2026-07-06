/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        megacharge: {
          green: "#00B4D8",
          navy: "#1C2541",
          orange: "#FF6B35",
          dark: "#0B132B",
          gray: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(29, 185, 84, 0.2)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.2)',
        'premium-glass': '0 8px 32px 0 rgba(3, 12, 21, 0.37)',
      }
    },
  },
  plugins: [],
}
