import {
  Scale,
  FileText,
  Gavel,
  Building2,
  Stamp,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  Scale,
  FileText,
  Gavel,
  Building2,
  Stamp,
  Briefcase,
};

export function getServiceIcon(name: string): LucideIcon {
  return serviceIconMap[name] || Scale;
}
