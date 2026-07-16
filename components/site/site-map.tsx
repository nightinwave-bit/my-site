"use client";

import Link from "next/link";
import { Route, LayoutGrid, Network, FlaskConical, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

// A visible exploration structure so a first-time visitor understands where
// they are and what exists here — reducing reliance on next-pathway stepping.
const AREAS = [
  { key: "paths", href: "/#pathways", icon: Route },
  { key: "topics", href: "/topics", icon: LayoutGrid },
  { key: "explore", href: "/explore", icon: Network },
  { key: "research", href: "/research", icon: FlaskConical },
] as const;

export function SiteMap() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border bg-tint">
      <div className="container py-20 sm:py-24">
        <SectionHeading eyebrow={t("sitemap.eyebrow")} title={t("sitemap.title")} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.key} delay={(i % 4) * 0.05} className="h-full">
                <Link
                  href={a.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card card-hover"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-tint text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy">
                    {t(`sitemap.${a.key}.title`)}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-secondary">
                    {t(`sitemap.${a.key}.body`)}
                  </p>
                  <ArrowRight className="mt-4 h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
