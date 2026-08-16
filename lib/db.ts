import { Pool } from "pg";

const globalForPool = globalThis as unknown as { progressPool: Pool | undefined };

export function getProgressPool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!globalForPool.progressPool) {
    globalForPool.progressPool = new Pool({
      connectionString: url,
      max: 5,
    });
  }
  return globalForPool.progressPool;
}
