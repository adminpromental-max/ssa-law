import { siteConfig, values } from "@/data/site";
import { clients } from "@/data/clients";
import { articles as staticArticles } from "@/data/articles";
import type { SiteSettings, HomepageContent, ClientRecord, ArticleRecord } from "./types";

export function createDefaultSiteSettings(): SiteSettings {
  return {
    name: siteConfig.name,
    fullName: siteConfig.fullName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    license: siteConfig.license,
    foundedYear: siteConfig.foundedYear,
    address: siteConfig.contact.address,
    phone: siteConfig.contact.phone,
    fax: siteConfig.contact.fax,
    mobiles: [siteConfig.contact.phone],
    email: siteConfig.contact.email,
    website: siteConfig.contact.website,
    casesBase: 1000,
    requestsBase: 250,
  };
}

export function createDefaultHomepageContent(): HomepageContent {
  return {
    heroDescription:
      "خبرة قانونية متميزة في جميع المجالات — من الاستشارات والعقود إلى التحكيم والتوثيق. نضمن لكم أفضل الخدمات القانونية بسرية وفعالية.",
    aboutSubtitle: "من نحن",
    aboutTitle: "خبرة قانونية تضمن نتائج",
    aboutParagraphs: [
      "مكتب صالح بن سلمان العمري شركة مهنية متخصصة في تقديم حزمة شاملة من الخدمات القانونية. نتعامل مع القضايا بشتى أصنافها من جنائية وعمالية والنزاعات التجارية المعقدة، وتأسيس الشركات وتقسيم التركات.",
      "هدفنا توفير استراتيجيات لحماية الأصول التجارية لعملائنا ومصالحهم، مع تقديم خدمات تتناسب مع متطلبات كل عميل بعينه.",
    ],
    values: values.map((v) => ({ ...v })),
    whyUsItems: [
      "خبرة طويلة في ممارسة القانون بشتى مجالاته",
      "فريق متخصص ذو مؤهلات علمية ومهنية عالية",
      "ثقة جهات رسمية وشركات وطنية رائدة",
      "سرية تامة وفعالية في تحقيق النتائج",
      "مرونة وإبداع في جميع مجالات الأعمال القانونية",
      "خدمات مخصصة تتناسب مع احتياجات كل عميل",
    ],
    ctaTitle: "هل تحتاج استشارة قانونية؟",
    ctaDescription:
      "تواصل معنا اليوم واحجز موعد استشارتك. فريقنا جاهز لخدمتكم.",
    teamPreviewHeading:
      "فريق عمل مؤهل بخبرة كبيرة في مجال القانون بشتى مجالاته",
    teamLeaderLine: "تحت قيادة المحامي: صالح بن سلمان العمري",
    servicesSectionSubtitle: "خدماتنا",
    servicesSectionTitle: "مجالات الخدمات القانونية",
    servicesSectionDescription:
      "مرر على أي مجال لمعرفة المزيد — أو اضغط للتفاصيل",
    articlesSectionSubtitle: "المعرفة القانونية",
    articlesSectionTitle: "أحدث المقالات",
    articlesSectionDescription:
      "مقالات ومراجع قانونية تثقيفية من خبراء المكتب",
  };
}

export function createDefaultClients(): ClientRecord[] {
  return clients.map((client, index) => ({
    id: `client-${index + 1}`,
    name: client.name,
    shortName: client.shortName,
    description: client.description,
    initials: client.initials,
    logo: client.logo,
  }));
}

export function createDefaultArticles(): ArticleRecord[] {
  return staticArticles.map((article) => ({ ...article }));
}

export const IMAGE_SIZE_HINTS = {
  teamMember: "600 × 750 بكسل (المدير العام: 800 × 720)",
  teamLead: "800 × 720 بكسل",
  article: "800 × 520 بكسل",
  clientLogo: "200 × 80 بكسل — PNG شفاف",
  banner: "1920 × 480 بكسل",
} as const;
