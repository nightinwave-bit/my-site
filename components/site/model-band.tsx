"use client";

import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "model.step1", n: "01", tag: "type.question", human: "layer.question" },
  { key: "model.step2", n: "02", tag: "type.concept", human: "layer.concept" },
  { key: "model.step3", n: "03", tag: "type.theme", human: "layer.theme" },
  { key: "model.step4", n: "04", tag: "type.narrative", human: "layer.narrative" },
  { key: "model.step5", n: "05", tag: "type.perception", human: "layer.perception" },
];

export function ModelBand() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border">
      <div className="container py-20 sm:py-28">
        <SectionHeading
          eyebrow={t("model.eyebrow")}
          title={t("model.title")}
          subtitle={t("model.subtitle")}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-xl border bg-white p-5 shadow-card",
                  i === STEPS.length - 1
                    ? "border-brand/40"
                    : "border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tabular-nums text-brand">
                    {step.n}
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                      i === STEPS.length - 1
                        ? "bg-navy text-white"
                        : "bg-secondary text-navy"
                    )}
                  >
                    {t(step.tag)}
                  </span>
                </div>
                <div className="mt-5 text-[13px] font-semibold leading-snug text-brand">
                  {t(step.human)}
                </div>
                <h3 className="mt-1.5 text-base font-semibold leading-snug text-navy">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                  {t(`${step.key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
