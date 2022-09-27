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
      itemBorder: "#454B50",
      componentFocus: "#FFFFFF55",
      tezDarkBg: "#161e24",
      tezGrSt: "#00FBFB",
      tezGrMd: "#00A672",
      tezGrEd: "#0050EA",
      tezText: "#99BAD3",
      grayText: "#6A7B89",
      tezCyan: "#33DFEA",
    },
  },
  plugins: [],
};
