"use client";

import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { ForceGraph } from "./force-graph";

export function ExplorePreview() {
  const { t } = useLanguage();

  return (
    <section id="explore" className="scroll-mt-20 border-b border-border bg-tint">
      <div className="container py-20 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("explore.eyebrow")}
            title={t("explore.title")}
            subtitle={t("explore.subtitle")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/explore"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-white px-5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              <Network className="h-4 w-4" />
              {t("explore.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                질문 지도 · The question map
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                {t("explore.preview.badge")}
              </span>
            </div>
            <div className="overflow-x-auto px-5 py-6 sm:px-8 sm:py-8">
              <div className="min-w-[680px]">
                <ForceGraph interactive={false} />
              </div>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
