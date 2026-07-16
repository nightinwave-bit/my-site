"use client";

import { useLanguage } from "@/lib/i18n";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SectionHeading } from "./section-heading";
import { TopicsGrid } from "./topics-grid";
import { ProvenanceStrip } from "./provenance-strip";

/** /topics — the primary user entry point into the ontology. */
export function TopicsIndex() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border">
          <div className="container pb-14 pt-28 sm:pt-32">
            <SectionHeading
              eyebrow={t("topics.eyebrow")}
              title={t("topics.title")}
              subtitle={t("topics.subtitle")}
            />
          </div>
        </section>

        <section className="border-b border-border bg-tint">
          <div className="container py-14 sm:py-16">
            <TopicsGrid />
            <ProvenanceStrip className="mt-10" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
