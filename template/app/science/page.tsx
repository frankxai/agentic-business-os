import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "The Evidence",
  description:
    "{{EVIDENCE_META — what the evidence actually says, summarized honestly and cited properly.}}",
};

/**
 * THE EVIDENCE PAGE — the credibility engine and SEO moat.
 * Keep this page in every derivation, even for unregulated categories:
 * visible sourcing is the differentiator nobody else in the niche will do.
 */
export default function SciencePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-4">The Evidence</p>
        <h1 className="font-display max-w-2xl text-4xl font-black uppercase leading-none tracking-tighter text-chalk md:text-6xl">
          We show our work.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-chalk-muted">
          {"{{EVIDENCE_INTRO — what this page summarizes, the honesty disclaimer ('we are a {{CATEGORY}} company, not your advisor'), the invitation to read the sources.}}"}
        </p>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Editorial Standard"
          headline="How we write about evidence"
          deck={"Three rules govern every factual statement {{BRAND}} publishes, on this site and everywhere else."}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            {
              rule: "Evidence framing only.",
              body: "We say “studies have observed” and “research has associated” — never “proven”, never a promised outcome.",
            },
            {
              rule: "Citation or it doesn't ship.",
              body: "Every factual statement carries its source inline. An automated gate blocks publication of any uncited claim.",
            },
            {
              rule: "Both directions reported.",
              body: "We summarize the full picture — not just the part that sells the product.",
            },
          ].map((r, i) => (
            <div key={i} className="rounded-lg bg-charcoal p-6">
              <p className="font-mono text-xs text-steam">RULE 0{i + 1}</p>
              <p className="mt-3 text-sm text-chalk-muted">
                <span className="font-semibold text-chalk">{r.rule}</span> {r.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Evidence Library"
          headline="The sources, summarized"
          deck="Each entry gets a plain-language summary, the study or source design, the limitations, and a link to the original. Written by humans, gated by the standard above."
        />
        <div className="data-callout">
          Status: evidence library in development — first entries publishing with launch.
        </div>
      </Section>
    </>
  );
}
