import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProgressPool } from "@/lib/db";
import {
  emptyProgress,
  mergeProgressState,
  normalizeProgress,
} from "@/lib/progress-merge";
import type { ProgressState } from "@/lib/types";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pool = getProgressPool();
    const result = await pool.query<{ data: unknown }>(
      "SELECT data FROM user_progress WHERE user_id = $1",
      [session.user.id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json(emptyProgress());
    }
    return NextResponse.json(normalizeProgress(result.rows[0].data));
  } catch (e) {
    console.error("Progress GET error:", e);
    return NextResponse.json(
      { error: "Failed to load progress" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let incoming: ProgressState;
  try {
    incoming = (await req.json()) as ProgressState;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const pool = getProgressPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const locked = await client.query<{ data: unknown }>(
      "SELECT data FROM user_progress WHERE user_id = $1 FOR UPDATE",
      [session.user.id]
    );
    const disk =
      locked.rows.length > 0
        ? normalizeProgress(locked.rows[0].data)
        : emptyProgress();
    const next = mergeProgressState(disk, incoming);
    await client.query(
      `INSERT INTO user_progress (user_id, data, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (user_id) DO UPDATE SET
         data = EXCLUDED.data,
         updated_at = EXCLUDED.updated_at`,
      [session.user.id, JSON.stringify(next)]
    );
    await client.query("COMMIT");
    return NextResponse.json(next);
  } catch (e) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Progress POST error:", e);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
