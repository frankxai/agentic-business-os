import Link from "next/link";
import { nav, site } from "@/lib/design-system";

export default function Footer() {
  return (
    <footer className="border-t border-chalk/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <p className="font-display text-base font-black uppercase text-chalk">
              {site.name}
            </p>
            <p className="mt-2 max-w-xs text-sm text-chalk-subtle">{site.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-chalk-subtle transition-colors hover:text-chalk"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-chalk/10 pt-6 text-xs text-chalk-faint">
          © {new Date().getFullYear()} {site.name}.{" "}
          {"{{FOOTER_DISCLAIMER — for regulated-adjacent categories, state the boundary here: e.g. 'products are textiles, not medical devices; content summarizes published research and is not advice.'}}"}
        </p>
      </div>
    </footer>
  );
}
