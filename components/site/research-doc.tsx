"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Network, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getDoc, docNeighbors, type ResearchSlug } from "@/lib/research";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { DataReport } from "./research/data-report";
import { DiplomacyBrief } from "./research/diplomacy-brief";
import { FrameworkPaper } from "./research/framework-paper";
import { QuestionCommons } from "./research/question-commons";

const CONTENT: Record<ResearchSlug, React.ComponentType> = {
  "data-report": DataReport,
  "diplomacy-brief": DiplomacyBrief,
  "framework-paper": FrameworkPaper,
  "question-commons": QuestionCommons,
};

export function ResearchDoc({ slug }: { slug: ResearchSlug }) {
  const { t, locale } = useLanguage();
  const doc = getDoc(slug)!;
  const { prev, next } = docNeighbors(slug);
  const Content = CONTENT[slug];

  return (
    <div style={{ ["--accent" as string]: doc.accent } as React.CSSProperties}>
      <Navbar />
      <main>
        {/* breadcrumb + header */}
        <section className="border-b border-border bg-tint">
          <div className="container pb-12 pt-28 sm:pt-32">
            <nav className="flex items-center gap-2 text-sm text-secondary" aria-label="Breadcrumb">
              <Link href="/research" className="font-medium transition-colors hover:text-navy">
                {t("research.crumb")}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-navy">{doc.title[locale]}</span>
            </nav>

            <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
              {doc.kicker[locale]}
            </div>
            <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-5xl">
              {doc.title[locale]}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-secondary">
              {doc.oneLine[locale]}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 font-medium text-[color:var(--accent)] transition-opacity hover:opacity-80"
              >
                <Network className="h-4 w-4" />
                {t("research.map")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/method"
                className="inline-flex items-center gap-1.5 font-medium text-secondary transition-colors hover:text-navy"
              >
                {t("research.method")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* the document */}
        <Content />

        {/* ladder pager */}
        <section className="border-t border-border bg-tint">
          <div className="container grid gap-3 py-12 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/research/${prev.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-border bg-white p-5 transition-colors hover:border-border-strong"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t("research.prev")}
                </span>
                <span className="text-lg font-semibold text-navy">{prev.title[locale]}</span>
                <span className="text-sm text-secondary">{prev.question[locale]}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={`/research/${next.slug}`}
                className="group flex flex-col items-end gap-1 rounded-xl border border-border bg-white p-5 text-right transition-colors hover:border-border-strong"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("research.next")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-lg font-semibold text-navy">{next.title[locale]}</span>
                <span className="text-sm text-secondary">{next.question[locale]}</span>
              </Link>
            ) : (
              <Link
                href="/research"
                className="group flex flex-col items-end gap-1 rounded-xl border border-border bg-white p-5 text-right transition-colors hover:border-border-strong"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("research.crumb")}
                  <FileText className="h-3.5 w-3.5" />
                </span>
                <span className="text-lg font-semibold text-navy">{t("research.title")}</span>
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
