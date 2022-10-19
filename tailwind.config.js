/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      fontSize: {
        ss: "10px",
        s: "13px",
      },
      screens: {
        phone: { max: "639px" },
        tablet: { max: "1279px" },
      },
    },
    colors: {
      transparent: "transparent",
      primary: "#0ea5e9",
      secondary: "#f472b6",
      white: "#fff",
      black: "#0f172a",
      gray: "#cbd5e1",
      smoke: "#F0F2F5",
      smokeHover: "#E4E6E9",
      smokeDark: "#65676b",
      dark4: "#2C353D",
      dark3: "#97989D",
    },
  },
  plugins: [],
};
