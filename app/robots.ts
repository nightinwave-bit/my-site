import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/research-raw";

// Explicitly allow everything — especially /research and the AI-readable
// /research/*/raw documents — and advertise the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/research", "/research/"],
        disallow: [],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
