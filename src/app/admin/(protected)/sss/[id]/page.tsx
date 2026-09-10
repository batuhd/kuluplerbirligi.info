import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FaqForm } from "@/components/admin/faq-form";
import { AdminHeader, Card } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/buttons";
import { deleteFaq } from "@/lib/actions/admin";
import { getFaqById } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SssDuzenlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq) notFound();

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
        title="Soruyu Düzenle"
        action={<DeleteButton action={deleteFaq} id={faq.id} label="Soruyu Sil" />}
      />
      <Card>
        <FaqForm faq={faq} />
      </Card>
    </>
  );
}
