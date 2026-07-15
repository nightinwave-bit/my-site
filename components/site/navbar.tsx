"use client";

import * as React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";

const NAV_LINKS = [
  { key: "nav.explore", href: "/#map" },
  { key: "nav.about", href: "/#about" },
  { key: "nav.sources", href: "/#sources" },
  { key: "nav.map", href: "/#map" },
] as const;

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2 transition-all duration-500",
            scrolled
              ? "glass border border-border shadow-sm"
              : "border border-transparent"
          )}
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-clay/20" />
              <span className="absolute inset-0 rounded-full bg-clay/40 animate-pulse-ring" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-clay" />
            </span>
            <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight">
              Ask About Korea
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
