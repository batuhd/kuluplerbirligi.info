"use client";

import { ExternalLink, FileText } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { CLUB_DOCUMENTS } from "@/lib/documents";

export function DocumentsContent() {
  const { lang, t } = useLang();

  return (
    <>
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-white to-brand-50/40">
        <div className="container-page py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {t.documents.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t.documents.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {t.documents.description}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {CLUB_DOCUMENTS.map((doc) => (
            <a
              key={doc.url}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 sm:h-11 sm:w-11 sm:rounded-xl">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="min-w-0 flex-1 font-semibold text-slate-900">
                {lang === "en" ? doc.en : doc.tr}
              </span>
              <ExternalLink className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-brand-600" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
