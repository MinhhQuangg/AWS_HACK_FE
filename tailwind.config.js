/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Fredoka One"', "cursive"],
        body: ["Fredoka", "sans-serif"],
        navbar: ['"Baloo 2"', "cursive"],
      },
      colors: {
        bg: {
          light: "#ffffff",
          dark: "#e1e1e1",
        },
        highlight: "#bcfefe",
        primary: {
          DEFAULT: "#0c5776",
          dark: "#043043",
        },
        secondary: {
          DEFAULT: "#2d99ae",
          dark: "#27707f",
        },
        textgray: {
          light: "#686868",
          dark: "#565656",
        },
        buttonshadow: "#c4c4c4",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "560px",
        md: "892px",
        lg: "1024px",
        xl: "1430px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-green-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-cyan-400",
    "bg-yellow-400",
  ],
};
