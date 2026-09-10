import Link from "next/link";
import { Pencil, Plus, Star } from "lucide-react";
import { AdminHeader, Card, StatusPill } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/buttons";
import { deleteLink } from "@/lib/actions/admin";
import { getAllLinks } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminLinklerPage() {
  const links = await getAllLinks("links");

  return (
    <>
      <AdminHeader
        title="Bağlantılar"
        description={`${links.length} bağlantı. Ana sayfadaki link ağacında görünür.`}
        action={
          <Link
            href="/admin/linkler/yeni"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />
            Yeni Bağlantı
          </Link>
        }
      />

      <Card className="overflow-hidden p-0">
        {links.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Başlık</th>
                  <th className="px-5 py-3 font-medium">Kategori</th>
                  <th className="px-5 py-3 font-medium">Sıra</th>
                  <th className="px-5 py-3 font-medium">Durum</th>
                  <th className="px-5 py-3 text-right font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 font-medium text-slate-900">
                        {link.is_featured && (
                          <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
                        )}
                        {link.title_tr}
                      </div>
                      <div className="max-w-xs truncate text-xs text-slate-400">
                        {link.url}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {link.category_tr ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {link.sort_order}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill active={link.is_active} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/linkler/${link.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <Pencil className="h-4 w-4" />
                          Düzenle
                        </Link>
                        <DeleteButton
                          action={deleteLink}
                          id={link.id}
                          extraFields={{ section: "links" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-slate-500">
            Henüz bağlantı eklenmemiş.
          </p>
        )}
      </Card>
    </>
  );
}
