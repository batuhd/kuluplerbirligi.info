import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LinkForm } from "@/components/admin/link-form";
import { AdminHeader, Card } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function YeniLinkPage() {
  return (
    <>
      <Link
        href="/admin/linkler"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Bağlantılara dön
      </Link>
      <AdminHeader
        title="Yeni Bağlantı"
        description="Türkçe alanlar zorunlu, İngilizce alanlar opsiyoneldir."
      />
      <Card>
        <LinkForm section="links" />
      </Card>
    </>
  );
}
