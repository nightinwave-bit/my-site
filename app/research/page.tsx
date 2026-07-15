import type { Metadata } from "next";
import { ResearchIndex } from "@/components/site/research-index";

export const metadata: Metadata = {
  title: "리서치 · Research — Ask About Korea",
  description:
    "세계가 한국에 대해 던진 1,540개 질문을 네 단계로 읽습니다 — 서술, 해석, 제도, 생태계. Four rungs from one dataset: description, interpretation, institutions, ecosystem.",
};

export default function ResearchPage() {
  return <ResearchIndex />;
}
