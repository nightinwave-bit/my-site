"use client";

import { TextCursorInput } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { SampleNotice } from "./sample-notice";

const STEPS = [
  { key: "method.step.collect", n: "01" },
  { key: "method.step.map", n: "02" },
  { key: "method.step.pathway", n: "03" },
];

const SOURCES = [
  { name: "Google Autocomplete", icon: TextCursorInput, descKey: "method.autocomplete.desc" },
];

export function MethodSection() {
  const { t } = useLanguage();

  return (
    <section id="method" className="scroll-mt-20 border-b border-border bg-tint">
      <div className="container py-20 sm:py-28">
        <SectionHeading
          eyebrow={t("method.eyebrow")}
          title={t("method.title")}
          subtitle={t("method.subtitle")}
        />

        {/* pipeline steps */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.08}>
              <div className="flex h-full items-start gap-4 rounded-xl border border-border bg-white p-6 shadow-card">
                <span className="text-lg font-semibold tabular-nums text-brand">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy">
                    {t(step.key)}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                    {t(`${step.key}.desc`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* sources */}
        <Reveal delay={0.1}>
          <h3 className="mb-5 mt-14 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t("method.sources.title")}
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:max-w-md">
          {SOURCES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.name} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-border bg-white p-6 shadow-card card-hover">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/8 text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold text-navy">
                    {s.name}
                  </h4>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">
                    {t(s.descKey)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <SampleNotice className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
