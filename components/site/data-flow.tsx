"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { SampleBadge } from "./sample-notice";

const STEPS = [
  { key: "flow.step1", n: "01" },
  { key: "flow.step2", n: "02" },
  { key: "flow.step3", n: "03" },
  { key: "flow.step4", n: "04" },
  { key: "flow.step5", n: "05" },
];

export function DataFlow() {
  const { t } = useLanguage();

  return (
    <section className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("flow.eyebrow")}
            title={t("flow.title")}
            subtitle={t("flow.subtitle")}
          />
          <Reveal delay={0.1}>
            <SampleBadge />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.08}>
              <div className="group relative h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 card-hover hover:border-clay/30">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-medium text-clay">
                      {step.n}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-clay/40 transition-colors group-hover:bg-clay" />
                  </div>
                  <h3 className="mt-8 text-base font-semibold leading-tight">
                    {t(step.key)}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {t(`${step.key}.desc`)}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <motion.span
                    aria-hidden
                    className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center text-muted-foreground/50 md:flex"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
