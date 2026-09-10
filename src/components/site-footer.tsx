"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { useLang } from "@/components/language-provider";
import { pick } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/types";

type FooterLink = { href: string; label: string; external?: boolean };

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { lang, t } = useLang();
  const title = pick(lang, settings.site_title_tr, settings.site_title_en);

  const socials = [
    { href: settings.instagram_url, label: "Instagram", Icon: Instagram },
    { href: settings.whatsapp_url, label: "WhatsApp", Icon: MessageCircle },
    { href: settings.youtube_url, label: "YouTube", Icon: Youtube },
    { href: settings.linkedin_url, label: "LinkedIn", Icon: Linkedin },
  ].filter((s) => s.href);

  const links: FooterLink[] = [
    { href: "/", label: t.nav.home },
    ...(settings.clubs_url
      ? [{ href: settings.clubs_url, label: t.nav.clubsDocs, external: true }]
      : []),
    { href: "/sss", label: t.nav.faq },
    { href: "/iletisim", label: t.nav.contact },
  ];

  return (
    <footer className="mt-auto bg-brand-900 text-slate-300">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/logo-mark.png"
                alt={title}
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium text-brand-200">
                {t.common.university}
              </span>
              <span className="font-semibold">{title}</span>
            </span>
          </div>

          {socials.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-700 text-slate-300 transition-colors hover:border-brand-400 hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {t.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {t.footer.contact}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            {settings.contact_email && (
              <li>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {settings.contact_email}
                </a>
              </li>
            )}
            {settings.contact_phone && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {settings.contact_phone}
              </li>
            )}
          </ul>
          <Link
            href="/admin"
            className="mt-6 inline-block text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            {t.footer.admin}
          </Link>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {title}. {t.footer.rights}
          </p>
          <p>kuluplerbirligi.info</p>
        </div>
      </div>
    </footer>
  );
}
