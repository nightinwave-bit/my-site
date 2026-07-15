"use client";

import { Search, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { OntologyNode, NodeType } from "@/lib/ontology";
import { cn } from "@/lib/utils";

const TYPE_TAG: Record<NodeType, string> = {
  question: "type.question",
  concept: "type.concept",
  theme: "type.theme",
  narrative: "type.narrative",
};

export function NodeChip({
  node,
  onClick,
  active = false,
  interactive = true,
}: {
  node: OntologyNode;
  onClick?: (node: OntologyNode) => void;
  active?: boolean;
  interactive?: boolean;
}) {
  const { t, locale } = useLanguage();
  const label = node.label[locale];
  const tag = t(TYPE_TAG[node.type]);
  const hasEvidence = !!node.evidence?.length;

  const base =
    "group/node relative w-full text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

  const Wrapper: React.ElementType = interactive ? "button" : "div";
  const wrapperProps: React.HTMLAttributes<HTMLElement> &
    { type?: "button" } = interactive
    ? { type: "button", onClick: () => onClick?.(node) }
    : {};

  if (node.type === "narrative") {
    return (
      <Wrapper
        {...wrapperProps}
        className={cn(base, "block")}
        aria-label={`${tag}: ${label}`}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border-l-4 border-brand bg-navy px-5 py-4 shadow-card sm:px-6 sm:py-5",
            interactive && "group-hover/node:shadow-panel"
          )}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-hi">
            {tag}
          </div>
          <div className="mt-1.5 text-lg font-semibold leading-snug text-white sm:text-xl">
            {label}
          </div>
        </div>
      </Wrapper>
    );
  }

  if (node.type === "question") {
    return (
      <Wrapper
        {...wrapperProps}
        className={cn(base, "block")}
        aria-label={`${tag}: ${label}`}
      >
        <div
          className={cn(
            "flex items-start gap-3 rounded-xl border bg-white px-4 py-3.5 shadow-card transition-colors sm:px-5",
            active ? "border-brand" : "border-border-strong",
            interactive && "group-hover/node:border-brand"
          )}
        >
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Search className="h-3.5 w-3.5" />
          </span>
          <span className="flex-1">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              {tag}
            </span>
            <span className="mt-0.5 block text-[15px] font-semibold leading-snug text-navy sm:text-base">
              {label}
            </span>
          </span>
        </div>
      </Wrapper>
    );
  }

  // concept + theme
  const isTheme = node.type === "theme";
  return (
    <Wrapper
      {...wrapperProps}
      className={cn(base, "block")}
      aria-label={`${tag}: ${label}`}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 transition-colors",
          isTheme
            ? "border-border bg-theme-bg"
            : "border-[hsl(224_70%_90%)] bg-concept-bg",
          active && "ring-2 ring-brand ring-offset-1",
          interactive && "group-hover/node:border-brand"
        )}
      >
        <span className="flex items-center gap-2.5">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              isTheme ? "bg-muted-foreground" : "bg-brand"
            )}
          />
          <span>
            <span
              className={cn(
                "block text-[10px] font-semibold uppercase tracking-[0.14em]",
                isTheme ? "text-muted-foreground" : "text-brand"
              )}
            >
              {tag}
            </span>
            <span className="mt-0.5 block text-[15px] font-medium leading-snug text-navy">
              {label}
            </span>
          </span>
        </span>
        {interactive && hasEvidence && (
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity group-hover/node:opacity-100">
            <Plus className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </Wrapper>
  );
}
