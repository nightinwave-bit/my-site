import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PATHWAYS, getPathway, getNode } from "@/lib/ontology";
import { PathwayView } from "@/components/site/pathway-view";

export function generateStaticParams() {
  return PATHWAYS.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const pathway = getPathway(params.id);
  if (!pathway) return { title: "Ask About Korea" };
  const q = getNode(pathway.steps[0].nodeId);
  return {
    title: `${q.label.ko} · ${q.label.en} — Ask About Korea`,
    description: q.blurb.ko,
  };
}

export default function PathwayPage({ params }: { params: { id: string } }) {
  const pathway = getPathway(params.id);
  if (!pathway) notFound();
  return <PathwayView pathway={pathway} />;
}
