import type { LearningBookmark } from "@/lib/types";

export const LEARN_BOOKMARK_HIGHLIGHT_KEY = "learnBookmarkHighlight";

const BOOKMARK_MARK_CLASS =
  "learn-bookmark-mark rounded-sm bg-amber-200/90 px-0.5 dark:bg-amber-900/55";

export type LearnBookmarkHighlightPayload = {
  topicId: string;
  sectionIndex: number;
  excerpt: string;
};

export function storeLearnBookmarkHighlightForNavigation(
  payload: LearnBookmarkHighlightPayload
): void {
  try {
    sessionStorage.setItem(LEARN_BOOKMARK_HIGHLIGHT_KEY, JSON.stringify(payload));
  } catch {
    // QuotaExceeded or private mode
  }
}

/** First verbatim match of `search` across text nodes under `root`. */
export function findTextRangeInElement(
  root: HTMLElement,
  search: string
): Range | null {
  const needle = search.trim();
  if (!needle) return null;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodes: Text[] = [];
  let combined = "";
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const t = n as Text;
    const p = t.parentElement;
    if (
      p &&
      (p.tagName === "SCRIPT" ||
        p.tagName === "STYLE" ||
        p.tagName === "NOSCRIPT")
    ) {
      continue;
    }
    nodes.push(t);
    combined += t.data;
  }

  const idx = combined.indexOf(needle);
  if (idx === -1) return null;
  const endIdx = idx + needle.length;

  let pos = 0;
  let startNode: Text | null = null;
  let startOffset = 0;
  let endNode: Text | null = null;
  let endOffset = 0;

  for (const node of nodes) {
    const len = node.length;
    const nodeStart = pos;
    const nodeEnd = pos + len;
    if (startNode === null && idx < nodeEnd) {
      startNode = node;
      startOffset = idx - nodeStart;
    }
    if (endIdx <= nodeEnd) {
      endNode = node;
      endOffset = endIdx - nodeStart;
      break;
    }
    pos += len;
  }

  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return range;
}

function unwrapLearnBookmarkMarks() {
  document.querySelectorAll("mark.learn-bookmark-mark").forEach((m) => {
    const parent = m.parentNode;
    if (!parent) return;
    while (m.firstChild) {
      parent.insertBefore(m.firstChild, m);
    }
    parent.removeChild(m);
    parent.normalize();
  });
}

export function clearLearnBookmarkHighlight() {
  unwrapLearnBookmarkMarks();
}

export function rangeStartsInsideLearnBookmarkMark(range: Range): boolean {
  const n = range.startContainer;
  const el =
    n.nodeType === Node.TEXT_NODE ? (n.parentElement as Element | null) : (n as Element);
  return !!(el && el.closest("mark.learn-bookmark-mark"));
}

/** Wrap `range` in a bookmark highlight without removing other bookmark marks. */
export function applyLearnBookmarkMarkToRange(range: Range): void {
  if (range.collapsed) return;

  const mark = document.createElement("mark");
  mark.className = BOOKMARK_MARK_CLASS;
  const liveRange = range.cloneRange();
  try {
    liveRange.surroundContents(mark);
  } catch {
    const contents = liveRange.extractContents();
    mark.appendChild(contents);
    liveRange.insertNode(mark);
  }
}

/**
 * Wrap each saved excerpt for `topicId` in a highlight mark. Skips ranges already
 * inside a bookmark mark (e.g. duplicate excerpts). Caller should ensure sections exist.
 */
export function applyPersistentLearnBookmarkMarks(
  topicId: string,
  bookmarks: LearningBookmark[]
): void {
  const relevant = bookmarks.filter((b) => b.topicId === topicId);
  const pending = [...relevant];
  const maxGuard = Math.max(20, pending.length * pending.length + 8);
  let guard = 0;

  while (pending.length > 0 && guard < maxGuard) {
    guard += 1;
    let progressed = false;
    for (let i = pending.length - 1; i >= 0; i--) {
      const b = pending[i];
      const section = document.getElementById(
        `learn-section-${topicId}-${b.sectionIndex}`
      ) as HTMLElement | null;
      if (!section) {
        continue;
      }
      const range = findTextRangeInElement(section, b.excerpt);
      if (!range || range.collapsed) {
        pending.splice(i, 1);
        progressed = true;
        continue;
      }
      if (rangeStartsInsideLearnBookmarkMark(range)) {
        pending.splice(i, 1);
        progressed = true;
        continue;
      }
      applyLearnBookmarkMarkToRange(range.cloneRange());
      pending.splice(i, 1);
      progressed = true;
    }
    if (!progressed) break;
  }
}

/** Replace all bookmark marks with a single highlight for `range`. */
export function applyLearnBookmarkRangeHighlight(range: Range): void {
  clearLearnBookmarkHighlight();
  applyLearnBookmarkMarkToRange(range);
}
