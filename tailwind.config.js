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
      primary: "#FF4401",
      primaryLow: "#ff4e0e",
      secondary: "#858EAD",
      white: "#fff",
      black: "#0f172a",
      gray: "#cbd5e1",
      smoke: "#F0F2F5",
      smokeHover: "#E4E6E9",
      smokeDark: "#65676b",
      dark4: "#2C353D",
      dark3: "#97989D",
      bg: "#1E252B",
      bg2: "#262D34",
      hover: "#2C353D",
      no: "#d03248",
      yes: "#388d37",
    },
    backgroundImage: {
      404: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
