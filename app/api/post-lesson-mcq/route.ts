import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkRateLimit, rateLimitKeyFor } from "@/lib/rate-limit";
import { generateObject, gateway } from "ai";
import { z } from "zod/v4";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const PostLessonMcqSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string(),
        choices: z.array(z.string()).length(4),
        correctIndex: z.number().int().min(0).max(3),
        explanation: z.string(),
      })
    )
    .length(2),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const { key, limit } = rateLimitKeyFor(req, session?.user?.id);
  const rate = checkRateLimit(key, limit, RATE_LIMIT_WINDOW_MS);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests — please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const topicTitle = typeof body.topicTitle === "string" ? body.topicTitle : "";
    const sections = Array.isArray(body.sections) ? body.sections : [];

    const sectionSummary = sections
      .map(
        (s: { heading?: string; keyTakeaway?: string }) =>
          `- ${String(s.heading ?? "")}: ${String(s.keyTakeaway ?? "")}`
      )
      .join("\n");

    const { object } = await generateObject({
      model: gateway("openai/gpt-4o-mini"),
      schema: PostLessonMcqSchema,
      prompt: `You are an AI Product Manager interview coach. Generate exactly 2 multiple-choice comprehension questions for the topic "${topicTitle}".

The learner just finished this material (headings and key takeaways only — stay faithful to these ideas; do not invent facts not implied below):
${sectionSummary || "(no sections provided)"}

Requirements:
- Exactly 4 choices per question; one clearly best answer (correctIndex 0–3).
- Distractors must be plausible for a PM interview but clearly wrong when compared to the key ideas above.
- Questions test understanding suitable for an interview (tradeoffs, when to use X, what Y means), not trivia about wording.
- explanation: 2–4 sentences why the correct answer is right (and optionally why common wrong picks fail).`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Post-lesson MCQ generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate check-in questions" },
      { status: 500 }
    );
  }
}
