import type { Metadata } from "next";
import { MethodView } from "@/components/site/method-view";

export const metadata: Metadata = {
  title: "질문은 어떻게 국가 인식이 되는가 · Method — Ask About Korea",
  description:
    "실제 공개 질문이 AI 정보 환경 속에서 어떻게 국가 인식으로 이어지는지를 설명하는 연구 프레임워크. The research framework behind Ask About Korea.",
};

export default function MethodPage() {
  return <MethodView />;
}
