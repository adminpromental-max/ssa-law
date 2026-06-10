import type { TeamStructure } from "@/data/team";
import type { Service } from "@/data/services";

export interface ImportantLink {
  id: string;
  title: string;
  href: string;
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
  contactSubmissions: ContactSubmission[];
  bookingSubmissions: BookingSubmission[];
  visitorCount: number;
  adminPasswordHash?: string;
}
