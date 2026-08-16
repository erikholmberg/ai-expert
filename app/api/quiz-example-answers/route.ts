import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkRateLimit, rateLimitKeyFor } from "@/lib/rate-limit";
import { generateObject, gateway } from "ai";
import { z } from "zod/v4";

const ExampleAnswersSchema = z.object({
  examples: z
    .array(z.string())
    .length(3)
    .describe("Three distinct example interview answers"),
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
    const { topicTitle, topicContext, question, questionType } = await req.json();

    if (
      typeof question !== "string" ||
      !question.trim() ||
      typeof topicTitle !== "string" ||
      !["explain", "scenario", "compare"].includes(questionType)
    ) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const typeLabel =
      questionType === "explain"
        ? "explain a concept"
        : questionType === "scenario"
          ? "scenario / what would you do"
          : "compare and contrast";

    const { object } = await generateObject({
      model: gateway("openai/gpt-4o-mini"),
      schema: ExampleAnswersSchema,
      prompt: `You are an AI Product Manager interview coach.

Topic: ${topicTitle}
Topic summary (ground truth): ${topicContext ?? "(none)"}

Interview question (${typeLabel}): ${question}

Generate exactly 3 example answers a strong candidate might give in a live interview.
Requirements:
- Each answer should be different in structure or emphasis (e.g. one leads with tradeoffs, one uses a concrete story, one is concise and framework-first) but all should be plausible and correct.
- Each answer should be 3–7 sentences unless the question clearly calls for something shorter.
- Sound natural when spoken aloud, not like an essay or bullet list (prose paragraphs are fine).
- Do not reference "example 1" or "the three answers" — each string is standalone.`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Quiz example answers error:", error);
    return NextResponse.json(
      { error: "Failed to generate example answers" },
      { status: 500 }
    );
  }
}
