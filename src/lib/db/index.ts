import fs from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import { createSeedDatabase } from "./seed";
import type { Database } from "./types";

const BLOB_PATHNAME = "ssa-law/database.json";

function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getLocalDbPath(): string {
  return path.join(process.cwd(), "data", "database.json");
}

function getSeedPath(): string {
  return path.join(process.cwd(), "data", "database.seed.json");
}

async function readLocalFile(): Promise<Database | null> {
  try {
    const raw = await fs.readFile(getLocalDbPath(), "utf-8");
    return JSON.parse(raw) as Database;
  } catch {
    return null;
  }
}

async function writeLocalFile(data: Database): Promise<void> {
  const dbPath = getLocalDbPath();
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

async function readFromBlob(): Promise<Database | null> {
  if (!hasBlobStorage()) return null;

  try {
    const meta = await head(BLOB_PATHNAME, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Database;
  } catch {
    return null;
  }
}

async function writeToBlob(data: Database): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

async function seedDatabase(): Promise<Database> {
  try {
    const raw = await fs.readFile(getSeedPath(), "utf-8");
    const parsed = JSON.parse(raw) as Database;
    if (parsed.team && parsed.importantLinks) return parsed;
  } catch {
    // use code seed
  }
  return createSeedDatabase();
}

export async function readDb(): Promise<Database> {
  const fromBlob = await readFromBlob();
  if (fromBlob) return fromBlob;

  const fromLocal = await readLocalFile();
  if (fromLocal) return fromLocal;

  const seeded = await seedDatabase();
  await writeDb(seeded);
  return seeded;
}

export async function writeDb(data: Database): Promise<void> {
  if (hasBlobStorage()) {
    await writeToBlob(data);
  }
  await writeLocalFile(data);
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
