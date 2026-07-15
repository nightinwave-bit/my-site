import type { Metadata } from "next";
import { ResearchDoc } from "@/components/site/research-doc";
import { getDoc } from "@/lib/research";

export function generateMetadata(): Metadata {
  const d = getDoc("diplomacy-brief")!;
  return {
    title: `${d.title.ko} · ${d.title.en} — Ask About Korea`,
    description: d.oneLine.en,
  };
}

export default function Page() {
  return <ResearchDoc slug="diplomacy-brief" />;
}
