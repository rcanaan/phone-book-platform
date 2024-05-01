/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    clipPath: {
      packman_mouth: "polygon(100% 74%, 44% 48%, 100% 21%)",
    },
    extend: {},
  },
  plugins: [require("tailwind-clip-path")],
};
