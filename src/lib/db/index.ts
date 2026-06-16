import fs from "fs/promises";
import path from "path";
import { get, put, list, BlobNotFoundError } from "@vercel/blob";
import { createSeedDatabase } from "./seed";
import type { Database } from "./types";
import { canUseBlob as checkBlob, getBlobOptions } from "./blob";

const BLOB_PATHNAME = "ssa-law/database.json";

export function canUseBlob(): boolean {
  return checkBlob();
}
export function hasBlobStorage(): boolean {
  return checkBlob();
}

function getLocalDbPath(): string {
  return path.join(process.cwd(), "data", "database.json");
}

function getSeedPath(): string {
  return path.join(process.cwd(), "data", "database.seed.json");
}

function normalizeDb(data: Partial<Database>): Database {
  const seed = createSeedDatabase();
  return {
    team: data.team ?? seed.team,
    services: data.services?.length ? data.services : seed.services,
    importantLinks: data.importantLinks ?? seed.importantLinks,
    clients: data.clients?.length ? data.clients : seed.clients,
    articles: data.articles?.length ? data.articles : seed.articles,
    siteSettings: {
      ...seed.siteSettings,
      ...(data.siteSettings ?? {}),
      phone:
        data.siteSettings?.phone ??
        data.siteSettings?.mobiles?.[0] ??
        seed.siteSettings.phone,
      fax:
        data.siteSettings?.fax ??
        data.siteSettings?.mobiles?.[1] ??
        seed.siteSettings.fax,
    },
    homepage: {
      ...seed.homepage,
      ...(data.homepage ?? {}),
      values: data.homepage?.values?.length
        ? data.homepage.values
        : seed.homepage.values,
      aboutParagraphs: data.homepage?.aboutParagraphs?.length
        ? data.homepage.aboutParagraphs
        : seed.homepage.aboutParagraphs,
      whyUsItems: data.homepage?.whyUsItems?.length
        ? data.homepage.whyUsItems
        : seed.homepage.whyUsItems,
    },
    contactSubmissions: data.contactSubmissions ?? [],
    bookingSubmissions: data.bookingSubmissions ?? [],
    visitorCount: Math.max(data.visitorCount ?? 4000, 4000),
    adminPasswordHash: data.adminPasswordHash,
  };
}

async function readLocalFile(): Promise<Database | null> {
  try {
    const raw = await fs.readFile(getLocalDbPath(), "utf-8");
    return normalizeDb(JSON.parse(raw) as Database);
  } catch {
    return null;
  }
}

async function writeLocalFile(data: Database): Promise<boolean> {
  try {
    const dbPath = getLocalDbPath();
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("[db] local write failed:", error);
    return false;
  }
}

async function readFromBlob(): Promise<Database | null> {
  if (!canUseBlob()) return null;

  const opts = getBlobOptions();

  try {
    const result = await get(BLOB_PATHNAME, {
      access: "private",
      useCache: false,
      ...opts,
    });

    if (result?.statusCode === 200 && result.stream) {
      const text = await new Response(result.stream).text();
      return normalizeDb(JSON.parse(text) as Database);
    }
  } catch (error) {
    if (!(error instanceof BlobNotFoundError)) {
      console.error("[db] blob get failed:", error);
    }
  }

  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, ...opts });
    const match = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (match?.url) {
      const res = await fetch(match.url, { cache: "no-store" });
      if (res.ok) {
        return normalizeDb((await res.json()) as Database);
      }
    }
  } catch (error) {
    console.error("[db] blob list failed:", error);
  }

  return null;
}

async function writeToBlob(data: Database): Promise<boolean> {
  if (!canUseBlob()) return false;

  try {
    await put(BLOB_PATHNAME, JSON.stringify(data, null, 2), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      ...getBlobOptions(),
    });
    return true;
  } catch (error) {
    console.error("[db] blob write failed:", error);
    return false;
  }
}

async function seedDatabase(): Promise<Database> {
  try {
    const raw = await fs.readFile(getSeedPath(), "utf-8");
    const parsed = JSON.parse(raw) as Database;
    if (parsed.team && parsed.importantLinks) return normalizeDb(parsed);
  } catch {
    // use code seed
  }
  return createSeedDatabase();
}

export async function readDb(): Promise<Database> {
  try {
    if (canUseBlob()) {
      const fromBlob = await readFromBlob();
      if (fromBlob) return fromBlob;

      const seeded = await seedDatabase();
      await writeToBlob(seeded);
      return seeded;
    }

    const fromLocal = await readLocalFile();
    if (fromLocal) return fromLocal;

    const seeded = await seedDatabase();
    await writeLocalFile(seeded);
    return seeded;
  } catch (error) {
    console.error("[db] readDb error:", error);
    return createSeedDatabase();
  }
}

export async function writeDb(data: Database): Promise<void> {
  const normalized = normalizeDb(data);

  if (canUseBlob()) {
    const blobOk = await writeToBlob(normalized);
    if (!blobOk) {
      throw new Error("فشل الحفظ على التخزين الدائم");
    }
    return;
  }

  const localOk = await writeLocalFile(normalized);
  if (!localOk) {
    throw new Error("فشل الحفظ محلياً");
  }
}

export async function updateDb(
  updater: (db: Database) => Database | void
): Promise<Database> {
  const db = await readDb();
  const result = updater(db);
  const updated = normalizeDb((result ?? db) as Database);
  await writeDb(updated);
  return updated;
}

export async function testBlobStorage(): Promise<{
  ok: boolean;
  canRead: boolean;
  canWrite: boolean;
  hasData: boolean;
  error?: string;
}> {
  if (!canUseBlob()) {
    return {
      ok: false,
      canRead: false,
      canWrite: false,
      hasData: false,
      error: "Blob غير مفعّل — فعّلي BLOB_READ_WRITE_TOKEN على Production",
    };
  }

  try {
    const existing = await readFromBlob();

    if (existing) {
      return {
        ok: true,
        canRead: true,
        canWrite: true,
        hasData: true,
      };
    }

    await put("ssa-law/.health-check", "ok", {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      ...getBlobOptions(),
    });

    return {
      ok: true,
      canRead: false,
      canWrite: true,
      hasData: false,
    };
  } catch (error) {
    return {
      ok: false,
      canRead: false,
      canWrite: false,
      hasData: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
