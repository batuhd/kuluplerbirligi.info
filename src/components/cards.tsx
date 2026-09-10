"use client";

import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useLang } from "@/components/language-provider";
import { pick } from "@/lib/i18n";
import type { LinkItem } from "@/lib/types";

export function LinkCard({ item }: { item: LinkItem }) {
  const { lang } = useLang();
  const external = item.url.startsWith("http");
  const title = pick(lang, item.title_tr, item.title_en);
  const description = pick(lang, item.description_tr, item.description_en);
  const category = pick(lang, item.category_tr, item.category_en);

  return (
    <a
      href={item.url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        item.is_featured
          ? "border-brand-200 bg-gradient-to-br from-brand-50 to-white hover:border-brand-300"
          : "border-slate-200 bg-white hover:border-brand-200"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          item.is_featured
            ? "bg-brand-600 text-white"
            : "bg-slate-100 text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-700"
        }`}
      >
        <DynamicIcon name={item.icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-semibold text-slate-900">
          {title}
          <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600" />
        </span>
        {description && (
          <span className="mt-0.5 block text-sm leading-relaxed text-slate-500">
            {description}
          </span>
        )}
        {category && (
          <span className="mt-1.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            {category}
          </span>
        )}
      </span>
    </a>
  );
}
