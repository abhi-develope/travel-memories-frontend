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
        "glow-rose": "0 0 20px rgba(225, 99, 122, 0.4), 0 0 40px rgba(225, 99, 122, 0.2)",
        "glow-mustard": "0 0 20px rgba(227, 162, 60, 0.4), 0 0 40px rgba(227, 162, 60, 0.2)",
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
        bob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-1": {
          "0%": { transform: "translate(0, 0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.2" },
          "90%": { opacity: "0.2" },
          "100%": { transform: "translate(100px, -100vh) rotate(360deg)", opacity: "0" },
        },
        "float-2": {
          "0%": { transform: "translate(0, 0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.15" },
          "90%": { opacity: "0.15" },
          "100%": { transform: "translate(-80px, -100vh) rotate(-360deg)", opacity: "0" },
        },
        "float-3": {
          "0%": { transform: "translate(0, 0) rotate(0deg) scale(0.8)", opacity: "0" },
          "10%": { opacity: "0.25" },
          "90%": { opacity: "0.25" },
          "100%": { transform: "translate(60px, -100vh) rotate(180deg) scale(1.2)", opacity: "0" },
        },
        sparkle: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(1) rotate(180deg)", opacity: "0.8" },
          "100%": { transform: "scale(0) rotate(360deg)", opacity: "0" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.15)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "rainbow-border": {
          "0%": { borderColor: "#E1637A" },
          "25%": { borderColor: "#E3A23C" },
          "50%": { borderColor: "#6FA6B8" },
          "75%": { borderColor: "#22443F" },
          "100%": { borderColor: "#E1637A" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(225, 99, 122, 0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(225, 99, 122, 0.6), 0 0 48px rgba(225, 99, 122, 0.3)" },
        },
        "tape-swing": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.3) rotate(-8deg)", opacity: "0" },
          "60%": { transform: "scale(1.08) rotate(1deg)" },
          "80%": { transform: "scale(0.97) rotate(-0.5deg)" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "heart-fall": {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        "curtain-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "curtain-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "emoji-bounce": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-12px) scale(1.1)" },
        },
        "compass-spin": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(90deg)" },
          "50%": { transform: "rotate(180deg)" },
          "75%": { transform: "rotate(270deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fly-across": "fly-across 14s linear infinite",
        wobble: "wobble 1.4s ease-in-out infinite",
        bob: "bob 3.5s ease-in-out infinite",
        "float-1": "float-1 18s ease-in-out infinite",
        "float-2": "float-2 22s ease-in-out infinite",
        "float-3": "float-3 26s ease-in-out infinite",
        sparkle: "sparkle 0.7s ease-out forwards",
        heartbeat: "heartbeat 1.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
        "spin-slow": "spin-slow 8s linear infinite",
        "rainbow-border": "rainbow-border 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "tape-swing": "tape-swing 4s ease-in-out infinite",
        "pop-in": "pop-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
        "heart-fall": "heart-fall 4s ease-in forwards",
        "curtain-left": "curtain-left 1.2s ease-in-out forwards",
        "curtain-right": "curtain-right 1.2s ease-in-out forwards",
        "emoji-bounce": "emoji-bounce 2s ease-in-out infinite",
        "compass-spin": "compass-spin 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
