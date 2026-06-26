# إعداد Supabase لموقع مكتب صالح العمري

> **للمطوّرة فقط** — العميل لا يحتاج حساب Supabase.  
> يستخدم لوحة التحكم على الموقع فقط: `/admin`

---

## 1) إنشاء مشروع Supabase

1. ادخلي [supabase.com](https://supabase.com) → **Start your project**
2. **New project**
   - الاسم: `ssa-law` (أو أي اسم)
   - Database password: احفظيه (للطوارئ فقط)
   - Region: الأقرب للسعودية (مثل Frankfurt)
3. انتظري حتى يكتمل الإنشاء (~2 دقيقة)

---

## 2) إنشاء الجدول

1. من القائمة: **SQL Editor** → **New query**
2. انسخي محتوى الملف `supabase/schema.sql` من المشروع
3. اضغطي **Run**

---

## 3) إنشاء bucket للصور

1. **Storage** → **New bucket**
2. الاسم: `uploads`
3. **Public bucket**: ✅ ON
4. Create

---

## 4) نسخ المفاتيح (Server فقط)

1. **Project Settings** → **API**
2. انسخي:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **لا تشاركي service_role مع العميل** — يُستخدم على Vercel فقط.

---

## 5) إضافة المتغيرات على Vercel

Vercel → المشروع → **Settings** → **Environment Variables**

| المتغير | القيمة |
|---------|--------|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `SUPABASE_STORAGE_BUCKET` | `uploads` |
| `ADMIN_PASSWORD` | كلمة سر لوحة التحكم للعميل |

ثم: **Deployments** → **Redeploy**

---

## 6) أول تشغيل

- عند أول طلب بعد الربط، الموقع ينقل البيانات تلقائياً من Blob (إن وُجد) إلى Supabase
- أو يبدأ من البيانات الافتراضية إن Blob غير متاح

---

## 7) تسليم العميل

سلّمي للعميل فقط:

- رابط الموقع: `https://www.ssa-law.com`
- لوحة التحكم: `https://www.ssa-law.com/admin`
- **كلمة مرور اللوحة** (من `ADMIN_PASSWORD` أو غيّرها من `/admin/settings`)

**لا تسلّمي:** Supabase URL، service_role، أو Vercel.

---

## 8) إعادة تعيين كلمة مرور اللوحة

```bash
SUPABASE_URL=xxx SUPABASE_SERVICE_ROLE_KEY=xxx \
  node scripts/reset-admin-password.mjs كلمة_السر_الجديدة
```

---

## ملاحظات

- **Blob على Vercel** يمكن إزالة `BLOB_READ_WRITE_TOKEN` بعد التأكد من Supabase
- **الخطة المجانية** Supabase: 500MB DB + 1GB Storage — كافية للموقع
- **تغيير كلمة المرور** من اللوحة: `/admin/settings`
