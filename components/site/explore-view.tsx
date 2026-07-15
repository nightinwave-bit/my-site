"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { OntologyGraph } from "./ontology-graph";
import { SampleBadge } from "./sample-notice";

export function ExploreView() {
  const { t, locale } = useLanguage();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border">
          <div className="container pb-14 pt-28 sm:pt-32">
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
          </div>
        </section>

        <section className="border-b border-border bg-tint">
          <div className="container py-12 sm:py-16">
            <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Figure · 전체 온톨로지 네트워크 · Full ontology network
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {t("explore.preview.badge")}
                </span>
              </div>
              <div className="overflow-x-auto px-5 py-8 sm:px-10 sm:py-12">
                <div className="min-w-[760px]">
                  <OntologyGraph interactive />
                </div>
              </div>
            </figure>
            <p className="mt-5 text-sm text-muted-foreground">
              {locale === "ko"
                ? "노드 위에 커서를 올리면 연결 관계가 강조됩니다. 완전한 인터랙티브 탐색은 다음 단계에서 제공됩니다."
                : "Hover a node to highlight its connections. Full interactive exploration arrives in a later phase."}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
