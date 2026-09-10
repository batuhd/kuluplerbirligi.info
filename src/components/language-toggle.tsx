"use client";

import { useLang } from "@/components/language-provider";

export function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  const next = lang === "tr" ? "en" : "tr";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t.common.toggleLanguage}
      title={t.common.toggleLanguage}
      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
    >
      <span className={lang === "tr" ? "text-brand-700" : "text-slate-400"}>
        TR
      </span>
      <span className="text-slate-300">/</span>
      <span className={lang === "en" ? "text-brand-700" : "text-slate-400"}>
        EN
      </span>
    </button>
  );
}
