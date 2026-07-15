"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES, TOTAL_QUESTIONS, type Category } from "@/lib/data";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SampleBadge, SampleNotice } from "./sample-notice";
import { QuestionAccordion } from "./question-accordion";

function StatBlock({
  value,
  label,
  hue,
}: {
  value: string;
  label: string;
  hue: number;
}) {
  return (
    <div className="rounded-[1.25rem] surface p-6">
      <div
        className="font-serif text-4xl font-semibold tabular-nums"
        style={{ color: `hsl(${hue} 62% 46%)` }}
      >
        {value}
      </div>
      <div className="mt-1.5 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function CategoryView({ category }: { category: Category }) {
  const { t, locale } = useLanguage();
  const ease = [0.22, 1, 0.36, 1] as const;

  const others = CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Header */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
              style={{ background: `hsl(${category.hue} 65% 45% / 0.28)` }}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" />

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <Link
                href="/#map"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("category.back")}
              </Link>
            </motion.div>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease, delay: 0.05 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background: `hsl(${category.hue} 65% 55% / 0.14)`,
                    color: `hsl(${category.hue} 78% 66%)`,
                  }}
                >
                  <Icon name={category.icon} className="h-7 w-7" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.1 }}
                  className="mt-6 text-balance text-4xl font-semibold tracking-tight text-gradient sm:text-5xl md:text-6xl"
                >
                  {category.name[locale]}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.18 }}
                  className="mt-3 font-serif text-lg italic text-clay/90 sm:text-xl"
                >
                  {category.tagline[locale]}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.24 }}
              >
                <SampleBadge />
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.28 }}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              <StatBlock
                value={category.count.toLocaleString()}
                label={t("category.count")}
                hue={category.hue}
              />
              <StatBlock
                value={`${category.share}%`}
                label={t("category.share")}
                hue={category.hue}
              />
              <StatBlock
                value={`${TOTAL_QUESTIONS.toLocaleString()}`}
                label={t("hero.stat.questions")}
                hue={category.hue}
              />
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-8">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl rounded-[1.25rem] surface p-8 sm:p-10">
                <div className="mb-3 flex items-center gap-2.5 text-sm font-medium text-clay">
                  <span className="h-px w-6 bg-clay/50" />
                  {t("category.intro")}
                </div>
                <p className="text-pretty text-lg leading-relaxed text-foreground/90">
                  {category.intro[locale]}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Representative questions */}
        <section className="py-16 sm:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {t("category.questions.title")}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {t("category.questions.subtitle")}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <QuestionAccordion category={category} />
              </Reveal>

              <Reveal delay={0.05}>
                <SampleNotice className="mt-8" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Explore more */}
        <section className="border-t border-border py-16 sm:py-20">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t("category.explore.more")}
              </h2>
              <Link
                href="/#map"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("cards.eyebrow")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {others.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] surface p-7 card-hover hover:border-[hsl(var(--clay)/0.28)]"
                  >
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `hsl(${c.hue} 62% 55% / 0.12)`,
                        color: `hsl(${c.hue} 66% 47%)`,
                      }}
                    >
                      <Icon name={c.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">
                      {c.name[locale]}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {c.tagline[locale]}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-foreground">
                      {t("cards.enter")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
