import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkRateLimit, rateLimitKeyFor } from "@/lib/rate-limit";
import { generateObject, gateway } from "ai";
import { z } from "zod/v4";

const QuizResponseSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      type: z.enum(["explain", "scenario", "compare"]),
    })
  ),
});

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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
    const { topicTitle, sections, quizPrompts } = await req.json();

    const sectionSummary = sections
      .map((s: { heading: string; keyTakeaway: string }) => `- ${s.heading}: ${s.keyTakeaway}`)
      .join("\n");

    const { object } = await generateObject({
      model: gateway("openai/gpt-4o-mini"),
      schema: QuizResponseSchema,
      prompt: `You are an AI Product Manager interview coach. Generate 4 quiz questions for the topic "${topicTitle}".

The topic covers:
${sectionSummary}

Use these as inspiration (but create varied, original questions):
${quizPrompts.map((p: string) => `- ${p}`).join("\n")}

Requirements:
- Generate exactly 4 questions
- Include a mix of types: "explain" (explain a concept), "scenario" (given a situation, what would you do), and "compare" (compare two approaches)
- Questions should test deep understanding, not just recall
- Frame questions as an interviewer would ask them
- Vary difficulty from intermediate to advanced`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz questions" },
      { status: 500 }
    );
  }
}
