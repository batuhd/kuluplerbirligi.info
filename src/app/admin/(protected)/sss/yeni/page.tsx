import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FaqForm } from "@/components/admin/faq-form";
import { AdminHeader, Card } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function YeniSssPage() {
  return (
    <>
      <Link
        href="/admin/sss"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        {"SSS'ye dön"}
      </Link>
      <AdminHeader
        title="Yeni Soru"
        description="Türkçe alanlar zorunlu, İngilizce alanlar opsiyoneldir."
      />
      <Card>
        <FaqForm />
      </Card>
    </>
  );
}
