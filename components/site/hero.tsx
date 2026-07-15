"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play, Network } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import {
  PATHWAYS,
  TOTAL_QUESTIONS,
  PLATFORM_COUNT,
  type OntologyNode,
} from "@/lib/ontology";
import { PathwayDiagram } from "./pathway-diagram";
import { EvidencePanel } from "./evidence-panel";
import { cn } from "@/lib/utils";

const CYCLE_MS = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tabular-nums text-navy sm:text-[1.75rem]">
        {value}
      </div>
      <div className="mt-0.5 text-[13px] text-muted-foreground">{label}</div>
    </div>
  );
}

export function Hero() {
  const { t, locale } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [evidence, setEvidence] = React.useState<OntologyNode | null>(null);

  const pathway = PATHWAYS[active];
  const stagePaused = paused || !!evidence;

  const advance = React.useCallback(() => {
    setActive((i) => (i + 1) % PATHWAYS.length);
  }, []);

  // Fallback timer for reduced-motion (no progress-bar animationend to drive it)
  React.useEffect(() => {
    if (!reduce || stagePaused) return;
    const id = window.setTimeout(advance, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [reduce, stagePaused, active, advance]);

  const headlineLines = t("hero.title").split("\n");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_20%,black,transparent)]" />

      <div className="container relative grid gap-12 pb-16 pt-28 lg:grid-cols-[1fr_minmax(430px,46%)] lg:gap-16 lg:pb-24 lg:pt-36">
        {/* Left — thesis */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-[13px] font-medium text-secondary"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            {t("hero.eyebrow")}
          </motion.div>

          <h1 className="text-balance font-semibold tracking-[-0.03em]">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                className="block text-[2.5rem] leading-[1.08] text-navy sm:text-6xl lg:text-[4.25rem]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-7 max-w-xl text-pretty text-[17px] leading-relaxed text-secondary sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#pathways"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
            >
              {t("hero.cta.explore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong bg-white px-6 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              <Network className="h-4 w-4" />
              {t("hero.cta.map")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.54 }}
            className="mt-12 flex items-center gap-8 border-t border-border pt-7"
          >
            <Stat
              value={`${TOTAL_QUESTIONS.toLocaleString()}+`}
              label={t("stat.questions")}
            />
            <Stat value={`${PATHWAYS.length}`} label={t("stat.pathways")} />
            <Stat value={`${PLATFORM_COUNT}`} label={t("stat.sources")} />
          </motion.div>
        </div>

        {/* Right — pathway stage (research figure) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="surface overflow-hidden rounded-2xl">
            {/* figure header */}
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {t("hero.pathway.label")} {String(active + 1).padStart(2, "0")}
                </span>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  · {pathway.themeLabel[locale]}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? t("hero.play") : t("hero.pause")}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-navy"
              >
                {paused ? (
                  <Play className="h-3.5 w-3.5" />
                ) : (
                  <Pause className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* progress bar */}
            <div className="h-0.5 w-full bg-border">
              {!reduce && (
                <div
                  key={active}
                  className="progress-bar h-full bg-brand"
                  style={{
                    animationDuration: `${CYCLE_MS}ms`,
                    animationPlayState: stagePaused ? "paused" : "running",
                  }}
                  onAnimationEnd={advance}
                />
              )}
            </div>

            {/* diagram */}
            <div className="bg-blueprint px-5 py-6 sm:px-7 sm:py-8">
              <PathwayDiagram
                key={pathway.id}
                pathway={pathway}
                animate
                onNodeClick={setEvidence}
                activeNodeId={evidence?.id}
              />
            </div>
          </div>

          {/* pagination */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {PATHWAYS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t("hero.pathway.label")} ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active
                    ? "w-6 bg-brand"
                    : "w-1.5 bg-border-strong hover:bg-muted-foreground"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <EvidencePanel
        node={evidence}
        onClose={() => setEvidence(null)}
        onSelect={setEvidence}
      />
    </section>
  );
}
