import { buildRawDocument } from "@/lib/research-raw";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildRawDocument("question-observatory"), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "index, follow",
    },
  });
}
