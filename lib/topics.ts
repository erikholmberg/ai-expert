import { Topic } from "./types";
import fs from "fs";
import path from "path";

const TOPICS_DIR = path.join(process.cwd(), "content", "topics");

let topicsCache: Topic[] | null = null;

export function getAllTopics(): Topic[] {
  if (topicsCache) return topicsCache;

  const files = fs
    .readdirSync(TOPICS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  topicsCache = files.map((file) => {
    const raw = fs.readFileSync(path.join(TOPICS_DIR, file), "utf-8");
    return JSON.parse(raw) as Topic;
  });

  return topicsCache;
}

export function getTopicById(id: string): Topic | undefined {
  return getAllTopics().find((t) => t.id === id);
}

export function getTopicsByPillar(): Record<string, Topic[]> {
  const topics = getAllTopics();
  const grouped: Record<string, Topic[]> = {};
  for (const topic of topics) {
    if (!grouped[topic.pillar]) grouped[topic.pillar] = [];
    grouped[topic.pillar].push(topic);
  }
  return grouped;
}

export function getPillarOrder(): string[] {
  return [
    "Technical Foundations",
    "AI Product Craft",
    "Strategy and Business",
    "Safety, Ethics, and Governance",
  ];
}
