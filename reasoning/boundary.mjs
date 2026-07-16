// =============================================================================
// Human–AI Boundary (§12) — enforcement primitives
// =============================================================================
//
// The constitution places a hard cut between detection and valuation:
//
//   AI     → collection, translation, clustering, summarization,
//            visualization, pattern detection            ("what changed")
//   Human  → significance, interpretation, implication,
//            judgment, meaning, system design            ("why it matters")
//
//   "AI produces findings. Humans produce significance." (§12)
//
// Every value the engine emits is a *field* tagged with its rightful author.
// The engine is only ever permitted to fill AI-owned fields. Human-owned
// fields are emitted EMPTY, carrying the prompt a human must answer. The
// validators below make that invariant checkable — a boundary violation is a
// thrown error, not a silent overwrite.
// =============================================================================

export const AI = "ai";
export const HUMAN = "human";

/** An AI-owned field. The engine fills these — they are detection, not meaning. */
export function aiField(value, note) {
  return { author: AI, filled: value !== undefined && value !== null, value: value ?? null, ...(note ? { note } : {}) };
}

/** A human-owned field. The engine emits these EMPTY, carrying the prompt only. */
export function humanField(prompt, section) {
  return { author: HUMAN, filled: false, value: null, prompt, ...(section ? { section } : {}) };
}

/** A human field that has been answered by a person (used when merging worksheets). */
export function humanAnswer(field, value, by) {
  if (!field || field.author !== HUMAN) throw new Error("humanAnswer: target is not a human field");
  return { ...field, filled: true, value, ...(by ? { by } : {}) };
}

const isField = (v) => v && typeof v === "object" && "author" in v && "filled" in v;

/** Walk every field in a record tree, calling fn(field, path). */
export function walkFields(node, fn, path = "") {
  if (isField(node)) { fn(node, path); return; }
  if (Array.isArray(node)) { node.forEach((v, i) => walkFields(v, fn, `${path}[${i}]`)); return; }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walkFields(v, fn, path ? `${path}.${k}` : k);
  }
}

/**
 * Assert that a freshly produced engine record respects the boundary:
 *   - every AI-owned field is filled (the engine did its detection job), and
 *   - every HUMAN-owned field is empty (the engine did not fabricate meaning).
 * Throws on the first violation. This is the engine's self-proof.
 */
export function assertEngineBoundary(record) {
  const violations = [];
  walkFields(record, (f, path) => {
    if (f.author === HUMAN && f.filled) {
      violations.push(`boundary: engine filled human-owned field '${path}' (§12 forbids AI-authored significance)`);
    }
    if (f.author === AI && !f.filled) {
      violations.push(`incomplete: AI-owned field '${path}' was left empty (detection is the engine's job)`);
    }
  });
  if (violations.length) {
    throw new Error(`Human–AI boundary violated in record '${record.id ?? "?"}':\n  - ${violations.join("\n  - ")}`);
  }
  return true;
}

/** Count filled vs empty human fields — used to report how much significance a human still owes. */
export function significanceDebt(record) {
  let owed = 0, answered = 0;
  walkFields(record, (f) => {
    if (f.author === HUMAN) (f.filled ? answered++ : owed++);
  });
  return { owed, answered, total: owed + answered };
}
