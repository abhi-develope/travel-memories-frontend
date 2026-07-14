import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF4E6",
        "paper-dark": "#F2E6D0",
        ink: "#22443F",
        "ink-soft": "#3C6660",
        mustard: "#E3A23C",
        rose: "#E1637A",
        sky: "#6FA6B8",
        kraft: "#D8C6A3",
        border: "#D8C6A3",
        background: "#FBF4E6",
        foreground: "#22443F",
        card: "#FFFDF8",
        primary: {
          DEFAULT: "#22443F",
          foreground: "#FBF4E6",
        },
        secondary: {
          DEFAULT: "#E1637A",
          foreground: "#FFFDF8",
        },
        muted: {
          DEFAULT: "#F2E6D0",
          foreground: "#6B5D45",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        hand: ["var(--font-caveat)", "cursive"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.9rem",
        md: "0.6rem",
        sm: "0.35rem",
      },
      boxShadow: {
        postcard: "0 10px 30px -12px rgba(34, 68, 63, 0.35)",
        stamp: "0 2px 8px rgba(34, 68, 63, 0.15)",
      },
      keyframes: {
        "fly-across": {
          "0%": { transform: "translateX(-10%) translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateX(50%) translateY(-14px) rotate(2deg)" },
          "100%": { transform: "translateX(110%) translateY(0) rotate(-4deg)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "bob": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fly-across": "fly-across 14s linear infinite",
        wobble: "wobble 1.4s ease-in-out infinite",
        bob: "bob 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
