"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MousePointer2, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { TOTAL_QUESTIONS, CATEGORIES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { QuestionGraph } from "./question-graph";

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = React.useState(0);
  const reduce = useReducedMotion();
  React.useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduce]);
  return value;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
        {value}
      </span>
      <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const questions = useCountUp(TOTAL_QUESTIONS);
  const ease = [0.22, 1, 0.36, 1] as const;

  const headlineLines = t("hero.title").split("\n");

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="pointer-events-none absolute inset-0 aurora" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />

      {/* Interactive knowledge graph — ambient on mobile, offset right on
          large screens so it clears the left-aligned headline */}
      <div className="absolute inset-0 opacity-40 sm:opacity-60 lg:left-[36%] lg:opacity-100">
        <QuestionGraph />
      </div>

      {/* Fades so text stays legible over the graph */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background lg:via-background/20" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background via-background/40 to-transparent lg:block" />

      <div className="container relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28">
        <div className="pointer-events-none max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-clay" />
            {t("hero.eyebrow")}
          </motion.div>

          <h1 className="text-balance font-semibold tracking-[-0.03em]">
            {headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden py-[0.06em]">
                <motion.span
                  className="block text-gradient text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5rem]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:mt-10 sm:text-xl md:text-[1.375rem] md:leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.62 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3 sm:mt-12"
          >
            <Link href="#map">
              <Button variant="clay" size="lg">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#about">
              <Button variant="outline" size="lg">
                {t("hero.cta.secondary")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.76 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            <Stat
              value={`${questions.toLocaleString()}+`}
              label={t("hero.stat.questions")}
            />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <Stat
              value={`${CATEGORIES.length}`}
              label={t("hero.stat.categories")}
            />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <Stat value="4" label={t("hero.stat.sources")} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="pointer-events-none absolute bottom-8 right-6 hidden items-center gap-2 text-xs text-muted-foreground lg:flex"
        >
          <MousePointer2 className="h-3.5 w-3.5" />
          {t("hero.hint")}
        </motion.div>
      </div>
    </section>
  );
}
