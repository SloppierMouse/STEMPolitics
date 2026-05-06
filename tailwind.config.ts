import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "slate-dark": "#1E2D3D",
        "page-bg": "#F8F9FA",
        teal: "#0D9E8A",
        "teal-light": "#E8F4F1",
        muted: "#5A6E7F",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      lineHeight: {
        body: "1.7",
      },
    },
  },
  plugins: [],
};

export default config;
