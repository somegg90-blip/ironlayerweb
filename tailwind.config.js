/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#09090b",
        smoke: "#18181b",
        platinum: "#fafafa",
        electric: {
          DEFAULT: "#22d3ee",
          glow: "rgba(34, 211, 238, 0.2)",
        },
        indigo: {
          deep: "#6366f1",
        },
        gold: "#fbbf24",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}