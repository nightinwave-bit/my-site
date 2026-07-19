import { TOPICS } from "@/lib/topics";
import { NODES, GRAPH_EDGES, PATHWAYS, PROVENANCE } from "@/lib/ontology.generated";
import topicQuestionsData from "@/lib/topic-questions.generated.json";
import translationsData from "@/lib/translations.generated.json";

export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://my-site-sable-alpha.vercel.app"
).replace(/\/+$/, "");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type TQ = { id: string; text: string; countries: string[]; language: string };
const topicQuestions = topicQuestionsData as Record<
  string,
  { concepts: Record<string, TQ[]> }
>;
const translations = translationsData as Record<
  string,
  { ko: string; en: string }
>;

export function GET() {
  const out: string[] = [];

  out.push("<!doctype html>");
  out.push('<html lang="ko">');
  out.push("<head>");
  out.push('<meta charset="utf-8">');
  out.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
  out.push(
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
  );
  out.push(
    "<title>Explore — Ask About Korea (AI 읽기 전용 · raw)</title>",
  );
  out.push(
    `<meta name="description" content="Ask About Korea 질문 데이터베이스 전문. 1,540개 질문, 8개 주제, 18개 개념, 5개 경로(Pathway), 온톨로지 그래프 전체 구조.">`,
  );
  out.push(`<link rel="canonical" href="${SITE_URL}/explore">`);
  out.push("</head>");
  out.push("<body>");

  // Title
  out.push("<h1>Ask About Korea — Explore (질문 데이터베이스)</h1>");
  out.push(
    `<p>${esc(PROVENANCE.canonicalQuestions.toString())}개 질문 · ${esc(PROVENANCE.languages.toString())}개 언어 · ${esc(PROVENANCE.markets.toString())}개 국가 · 8개 주제 · 18개 개념 · 5개 경로</p>`,
  );

  // Ontology structure
  out.push("<h2>온톨로지 구조 (Ontology Structure)</h2>");

  // Themes
  out.push("<h3>주제 (Themes)</h3>");
  out.push("<ul>");
  for (const [id, node] of Object.entries(NODES)) {
    if (node.type !== "theme") continue;
    out.push(
      `<li><strong>${esc(node.label.ko)}</strong> / ${esc(node.label.en)} — ${esc(node.blurb.ko)}</li>`,
    );
  }
  out.push("</ul>");

  // Narratives
  out.push("<h3>서사 (Narratives)</h3>");
  out.push("<ul>");
  for (const [id, node] of Object.entries(NODES)) {
    if (node.type !== "narrative") continue;
    out.push(
      `<li><strong>${esc(node.label.ko)}</strong> / ${esc(node.label.en)} — ${esc(node.blurb.ko)}</li>`,
    );
  }
  out.push("</ul>");

  // Perceptions
  out.push("<h3>인식 (Perceptions)</h3>");
  out.push("<ul>");
  for (const [id, node] of Object.entries(NODES)) {
    if (node.type !== "perception") continue;
    out.push(
      `<li><strong>${esc(node.label.ko)}</strong> / ${esc(node.label.en)} — ${esc(node.blurb.ko)}</li>`,
    );
  }
  out.push("</ul>");

  // Pathways
  out.push("<h2>경로 (Pathways)</h2>");
  for (const pw of PATHWAYS) {
    out.push(`<h3>${esc(pw.title.ko)} / ${esc(pw.title.en)}</h3>`);
    out.push("<ol>");
    for (const step of pw.steps) {
      const node = NODES[step.nodeId];
      const label = node ? `${node.label.ko} / ${node.label.en}` : step.nodeId;
      const verb = step.verb ? step.verb.ko + " → " : "";
      out.push(`<li>${esc(verb)}${esc(label)}</li>`);
    }
    out.push("</ol>");
  }

  // Graph edges
  out.push("<h2>그래프 연결 (Graph Edges)</h2>");
  out.push("<ul>");
  for (const edge of GRAPH_EDGES) {
    const fromNode = NODES[edge.from];
    const toNode = NODES[edge.to];
    const fromLabel = fromNode ? fromNode.label.ko : edge.from;
    const toLabel = toNode ? toNode.label.ko : edge.to;
    out.push(`<li>${esc(fromLabel)} → ${esc(toLabel)}</li>`);
  }
  out.push("</ul>");

  // Questions by topic
  out.push("<h2>질문 목록 (Questions by Topic)</h2>");

  for (const topic of TOPICS) {
    const tData = topicQuestions[topic.slug];
    if (!tData) continue;

    out.push(`<h3>${esc(topic.title.ko)} / ${esc(topic.title.en)}</h3>`);
    out.push(`<p>${esc(topic.tagline.ko)}</p>`);

    for (const conceptId of topic.concepts) {
      const node = NODES[conceptId];
      const conceptLabel = node
        ? `${node.label.ko} / ${node.label.en}`
        : conceptId;
      const questions = tData.concepts[conceptId];
      if (!questions || questions.length === 0) continue;

      out.push(`<h4>${esc(conceptLabel)} (${questions.length}개)</h4>`);
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
    `<p><a href="/explore">전체 인터랙티브 버전 · Full interactive version</a></p>`,
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
