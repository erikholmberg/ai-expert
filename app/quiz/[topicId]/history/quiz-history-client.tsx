"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { QuizAttempt } from "@/lib/types";
import { getProgress, getTopicProgress } from "@/lib/progress-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FlaskConical,
  Loader2,
  TrendingDown,
  XCircle,
} from "lucide-react";

interface QuizHistoryClientProps {
  topicId: string;
  topicTitle: string;
}

function formatAttemptDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function QuestionScoreBadge({ score }: { score: number }) {
  if (score >= 4) {
    return (
      <Badge className="shrink-0 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        {score}/5
      </Badge>
    );
  }
  if (score >= 3) {
    return (
      <Badge className="shrink-0 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        <AlertCircle className="mr-1 h-3 w-3" />
        {score}/5
      </Badge>
    );
  }
  return (
    <Badge className="shrink-0 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
      <XCircle className="mr-1 h-3 w-3" />
      {score}/5
    </Badge>
  );
}

export function QuizHistoryClient({ topicId, topicTitle }: QuizHistoryClientProps) {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getProgress()
      .then((p) => {
        if (cancelled) return;
        const tp = getTopicProgress(p, topicId);
        const sorted = [...tp.quizAttempts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setAttempts(sorted);
        setBestScore(tp.bestQuizScore);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load quiz history.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  const weakestQuestions = useMemo(() => {
    type Row = { question: string; score: number; date: string };
    const rows: Row[] = [];
    for (const att of attempts) {
      for (const q of att.questions) {
        if (q.score <= 2) {
          rows.push({ question: q.question, score: q.score, date: att.date });
        }
      }
    }
    const byPrompt = new Map<string, Row>();
    for (const r of rows) {
      const prev = byPrompt.get(r.question);
      if (!prev || r.score < prev.score) byPrompt.set(r.question, r);
    }
    return Array.from(byPrompt.values())
      .sort(
        (a, b) =>
          a.score - b.score ||
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 10);
  }, [attempts]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Quiz score history</h1>
            <p className="mt-1 text-muted-foreground">{topicTitle}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link href={`/quiz/${topicId}`}>
              <Button size="sm" variant="outline">
                <FlaskConical className="mr-1 h-3.5 w-3.5" />
                Take quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-16 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="mt-3 text-sm">Loading history…</p>
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && attempts.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            <p>No completed quizzes for this topic yet.</p>
            <Link href={`/quiz/${topicId}`} className="mt-4 inline-block">
              <Button size="sm">
                <FlaskConical className="mr-1 h-4 w-4" />
                Start a quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!loading && !error && attempts.length > 0 && (
        <>
          {bestScore > 0 && (
            <p className="mb-4 text-sm text-muted-foreground">
              Best average score:{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {bestScore.toFixed(1)}/5
              </span>
              <span className="mx-1.5">·</span>
              <span className="tabular-nums">{attempts.length}</span> attempt
              {attempts.length === 1 ? "" : "s"}
            </p>
          )}

          {weakestQuestions.length > 0 && (
            <Card className="mb-6 border-amber-200/80 bg-amber-50/50 dark:border-amber-900/60 dark:bg-amber-950/25">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2 pt-4">
                <TrendingDown className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                <p className="text-sm font-semibold text-foreground">
                  Worth another look
                </p>
              </CardHeader>
              <CardContent className="space-y-3 pb-4 pt-0">
                <p className="text-xs text-muted-foreground">
                  Questions where you scored 2/5 or below (most recent low score per prompt).
                </p>
                <ul className="space-y-2">
                  {weakestQuestions.map((w, wi) => (
                    <li
                      key={wi}
                      className="rounded-md border border-border/60 bg-background/80 px-3 py-2 text-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="leading-snug text-foreground">{w.question}</span>
                        <Badge variant="outline" className="shrink-0 tabular-nums text-xs">
                          {w.score}/5
                        </Badge>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Last seen {formatAttemptDate(w.date)}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link href={`/quiz/${topicId}`}>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    <FlaskConical className="mr-1 h-3.5 w-3.5" />
                    Retake quiz to practice
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <ol className="space-y-4">
            {attempts.map((attempt, attemptIdx) => (
              <li key={`${attempt.date}-${attemptIdx}`}>
                <Card>
                  <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0 pb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {formatAttemptDate(attempt.date)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.questions.length} question
                        {attempt.questions.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 tabular-nums text-sm font-semibold">
                      Avg {attempt.averageScore.toFixed(1)}/5
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {attempt.questions.map((q, qi) => (
                      <details
                        key={qi}
                        className="group rounded-lg border border-border/80 bg-muted/20 open:bg-muted/35"
                      >
                        <summary className="cursor-pointer list-none px-3 py-2.5 [&::-webkit-details-marker]:hidden">
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-sm font-medium leading-snug pr-2">
                              Q{qi + 1}: {q.question}
                            </span>
                            <QuestionScoreBadge score={q.score} />
                          </div>
                          <span className="mt-1 block text-xs text-muted-foreground group-open:hidden">
                            Tap to expand answer, feedback, and model answer
                          </span>
                        </summary>
                        <div className="space-y-3 border-t border-border/60 px-3 pb-3 pt-3 text-sm">
                          <div>
                            <p className="mb-1 text-xs font-medium text-muted-foreground">Your answer</p>
                            <p className="whitespace-pre-wrap leading-relaxed">{q.answer || "—"}</p>
                          </div>
                          <Separator />
                          <div>
                            <p className="mb-1 text-xs font-medium text-muted-foreground">Feedback</p>
                            <p className="whitespace-pre-wrap leading-relaxed">{q.feedback}</p>
                          </div>
                          <div className="rounded-md bg-muted p-3">
                            <p className="mb-1 text-xs font-medium text-muted-foreground">Model answer</p>
                            <p className="whitespace-pre-wrap leading-relaxed">{q.modelAnswer}</p>
                          </div>
                        </div>
                      </details>
                    ))}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
