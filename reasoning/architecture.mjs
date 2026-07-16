// =============================================================================
// Ask About Korea — Reasoning Architecture (executable specification)
// =============================================================================
//
// This file is the machine-readable mirror of the APPROVED reasoning
// architecture reverse-engineered from the constitutional document
// (docs/Kwon-Soyoung-Framework-v1.5.md). It does not redesign either the
// framework or the architecture; it encodes them so the engine can execute
// against them and so every produced field traces back to a section (§) of
// the constitution.
//
// The architecture has four stacked layers plus two cross-cutting forces:
//   L0 STANCE      — questions are assets / social infrastructure        (§1, §16)
//   L1 UNIT        — the unit of analysis is curiosity (the question)     (§2)
//   L2 LENSES      — five interpretive reading rules                      (§4)
//   L3 ESCALATION  — force every reading upward; floor at L4              (§5, §6, §7)
//   L4 GENERATION  — significance → system + participation + circulation  (§9, §13, §14)
//   ⟂ HUMAN–AI CUT — detection is AI; significance is human               (§12)
//   ↻ RETURN       — every output regenerates new questions               (§9, §14, §15)
//
// =============================================================================

/** The four stacked reasoning layers. Order is load-bearing. */
export const LAYERS = [
  { id: "L0", key: "stance", title: "Stance", section: "§1,§16",
    statement: "Optimize questions, not answers. A question is an asset and a form of social infrastructure." },
  { id: "L1", key: "unit", title: "Unit of analysis", section: "§2",
    statement: "Analyze curiosity — the question that exists before information. It reveals what the environment failed to provide." },
  { id: "L2", key: "lenses", title: "Interpretive lenses", section: "§4",
    statement: "Read every signal through five fixed lenses before drawing any conclusion." },
  { id: "L3", key: "escalation", title: "Escalation", section: "§5,§6,§7",
    statement: "Move every reading upward. No analysis may stop below Level 4." },
  { id: "L4", key: "generation", title: "Generation", section: "§9,§13,§14",
    statement: "Convert significance into system, participation, and circulation — which regenerate new questions." },
];

// -----------------------------------------------------------------------------
// L2 — The five interpretive lenses (§4·P1–P5)
//
// Each lens is split at the Human–AI boundary (§12): `detect` names the
// mechanical/perceptual observation an engine may compute; `judge` names the
// significance a human must supply. The engine fills `detect` only.
// -----------------------------------------------------------------------------
export const LENSES = [
  {
    id: "P1", key: "attentionVsUnderstanding", section: "§4·P1",
    rule: "Attention is not understanding.",
    detect: "Measure the attention a subject receives (volume, salience, reach).",
    judge: "Decide what understanding, if any, that attention produced.",
    keyQuestion: "What understanding did this attention produce?",
  },
  {
    id: "P2", key: "demandVsSupply", section: "§4·P2",
    rule: "Curiosity matters more than promotion — read demand, not supply.",
    detect: "Register the demand signal: this is being asked, at this volume, in these markets.",
    judge: "Decide what the world already wants to understand, and where supply is absent.",
    keyQuestion: "What does the world already want to understand?",
  },
  {
    id: "P3", key: "structureVsPattern", section: "§4·P3",
    rule: "Patterns are symptoms; structures are causes.",
    detect: "State the observed pattern.",
    judge: "Name the underlying structure that produces it.",
    keyQuestion: "What structure produces this pattern?",
  },
  {
    id: "P4", key: "systemic", section: "§4·P4",
    rule: "Every perception is systemic — map relationships, do not count.",
    detect: "Map the subject's relationships across the ontology (its concept→theme→narrative→perception path).",
    judge: "Interpret what the mapped system means.",
    keyQuestion: "What system of relationships does this belong to?",
  },
  {
    id: "P5", key: "institutional", section: "§4·P5",
    rule: "Every dataset contains institutional questions beneath informational ones.",
    detect: "Surface the literal, informational form of the question.",
    judge: "Restate it as its institutional question (who is responsible for helping people understand this?).",
    keyQuestion: "What missing responsibility does this question imply?",
  },
];

