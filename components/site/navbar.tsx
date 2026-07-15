"use client";

import * as React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./language-switch";

const LINKS = [
  { key: "nav.pathways", href: "/#pathways" },
  { key: "nav.explore", href: "/explore" },
  { key: "nav.method", href: "/method" },
] as const;

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-white/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white">
            <span className="h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-navy">
            Ask About Korea
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-navy"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <LanguageSwitch />
      </div>
    </header>
  );
}
