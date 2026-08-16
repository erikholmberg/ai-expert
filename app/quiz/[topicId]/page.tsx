import { getTopicById, getAllTopics } from "@/lib/topics";
import { notFound } from "next/navigation";
import { QuizClient } from "./quiz-client";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((t) => ({ topicId: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  return {
    title: topic ? `Quiz: ${topic.title} — AI Expert` : "Not Found",
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  if (!topic) notFound();

  const topicContext = topic.sections
    .map((s) => `${s.heading}: ${s.keyTakeaway}`)
    .join(". ");

  return (
    <QuizClient
      topicId={topic.id}
      topicTitle={topic.title}
      topicContext={topicContext}
      sections={topic.sections}
      quizPrompts={topic.quizPrompts}
    />
  );
}
