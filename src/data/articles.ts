export interface Article {
  id: string;
  slug: string;
  title: string;
  publishDate: string;
  image: string;
  excerpt?: string;
}

export const articles: Article[] = [
  {
    id: "article-1",
    slug: "saudi-labor-law-updates",
    title: "نظام العمل السعودي وأهم التعديلات الأخيرة",
    publishDate: "2026-03-15",
    image: "/images/articles/labor-law.png",
    excerpt:
      "نظرة على أبرز التعديلات في نظام العمل وما يعنيه ذلك لأصحاب الأعمال والموظفين.",
  },
  {
    id: "article-2",
    slug: "commercial-arbitration-guide",
    title: "دليل التحكيم التجاري في المملكة",
    publishDate: "2026-02-08",
    image: "/images/articles/arbitration.png",
    excerpt:
      "كيف تختار المحكم المناسب وما هي خطوات إجراءات التحكيم التجاري بفعالية.",
  },
  {
    id: "article-3",
    slug: "company-establishment-steps",
    title: "خطوات تأسيس شركة في السعودية",
    publishDate: "2026-01-20",
    image: "/images/articles/company-setup.png",
    excerpt:
      "دليل عملي من اختيار الكيان القانوني حتى إتمام السجل التجاري والتراخيص.",
  },
];

export function getLatestArticles(limit = 3): Article[] {
  return [...articles]
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, limit);
}
