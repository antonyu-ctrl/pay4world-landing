import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { DEFAULT_CONFIG, deepMerge, migrateConfig } from "@/lib/siteConfig";
import { getAdminPassword } from "@/lib/serverPassword";

const CONFIG_PATH = join(process.cwd(), "data", "site-config.json");

function getRedis(): Redis | null {
  try {
    const url =
      process.env.UPSTASH_REDIS_REST_URL ??
      process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
    const token =
      process.env.UPSTASH_REDIS_REST_TOKEN ??
      process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
    if (url && token) {
      return new Redis({ url, token });
    }
  } catch {}
  return null;
}

async function readConfig(): Promise<Record<string, unknown> | null> {
  // Try Redis first (production)
  const redis = getRedis();
  if (redis) {
    try {
      const raw = await redis.get<Record<string, unknown>>("site-config");
      if (raw) return raw;
    } catch {}
  }

  // Try file (local dev)
  try {
    return JSON.parse(await readFile(CONFIG_PATH, "utf-8"));
  } catch {}

  return null;
}

async function writeConfig(data: unknown): Promise<void> {
  // Try Redis first (production)
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("site-config", JSON.stringify(data));
      return;
    } catch {}
  }

  // Fallback to file (local dev)
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await writeFile(CONFIG_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const raw = await readConfig();
    if (raw) {
      const migrated = migrateConfig(raw);
      const merged = deepMerge(DEFAULT_CONFIG, migrated as Record<string, unknown>);
      return NextResponse.json(merged);
    }
  } catch {}
  return NextResponse.json(DEFAULT_CONFIG);
}

export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  const expected = await getAdminPassword();

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    await writeConfig(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save config", details: String(err) },
      { status: 500 }
    );
  }
}
