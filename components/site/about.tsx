"use client";

import { MessageCircleQuestion, Sparkles, Database } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./reveal";

const POINTS = [
  { icon: MessageCircleQuestion, key: "about.point1" },
  { icon: Sparkles, key: "about.point2" },
  { icon: Database, key: "about.point3" },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2.5 text-sm font-medium text-clay">
              <span className="h-px w-6 bg-clay/50" />
              {t("about.eyebrow")}
              <span className="h-px w-6 bg-clay/50" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl md:leading-[1.15]">
              {t("about.title")
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 max-w-2xl space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          <Reveal delay={0.05}>
            <p>{t("about.p1")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{t("about.p2")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-foreground">
              <span className="font-medium">{t("about.p3")}</span>
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.key} delay={0.1 + i * 0.08}>
                <div className="group h-full rounded-[1.25rem] surface p-7 card-hover hover:border-[hsl(var(--clay)/0.28)]">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/10 text-clay transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-[22px] w-[22px]" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {t(`${point.key}.title`)}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {t(`${point.key}.body`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
