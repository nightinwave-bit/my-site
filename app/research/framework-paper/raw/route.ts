import { buildRawDocument } from "@/lib/research-raw";

// Pure HTML, no CSS, no client JS — the AI/crawler-readable version.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildRawDocument("framework-paper"), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "index, follow",
    },
  });
}
