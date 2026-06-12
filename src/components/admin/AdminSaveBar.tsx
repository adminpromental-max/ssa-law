"use client";

import { Loader2, Save } from "lucide-react";

interface AdminSaveBarProps {
  title: string;
  description?: string;
  saving: boolean;
  message?: string;
  onSave: () => void;
}

export function AdminSaveBar({
  title,
  description,
  saving,
  message,
  onSave,
}: AdminSaveBarProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-cream">{title}</h1>
          {description && (
            <p className="text-cream/50 text-sm mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gold text-black font-bold px-6 py-2.5 rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          حفظ التغييرات
        </button>
      </div>
      {message && (
        <p className="text-gold text-sm mb-6 bg-gold/10 px-4 py-2 rounded-sm">
          {message}
        </p>
      )}
    </>
  );
}

export function AdminField({
  label,
  value,
  onChange,
  type = "text",
  dir,
  multiline,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  dir?: string;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-cream/60 text-xs mb-1">{label}</label>
      {hint && <p className="text-cream/40 text-[11px] mb-1">{hint}</p>}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-sm text-sm resize-y min-h-[80px]"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-sm text-sm"
          dir={dir}
        />
      )}
    </div>
  );
}
