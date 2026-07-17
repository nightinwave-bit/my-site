import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOPICS, getTopic } from "@/lib/topics";
import { TopicView } from "@/components/site/topic-view";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const topic = getTopic(params.slug);
  if (!topic) return { title: "Ask About Korea" };
  return {
    title: `${topic.title.ko} · ${topic.title.en} — Ask About Korea`,
    description: topic.tagline.ko,
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) notFound();
  return <TopicView topic={topic} />;
}
