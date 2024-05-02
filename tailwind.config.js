/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    clipPath: {
      packman_mouth: "polygon(100% 74%, 44% 48%, 100% 21%)",
    },
    extend: {
      keyframes: {
        packman_eat: {
          "0%": { clipPath: "polygon(100% 74%, 44% 48%, 100% 21%)" },
          "25%": { clipPath: "polygon(100% 60%, 44% 48%, 100% 40%)" },
          "50%": { clipPath: "polygon(100% 50%, 44% 48%, 100% 50%)" },
          "75%": { clipPath: "polygon(100% 59%, 44% 48%, 100% 35%)" },
          "100%": { clipPath: "polygon(100% 74%, 44% 48%, 100% 21%)" },
        },
        moveCompleteCycle: {
          "0%": { transform: "translateX(-100%) translateY(0) rotate(0deg)" },
          "25%": { transform: "translateX(180%) translateY(0) rotate(0deg)" }, // Pacman moves to the right off-screen
          "50%": {
            transform: "translateX(180%) translateY(100%) rotate(90deg)",
          }, // Pacman moves straight down
          "75%": {
            transform: "translateX(-50%) translateY(100%) rotate(180deg)",
          }, // Pacman moves left at the bottom
          "100%": {
            transform: "translateX(-50%) translateY(0) rotate(270deg)",
          }, // Pacman moves up back to start
        },
      },
      animation: {
        eat: "packman_eat 1s infinite",
        moveComplete: "moveCompleteCycle  10s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-clip-path")],
};
