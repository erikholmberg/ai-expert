import type {
  LearningBookmark,
  PostLessonMcqAttempt,
  ProgressState,
  QuizAttempt,
  SRSCardState,
  TopicProgress,
} from "@/lib/types";

export function dedupeQuizAttempts(attempts: QuizAttempt[]): QuizAttempt[] {
  const seen = new Set<string>();
  const out: QuizAttempt[] = [];
  for (const a of attempts) {
    const key = JSON.stringify(a);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(a);
  }
  return out;
}

function mergePostLessonMcqAttempts(
  disk: PostLessonMcqAttempt[] | undefined,
  incoming: PostLessonMcqAttempt[] | undefined
): PostLessonMcqAttempt[] {
  const combined = [...(disk ?? []), ...(incoming ?? [])];
  const seen = new Set<string>();
  const out: PostLessonMcqAttempt[] = [];
  for (const a of combined) {
    const key = JSON.stringify(a);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(a);
  }
  out.sort((x, y) => new Date(x.date).getTime() - new Date(y.date).getTime());
  return out.slice(-3);
}

export function emptyProgress(): ProgressState {
  return {
    topics: {},
    cards: {},
    bookmarks: {},
    lastUpdated: new Date().toISOString(),
  };
}

export function normalizeProgress(raw: unknown): ProgressState {
  const data =
    raw && typeof raw === "object"
      ? (raw as Record<string, unknown>)
      : {};
  if (!data.topics) data.topics = {};
  if (!data.cards) data.cards = {};
  if (typeof data.lastUpdated !== "string") {
    data.lastUpdated = new Date().toISOString();
  }
  if (!data.bookmarks || typeof data.bookmarks !== "object") {
    data.bookmarks = {};
  }
  delete data.bookmarkDeleteIds;
  return data as unknown as ProgressState;
}

export function mergeTopicProgress(
  disk: TopicProgress,
  incoming: TopicProgress
): TopicProgress {
  const diskAttempts = disk.quizAttempts ?? [];
  const incomingAttempts = incoming.quizAttempts ?? [];
  return {
    topicId: incoming.topicId ?? disk.topicId,
    completed: disk.completed || incoming.completed,
    completedAt:
      disk.completedAt && incoming.completedAt
        ? disk.completedAt > incoming.completedAt
          ? disk.completedAt
          : incoming.completedAt
        : (disk.completedAt ?? incoming.completedAt),
    quizAttempts: dedupeQuizAttempts([...diskAttempts, ...incomingAttempts]),
    bestQuizScore: Math.max(disk.bestQuizScore, incoming.bestQuizScore),
    postLessonMcqAttempts: mergePostLessonMcqAttempts(
      disk.postLessonMcqAttempts,
      incoming.postLessonMcqAttempts
    ),
    lastLearnSectionIndex:
      incoming.lastLearnSectionIndex !== undefined
        ? incoming.lastLearnSectionIndex
        : disk.lastLearnSectionIndex,
  };
}

export function mergeCardState(
  disk: SRSCardState,
  incoming: SRSCardState
): SRSCardState {
  const tDisk = disk.lastReview ? new Date(disk.lastReview).getTime() : 0;
  const tIn = incoming.lastReview ? new Date(incoming.lastReview).getTime() : 0;
  if (tIn > tDisk) return incoming;
  if (tIn < tDisk) return disk;
  if (incoming.repetition !== disk.repetition) {
    return incoming.repetition >= disk.repetition ? incoming : disk;
  }
  return incoming;
}

function mergeBookmarks(
  disk: Record<string, LearningBookmark>,
  incoming: ProgressState
): Record<string, LearningBookmark> {
  let merged: Record<string, LearningBookmark> = { ...disk };
  if (incoming.bookmarks !== undefined) {
    merged = { ...merged, ...incoming.bookmarks };
  }
  for (const id of incoming.bookmarkDeleteIds ?? []) {
    delete merged[id];
  }
  return merged;
}

export function mergeProgressState(
  disk: ProgressState,
  incoming: ProgressState
): ProgressState {
  const topicIds = new Set([
    ...Object.keys(disk.topics),
    ...Object.keys(incoming.topics),
  ]);
  const topics: Record<string, TopicProgress> = {};
  for (const id of topicIds) {
    const d = disk.topics[id];
    const inc = incoming.topics[id];
    if (d && inc) topics[id] = mergeTopicProgress(d, inc);
    else topics[id] = inc ?? d;
  }

  const cardIds = new Set([
    ...Object.keys(disk.cards),
    ...Object.keys(incoming.cards),
  ]);
  const cards: Record<string, SRSCardState> = {};
  for (const id of cardIds) {
    const d = disk.cards[id];
    const inc = incoming.cards[id];
    if (d && inc) cards[id] = mergeCardState(d, inc);
    else cards[id] = inc ?? d;
  }

  const diskBookmarks = disk.bookmarks ?? {};
  const bookmarks = mergeBookmarks(diskBookmarks, incoming);

  const lastUpdated = new Date().toISOString();
  return { topics, cards, bookmarks, lastUpdated };
}
