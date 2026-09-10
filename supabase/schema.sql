-- =====================================================================
-- Kulüpler Birliği - Supabase şeması
-- Supabase Dashboard -> SQL Editor içinde tek seferde çalıştırın.
--
-- NOT: Bu şema 3 bölümlü (Bağlantılar / Kulüp Kaynakları / SSS) ve
-- iki dilli (TR + EN) yapıya göredir. links / faqs / site_settings
-- tabloları sıfırlanıp yeniden oluşturulur. contact_messages korunur.
-- =====================================================================

create extension if not exists "pgcrypto";

drop table if exists public.links cascade;
drop table if exists public.faqs cascade;
drop table if exists public.site_settings cascade;

-- ---------------------------------------------------------------------
-- Tablolar
-- ---------------------------------------------------------------------

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  title_tr text not null,
  title_en text,
  description_tr text,
  description_en text,
  url text not null,
  icon text,
  category_tr text,
  category_en text,
  section text not null default 'links' check (section in ('links', 'resources')),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question_tr text not null,
  question_en text,
  answer_tr text not null,
  answer_en text,
  audience text not null default 'students' check (audience in ('students', 'clubs')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1,
  site_title text not null default 'Kulüpler Birliği',
  contact_email text,
  contact_phone text,
  address text,
  clubs_url text,
  instagram_url text,
  youtube_url text,
  linkedin_url text,
  whatsapp_url text,
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);

-- Yönetici (admin) listesi. RLS açıktır ve hiçbir public politikası yoktur;
-- yalnızca aşağıdaki SECURITY DEFINER fonksiyon ve service_role erişebilir.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Geçerli kullanıcının yönetici olup olmadığını RLS'i atlayarak döner.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------

alter table public.links enable row level security;
alter table public.faqs enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "links public read active" on public.links;
create policy "links public read active"
  on public.links for select using (is_active = true);

drop policy if exists "links admin read all" on public.links;
create policy "links admin read all"
  on public.links for select to authenticated using (public.is_admin());

drop policy if exists "links admin write" on public.links;
create policy "links admin write"
  on public.links for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "faqs public read active" on public.faqs;
create policy "faqs public read active"
  on public.faqs for select using (is_active = true);

drop policy if exists "faqs admin read all" on public.faqs;
create policy "faqs admin read all"
  on public.faqs for select to authenticated using (public.is_admin());

drop policy if exists "faqs admin write" on public.faqs;
create policy "faqs admin write"
  on public.faqs for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read"
  on public.site_settings for select using (true);

drop policy if exists "settings admin write" on public.site_settings;
create policy "settings admin write"
  on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "messages public insert" on public.contact_messages;
create policy "messages public insert"
  on public.contact_messages for insert with check (true);

drop policy if exists "messages admin read" on public.contact_messages;
create policy "messages admin read"
  on public.contact_messages for select to authenticated using (public.is_admin());

drop policy if exists "messages admin update" on public.contact_messages;
create policy "messages admin update"
  on public.contact_messages for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "messages admin delete" on public.contact_messages;
create policy "messages admin delete"
  on public.contact_messages for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------
-- Varsayılan ayar satırı
-- ---------------------------------------------------------------------

insert into public.site_settings (id, clubs_url)
values (1, 'https://audost.altinbas.edu.tr/?page_id=328')
on conflict (id) do nothing;

-- Daha önce kurulmuş bir veritabanı için: eksik kolonu ekle ve
-- yönlendirme adresini varsayılan olarak ata.
alter table public.site_settings add column if not exists clubs_url text;

update public.site_settings
set clubs_url = 'https://audost.altinbas.edu.tr/?page_id=328'
where id = 1 and (clubs_url is null or clubs_url = '');

-- ---------------------------------------------------------------------
-- Başlangıç linkleri
-- ---------------------------------------------------------------------

insert into public.links
  (title_tr, title_en, description_tr, description_en, url, icon, category_tr, category_en, section, is_featured, sort_order)
values
  ('Instagram', 'Instagram', 'Etkinlikler ve duyurular için bizi takip edin.', 'Follow us for events and announcements.', '#', 'instagram', 'Sosyal Medya', 'Social Media', 'links', true, 1),
  ('WhatsApp', 'WhatsApp', 'Sorularınız için bize yazın.', 'Message us with your questions.', '#', 'phone', 'İletişim', 'Contact', 'links', true, 2),
  ('YouTube', 'YouTube', 'Etkinlik kayıtları ve videolar.', 'Event recordings and videos.', '#', 'globe', 'Sosyal Medya', 'Social Media', 'links', false, 3),
  ('E-posta', 'Email', 'Bize e-posta ile ulaşın.', 'Reach us by email.', '/iletisim', 'mail', 'İletişim', 'Contact', 'links', false, 4);

