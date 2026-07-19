import { TOPICS, getTopic } from "@/lib/topics";
import { NODES } from "@/lib/ontology.generated";
import topicQuestionsData from "@/lib/topic-questions.generated.json";
import translationsData from "@/lib/translations.generated.json";

export const dynamic = "force-static";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://my-site-sable-alpha.vercel.app"
).replace(/\/+$/, "");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type TQ = { id: string; text: string; countries: string[]; language: string };
const topicQuestions = topicQuestionsData as Record<
  string,
  { count: number; concepts: Record<string, TQ[]> }
>;
const translations = translationsData as Record<
  string,
  { ko: string; en: string }
>;

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) {
    return new Response("Not found", { status: 404 });
  }

  const tData = topicQuestions[topic.slug];
  const out: string[] = [];

  out.push("<!doctype html>");
  out.push('<html lang="ko">');
  out.push("<head>");
  out.push('<meta charset="utf-8">');
  out.push(
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
  );
  out.push(
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
  );
  out.push(
    `<title>${esc(topic.title.ko)} · ${esc(topic.title.en)} — Ask About Korea (AI 읽기 전용 · raw)</title>`,
  );
  out.push(
    `<meta name="description" content="${esc(topic.title.ko)} 주제의 전체 질문 데이터. ${tData?.count ?? 0}개 질문, ${topic.concepts.length}개 개념.">`,
  );
  out.push(
    `<link rel="canonical" href="${SITE_URL}/topics/${esc(topic.slug)}">`,
  );
  out.push("</head>");
  out.push("<body>");

  out.push(
    `<h1>${esc(topic.title.ko)} / ${esc(topic.title.en)}</h1>`,
  );
  out.push(`<p>${esc(topic.tagline.ko)}</p>`);
  out.push(`<p>${esc(topic.tagline.en)}</p>`);
  out.push(
    `<p>${tData?.count ?? 0}개 질문 · ${topic.concepts.length}개 개념</p>`,
  );

  out.push("<h2>개념 (Concepts)</h2>");
  out.push("<ul>");
  for (const conceptId of topic.concepts) {
    const node = NODES[conceptId];
    if (!node) continue;
    const questions = tData?.concepts[conceptId];
    const count = questions ? questions.length : 0;
    out.push(
      `<li><strong>${esc(node.label.ko)}</strong> / ${esc(node.label.en)} — ${count}개 질문</li>`,
    );
  }
  out.push("</ul>");

  if (tData) {
    out.push("<h2>질문 목록 (Questions)</h2>");

    for (const conceptId of topic.concepts) {
      const node = NODES[conceptId];
      const questions = tData.concepts[conceptId];
      if (!questions || questions.length === 0) continue;

      const conceptLabel = node
        ? `${node.label.ko} / ${node.label.en}`
        : conceptId;

      out.push(`<h3>${esc(conceptLabel)} (${questions.length}개)</h3>`);
      out.push("<ul>");
      for (const q of questions) {
        const tr = translations[q.id];
        const koText = tr ? tr.ko : q.text;
        const enText = tr ? tr.en : q.text;
        const display =
          koText === enText
            ? esc(koText)
            : `${esc(koText)} / ${esc(enText)}`;
        out.push(
          `<li>${display} <small>[${esc(q.countries.join(","))}] (${esc(q.language)})</small></li>`,
        );
      }
      out.push("</ul>");
    }
  }

  out.push("<hr>");
  out.push(
    `<p><a href="/topics/${esc(topic.slug)}">전체 인터랙티브 버전 · Full interactive version</a></p>`,
  );
  out.push(
    `<p><a href="/explore">전체 질문 탐색 · Explore all questions</a></p>`,
  );
  out.push("</body>");
  out.push("</html>");

  return new Response(out.join("\n"), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "index, follow",
    },
  });
}
