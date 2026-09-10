"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useLang } from "@/components/language-provider";

type PressFile = {
  tr: string;
  en: string;
  descTr: string;
  descEn: string;
  href: string;
  width: number;
  height: number;
  dark?: boolean;
};

const FILES: PressFile[] = [
  {
    tr: "Yatay logo",
    en: "Horizontal logo",
    descTr: "Renkli · açık zeminler için",
    descEn: "Color · for light backgrounds",
    href: "/kb-yatay.png",
    width: 900,
    height: 313,
  },
  {
    tr: "Dikey logo",
    en: "Vertical logo",
    descTr: "Renkli · açık zeminler için",
    descEn: "Color · for light backgrounds",
    href: "/logo-full.png",
    width: 512,
    height: 512,
  },
  {
    tr: "Dikey logo (beyaz)",
    en: "Vertical logo (white)",
    descTr: "Beyaz · koyu zeminler için",
    descEn: "White · for dark backgrounds",
    href: "/logo-full-white.png",
    width: 512,
    height: 512,
    dark: true,
  },
  {
    tr: "Amblem",
    en: "Mark",
    descTr: "Sadece amblem · açık zeminler için",
    descEn: "Mark only · for light backgrounds",
    href: "/logo-mark.png",
    width: 512,
    height: 512,
  },
];

export function PressKitContent() {
  const { lang, t } = useLang();

  return (
    <>
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-white to-brand-50/40">
        <div className="container-page py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {t.pressKit.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t.pressKit.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {t.pressKit.description}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {FILES.map((file) => (
            <div
              key={file.href}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div
                className={`flex h-44 items-center justify-center rounded-xl p-6 ${
                  file.dark ? "bg-brand-900" : "bg-slate-50"
                }`}
              >
                <Image
                  src={file.href}
                  alt={lang === "en" ? file.en : file.tr}
                  width={file.width}
                  height={file.height}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <div className="mt-4 flex flex-1 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {lang === "en" ? file.en : file.tr}
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {lang === "en" ? file.descEn : file.descTr}
                  </p>
                </div>
                <a
                  href={file.href}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:shrink-0"
                >
                  <Download className="h-4 w-4" />
                  {t.pressKit.download}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
