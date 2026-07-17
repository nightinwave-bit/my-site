"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import {
  PATHWAYS,
  getNode,
  type Pathway,
  type OntologyNode,
} from "@/lib/ontology";
import { meaningFor, discoveryFor, insightFor } from "@/lib/interpretation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { PathwayDiagram } from "./pathway-diagram";
import { EvidencePanel } from "./evidence-panel";
import { SampleBadge, SampleNotice } from "./sample-notice";
import { Reveal } from "./reveal";

export function PathwayView({ pathway }: { pathway: Pathway }) {
  const { t, locale } = useLanguage();
  const [evidence, setEvidence] = React.useState<OntologyNode | null>(null);

  const question = getNode(pathway.steps[0].nodeId);
  // Terminal node — a perception in the production ontology (was a narrative in
  // the sample). Labelled by its actual type so the tag stays accurate.
  const terminal = getNode(pathway.steps[pathway.steps.length - 1].nodeId);
  const index = PATHWAYS.findIndex((p) => p.id === pathway.id);
  const next = PATHWAYS[(index + 1) % PATHWAYS.length];
  const ease = [0.22, 1, 0.36, 1] as const;

  const meaning = meaningFor(pathway.id);
  const discovery = discoveryFor(terminal.id);
  const insight = insightFor(terminal.id);
  const meaningCards = meaning
    ? [
        { key: "pathway.meaning.what", value: meaning.whatHappened },
        { key: "pathway.meaning.why", value: meaning.why },
        { key: "pathway.meaning.matters", value: meaning.whyItMatters },
      ]
    : [];

  return (
    <>
      <Navbar />
      <main>
        {/* header */}
        <section className="border-b border-border bg-tint">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-14 pt-28 sm:pt-32">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <Link
                href="/#pathways"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-navy"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("nav.pathways")}
              </Link>
            </motion.div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {t("hero.pathway.label")} {String(index + 1).padStart(2, "0")} ·{" "}
                {pathway.themeLabel[locale]}
              </span>
              <SampleBadge />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-5xl"
            >
              {question.label[locale]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.12 }}
              className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-secondary"
            >
              {question.blurb[locale]}
            </motion.p>
          </div>
        </section>

        {/* meaning — What happened → Why → So what */}
        {meaningCards.length > 0 && (
          <section className="border-b border-border">
            <div className="container py-16 sm:py-20">
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {t("pathway.meaning.eyebrow")}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {meaningCards.map((c, i) => (
                  <Reveal key={c.key} delay={i * 0.08} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold tabular-nums text-brand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy">
                          {t(c.key)}
                        </span>
                      </div>
                      <p className="mt-4 text-[17px] font-medium leading-relaxed text-navy">
                        {c.value[locale]}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* pathway diagram + explanation (the underlying structure) */}
        <section className="border-b border-border bg-tint">
          <div className="container py-16 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16">
              <div>
                <div className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("pathway.structure.eyebrow")}
                </div>
                <PathwayDiagram
                  pathway={pathway}
                  animate
                  onNodeClick={setEvidence}
                  activeNodeId={evidence?.id}
                />
                <p className="mt-6 text-sm text-muted-foreground">
                  {locale === "ko"
                    ? "각 노드를 눌러 연결된 실제 질문과 출처를 확인하세요."
                    : "Tap any node to see the connected questions and sources."}
                </p>
              </div>

              <div className="lg:pt-10">
                <Reveal>
                  <div className="rounded-2xl border-l-4 border-brand bg-navy px-7 py-8 shadow-card">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-hi">
                      {t(`layer.${terminal.type}`)}
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                      {terminal.label[locale]}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                      {terminal.blurb[locale]}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="mt-6 space-y-4">
                    {pathway.steps.slice(1, -1).map((s) => {
                      const n = getNode(s.nodeId);
                      return (
                        <div
                          key={n.id}
                          className="rounded-xl border border-border bg-white p-5 shadow-card"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                              {t(`type.${n.type}`)}
                            </span>
                            <span className="text-base font-semibold text-navy">
                              {n.label[locale]}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                            {n.blurb[locale]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <SampleNotice className="mt-6" />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* closing insight — the page climaxes on interpretation, not the label */}
        {discovery && (
          <section className="border-b border-border bg-navy">
            <div className="container py-16 sm:py-24">
              <div className="max-w-3xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-hi">
                  {t("pathway.discovery.eyebrow")}
                </div>
                <Reveal>
                  <p className="mt-4 text-pretty text-2xl font-semibold leading-[1.4] text-white sm:text-3xl sm:leading-[1.4]">
                    {discovery[locale]}
                  </p>
                </Reveal>
                {insight && (
                  <Reveal delay={0.08}>
                    <div className="mt-8 border-t border-white/15 pt-6">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-hi">
                        {t("layer.insight")}
                      </div>
                      <p className="mt-2 text-pretty text-lg font-medium leading-relaxed text-white/85 sm:text-xl">
                        {insight[locale]}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* next pathway */}
        <section className="border-b border-border bg-tint">
          <div className="container flex flex-col items-start justify-between gap-4 py-12 sm:flex-row sm:items-center">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {locale === "ko" ? "다음 경로" : "Next pathway"}
              </div>
              <div className="mt-1 text-lg font-semibold text-navy">
                {getNode(next.steps[0].nodeId).label[locale]}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/topics"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-white px-5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
              >
                {t("pathway.browseAll")}
              </Link>
              <Link
                href={`/pathway/${next.id}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
              >
                {t("pathways.view")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <EvidencePanel
        node={evidence}
        onClose={() => setEvidence(null)}
        onSelect={setEvidence}
      />
    </>
  );
}
