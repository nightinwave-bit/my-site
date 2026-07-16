"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { TOPICS } from "@/lib/topics";
import { getNode } from "@/lib/ontology";
import { Reveal } from "./reveal";

/** Reusable grid of topic cards — used on the Home teaser and the /topics page. */
export function TopicsGrid() {
  const { t, locale } = useLanguage();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {TOPICS.map((topic, i) => {
        const questionCount = topic.concepts.reduce(
          (sum, cid) => sum + (getNode(cid).count ?? 0),
          0
        );
        return (
          <Reveal key={topic.slug} delay={(i % 4) * 0.05} className="h-full">
            <Link
              href={`/topics/${topic.slug}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-card card-hover"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-navy">
                  {topic.title[locale]}
                </h3>
                <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
                  {topic.concepts.length} {t("topic.conceptCount")}
                </span>
              </div>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-secondary">
                {topic.tagline[locale]}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                <span className="text-xs text-muted-foreground">
                  ~{questionCount.toLocaleString()} {t("topic.questions")}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
