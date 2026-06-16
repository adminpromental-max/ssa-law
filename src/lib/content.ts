import { unstable_noStore as noStore } from "next/cache";
import { readDb } from "@/lib/db";
import { teamStructure as defaultTeamStructure } from "@/data/team";
import { services as staticServices } from "@/data/services";
import { importantLinks as staticLinks } from "@/data/links";
import {
  createDefaultSiteSettings,
  createDefaultHomepageContent,
  createDefaultClients,
  createDefaultArticles,
} from "@/lib/db/defaults";
import type { TeamMember, TeamStructure } from "@/data/team";
import type { Service } from "@/data/services";
import type {
  ImportantLink,
  SiteSettings,
  HomepageContent,
  ClientRecord,
  ArticleRecord,
} from "@/lib/db/types";

function mergeMember(
  member: TeamMember,
  fallback?: TeamMember
): TeamMember {
  if (!fallback) return member;
  return {
    ...fallback,
    ...member,
    image: member.image ?? fallback.image,
    bio: member.bio ?? fallback.bio,
    qualifications: member.qualifications ?? fallback.qualifications,
  };
}

function mergeTeamStructure(
  dbTeam: TeamStructure,
  defaults: TeamStructure
): TeamStructure {
  const defaultMembers = new Map<string, TeamMember>();
  defaultMembers.set(defaults.generalManager.id, defaults.generalManager);
  defaultMembers.set(defaults.officeManager.id, defaults.officeManager);
  for (const dept of defaults.departments) {
    for (const member of dept.members) {
      defaultMembers.set(member.id, member);
    }
  }

  return {
    generalManager: mergeMember(
      dbTeam.generalManager,
      defaults.generalManager
    ),
    officeManager: mergeMember(dbTeam.officeManager, defaults.officeManager),
    departments: dbTeam.departments.map((dept) => ({
      ...dept,
      members: dept.members.map((member) =>
        mergeMember(member, defaultMembers.get(member.id))
      ),
    })),
  };
}

export async function getTeamStructure(): Promise<TeamStructure> {
  noStore();
  try {
    const db = await readDb();
    return mergeTeamStructure(db.team, defaultTeamStructure);
  } catch {
    return defaultTeamStructure;
  }
}

export async function getServices(): Promise<Service[]> {
  noStore();
  try {
    const db = await readDb();
    return db.services?.length ? db.services : staticServices;
  } catch {
    return staticServices;
  }
}

export async function getImportantLinks(): Promise<ImportantLink[]> {
  noStore();
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

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  try {
    const db = await readDb();
    return { ...createDefaultSiteSettings(), ...db.siteSettings };
  } catch {
    return createDefaultSiteSettings();
  }
}

export async function getHomepageContent(): Promise<HomepageContent> {
  noStore();
  const defaults = createDefaultHomepageContent();
  try {
    const db = await readDb();
    const hp = db.homepage;
    if (!hp) return defaults;
    return {
      ...defaults,
      ...hp,
      values: hp.values?.length ? hp.values : defaults.values,
      aboutParagraphs: hp.aboutParagraphs?.length
        ? hp.aboutParagraphs
        : defaults.aboutParagraphs,
      whyUsItems: hp.whyUsItems?.length ? hp.whyUsItems : defaults.whyUsItems,
    };
  } catch {
    return defaults;
  }
}

export async function getClients(): Promise<ClientRecord[]> {
  noStore();
  try {
    const db = await readDb();
    return db.clients?.length ? db.clients : createDefaultClients();
  } catch {
    return createDefaultClients();
  }
}

export async function getArticles(): Promise<ArticleRecord[]> {
  noStore();
  try {
    const db = await readDb();
    return db.articles?.length ? db.articles : createDefaultArticles();
  } catch {
    return createDefaultArticles();
  }
}

export async function getLatestArticles(limit = 3): Promise<ArticleRecord[]> {
  const articles = await getArticles();
  return articles.slice(0, limit);
}

export async function getVisitorCount(): Promise<number> {
  noStore();
  try {
    const db = await readDb();
    return db.visitorCount;
  } catch {
    return 4000;
  }
}

export async function getStatsCounts(): Promise<{
  casesBase: number;
  requestsBase: number;
  requestsCount: number;
}> {
  noStore();
  try {
    const db = await readDb();
    const settings = { ...createDefaultSiteSettings(), ...db.siteSettings };
    return {
      casesBase: settings.casesBase,
      requestsBase: settings.requestsBase,
      requestsCount:
        settings.requestsBase +
        db.contactSubmissions.length +
        db.bookingSubmissions.length,
    };
  } catch {
    const settings = createDefaultSiteSettings();
    return {
      casesBase: settings.casesBase,
      requestsBase: settings.requestsBase,
      requestsCount: settings.requestsBase,
    };
  }
}
