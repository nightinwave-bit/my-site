"use client";

import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("toggle.lang")}
      className={cn(
        "relative flex items-center rounded-full border border-border bg-white p-0.5 text-[13px] font-medium",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-navy transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          locale === "en" ? "translate-x-[calc(100%+2px)]" : "translate-x-0"
        )}
      />
      <button
        type="button"
        onClick={() => setLocale("ko")}
        className={cn(
          "relative z-10 whitespace-nowrap rounded-full px-3 py-1 transition-colors",
          locale === "ko" ? "text-white" : "text-muted-foreground"
        )}
      >
        한국어
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "relative z-10 whitespace-nowrap rounded-full px-3 py-1 transition-colors",
          locale === "en" ? "text-white" : "text-muted-foreground"
        )}
      >
        English
      </button>
    </div>
  );
}
