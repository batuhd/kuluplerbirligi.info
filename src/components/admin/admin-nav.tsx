"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ExternalLink,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { signOut } from "@/lib/actions/admin";

const LINKS = [
  { href: "/admin", label: "Panel", Icon: LayoutDashboard, exact: true },
  { href: "/admin/linkler", label: "Bağlantılar", Icon: Link2 },
  { href: "/admin/sss", label: "SSS", Icon: HelpCircle },
  { href: "/admin/mesajlar", label: "Mesajlar", Icon: Inbox },
  { href: "/admin/ayarlar", label: "Ayarlar", Icon: Settings },
];

export function AdminNav({
  email,
  unreadCount,
}: {
  email: string;
  unreadCount: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {LINKS.map(({ href, label, Icon, exact }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
            isActive(href, exact)
              ? "bg-brand-600 text-white"
              : "text-slate-300 hover:bg-brand-800 hover:text-white"
          }`}
        >
          <Icon className="h-4.5 w-4.5" />
          {label}
          {label === "Mesajlar" && unreadCount > 0 && (
            <span className="ml-auto rounded-full bg-accent-500 px-2 py-0.5 text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );

  const footer = (
    <div className="space-y-1 border-t border-brand-800 pt-4">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-brand-800 hover:text-white"
      >
        <ExternalLink className="h-4.5 w-4.5" />
        Siteyi Gör
      </Link>
      <p className="truncate px-3.5 pt-2 text-xs text-slate-500">{email}</p>
      <form action={signOut}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4.5 w-4.5" />
          Çıkış Yap
        </button>
      </form>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 lg:hidden">
        <span className="font-semibold text-slate-900">Yönetim Paneli</span>
        <button
          type="button"
          aria-label="Menü"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-2 bg-brand-900 p-4 lg:hidden">
          {nav}
          {footer}
        </div>
      )}

      <aside className="hidden w-64 shrink-0 flex-col bg-brand-900 p-4 lg:flex">
        <div className="flex items-center gap-2.5 px-3.5 pb-6 pt-2">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/logo-mark.png"
              alt="Kulüpler Birliği"
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
            />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">
              Kulüpler Birliği
            </span>
            <span className="block text-xs text-slate-500">
              Yönetim Paneli
            </span>
          </span>
        </div>
        {nav}
        {footer}
      </aside>
    </>
  );
}
