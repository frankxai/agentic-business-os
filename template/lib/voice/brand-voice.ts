/**
 * {{BRAND}} brand voice — single source of truth.
 *
 * DERIVED BY /os-spawn — every agent, command, and gate reads from this file.
 * Never duplicate these lists elsewhere; import them.
 * (Pattern lineage: frankx.ai lib/voice/frankx-voice.ts)
 */

/** Phrases banned in all published copy, all languages, all surfaces. */
export const BANNED_PHRASES: string[] = [
  // Universal AI-slop signatures — keep these in every derivation
  "delve",
  "dive into",
  "deep dive",
  "it's worth noting",
  "certainly",
  "absolutely",
  "in conclusion",
  "unlock",
  "unleash",
  "elevate your",
  "game-changer",
  "in today's fast-paced world",
  "look no further",
  // {{BRAND}}-specific register violations — derive from the interview
  // (e.g. bro-science terms for fitness, corporate jargon for B2B,
  //  fear-marketing verbs for anything health-adjacent)
];

/**
 * Claim patterns BLOCKED outright — regulated territory for this business.
 * A match here is always a FAIL in @claims-guard, never a WARN.
 * Case-insensitive regex source strings.
 *
 * DERIVE CAREFULLY during /os-spawn question 3. Examples by category:
 *  - Health-adjacent:  "protects? (your )?(health|fertility|immune)" , "clinically proven"
 *  - Environmental:    "climate[- ]neutral", "100% sustainable", "eco[- ]friendly"
 *  - Financial:        "guaranteed returns?", "risk[- ]free"
 */
export const BLOCKED_CLAIM_PATTERNS: string[] = [
  "clinically proven",
  "doctor[- ]recommended",
  "guarantee[ds]? .*(results|outcomes?)",
];

/**
 * The approved claim vocabulary — factual statements use this framing
 * AND carry a citation in the same section.
 */
export const APPROVED_FRAMING: string[] = [
  "designed around the research on",
  "studies have observed",
  "research has associated",
  "built to",
  "engineered to",
];

/** Brand vocabulary — how we talk about the product. Derive in /os-spawn. */
export const BRAND_TERMS = {
  product: "{{PRODUCT_CATEGORY}}",
  category: "{{CATEGORY}}",
  forbidden: [] as string[], // product descriptions we never use
} as const;

/** Markets and locale conventions. Derive in /os-spawn. */
export const MARKETS = ["{{MARKETS}}"] as const;
export const UNITS = "metric" as const;
