"use client";

import { Carousel } from "@/components/ui/Carousel";
import { ArticleCard } from "@/components/ui/ArticleCard";
import type { ArticleRecord } from "@/lib/db/types";

interface LatestArticlesProps {
  articles: ArticleRecord[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <Carousel
      ariaLabel="أحدث المقالات"
      slidesMobile={1}
      slidesDesktop={3}
      className="carousel-articles"
    >
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Carousel>
  );
}
