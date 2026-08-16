import { getTopicById, getAllTopics } from "@/lib/topics";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { QuizHistoryClient } from "./quiz-history-client";

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((t) => ({ topicId: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicId: string }>;
}): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  return {
    title: topic ? `Quiz history: ${topic.title} — AI Expert` : "Not Found",
  };
}

export default async function QuizHistoryPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  if (!topic) notFound();

  return <QuizHistoryClient topicId={topic.id} topicTitle={topic.title} />;
}
