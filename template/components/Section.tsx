/** The signature section opener: stencil eyebrow + Archivo headline + deck. */
export function SectionHeader({
  eyebrow,
  headline,
  deck,
}: {
  eyebrow: string;
  headline: string;
  deck?: string;
}) {
  return (
    <div className="mb-12">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-chalk md:text-4xl">
        {headline}
      </h2>
      {deck ? (
        <p className="mt-3 max-w-xl text-base text-chalk-muted">{deck}</p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-seam py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
