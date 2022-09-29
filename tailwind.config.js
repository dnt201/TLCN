/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
      },
    },
    colors: {
      transparent: "transparent",
      primary: "#0ea5e9",
      secondary: "#f472b6",
      background: "#0f172a",
    },
  },
  plugins: [],
};
