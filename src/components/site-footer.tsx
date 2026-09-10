"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, MessageCircle, Youtube } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { pick } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { lang, t } = useLang();
  const title = pick(lang, settings.site_title_tr, settings.site_title_en);

  const socials = [
    { href: settings.whatsapp_url, label: "WhatsApp", Icon: MessageCircle },
    { href: settings.youtube_url, label: "YouTube", Icon: Youtube },
    { href: settings.linkedin_url, label: "LinkedIn", Icon: Linkedin },
  ].filter((s) => s.href);

  return (
    <footer className="mt-auto bg-brand-900 text-slate-300">
      <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-white">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/logo-mark.png"
              alt={title}
              width={32}
              height={32}
              className="h-7 w-7 object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium text-brand-200">
              {t.common.university}
            </span>
            <span className="text-sm font-semibold">{title}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-brand-800 hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          {socials.length > 0 && (
            <span className="h-4 w-px bg-brand-700" aria-hidden="true" />
          )}
          <Link
            href="/basin"
            className="text-xs font-medium text-slate-400 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            {t.footer.pressKit}
          </Link>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container-page flex flex-col items-center justify-between gap-1 py-3 text-[11px] text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {title}. {t.footer.rights}
          </p>
          <p>kuluplerbirligi.info</p>
        </div>
      </div>
    </footer>
  );
}
