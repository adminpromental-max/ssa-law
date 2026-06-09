import fs from "fs/promises";
import path from "path";
import { get, put, BlobNotFoundError } from "@vercel/blob";
import { createSeedDatabase } from "./seed";
import type { Database } from "./types";

const BLOB_PATHNAME = "ssa-law/database.json";

export function isRemoteStorage(): boolean {
  return Boolean(
    process.env.VERCEL ||
      process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_STORE_ID
  );
}

export function hasBlobStorage(): boolean {
  return isRemoteStorage();
}

function getBlobOptions() {
  const options: { storeId?: string; token?: string } = {};
  if (process.env.BLOB_STORE_ID) options.storeId = process.env.BLOB_STORE_ID;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    options.token = process.env.BLOB_READ_WRITE_TOKEN;
  }
  return options;
}

function getLocalDbPath(): string {
  if (process.env.VERCEL) {
    return "/tmp/ssa-law-database.json";
  }
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
  try {
    const result = await get(BLOB_PATHNAME, {
      access: "public",
      ...getBlobOptions(),
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return null;
    }

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as Database;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return null;
    console.error("[db] Blob read failed:", error);
    return null;
  }
}

async function writeToBlob(data: Database): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...getBlobOptions(),
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

let initPromise: Promise<void> | null = null;

async function ensureRemoteDbInitialized(): Promise<Database> {
  const seeded = await seedDatabase();
  await writeToBlob(seeded);
  return seeded;
}

export async function readDb(): Promise<Database> {
  if (isRemoteStorage()) {
    const fromBlob = await readFromBlob();
    if (fromBlob) return fromBlob;

    if (!initPromise) {
      initPromise = ensureRemoteDbInitialized().then(() => undefined);
    }
    await initPromise;

    const afterInit = await readFromBlob();
    if (afterInit) return afterInit;

    return seedDatabase();
  }

  const fromLocal = await readLocalFile();
  if (fromLocal) return fromLocal;

  const seeded = await seedDatabase();
  await writeLocalFile(seeded);
  return seeded;
}

export async function writeDb(data: Database): Promise<void> {
  if (isRemoteStorage()) {
    await writeToBlob(data);
    return;
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

export async function testBlobStorage(): Promise<{
  ok: boolean;
  canRead: boolean;
  canWrite: boolean;
  error?: string;
}> {
  if (!isRemoteStorage()) {
    return { ok: false, canRead: false, canWrite: false, error: "not_remote" };
  }

  try {
    const testData = await readDb();
    await writeToBlob(testData);
    const reread = await readFromBlob();
    return {
      ok: Boolean(reread),
      canRead: Boolean(reread),
      canWrite: true,
    };
  } catch (error) {
    return {
      ok: false,
      canRead: false,
      canWrite: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
