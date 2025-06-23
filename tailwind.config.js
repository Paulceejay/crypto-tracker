/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#622ff6",
        white: "#ffffff",
        title: "#010015",
        titleBg: "#0e165f",
        text: "#babbc4",
        text2: "#777b80",
        background: "#f6f8fc",
        successColor: "#88bca6",
        dangerColor: "#df7c90",
      },
      fontFamily: {
        'Grotesk': ['Grotesk', 'SpaceMono'],
        'GroteskBold': ['GroteskBold', 'Grotesk'],
        'SpaceMono': ['SpaceMono', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
