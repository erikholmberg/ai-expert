# AI Expert — Master Concepts for AI Product Managers

A Next.js web app that helps you master concepts for AI Product Managers through structured lessons, spaced repetition flashcards, and AI-powered quizzes.

## Features

- **20-topic curriculum** across 4 pillars: Technical Foundations, AI Product Craft, Strategy & Business, and Safety/Ethics/Governance
- **Learn Mode** — Read through structured lessons with key takeaways
- **Review Mode** — Spaced repetition flashcards using the SM-2 algorithm (145 cards)
- **Quiz Mode** — LLM-generated interview questions with AI-evaluated free-text answers
- **Progress tracking** — Track completed topics, quiz scores, and overall mastery
- **Dark mode** — Toggle between light and dark themes

## Getting Started

```bash
# Install dependencies
npm install

# Copy the env example and add your API key
cp .env.local.example .env.local
# Edit .env.local and add your Vercel AI Gateway API key

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning.

## AI Gateway Setup

The quiz feature uses the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) for LLM access. You need an API key:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **AI Gateway** → **API Keys**
3. Create a key and add it to `.env.local` as `AI_GATEWAY_API_KEY`

The app uses `openai/gpt-4o-mini` by default. You can change the model in `app/api/quiz/route.ts` and `app/api/evaluate/route.ts`.

## Curriculum

| Pillar | Topics |
|--------|--------|
| Technical Foundations | ML Fundamentals, Deep Learning, NLP & LLMs, Foundation Models & RAG, Computer Vision, Recommender Systems, Agentic AI |
| AI Product Craft | AI Product Design, Human-in-the-Loop, AI Evaluation & Metrics, Prompt Engineering, AI UX Patterns |
| Strategy & Business | AI Product Strategy, Business Cases & ROI, Data Strategy, MLOps |
| Safety & Governance | AI Safety & Alignment, Ethics & Bias, Regulation & Compliance, Responsible AI |

## Tech Stack

- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **Vercel AI SDK** with AI Gateway
- **SM-2** spaced repetition algorithm

## Keyboard Shortcuts

In Review mode:
- **Space / Enter** — Flip card
- **1** — Again (forgot)
- **2** — Hard
- **3** — Good
- **4** — Easy
