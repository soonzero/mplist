module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 1.5s linear infinite",
      },
      colors: {
        mplist: "#D2CAF6",
        spotify: "#1ED760",
      },
    },
  },
  plugins: [],
};
