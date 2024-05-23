/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/native");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./App/**/*.{js,jsx,ts,tsx}", "./*.ts"],
  theme: {
    extend: {
      backgroundImage: {
        gradientCustom:
          "url('https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80')",
      },
    },
  },
  plugins: [nativewind()],
};
