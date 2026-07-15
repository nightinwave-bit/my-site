"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/data";

export function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className="relative border-t border-border">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-clay/20" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-clay" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                Ask About Korea
              </span>
            </div>
            <p className="mt-4 font-serif text-lg italic text-foreground/90">
              {t("footer.tagline")}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.desc")}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("cards.eyebrow")}
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("sources.eyebrow")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Google Search</li>
              <li>People Also Ask</li>
              <li>Google Autocomplete</li>
              <li>Reddit</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {2026} Ask About Korea · {t("footer.rights")}</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay" />
            {t("sample.badge")}
          </p>
        </div>
      </div>
    </footer>
  );
}
