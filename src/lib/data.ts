import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  DEFAULT_SETTINGS,
  type ContactMessage,
  type FaqItem,
  type LinkItem,
  type LinkSection,
  type SiteSettings,
} from "@/lib/types";

export { isSupabaseConfigured };

export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return DEFAULT_SETTINGS;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    return data ? (data as SiteSettings) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getSectionLinks(
  section: LinkSection,
): Promise<LinkItem[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("section", section)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    return (data as LinkItem[]) ?? [];
  } catch {
    return [];
  }
}

export async function getAllLinks(section: LinkSection): Promise<LinkItem[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("links")
    .select("*")
    .eq("section", section)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as LinkItem[]) ?? [];
}

export async function getLinkById(id: string): Promise<LinkItem | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("links")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as LinkItem) ?? null;
}

export async function getFaqs(): Promise<FaqItem[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    return (data as FaqItem[]) ?? [];
  } catch {
    return [];
  }
}

export async function getAllFaqs(): Promise<FaqItem[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as FaqItem[]) ?? [];
}

export async function getFaqById(id: string): Promise<FaqItem | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as FaqItem) ?? null;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as ContactMessage[]) ?? [];
  } catch {
    return [];
  }
}
