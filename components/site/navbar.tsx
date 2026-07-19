"use client";

import * as React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { TOPICS } from "@/lib/topics";
import { RESEARCH_DOCS } from "@/lib/research";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./language-switch";

interface SubItem {
  label: { ko: string; en: string };
  href: string;
}

interface NavLink {
  key: string;
  href: string;
  children?: SubItem[];
}

const LINKS: NavLink[] = [
  { key: "nav.pathways", href: "/#pathways" },
  {
    key: "nav.topics",
    href: "/topics",
    children: TOPICS.map((t) => ({
      label: t.title,
      href: `/topics/${t.slug}`,
    })),
  },
  { key: "nav.explore", href: "/explore" },
  {
    key: "nav.research",
    href: "/research",
    children: RESEARCH_DOCS.map((d) => ({
      label: d.pagerTitle,
      href: `/research/${d.slug}`,
    })),
  },
  { key: "nav.method", href: "/method" },
];

function NavItem({ link }: { link: NavLink }) {
  const { t, locale } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  if (!link.children) {
    return (
      <Link
        href={link.href}
        className="rounded-md px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-navy"
      >
        {t(link.key)}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Link
        href={link.href}
        className="rounded-md px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-navy"
      >
        {t(link.key)}
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 pt-2 -translate-x-1/2 transition-all duration-150",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="min-w-[180px] rounded-xl border border-border bg-white p-1.5 shadow-lg">
          {link.children.map((child, i) => (
            <Link
              key={i}
              href={child.href}
              className="block rounded-lg px-3 py-2 text-[13px] font-medium text-secondary transition-colors hover:bg-[#F3F6FB] hover:text-navy"
              style={{ wordBreak: "keep-all" } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              {child.label[locale]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

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
            <NavItem key={link.key} link={link} />
          ))}
        </nav>

        <LanguageSwitch />
      </div>
    </header>
  );
}
