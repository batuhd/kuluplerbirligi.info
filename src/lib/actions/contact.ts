"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { translations, type Lang } from "@/lib/i18n";
import type { ContactState } from "@/lib/actions/state";

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const lang: Lang = formData.get("lang") === "en" ? "en" : "tr";
  const messages = translations[lang].contact;

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: messages.required };
  }

  if (
    name.length > 100 ||
    email.length > 200 ||
    subject.length > 200 ||
    message.length > 5000
  ) {
    return { status: "error", message: messages.error };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: messages.invalidEmail };
  }

  if (!isSupabaseConfigured) {
    return { status: "error", message: messages.notConfigured };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject: subject || null,
      message,
    });

    if (error) {
      return { status: "error", message: messages.error };
    }

    return { status: "success", message: messages.success };
  } catch {
    return { status: "error", message: messages.unexpected };
  }
}
