import type { Metadata } from "next";
import { ExploreView } from "@/components/site/explore-view";

export const metadata: Metadata = {
  title: "전체 온톨로지 · Explore — Ask About Korea",
  description:
    "세계가 한국에 대해 던지는 질문들이 이루는 개념 네트워크의 미리보기. A preview of the ontology network formed by questions about Korea.",
};

export default function ExplorePage() {
  return <ExploreView />;
}
