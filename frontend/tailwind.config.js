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
        primary: "#7869B0",   // Deep Lilac
        secondary: "#4A706E", // Pine Blue
        success: "#4C9F70",   // Shamrock
        background: "var(--color-background)", // Dynamic
        text: "var(--color-text)",             // Dynamic
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