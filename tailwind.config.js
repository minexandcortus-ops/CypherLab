/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        enigma: {
          dark: "#1a1a2e",
          accent: "#ffd700", // Gold
          neon: "#00f2ff", // Cyan neon
          hacker: "#00ff41", // Matrix green
        }
      },
      fontFamily: {
        mystery: ["'Special Elite'", "cursive"],
        hacker: ["'JetBrains Mono'", "monospace"],
        elegant: ["'Playfair Display'", "serif"],
      }
    },
  },
  plugins: [],
}
