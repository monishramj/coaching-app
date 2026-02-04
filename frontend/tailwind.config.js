// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        surface: "var(--color-surface)",
        primary: "#7869B0",   // Lilac
        secondary: "#4A706E", // Pine
        success: "#4C9F70",   // Shamrock
        "border-subtle": "var(--color-border-subtle)",

        // raw access:
        parchment: "#F9F6F1",
        ink: "#020912",
        lilac: '#7869B0',
        shamrock: '#4C9F70',
        pine: '#4A706E',
      },
    },
  },
  plugins: [],
}