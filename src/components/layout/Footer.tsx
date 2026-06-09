import Link from "next/link";
import { Mail, MapPin, Printer } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Footer() {
  return (
    <footer className="section-deep border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="sm" />
              <p className="text-gold/60 text-xs mt-3">شركة مهنية</p>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="text-gold/60 text-xs mt-4">
              ترخيص رقم: {siteConfig.license}
            </p>
          </div>

          <div>
            <h4 className="text-gold font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold mb-6">خدماتنا</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/legal-consultation"
                  className="text-cream/60 hover:text-gold text-sm transition-colors"
                >
                  الاستشارات القانونية
                </Link>
              </li>
              <li>
                <Link
                  href="/services/contracts"
                  className="text-cream/60 hover:text-gold text-sm transition-colors"
                >
                  العقود والاتفاقيات
                </Link>
              </li>
              <li>
                <Link
                  href="/services/arbitration"
                  className="text-cream/60 hover:text-gold text-sm transition-colors"
                >
                  التحكيم والمنازعات
                </Link>
              </li>
              <li>
                <Link
                  href="/services/notarization"
                  className="text-cream/60 hover:text-gold text-sm transition-colors"
                >
                  التوثيق
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-cream/60 text-sm">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li>
                <WhatsAppLink
                  phone={siteConfig.contact.phone}
                  className="text-cream/60"
                />
              </li>
              <li className="flex items-center gap-3">
                <Printer className="w-4 h-4 text-gold shrink-0" />
                <span className="text-cream/60 text-sm" dir="ltr">
                  {siteConfig.contact.fax}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-cream/60 hover:text-gold text-sm transition-colors"
                  dir="ltr"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} {siteConfig.fullName}. جميع الحقوق
            محفوظة.
          </p>
          <p className="text-cream/40 text-sm" dir="ltr">
            {siteConfig.contact.website}
          </p>
        </div>
      </div>
    </footer>
  );
}
