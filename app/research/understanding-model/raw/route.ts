import { buildRawDocument } from "@/lib/research-raw";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildRawDocument("understanding-model"), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "index, follow",
    },
  });
}
