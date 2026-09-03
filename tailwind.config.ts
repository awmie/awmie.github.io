import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        bone: "var(--bone)",
        muted: "var(--muted)",
        dim: "var(--dim)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
        "accent-4": "var(--accent-4)",
        "accent-5": "var(--accent-5)",
        "accent-soft": "var(--accent-soft)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        sans: ["var(--font-pixel)", "monospace"],
        mono: ["var(--font-pixel)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse_glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-up": "fade-up 0.8s ease-out both",
      },
    },
  },
  plugins: [],
}
export default config