-- ---------------------------------------------------------------------
-- Başlangıç SSS (audience: students | clubs)
-- ---------------------------------------------------------------------

alter table public.faqs add column if not exists audience text not null default 'students';

insert into public.faqs
  (question_tr, question_en, answer_tr, answer_en, audience, sort_order)
values
  -- Öğrenciler
  ('Kulüp üyeliği kimlere açık?', 'Who can become a club member?',
   'Kulüp üyeliği yalnızca Altınbaş Üniversitesi öğrencilerine açıktır. Üye olabilmek için kulüp üyelik formunu doldurman ve kulüp üye defterine kaydolman gerekir.',
   'Club membership is open only to Altınbaş University students. To become a member, you must fill in the club membership form and register in the club membership book.',
   'students', 1),
  ('Etkinliklerden nasıl haberdar olabilirim?', 'How can I stay informed about events?',
   'Kulüplerimizin kapısı tüm Altınbaş Üniversitesi öğrencilerine sonuna kadar açık! En güncel etkinlik duyuruları ve kayıt linkleri için öğrenci e-posta kutunu düzenli takip et, kulüplerin sosyal medya hesaplarını izle ve kampüsteki panolara göz at.',
   'Our clubs'' doors are wide open to all Altınbaş University students! To follow the latest event announcements and registration links, check your student inbox regularly, follow the clubs'' social media accounts and watch the campus boards.',
   'students', 2),
  ('Üye aidatı ödemem gerekiyor mu?', 'Do I have to pay a membership fee?',
   'Hayır. Kulüpler üyelerden aidat veya başka bir ad altında para alamaz. Üyeler yalnızca kendi rızası ve kulüp danışmanının onayıyla kulübe maddi veya ayni destekte bulunabilir.',
   'No. Clubs cannot collect membership fees or money under any other name. Members may only provide financial or in-kind support voluntarily with the approval of the club advisor.',
   'students', 3),

  -- Kulüpler
  ('Yeni bir kulüp kurmak istiyorum, nereden başlamalıyım?', 'I want to found a new club, where do I start?',
   'Kulüp kurma başvurusu her yıl Ekim ve Şubat aylarında yapılabilir. Gerekli belgeleri eksiksiz hazırlayıp Öğrenci Dekanlığı''na (AUDOST) iletmen ve bir akademik danışman ile anlaşman gerekir. Ayrıntılar için [Öğrenci Kulüpleri Yönergesi](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx) belgesini inceleyebilirsin. Nereden başlayacağını bilmiyorsan tüm süreçte bize danışabilirsin.',
   'Club formation applications can be made every year in October and February. You must prepare the required documents completely and submit them to the Dean of Students Office (AUDOST), and agree with an academic advisor. For details, you can review the [Student Clubs Directive](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx). If you don''t know where to start, you can consult us throughout the process.',
   'clubs', 1),
  ('Kulüp kurma başvuruları ne zaman yapılır?', 'When are club formation applications accepted?',
   'Kulüp kurma başvurusu her yıl Ekim ve Şubat aylarında yapılabilir.',
   'Club formation applications can be made every year in October and February.',
   'clubs', 2),
  ('Kulüp kurmak için hangi belgeler gerekiyor?', 'Which documents are required to found a club?',
   'Kuruluş Talep ve Kurucu Üyelik Bildirim Formu ([EK-1](https://audost.altinbas.edu.tr/wp-content/uploads/KULUP-KURULMA-TALEBI.odt)), Kulüp Tüzüğü ([EK-2](https://audost.altinbas.edu.tr/wp-content/uploads/SKS-2-Kulup-Tuzugu.docx)), Faaliyet Planı Bildirim Formu ([EK-3](https://audost.altinbas.edu.tr/wp-content/uploads/FAALIYET-BILDIRIM-FORMU.odt)) ve Danışman Kabul Formu ([EK-4](https://audost.altinbas.edu.tr/wp-content/uploads/AKADEMIK-DANISMAN-FORMU.odt)) eksiksiz hazırlanıp AUDOST''a iletilmelidir. Yönergenin tamamı: [Öğrenci Kulüpleri Yönergesi](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx).',
   'The Founding Request and Founding Membership Notification Form ([Annex-1](https://audost.altinbas.edu.tr/wp-content/uploads/KULUP-KURULMA-TALEBI.odt)), Club Bylaws ([Annex-2](https://audost.altinbas.edu.tr/wp-content/uploads/SKS-2-Kulup-Tuzugu.docx)), Activity Plan Notification Form ([Annex-3](https://audost.altinbas.edu.tr/wp-content/uploads/FAALIYET-BILDIRIM-FORMU.odt)) and Advisor Acceptance Form ([Annex-4](https://audost.altinbas.edu.tr/wp-content/uploads/AKADEMIK-DANISMAN-FORMU.odt)) must be fully prepared and submitted to AUDOST. Full directive: [Student Clubs Directive](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx).',
   'clubs', 3),
  ('Aynı isim veya amaçla ikinci bir kulüp kurulabilir mi?', 'Can a second club with the same name or purpose be founded?',
   'Hayır. Kulüpler kuruluş amaçlarına uygun isimler almalıdır; ismi ve/veya amacı aynı olan birden fazla kulüp kurulamaz.',
   'No. Clubs must take names appropriate to their purpose; more than one club with the same name and/or purpose cannot be founded.',
   'clubs', 4),
  ('Etkinlik düzenlemek için nasıl başvurulur?', 'How do we apply to organize an event?',
   'Etkinlik tarihinden 15 gün önce ''Öğrenci Kulüpleri Etkinlik Başvuru Formu''nu ([EK-5](https://audost.altinbas.edu.tr/wp-content/uploads/YYB-F-03.5-Ogrenci-Kulupleri-Etkinlik-Basvuru-Formu.Ek5-Rev.0.doc)) doldurarak AUDOST''a başvurmalısın. Afiş asma talebi varsa afiş örneği, katılımcı bilgileri ve açıklamalar forma eklenir. Tüm etkinlikler Rektörlük onayı alındıktan sonra gerçekleştirilir.',
   'You must apply to AUDOST by filling in the ''Student Clubs Event Application Form'' ([Annex-5](https://audost.altinbas.edu.tr/wp-content/uploads/YYB-F-03.5-Ogrenci-Kulupleri-Etkinlik-Basvuru-Formu.Ek5-Rev.0.doc)) 15 days before the event date. If you request to put up posters, a poster sample, participant information and explanations are attached to the form. All events are held after obtaining Rectorate approval.',
   'clubs', 5),
  ('Etkinlikten sonra yapmam gereken bir şey var mı?', 'Is there anything to do after the event?',
   'Evet. ''Etkinlik Sonuç Bildirim Formu''nu (EK-6) ekleriyle birlikte etkinlik tarihini takip eden 15 işgünü içinde AUDOST''a sunmalısın. Formu zamanında teslim etmeyen kulüplerin sonraki etkinlik başvuruları işleme alınmaz.',
   'Yes. You must submit the ''Event Result Notification Form'' (Annex-6) with its attachments to AUDOST within 15 business days following the event date. Event applications of clubs that do not submit the form on time will not be processed.',
   'clubs', 6),
  ('Hangi defter ve belgeleri tutmak zorundayız?', 'Which books and documents must we keep?',
   'Üye Kayıt Defteri, Karar Defteri, Demirbaş Eşya Defteri ve gelir-gider belgeleri her kulüpte bulundurulmalı ve istendiğinde AUDOST''a ibraz edilmelidir. Akademik yıl sonunda bu defterler ve Yıllık Faaliyet Raporu AUDOST''a teslim edilir.',
   'A Member Registry Book, Decision Book, Fixtures/Equipment Book and income-expense documents must be kept in every club and presented to AUDOST upon request. At the end of the academic year, these books and the Annual Activity Report are submitted to AUDOST.',
   'clubs', 7);

-- ---------------------------------------------------------------------
-- Yönetici ekleme
-- Authentication > Users altında kullanıcı oluşturduktan sonra, aşağıdaki
-- sorguyu kendi e-postanızla çalıştırın. Yönetici olmayan hesaplar RLS
-- nedeniyle hiçbir içeriği okuyamaz veya değiştiremez.
-- ---------------------------------------------------------------------
-- insert into public.admins (user_id, email)
-- select id, email from auth.users where email = 'admin@example.com'
-- on conflict (user_id) do nothing;
