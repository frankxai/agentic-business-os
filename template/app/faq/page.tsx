import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "FAQ",
  description: "{{FAQ_META — honest answers about the product.}}",
};

/**
 * Template FAQs — replace during /os-spawn. Keep the FIRST one's shape for
 * any regulated category: state plainly what the product is NOT.
 */
const faqs = [
  {
    q: "{{BOUNDARY_QUESTION — e.g. 'Is this a medical device?'}}",
    a: "{{BOUNDARY_ANSWER — what the product is, what it is not, where the evidence lives. The honest answer here is the whole brand in miniature.}}",
  },
  {
    q: "{{PROOF_QUESTION — does it actually work?}}",
    a: "{{PROOF_ANSWER — point at published measurements/evidence, not adjectives.}}",
  },
  {
    q: "{{PRACTICAL_QUESTION — care, sizing, compatibility}}",
    a: "{{PRACTICAL_ANSWER}}",
  },
  {
    q: "Where do you ship?",
    a: "{{SHIPPING_ANSWER — launch markets, metric-native.}}",
  },
  {
    q: "When does it ship?",
    a: "{{TIMELINE_ANSWER — honest status; the notify list gets exactly one email.}}",
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-4">FAQ</p>
        <h1 className="font-display max-w-2xl text-4xl font-black uppercase leading-none tracking-tighter text-chalk md:text-6xl">
          Straight answers.
        </h1>
      </section>
      <Section>
        <div className="max-w-2xl space-y-10">
          {faqs.map((f) => (
            <div key={f.q}>
              <h2 className="font-display text-lg font-bold text-chalk">{f.q}</h2>
              <p className="mt-2 text-base leading-relaxed text-chalk-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
