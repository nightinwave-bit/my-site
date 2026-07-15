"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Icon } from "./icon";

export function CategoryCards() {
  const { t, locale } = useLanguage();

  return (
    <section className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow={t("cards.eyebrow")}
          title={t("cards.title")}
          subtitle={t("cards.subtitle")}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/category/${cat.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 card-hover hover:border-foreground/20"
              >
                {/* accent wash */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                  style={{ background: `hsl(${cat.hue} 70% 55% / 0.25)` }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{
                      background: `hsl(${cat.hue} 65% 55% / 0.12)`,
                      color: `hsl(${cat.hue} 75% 64%)`,
                    }}
                  >
                    <Icon name={cat.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-right">
                    <span className="block font-serif text-2xl font-semibold tabular-nums leading-none">
                      {cat.count.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {t("cards.count")}
                    </span>
                  </span>
                </div>

                <h3 className="relative mt-5 text-xl font-semibold tracking-tight">
                  {cat.name[locale]}
                </h3>
                <p className="relative mt-1 text-sm text-clay/90">
                  {cat.tagline[locale]}
                </p>

                <ul className="relative mt-5 space-y-2 border-t border-border/60 pt-4">
                  {cat.questions.slice(0, 2).map((q) => (
                    <li
                      key={q.id}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: `hsl(${cat.hue} 75% 60%)` }}
                      />
                      <span className="line-clamp-1">
                        {q.question[locale]}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 flex items-center gap-1.5 text-sm font-medium text-foreground">
                  {t("cards.enter")}
                  <motion.span className="inline-flex transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
