import type { TeamStructure } from "@/data/team";
import type { Service } from "@/data/services";

export interface ImportantLink {
  id: string;
  title: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  license: string;
  foundedYear: string;
  address: string;
  mobiles: string[];
  email: string;
  website: string;
  casesBase: number;
  requestsBase: number;
}

export interface HomepageValue {
  title: string;
  description: string;
}

export interface HomepageContent {
  heroDescription: string;
  aboutSubtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  values: HomepageValue[];
  whyUsItems: string[];
  ctaTitle: string;
  ctaDescription: string;
  teamPreviewHeading: string;
  teamLeaderLine: string;
  servicesSectionSubtitle: string;
  servicesSectionTitle: string;
  servicesSectionDescription: string;
  articlesSectionSubtitle: string;
  articlesSectionTitle: string;
  articlesSectionDescription: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  shortName: string;
  description: string;
  initials: string;
  logo?: string;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  publishDate: string;
  image: string;
  excerpt?: string;
  content?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface BookingSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  createdAt: string;
  read: boolean;
}

export interface Database {
  team: TeamStructure;
  services: Service[];
  importantLinks: ImportantLink[];
  clients: ClientRecord[];
  articles: ArticleRecord[];
  siteSettings: SiteSettings;
  homepage: HomepageContent;
  contactSubmissions: ContactSubmission[];
  bookingSubmissions: BookingSubmission[];
  visitorCount: number;
  adminPasswordHash?: string;
}
