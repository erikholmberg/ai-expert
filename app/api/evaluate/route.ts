import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkRateLimit, rateLimitKeyFor } from "@/lib/rate-limit";
import { generateObject, gateway } from "ai";
import { z } from "zod/v4";

const EvaluationSchema = z.object({
  score: z.number().min(1).max(5),
  feedback: z.string(),
  modelAnswer: z.string(),
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
    const { question, answer, topicTitle, topicContext } = await req.json();

    const { object } = await generateObject({
      model: gateway("openai/gpt-4o-mini"),
      schema: EvaluationSchema,
      prompt: `You are an experienced AI Product Manager interviewer evaluating a candidate's answer.

Topic: ${topicTitle}
Context: ${topicContext}

Question: ${question}

Candidate's Answer: ${answer}

Evaluate the answer on a scale of 1-5:
1 = Fundamentally incorrect or missing key concepts
2 = Shows basic awareness but significant gaps
3 = Adequate understanding with some gaps
4 = Strong answer with minor improvements possible
5 = Excellent, comprehensive answer

Provide:
- score: 1-5 rating
- feedback: 2-3 sentences of constructive feedback highlighting what was good and what could be improved. Be encouraging but honest.
- modelAnswer: A concise but thorough model answer (3-5 sentences) that the candidate can learn from.`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}
