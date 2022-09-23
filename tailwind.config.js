/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      componentBorder: "#FFFFFF14",
      componentFocus: "#FFFFFF55",
      tezGrSt: "#00FBFB",
      tezGrEd: "#0050EA",
    },
  },
  plugins: [],
};
