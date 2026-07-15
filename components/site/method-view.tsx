"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Search,
  MessagesSquare,
  TextCursorInput,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useLanguage, type Locale } from "@/lib/i18n";
import { getPathway } from "@/lib/ontology";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";
import { PathwayDiagram } from "./pathway-diagram";
import { SampleBadge, SampleNotice } from "./sample-notice";

type L = { ko: string; en: string };
const tx = (v: L, l: Locale) => v[l];

function SectionShell({
  index,
  kicker,
  title,
  children,
  tint = false,
}: {
  index: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section className={tint ? "border-b border-border bg-tint" : "border-b border-border"}>
      <div className="container py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span className="font-semibold tabular-nums text-brand">{index}</span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {kicker}
                </span>
              </div>
              <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight text-navy sm:text-3xl">
                {title}
              </h2>
            </Reveal>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

// ── Section 1 figure: Old vs New model ────────────────────────────────────
function Chip({
  label,
  variant,
}: {
  label: string;
  variant: "muted" | "brand" | "navy";
}) {
  const cls =
    variant === "navy"
      ? "border-navy bg-navy text-white"
      : variant === "brand"
        ? "border-brand bg-white text-brand"
        : "border-border bg-white text-secondary";
  return (
    <div className={`rounded-lg border px-4 py-3 text-center text-sm font-medium shadow-card ${cls}`}>
      {label}
    </div>
  );
}

function ComparisonFigure() {
  const { t, locale } = useLanguage();
  const old: L[] = [
    { ko: "정부", en: "Government" },
    { ko: "캠페인", en: "Campaign" },
    { ko: "대중", en: "Public" },
  ];
  const neu: L[] = [
    { ko: "질문", en: "Question" },
    { ko: "AI 응답", en: "AI Answer" },
    { ko: "인식", en: "Perception" },
  ];
  const Row = ({
    label,
    items,
    variant,
    dim,
  }: {
    label: string;
    items: L[];
    variant: "muted" | "brand" | "navy";
    dim?: boolean;
  }) => (
    <div className={`rounded-xl border border-border bg-white p-5 shadow-card sm:p-6 ${dim ? "opacity-80" : ""}`}>
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <div className="flex-1">
              <Chip
                label={tx(it, locale)}
                variant={i === items.length - 1 ? (variant === "muted" ? "muted" : variant) : variant === "navy" ? "brand" : "muted"}
              />
            </div>
            {i < items.length - 1 && (
              <ArrowRight className="mx-auto hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
  return (
    <div className="space-y-4">
      <Row label={t("mp.s1.old")} items={old} variant="muted" dim />
      <div className="flex justify-center">
        <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
          →
        </span>
      </div>
      <Row label={t("mp.s1.new")} items={neu} variant="navy" />
    </div>
  );
}

// ── Section 2 figure: encounter flow ──────────────────────────────────────
function FlowStage({
  label,
  items,
  strong = false,
}: {
  label: string;
  items?: string[];
  strong?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-md rounded-xl border p-5 text-center shadow-card ${
        strong ? "border-navy bg-navy" : "border-border bg-white"
      }`}
    >
      <div
        className={`text-sm font-semibold ${strong ? "text-white" : "text-navy"}`}
      >
        {label}
      </div>
      {items && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {items.map((it) => (
            <span
              key={it}
              className="rounded-full border border-border bg-tint px-3 py-1 text-[13px] font-medium text-secondary"
            >
              {it}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function EncounterFlow() {
  const { t } = useLanguage();
  const Arrow = () => (
    <ArrowDown className="my-3 h-5 w-5 text-muted-foreground" aria-hidden />
  );
  return (
    <div className="flex flex-col items-center">
      <FlowStage
        label={t("mp.s2.search")}
        items={["Google Autocomplete"]}
      />
      <Arrow />
      <FlowStage label={t("mp.s2.emerge")} />
      <Arrow />
      <FlowStage
        label={t("mp.s2.answer")}
        items={["ChatGPT", "Gemini", "Perplexity", "Claude"]}
      />
      <Arrow />
      <FlowStage label={t("mp.s2.perceive")} strong />
    </div>
  );
}

export function MethodView() {
  const { t } = useLanguage();
  const examplePathway = getPathway("cultural-force")!;
  const ease = [0.22, 1, 0.36, 1] as const;

  const steps = [1, 2, 3, 4, 5, 6];
  const whyLines = ["mp.s5.l1", "mp.s5.l2", "mp.s5.l3"];

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="border-b border-border">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-16 pt-28 sm:pt-36">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                <Sparkles className="h-3.5 w-3.5" />
                {t("mp.eyebrow")}
              </span>
              <SampleBadge />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-navy sm:text-5xl md:text-6xl"
            >
              {t("mp.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.12 }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-secondary sm:text-xl"
            >
              {t("mp.subtitle")}
            </motion.p>
          </div>
        </section>

        {/* Section 1 */}
        <SectionShell index="01" kicker={t("mp.s1.kicker")} title={t("mp.s1.title")}>
          <Reveal>
            <p className="max-w-2xl text-pretty text-[17px] leading-relaxed text-secondary">
              {t("mp.s1.body")}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10">
              <ComparisonFigure />
            </div>
          </Reveal>
        </SectionShell>

        {/* Section 2 */}
        <SectionShell index="02" kicker={t("mp.s2.kicker")} title={t("mp.s2.title")} tint>
          <Reveal>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-10">
              <EncounterFlow />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-secondary">
              {t("mp.s2.body")}
            </p>
          </Reveal>
        </SectionShell>

        {/* Section 3 */}
        <SectionShell index="03" kicker={t("mp.s3.kicker")} title={t("mp.s3.title")}>
          <Reveal>
            <p className="max-w-2xl text-pretty text-[17px] leading-relaxed text-secondary">
              {t("mp.s3.body")}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <figcaption className="border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {t("mp.s3.caption")}
              </figcaption>
              <div className="bg-blueprint px-5 py-8 sm:px-8">
                <div className="mx-auto max-w-md">
                  <PathwayDiagram pathway={examplePathway} animate={false} />
                </div>
              </div>
            </figure>
          </Reveal>
        </SectionShell>

        {/* Section 4 */}
        <SectionShell index="04" kicker={t("mp.s4.kicker")} title={t("mp.s4.title")} tint>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((n, i) => (
              <Reveal key={n} delay={(i % 2) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-xl border border-border bg-white p-6 shadow-card">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold tabular-nums text-brand">
                    {n}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy">
                      {t(`mp.s4.${n}.title`)}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                      {t(`mp.s4.${n}.desc`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* Section 5 */}
        <SectionShell index="05" kicker={t("mp.s5.kicker")} title={t("mp.s5.title")}>
          <div className="space-y-3">
            {whyLines.map((k, i) => (
              <Reveal key={k} delay={i * 0.06}>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-card">
                  <span className="text-sm font-semibold tabular-nums text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[17px] font-medium text-navy">{t(k)}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="rounded-xl border-l-4 border-brand bg-navy p-6 shadow-card">
                <p className="text-lg font-medium leading-relaxed text-white">
                  {t("mp.s5.l4")}
                </p>
              </div>
            </Reveal>
          </div>
        </SectionShell>

        {/* Section 6 */}
        <SectionShell index="06" kicker={t("method.sources.title")} title={t("mp.s6.title")} tint>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "Google Autocomplete", icon: TextCursorInput, descKey: "method.autocomplete.desc", status: "active" },
              { name: "Google People Also Ask", icon: MessagesSquare, descKey: "method.paa.desc", status: "planned" },
              { name: "Google Search", icon: Search, descKey: "method.google.desc", status: "planned" },
              { name: "Reddit", icon: MessageCircle, descKey: "method.reddit.desc", status: "planned" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.name} delay={(i % 2) * 0.06}>
                  <div className="h-full rounded-xl border border-border bg-white p-6 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/8 text-brand">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={
                          s.status === "active"
                            ? "rounded-full border border-brand/30 bg-brand/8 px-2.5 py-0.5 text-[11px] font-semibold text-brand"
                            : "rounded-full border border-border bg-tint px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                        }
                      >
                        {t(s.status === "active" ? "source.active" : "source.planned")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-navy">{s.name}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">
                      {t(s.descKey)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.1}>
            <SampleNotice className="mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm text-muted-foreground">{t("mp.s6.note")}</p>
          </Reveal>
        </SectionShell>

        {/* Closing statement */}
        <section className="bg-navy">
          <div className="container py-20 sm:py-28">
            <Reveal>
              <p className="mx-auto max-w-3xl text-balance text-center text-2xl font-medium leading-snug text-white sm:text-3xl md:text-[2rem] md:leading-[1.3]">
                {t("mp.closing")}
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
