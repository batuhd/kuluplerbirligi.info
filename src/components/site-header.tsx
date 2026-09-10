"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLang } from "@/components/language-provider";

type NavItem = {
  key: "home" | "clubsDocs" | "faq" | "contact";
  href: string;
  external?: boolean;
};

export function SiteHeader({
  title,
  clubsUrl,
}: {
  title: string;
  clubsUrl?: string | null;
}) {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const items: NavItem[] = [
    { key: "home", href: "/" },
    { key: "clubsDocs", href: clubsUrl ?? "", external: true },
    { key: "faq", href: "/sss" },
    { key: "contact", href: "/iletisim" },
  ].filter((item) => item.href) as NavItem[];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleRedirect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    setOpen(false);
    setPendingUrl(url);
  };

  const confirmRedirect = () => {
    if (pendingUrl) {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
    }
    setPendingUrl(null);
  };

  const itemClass = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-brand-50 text-brand-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const mobileItemClass = (active: boolean) =>
    `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium ${
      active
        ? "bg-brand-50 text-brand-700"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="flex h-1 w-full" aria-hidden="true">
          <span className="h-full flex-1 bg-brand-700" />
          <span className="h-full w-20 bg-accent-500" />
        </div>
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-slate-900"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo-mark.png"
              alt={title}
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-brand-700">
                {t.common.university}
              </span>
              <span className="text-[15px] font-semibold leading-tight text-slate-900">
                {title}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-1 md:flex">
              {items.map((item) =>
                item.external ? (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(event) => handleRedirect(event, item.href)}
                    className={`inline-flex items-center gap-1.5 ${itemClass(false)}`}
                  >
                    {t.nav[item.key]}
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={itemClass(isActive(item.href))}
                  >
                    {t.nav[item.key]}
                  </Link>
                ),
              )}
            </nav>

            <LanguageToggle />

            <button
              type="button"
              aria-label={t.common.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="container-page flex flex-col gap-1 pb-4 md:hidden">
            {items.map((item) =>
              item.external ? (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(event) => handleRedirect(event, item.href)}
                  className={mobileItemClass(false)}
                >
                  {t.nav[item.key]}
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={mobileItemClass(isActive(item.href))}
                >
                  {t.nav[item.key]}
                </Link>
              ),
            )}
          </nav>
        )}
      </header>

      {pendingUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setPendingUrl(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-600">
              <ExternalLink className="h-6 w-6" />
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              {t.nav.redirectWarning}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setPendingUrl(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                {t.nav.redirectCancel}
              </button>
              <button
                type="button"
                onClick={confirmRedirect}
                className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {t.nav.redirectContinue}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
