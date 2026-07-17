"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Network } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getPathway, getNode, type Evidence } from "@/lib/ontology";
import { topicLead, type Topic } from "@/lib/topics";
import { insightFor } from "@/lib/interpretation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";

const CHAIN_LABEL = ["type.question", "type.concept", "type.theme", "type.narrative", "type.perception", "layer.insight"];

export function TopicView({ topic }: { topic: Topic }) {
  const { t, locale } = useLanguage();

  const lead = topicLead(topic.slug);
  const pathway = lead ? getPathway(lead.pathway) : undefined;
  const nodes = pathway ? pathway.steps.map((s) => getNode(s.nodeId)) : [];
  const perception = nodes[nodes.length - 1];
  const insight = perception ? insightFor(perception.id) : undefined;

  // The visual chain: question → concept → theme → narrative → perception → insight.
  const chain: { label: string; value: string; accent?: boolean }[] = [
    { label: CHAIN_LABEL[0], value: lead?.question[locale] ?? "" },
    ...nodes.slice(1).map((n, i) => ({ label: CHAIN_LABEL[i + 1], value: n.label[locale] })),
    ...(insight ? [{ label: CHAIN_LABEL[5], value: insight[locale], accent: true }] : []),
  ];

  // Real questions that formed this topic — gathered from its concepts' exemplars.
  const realQuestions: string[] = [];
  const seenQ = new Set<string>();
  for (const cid of topic.concepts) {
    const ev = (getNode(cid).evidence ?? []) as Evidence[];
    for (const e of ev) {
      const q = e.q[locale];
      if (q && !seenQ.has(q)) { seenQ.add(q); realQuestions.push(q); }
      if (realQuestions.length >= 6) break;
    }
    if (realQuestions.length >= 6) break;
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — the topic as a question of understanding */}
        <section className="relative border-b border-border bg-tint">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-14 pt-28 sm:pt-32">
            <Link href="/topics" className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-navy">
              <ArrowLeft className="h-4 w-4" />
              {t("topic.back")}
            </Link>
            <div className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
              {topic.title[locale]}
            </div>
            <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-5xl">
              {lead?.question[locale]}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-secondary">
              {topic.tagline[locale]}
            </p>
          </div>
        </section>

        {/* 대표 인식 + 대표 경로 */}
        {perception && (
          <section className="border-b border-border">
            <div className="container py-16 sm:py-20">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                <div>
                  <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                    {t("topic.perceptionLabel")}
                  </div>
                  <Reveal>
                    <div className="mt-5 rounded-2xl border-l-4 border-brand bg-navy px-7 py-8 shadow-card">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-hi">
                        {t("layer.perception")}
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                        {perception.label[locale]}
                      </h2>
                      <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                        {perception.blurb[locale]}
                      </p>
                    </div>
                  </Reveal>
                </div>

                <div>
                  <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {t("topic.pathLabel")}
                  </div>
                  <div className="mt-5 space-y-2">
                    {chain.map((step, i) => (
                      <Reveal key={i} delay={i * 0.05}>
                        <div
                          className={
                            "rounded-xl border px-5 py-3.5 " +
                            (step.accent ? "border-brand bg-brand/5" : "border-border bg-white shadow-card")
                          }
                        >
                          <div className={"text-[10px] font-semibold uppercase tracking-[0.14em] " + (step.accent ? "text-brand" : "text-muted-foreground")}>
                            {t(step.label)}
                          </div>
                          <div className={"mt-0.5 font-medium leading-snug " + (step.accent ? "text-[15px] text-navy" : "text-[15px] text-navy")}>
                            {step.value}
                          </div>
                        </div>
                        {i < chain.length - 1 && (
                          <div className="py-1 pl-5 text-muted-foreground" aria-hidden>↓</div>
                        )}
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 이 인식을 형성한 주요 개념 */}
        <section className="border-b border-border bg-tint">
          <div className="container py-16 sm:py-20">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
              {t("topic.keyConcepts")}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topic.concepts.map((cid, i) => {
                const c = getNode(cid);
                return (
                  <Reveal key={cid} delay={(i % 3) * 0.06} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold leading-snug text-navy">{c.label[locale]}</h3>
                        {typeof c.count === "number" && (
                          <span className="shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground">{c.count}</span>
                        )}
                      </div>
                      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-secondary">{c.blurb[locale]}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {realQuestions.length > 0 && (
              <div className="mt-12">
                <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("topic.realQuestions")}
                </div>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {realQuestions.map((q) => (
                    <li key={q} className="rounded-lg border border-border bg-white px-4 py-3 text-[15px] font-medium text-navy shadow-card">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* 발견 (Insight) */}
        {insight && (
          <section className="border-b border-border">
            <div className="container py-16 sm:py-20">
              <div className="max-w-3xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  {t("layer.insight")}
                </div>
                <p className="mt-4 text-pretty text-2xl font-semibold leading-[1.4] text-navy sm:text-3xl sm:leading-[1.4]">
                  {insight[locale]}
                </p>
                <Link
                  href="/explore"
                  className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
                >
                  <Network className="h-4 w-4" />
                  {t("topic.explore.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
