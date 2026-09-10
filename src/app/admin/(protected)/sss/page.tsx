import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { AdminHeader, Card, StatusPill } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/buttons";
import { deleteFaq } from "@/lib/actions/admin";
import { getAllFaqs } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSssPage() {
  const items = await getAllFaqs();

  return (
    <>
      <AdminHeader
        title="Sık Sorulan Sorular"
        description={`${items.length} soru. Öğrenci SSS sayfasında görünür.`}
        action={
          <Link
            href="/admin/sss/yeni"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />
            Yeni Soru
          </Link>
        }
      />

      <Card className="overflow-hidden p-0">
        {items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Soru</th>
                  <th className="px-5 py-3 font-medium">Kitle</th>
                  <th className="px-5 py-3 font-medium">Sıra</th>
                  <th className="px-5 py-3 font-medium">Durum</th>
                  <th className="px-5 py-3 text-right font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-slate-900">
                        {item.question_tr}
                      </div>
                      <div className="max-w-lg truncate text-xs text-slate-400">
                        {item.answer_tr}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.audience === "clubs"
                            ? "bg-accent-50 text-accent-700"
                            : "bg-brand-50 text-brand-700"
                        }`}
                      >
                        {item.audience === "clubs" ? "Kulüpler" : "Öğrenciler"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.sort_order}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill active={item.is_active} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/sss/${item.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <Pencil className="h-4 w-4" />
                          Düzenle
                        </Link>
                        <DeleteButton action={deleteFaq} id={item.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-slate-500">
            Henüz soru eklenmemiş.
          </p>
        )}
      </Card>
    </>
  );
}
