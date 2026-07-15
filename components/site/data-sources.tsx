"use client";

import { useLanguage } from "@/lib/i18n";
import { DATA_SOURCES } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Icon } from "./icon";
import { SampleBadge } from "./sample-notice";

export function DataSources() {
  const { t } = useLanguage();

  return (
    <section id="sources" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("sources.eyebrow")}
            title={t("sources.title")}
            subtitle={t("sources.subtitle")}
          />
          <Reveal delay={0.1}>
            <SampleBadge />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DATA_SOURCES.map((source, i) => (
            <Reveal key={source.key} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-[1.25rem] surface p-7 card-hover hover:border-[hsl(var(--border))]">
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `hsl(${source.hue} 62% 55% / 0.12)`,
                    color: `hsl(${source.hue} 66% 47%)`,
                  }}
                >
                  <Icon name={source.icon} className="h-[22px] w-[22px]" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {source.name}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {t(source.descKey)}
                </p>
                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full w-8 rounded-full transition-all duration-700 ease-out group-hover:w-full"
                    style={{ background: `hsl(${source.hue} 66% 52%)` }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
