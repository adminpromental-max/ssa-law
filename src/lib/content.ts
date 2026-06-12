import { unstable_noStore as noStore } from "next/cache";
import { readDb } from "@/lib/db";
import { teamStructure as defaultTeamStructure } from "@/data/team";
import { services as staticServices } from "@/data/services";
import { importantLinks as staticLinks } from "@/data/links";
import type { TeamMember, TeamStructure } from "@/data/team";
import type { Service } from "@/data/services";
import type { ImportantLink } from "@/lib/db/types";

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
    return db.services;
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

export async function getVisitorCount(): Promise<number> {
  noStore();
  try {
    const db = await readDb();
    return db.visitorCount;
  } catch {
    return 500;
  }
}
