"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { RESEARCH_DOCS } from "@/lib/research";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { ProvenanceStrip } from "./provenance-strip";

/** Home Act III — Research reads as something built on top of the ontology.
 *  Hosts the dataset provenance strip (the shared resource the research draws
 *  on) and the four rung cards that link into the Research section. */
export function ResearchTeaser() {
  const { t, locale } = useLanguage();

  return (
    <section id="research" className="scroll-mt-20 border-b border-border">
      <div className="container py-20 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("research.teaser.eyebrow")}
            title={t("research.teaser.title")}
            subtitle={t("research.teaser.subtitle")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/research"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-white px-5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              {t("research.teaser.all")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* the shared resource the research draws on */}
        <Reveal delay={0.1} className="mt-12">
          <ProvenanceStrip />
        </Reveal>

        {/* four rungs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESEARCH_DOCS.map((doc, i) => (
            <Reveal key={doc.slug} delay={0.12 + (i % 4) * 0.06} className="h-full">
              <Link
                href={`/research/${doc.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card card-hover"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: doc.accent }}
                  >
                    {t("research.teaser.rung")} {doc.rung}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: doc.accent }}
                    aria-hidden
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-navy">
                  {doc.title[locale]}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-secondary">
                  {doc.question[locale]}
                </p>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                  {doc.oneLine[locale]}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold text-navy">
                  {t("research.explore.cta.link")}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
