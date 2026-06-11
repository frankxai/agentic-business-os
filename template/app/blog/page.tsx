import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "{{BLOG_META_DESCRIPTION}}",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow mb-4">Journal</p>
      <h1 className="font-display max-w-2xl text-4xl font-black uppercase leading-none tracking-tighter text-chalk md:text-6xl">
        Notes from the bench.
      </h1>
      <div className="mt-16 max-w-2xl space-y-10">
        {posts.map((post) => (
          <article key={post.slug}>
            <p className="font-mono text-xs text-chalk-faint">{post.date}</p>
            <h2 className="mt-1 font-display text-xl font-bold text-chalk">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-heat-hover"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-chalk-muted">{post.description}</p>
          </article>
        ))}
        {posts.length === 0 ? (
          <p className="text-chalk-subtle">First entries coming soon.</p>
        ) : null}
      </div>
    </section>
  );
}
