# Ask About Korea

**실제 질문, 신뢰할 수 있는 답변 · Real Questions. Reliable Answers.**

A living map of global curiosity about Korea. This is **not** a site that
introduces Korea — it explores a different question: *in the AI era, what does
the world actually ask about Korea?* It collects and visualizes real questions
from public search and discussion platforms, then organizes how global
curiosity is distributed.

> **MVP notice** — All category names, question counts, distributions,
> representative questions, answers, sources, and videos are **sample data**
> used for demonstration. Actual content will be generated from question data
> collected via Google and Reddit.

## Highlights

- **Living hero visualization** — an interactive, physics-driven knowledge
  graph of questions orbiting a central "한국?" hub (canvas, draggable nodes).
- **Korea Question Map** — a squarified treemap where each category's area
  reflects its share of questions. A modern, AI-era knowledge map, not a chart.
- **Category pages** — header with sample stats, introduction, and 3–5
  representative questions with short answers, sources, and related videos.
- **Bilingual** — Korean by default with a `한국어 | English` switcher; the
  English version mirrors the full structure.
- **Dark mode by default** (ideal for projection) with a light/dark toggle.
- **Refined motion** — subtle floating, scroll reveals, and micro-interactions.
- Fully **responsive**.

## Design

A balance of Anthropic (oversized typography, editorial calm), Perplexity
(question-first, exploration-driven UX), and Apple (premium minimalism).

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- shadcn/ui-style primitives (Button, Card, Badge)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev/) icons · [next-themes](https://github.com/pacocoursey/next-themes)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Project structure

```
app/
  layout.tsx            # fonts, metadata, providers
  page.tsx              # home: hero, about, sources, map, cards, flow
  category/[slug]/      # dynamic category pages (SSG)
components/
  site/                 # hero, question-graph, question-map, navbar, …
  ui/                   # button, card, badge
lib/
  data.ts               # sample categories & questions (ko/en)
  i18n.tsx              # language context + UI dictionary
  treemap.ts            # squarified treemap layout
```

## Roadmap (future implementation)

```
Google Search · People Also Ask · Autocomplete · Reddit
        ↓ collection → AI categorization → dedup
        ↓ category generation → distribution visualization → category pages
```

Real APIs are intentionally **not** wired up in this phase — the focus is a
polished, presentation-ready MVP.
