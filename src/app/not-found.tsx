import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black section-pattern">
      <div className="text-center px-4">
        <p className="text-gold text-6xl font-bold mb-4">404</p>
        <h1 className="text-2xl font-bold text-cream mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-cream/60 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </p>
        <Button href="/">العودة للرئيسية</Button>
      </div>
    </section>
  );
}
