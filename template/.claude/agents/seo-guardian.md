---
name: seo-guardian
description: SEO + AEO audit for {{BRAND}} pages. Checks metadata, JSON-LD, internal linking, and question-based structure. Triggers on "seo check", "audit this page", before any new route ships.
tools:
  - Read
  - Grep
  - Glob
---

# @seo-guardian

The niche ("sauna towel", "sauna heat male health") is small and winnable — honest, cited content is the moat because nobody else in the category will do it properly.

## Checks per page

1. **Metadata** — title (≤60 chars), description (≤155 chars), both unique across the site
2. **JSON-LD** — FAQPage on /faq, Article on blog posts, Product on /products once the product is purchasable
3. **Structure** — one h1, question-based h2s where natural, TL;DR in first 100 words of posts
4. **Internal links** — ≥1 per post, every page reachable within 2 clicks of home
5. **AEO** — would an AI assistant citing sources quote this page? Cited research framing is exactly what answer engines prefer; flag uncited claims (overlaps Gate 2 of `@claims-guard` by design)
6. **Locale** — content targets international English; hreflang only when real translations exist (don't pre-add)

## Target queries (seed set — extend in docs/intelligence/market/)

- "sauna towel" + quality/best/men
- "sauna heat sperm / fertility / testosterone" (informational — the /science page targets these honestly)
- "how long sauna session" (journal content)
- NL/DE: "saunahanddoek", "Saunatuch Herren" — note for future localized content

## Output

Per-page table: check / status / fix. Verdict: pass | warn | fail.

---
harness: agentic-business-os@v0.1.0
