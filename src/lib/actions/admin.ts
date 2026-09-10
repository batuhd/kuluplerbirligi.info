"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/state";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return supabase;
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function nullable(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value.length > 0 ? value : null;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function num(formData: FormData, key: string): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

function refresh(paths: string[]) {
  paths.forEach((path) => revalidatePath(path));
}

/* ----------------------------- Auth ----------------------------- */

export async function signIn(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!isSupabaseConfigured) {
    return { status: "error", message: "Supabase yapılandırılmamış." };
  }

  const email = str(formData, "email");
  const password = str(formData, "password");

  if (!email || !password) {
    return { status: "error", message: "E-posta ve şifre gerekli." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: "error", message: "E-posta veya şifre hatalı." };
  }

  const next = str(formData, "next") || "/admin";
  redirect(next);
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

/* ------------------- Links & Resources (links) ------------------- */

export async function saveLink(formData: FormData) {
  const supabase = await requireUser();
  const id = str(formData, "id");
  const section = str(formData, "section") === "resources" ? "resources" : "links";
  const titleTr = str(formData, "title_tr");
  const url = str(formData, "url");
  if (!titleTr || !url) return;

  const payload = {
    title_tr: titleTr,
    title_en: nullable(formData, "title_en"),
    description_tr: nullable(formData, "description_tr"),
    description_en: nullable(formData, "description_en"),
    url,
    icon: nullable(formData, "icon"),
    category_tr: nullable(formData, "category_tr"),
    category_en: nullable(formData, "category_en"),
    section,
    is_featured: bool(formData, "is_featured"),
    is_active: bool(formData, "is_active"),
    sort_order: num(formData, "sort_order"),
  };

  if (id) {
    await supabase.from("links").update(payload).eq("id", id);
  } else {
    await supabase.from("links").insert(payload);
  }

  const listPath = section === "resources" ? "/admin/kaynaklar" : "/admin/linkler";
  refresh([listPath, "/", "/kaynaklar"]);
  redirect(listPath);
}

export async function deleteLink(formData: FormData) {
  const supabase = await requireUser();
  const id = str(formData, "id");
  const section = str(formData, "section") === "resources" ? "resources" : "links";
  if (id) await supabase.from("links").delete().eq("id", id);
  const listPath = section === "resources" ? "/admin/kaynaklar" : "/admin/linkler";
  refresh([listPath, "/", "/kaynaklar"]);
  redirect(listPath);
}

/* ------------------------------ FAQ ------------------------------ */

export async function saveFaq(formData: FormData) {
  const supabase = await requireUser();
  const id = str(formData, "id");
  const questionTr = str(formData, "question_tr");
  const answerTr = str(formData, "answer_tr");
  if (!questionTr || !answerTr) return;

  const payload = {
    question_tr: questionTr,
    question_en: nullable(formData, "question_en"),
    answer_tr: answerTr,
    answer_en: nullable(formData, "answer_en"),
    audience: str(formData, "audience") === "clubs" ? "clubs" : "students",
    is_active: bool(formData, "is_active"),
    sort_order: num(formData, "sort_order"),
  };

  if (id) {
    await supabase.from("faqs").update(payload).eq("id", id);
  } else {
    await supabase.from("faqs").insert(payload);
  }

  refresh(["/admin/sss", "/sss"]);
  redirect("/admin/sss");
}

export async function deleteFaq(formData: FormData) {
  const supabase = await requireUser();
  const id = str(formData, "id");
  if (id) await supabase.from("faqs").delete().eq("id", id);
  refresh(["/admin/sss", "/sss"]);
  redirect("/admin/sss");
}

/* ---------------------------- Messages --------------------------- */

export async function toggleMessageRead(formData: FormData) {
  const supabase = await requireUser();
  const id = str(formData, "id");
  const isRead = bool(formData, "is_read");
  if (id) {
    await supabase
      .from("contact_messages")
      .update({ is_read: !isRead })
      .eq("id", id);
  }
  refresh(["/admin/mesajlar", "/admin"]);
}

export async function deleteMessage(formData: FormData) {
  const supabase = await requireUser();
  const id = str(formData, "id");
  if (id) await supabase.from("contact_messages").delete().eq("id", id);
  refresh(["/admin/mesajlar", "/admin"]);
}

/* ---------------------------- Settings --------------------------- */

export async function saveSettings(formData: FormData) {
  const supabase = await requireUser();

  const payload = {
    id: 1,
    site_title_tr: str(formData, "site_title_tr") || "Kulüpler Birliği",
    site_title_en: nullable(formData, "site_title_en"),
    contact_email: nullable(formData, "contact_email"),
    contact_phone: nullable(formData, "contact_phone"),
    address: nullable(formData, "address"),
    clubs_url: nullable(formData, "clubs_url"),
    instagram_url: nullable(formData, "instagram_url"),
    youtube_url: nullable(formData, "youtube_url"),
    linkedin_url: nullable(formData, "linkedin_url"),
    whatsapp_url: nullable(formData, "whatsapp_url"),
    updated_at: new Date().toISOString(),
  };

  await supabase.from("site_settings").upsert(payload, { onConflict: "id" });
  refresh(["/admin/ayarlar", "/", "/iletisim"]);
  redirect("/admin/ayarlar?saved=1");
}
