// =============================================================================
// pipeline/versioning.mjs — historical versioning layer
// =============================================================================
//
// Every monthly run is preserved as an immutable snapshot under
// pipeline/history/<YYYY-MM>/. A registry (pipeline/history/index.json) lists
// all months with summary metrics so the system supports both month-to-month
// and longitudinal (multi-month) comparison.
//
// Snapshot layout (per month):
//   pipeline/history/<YYYY-MM>/
//     meta.json                     — version metadata (month, date, prev, counts)
//     fresh/raw_questions.json       — this month's raw collection snapshot
//     fresh/canonical_questions.json — this month's fresh canonical set
//     dataset/canonical_accumulated.json — the merged all-time working dataset
//     ontology/ontology_layer.json   — ontology regenerated this month
//     reasoning/interpretation.json  — engine output
//     reasoning/research-manifest.json
//     change-report.json / change-report.md — vs previous month
//     research-drafts/*.md           — four draft outputs
//
// Pure node builtins; offline; never touches the website build.
// =============================================================================

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, cpSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, "..");
export const HISTORY_DIR = process.env.AAK_HISTORY_DIR
  ? resolve(process.cwd(), process.env.AAK_HISTORY_DIR)
  : resolve(HERE, "history");
const INDEX = join(HISTORY_DIR, "index.json");

/** Normalize a date (YYYY-MM-DD or Date) to a month key YYYY-MM. */
export function monthKey(date) {
  const s = typeof date === "string" ? date : date.toISOString().slice(0, 10);
  return s.slice(0, 7);
}

export function monthDir(month) {
  return join(HISTORY_DIR, month);
}

function ensure(dir) {
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function readJSON(path, fallback = null) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

export function writeJSON(path, obj) {
  ensure(dirname(path));
  writeFileSync(path, JSON.stringify(obj, null, 2));
  return path;
}

export function writeText(path, text) {
  ensure(dirname(path));
  writeFileSync(path, text);
  return path;
}

/** Copy a file into a month snapshot at a relative destination. */
export function snapshotFile(month, srcAbsPath, relDest) {
  if (!existsSync(srcAbsPath)) return null;
  const dest = join(monthDir(month), relDest);
  ensure(dirname(dest));
  cpSync(srcAbsPath, dest);
  return dest;
}

/** List all months present in history, sorted ascending. */
export function listVersions() {
  if (!existsSync(HISTORY_DIR)) return [];
  return readdirSync(HISTORY_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}-\d{2}$/.test(d.name))
    .map((d) => d.name)
    .sort();
}

/** The most recent month strictly before `month` that has a snapshot. */
export function previousVersion(month) {
  const all = listVersions().filter((m) => m < month);
  return all.length ? all[all.length - 1] : null;
}

/** Load a stored artifact from a month snapshot (JSON). */
export function loadSnapshot(month, relPath, fallback = null) {
  return readJSON(join(monthDir(month), relPath), fallback);
}

// ---- Registry (index.json) --------------------------------------------------

export function readIndex() {
  return readJSON(INDEX, { framework: "Kwon-Soyoung v1.5", months: [] });
}

/**
 * Upsert a month's summary into the registry. `summary` should carry the
 * headline metrics needed for longitudinal comparison (question totals,
 * counts per layer, leading frame). Keeps months sorted ascending.
 */
export function updateIndex(month, summary) {
  const idx = readIndex();
  idx.months = idx.months.filter((m) => m.month !== month);
  idx.months.push({ month, ...summary });
  idx.months.sort((a, b) => a.month.localeCompare(b.month));
  idx.updatedAt = summary.date ?? month;
  writeJSON(INDEX, idx);
  return idx;
}

/** Longitudinal series for a given metric path across all months (for humans). */
export function series(metricKey) {
  return readIndex().months.map((m) => ({ month: m.month, value: m[metricKey] ?? null }));
}

export function monthPaths(month) {
  const d = monthDir(month);
  return {
    dir: d,
    meta: join(d, "meta.json"),
    freshRaw: join(d, "fresh/raw_questions.json"),
    freshCanonical: join(d, "fresh/canonical_questions.json"),
    accumulated: join(d, "dataset/canonical_accumulated.json"),
    ontology: join(d, "ontology/ontology_layer.json"),
    interpretation: join(d, "reasoning/interpretation.json"),
    manifest: join(d, "reasoning/research-manifest.json"),
    changeJson: join(d, "change-report.json"),
    changeMd: join(d, "change-report.md"),
    draftsDir: join(d, "research-drafts"),
  };
}
