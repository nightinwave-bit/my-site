/**
 * Ask About Korea — Research Data Schema (design)
 * ------------------------------------------------
 * Type definitions for the full research data architecture. This file is a
 * DESIGN ARTIFACT: it is intentionally NOT imported by the running website.
 * It defines the contract that a future backend (database + ingestion +
 * generation jobs) will implement.
 *
 * The website today reads a small projection of this model — see the
 * `GraphReadModel` / `PathwayReadModel` types at the bottom, which mirror the
 * shape produced by `lib/ontology.ts::buildGraph()`. Because the site consumes
 * ONLY that read model, real data can replace the current sample data without
 * changing any component.
 *
 * See docs/ARCHITECTURE.md for the accompanying diagrams and rationale.
 */

// ── Primitives ─────────────────────────────────────────────────────────────
export type ID = string; // stable slug ("c_soft_power") or UUID
export type ISODate = string; // RFC 3339, e.g. "2026-07-15T00:00:00Z"
export type Locale = "ko" | "en";
export type Localized = { ko: string; en: string };

/** Ontology layers. The graph flows question → concept → theme → narrative →
 *  perception; "perception" is added here for the full model. */
export type NodeType =
  | "question"
  | "concept"
  | "theme"
  | "narrative"
  | "perception";

/** Source platforms. Open union — new platforms are added as string literals
 *  without a schema migration. */
export type SourcePlatform =
  | "google_search"
  | "google_paa"
  | "google_autocomplete"
  | "reddit"
  | (string & {});

export type SourceType =
  | "search"
  | "autocomplete"
  | "related_question"
  | "forum"
  | (string & {});

// ── PART 6 · Source layer ──────────────────────────────────────────────────
export interface Source {
  id: ID;
  name: string; // "Google People Also Ask"
  platform: SourcePlatform; // "google_paa"
  type: SourceType;
  active: boolean;
  createdAt: ISODate;
}

/** Provenance join: one question can be seen on many sources; one source
 *  yields many questions. Frequency + origin are recorded PER observation. */
export interface QuestionSource {
  id: ID;
  questionId: ID;
  sourceId: ID;
  collectedAt: ISODate;
  frequency: number; // occurrences seen in this collection window
  questionOrigin: string; // raw query / thread title as observed
  sourceUrl?: string;
}

// ── PART 1 · Question ───────────────────────────────────────────────────────
export type QuestionStatus =
  | "new" // collected, not yet mapped
  | "mapped" // linked into the ontology
  | "observed" // AI answers observed
  | "published" // has published content
  | "archived";

export interface Question {
  id: ID;
  text: Localized;
  language: Locale; // language the question was asked in
  region?: string; // ISO-3166 country/region of demand, if known
  categoryId?: ID; // optional coarse category (derived, not the ontology)
  primarySource: SourcePlatform; // dominant source
  sourceType: SourceType;
  collectedAt: ISODate;
  frequencyScore: number; // normalized demand signal (0–1)
  status: QuestionStatus;
  relatedQuestionIds?: ID[]; // convenience cache; source of truth = Edge
  createdAt: ISODate;
  updatedAt: ISODate;
}

// ── PART 3 · Ontology nodes + edges ────────────────────────────────────────
/** Unified node record for concept/theme/narrative/perception (and a mirror
 *  row for each question, type="question"). Keeping one node table lets edges
 *  be fully generic and many-to-many. */
export interface OntologyNode {
  id: ID;
  type: NodeType;
  label: Localized;
  blurb?: Localized;
  createdAt: ISODate;
  updatedAt: ISODate;
}

/** Typed relationship verbs — the "ontology" signal (not a taxonomy). */
export type RelationType =
  | "asks_about"
  | "explained_by"
  | "practiced_as"
  | "recognized_by"
  | "expresses"
  | "caused"
  | "materialized_as"
  | "situated_in"
  | "driver_of"
  | "gateway_to"
  | "instrument_of"
  | "produces"
  | "converges_on" // theme/narrative → perception
  | "related_to" // question ↔ question
  | (string & {});

export type EdgeProvenance =
  | "manual" // curator-authored
  | "co_occurrence" // derived from shared sources/sessions
  | "ai_cluster" // proposed by clustering / extraction
  | "imported";

/** The relationship spine. Layer rules (question→concept→theme→narrative→
 *  perception, plus question↔question) are enforced in the generation layer,
 *  not the DB, so the structure never has to change to add a relation kind. */
export interface Edge {
  id: ID;
  fromId: ID;
  toId: ID;
  relation: RelationType;
  weight: number; // 0–1 strength (frequency- or AI-derived)
  provenance: EdgeProvenance;
  createdAt: ISODate;
  updatedAt: ISODate;
}

