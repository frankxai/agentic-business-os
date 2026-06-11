import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";

/**
 * HOME — template page. Structure is the product; copy is placeholder.
 * /os-spawn rewrites every string in the derived brand voice, then gates
 * the result through @claims-guard.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero — one statement, one CTA, one data callout */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-36">
        <p className="eyebrow mb-4">{"{{CATEGORY_EYEBROW}}"}</p>
        <h1 className="font-display max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tighter text-chalk md:text-7xl">
          {"{{HEADLINE_LINE_1}}"}
          <br />
          <span className="text-heat">{"{{HEADLINE_LINE_2}}"}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-chalk-muted">
          {"{{HERO_DECK — the customer's situation in second person, then the product in one sentence. No superlatives.}}"}
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/products"
            className="rounded-sm bg-heat px-7 py-3.5 text-sm font-semibold text-concrete shadow-[0_0_40px_rgba(255,77,46,0.2)] transition-colors hover:bg-heat-hover"
          >
            {"{{PRIMARY_CTA}}"}
          </Link>
          <Link
            href="/science"
            className="rounded-sm px-4 py-3.5 text-sm font-semibold text-chalk-muted transition-colors hover:text-chalk"
          >
            {"{{SECONDARY_CTA}}"}
          </Link>
        </div>
        <div className="data-callout mt-16 inline-block">
          {"{{ONE_REAL_NUMBER — spec, temperature, measurement. Mono carries proof.}}"}
        </div>
      </section>

      {/* The problem — three honest facts */}
      <Section>
        <SectionHeader
          eyebrow="The Problem"
          headline={"{{PROBLEM_HEADLINE}}"}
          deck={"{{PROBLEM_DECK — the gap your product fills, framed with evidence, not fear.}}"}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {["{{FACT_1}}", "{{FACT_2}}", "{{FACT_3}}"].map((fact, i) => (
            <div key={i} className="rounded-lg bg-charcoal p-6">
              <p className="font-mono text-2xl text-steam">{`{{STAT_${i + 1}}}`}</p>
              <p className="mt-2 text-sm text-chalk-muted">{fact}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product teaser */}
      <Section>
        <SectionHeader
          eyebrow="The Product"
          headline={"{{PRODUCT_HEADLINE — focus statement, e.g. 'One product. Total focus.'}}"}
          deck={"{{PRODUCT_DECK}}"}
        />
        <Link
          href="/products"
          className="inline-block rounded-sm bg-steel px-7 py-3.5 text-sm font-semibold text-chalk transition-colors hover:bg-seam"
        >
          Product Details
        </Link>
      </Section>

      {/* Evidence teaser — the credibility engine */}
      <Section>
        <SectionHeader
          eyebrow="The Evidence"
          headline="We show our work."
          deck={"{{EVIDENCE_DECK — your citation standard, stated as a promise. This section is the trust moat; keep it.}}"}
        />
        <Link
          href="/science"
          className="inline-block rounded-sm bg-steel px-7 py-3.5 text-sm font-semibold text-chalk transition-colors hover:bg-seam"
        >
          The Evidence Library
        </Link>
      </Section>
    </>
  );
}
