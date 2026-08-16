import { getSession } from "next-auth/react";
import { emptyProgress, mergeProgressState, normalizeProgress } from "./progress-merge";
import {
  PostLessonMcqAttempt,
  ProgressState,
  TopicProgress,
  SRSCardState,
  QuizAttempt,
} from "./types";

const API_URL = "/api/progress";
const PROGRESS_CACHE_TTL_MS = 10_000;
const SESSION_CACHE_TTL_MS = 30_000;
const LOCAL_PROGRESS_KEY = "ai-expert:guest-progress";
const LOCAL_MIGRATED_KEY = "ai-expert:guest-progress-migrated";

let progressCache: { value: ProgressState; expiresAt: number } | null = null;
let inFlightProgressRequest: Promise<ProgressState> | null = null;
let sessionCache: { authenticated: boolean; expiresAt: number } | null = null;

async function isAuthenticated(): Promise<boolean> {
  const now = Date.now();
  if (sessionCache && sessionCache.expiresAt > now) {
    return sessionCache.authenticated;
  }
  const session = await getSession();
  const authenticated = !!session?.user;
  sessionCache = { authenticated, expiresAt: now + SESSION_CACHE_TTL_MS };
  return authenticated;
}

function readLocalProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (!raw) return emptyProgress();
    return normalizeProgress(JSON.parse(raw));
  } catch {
    return emptyProgress();
  }
}

function writeLocalProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable or quota exceeded — guest progress just won't persist
  }
}

/**
 * One-time upload of locally-stored guest progress into the signed-in
 * user's account, merged server-side with whatever's already there.
 */
async function migrateGuestProgressIfNeeded(): Promise<void> {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(LOCAL_MIGRATED_KEY) === "done") return;
  const raw = window.localStorage.getItem(LOCAL_PROGRESS_KEY);
  if (!raw) {
    window.localStorage.setItem(LOCAL_MIGRATED_KEY, "done");
    return;
  }
  try {
    const guestState = normalizeProgress(JSON.parse(raw));
    const hasData =
      Object.keys(guestState.topics).length > 0 ||
      Object.keys(guestState.cards).length > 0 ||
      Object.keys(guestState.bookmarks ?? {}).length > 0;
    if (hasData) {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(guestState),
      });
    }
    window.localStorage.setItem(LOCAL_MIGRATED_KEY, "done");
    window.localStorage.removeItem(LOCAL_PROGRESS_KEY);
  } catch {
    // leave unmigrated flag unset so we retry on the next load
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof err.error === "string" ? err.error : `Request failed (${res.status})`
    );
  }
  return res.json();
}

export async function getProgress(): Promise<ProgressState> {
  if (!(await isAuthenticated())) {
    return readLocalProgress();
  }

  const now = Date.now();
  if (progressCache && progressCache.expiresAt > now) {
    return progressCache.value;
  }

  if (inFlightProgressRequest) {
    return inFlightProgressRequest;
  }

  inFlightProgressRequest = (async () => {
    await migrateGuestProgressIfNeeded();
    const res = await fetch(API_URL, { credentials: "include" });
    const data = await handleResponse<ProgressState>(res);
    progressCache = {
      value: data,
      expiresAt: Date.now() + PROGRESS_CACHE_TTL_MS,
    };
    return data;
  })();

  try {
    return await inFlightProgressRequest;
  } finally {
    inFlightProgressRequest = null;
  }
}

export async function saveProgress(state: ProgressState): Promise<ProgressState> {
  if (!(await isAuthenticated())) {
    const merged = mergeProgressState(readLocalProgress(), state);
    writeLocalProgress(merged);
    return merged;
  }

  inFlightProgressRequest = null;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(state),
  });
  const data = await handleResponse<ProgressState>(res);
  progressCache = {
    value: data,
    expiresAt: Date.now() + PROGRESS_CACHE_TTL_MS,
  };
  return data;
}

export function getTopicProgress(
  state: ProgressState,
  topicId: string
): TopicProgress {
  return (
    state.topics[topicId] ?? {
      topicId,
      completed: false,
      completedAt: null,
      quizAttempts: [],
      bestQuizScore: 0,
      postLessonMcqAttempts: [],
    }
  );
}

export function markTopicComplete(
  state: ProgressState,
  topicId: string
): ProgressState {
  const existing = getTopicProgress(state, topicId);
  return {
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...existing,
        completed: true,
        completedAt: existing.completedAt ?? new Date().toISOString(),
      },
    },
  };
}

export function updateCardState(
  state: ProgressState,
  card: SRSCardState
): ProgressState {
  return {
    ...state,
    cards: {
      ...state.cards,
      [card.cardId]: card,
    },
  };
}

export function addQuizAttempt(
  state: ProgressState,
  topicId: string,
  attempt: QuizAttempt
): ProgressState {
  const existing = getTopicProgress(state, topicId);
  const updatedAttempts = [...existing.quizAttempts, attempt];
  const bestScore = Math.max(existing.bestQuizScore, attempt.averageScore);
  return {
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...existing,
        quizAttempts: updatedAttempts,
        bestQuizScore: bestScore,
      },
    },
  };
}

const POST_LESSON_MCQ_CAP = 3;

export function addPostLessonMcqAttempt(
  state: ProgressState,
  topicId: string,
  attempt: PostLessonMcqAttempt
): ProgressState {
  const existing = getTopicProgress(state, topicId);
  const prev = existing.postLessonMcqAttempts ?? [];
  const postLessonMcqAttempts = [...prev, attempt].slice(-POST_LESSON_MCQ_CAP);
  return {
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...existing,
        postLessonMcqAttempts,
      },
    },
  };
}

export function setTopicLastLearnSection(
  state: ProgressState,
  topicId: string,
  sectionIndex: number
): ProgressState {
  const existing = getTopicProgress(state, topicId);
  return {
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...existing,
        lastLearnSectionIndex: sectionIndex,
      },
    },
  };
}
