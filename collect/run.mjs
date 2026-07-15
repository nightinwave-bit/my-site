#!/usr/bin/env node
// Ask About Korea — Stage 100 collection runner.
//
// Usage:
//   node run.mjs                 # auto: try live, fall back to offline fixtures
//   node run.mjs --mode offline  # deterministic, uses fixtures/ (no network)
//   node run.mjs --mode live      # unofficial Autocomplete + (with key) PAA
//   SERPAPI_KEY=... node run.mjs --mode live   # enables live People Also Ask
//
// Outputs to collect/output/: raw_questions.json, canonical_questions.json,
// collection_report.md. This workspace is entirely separate from the website.

import { runPipeline } from "./src/pipeline.mjs";
import { _fetchLiveAutocomplete } from "./src/sources/autocomplete.mjs";

function parseArgs(argv) {
  const args = { mode: "auto" };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--mode") args.mode = argv[++i];
  }
  return args;
}

async function liveReachable() {
  const probe = await _fetchLiveAutocomplete("korea", { gl: "us", hl: "en" });
  return probe.length > 0;
}

async function main() {
  const { mode: requested } = parseArgs(process.argv);
  const date = (process.env.AAK_DATE || new Date().toISOString().slice(0, 10));

  let mode = requested;
  if (requested === "auto") {
    process.stdout.write("Probing live endpoints… ");
    const ok = await liveReachable();
    mode = ok ? "live" : "offline";
    console.log(ok ? "reachable → live mode" : "unreachable → offline mode");
  }

  console.log(`\n▶ Stage 100 collection — mode: ${mode}\n`);
  const result = await runPipeline({ mode, date, log: (m) => console.log(m) });

  console.log("\n── Summary ─────────────────────────────");
  console.log(`  raw collected : ${result.raw}`);
  console.log(`  quarantined   : ${result.quarantined}`);
  console.log(`  in scope      : ${result.inScope}`);
  console.log(`  canonical     : ${result.canonical}`);
  console.log(`  output dir    : ${result.outDir}`);
  console.log("────────────────────────────────────────");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
