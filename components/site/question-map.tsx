"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/data";
import { squarify } from "@/lib/treemap";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Icon } from "./icon";
import { SampleBadge } from "./sample-notice";

const GAP = 8;

export function QuestionMap() {
  const { t, locale } = useLanguage();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = w < 640 ? Math.round(w * 1.4) : Math.round(w * 0.52);
      setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rects = React.useMemo(() => {
    if (size.w === 0) return [];
    return squarify(
      CATEGORIES.map((c) => ({ value: c.count })),
      size.w,
      size.h
    );
  }, [size]);

  return (
    <section id="map" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("map.eyebrow")}
            title={t("map.title")}
            subtitle={t("map.subtitle")}
          />
          <Reveal delay={0.1}>
            <SampleBadge />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: size.h || 480 }}
          >
            {rects.map((rect, i) => {
              const cat = CATEGORIES[rect.index];
              const min = Math.min(rect.w, rect.h);
              const showQuestions = min > 150 && rect.w > 190;
              const compact = min < 96;
              return (
                <motion.div
                  key={cat.slug}
                  className="absolute"
                  style={{
                    left: rect.x,
                    top: rect.y,
                    width: rect.w,
                    height: rect.h,
                    padding: GAP / 2,
                  }}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 sm:p-5"
                    style={
                      {
                        borderColor: `hsl(${cat.hue} 40% 50% / 0.25)`,
                        background: `linear-gradient(155deg, hsl(${cat.hue} 55% 50% / 0.16), hsl(${cat.hue} 45% 40% / 0.05))`,
                      } as React.CSSProperties
                    }
                  >
                    {/* hover glow */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(120% 90% at 100% 0%, hsl(${cat.hue} 70% 55% / 0.28), transparent 60%)`,
                      }}
                    />

                    <div className="relative flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center rounded-lg"
                          style={{
                            color: `hsl(${cat.hue} 75% 65%)`,
                          }}
                        >
                          <Icon
                            name={cat.icon}
                            className={compact ? "h-4 w-4" : "h-5 w-5"}
                          />
                        </span>
                        {!compact && (
                          <span className="text-xs font-medium tabular-nums text-muted-foreground">
                            {cat.share}%
                          </span>
                        )}
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </div>

                    <div className="relative">
                      <h3
                        className="font-semibold leading-tight tracking-tight text-foreground"
                        style={{
                          fontSize: compact
                            ? "0.95rem"
                            : `clamp(1rem, ${min / 9}px, 1.9rem)`,
                        }}
                      >
                        {cat.name[locale]}
                      </h3>
                      {!compact && (
                        <p className="mt-0.5 text-xs tabular-nums text-muted-foreground sm:text-sm">
                          {cat.count.toLocaleString()} {t("map.questions")}
                        </p>
                      )}
                      {showQuestions && (
                        <p className="mt-2 line-clamp-2 max-w-[26ch] text-xs leading-snug text-muted-foreground/80">
                          {cat.questions[0].question[locale]}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
