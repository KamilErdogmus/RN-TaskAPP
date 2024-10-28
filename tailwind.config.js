/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        dark: "#121212",
        "dark-surface": "#1E1E1E",
        light: "#FFFFFF",
        "light-surface": "#F5F5F5",
        primary: "#e63030",
      },
      textColor: {
        dark: "#FFFFFF",
        "dark-secondary": "#E4E4E7",
        "dark-tertiary": "#A1A1AA",
        light: "#000000",
        "light-secondary": "#1F2937",
        "light-tertiary": "#6B7280",
      },
    },
  },
  plugins: [],
};
