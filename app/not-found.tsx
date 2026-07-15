"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/site/navbar";

export default function NotFound() {
  const { locale } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[100svh] items-center justify-center">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" />
        <div className="container relative text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            404
          </p>
          <h1 className="mx-auto mt-4 max-w-xl text-balance text-3xl font-semibold text-navy sm:text-4xl">
            {locale === "ko"
              ? "이 질문은 아직 지도에 없습니다."
              : "This question isn’t on the map yet."}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty text-secondary">
            {locale === "ko"
              ? "찾으시는 페이지가 존재하지 않습니다. 질문 경로로 돌아가 탐색을 이어가 보세요."
              : "The page you’re looking for doesn’t exist. Head back to the pathways to keep exploring."}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "ko" ? "홈으로 돌아가기" : "Back to home"}
          </Link>
        </div>
      </main>
    </>
  );
}
