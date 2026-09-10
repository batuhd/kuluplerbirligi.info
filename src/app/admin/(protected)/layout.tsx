import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const { count } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 lg:flex-row">
      <AdminNav email={user.email ?? ""} unreadCount={count ?? 0} />
      <main className="flex-1 overflow-x-hidden p-5 md:p-8">{children}</main>
    </div>
  );
}
