import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import { revalidateSiteContent } from "@/lib/revalidate";
import type { Service } from "@/data/services";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const db = await readDb();
  return NextResponse.json(db.services);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const services = (await request.json()) as Service[];
    await updateDb((db) => {
      db.services = services;
    });
    revalidateSiteContent();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/services]", error);
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

  try {
    const partial = (await request.json()) as Partial<Service>;
    const slug =
      partial.slug ||
      `service-${Date.now().toString(36)}`;

    const newService: Service = {
      slug,
      title: partial.title || "خدمة جديدة",
      shortDescription: partial.shortDescription || "",
      icon: partial.icon || "Scale",
      description: partial.description || "",
      items: partial.items || [],
      steps: partial.steps || [],
      faqs: partial.faqs || [],
    };

    await updateDb((db) => {
      db.services.push(newService);
    });
    revalidateSiteContent();
    return NextResponse.json(newService);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل الإضافة" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug مطلوب" }, { status: 400 });
  }

  await updateDb((db) => {
    db.services = db.services.filter((s) => s.slug !== slug);
  });
  revalidateSiteContent();
  return NextResponse.json({ success: true });
}
