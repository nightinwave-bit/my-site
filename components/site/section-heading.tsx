"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={cn(
              "mb-4 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-6 bg-brand/50" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-pretty text-[17px] leading-relaxed text-secondary sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
