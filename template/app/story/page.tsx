import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Story",
  description: "{{STORY_META — why this business exists, in one sentence.}}",
};

export default function StoryPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-4">Story</p>
        <h1 className="font-display max-w-2xl text-4xl font-black uppercase leading-none tracking-tighter text-chalk md:text-6xl">
          {"{{STORY_HEADLINE}}"}
        </h1>
      </section>

      <Section>
        <div className="max-w-2xl space-y-6 text-base leading-relaxed text-chalk-muted">
          <p>{"{{STORY_PARA_1 — the question or itch that started it. Specific scene, not mission statement.}}"}</p>
          <p>{"{{STORY_PARA_2 — the gap you found. Why existing options fail, said factually.}}"}</p>
          <p>{"{{STORY_PARA_3 — what you built and the standard you hold it to. End grounded, not grandiose.}}"}</p>
        </div>
      </Section>
    </>
  );
}
