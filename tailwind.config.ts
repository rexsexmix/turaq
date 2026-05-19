import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        "brand-deep": "var(--brand-deep)",
        gold: "var(--gold)",
        warning: "var(--warning)",
        error: "var(--error)",
        surface: "var(--surface)",
        "surface-secondary": "var(--surface-secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        border: "var(--border)",
      },
      borderRadius: {
        button: "12px",
        card: "16px",
        large: "24px",
        pill: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
