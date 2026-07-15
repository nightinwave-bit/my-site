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
              "mb-4 flex items-center gap-2.5 text-sm font-medium text-clay",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-6 bg-clay/50" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-[2rem] font-semibold tracking-tight text-gradient sm:text-4xl md:text-[3rem] md:leading-[1.08]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
