/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Roboto", "Arial", "Helvetica", "sans-serif"],
      },
      keyframes: {
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }, // float height
        },
        shimmer: {
          "100%": { left: "100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
      },
      animation: {
        bounceY: "bounceY 3s ease-in-out infinite",
        "bounce-slow": "bounceY 6s ease-in-out infinite",
        shimmer: "shimmer 3s infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-animate"),
  ],
};
