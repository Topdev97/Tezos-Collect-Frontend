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
      inputBorder: "#344451",
      componentFocus: "#FFFFFF55",
      tezDarkBg: "#161e24",
      tezSecSt: "#ff85e7",
      tezSecEd: "#d22e00",
      tezGrSt: "#00FBFB",
      tezGrMd: "#00A672",
      tezGrEd: "#0050EA",
      tezText: "#99BAD3",
      grayText: "#6A7B89",
      tezCyan: "#33DFEA",
      tezWarning: "#FD7979",
      tezSuccess: "#00FB64",
    },
  },
  plugins: [],
};
