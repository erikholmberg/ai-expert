# AI Expert — Master Concepts for AI Product Managers

A Next.js web app that helps you master concepts for AI Product Managers through structured lessons, spaced repetition flashcards, AI-powered quizzes, and visual reference guides.

## Features

- **22-topic curriculum** across 4 pillars: Technical Foundations, AI Product Craft, Strategy & Business, and Safety, Ethics, and Governance
- **21 reference guides** — shorter, visual explainers (diagrams, tables, charts) for topics that don't fit a single quiz question
- **Learn Mode** — Read through structured lessons with key takeaways
- **Review Mode** — Spaced repetition flashcards using the SM-2 algorithm (159 cards)
- **Quiz Mode** — LLM-generated interview-style questions with AI-evaluated free-text answers
- **Bookmarks** — Save specific sections of a lesson for later
- **Progress tracking** — Track completed topics, quiz scores, and overall mastery
- **No account required** — the app works entirely as a guest; progress is saved in your browser's local storage. There's no sign-in flow, so it also runs with no database configured at all
- **Dark mode** — Toggle between light and dark themes

## Getting Started

```bash
# Install dependencies
npm install

# Copy the env example
cp .env.example .env.local
```

Edit `.env.local` and set:
- `AUTH_SECRET` — any random string (e.g. `openssl rand -base64 32`). Sign-in is disabled in the UI, but Auth.js still initializes on every request and throws without this set.
- `AI_GATEWAY_API_KEY` — see [AI Gateway Setup](#ai-gateway-setup) below, needed for quiz generation and answer evaluation.

`AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, and `DATABASE_URL` can be left blank — they're unused while sign-in is disabled.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning. No database setup is required — the app runs fully in guest mode, with progress saved to `localStorage`.

## AI Gateway Setup

Quiz generation and answer evaluation use the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) for LLM access. You need an API key:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **AI Gateway** → **API Keys**
3. Create a key and add it to `.env.local` as `AI_GATEWAY_API_KEY`

The app uses `openai/gpt-4o-mini` by default. You can change the model in `app/api/quiz/route.ts`, `app/api/evaluate/route.ts`, `app/api/post-lesson-mcq/route.ts`, and `app/api/quiz-example-answers/route.ts`. These routes are rate-limited per IP to guard against abuse from anonymous guest traffic (see `lib/rate-limit.ts`).

## Database (optional)

The app doesn't require a database to run — guest progress lives entirely in the browser. `DATABASE_URL` and the `/api/progress` route exist for a cross-device sync path (Postgres, tested against Supabase), but sign-in is currently disabled in the UI, so that path isn't reachable in the shipped app. If you want to re-enable it, the schema is in `db/migrations/001_user_progress.sql`, and `lib/db.ts` expects a standard Postgres connection string.

## Curriculum

| Pillar | Topics |
|--------|--------|
| Technical Foundations | ML Fundamentals, Deep Learning, NLP & LLMs, Foundation Models & RAG, Computer Vision, Recommender Systems, Agentic AI |
| AI Product Craft | AI Product Design, Human-in-the-Loop, AI Evaluation & Metrics, Prompt Engineering, AI UX Patterns |
| Strategy & Business | AI Product Strategy, Business Cases & ROI, Data Strategy, MLOps |
| Safety, Ethics, and Governance | AI Safety & Alignment, Ethics & Bias, Regulation & Compliance, Explainability & Interpretability, AI IP & Copyright, Responsible AI |

## Guides

Shorter visual references that don't warrant a full lesson + quiz — model selection, prompt & policy design, RAG vs fine-tuning vs prompt-only, retrieval architecture, evaluation strategy, pricing & unit economics, caching & request shaping, embeddings vs keyword search, latency & streaming UX, agent boundaries & HITL, tool & integration design, hallucination & grounding, AI security basics, AI governance & data lifecycle, observability, experimentation & rollout, multi-tenant AI SaaS, vendor & routing strategy, working with ML teams, synthetic data & augmentation, and model monitoring & drift.

## Tech Stack

- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **Vercel AI SDK** with AI Gateway
- **Postgres** (via `pg`, tested against Supabase) for the optional progress-sync path
- **SM-2** spaced repetition algorithm

## Keyboard Shortcuts

In Review mode:
- **Space / Enter** — Flip card
- **1** — Again (forgot)
- **2** — Hard
- **3** — Good
- **4** — Easy
