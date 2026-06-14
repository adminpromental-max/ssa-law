import Link from "next/link";
import Image from "next/image";
import { Calendar, Video } from "lucide-react";
import type { ArticleRecord } from "@/lib/db/types";

function formatPublishDate(date: string): string {
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

interface ArticleCardProps {
  article: ArticleRecord;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const hasVideo = Boolean(article.videoUrl?.trim());

  return (
    <Link
      href={hasVideo ? article.videoUrl! : "/articles"}
      target={hasVideo ? "_blank" : undefined}
      rel={hasVideo ? "noopener noreferrer" : undefined}
      className="article-card group block h-full"
    >
      <div className="article-card-image relative aspect-[16/10] overflow-hidden rounded-sm">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 90vw, 33vw"
        />
        <div className="article-card-image-overlay" />
        {hasVideo && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 text-gold text-xs px-2.5 py-1 rounded-sm">
            <Video className="w-3.5 h-3.5" />
            فيديو
          </div>
        )}
      </div>
      <div className="pt-4 px-1">
        <div className="flex items-center gap-2 text-gold/70 text-xs sm:text-sm mb-2">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <time dateTime={article.publishDate}>
            {formatPublishDate(article.publishDate)}
          </time>
        </div>
        <h3 className="text-cream font-bold text-base sm:text-lg leading-snug group-hover:text-gold transition-colors line-clamp-2">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}
