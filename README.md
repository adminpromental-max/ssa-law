# مكتب صالح بن سلمان العمري — الموقع التعريفي

موقع تعريفي احترافي لمكتب صالح بن سلمان العمري للمحاماة والاستشارات القانونية والتوثيق.

## التقنيات

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide Icons**

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

## البناء للإنتاج

```bash
npm run build
npm start
```

## النشر على Vercel

1. ارفع المشروع على GitHub
2. اربط المستودع بـ [Vercel](https://vercel.com)
3. أضف الدومين `ssa-law.com` من إعدادات Vercel

## هيكل الصفحات

| المسار | الصفحة |
|--------|--------|
| `/` | الرئيسية |
| `/about` | من نحن |
| `/services` | الخدمات |
| `/services/[slug]` | تفاصيل كل خدمة |
| `/team` | فريق العمل |
| `/clients` | عملاؤنا |
| `/articles` | المقالات (قريباً) |
| `/contact` | تواصل معنا |
| `/book` | حجز استشارة |

## صور الفريق

ضع صور أعضاء الفريق في:

```
public/images/team/
  saleh-al-amri.jpg
  ameen-othman.jpg
  mahmoud-nada.jpg
  mahmoud-abu-sheta.jpg
  mayad-al-ahmri.jpg
```

## الملفات التعريفية

الملفات الأصلية (PDF, DOCX, كليشة الهوية) موجودة في مجلد `assets/branding/`.

## ملاحظات

- النماذج (تواصل / حجز) جاهزة — تحتاج ربط خدمة بريد (Resend/SendGrid) عند النشر
- الموقع عربي بالكامل مع دعم RTL
- الألوان: أسود وذهبي من الهوية البصرية
