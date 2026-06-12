import {
  Scale,
  Landmark,
  Briefcase,
  Search,
  BookOpen,
  ScrollText,
  Building2,
  type LucideIcon,
} from "lucide-react";

const linkIconRules: { match: RegExp; icon: LucideIcon }[] = [
  { match: /الأنظمة|نظام/, icon: ScrollText },
  { match: /سوابق/, icon: BookOpen },
  { match: /استعلام|سجل/, icon: Search },
  { match: /العمل|موارد/, icon: Briefcase },
  { match: /تجاري/, icon: Building2 },
  { match: /محكمة|قضاء|قضائي/, icon: Landmark },
];

export function getLinkIcon(title: string): LucideIcon {
  for (const rule of linkIconRules) {
    if (rule.match.test(title)) return rule.icon;
  }
  return Scale;
}
