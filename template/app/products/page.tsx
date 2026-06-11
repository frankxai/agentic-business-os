import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Product",
  description: "{{PRODUCT_META_DESCRIPTION}}",
};

/** Template: rewrite specs + copy during /os-spawn. Structure stays. */
const features = [
  { name: "{{FEATURE_1}}", spec: "{{SPEC_1}}", job: "{{JOB_1}}" },
  { name: "{{FEATURE_2}}", spec: "{{SPEC_2}}", job: "{{JOB_2}}" },
  { name: "{{FEATURE_3}}", spec: "{{SPEC_3}}", job: "{{JOB_3}}" },
];

export default function ProductsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-4">The Product</p>
        <h1 className="font-display max-w-2xl text-4xl font-black uppercase leading-none tracking-tighter text-chalk md:text-6xl">
          {"{{PRODUCT_PAGE_HEADLINE}}"}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-chalk-muted">
          {"{{PRODUCT_PAGE_DECK — what it is and, just as plainly, what it is not.}}"}
        </p>
        <div className="data-callout mt-10 inline-block">
          {"{{PRODUCT_SPECS_LINE — sizes, materials, care. Metric.}}"}
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Construction" headline="What each part does" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="rounded-lg bg-charcoal p-6">
              <p className="font-mono text-xs text-chalk-faint">0{i + 1}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-chalk">{f.name}</h3>
              <p className="mt-1 font-mono text-xs text-steam">{f.spec}</p>
              <p className="mt-3 text-sm text-chalk-muted">{f.job}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Launch"
          headline={"{{LAUNCH_HEADLINE}}"}
          deck={"{{LAUNCH_DECK — honest status + what joining the list gets them. One email at launch; say so.}}"}
        />
        <form className="flex max-w-md gap-3" action="/api/notify" method="post">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md bg-charcoal px-4 py-3 text-chalk ring-1 ring-chalk/10 placeholder:text-chalk-faint focus:outline-none focus:ring-heat/60"
          />
          <button
            type="submit"
            className="shrink-0 rounded-sm bg-heat px-6 py-3 text-sm font-semibold text-concrete transition-colors hover:bg-heat-hover"
          >
            Notify Me
          </button>
        </form>
        <p className="mt-3 text-xs text-chalk-faint">One email at launch. That's the whole list.</p>
      </Section>
    </>
  );
}
