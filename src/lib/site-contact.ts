import { siteConfig } from "@/data/site";
import type { SiteSettings } from "@/lib/db/types";

export interface ResolvedContact {
  phone: string;
  fax: string;
  email: string;
  address: string;
  website: string;
}

export function resolveSiteContact(
  settings?: Partial<SiteSettings> | null
): ResolvedContact {
  const phone =
    settings?.phone ??
    settings?.mobiles?.[0] ??
    siteConfig.contact.phone;
  const fax =
    settings?.fax ??
    settings?.mobiles?.[1] ??
    siteConfig.contact.fax;

  return {
    phone,
    fax,
    email: settings?.email ?? siteConfig.contact.email,
    address: settings?.address ?? siteConfig.contact.address,
    website: settings?.website ?? siteConfig.contact.website,
  };
}
