"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import type { LearningBookmark, PostLessonMcqAttempt, Topic } from "@/lib/types";
import {
  getProgress,
  saveProgress,
  markTopicComplete,
  getTopicProgress,
  addPostLessonMcqAttempt,
  setTopicLastLearnSection,
} from "@/lib/progress-client";
import { addLearningBookmark, clipBookmarkExcerpt, sortedLearningBookmarks } from "@/lib/bookmarks";
import {
  LEARN_BOOKMARK_HIGHLIGHT_KEY,
  applyLearnBookmarkMarkToRange,
  applyPersistentLearnBookmarkMarks,
  clearLearnBookmarkHighlight,
  findTextRangeInElement,
  rangeStartsInsideLearnBookmarkMark,
  type LearnBookmarkHighlightPayload,
} from "@/lib/learn-highlight";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  FlaskConical,
  Lightbulb,
  Bookmark,
  Loader2,
  X,
} from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";

function rangeInsideArticle(range: Range, article: HTMLElement): boolean {
  return article.contains(range.startContainer) && article.contains(range.endContainer);
}

interface BookmarkToolbarState {
  top: number;
  left: number;
  sectionIndex: number;
  excerpt: string;
}

interface LearnClientProps {
  topic: Topic;
  prevTopic: { id: string; title: string } | null;
  nextTopic: { id: string; title: string } | null;
}

interface PostLessonMcqApiQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

interface PostLessonMcqApiResponse {
  questions: PostLessonMcqApiQuestion[];
}

