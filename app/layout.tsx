import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ask About Korea — 실제 질문, 신뢰할 수 있는 답변",
  description:
    "AI 시대에 세계가 한국에 대해 던지는 실제 질문을 수집하고 시각화합니다. A living map of global curiosity about Korea.",
  keywords: [
    "Korea",
    "questions",
    "AI",
    "knowledge map",
    "public diplomacy",
    "한국",
    "질문",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d0b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased"
        style={{ wordBreak: "keep-all" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
