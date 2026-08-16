"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GeneratedQuestion, EvaluationResult, TopicSection } from "@/lib/types";
import { getProgress, saveProgress, addQuizAttempt } from "@/lib/progress-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  FlaskConical,
  Loader2,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  History,
  Lightbulb,
} from "lucide-react";

interface QuizClientProps {
  topicId: string;
  topicTitle: string;
  topicContext: string;
  sections: TopicSection[];
  quizPrompts: string[];
}

type QuizState = "loading" | "answering" | "evaluating" | "reviewed" | "complete";

interface AnsweredQuestion {
  question: GeneratedQuestion;
  answer: string;
  evaluation: EvaluationResult;
}

function ScoreBadge({ score }: { score: number }) {
  if (score >= 4) return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 className="mr-1 h-3 w-3" />{score}/5</Badge>;
  if (score >= 3) return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"><AlertCircle className="mr-1 h-3 w-3" />{score}/5</Badge>;
  return <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"><XCircle className="mr-1 h-3 w-3" />{score}/5</Badge>;
}

export function QuizClient({
  topicId,
  topicTitle,
  topicContext,
  sections,
  quizPrompts,
}: QuizClientProps) {
  const [state, setState] = useState<QuizState>("loading");
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [currentEval, setCurrentEval] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exampleAnswers, setExampleAnswers] = useState<string[] | null>(null);
  const [examplesLoading, setExamplesLoading] = useState(false);
  const [examplesError, setExamplesError] = useState<string | null>(null);

  useEffect(() => {
    setExampleAnswers(null);
    setExamplesError(null);
  }, [currentIndex, questions]);

  async function fetchExampleAnswers() {
    const q = questions[currentIndex];
    if (!q) return;
    setExamplesLoading(true);
    setExamplesError(null);
    try {
      const res = await fetch("/api/quiz-example-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          topicTitle,
          topicContext,
          question: q.question,
          questionType: q.type,
        }),
      });
      if (!res.ok) throw new Error("Failed to generate examples");
      const data: { examples: string[] } = await res.json();
      setExampleAnswers(data.examples);
    } catch {
      setExamplesError(
        "Could not load example answers. Check your AI Gateway API key and try again."
      );
    } finally {
      setExamplesLoading(false);
    }
  }

  async function startQuiz() {
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ topicTitle, sections, quizPrompts }),
      });
      if (!res.ok) throw new Error("Failed to generate questions");
      const data = await res.json();
      setQuestions(data.questions);
      setCurrentIndex(0);
      setAnswered([]);
      setAnswer("");
      setState("answering");
    } catch {
      setError("Failed to generate quiz questions. Check your AI Gateway API key.");
      setState("loading");
    }
  }

  async function submitAnswer() {
    if (!answer.trim()) return;
    setState("evaluating");
    setError(null);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          question: questions[currentIndex].question,
          answer,
          topicTitle,
          topicContext,
        }),
      });
      if (!res.ok) throw new Error("Failed to evaluate");
      const evaluation: EvaluationResult = await res.json();
      setCurrentEval(evaluation);
      setState("reviewed");
    } catch {
      setError("Failed to evaluate answer. Check your AI Gateway API key.");
      setState("answering");
    }
  }

  async function nextQuestion() {
    const q = questions[currentIndex];
    const entry: AnsweredQuestion = {
      question: q,
      answer,
      evaluation: currentEval!,
    };
    const nextAnswered = [...answered, entry];
    setAnswered(nextAnswered);
    setCurrentEval(null);
    setAnswer("");

    if (currentIndex + 1 >= questions.length) {
      const avg =
        nextAnswered.reduce((sum, a) => sum + a.evaluation.score, 0) /
        nextAnswered.length;

      const progress = await getProgress();
      const attempt = {
        topicId,
        date: new Date().toISOString(),
        questions: nextAnswered.map((a) => ({
          question: a.question.question,
          answer: a.answer,
          score: a.evaluation.score,
          feedback: a.evaluation.feedback,
          modelAnswer: a.evaluation.modelAnswer,
        })),
        averageScore: Math.round(avg * 10) / 10,
      };
      const updated = addQuizAttempt(progress, topicId, attempt);
      await saveProgress(updated);

      setState("complete");
    } else {
      setCurrentIndex((i) => i + 1);
      setState("answering");
    }
  }

  if (state === "loading" && questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <FlaskConical className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Quiz: {topicTitle}</h1>
        <p className="mt-2 text-muted-foreground">
          The AI will generate 4 interview-style questions. Write your answers
          and get instant feedback.
        </p>
        {error && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <Button onClick={startQuiz} className="mt-6" size="lg">
          {error ? (
            <>
              <RotateCcw className="mr-2 h-4 w-4" /> Try Again
            </>
          ) : (
            <>
              <FlaskConical className="mr-2 h-4 w-4" /> Start Quiz
            </>
          )}
        </Button>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Generating questions...</p>
      </div>
    );
  }

  if (state === "complete") {
    const allAnswered = answered;
    const avg =
      allAnswered.reduce((sum, a) => sum + a.evaluation.score, 0) /
      allAnswered.length;

    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-8">
          <Trophy className="mx-auto h-12 w-12 text-amber-500" />
          <h1 className="mt-4 text-2xl font-bold">Quiz Complete!</h1>
          <p className="mt-2 text-lg">
            Average Score:{" "}
            <span className="font-bold">{(Math.round(avg * 10) / 10).toFixed(1)}/5</span>
          </p>
        </div>

        <div className="space-y-4">
          {allAnswered.map((a, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base font-medium">
                    Q{i + 1}: {a.question.question}
                  </CardTitle>
                  <ScoreBadge score={a.evaluation.score} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Your answer:</p>
                  <p>{a.answer}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Feedback:</p>
                  <p>{a.evaluation.feedback}</p>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <p className="font-medium text-muted-foreground mb-1">Model answer:</p>
                  <p>{a.evaluation.modelAnswer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href={`/quiz/${topicId}/history`}>
            <Button variant="outline">
              <History className="mr-1 h-4 w-4" />
              Score history
            </Button>
          </Link>
          <Button onClick={startQuiz}>
            <RotateCcw className="mr-1 h-4 w-4" /> Retake Quiz
          </Button>
          <Link href={`/learn/${topicId}`}>
            <Button variant="outline">Review Lesson</Button>
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">{topicTitle}</h1>
        <Badge variant="outline">
          {currentIndex + 1} / {questions.length}
        </Badge>
      </div>

      <Progress
        value={((currentIndex + (state === "reviewed" ? 1 : 0)) / questions.length) * 100}
        className="mb-6 h-2"
      />

      <Card className="mb-4">
        <CardContent className="p-6">
          <Badge variant="secondary" className="mb-3 text-xs">
            {question.type === "explain"
              ? "Explain a Concept"
              : question.type === "scenario"
              ? "Scenario-Based"
              : "Compare & Contrast"}
          </Badge>
          <p className="text-lg font-medium leading-relaxed">
            {question.question}
          </p>
        </CardContent>
      </Card>

      {state === "answering" && (
        <div className="space-y-3">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here... Think about how you'd respond in an actual interview."
            rows={6}
            className="resize-none"
          />
          {!exampleAnswers && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fetchExampleAnswers}
              disabled={examplesLoading}
              className="shrink-0 self-start"
            >
              {examplesLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading examples…
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Show 3 example answers
                </>
              )}
            </Button>
          )}
          {examplesError && (
            <p className="text-sm text-red-600 dark:text-red-400">{examplesError}</p>
          )}
          {exampleAnswers && (
            <Card className="border-dashed">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Example answers (for inspiration — write your own)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-4 pt-0">
                {exampleAnswers.map((text, i) => (
                  <div key={i} className="text-sm leading-relaxed">
                    <span className="font-semibold text-muted-foreground">
                      {i + 1}.{" "}
                    </span>
                    {text}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <div className="flex justify-end">
            <Button
              onClick={submitAnswer}
              disabled={!answer.trim()}
            >
              <Send className="mr-1 h-4 w-4" /> Submit Answer
            </Button>
          </div>
        </div>
      )}

      {state === "evaluating" && (
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Evaluating your answer...</p>
        </div>
      )}

      {state === "reviewed" && currentEval && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Score</span>
                <ScoreBadge score={currentEval.score} />
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Feedback</p>
                <p className="text-sm leading-relaxed">{currentEval.feedback}</p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium text-muted-foreground mb-1">Model Answer</p>
                <p className="text-sm leading-relaxed">{currentEval.modelAnswer}</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={nextQuestion}>
              {currentIndex + 1 >= questions.length ? (
                <>
                  Finish Quiz <Trophy className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Next Question <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
