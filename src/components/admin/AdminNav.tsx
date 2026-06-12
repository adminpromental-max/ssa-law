"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Link2,
  Inbox,
  Settings,
  LogOut,
  Globe,
  Home,
  Briefcase,
  Building2,
  Newspaper,
} from "lucide-react";

const links = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/site", label: "إعدادات الموقع", icon: Globe },
  { href: "/admin/homepage", label: "محتوى الرئيسية", icon: Home },
  { href: "/admin/services", label: "الخدمات", icon: Briefcase },
  { href: "/admin/team", label: "فريق العمل", icon: Users },
  { href: "/admin/clients", label: "العملاء", icon: Building2 },
  { href: "/admin/articles", label: "المقالات", icon: Newspaper },
  { href: "/admin/links", label: "روابط هامة", icon: Link2 },
  { href: "/admin/submissions", label: "الطلبات", icon: Inbox },
  { href: "/admin/settings", label: "كلمة المرور", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-warm-900 border-l border-gold/10 lg:max-h-screen lg:sticky lg:top-0 lg:overflow-y-auto">
      <div className="p-6 border-b border-gold/10">
        <p className="text-gold text-sm font-medium">لوحة التحكم</p>
        <p className="text-cream font-bold text-sm mt-1">مكتب صالح العمري</p>
      </div>
      <nav className="p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm transition-colors ${
                active
                  ? "bg-gold/15 text-gold border border-gold/25"
                  : "text-cream/70 hover:text-gold hover:bg-gold/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gold/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-cream/60 hover:text-red-400 text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
