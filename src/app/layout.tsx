import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cairo } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/data/site";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141210",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className={`${cairo.className} antialiased`}>
        {!isAdmin && <Header />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
      </body>
    </html>
  );
}
