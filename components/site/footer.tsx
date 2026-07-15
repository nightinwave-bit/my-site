"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { PATHWAYS, getNode } from "@/lib/ontology";

export function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className="bg-navy text-white/70">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/20">
                <span className="h-2 w-2 rounded-full bg-brand-hi" />
              </span>
              <span className="text-[15px] font-semibold text-white">
                Ask About Korea
              </span>
            </div>
            <p className="mt-4 text-lg font-medium text-white">
              {t("footer.tagline")}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
              {t("footer.desc")}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {t("nav.pathways")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {PATHWAYS.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/pathway/${p.id}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {getNode(p.steps[0].nodeId).label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {t("method.sources.title")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>Google Search</li>
              <li>People Also Ask</li>
              <li>Google Autocomplete</li>
              <li>Reddit</li>
            </ul>
            <Link
              href="/explore"
              className="mt-5 inline-block text-sm font-medium text-brand-hi transition-colors hover:text-white"
            >
              {t("nav.explore")} →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© 2026 Ask About Korea · {t("footer.rights")}</p>
          <p className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-hi" />
            {t("sample.badge")}
          </p>
        </div>
      </div>
    </footer>
  );
}
