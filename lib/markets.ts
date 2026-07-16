import type { Localized } from "@/lib/ontology";

// The eight collection markets, in the dataset's canonical order. These are the
// question surfaces served to each locale (Google country/interface signal),
// not per-person geodata. Names for the transparency displays (spec §8).
export const MARKETS: { code: string; name: Localized }[] = [
  { code: "US", name: { ko: "미국", en: "United States" } },
  { code: "DE", name: { ko: "독일", en: "Germany" } },
  { code: "IN", name: { ko: "인도", en: "India" } },
  { code: "ID", name: { ko: "인도네시아", en: "Indonesia" } },
  { code: "JP", name: { ko: "일본", en: "Japan" } },
  { code: "BR", name: { ko: "브라질", en: "Brazil" } },
  { code: "AE", name: { ko: "아랍에미리트", en: "United Arab Emirates" } },
  { code: "KR", name: { ko: "대한민국", en: "South Korea" } },
];

const BY_CODE = new Map(MARKETS.map((m) => [m.code, m.name]));

export function marketName(code: string): Localized {
  return BY_CODE.get(code) ?? { ko: code, en: code };
}
