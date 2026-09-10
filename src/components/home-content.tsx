"use client";

import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";
import { LinkCard } from "@/components/cards";
import { useLang } from "@/components/language-provider";
import type { LinkItem, SiteSettings } from "@/lib/types";

export function HomeContent({
  settings,
  links,
}: {
  settings: SiteSettings;
  links: LinkItem[];
}) {
  const { t } = useLang();

  return (
    <div className="container-page flex justify-center py-12 md:py-16">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center">
          <span className="flex h-40 w-40 items-center justify-center md:h-52 md:w-52">
            <Image
              src="/logo-mark.png"
              alt={settings.site_title}
              width={208}
              height={208}
              priority
              className="h-full w-full object-contain"
            />
          </span>
        </div>

        <div className="mt-10 space-y-3">
          {links.map((item) => (
            <LinkCard key={item.id} item={item} />
          ))}
        </div>

        <Link
          href="/iletisim"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-500 p-4 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
        >
          <Send className="h-4 w-4" />
          {t.home.contactCta}
        </Link>
      </div>
    </div>
  );
}
