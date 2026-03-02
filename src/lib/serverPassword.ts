import { Redis } from "@upstash/redis";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const PW_PATH = join(process.cwd(), "data", "admin-password.txt");

function getRedis(): Redis | null {
  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
    }
  } catch {}
  return null;
}

/** Read current admin password: Redis first → file fallback → env var */
export async function getAdminPassword(): Promise<string> {
  // Try Redis (production)
  const redis = getRedis();
  if (redis) {
    try {
      const pw = await redis.get<string>("admin-password");
      if (pw) return pw;
    } catch {}
  }

  // Try file (local dev)
  try {
    const pw = (await readFile(PW_PATH, "utf-8")).trim();
    if (pw) return pw;
  } catch {}

  return process.env.ADMIN_PASSWORD ?? "";
}

/** Write new admin password: Redis first → file fallback */
export async function setAdminPassword(password: string): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("admin-password", password);
      return;
    } catch {}
  }

  // Fallback to file (local dev)
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await writeFile(PW_PATH, password, "utf-8");
}
