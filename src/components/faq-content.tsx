"use client";

import Link from "next/link";
import {
  ChevronDown,
  GraduationCap,
  HelpCircle,
  Send,
  Users,
} from "lucide-react";
import { useLang } from "@/components/language-provider";
import { pick } from "@/lib/i18n";
import type { FaqItem } from "@/lib/types";

const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function RichText({ text }: { text: string }) {
  const parts = text.split(LINK_PATTERN);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (index % 3 === 1) {
          const label = part;
          const url = parts[index + 1];
          return (
            <a
              key={`${label}-${index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-900"
            >
              {label}
            </a>
          );
        }
        if (index % 3 === 2) return null;
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

function FaqAccordion({
  items,
  emptyText,
}: {
  items: FaqItem[];
  emptyText: string;
}) {
  const { lang } = useLang();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center text-sm text-slate-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.id}
          className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 open:border-brand-200 open:bg-brand-50/30"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="flex items-start gap-3 font-semibold text-slate-900">
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              {pick(lang, item.question_tr, item.question_en)}
            </span>
            <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 pl-8 text-sm leading-relaxed text-slate-600">
            <RichText text={pick(lang, item.answer_tr, item.answer_en)} />
          </p>
        </details>
      ))}
    </div>
  );
}

function ColumnHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white sm:h-10 sm:w-10 sm:rounded-xl">
        {icon}
      </span>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    </div>
  );
}

export function FaqContent({ items }: { items: FaqItem[] }) {
  const { t } = useLang();

  const students = items.filter((item) => item.audience !== "clubs");
  const clubs = items.filter((item) => item.audience === "clubs");

  return (
    <>
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-white to-brand-50/40">
        <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {t.faq.eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {t.faq.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t.faq.description}
            </p>
          </div>

          <div className="w-full rounded-3xl border border-brand-100 bg-brand-50/60 p-6 md:w-80 md:shrink-0">
            <h2 className="text-base font-bold text-slate-900">
              {t.faq.ctaTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {t.faq.ctaText}
            </p>
            <Link
              href="/iletisim"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
            >
              <Send className="h-4 w-4" />
              {t.faq.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <ColumnHeader
              icon={<GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />}
              title={t.faq.studentsTitle}
            />
            <FaqAccordion items={students} emptyText={t.faq.studentsEmpty} />
          </div>

          <div>
            <ColumnHeader
              icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />}
              title={t.faq.clubsTitle}
            />
            <FaqAccordion items={clubs} emptyText={t.faq.clubsEmpty} />
          </div>
        </div>
      </section>
    </>
  );
}
