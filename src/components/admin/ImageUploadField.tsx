"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, X } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  folder: "team" | "articles" | "clients" | "banners" | "general";
  sizeHint: string;
  isLead?: boolean;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
  sizeHint,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الرفع");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الرفع");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-cream/60 text-xs mb-1">{label}</label>
      <p className="text-cream/40 text-[11px] mb-2">📐 {sizeHint}</p>

      {value ? (
        <div className="relative w-full max-w-[200px] aspect-[3/4] rounded-sm overflow-hidden border border-gold/20 mb-2">
          <Image
            src={value}
            alt=""
            fill
            className="object-cover object-top"
            unoptimized={value.startsWith("http") || value.endsWith(".svg")}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 left-2 bg-black/60 text-cream p-1 rounded-sm hover:text-red-300"
            title="إزالة الصورة"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 text-sm text-gold hover:text-gold-light disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {value ? "تغيير الصورة" : "رفع صورة"}
      </button>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
