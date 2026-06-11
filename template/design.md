---
version: alpha
name: "{{BRAND}}"
description: >
  STARTER THEME — dark concrete foundation with one heat accent. A worked
  example proving the system, not a default to keep. /os-spawn re-derives
  every token from the brand interview. Tokens here mirror tailwind.config.ts.
colors:
  primary: "#FF4D2E"
  secondary: "#9FB3BF"
  tertiary: "#D8C9A3"
  neutral: "#0E0F10"
  # foundation ladder (4 steps, ~3% luminance apart)
  concrete: "#0E0F10"
  charcoal: "#17181A"
  steel: "#212326"
  seam: "#2D3034"
  # ink (text — body at ~65% strength)
  chalk: "#F4F2ED"
  chalk-muted: "#B9B7B1"
  chalk-subtle: "#84827D"
  chalk-faint: "#56554F"
  # leading accent (ONE per viewport)
  heat: "#FF4D2E"
  heat-hover: "#FF6A4D"
  heat-pressed: "#E03A1D"
  heat-glow: "#2A1410"
  # supporting accent (second content register)
  steam: "#9FB3BF"
  steam-deep: "#71868F"
  steam-glow: "#161B1E"
  # rare material neutral
  birch: "#D8C9A3"
  # semantic
  success: "#3FB950"
  warning: "#D29922"
  error: "#F85149"
  info: "#9FB3BF"
typography:
  display-xl:
    fontFamily: Archivo
    fontSize: 4.5rem
    lineHeight: "0.95"
    letterSpacing: "-0.03em"
    fontWeight: 900
    textTransform: uppercase
  h1:
    fontFamily: Archivo
    fontSize: 2.5rem
    lineHeight: "1.05"
    letterSpacing: "-0.02em"
    fontWeight: 800
  h2:
    fontFamily: Archivo
    fontSize: 1.875rem
    lineHeight: "1.15"
    letterSpacing: "-0.01em"
    fontWeight: 800
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: "1.65"
    fontWeight: 400
  label-eyebrow:
    fontFamily: Inter
    fontSize: 0.6875rem
    lineHeight: "1.4"
    letterSpacing: "0.3em"
    fontWeight: 600
    textTransform: uppercase
  data:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    lineHeight: "1.5"
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
  "4xl": 96px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
---

# {{BRAND}} — Design System

> **For coding agents:** Read this file once at session start before generating any visual code. Pair with `taste.md`. Source-of-truth tokens live in `tailwind.config.ts`.
>
> **Template note:** the shipped tokens are the STARTER THEME. During `/os-spawn`, run the design-contract pack's authoring session: derive the register, rebuild the ladder/accents/type for the actual brand, update this file + `tailwind.config.ts` + `lib/design-system.ts` together.

## The architecture every derivation keeps

1. **A 4-step foundation ladder** — page bg → surface → elevated → strongest seam, ~3% luminance apart. Elevation = ladder steps + low-alpha ink borders, shadows last.
2. **Ink at reduced alpha** — body copy at ~65% of full ink. Full-strength text is for headings.
3. **One leading accent, once per viewport.** A supporting accent for a second content register. Never both in one block.
4. **2–3 typefaces, each with one named job** (display / body / data). Data, numbers, and citations render in mono — showing work is a brand behavior, not a style.
5. **One signature shape decision** — pill CTAs or square plates. Pick in derivation, freeze in `taste.md`.
6. **The stencil eyebrow** — small caps-tracked label above each section h2. The recognizable opener.

## Do's and Don'ts (universal — keep in every derivation)

- ✅ Spacing from the scale only; if you need 20px you actually need 16 or 24
- ✅ WCAG contrast 4.5:1 body / 3:1 UI; touch targets ≥ 44×44px; `prefers-reduced-motion` guards
- ❌ No pure black (`#000`) — the ladder floor is the floor
- ❌ No literal grey borders — ink at 8–15% alpha
- ❌ No emoji in chrome
- ❌ No claim language in UI strings — `@claims-guard` covers copy, this contract covers chrome

## Provenance

Spec shape: Google Labs DESIGN.md (Apache 2.0) · Pattern lineage: frankx.ai design contract · Companion: `taste.md` — read together, always.
