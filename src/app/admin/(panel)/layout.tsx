import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen section-base flex flex-col lg:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
