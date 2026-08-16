"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ProgressState } from "@/lib/types";
import { getProgress, getTopicProgress } from "@/lib/progress-client";
import { getDueCards, createNewCardState } from "@/lib/srs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Brain,
  FlaskConical,
  CheckCircle2,
  Clock,
  History,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface TopicData {
  id: string;
  title: string;
  pillar: string;
  order: number;
  flashcardCount: number;
  flashcardIds: string[];
}

interface DashboardClientProps {
  topicData: TopicData[];
  pillarOrder: string[];
}

const PILLAR_ICONS: Record<string, string> = {
  "Technical Foundations": "🔧",
  "AI Product Craft": "🎨",
  "Strategy and Business": "📊",
  "Safety, Ethics, and Governance": "🛡️",
};

function formatRelativeNextReview(d: Date): string {
  const diffMs = d.getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const minutes = Math.round(diffMs / 60000);
  if (Math.abs(minutes) < 120) return rtf.format(minutes, "minute");
  const hours = Math.round(diffMs / 3600000);
  if (Math.abs(hours) < 72) return rtf.format(hours, "hour");
  const days = Math.round(diffMs / 86400000);
  return rtf.format(days, "day");
}

function getTopicStatus(
  progress: ProgressState | null,
  topic: TopicData
): "not-started" | "in-progress" | "completed" {
  if (!progress) return "not-started";
  const tp = progress.topics[topic.id];
  if (!tp) return "not-started";
  if (tp.completed) return "completed";
  return "in-progress";
}

export function DashboardClient({ topicData, pillarOrder }: DashboardClientProps) {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [dueCount, setDueCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProgress().then((p) => {
      setProgress(p);

      const allCardIds = topicData.flatMap((t) => t.flashcardIds);
      for (const cardId of allCardIds) {
        if (!p.cards[cardId]) {
          const topicId = topicData.find((t) =>
            t.flashcardIds.includes(cardId)
          )?.id;
          if (topicId) {
            p.cards[cardId] = createNewCardState(cardId, topicId);
          }
        }
      }
      const due = getDueCards(p.cards);
      setDueCount(due.length);
      setLoading(false);
    });
  }, [topicData]);

  const completedCount = progress
    ? topicData.filter((t) => progress.topics[t.id]?.completed).length
    : 0;

  const totalFlashcards = topicData.reduce((s, t) => s + t.flashcardCount, 0);

  const quizAttemptCount = progress
    ? Object.values(progress.topics).reduce(
        (s, tp) => s + tp.quizAttempts.length,
        0
      )
    : 0;

  const avgQuizScore = progress
    ? (() => {
        const scores = Object.values(progress.topics)
          .filter((tp) => tp.bestQuizScore > 0)
          .map((tp) => tp.bestQuizScore);
        return scores.length > 0
          ? scores.reduce((s, v) => s + v, 0) / scores.length
          : 0;
      })()
    : 0;

  const mastery = Math.round(
    ((completedCount / topicData.length) * 40 +
      (avgQuizScore / 5) * 60) *
      (completedCount > 0 ? 1 : 0)
  );

  const grouped: Record<string, TopicData[]> = {};
  for (const t of topicData) {
    if (!grouped[t.pillar]) grouped[t.pillar] = [];
    grouped[t.pillar].push(t);
  }

  const nextFlashcardDue = useMemo(() => {
    if (!progress || dueCount > 0) return null;
    const ids = topicData.flatMap((t) => t.flashcardIds);
    let minMs: number | null = null;
    const now = Date.now();
    for (const id of ids) {
      const c = progress.cards[id];
      if (!c) continue;
      const t = new Date(c.nextReview).getTime();
      if (t <= now) continue;
      if (minMs === null || t < minMs) minMs = t;
    }
    return minMs === null ? null : new Date(minMs);
  }, [progress, dueCount, topicData]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Expert</h1>
        <p className="mt-1 text-muted-foreground">
          Master concepts for AI Product Managers
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {loading ? "—" : `${completedCount}/${topicData.length}`}
              </p>
              <p className="text-xs text-muted-foreground">Topics Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-950">
              <Brain className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {loading ? "—" : dueCount}
              </p>
              <p className="text-xs text-muted-foreground">Cards Due</p>
              {!loading && dueCount === 0 && nextFlashcardDue && (
                <p className="mt-1 max-w-[11rem] text-[11px] leading-snug text-muted-foreground">
                  Next card {formatRelativeNextReview(nextFlashcardDue)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950">
              <FlaskConical className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {loading ? "—" : quizAttemptCount}
              </p>
              <p className="text-xs text-muted-foreground">Quizzes Taken</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-950">
              <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {loading ? "—" : `${mastery}%`}
              </p>
              <p className="text-xs text-muted-foreground">Mastery</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {dueCount > 0 && (
        <Card className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-500/45 dark:bg-[oklch(0.28_0.056_74)] dark:ring-1 dark:ring-amber-400/35 dark:shadow-lg dark:shadow-black/40">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-medium">
                  {dueCount} flashcard{dueCount !== 1 ? "s" : ""} due for review
                </p>
                <p className="text-sm text-muted-foreground">
                  Regular review helps you retain what you&apos;ve learned
                </p>
              </div>
            </div>
            <Link href="/review">
              <Button>
                Start Review <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="space-y-8">
        {pillarOrder.map((pillar) => {
          const topics = grouped[pillar] || [];
          if (topics.length === 0) return null;
          const pillarCompleted = topics.filter(
            (t) => getTopicStatus(progress, t) === "completed"
          ).length;

          return (
            <section key={pillar}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span>{PILLAR_ICONS[pillar]}</span>
                  {pillar}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {pillarCompleted}/{topics.length} completed
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {topics.map((topic) => {
                  const status = getTopicStatus(progress, topic);
                  const tp = progress?.topics[topic.id];
                  const bestScore = tp?.bestQuizScore || 0;
                  const quizHistoryCount = tp?.quizAttempts?.length ?? 0;

                  return (
                    <Card
                      key={topic.id}
                      className="group transition-all hover:shadow-md"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-medium leading-tight">
                            {topic.title}
                          </h3>
                          {status === "completed" ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          ) : status === "in-progress" ? (
                            <Sparkles className="h-4 w-4 shrink-0 text-blue-500" />
                          ) : null}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <span>{topic.flashcardCount} cards</span>
                          {bestScore > 0 && (
                            <>
                              <span>·</span>
                              <span>Best quiz: {bestScore.toFixed(1)}/5</span>
                            </>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Link href={`/learn/${topic.id}`} className="min-w-0 flex-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <BookOpen className="mr-1 h-3 w-3" />
                              {status === "completed" ? "Review" : "Learn"}
                            </Button>
                          </Link>
                          <Link href={`/quiz/${topic.id}`}>
                            <Button variant="outline" size="sm">
                              <FlaskConical className="mr-1 h-3 w-3" />
                              Quiz
                            </Button>
                          </Link>
                          {quizHistoryCount > 0 && (
                            <Link href={`/quiz/${topic.id}/history`}>
                              <Button variant="outline" size="sm">
                                <History className="mr-1 h-3 w-3" />
                                History
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