// ── PART 2 · AI Answer Observation ─────────────────────────────────────────
// The platform OBSERVES AI-generated answers. It does not evaluate, score, or
// rank AI systems. There are deliberately no score / grade / rating fields.
export type AIProvider =
  | "chatgpt"
  | "gemini"
  | "claude"
  | "perplexity"
  | (string & {});

/** One captured observation of a single provider's answer about a node. */
export interface AIAnswerRecord {
  id: ID;
  observationId: ID;
  provider: AIProvider;
  capturedAt: ISODate;
  modelVersion?: string; // e.g. "gpt-4o-2026-xx" — descriptive only
  answerSummary: Localized; // neutral paraphrase of what was said
  notes?: Localized;
}

/** A dated observation about how AI systems currently explain a node. */
export interface AIAnswerObservation {
  id: ID;
  targetId: ID; // usually a concept, sometimes a question/theme
  targetType: NodeType;
  observedAt: ISODate;
  summary: Localized; // neutral synthesis across providers
  observedSimilarities: Localized[]; // where providers align
  observedDifferences: Localized[]; // where they diverge
  observedInformationGaps: Localized[]; // what appears thin or missing
  notes?: Localized;
  answers: AIAnswerRecord[]; // per-provider captures (N providers)
}

// ── PART 4 · Content layer ─────────────────────────────────────────────────
export type WorkflowStatus =
  | "not_started"
  | "drafting"
  | "in_review"
  | "ready"
  | "needs_update";

export type VerificationStatus = "unverified" | "in_progress" | "verified";
export type PublicationStatus = "unpublished" | "scheduled" | "published";

export interface MediaRef {
  type: "video" | "image" | "dataset" | "link";
  url: string;
  title?: Localized;
}

export interface Content {
  id: ID;
  nodeId: ID; // the ontology node this resource supports
  nodeType: NodeType;
  contentStatus: WorkflowStatus;
  articleStatus: WorkflowStatus;
  sourceVerificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  lastUpdated: ISODate;
  body?: Localized;
  relatedSourceIds: ID[];
  relatedMedia: MediaRef[];
}

// ── PART 5 · SEO / AEO / AIO layer ─────────────────────────────────────────
export type OptStatus = "not_started" | "in_progress" | "complete";

export interface OptimizationProfile {
  id: ID;
  contentId: ID;
  seoStatus: OptStatus; // classic search optimization
  aeoStatus: OptStatus; // Answer Engine Optimization
  aioStatus: OptStatus; // AI Information / Answer Optimization
  title: Localized;
  metaDescription: Localized;
  faqStatus: OptStatus;
  schemaStatus: OptStatus; // structured data / JSON-LD
  internalLinkingStatus: OptStatus;
  aiReadinessStatus: OptStatus;
  updatedAt: ISODate;
}

// ── PART 7 · Ingestion (staging + provenance) ──────────────────────────────
/** Raw record emitted by a source connector, before normalization. */
export interface RawQuestion {
  connector: SourcePlatform;
  rawText: string;
  language?: Locale;
  region?: string;
  sourceUrl?: string;
  observedFrequency?: number;
  capturedAt: ISODate;
  raw: Record<string, unknown>; // untouched payload for audit
}

export interface IngestionRun {
  id: ID;
  sourceId: ID;
  startedAt: ISODate;
  finishedAt?: ISODate;
  status: "running" | "succeeded" | "failed";
  rawCount: number;
  normalizedCount: number;
  upsertedCount: number;
  notes?: string;
}

/** Every source implements this. Adding a new API = new connector + register;
 *  no schema, pipeline, or frontend change. */
export interface SourceConnector {
  platform: SourcePlatform;
  collect(params: {
    query?: string;
    region?: string;
    since?: ISODate;
    limit?: number;
  }): Promise<RawQuestion[]>;
}

// ── Read model (the stable frontend contract) ──────────────────────────────
// This is the ONLY shape the website consumes. It is generated from the tables
// above by a build/publish job and mirrors lib/ontology.ts::buildGraph().
export interface Evidence {
  q: Localized;
  platform: "google" | "paa" | "autocomplete" | "reddit";
}

export interface GraphNodeReadModel {
  id: ID;
  type: NodeType;
  label: Localized;
  blurb?: Localized;
  evidence?: Evidence[];
}

export interface GraphEdgeReadModel {
  from: ID;
  to: ID;
  relation?: Localized; // localized verb for display
  weight?: number;
}

export interface PathwayReadModel {
  id: ID;
  title: Localized;
  themeLabel: Localized;
  steps: { nodeId: ID; verb?: Localized }[];
}

export interface GraphReadModel {
  generatedAt: ISODate;
  nodes: GraphNodeReadModel[];
  edges: GraphEdgeReadModel[];
  pathways: PathwayReadModel[];
}
