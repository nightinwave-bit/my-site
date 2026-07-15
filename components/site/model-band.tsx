"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const STEPS = [
  { key: "model.step1", n: "01", tag: "type.question" },
  { key: "model.step2", n: "02", tag: "type.concept" },
  { key: "model.step3", n: "03", tag: "type.narrative" },
];

export function ModelBand() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border bg-tint">
      <div className="container py-20 sm:py-28">
        <SectionHeading
          eyebrow={t("model.eyebrow")}
          title={t("model.title")}
          subtitle={t("model.subtitle")}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.1}>
              <div className="relative flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tabular-nums text-brand">
                    {step.n}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {t(step.tag)}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-navy">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                  {t(`${step.key}.body`)}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden justify-center py-1 md:flex" aria-hidden>
                  <ArrowRight className="hidden h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
