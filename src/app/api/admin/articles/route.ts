import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import { revalidateSiteContent } from "@/lib/revalidate";
import type { ArticleRecord } from "@/lib/db/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const db = await readDb();
  return NextResponse.json(db.articles);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const articles = (await request.json()) as ArticleRecord[];
    await updateDb((db) => {
      db.articles = articles;
    });
    revalidateSiteContent();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل الحفظ" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ArticleRecord>;
  const slug =
    body.slug ||
    (body.title || "article")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FFa-z0-9-]/gi, "")
      .slice(0, 60) ||
    `article-${Date.now()}`;

  const newArticle: ArticleRecord = {
    id: `article-${Date.now()}`,
    slug,
    title: body.title || "مقال جديد",
    publishDate:
      body.publishDate || new Date().toISOString().split("T")[0],
    image: body.image || "/images/articles/labor-law.png",
    excerpt: body.excerpt || "",
    content: body.content || "",
  };

  await updateDb((db) => {
    db.articles.push(newArticle);
  });
  revalidateSiteContent();
  return NextResponse.json(newArticle);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
  }

  await updateDb((db) => {
    db.articles = db.articles.filter((a) => a.id !== id);
  });
  revalidateSiteContent();
  return NextResponse.json({ success: true });
}
