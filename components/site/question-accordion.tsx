"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, PlayCircle, Link2, MessageCircle, Search, Newspaper, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Category, Source } from "@/lib/data";
import { cn } from "@/lib/utils";

const PLATFORM_ICON = {
  google: Search,
  reddit: MessageCircle,
  wiki: BookOpen,
  news: Newspaper,
} as const;

function SourceChip({ source }: { source: Source }) {
  const PIcon = PLATFORM_ICON[source.platform] ?? Link2;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-muted-foreground">
      <PIcon className="h-3 w-3" />
      {source.label}
    </span>
  );
}

export function QuestionAccordion({ category }: { category: Category }) {
  const { t, locale } = useLanguage();
  const [open, setOpen] = React.useState<string | null>(
    category.questions[0]?.id ?? null
  );

  return (
    <div className="divide-y divide-border overflow-hidden rounded-[1.25rem] surface">
      {category.questions.map((q, i) => {
        const isOpen = open === q.id;
        return (
          <div key={q.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : q.id)}
              className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-accent/40 sm:px-6"
            >
              <span
                className="mt-0.5 font-serif text-sm font-medium tabular-nums"
                style={{ color: `hsl(${category.hue} 60% 46%)` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-base font-medium leading-snug text-foreground sm:text-lg">
                {q.question[locale]}
              </span>
              <span
                className={cn(
                  "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-45 border-clay/40 text-clay"
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pl-14 pr-6 sm:px-6 sm:pl-16">
                    <p className="text-[15px] leading-relaxed text-muted-foreground">
                      {q.answer[locale]}
                    </p>

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                          {t("category.sources")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {q.sources.map((s, si) => (
                            <SourceChip key={si} source={s} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                        {t("category.video")}
                      </p>
                      <div className="group flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition-colors hover:border-clay/30">
                        <span
                          className="flex h-11 w-16 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, hsl(${category.hue} 60% 45% / 0.4), hsl(${category.hue} 60% 30% / 0.2))`,
                          }}
                        >
                          <PlayCircle className="h-5 w-5 text-foreground/80 transition-transform group-hover:scale-110" />
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {q.video[locale]}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
