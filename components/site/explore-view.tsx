"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ForceGraph } from "./force-graph";
import { SampleBadge } from "./sample-notice";
import { ProvenanceStrip } from "./provenance-strip";

const FLOW = ["explore.flow.q", "explore.flow.c", "explore.flow.t", "explore.flow.n", "explore.flow.p"];

export function ExploreView() {
  const { t } = useLanguage();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border">
          <div className="container pb-12 pt-28 sm:pt-32">
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
                {t("explore.back")}
              </Link>
            </motion.div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {t("explore.eyebrow")}
              </span>
              <SampleBadge />
            </div>

            <h1 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-5xl">
              {t("explore.title")}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-secondary">
              {t("explore.subtitle")}
            </p>

            {/* perception flow strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-navy">
              {FLOW.map((k, i) => (
                <span key={k} className="inline-flex items-center gap-2">
                  <span
                    className={
                      k === "explore.flow.p"
                        ? "rounded-md bg-navy px-2.5 py-1 text-white"
                        : "rounded-md bg-secondary px-2.5 py-1"
                    }
                  >
                    {t(k)}
                  </span>
                  {i < FLOW.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </span>
              ))}
            </div>

            <ProvenanceStrip className="mt-9" />
          </div>
        </section>

        {/* the graph */}
        <section className="border-b border-border bg-tint">
          <div className="container py-10 sm:py-14">
            <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Figure · 한국 인식 온톨로지 · Perception ontology of Korea
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {t("explore.preview.badge")}
                </span>
              </div>
              <div className="overflow-x-auto px-4 py-6 sm:px-8 sm:py-8">
                <div className="min-w-[720px]">
                  <ForceGraph interactive />
                </div>
              </div>
            </figure>
            <p className="mt-4 text-sm text-muted-foreground">{t("explore.hint")}</p>
          </div>
        </section>

        {/* narrative layer */}
        <section className="border-b border-border">
          <div className="container py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              <div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {t("explore.flow.eyebrow")}
                </div>
                <p className="mt-4 text-balance text-2xl font-semibold leading-snug text-navy sm:text-3xl md:text-[2rem] md:leading-[1.25]">
                  {t("explore.flow.statement")}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-tint p-7">
                <h3 className="text-base font-semibold text-navy">
                  {t("explore.shared.title")}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                  {t("explore.shared.body")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* bridge → Research */}
        <section className="border-b border-border bg-tint">
          <div className="container flex flex-col items-start justify-between gap-5 py-14 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-balance text-xl font-semibold leading-snug text-navy sm:text-2xl">
              {t("research.explore.cta.title")}
            </p>
            <Link
              href="/research"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
            >
              {t("research.explore.cta.link")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
