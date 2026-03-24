import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface colors
        surface: {
          DEFAULT: "#081325",
          dim: "#081325",
          low: "#111c2e",
          container: "#152032",
          high: "#202a3d",
          highest: "#2b3548",
          lowest: "#040e20",
          bright: "#2f394d",
        },
        // Primary
        primary: {
          DEFAULT: "#2563eb",
          light: "#b4c5ff",
          container: "#2563eb",
          foreground: "#ffffff",
        },
        // Secondary
        secondary: {
          DEFAULT: "#03b5d3",
          container: "#03b5d3",
          foreground: "#ffffff",
        },
        // Tertiary
        tertiary: {
          DEFAULT: "#8343f4",
          light: "#d2bbff",
        },
        // Text
        "on-surface": {
          DEFAULT: "#d8e3fc",
          variant: "#c3c6d7",
        },
        // Outline
        outline: {
          DEFAULT: "#8d90a0",
          variant: "#434655",
        },
        // Error
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a",
        },
        // Semantic
        background: "#081325",
        foreground: "#d8e3fc",
        border: "rgba(67, 70, 85, 0.15)",
        input: "#040e20",
        ring: "#2563eb",
        muted: {
          DEFAULT: "#202a3d",
          foreground: "#c3c6d7",
        },
        accent: {
          DEFAULT: "#202a3d",
          foreground: "#d8e3fc",
        },
        destructive: {
          DEFAULT: "#93000a",
          foreground: "#ffdad6",
        },
        card: {
          DEFAULT: "rgba(32, 42, 61, 0.6)",
          foreground: "#d8e3fc",
        },
        popover: {
          DEFAULT: "#152032",
          foreground: "#d8e3fc",
        },
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
