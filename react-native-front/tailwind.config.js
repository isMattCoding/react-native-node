/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/native");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./App/**/*.{js,jsx,ts,tsx}", "./*.ts"],
  theme: {
    extend: {},
  },
  plugins: [nativewind()],
};
