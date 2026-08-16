import { SRSCardState } from "./types";

export function createNewCardState(
  cardId: string,
  topicId: string
): SRSCardState {
  return {
    cardId,
    topicId,
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    nextReview: new Date().toISOString(),
    lastReview: null,
  };
}

/**
 * SM-2 algorithm implementation.
 * quality: 0-5 rating where:
 *   0 = complete blackout
 *   1 = incorrect, but recognized correct answer
 *   2 = incorrect, but correct seemed easy to recall
 *   3 = correct with serious difficulty
 *   4 = correct with hesitation
 *   5 = perfect response
 */
export function reviewCard(
  card: SRSCardState,
  quality: number
): SRSCardState {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  const now = new Date();

  let { interval, repetition, efactor } = card;

  if (q < 3) {
    repetition = 0;
    interval = 1;
  } else {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * efactor);
    }
    repetition += 1;
  }

  efactor = efactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (efactor < 1.3) efactor = 1.3;

  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    ...card,
    interval,
    repetition,
    efactor: Math.round(efactor * 100) / 100,
    nextReview: nextReview.toISOString(),
    lastReview: now.toISOString(),
  };
}

export function isDue(card: SRSCardState): boolean {
  return new Date(card.nextReview) <= new Date();
}

export function getDueCards(cards: Record<string, SRSCardState>): SRSCardState[] {
  return Object.values(cards).filter(isDue);
}
