import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/data";
import { CategoryView } from "@/components/site/category-view";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Ask About Korea" };
  return {
    title: `${category.name.ko} · ${category.name.en} — Ask About Korea`,
    description: category.intro.ko,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategory(params.slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
