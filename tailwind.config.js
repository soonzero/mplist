module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 1.5s linear infinite",
      },
      flexBasis: {
        "1/24": "4.16666665%",
        "1/20": "5%",
        "1/16": "6.25%",
      },
      screens: {
        mobile: "320px",
        tablet: "768px",
        laptop: "1024px",
        monitor: "1440px",
        "4K": "2560px",
      },
      colors: {
        mplist: "#D2CAF6",
        spotify: "#1ED760",
      },
    },
  },
  plugins: [],
};
