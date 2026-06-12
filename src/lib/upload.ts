import fs from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import { canUseBlob, getBlobOptions } from "@/lib/db/blob";

const ALLOWED_FOLDERS = [
  "team",
  "articles",
  "clients",
  "banners",
  "general",
] as const;

export type UploadFolder = (typeof ALLOWED_FOLDERS)[number];

export function isAllowedUploadFolder(folder: string): folder is UploadFolder {
  return ALLOWED_FOLDERS.includes(folder as UploadFolder);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
}

export async function uploadAdminFile(
  file: File,
  folder: UploadFolder
): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const allowed = ["jpg", "jpeg", "png", "webp", "svg", "gif"];
  if (!allowed.includes(ext)) {
    throw new Error("نوع الملف غير مدعوم. استخدم JPG أو PNG أو WEBP أو SVG");
  }

  const filename = `${Date.now()}-${sanitizeFilename(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;

  if (canUseBlob()) {
    const blob = await put(`ssa-law/uploads/${folder}/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type || undefined,
      ...getBlobOptions(),
    });
    return blob.url;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const localPath = path.join(uploadsDir, filename);
  await fs.writeFile(localPath, buffer);
  return `/uploads/${folder}/${filename}`;
}
