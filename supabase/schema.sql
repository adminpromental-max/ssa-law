-- ============================================================
-- Supabase — إعداد قاعدة بيانات موقع مكتب صالح العمري
-- نفّذي هذا الملف من: Supabase Dashboard → SQL Editor → Run
-- ============================================================

create table if not exists public.site_data (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.site_data is 'JSON document for site CMS (single row id=main)';

alter table public.site_data enable row level security;

-- لا policies للعامة — الوصول عبر service_role من السيرفر فقط

insert into public.site_data (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- ============================================================
-- Storage: أنشئي bucket يدوياً من Dashboard
-- Storage → New bucket → Name: uploads → Public: ON
-- ============================================================
