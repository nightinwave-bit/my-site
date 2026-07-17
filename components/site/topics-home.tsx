"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { TopicsGrid } from "./topics-grid";

/** Home — Topics as the primary user entry point into the ontology. */
export function TopicsHome() {
  const { t } = useLanguage();

  return (
    <section id="topics" className="scroll-mt-20 border-b border-border">
      <div className="container py-20 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("topics.home.eyebrow")}
            title={t("topics.home.title")}
            subtitle={t("topics.home.subtitle")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/topics"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-white px-5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              {t("topics.all")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12">
          <TopicsGrid />
        </div>
      </div>
    </section>
  );
}
