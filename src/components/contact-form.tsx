"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { sendContactMessage } from "@/lib/actions/contact";
import { initialContactState } from "@/lib/actions/state";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function ContactForm() {
  const { lang, t } = useLang();
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="lang" value={lang} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {t.contact.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder={t.contact.namePlaceholder}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {t.contact.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder={t.contact.emailPlaceholder}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {t.contact.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={inputClass}
          placeholder={t.contact.subjectPlaceholder}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {t.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder={t.contact.messagePlaceholder}
        />
      </div>

      {state.status !== "idle" && (
        <div
          className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
            state.status === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {state.status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {pending ? t.contact.sending : t.contact.send}
      </button>
    </form>
  );
}
