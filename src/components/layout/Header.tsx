"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 bg-warm-950/95 md:backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Logo onClick={() => setOpen(false)} />

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-cream/80 hover:text-gold text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <WhatsAppLink
                phone={siteConfig.contact.phone}
                label="جوال"
                className="text-cream/60"
              />
              <Button href="/book" size="sm">
                احجز استشارة
              </Button>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-cream p-2 -mr-2"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-warm-950"
          aria-hidden="true"
        >
          <div className="flex flex-col h-full pt-16 sm:pt-20">
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-4 text-cream text-base hover:text-gold hover:bg-gold/5 rounded-sm transition-colors border-b border-gold/5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 space-y-4 px-4">
                <Button href="/book" className="w-full" onClick={() => setOpen(false)}>
                  احجز استشارة
                </Button>
                <div className="flex justify-center py-2">
                  <WhatsAppLink
                    phone={siteConfig.contact.phone}
                    label="جوال"
                    className="text-gold"
                    showNumber="always"
                  />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
