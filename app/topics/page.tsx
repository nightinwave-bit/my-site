import type { Metadata } from "next";
import { TopicsIndex } from "@/components/site/topics-index";

export const metadata: Metadata = {
  title: "주제 · Topics — Ask About Korea",
  description:
    "세계가 한국에 대해 묻는 질문을 여덟 개의 주제로 둘러보세요. Browse the world's questions about Korea by topic.",
};

export default function TopicsPage() {
  return <TopicsIndex />;
}
