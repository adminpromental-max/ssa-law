import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/data/site";
import "./globals.css";

const sakkalMajalla = localFont({
  src: "../../public/fonts/sakkal-majalla.woff",
  variable: "--font-sakkal",
  display: "swap",
  weight: "400",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | للمحاماة والاستشارات القانونية`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "محامي الرياض",
    "استشارات قانونية",
    "توثيق",
    "تحكيم",
    "محاماة",
    "صالح العمري",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${sakkalMajalla.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
