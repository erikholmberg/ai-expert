export interface TopicSection {
  heading: string;
  content: string;
  keyTakeaway: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Topic {
  id: string;
  title: string;
  pillar: string;
  order: number;
  sections: TopicSection[];
  flashcards: Flashcard[];
  quizPrompts: string[];
}

export interface SRSCardState {
  cardId: string;
  topicId: string;
  interval: number;
  repetition: number;
  efactor: number;
  nextReview: string; // ISO date string
  lastReview: string | null;
}

export interface QuizAttempt {
  topicId: string;
  date: string;
  questions: {
    question: string;
    answer: string;
    score: number;
    feedback: string;
    modelAnswer: string;
  }[];
  averageScore: number;
}

/** One post-lesson MCQ check-in (two questions) after "Mark as Complete". */
export interface PostLessonMcqAttempt {
  date: string;
  /** Fraction correct, 0 / 0.5 / 1 for two questions */
  score: number;
  questions: {
    prompt: string;
    chosenIndex: number;
    correctIndex: number;
  }[];
}

export interface TopicProgress {
  topicId: string;
  completed: boolean;
  completedAt: string | null;
  quizAttempts: QuizAttempt[];
  bestQuizScore: number;
  /** Last few post-lesson MCQ sessions (newest last); capped when saving */
  postLessonMcqAttempts?: PostLessonMcqAttempt[];
  /** Last section index the learner viewed (0-based); used for resume */
  lastLearnSectionIndex?: number;
}

export interface LearningBookmark {
  id: string;
  topicId: string;
  topicTitle: string;
  sectionIndex: number;
  sectionHeading: string;
  excerpt: string;
  createdAt: string;
}

export interface ProgressState {
  topics: Record<string, TopicProgress>;
  cards: Record<string, SRSCardState>;
  lastUpdated: string;
  /** Keyed by bookmark id; omitted on older clients until normalize */
  bookmarks?: Record<string, LearningBookmark>;
  /** Ephemeral: applied during merge, not persisted */
  bookmarkDeleteIds?: string[];
}

export interface GeneratedQuestion {
  question: string;
  type: "explain" | "scenario" | "compare";
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  modelAnswer: string;
}
