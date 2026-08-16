import { getAllTopics, getPillarOrder, getTopicsByPillar } from "@/lib/topics";
import { DashboardClient } from "./dashboard-client";

export default function DashboardPage() {
  const topicsByPillar = getTopicsByPillar();
  const pillarOrder = getPillarOrder();
  const allTopics = getAllTopics();

  const topicData = allTopics.map((t) => ({
    id: t.id,
    title: t.title,
    pillar: t.pillar,
    order: t.order,
    flashcardCount: t.flashcards.length,
    flashcardIds: t.flashcards.map((f) => f.id),
  }));

  return (
    <DashboardClient
      topicData={topicData}
      pillarOrder={pillarOrder}
    />
  );
}
