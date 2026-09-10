export type LinkSection = "links" | "resources";

export type LinkItem = {
  id: string;
  title_tr: string;
  title_en: string | null;
  description_tr: string | null;
  description_en: string | null;
  url: string;
  icon: string | null;
  category_tr: string | null;
  category_en: string | null;
  section: LinkSection;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type FaqAudience = "students" | "clubs";

export type FaqItem = {
  id: string;
  question_tr: string;
  question_en: string | null;
  answer_tr: string;
  answer_en: string | null;
  audience: FaqAudience;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  site_title: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  clubs_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  whatsapp_url: string | null;
  updated_at: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  site_title: "Kulüpler Birliği",
  contact_email: "info@kuluplerbirligi.info",
  contact_phone: null,
  address: null,
  clubs_url: "https://audost.altinbas.edu.tr/?page_id=328",
  instagram_url: null,
  youtube_url: null,
  linkedin_url: null,
  whatsapp_url: null,
  updated_at: new Date(0).toISOString(),
};
