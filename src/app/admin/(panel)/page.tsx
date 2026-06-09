import { readDb, hasBlobStorage, testBlobStorage } from "@/lib/db";
import { Eye, Mail, CalendarCheck, Inbox } from "lucide-react";

export default async function AdminDashboardPage() {
  const hasBlob = hasBlobStorage();
  const storageTest = hasBlob ? await testBlobStorage() : null;
  const db = await readDb();
  const unreadContact = db.contactSubmissions.filter((s) => !s.read).length;
  const unreadBooking = db.bookingSubmissions.filter((s) => !s.read).length;

  const stats = [
    {
      label: "عدد الزوار",
      value: db.visitorCount.toLocaleString("ar-SA"),
      icon: Eye,
      color: "text-gold",
    },
    {
      label: "طلبات التواصل",
      value: db.contactSubmissions.length,
      sub: unreadContact > 0 ? `${unreadContact} جديد` : undefined,
      icon: Mail,
      color: "text-blue-400",
    },
    {
      label: "طلبات الحجز",
      value: db.bookingSubmissions.length,
      sub: unreadBooking > 0 ? `${unreadBooking} جديد` : undefined,
      icon: CalendarCheck,
      color: "text-emerald-400",
    },
    {
      label: "إجمالي الطلبات",
      value: db.contactSubmissions.length + db.bookingSubmissions.length,
      icon: Inbox,
      color: "text-cream",
    },
  ];

  const recentContact = db.contactSubmissions.slice(0, 5);
  const recentBooking = db.bookingSubmissions.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-cream mb-2">لوحة التحكم</h1>
      <p className="text-cream/50 text-sm mb-4">نظرة عامة على الموقع والطلبات</p>

      {!hasBlob && (
        <div className="mb-8 p-4 rounded-sm border border-amber-500/40 bg-amber-500/10 text-amber-200 text-sm leading-relaxed">
          <strong className="text-amber-100">تنبيه:</strong> التخزين الدائم غير مفعّل.
          من Vercel → Storage → اربطي Blob Store بالمشروع، ثم أعيدي النشر.
        </div>
      )}

      {storageTest && !storageTest.ok && (
        <div className="mb-8 p-4 rounded-sm border border-red-500/40 bg-red-500/10 text-red-200 text-sm leading-relaxed">
          <strong className="text-red-100">خطأ تخزين:</strong>{" "}
          {storageTest.error || "فشل القراءة/الكتابة على Blob."}
          <br />
          من Vercel → Storage → Projects → فعّلي ✓ على Production و Preview
          لـ BLOB_READ_WRITE_TOKEN ثم Redeploy.
        </div>
      )}

      {storageTest?.ok && (
        <div className="mb-8 p-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm">
          ✓ التخزين الدائم يعمل — التعديلات تُحفظ على الموقع.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-elevated rounded-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                {stat.sub && (
                  <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-sm">
                    {stat.sub}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-cream" dir="ltr">
                {stat.value}
              </p>
              <p className="text-cream/50 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-elevated rounded-sm p-6">
          <h2 className="text-cream font-bold mb-4">آخر طلبات التواصل</h2>
          {recentContact.length === 0 ? (
            <p className="text-cream/40 text-sm">لا توجد طلبات بعد</p>
          ) : (
            <ul className="space-y-3">
              {recentContact.map((s) => (
                <li
                  key={s.id}
                  className="flex justify-between items-start gap-3 text-sm border-b border-gold/10 pb-3"
                >
                  <div>
                    <p className="text-cream font-medium">{s.name}</p>
                    <p className="text-cream/50">{s.subject}</p>
                  </div>
                  {!s.read && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-sm shrink-0">
                      جديد
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-elevated rounded-sm p-6">
          <h2 className="text-cream font-bold mb-4">آخر طلبات الحجز</h2>
          {recentBooking.length === 0 ? (
            <p className="text-cream/40 text-sm">لا توجد طلبات بعد</p>
          ) : (
            <ul className="space-y-3">
              {recentBooking.map((s) => (
                <li
                  key={s.id}
                  className="flex justify-between items-start gap-3 text-sm border-b border-gold/10 pb-3"
                >
                  <div>
                    <p className="text-cream font-medium">{s.name}</p>
                    <p className="text-cream/50">{s.service}</p>
                  </div>
                  {!s.read && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-sm shrink-0">
                      جديد
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
