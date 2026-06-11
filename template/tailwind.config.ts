import type { Config } from "tailwindcss";

// Source of truth for design tokens. design.md mirrors these values in the
// agent-readable contract — if you change a value here, update design.md too.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // foundation — the concrete ladder
        concrete: "#0E0F10", // page background
        charcoal: "#17181A", // primary elevated surface
        steel: "#212326", // secondary elevated, hover
        seam: "#2D3034", // strongest separation

        // ink
        chalk: "#F4F2ED", // high-emphasis text — chalk, not pure white
        "chalk-muted": "#B9B7B1", // body copy
        "chalk-subtle": "#84827D", // captions
        "chalk-faint": "#56554F", // disabled / meta

        // heat spectrum (primary — sauna, intensity, CTAs)
        heat: "#FF4D2E",
        "heat-hover": "#FF6A4D",
        "heat-pressed": "#E03A1D",
        "heat-glow": "#2A1410",

        // steam spectrum (secondary — recovery, science, calm)
        steam: "#9FB3BF",
        "steam-deep": "#71868F",
        "steam-glow": "#161B1E",

        // birch (warm neutral — wood, craft, materials)
        birch: "#D8C9A3",

        // semantic
        success: "#3FB950",
        warning: "#D29922",
        error: "#F85149",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
