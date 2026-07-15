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
    <section id="sources" className="relative scroll-mt-24 py-24 sm:py-32">
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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATA_SOURCES.map((source, i) => (
            <Reveal key={source.key} delay={i * 0.08}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 card-hover hover:border-foreground/20"
                style={
                  {
                    "--src-hue": source.hue,
                  } as React.CSSProperties
                }
              >
                {/* accent glow */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `hsl(${source.hue} 80% 55% / 0.35)`,
                  }}
                />
                <div
                  className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `hsl(${source.hue} 70% 55% / 0.12)`,
                    color: `hsl(${source.hue} 75% 60%)`,
                  }}
                >
                  <Icon name={source.icon} className="h-5 w-5" />
                </div>
                <h3 className="relative text-lg font-semibold tracking-tight">
                  {source.name}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(source.descKey)}
                </p>
                <div className="relative mt-5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full w-0 rounded-full transition-all duration-700 ease-out group-hover:w-full"
                    style={{ background: `hsl(${source.hue} 75% 58%)` }}
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
