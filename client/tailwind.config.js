module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    sm: "600px",
    md: "900px",
    lg: "1024px",
    xl: "1280px",
  },
  variants: {
    // backgroundColor: ['active'],
    extend: {},
  },
  plugins: [],
};
