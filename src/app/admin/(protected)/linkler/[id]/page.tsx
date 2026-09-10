import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LinkForm } from "@/components/admin/link-form";
import { AdminHeader, Card } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/buttons";
import { deleteLink } from "@/lib/actions/admin";
import { getLinkById } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function LinkDuzenlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = await getLinkById(id);

  if (!link) notFound();

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
        title="Bağlantıyı Düzenle"
        action={
          <DeleteButton
            action={deleteLink}
            id={link.id}
            label="Bağlantıyı Sil"
            extraFields={{ section: "links" }}
          />
        }
      />
      <Card>
        <LinkForm link={link} section="links" />
      </Card>
    </>
  );
}
