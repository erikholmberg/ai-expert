import { emptyProgress, mergeProgressState, normalizeProgress } from "./progress-merge";
import {
  PostLessonMcqAttempt,
  ProgressState,
  TopicProgress,
  SRSCardState,
  QuizAttempt,
} from "./types";

const LOCAL_PROGRESS_KEY = "ai-expert:guest-progress";

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

export async function getProgress(): Promise<ProgressState> {
  return readLocalProgress();
}

export async function saveProgress(state: ProgressState): Promise<ProgressState> {
  const merged = mergeProgressState(readLocalProgress(), state);
  writeLocalProgress(merged);
  return merged;
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
