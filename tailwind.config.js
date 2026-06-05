/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ranch: {
          navy: "#071B4D",
          "dark-navy": "#061332",
          blue: "#168EF7",
          violet: "#6C3BFF",
          yellow: "#FFD22E",
          green: "#31C96B",
          coral: "#EF4E73",
          sky: "#F6FAFF",
        },
      },
      fontFamily: {
        sans: ["Nunito", "Poppins", "Inter", "system-ui", "sans-serif"],
        heading: ["Baloo 2", "Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 8px 24px rgba(7, 27, 77, 0.08)",
        soft: "0 18px 60px rgba(7, 27, 77, 0.12)",
        card: "0 16px 45px rgba(7, 27, 77, 0.10)",
        premium: "0 24px 70px rgba(7, 27, 77, 0.16)",
        hero: "0 24px 70px rgba(0, 0, 0, 0.24)",
        lift: "0 18px 35px rgba(29, 155, 240, 0.18)",
      },
      backgroundImage: {
        "ranch-rainbow":
          "linear-gradient(135deg, #1d9bf0 0%, #7c4dff 42%, #ff6b63 100%)",
        "sunny-card":
          "linear-gradient(135deg, rgba(255,201,40,0.95), rgba(67,184,106,0.86))",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
