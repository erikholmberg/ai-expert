"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { SRSCardState } from "@/lib/types";
import { createNewCardState, reviewCard, getDueCards } from "@/lib/srs";
import { getProgress, saveProgress, updateCardState } from "@/lib/progress-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  RotateCcw,
  Brain,
  CheckCircle2,
  Zap,
  Trophy,
} from "lucide-react";
import Link from "next/link";

interface FlashcardInfo {
  front: string;
  back: string;
  topicTitle: string;
}

interface ReviewClientProps {
  flashcardMap: Record<string, FlashcardInfo>;
}

const RATING_BUTTONS = [
  { quality: 0, label: "Again", color: "bg-red-600 hover:bg-red-700", icon: RotateCcw },
  { quality: 2, label: "Hard", color: "bg-orange-600 hover:bg-orange-700", icon: Brain },
  { quality: 4, label: "Good", color: "bg-blue-600 hover:bg-blue-700", icon: CheckCircle2 },
  { quality: 5, label: "Easy", color: "bg-emerald-600 hover:bg-emerald-700", icon: Zap },
];

export function ReviewClient({ flashcardMap }: ReviewClientProps) {
  const [dueCards, setDueCards] = useState<SRSCardState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [totalDue, setTotalDue] = useState(0);

  const loadDueCards = useCallback(async () => {
    const progress = await getProgress();

    const allCardIds = Object.keys(flashcardMap);
    for (const cardId of allCardIds) {
      if (!progress.cards[cardId]) {
        const topicId = cardId.split("-").slice(0, -1).join("-");
        progress.cards[cardId] = createNewCardState(cardId, topicId);
      }
    }

    const due = getDueCards(progress.cards);
    setDueCards(due);
    setTotalDue(due.length);
    setLoading(false);

    if (due.length === 0) {
      setSessionComplete(true);
    }
  }, [flashcardMap]);

  useEffect(() => {
    queueMicrotask(() => {
      startTransition(() => {
        void loadDueCards();
      });
    });
  }, [loadDueCards]);

  const handleRate = useCallback(
    async (quality: number) => {
      const card = dueCards[currentIndex];
      const updated = reviewCard(card, quality);

      const progress = await getProgress();
      const newProgress = updateCardState(progress, updated);
      await saveProgress(newProgress);

      setReviewed((r) => r + 1);
      setFlipped(false);

      if (currentIndex + 1 >= dueCards.length) {
        setSessionComplete(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [currentIndex, dueCards]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!flipped) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setFlipped(true);
        }
        return;
      }
      switch (e.key) {
        case "1":
          handleRate(0);
          break;
        case "2":
          handleRate(2);
          break;
        case "3":
          handleRate(4);
          break;
        case "4":
          handleRate(5);
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipped, handleRate]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Brain className="mx-auto h-8 w-8 animate-pulse text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Loading review session...</p>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Trophy className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-4 text-2xl font-bold">
          {reviewed === 0 ? "All caught up!" : "Session Complete!"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {reviewed === 0
            ? "No cards are due for review right now. Come back later or learn new topics."
            : `You reviewed ${reviewed} card${reviewed !== 1 ? "s" : ""}. Great work!`}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          {reviewed === 0 && (
            <Link href="/learn/ml-fundamentals">
              <Button>Start Learning</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  const card = dueCards[currentIndex];
  const info = flashcardMap[card.cardId];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Review</h1>
        <Badge variant="outline">
          {reviewed + 1} / {totalDue}
        </Badge>
      </div>

      <Progress value={(reviewed / totalDue) * 100} className="mb-6 h-2" />

      <Card
        className="cursor-pointer transition-all duration-200 hover:shadow-md min-h-[280px] flex flex-col"
        onClick={() => !flipped && setFlipped(true)}
      >
        <CardContent className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <Badge variant="secondary" className="mb-4 text-xs">
            {info?.topicTitle}
          </Badge>

          {!flipped ? (
            <>
              <p className="text-lg font-medium leading-relaxed">{info?.front}</p>
              <p className="mt-6 text-sm text-muted-foreground">
                Click or press Space to reveal answer
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-3">{info?.front}</p>
              <div className="w-full border-t my-2" />
              <p className="mt-3 text-base leading-relaxed">{info?.back}</p>
            </>
          )}
        </CardContent>
      </Card>

      {flipped && (
        <div className="mt-4 flex justify-center gap-2">
          {RATING_BUTTONS.map(({ quality, label, color, icon: Icon }, i) => (
            <Button
              key={quality}
              onClick={() => handleRate(quality)}
              className={`${color} text-white min-w-[80px]`}
            >
              <Icon className="mr-1 h-4 w-4" />
              {label}
              <span className="ml-1 text-xs opacity-70">({i + 1})</span>
            </Button>
          ))}
        </div>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Keyboard: Space to flip, 1-4 to rate
      </p>
    </div>
  );
}
