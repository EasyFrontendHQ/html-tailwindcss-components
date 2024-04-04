/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./tailwind/**/*.html"],
  darkMode: "class",
  theme: {
    // screens: {
    //   sm: "576px",

    //   md: "768px",

    //   lg: "992px",

    //   xl: "1200px",

    //   "2xl": "1400px",
    // },
    container: {
      center: true,
      // padding: {
      //   DEFAULT: "1rem",
      // },
      // screens: {
      //   sm: "540px",

      //   md: "720px",

      //   lg: "960px",

      //   xl: "1140px",

      //   "2xl": "1320px",
      // },
    },
    extend: {
      // boxShadow: {
      //   cardShadow: "0 11px 49px rgba(213, 213, 213, 0.5)",
      // },
      // colors: {
      //   border: " #d1d1d1",
      //   btnBorder: "#00000033",
      //   themeColor: "#0d6efd",
      //   white: "#fff",
      //   black: "#000",
      // },
    },
  },
  plugins: [],
};
