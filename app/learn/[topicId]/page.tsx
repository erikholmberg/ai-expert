import { getTopicById, getAllTopics } from "@/lib/topics";
import { notFound } from "next/navigation";
import { LearnClient } from "./learn-client";

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
  return { title: topic ? `${topic.title} — AI Expert` : "Not Found" };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  if (!topic) notFound();

  const allTopics = getAllTopics();
  const currentIndex = allTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  return (
    <LearnClient
      topic={topic}
      prevTopic={prevTopic ? { id: prevTopic.id, title: prevTopic.title } : null}
      nextTopic={nextTopic ? { id: nextTopic.id, title: nextTopic.title } : null}
    />
  );
}
