"use client";

import { Info, FlaskConical } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SampleBadge({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-clay/30 bg-clay/10 px-3 py-1 text-xs font-medium text-clay",
        className
      )}
    >
      <FlaskConical className="h-3 w-3" />
      {t("sample.badge")}
    </span>
  );
}

export function SampleNotice({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        "rounded-[1.25rem] surface p-6 sm:p-7",
        className
      )}
    >
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
          <Info className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {t("sample.notice.title")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t("sample.notice.body")}
          </p>
        </div>
      </div>
    </div>
  );
}
