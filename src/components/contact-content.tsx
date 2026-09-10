"use client";

import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { useLang } from "@/components/language-provider";
import type { SiteSettings } from "@/lib/types";

export function ContactContent({ settings }: { settings: SiteSettings }) {
  const { t } = useLang();

  const socials = [
    { href: settings.instagram_url, label: "Instagram", Icon: Instagram },
    { href: settings.whatsapp_url, label: "WhatsApp", Icon: MessageCircle },
    { href: settings.youtube_url, label: "YouTube", Icon: Youtube },
    { href: settings.linkedin_url, label: "LinkedIn", Icon: Linkedin },
  ].filter((s) => s.href);

  return (
    <>
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-white to-brand-50/40">
        <div className="container-page py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {t.contact.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t.contact.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {t.contact.description}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {settings.contact_email && (
            <a
              href={`mailto:${settings.contact_email}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-slate-500">
                  {t.contact.emailLabel}
                </span>
                <span className="font-medium text-slate-900">
                  {settings.contact_email}
                </span>
              </span>
            </a>
          )}

          {settings.contact_phone && (
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-slate-500">
                  {t.contact.phoneLabel}
                </span>
                <span className="font-medium text-slate-900">
                  {settings.contact_phone}
                </span>
              </span>
            </div>
          )}

          {settings.address && (
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-slate-500">
                  {t.contact.addressLabel}
                </span>
                <span className="font-medium text-slate-900">
                  {settings.address}
                </span>
              </span>
            </div>
          )}

          {socials.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="text-xs text-slate-500">
                {t.contact.socialLabel}
              </span>
              <div className="mt-3 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900">
            {t.contact.formTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {t.contact.formDescription}
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
