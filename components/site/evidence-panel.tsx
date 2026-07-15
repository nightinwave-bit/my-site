"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import {
  type OntologyNode,
  PLATFORM_LABEL,
  buildEdges,
  getNode,
} from "@/lib/ontology";
import { PLATFORM_ICON } from "./icon";
import { cn } from "@/lib/utils";

const TYPE_TAG: Record<string, string> = {
  question: "type.question",
  concept: "type.concept",
  theme: "type.theme",
  narrative: "type.narrative",
};

function connectedNodes(id: string): OntologyNode[] {
  const edges = buildEdges();
  const ids = new Set<string>();
  for (const e of edges) {
    if (e.from === id) ids.add(e.to);
    if (e.to === id) ids.add(e.from);
  }
  return Array.from(ids).map(getNode);
}

export function EvidencePanel({
  node,
  onClose,
  onSelect,
}: {
  node: OntologyNode | null;
  onClose: () => void;
  onSelect?: (node: OntologyNode) => void;
}) {
  const { t, locale } = useLanguage();
  const open = !!node;

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const related = node ? connectedNodes(node.id) : [];

  return (
    <AnimatePresence>
      {open && node && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-navy/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            className={cn(
              "fixed z-50 flex flex-col bg-white shadow-panel",
              // desktop: right drawer; mobile: bottom sheet
              "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl",
              "sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[440px] sm:max-h-none sm:rounded-none sm:border-l sm:border-border"
            )}
            initial={{ opacity: 0, y: 40, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={node.label[locale]}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {t(TYPE_TAG[node.type])}
                </div>
                <h3 className="mt-1.5 text-xl font-semibold leading-tight text-navy">
                  {node.label[locale]}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("evidence.close")}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-navy"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-[15px] leading-relaxed text-secondary">
                {node.blurb[locale]}
              </p>

              <div className="mt-7">
                <div className="text-sm font-semibold text-navy">
                  {t("evidence.title")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {t("evidence.subtitle")}
                </div>

                {node.evidence?.length ? (
                  <ul className="mt-4 space-y-2.5">
                    {node.evidence.map((e, i) => {
                      const Icon = PLATFORM_ICON[e.platform];
                      return (
                        <li
                          key={i}
                          className="rounded-lg border border-border bg-tint px-4 py-3"
                        >
                          <p className="text-[15px] font-medium leading-snug text-navy">
                            {e.q[locale]}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Icon className="h-3.5 w-3.5" />
                            {PLATFORM_LABEL[e.platform]}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-4 rounded-lg border border-dashed border-border bg-tint px-4 py-3 text-sm text-muted-foreground">
                    {t("evidence.empty")}
                  </p>
                )}
              </div>

              {related.length > 0 && (
                <div className="mt-7">
                  <div className="text-sm font-semibold text-navy">
                    {t("evidence.connected")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {related.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => onSelect?.(r)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-navy transition-colors hover:border-brand hover:text-brand"
                      >
                        {r.label[locale]}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* footer notice */}
            <div className="flex items-start gap-2 border-t border-border bg-tint px-6 py-3.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{t("sample.notice.title")}</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
