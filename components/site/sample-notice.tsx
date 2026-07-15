"use client";

import { Info, Database } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SampleBadge({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-tint px-3 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      <Database className="h-3 w-3" />
      {t("sample.badge")}
    </span>
  );
}

export function SampleNotice({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={cn("rounded-xl border border-border bg-tint p-5 sm:p-6", className)}>
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-card">
          <Info className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-navy">
            {t("sample.notice.title")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary">
            {t("sample.notice.body")}
          </p>
        </div>
      </div>
    </div>
  );
}
