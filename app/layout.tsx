import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ask About Korea — 실제 질문, 신뢰할 수 있는 답변",
  description:
    "세계가 한국에 대해 던지는 실제 질문을, 질문 → 개념 → 주제 → 서사의 온톨로지로 시각화하는 공개 리서치 플랫폼. A public research platform mapping how questions about Korea become perceptions.",
  keywords: [
    "Korea",
    "questions",
    "ontology",
    "public diplomacy",
    "research",
    "한국",
    "질문 온톨로지",
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-sans antialiased" style={{ wordBreak: "keep-all" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
