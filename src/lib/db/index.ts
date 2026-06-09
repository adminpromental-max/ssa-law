import fs from "fs/promises";
import path from "path";
import { createSeedDatabase } from "./seed";
import type { Database } from "./types";

function getDbPath(): string {
  if (process.env.VERCEL) {
    return "/tmp/ssa-law-database.json";
  }
  return path.join(process.cwd(), "data", "database.json");
}

function getSeedPath(): string {
  return path.join(process.cwd(), "data", "database.seed.json");
}

async function copySeedToDb(): Promise<Database> {
  const seedPath = getSeedPath();
  const dbPath = getDbPath();

  try {
    const raw = await fs.readFile(seedPath, "utf-8");
    const data = JSON.parse(raw) as Database;
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return data;
  } catch {
    const data = createSeedDatabase();
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return data;
  }
}

export async function readDb(): Promise<Database> {
  const dbPath = getDbPath();
  try {
    const raw = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(raw) as Database;
  } catch {
    return copySeedToDb();
  }
}

export async function writeDb(data: Database): Promise<void> {
  const dbPath = getDbPath();
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function updateDb(
  updater: (db: Database) => Database | void
): Promise<Database> {
  const db = await readDb();
  const result = updater(db);
  const updated = (result ?? db) as Database;
  await writeDb(updated);
  return updated;
}
