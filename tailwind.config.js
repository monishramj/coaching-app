/** @type {import('tailwindcss').Config} */
module.exports = {
  // this should be updated to include all files that have nativewind classes
  content: ["./app/(tabs)/*.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}