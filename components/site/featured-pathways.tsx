"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { PATHWAYS, getNode } from "@/lib/ontology";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function FeaturedPathways() {
  const { t, locale } = useLanguage();

  return (
    <section id="pathways" className="scroll-mt-20 border-b border-border bg-tint">
      <div className="container py-20 sm:py-28">
        <SectionHeading
          eyebrow={t("pathways.eyebrow")}
          title={t("pathways.title")}
          subtitle={t("pathways.subtitle")}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map((p, i) => {
            const question = getNode(p.steps[0].nodeId);
            const narrative = getNode(p.steps[p.steps.length - 1].nodeId);
            const middle = p.steps.slice(1, -1).map((s) => getNode(s.nodeId));
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full">
                <Link
                  href={`/pathway/${p.id}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card card-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {p.themeLabel[locale]}
                    </span>
                    <span className="text-[11px] font-semibold tabular-nums text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 flex items-start gap-2 text-lg font-semibold leading-snug text-navy">
                    {question.label[locale]}
                  </h3>

                  {/* compact chain preview */}
                  <div className="mt-5 flex flex-1 flex-wrap items-center gap-x-1.5 gap-y-1.5 text-[13px] text-secondary">
                    {middle.map((n, mi) => (
                      <span key={n.id} className="inline-flex items-center gap-1.5">
                        <span className="rounded-md bg-secondary px-2 py-0.5 font-medium text-navy">
                          {n.label[locale]}
                        </span>
                        {mi < middle.length - 1 && (
                          <span className="text-muted-foreground">→</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* narrative endpoint */}
                  <div className="mt-5 rounded-lg border-l-2 border-brand bg-tint px-3.5 py-2.5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
                      {t("type.narrative")}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-navy">
                      {narrative.label[locale]}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold text-navy">
                    {t("pathways.view")}
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
