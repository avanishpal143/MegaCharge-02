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
          green: "#F18321",          /* Remapped to brand orange */
          navy: "#653d1e",           /* Remapped to subheading warm brown */
          orange: "#F18321",         /* Remapped to brand orange */
          dark: "#402e32",           /* Remapped to headings dark deep plum */
          gray: "#dfe0df",           /* Remapped to bg-cool gray */
          card: "#fff7f1",           /* Remapped to bg-warm cream */
          border: "rgba(64, 46, 50, 0.12)",
          brand: "#F18321",
          heading: "#402e32",
          subheading: "#653d1e",
          paragraph: "#7e4437",
          icon: "#832800",
        }
      },
      fontFamily: {
        poppins: ["Montserrat", "sans-serif"], /* Redirect legacy poppins to Montserrat */
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 247, 241, 0.05), rgba(255, 247, 241, 0.01))',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(241, 131, 33, 0.25)',
        'glow-orange': '0 0 20px rgba(241, 131, 33, 0.25)',
        'premium-glass': '0 8px 32px 0 rgba(64, 46, 50, 0.08)',
      }
    },
  },
  plugins: [],
}
