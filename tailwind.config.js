/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      componentBg: "#222C34",
      componentBorder: "#FFFFFF14",
      componentFocus: "#FFFFFF55",
      tezGrSt: "#00FBFB",
      tezGrMd: "#00A672",
      tezGrEd: "#0050EA",
    },
  },
  plugins: [],
};
