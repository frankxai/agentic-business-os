import Link from "next/link";
import { nav, site } from "@/lib/design-system";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-chalk/10 bg-concrete/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-black uppercase tracking-tight text-chalk"
        >
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden text-sm font-semibold text-chalk-muted transition-colors hover:text-chalk sm:block"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/products"
            className="rounded-sm bg-heat px-5 py-2.5 text-sm font-semibold text-concrete transition-colors hover:bg-heat-hover"
          >
            Get Notified
          </Link>
        </nav>
      </div>
    </header>
  );
}
