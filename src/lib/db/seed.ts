import { teamStructure } from "@/data/team";
import { services } from "@/data/services";
import { importantLinks as staticLinks } from "@/data/links";
import type { Database } from "./types";

export function createSeedDatabase(): Database {
  return {
    team: teamStructure,
    services,
    importantLinks: staticLinks.map((link, i) => ({
      id: `link-${i + 1}`,
      title: link.title,
      href: link.href,
    })),
    contactSubmissions: [],
    bookingSubmissions: [],
    visitorCount: 500,
  };
}
