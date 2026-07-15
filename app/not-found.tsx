"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/navbar";

export default function NotFound() {
  const { locale } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" />
        <div className="container relative text-center">
          <p className="font-serif text-7xl font-semibold text-clay sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {locale === "ko"
              ? "이 질문은 아직 수집되지 않았습니다."
              : "This question hasn’t been collected yet."}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            {locale === "ko"
              ? "찾으시는 페이지가 존재하지 않습니다. 질문 지도로 돌아가 탐색을 이어가 보세요."
              : "The page you’re looking for doesn’t exist. Head back to the question map to keep exploring."}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button variant="clay" size="lg">
                {locale === "ko" ? "홈으로 돌아가기" : "Back to home"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
