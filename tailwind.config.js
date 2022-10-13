/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.ejs", "public/js/*.js"],
  theme: {
    extend: {
      colors: {
        coral: "#FF6363",
        "coral-dark": "#8F4242"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