export function LearnClient({ topic, prevTopic, nextTopic }: LearnClientProps) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bookmarkToolbar, setBookmarkToolbar] = useState<BookmarkToolbarState | null>(null);
  const [bookmarkSaving, setBookmarkSaving] = useState(false);
  const [bookmarkHint, setBookmarkHint] = useState<string | null>(null);
  const [topicBookmarks, setTopicBookmarks] = useState<LearningBookmark[]>([]);

  const [postMcqOpen, setPostMcqOpen] = useState(false);
  const [postMcqLoading, setPostMcqLoading] = useState(false);
  const [postMcqError, setPostMcqError] = useState<string | null>(null);
  const [postMcqQuestions, setPostMcqQuestions] = useState<PostLessonMcqApiQuestion[] | null>(
    null
  );
  const [postMcqSelected, setPostMcqSelected] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const [postMcqSubmitted, setPostMcqSubmitted] = useState(false);
  const [postMcqSaving, setPostMcqSaving] = useState(false);
  const resumeScrollDoneRef = useRef(false);
  const [sectionPersistReady, setSectionPersistReady] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sectionCount = topic.sections.length;

  const updateBookmarkToolbar = useCallback(() => {
    const article = articleRef.current;
    if (!article) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setBookmarkToolbar(null);
      return;
    }
    const text = sel.toString().trim();
    if (text.length < 3) {
      setBookmarkToolbar(null);
      return;
    }
    const range = sel.getRangeAt(0);
    if (!rangeInsideArticle(range, article)) {
      setBookmarkToolbar(null);
      return;
    }
    let node: Node | null = range.commonAncestorContainer;
    let el: Element | null =
      node.nodeType === Node.TEXT_NODE
        ? (node.parentElement as Element | null)
        : (node as Element);
    let sectionEl: Element | null = null;
    while (el && el !== article) {
      if (el.tagName === "SECTION" && el.id.startsWith("learn-section-")) {
        sectionEl = el;
        break;
      }
      el = el.parentElement;
    }
    if (!sectionEl) {
      setBookmarkToolbar(null);
      return;
    }
    const prefix = `learn-section-${topic.id}-`;
    if (!sectionEl.id.startsWith(prefix)) {
      setBookmarkToolbar(null);
      return;
    }
    const idxStr = sectionEl.id.slice(prefix.length);
    const sectionIndex = parseInt(idxStr, 10);
    if (
      Number.isNaN(sectionIndex) ||
      sectionIndex < 0 ||
      sectionIndex >= topic.sections.length
    ) {
      setBookmarkToolbar(null);
      return;
    }
    const rect = range.getBoundingClientRect();
    setBookmarkToolbar({
      top: rect.bottom + 8,
      left: Math.max(8, Math.min(rect.left, window.innerWidth - 220)),
      sectionIndex,
      excerpt: text,
    });
  }, [topic.id, topic.sections.length]);

  const updateSectionProgress = useCallback(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    const article = articleRef.current;
    if (sections.length === 0 || !article) return;

    const vh = window.innerHeight;
    const activationFromTop = Math.min(200, vh * 0.28);

    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].getBoundingClientRect().top;
      if (top <= activationFromTop) idx = i;
    }

    const last = sections[sections.length - 1];
    const lr = last.getBoundingClientRect();
    const lastIntersectsViewport = lr.bottom > 0 && lr.top < vh;
    const scrollBottom = window.scrollY + vh;
    const docBottom = document.documentElement.scrollHeight;
    const nearDocumentBottom = scrollBottom >= docBottom - 8;
    if (
      lastIntersectsViewport &&
      nearDocumentBottom &&
      sections.length > 1
    ) {
      idx = sections.length - 1;
    }

    setActiveSectionIndex(idx);

    const scrollY = window.scrollY;
    const artRect = article.getBoundingClientRect();
    const artTop = artRect.top + scrollY;
    const artBottom = artTop + artRect.height;
    // 0% when scroll aligns article top with viewport top; 100% when viewport
    // bottom reaches article bottom. Avoids counting initial viewport height
    // as "already read" (which inflated the start to ~20–30%).
    const scrollStart = artTop;
    const scrollEnd = artBottom - vh;
    const denom = scrollEnd - scrollStart;
    let pct: number;
    if (denom <= 0) {
      pct = scrollY + vh >= artBottom ? 100 : 0;
    } else {
      pct = ((scrollY - scrollStart) / denom) * 100;
    }
    setScrollProgress(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sectionCount);
  }, [sectionCount, topic.id]);

  useEffect(() => {
    const run = () => requestAnimationFrame(updateSectionProgress);
    run();
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run, { passive: true });
    return () => {
      window.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
    };
  }, [updateSectionProgress]);

  useEffect(() => {
    getProgress().then((p) => {
      const tp = getTopicProgress(p, topic.id);
      setCompleted(tp.completed);
      setTopicBookmarks(
        sortedLearningBookmarks(p.bookmarks).filter((b) => b.topicId === topic.id)
      );
      setLoading(false);
    });
  }, [topic.id]);

  useEffect(() => {
    const onFocus = () => {
      getProgress().then((p) => {
        setTopicBookmarks(
          sortedLearningBookmarks(p.bookmarks).filter((b) => b.topicId === topic.id)
        );
      });
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [topic.id]);

  useEffect(() => {
    setBookmarkToolbar(null);
  }, [topic.id]);

  useEffect(() => {
    if (loading) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 60;

    function tryApply() {
      if (cancelled) return;
      attempts += 1;
      const section0 = document.getElementById(`learn-section-${topic.id}-0`);
      if (!section0) {
        if (attempts < maxAttempts) requestAnimationFrame(tryApply);
        return;
      }

      clearLearnBookmarkHighlight();
      applyPersistentLearnBookmarkMarks(topic.id, topicBookmarks);

      const raw =
        typeof window !== "undefined"
          ? sessionStorage.getItem(LEARN_BOOKMARK_HIGHLIGHT_KEY)
          : null;
      if (raw) {
        let payload: LearnBookmarkHighlightPayload;
        try {
          payload = JSON.parse(raw) as LearnBookmarkHighlightPayload;
        } catch {
          sessionStorage.removeItem(LEARN_BOOKMARK_HIGHLIGHT_KEY);
          return;
        }
        if (payload.topicId !== topic.id) {
          return;
        }
        const navSection = document.getElementById(
          `learn-section-${topic.id}-${payload.sectionIndex}`
        ) as HTMLElement | null;
        if (!navSection) {
          if (attempts < maxAttempts) requestAnimationFrame(tryApply);
          else sessionStorage.removeItem(LEARN_BOOKMARK_HIGHLIGHT_KEY);
          return;
        }
        sessionStorage.removeItem(LEARN_BOOKMARK_HIGHLIGHT_KEY);
        navSection.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(() => {
          if (cancelled) return;
          const sectionEl = document.getElementById(
            `learn-section-${topic.id}-${payload.sectionIndex}`
          ) as HTMLElement | null;
          if (!sectionEl) return;
          const r2 = findTextRangeInElement(sectionEl, payload.excerpt);
          if (
            r2 &&
            !r2.collapsed &&
            !rangeStartsInsideLearnBookmarkMark(r2)
          ) {
            applyLearnBookmarkMarkToRange(r2.cloneRange());
          }
        }, 450);
      }
    }

    requestAnimationFrame(tryApply);
    return () => {
      cancelled = true;
      clearLearnBookmarkHighlight();
    };
  }, [loading, topic.id, sectionCount, topicBookmarks]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onSelectionChange = () => {
      clearTimeout(t);
      t = setTimeout(updateBookmarkToolbar, 120);
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      clearTimeout(t);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [updateBookmarkToolbar]);

  useEffect(() => {
    const onMouseUp = () => requestAnimationFrame(updateBookmarkToolbar);
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [updateBookmarkToolbar]);

  useEffect(() => {
    const onScroll = () => setBookmarkToolbar(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (document.getElementById("learn-bookmark-toolbar")?.contains(target)) return;
      if (articleRef.current?.contains(target)) return;
      setBookmarkToolbar(null);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  async function handleSaveBookmark() {
    if (!bookmarkToolbar) return;
    setBookmarkSaving(true);
    setBookmarkHint(null);
    try {
      const progress = await getProgress();
      const bookmark = {
        id: crypto.randomUUID(),
        topicId: topic.id,
        topicTitle: topic.title,
        sectionIndex: bookmarkToolbar.sectionIndex,
        sectionHeading: topic.sections[bookmarkToolbar.sectionIndex].heading,
        excerpt: clipBookmarkExcerpt(bookmarkToolbar.excerpt),
        createdAt: new Date().toISOString(),
      };
      await saveProgress(addLearningBookmark(progress, bookmark));
      setTopicBookmarks((prev) => [bookmark, ...prev]);
      window.getSelection()?.removeAllRanges();
      setBookmarkToolbar(null);
      setBookmarkHint("Bookmark saved");
      window.setTimeout(() => setBookmarkHint(null), 3200);
    } catch {
      setBookmarkHint("Could not save bookmark. Try signing in again.");
      window.setTimeout(() => setBookmarkHint(null), 4000);
    } finally {
      setBookmarkSaving(false);
    }
  }

  function scrollToSection(index: number) {
    const el = sectionRefs.current[index];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function resetPostMcqModal() {
    setPostMcqLoading(false);
    setPostMcqError(null);
    setPostMcqQuestions(null);
    setPostMcqSelected([null, null]);
    setPostMcqSubmitted(false);
    setPostMcqSaving(false);
  }

  function closeCompleteFlow() {
    setPostMcqOpen(false);
    resetPostMcqModal();
  }

  async function fetchPostLessonMcq() {
    setPostMcqLoading(true);
    setPostMcqError(null);
    setPostMcqQuestions(null);
    try {
      const res = await fetch("/api/post-lesson-mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          topicTitle: topic.title,
          sections: topic.sections.map((s) => ({
            heading: s.heading,
            keyTakeaway: s.keyTakeaway,
          })),
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(typeof j.error === "string" ? j.error : "Request failed");
      }
      const data = (await res.json()) as PostLessonMcqApiResponse;
      if (!data.questions || data.questions.length !== 2) {
        throw new Error("Invalid response");
      }
      for (const q of data.questions) {
        if (!Array.isArray(q.choices) || q.choices.length !== 4) {
          throw new Error("Invalid response");
        }
      }
      setPostMcqQuestions(data.questions);
    } catch (e) {
      setPostMcqError(
        e instanceof Error ? e.message : "Could not load check-in questions."
      );
    } finally {
      setPostMcqLoading(false);
    }
  }

  function openCompleteFlow() {
    setPostMcqOpen(true);
    void fetchPostLessonMcq();
  }

  async function handlePostMcqSkipComplete() {
    setPostMcqSaving(true);
    setPostMcqError(null);
    try {
      const progress = await getProgress();
      const updated = markTopicComplete(progress, topic.id);
      await saveProgress(updated);
      setCompleted(true);
      closeCompleteFlow();
    } catch {
      setPostMcqError("Could not save progress. Try again.");
    } finally {
      setPostMcqSaving(false);
    }
  }

  async function handlePostMcqFinishWithAttempt() {
    if (!postMcqQuestions || postMcqSelected[0] === null || postMcqSelected[1] === null) {
      return;
    }
    setPostMcqSaving(true);
    setPostMcqError(null);
    try {
      const q0 = postMcqQuestions[0];
      const q1 = postMcqQuestions[1];
      const correct =
        (postMcqSelected[0] === q0.correctIndex ? 1 : 0) +
        (postMcqSelected[1] === q1.correctIndex ? 1 : 0);
      const attempt: PostLessonMcqAttempt = {
        date: new Date().toISOString(),
        score: correct / 2,
        questions: [
          {
            prompt: q0.question,
            chosenIndex: postMcqSelected[0],
            correctIndex: q0.correctIndex,
          },
          {
            prompt: q1.question,
            chosenIndex: postMcqSelected[1],
            correctIndex: q1.correctIndex,
          },
        ],
      };
      let progress = await getProgress();
      progress = addPostLessonMcqAttempt(progress, topic.id, attempt);
      progress = markTopicComplete(progress, topic.id);
      await saveProgress(progress);
      setCompleted(true);
      closeCompleteFlow();
    } catch {
      setPostMcqError("Could not save progress. Try again.");
    } finally {
      setPostMcqSaving(false);
    }
  }

  useEffect(() => {
    if (!postMcqOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [postMcqOpen]);

  useEffect(() => {
    resumeScrollDoneRef.current = false;
    setSectionPersistReady(0);
    const enable = window.setTimeout(() => setSectionPersistReady(1), 2600);
    return () => clearTimeout(enable);
  }, [topic.id]);

  useEffect(() => {
    if (loading || completed) return;
    if (resumeScrollDoneRef.current) return;
    getProgress().then((p) => {
      const tp = getTopicProgress(p, topic.id);
      const idx = tp.lastLearnSectionIndex;
      if (idx == null || idx < 0 || idx >= topic.sections.length) {
        resumeScrollDoneRef.current = true;
        return;
      }
      resumeScrollDoneRef.current = true;
      window.setTimeout(() => scrollToSection(idx), 150);
    });
  }, [loading, completed, topic.id, topic.sections.length]);

  useEffect(() => {
    if (loading || completed || sectionPersistReady === 0) return;
    const t = window.setTimeout(() => {
      void (async () => {
        try {
          const p = await getProgress();
          await saveProgress(setTopicLastLearnSection(p, topic.id, activeSectionIndex));
        } catch {
          // best-effort
        }
      })();
    }, 1200);
    return () => clearTimeout(t);
  }, [activeSectionIndex, topic.id, loading, completed, sectionPersistReady]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>{topic.pillar}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{topic.pillar}</Badge>
              <Badge variant="outline">
                {topic.sections.length} sections
              </Badge>
              <Badge variant="outline">
                {topic.flashcards.length} flashcards
              </Badge>
            </div>
          </div>
          {!loading && completed && (
            <Badge className="mt-1 shrink-0 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Small screens: sticky strip above content (sidebar shows from lg) */}
      <div
        className="sticky top-14 z-30 -mx-4 mb-8 border-b border-border/60 bg-background/90 px-4 py-3 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/75 lg:hidden"
        role="navigation"
        aria-label="Section progress"
      >
        <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            Section{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {activeSectionIndex + 1}
            </span>{" "}
            of {sectionCount}
          </span>
          <span className="tabular-nums">{Math.round(scrollProgress)}% read</span>
        </div>
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {topic.sections.map((section, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToSection(i)}
              className={cn(
                "shrink-0 rounded-full border px-2.5 py-1 text-left text-xs font-medium transition-colors",
                i === activeSectionIndex
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-transparent bg-muted/80 text-muted-foreground hover:bg-muted"
              )}
            >
              <span className="tabular-nums opacity-80">{i + 1}.</span>{" "}
              <span className="max-w-[10rem] truncate">{section.heading}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Desktop: rail to the left of the lesson */}
        <aside
          className="sticky top-16 z-20 hidden w-[200px] shrink-0 self-start lg:block"
          role="navigation"
          aria-label="Section progress"
        >
          <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              On this page
            </p>
            <div className="flex items-stretch gap-3">
              <div className="relative w-2 shrink-0 self-stretch py-1">
                <div
                  className="absolute inset-y-1 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-muted"
                  aria-hidden
                />
                <div
                  className="absolute left-1/2 top-1 w-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-150 ease-out"
                  style={{
                    height: `${scrollProgress}%`,
                    maxHeight: "calc(100% - 8px)",
                  }}
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="mb-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground tabular-nums">
                    {activeSectionIndex + 1}
                  </span>
                  <span className="text-muted-foreground"> / {sectionCount}</span>
                  <span className="ml-2 tabular-nums">
                    · {Math.round(scrollProgress)}%
                  </span>
                </div>
                {topic.sections.map((section, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToSection(i)}
                    className={cn(
                      "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs leading-snug transition-colors",
                      i === activeSectionIndex
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold tabular-nums",
                        i === activeSectionIndex
                          ? "border-primary-foreground/30 bg-primary-foreground/15"
                          : "border-border bg-background"
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 break-words font-medium">
                      {section.heading}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {bookmarkHint && (
            <p
              className="mb-4 text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              {bookmarkHint}
            </p>
          )}
          <article ref={articleRef} className="space-y-8">
        {topic.sections.map((section, i) => (
          <section
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            id={`learn-section-${topic.id}-${i}`}
            aria-labelledby={`learn-section-heading-${topic.id}-${i}`}
          >
            <h2
              id={`learn-section-heading-${topic.id}-${i}`}
              className="text-xl font-semibold mb-3 flex scroll-mt-36 items-center gap-2"
            >
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              {section.heading}
            </h2>
            <MarkdownContent source={section.content} />
            <Card className="mt-4 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
              <CardContent className="flex items-start gap-2 py-3 px-4">
                <Lightbulb className="h-4 w-4 mt-0.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <div className="text-sm font-medium text-amber-800 dark:text-amber-300 [&_p]:mb-0 [&_p:last-child]:mb-0">
                  <MarkdownContent source={section.keyTakeaway} />
                </div>
              </CardContent>
            </Card>
          </section>
        ))}
          </article>

          {bookmarkToolbar && (
            <div
              id="learn-bookmark-toolbar"
              className="fixed z-[60] flex items-center gap-1 rounded-lg border bg-background p-1 shadow-lg"
              style={{
                top: bookmarkToolbar.top,
                left: bookmarkToolbar.left,
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <Button
                type="button"
                size="sm"
                className="h-8 gap-1"
                disabled={bookmarkSaving}
                onClick={handleSaveBookmark}
              >
                <Bookmark className="h-3.5 w-3.5" />
                Save bookmark
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                aria-label="Dismiss"
                onClick={() => {
                  window.getSelection()?.removeAllRanges();
                  setBookmarkToolbar(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Separator className="my-8" />

          <div className="flex items-center justify-between gap-4">
            <div>
              {prevTopic && (
                <Link href={`/learn/${prevTopic.id}`}>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {prevTopic.title}
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!completed && !loading && (
                <Button
                  onClick={openCompleteFlow}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Mark as Complete
                </Button>
              )}
              <Link href={`/quiz/${topic.id}`}>
                <Button variant="outline" size="sm">
                  <FlaskConical className="mr-1 h-4 w-4" />
                  Take Quiz
                </Button>
              </Link>
            </div>
            <div>
              {nextTopic && (
                <Link href={`/learn/${nextTopic.id}`}>
                  <Button variant="outline" size="sm">
                    {nextTopic.title}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {postMcqOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-mcq-title"
        >
          <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto shadow-lg">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-2">
                <h2 id="post-mcq-title" className="text-lg font-semibold leading-tight">
                  Quick check-in
                </h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0"
                  aria-label="Close"
                  disabled={postMcqSaving}
                  onClick={() => {
                    if (!postMcqSaving) closeCompleteFlow();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Two multiple-choice questions based on this topic&apos;s key ideas. You can
                skip if you prefer.
              </p>

              {postMcqLoading && (
                <div className="flex flex-col items-center py-8 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className="mt-3 text-sm">Preparing questions…</p>
                </div>
              )}

              {!postMcqLoading && postMcqError && !postMcqQuestions && (
                <div className="space-y-3">
                  <p className="text-sm text-destructive" role="alert">
                    {postMcqError}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" onClick={() => void fetchPostLessonMcq()}>
                      Retry
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={postMcqSaving}
                      onClick={() => void handlePostMcqSkipComplete()}
                    >
                      Skip and mark complete
                    </Button>
                  </div>
                </div>
              )}

              {!postMcqLoading && postMcqQuestions && (
                <div className="space-y-6">
                  {postMcqQuestions.map((q, qi) => (
                    <div key={qi} className="space-y-2">
                      <p className="text-sm font-medium leading-snug">
                        {qi + 1}. {q.question}
                      </p>
                      <ul className="space-y-2">
                        {q.choices.map((choice, ci) => {
                          const selected = postMcqSelected[qi] === ci;
                          const isCorrect = ci === q.correctIndex;
                          const showResult = postMcqSubmitted;
                          return (
                            <li key={ci}>
                              <label
                                className={cn(
                                  "flex cursor-pointer items-start gap-2 rounded-md border p-2 text-sm transition-colors",
                                  showResult && isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
                                  showResult &&
                                    selected &&
                                    !isCorrect &&
                                    "border-red-500 bg-red-50 dark:bg-red-950/40",
                                  !showResult && selected && "border-primary bg-muted/60",
                                  !showResult && !selected && "border-border hover:bg-muted/40"
                                )}
                              >
                                <input
                                  type="radio"
                                  className="mt-0.5"
                                  name={`post-mcq-q-${qi}`}
                                  checked={selected}
                                  disabled={postMcqSubmitted}
                                  onChange={() => {
                                    setPostMcqSelected((prev) => {
                                      const next: [number | null, number | null] = [...prev];
                                      next[qi] = ci;
                                      return next;
                                    });
                                  }}
                                />
                                <span className="leading-relaxed">{choice}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                      {postMcqSubmitted && (
                        <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-3">
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  {postMcqError && postMcqQuestions && (
                    <p className="text-sm text-destructive" role="alert">
                      {postMcqError}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 border-t pt-4">
                    {!postMcqSubmitted ? (
                      <>
                        <Button
                          type="button"
                          disabled={
                            postMcqSelected[0] === null ||
                            postMcqSelected[1] === null ||
                            postMcqSaving
                          }
                          onClick={() => setPostMcqSubmitted(true)}
                        >
                          Check answers
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          disabled={postMcqSaving}
                          onClick={() => void handlePostMcqSkipComplete()}
                        >
                          Skip and mark complete
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={postMcqSaving}
                        onClick={() => void handlePostMcqFinishWithAttempt()}
                      >
                        {postMcqSaving ? (
                          <>
                            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            Saving…
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            Mark topic complete
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
