"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LearningBookmark } from "@/lib/types";
import { getProgress, saveProgress } from "@/lib/progress-client";
import { removeLearningBookmark, sortedLearningBookmarks } from "@/lib/bookmarks";
import { storeLearnBookmarkHighlightForNavigation } from "@/lib/learn-highlight";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bookmark, ChevronRight, ExternalLink, Loader2, Trash2 } from "lucide-react";

export function BookmarksClient() {
  const [bookmarks, setBookmarks] = useState<LearningBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const progress = await getProgress();
      setBookmarks(sortedLearningBookmarks(progress.bookmarks));
    } catch {
      setError("Could not load bookmarks.");
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function armHighlightNavigation(b: LearningBookmark) {
    storeLearnBookmarkHighlightForNavigation({
      topicId: b.topicId,
      sectionIndex: b.sectionIndex,
      excerpt: b.excerpt,
    });
  }

  async function handleRemove(id: string) {
    setRemovingId(id);
    setError(null);
    try {
      const progress = await getProgress();
      const next = removeLearningBookmark(progress, id);
      const saved = await saveProgress(next);
      setBookmarks(sortedLearningBookmarks(saved.bookmarks));
    } catch {
      setError("Could not remove bookmark.");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>Bookmarks</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Saved excerpts from learning units. Open a bookmark to jump back to that
          section.
        </p>
      </div>

      <Separator className="mb-8" />

      {error && (
        <p className="mb-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading…
        </div>
      ) : bookmarks.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            <Bookmark className="mx-auto mb-3 h-8 w-8 opacity-50" />
            No bookmarks yet. Select text on a learn page and choose{" "}
            <span className="font-medium text-foreground">Save bookmark</span>.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((b) => (
            <li key={b.id}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <CardTitle className="text-base font-semibold leading-snug">
                      <Link
                        href={`/learn/${b.topicId}#learn-section-${b.topicId}-${b.sectionIndex}`}
                        className="hover:text-primary inline-flex items-center gap-1.5 transition-colors"
                        onClick={() => armHighlightNavigation(b)}
                      >
                        Go to source
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60" />
                      </Link>
                    </CardTitle>
                    <div className="flex shrink-0 gap-1">
                      <Link
                        href={`/learn/${b.topicId}#learn-section-${b.topicId}-${b.sectionIndex}`}
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                        onClick={() => armHighlightNavigation(b)}
                      >
                        Open
                      </Link>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Remove bookmark"
                        disabled={removingId === b.id}
                        onClick={() => handleRemove(b.id)}
                      >
                        {removingId === b.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0 text-sm text-muted-foreground">
                  <p className="whitespace-pre-wrap break-words text-foreground leading-relaxed">
                    {b.excerpt}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Learning unit:</span>{" "}
                    {b.topicTitle}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Section:</span>{" "}
                    {b.sectionHeading}
                  </p>
                  <p className="text-xs tabular-nums">
                    Saved {new Date(b.createdAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
