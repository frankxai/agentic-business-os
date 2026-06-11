import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <p className="font-mono text-xs text-chalk-faint">{post.date}</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-chalk md:text-4xl">
        {post.title}
      </h1>
      <div className="prose-brand mt-10 space-y-5 text-base leading-relaxed text-chalk-muted [&_a]:text-heat-hover [&_a]:underline [&_code]:font-mono [&_code]:text-sm [&_code]:text-steam [&_h2]:font-display [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-chalk [&_h3]:font-display [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-chalk [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-chalk">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
