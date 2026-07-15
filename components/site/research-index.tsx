"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { RESEARCH_DOCS } from "@/lib/research";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ProvenanceStrip } from "./provenance-strip";

export function ResearchIndex() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border bg-tint">
          <div className="container pb-14 pt-28 sm:pt-36">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              {t("research.eyebrow")}
            </div>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-navy sm:text-5xl md:text-6xl">
              {t("research.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-secondary">
              {t("research.lede")}
            </p>

            {/* the one canonical provenance strip for the whole section */}
            <div className="mt-9">
              <ProvenanceStrip />
            </div>

            <Link
              href="/method"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-navy"
            >
              {t("research.method")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container py-14 sm:py-16">
            <div className="mb-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t("research.ladder")}
            </div>
            <div className="grid gap-4">
              {RESEARCH_DOCS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/research/${d.slug}`}
                  className="group grid gap-4 rounded-2xl border border-border bg-white p-6 shadow-card transition-colors hover:border-border-strong sm:grid-cols-[minmax(0,340px)_1fr] sm:items-center sm:p-7"
                  style={{ ["--accent" as string]: d.accent } as React.CSSProperties}
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-sm font-bold text-[color:var(--accent)]">
                      {String(d.rung).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)]">
                        {d.kicker[locale]}
                      </div>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-navy">
                        {d.title[locale]}
                      </h2>
                      <div className="mt-1 text-[15px] font-medium text-secondary">
                        {d.question[locale]}
                      </div>
                    </div>
                  </div>
                  <div className="sm:pl-4">
                    <p className="text-[15px] leading-relaxed text-secondary">{d.oneLine[locale]}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {t("research.audience")}: {d.audience[locale]}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)]">
                        {t("research.read")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
              {locale === "ko"
                ? "각 페이지는 아래 단계 위에 세워지며 아래 단계를 반복하지 않습니다. 구조 자체를 직접 다루려면 "
                : "Each page builds on the rung below it and does not repeat it. To handle the structure itself, "}
              <Link href="/explore" className="font-medium text-brand hover:underline">
                {t("nav.explore")}
              </Link>
              {locale === "ko" ? "를 여세요." : "."}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