// -----------------------------------------------------------------------------
// L3 — The Escalation Ladder (§5) with its non-negotiable floor.
//
// `author` marks who may fill each rung under the Human–AI boundary.
// L1 is AI-detectable observation; L2–L5 require human significance.
// -----------------------------------------------------------------------------
export const LADDER = [
  { level: 1, key: "L1_observation", title: "Observation", author: "ai",
    prompt: "What is literally observed in the data?" },
  { level: 2, key: "L2_meaning", title: "Meaning", author: "human",
    prompt: "What does that observation mean?" },
  { level: 3, key: "L3_gap", title: "Gap", author: "human",
    prompt: "What gap does that meaning expose?" },
  { level: 4, key: "L4_strategic", title: "Strategic implication", author: "human",
    prompt: "What should change because of that gap?" },
  { level: 5, key: "L5_system", title: "System implication", author: "human",
    prompt: "What structure is missing that the gap implies?" },
];

/** The floor rule (§5): "No analysis should stop below Level 4." */
export const ESCALATION_FLOOR = 4;

// -----------------------------------------------------------------------------
// The two additional L3 escalation mechanisms.
// -----------------------------------------------------------------------------

/** Question-to-System (§6): a persistent question implies a missing system. */
export const QUESTION_TO_SYSTEM = {
  section: "§6",
  rule: "Every persistent question implies a missing system.",
  detect: "Measure persistence (recurrence, cross-market spread, variant volume).",
  judge: "Name the missing system the persistence diagnoses (never 'people are ignorant').",
};

/** Frame Competition (§7): national image is a contest between frames. */
export const FRAME_COMPETITION = {
  section: "§7",
  rule: "National image is a competition between perceptions, not an accumulation of content.",
  detect: "Rank frames (perceptions) by share of attention; report which frame currently leads.",
  judge: "Interpret the competition — which frame is displacing which, and whether that should change.",
  keyQuestion: "Which frame is winning?",
};

// -----------------------------------------------------------------------------
// L4 — The three-output generation gate (§13). All three are human-authored.
// -----------------------------------------------------------------------------
export const OUTPUT_GATE = [
  { key: "strategic", section: "§13", author: "human", question: "What should change?" },
  { key: "participation", section: "§13", author: "human", question: "Who should participate?" },
  { key: "system", section: "§13", author: "human", question: "What structure should exist?" },
];

// -----------------------------------------------------------------------------
// Ladder → Research-rung mapping.
//
// The escalation ladder maps onto the four existing research rungs
// (lib/research.ts). This is how completed interpretation records become
// research outputs (§13, §14) without inventing new research architecture.
// -----------------------------------------------------------------------------
export const RUNG_MAP = [
  { rung: 1, slug: "data-report", question: "What is there?", section: "§5·L1",
    sources: ["ladder.L1_observation", "provenance", "frameCompetition.detect"],
    machineReady: true,
    note: "Description. Assembled from AI-detected observation — the only rung the engine may complete." },
  { rung: 2, slug: "diplomacy-brief", question: "So what?", section: "§5·L2–L3",
    sources: ["ladder.L2_meaning", "ladder.L3_gap", "lenses.*.judge"],
    machineReady: false,
    note: "Interpretation. Awaits human significance (meaning + gap)." },
  { rung: 3, slug: "framework-paper", question: "Now what?", section: "§5·L4–L5,§13",
    sources: ["ladder.L4_strategic", "ladder.L5_system", "outputs.strategic", "outputs.system", "questionToSystem.judge"],
    machineReady: false,
    note: "Institutions. Awaits human strategic + system design." },
  { rung: 4, slug: "question-commons", question: "What if?", section: "§9,§10,§13",
    sources: ["outputs.participation", "circulation"],
    machineReady: false,
    note: "Ecosystem. Awaits human participation + circulation design." },
];

// -----------------------------------------------------------------------------
// Cross-cutting force — the return arrow (§9, §14, §15): every cycle ends by
// regenerating new questions, which re-enter L1. The engine may only surface
// *candidate* gaps (unclustered questions, thin-coverage concepts); authoring
// genuine new questions is human/participatory.
// -----------------------------------------------------------------------------
export const CIRCULATION = {
  section: "§9,§14,§15",
  rule: "Questions are renewable; the goal is regeneration, not resolution.",
  detect: "Surface candidate gaps: unclustered questions and thin-coverage concepts.",
  judge: "Author the new questions that re-enter the cycle (participatory).",
};

export const CONSTITUTION = "docs/Kwon-Soyoung-Framework-v1.5.md";
export const ARCHITECTURE_VERSION = "1.0";
