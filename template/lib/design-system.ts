/**
 * {{BRAND}} design system — programmatic access to the tokens defined in
 * tailwind.config.ts and documented in design.md.
 *
 * The shipped token set is the STARTER THEME (dark concrete + heat accent) —
 * a worked example, not a default to keep. /os-spawn re-derives it together
 * with design.md and tailwind.config.ts.
 */

export const colors = {
  concrete: "#0E0F10",
  charcoal: "#17181A",
  steel: "#212326",
  seam: "#2D3034",
  chalk: "#F4F2ED",
  chalkMuted: "#B9B7B1",
  chalkSubtle: "#84827D",
  chalkFaint: "#56554F",
  heat: "#FF4D2E",
  heatHover: "#FF6A4D",
  heatPressed: "#E03A1D",
  steam: "#9FB3BF",
  steamDeep: "#71868F",
  birch: "#D8C9A3",
} as const;

export const site = {
  name: "{{BRAND}}",
  tagline: "{{TAGLINE}}",
  description:
    "{{DESCRIPTION}} — one honest sentence, no superlatives. Derived by /os-spawn.",
  url: "https://example.com",
  locale: "en",
  markets: ["{{MARKETS}}"],
} as const;

export const nav = [
  { href: "/products", label: "Product" },
  { href: "/science", label: "Evidence" },
  { href: "/story", label: "Story" },
  { href: "/blog", label: "Journal" },
  { href: "/faq", label: "FAQ" },
] as const;
