# Search, answer discovery and measurement

Source review: 2026-09-24. Treat provider features and policies as versioned facts; recheck before implementing or selling a claim. No workflow guarantees rankings, indexing, citations or revenue.

## Technical and editorial foundations

Google's current guidance connects AI-search visibility to its established search fundamentals: accessible/indexable pages, useful original material and a good visitor experience. It does not require special AI markup or an llms.txt file. Build the page around the human question and its evidence. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

For each key page record: audience question, original knowledge/evidence, responsible author/organization, canonical URL, indexing intent, title/description, useful headings, primary action, appropriate structured data, source links and last factual review. Use real project results, original benchmarks, diagrams, explainers and product details where available. Obtain permission for customer evidence.

Verify status codes, redirects, mobile rendering, canonical URLs, internal links, sitemap contents and robots/meta rules. Prevent staging/duplicate/filter pages from overwhelming intended public content. Review redirects and inbound links during migrations. Add locale routing and reciprocal language annotations when relevant. Keep documentation, pricing, policy and product information consistent.

Structured data should describe actual visible content using applicable supported types. Test it with the provider's current tooling; do not invent reviews, ratings, business locations or product availability. [Google structured-data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)

## Search crawling and training are separate decisions

OpenAI documents separate crawler controls for search and model-training crawling. Record the owner's intended policy for each purpose and implement the current documented directives. Also inspect CDN/firewall behavior so it matches the stated policy. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)

Do not globally allow every bot to solve a discoverability issue. Private content requires authentication and authorization. Crawler directives are not a private-data access control.

## Measurement with observable outcomes

Maintain a baseline before changes: indexed intended pages, search impressions/clicks, qualified visitor actions, conversion and performance. Track changes by release date and page group; record confounding changes such as seasonality, offer changes and campaigns.

Bing's AI Performance report provides visibility into citations on its supported AI surfaces. Treat its scope and sparse-data limitations explicitly. It is useful first-party evidence, and does not measure every AI provider. [Bing AI Performance documentation](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)

Use a small versioned set of realistic buyer questions for manual citation observations. Record provider, date, geography/account context, question and the visible cited source. Results can vary. Do not turn one favorable answer into a universal visibility claim. Where permitted APIs/analytics exist, collect observations through the supported interface with a bounded budget.

## Workflow and sellable components

1. Audit a representative page set and record actual defects.
2. Repair crawlability, canonicalization, rendering and broken journeys.
3. Develop original pages addressing real buyer questions and evidence.
4. Review claims, source quality, identity and structured data.
5. Publish through the owning source lane and verify the rendered result.
6. Measure qualified outcomes and diagnose changes before multiplying pages.

Useful products include a technical audit recipe, migration checklist, evidence-backed case-study templates, vertical content models, a metadata/structured-data component library and a measurement dashboard. Sell the work and its demonstrated quality. Avoid automated doorway-page catalogs, fabricated expertise and volume targets that have no buyer value.

The initial kit contains workflow documentation and a page-planning example. Automated crawl checks, Search Console/Bing adapters and citation observation tools remain future implementation work.
