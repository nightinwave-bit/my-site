import type { Metadata } from "next";
import { ResearchDoc } from "@/components/site/research-doc";
import { getDoc } from "@/lib/research";
import { articleJsonLd, SITE_URL } from "@/lib/research-raw";

export function generateMetadata(): Metadata {
  const d = getDoc("question-commons")!;
  return {
    title: `${d.title.ko} · ${d.title.en} — Ask About Korea`,
    description: d.oneLine.en,
    alternates: {
      canonical: `${SITE_URL}/research/question-commons`,
      types: { "text/html": `${SITE_URL}/research/question-commons/raw` },
    },
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  // Server-rendered Article schema — present in the HTML source before any JS.
  const ld = JSON.stringify(articleJsonLd("question-commons"));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ld }}
      />
      <ResearchDoc slug="question-commons" />
    </>
  );
}
