"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getPathway, getNode } from "@/lib/ontology";
import { TOPICS, topicLead } from "@/lib/topics";
import { insightFor } from "@/lib/interpretation";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

// Eight questions, eight Koreas — one representative question per topic, each
// carried to the perception (and its strategic insight) it forms.
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

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((topic, i) => {
            const lead = topicLead(topic.slug);
            const pathway = lead ? getPathway(lead.pathway) : undefined;
            const perception = pathway
              ? getNode(pathway.steps[pathway.steps.length - 1].nodeId)
              : undefined;
            const insight = perception ? insightFor(perception.id) : undefined;
            return (
              <Reveal key={topic.slug} delay={(i % 4) * 0.05} className="h-full">
                <Link
                  href={`/topics/${topic.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card card-hover"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {topic.title[locale]}
                  </span>
                  <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-navy">
                    {lead?.question[locale]}
                  </h3>

                  {perception && (
                    <div className="mt-5 rounded-lg border-l-2 border-brand bg-tint px-3.5 py-2.5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
                        {t("type.perception")}
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-navy">
                        {perception.label[locale]}
                      </div>
                      {insight && (
                        <div className="mt-2 border-t border-border pt-2 text-[13px] leading-snug text-secondary">
                          <span className="font-semibold text-navy">{t("layer.insight").split(" · ")[0]} · </span>
                          {insight[locale]}
                        </div>
                      )}
                    </div>
                  )}

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
