import type { Metadata } from "next";
import { ResearchDoc } from "@/components/site/research-doc";
import { getDoc } from "@/lib/research";
import { articleJsonLd, SITE_URL } from "@/lib/research-raw";

export function generateMetadata(): Metadata {
  const d = getDoc("question-observatory")!;
  return {
    title: `${d.title.ko} · ${d.title.en} — Ask About Korea`,
    description: d.oneLine.en,
    alternates: {
      canonical: `${SITE_URL}/research/question-observatory`,
      types: { "text/html": `${SITE_URL}/research/question-observatory/raw` },
    },
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  const ld = JSON.stringify(articleJsonLd("question-observatory"));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ld }}
      />
      <ResearchDoc slug="question-observatory" />
    </>
  );
}
