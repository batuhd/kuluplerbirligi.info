"use client";

import Image from "next/image";
import {
  Download,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { useLang } from "@/components/language-provider";
import { pick } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/types";

const PRESS_FILES: { tr: string; en: string; href: string }[] = [
  {
    tr: "Yatay logo (renkli)",
    en: "Horizontal logo (color)",
    href: "/kb-yatay.png",
  },
  {
    tr: "Dikey logo (renkli)",
    en: "Vertical logo (color)",
    href: "/logo-full.png",
  },
  {
    tr: "Dikey logo (beyaz)",
    en: "Vertical logo (white)",
    href: "/logo-full-white.png",
  },
  {
    tr: "Amblem",
    en: "Mark",
    href: "/logo-mark.png",
  },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { lang, t } = useLang();
  const title = pick(lang, settings.site_title_tr, settings.site_title_en);

  const socials = [
    { href: settings.instagram_url, label: "Instagram", Icon: Instagram },
    { href: settings.whatsapp_url, label: "WhatsApp", Icon: MessageCircle },
    { href: settings.youtube_url, label: "YouTube", Icon: Youtube },
    { href: settings.linkedin_url, label: "LinkedIn", Icon: Linkedin },
  ].filter((s) => s.href);

  return (
    <footer className="mt-auto bg-brand-900 text-slate-300">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.1fr_1fr] md:items-center">
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-700 text-slate-300 transition-colors hover:border-brand-400 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="md:justify-self-end">
          <h3 className="text-sm font-semibold text-white">
            {t.footer.pressKit}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {t.footer.pressKitHint}
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {PRESS_FILES.map((file) => (
              <li key={file.href}>
                <a
                  href={file.href}
                  download
                  className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <Download className="h-3.5 w-3.5 shrink-0 text-slate-500 group-hover:text-brand-300" />
                  {lang === "en" ? file.en : file.tr}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {title}. {t.footer.rights}
          </p>
          <p>kuluplerbirligi.info</p>
        </div>
      </div>
    </footer>
  );
}
