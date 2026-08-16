import type { LearningBookmark, ProgressState } from "@/lib/types";

export const BOOKMARK_EXCERPT_MAX = 4000;

export function clipBookmarkExcerpt(text: string): string {
  const t = text.trim();
  if (t.length <= BOOKMARK_EXCERPT_MAX) return t;
  return `${t.slice(0, BOOKMARK_EXCERPT_MAX)}…`;
}

export function addLearningBookmark(
  state: ProgressState,
  bookmark: LearningBookmark
): ProgressState {
  const { bookmarkDeleteIds: _d, ...rest } = state;
  return {
    ...rest,
    bookmarks: { ...(state.bookmarks ?? {}), [bookmark.id]: bookmark },
    lastUpdated: new Date().toISOString(),
  };
}

export function removeLearningBookmark(
  state: ProgressState,
  id: string
): ProgressState {
  const bookmarks = { ...(state.bookmarks ?? {}) };
  delete bookmarks[id];
  const { bookmarkDeleteIds: _prev, ...rest } = state;
  return {
    ...rest,
    bookmarks,
    bookmarkDeleteIds: [id],
    lastUpdated: new Date().toISOString(),
  };
}

export function sortedLearningBookmarks(
  bookmarks: Record<string, LearningBookmark> | undefined
): LearningBookmark[] {
  const list = Object.values(bookmarks ?? {});
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
