import { readDb } from "@/lib/db";
import { teamStructure } from "@/data/team";
import { services as staticServices } from "@/data/services";
import { importantLinks as staticLinks } from "@/data/links";
import type { TeamStructure } from "@/data/team";
import type { Service } from "@/data/services";
import type { ImportantLink } from "@/lib/db/types";

export async function getTeamStructure(): Promise<TeamStructure> {
  try {
    const db = await readDb();
    return db.team;
  } catch {
    return teamStructure;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const db = await readDb();
    return db.services;
  } catch {
    return staticServices;
  }
}

export async function getImportantLinks(): Promise<ImportantLink[]> {
  try {
    const db = await readDb();
    return db.importantLinks;
  } catch {
    return staticLinks.map((link, i) => ({
      id: `link-${i + 1}`,
      title: link.title,
      href: link.href,
    }));
  }
}

export async function getVisitorCount(): Promise<number> {
  try {
    const db = await readDb();
    return db.visitorCount;
  } catch {
    return 500;
  }
}
