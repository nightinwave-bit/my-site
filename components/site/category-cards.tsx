"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Icon } from "./icon";

export function CategoryCards() {
  const { t, locale } = useLanguage();

  return (
    <section className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow={t("cards.eyebrow")}
          title={t("cards.title")}
          subtitle={t("cards.subtitle")}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/category/${cat.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] surface p-7 card-hover hover:border-[hsl(var(--clay)/0.28)]"
              >
                {/* portal accent bar — grows on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(90deg, hsl(${cat.hue} 70% 58%), hsl(${cat.hue} 70% 58% / 0))`,
                  }}
                />

                <div className="flex items-center justify-between">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `hsl(${cat.hue} 62% 55% / 0.12)`,
                      color: `hsl(${cat.hue} 68% 46%)`,
                    }}
                  >
                    <Icon name={cat.icon} className="h-[22px] w-[22px]" />
                  </div>
                  <span className="text-right">
                    <span className="block font-serif text-[1.75rem] font-semibold tabular-nums leading-none text-foreground">
                      {cat.count.toLocaleString()}
                    </span>
                    <span className="mt-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                      {t("cards.count")}
                    </span>
                  </span>
                </div>

                <h3 className="mt-7 text-[1.6rem] font-semibold leading-tight tracking-tight text-foreground">
                  {cat.name[locale]}
                </h3>
                <p
                  className="mt-1.5 text-[15px] font-medium"
                  style={{ color: `hsl(${cat.hue} 55% 42%)` }}
                >
                  {cat.tagline[locale]}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {cat.questions.slice(0, 2).map((q) => (
                    <li
                      key={q.id}
                      className="flex items-start gap-2.5 text-[15px] leading-snug text-muted-foreground"
                    >
                      <span
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                        style={{ background: `hsl(${cat.hue} 60% 55%)` }}
                      />
                      <span className="line-clamp-1">{q.question[locale]}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center gap-1.5 border-t border-border/70 pt-5 text-[15px] font-medium text-foreground">
                  {t("cards.enter")}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
