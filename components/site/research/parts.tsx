"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** A {ko,en} string. */
export type L = { ko: string; en: string };

export function DocSection({
  children,
  tint,
  className,
}: {
  children: React.ReactNode;
  tint?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-border", tint && "bg-tint", className)}>
      <div className="container py-14 sm:py-16">{children}</div>
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
      {children}
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[24ch] text-balance text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-pretty text-[17px] leading-relaxed text-secondary">
      {children}
    </p>
  );
}

/** Numbered finding row (accent number + headline + body). */
export function Finding({
  n,
  head,
  body,
}: {
  n: string;
  head: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-[52px_1fr] sm:p-6">
      <div className="pt-0.5 font-mono text-sm font-bold text-[color:var(--accent)]">{n}</div>
      <div>
        <h3 className="text-[17px] font-semibold leading-snug text-navy">{head}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">{body}</p>
      </div>
    </div>
  );
}

/** Accent-tinted callout / “move” box. */
export function Accented({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        borderColor: "color-mix(in srgb, var(--accent) 32%, transparent)",
        background: "color-mix(in srgb, var(--accent) 8%, transparent)",
      }}
    >
      <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
        {label}
      </div>
      <div className="text-[16px] leading-relaxed text-navy">{children}</div>
    </div>
  );
}
