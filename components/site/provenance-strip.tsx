"use client";

import { Database } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { PROVENANCE } from "@/lib/ontology";
import { cn } from "@/lib/utils";

/** Compact dataset-provenance strip. Values come from the generated ontology
 *  (scripts/ontology-to-site.mjs → lib/ontology.generated.ts::PROVENANCE), so
 *  they stay in sync with the collected data. */
export function ProvenanceStrip({ className }: { className?: string }) {
  const { t } = useLanguage();

  const items: { value: string; label: string; small?: boolean }[] = [
    { value: PROVENANCE.rawQueries.toLocaleString(), label: t("prov.raw") },
    { value: PROVENANCE.canonicalQuestions.toLocaleString(), label: t("prov.canonical") },
    { value: String(PROVENANCE.languages), label: t("prov.languages") },
    { value: String(PROVENANCE.markets), label: t("prov.markets") },
    { value: PROVENANCE.method, label: t("prov.method"), small: true },
    { value: PROVENANCE.lastUpdated ?? "—", label: t("prov.updated"), small: true },
  ];

  return (
    <div className={cn("rounded-2xl border border-border bg-tint", className)}>
      <div className="flex items-center gap-2 border-b border-border px-5 py-3 sm:px-6">
        <Database className="h-3.5 w-3.5 text-brand" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {t("prov.title")}
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-5 sm:grid-cols-3 sm:px-6 lg:grid-cols-6">
        {items.map((it) => (
          <div key={it.label}>
            <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              {it.label}
            </dt>
            <dd
              className={cn(
                "mt-1 font-semibold leading-tight text-navy",
                it.small ? "text-sm sm:text-base" : "text-lg sm:text-xl"
              )}
            >
              {it.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
