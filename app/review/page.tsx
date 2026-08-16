import { ReviewClient } from "./review-client";
import { getAllTopics } from "@/lib/topics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review — AI Expert",
};

export default function ReviewPage() {
  const allTopics = getAllTopics();
  const flashcardMap: Record<string, { front: string; back: string; topicTitle: string }> = {};

  for (const topic of allTopics) {
    for (const card of topic.flashcards) {
      flashcardMap[card.id] = {
        front: card.front,
        back: card.back,
        topicTitle: topic.title,
      };
    }
  }

  return <ReviewClient flashcardMap={flashcardMap} />;
}
