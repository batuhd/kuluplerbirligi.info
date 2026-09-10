import { MailCheck, MailOpen } from "lucide-react";
import { AdminHeader, Card } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/buttons";
import {
  deleteMessage,
  toggleMessageRead,
} from "@/lib/actions/admin";
import { getContactMessages } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMesajlarPage() {
  const messages = await getContactMessages();
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <AdminHeader
        title="Mesajlar"
        description={`${messages.length} mesaj, ${unread} okunmamış.`}
      />

      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={message.is_read ? "" : "border-brand-200 bg-brand-50/40"}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    {message.name}
                    {!message.is_read && (
                      <span className="ml-2 rounded-full bg-accent-500 px-2 py-0.5 text-[11px] font-bold text-white">
                        Yeni
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-sm text-brand-600 hover:underline"
                  >
                    {message.email}
                  </a>
                </div>
                <span className="text-xs text-slate-400">
                  {formatDate(message.created_at)}
                </span>
              </div>

              {message.subject && (
                <p className="mt-3 text-sm font-medium text-slate-800">
                  {message.subject}
                </p>
              )}
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                {message.message}
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={message.id} />
                  <input
                    type="hidden"
                    name="is_read"
                    value={String(message.is_read)}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                  >
                    {message.is_read ? (
                      <>
                        <MailOpen className="h-4 w-4" />
                        Okunmadı işaretle
                      </>
                    ) : (
                      <>
                        <MailCheck className="h-4 w-4" />
                        Okundu işaretle
                      </>
                    )}
                  </button>
                </form>
                <DeleteButton
                  action={deleteMessage}
                  id={message.id}
                  label="Sil"
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="py-10 text-center text-sm text-slate-500">
            Henüz mesaj yok.
          </p>
        </Card>
      )}
    </>
  );
}
