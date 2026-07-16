"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Network } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getNode, PATHWAYS } from "@/lib/ontology";
import { marketName } from "@/lib/markets";
import type { Topic } from "@/lib/topics";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";

export function TopicView({ topic }: { topic: Topic }) {
  const { t, locale } = useLanguage();

  const conceptSet = new Set(topic.concepts);
  const relatedPathways = PATHWAYS.filter((p) =>
    p.steps.some((s) => conceptSet.has(s.nodeId))
  );

  return (
    <>
      <Navbar />
      <main>
        {/* header */}
        <section className="relative border-b border-border bg-tint">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-12 pt-28 sm:pt-32">
            <Link
              href="/topics"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-navy"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("topic.back")}
            </Link>
            <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-5xl">
              {topic.title[locale]}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-secondary">
              {topic.tagline[locale]}
            </p>
          </div>
        </section>

        {/* concepts (subtopics) */}
        <section className="border-b border-border">
          <div className="container py-14 sm:py-16">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
              {t("topic.subtopics")}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topic.concepts.map((cid, i) => {
                const c = getNode(cid);
                return (
                  <Reveal key={cid} delay={(i % 3) * 0.06} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold leading-snug text-navy">
                          {c.label[locale]}
                        </h3>
                        {typeof c.count === "number" && (
                          <span className="shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground">
                            {c.count} {t("topic.questions")}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-secondary">
                        {c.blurb[locale]}
                      </p>
                      {c.topMarket && (
                        <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                          {locale === "ko" ? "가장 많이 묻는 곳" : "Asked most in"}:{" "}
                          <span className="font-medium text-navy">
                            {marketName(c.topMarket)[locale]}
                          </span>
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Link
              href="/explore"
              className="mt-10 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
            >
              <Network className="h-4 w-4" />
              {t("topic.explore.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* related question paths */}
        {relatedPathways.length > 0 && (
          <section className="border-b border-border bg-tint">
            <div className="container py-14 sm:py-16">
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {t("topic.paths")}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedPathways.map((p, i) => {
                  const q = getNode(p.steps[0].nodeId);
                  return (
                    <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full">
                      <Link
                        href={`/pathway/${p.id}`}
                        className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card card-hover"
                      >
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {p.themeLabel[locale]}
                        </span>
                        <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-navy">
                          {q.label[locale]}
                        </h3>
                        <div className="mt-4 inline-flex items-center gap-1.5 border-t border-border pt-3.5 text-sm font-semibold text-navy">
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
        )}
      </main>
      <Footer />
    </>
  );
}
