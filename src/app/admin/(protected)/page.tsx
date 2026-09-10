import Link from "next/link";
import { ArrowRight, HelpCircle, Inbox, Link2 } from "lucide-react";
import { AdminHeader, Card } from "@/components/admin/ui";
import {
  getAllFaqs,
  getAllLinks,
  getContactMessages,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [links, faqs, messages] = await Promise.all([
    getAllLinks("links"),
    getAllFaqs(),
    getContactMessages(),
  ]);

  const unread = messages.filter((m) => !m.is_read).length;

  const stats = [
    {
      label: "Bağlantılar",
      value: links.length,
      href: "/admin/linkler",
      Icon: Link2,
    },
    {
      label: "SSS",
      value: faqs.length,
      href: "/admin/sss",
      Icon: HelpCircle,
    },
    {
      label: "Okunmamış Mesaj",
      value: unread,
      href: "/admin/mesajlar",
      Icon: Inbox,
    },
  ];

  return (
    <>
      <AdminHeader title="Panel" description="İçeriklerin genel durumu." />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, href, Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-brand-500" />
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Son Mesajlar</h2>
            <Link
              href="/admin/mesajlar"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Tümünü gör
            </Link>
          </div>

          {messages.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {messages.slice(0, 5).map((message) => (
                <li key={message.id} className="flex items-start gap-3 py-3">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      message.is_read ? "bg-slate-300" : "bg-accent-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {message.name}
                      <span className="ml-2 font-normal text-slate-400">
                        {message.email}
                      </span>
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {message.subject ?? message.message}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    {formatDate(message.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500">
              Henüz mesaj yok.
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
