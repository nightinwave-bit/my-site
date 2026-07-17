import type { MetadataRoute } from "next";
import { SITE_URL, RAW_SLUGS } from "@/lib/research-raw";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-07-15";
  const core = ["", "/topics", "/explore", "/research", "/method", "/ai.html"];
  // Every research doc plus its AI-readable raw twin.
  const research = RAW_SLUGS.flatMap((s) => [
    `/research/${s}`,
    `/research/${s}/raw`,
  ]);
  return [...core, ...research].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path.startsWith("/research") ? 0.8 : 0.6,
  }));
}
