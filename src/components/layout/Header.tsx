"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-black/95 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm gold-gradient flex items-center justify-center">
              <span className="text-black font-bold text-lg">ص</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-cream font-bold text-sm leading-tight group-hover:text-gold transition-colors">
                {siteConfig.name}
              </p>
              <p className="text-gold/60 text-xs">للمحاماة والاستشارات القانونية</p>
            </div>
          </Link>

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
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 text-cream/60 hover:text-gold text-sm transition-colors"
              dir="ltr"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.contact.phone}
            </a>
            <Button href="/book" size="sm">
              احجز استشارة
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-cream p-2"
            aria-label="القائمة"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-black-light border-t border-gold/10">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-cream/80 hover:text-gold hover:bg-gold/5 rounded-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Button href="/book" className="w-full">
                احجز استشارة
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
