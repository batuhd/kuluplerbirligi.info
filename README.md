# Kulüpler Birliği

Altınbaş Üniversitesi Öğrenci Kulüpleri için **iki dilli (TR/EN)** bağlantı ve bilgi merkezi.
Next.js (App Router) + Tailwind CSS + Supabase ile geliştirilmiştir; Vercel'de barındırılmak üzere tasarlanmıştır.

## Özellikler

- **Bağlantılar** (`/`) — Linktree tarzı sosyal medya ve hızlı bağlantılar
- **Sık Sorulan Sorular** (`/sss`) — Yan yana **Öğrenciler** ve **Kulüpler** bölümleri; yönerge ve form bağlantıları
- **Bize Ulaşın** (`/iletisim`) — İletişim formu (mesajlar veritabanına kaydedilir)
- **Yönetim Paneli** (`/admin`) — Bağlantılar, SSS, Mesajlar ve Ayarlar
- Sağ üstteki **TR/EN** düğmesiyle anında dil değişimi (URL değişmez, seçim tarayıcıda saklanır)
- Kurumsal kimlik: Pantone 2757 C (lacivert), Pantone 185 C (kırmızı) ve **Noto Sans** yazı tipi

## Teknolojiler

| Katman    | Teknoloji                       |
| --------- | ------------------------------- |
| Frontend  | Next.js 16 (App Router), React 19 |
| Stil      | Tailwind CSS 4                  |
| İkonlar   | lucide-react                    |
| Veritabanı / Auth | Supabase (`@supabase/ssr`) |
| Hosting   | Vercel                          |

## Proje Yapısı

```
src/
  app/
    (site)/            # Public sayfalar (/, /sss, /iletisim)
    admin/             # Yönetim paneli (login + korumalı)
    layout.tsx         # Kök layout + dil sağlayıcı
  components/          # UI bileşenleri (site + admin)
  lib/
    supabase/          # client / server / middleware istemcileri
    actions/           # Server Actions (auth, admin, iletişim)
    data.ts            # Supabase okuma fonksiyonları
    i18n.ts            # TR/EN sözlük
    types.ts           # Tipler
  proxy.ts             # /admin koruması (Next 16 Proxy/Middleware)
supabase/
  schema.sql           # Tablolar, RLS, seed verileri
public/                # Logo ve statik dosyalar
```

## Kurulum

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Ortam değişkenlerini oluşturun:

   ```bash
   cp .env.example .env.local
   ```

   `.env.local` içine Supabase URL ve **publishable/anon** anahtarını girin.

3. Supabase şemasını uygulayın:

   Supabase Dashboard → **SQL Editor** → `supabase/schema.sql` içeriğini çalıştırın.

4. İlk yöneticiyi oluşturun:

   - Supabase Dashboard → **Authentication → Users → Add user** ile e-posta/şifre tanımlayın.
   - Ardından yönetici listesine ekleyin (SQL Editor):

     ```sql
     insert into public.admins (user_id, email)
     select id, email from auth.users where email = 'admin@example.com'
     on conflict (user_id) do nothing;
     ```

   - **Authentication → Settings** altında **"Allow new users to sign up"** seçeneğini **kapatın** (kayıt olmamalı).

5. Geliştirme sunucusu:

   ```bash
   npm run dev
   ```

   Site: http://localhost:3000 — Yönetim: http://localhost:3000/admin

> Supabase değişkenleri tanımlı değilse site, `src/lib/fallbacks.ts` içindeki geçici içerikle çalışır.

## Ortam Değişkenleri

| Değişken                        | Açıklama                     |
| ------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase proje URL'i         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable / anon (public) key |
| `NEXT_PUBLIC_SITE_URL`          | Sitenin herkese açık adresi  |

## Güvenlik

- **Row Level Security (RLS)** tüm tablolarda açıktır.
  - Public: yalnızca `is_active = true` kayıtları okuyabilir.
  - Yazma/okuma-yönetim: yalnızca **`admins` tablosundaki kullanıcılar** (`public.is_admin()` üzerinden).
- **`admins` allowlist**: Yalnızca listeye eklenen hesaplar içerik değiştirebilir. Listede olmayan bir hesap giriş yapsa bile hiçbir veriyi okuyamaz/değiştiremez.
- **`is_admin()`** fonksiyonu `SECURITY DEFINER`'dır; RLS'i güvenli şekilde atlar.
- İletişim formu yalnızca **INSERT** yapabilir; gönderilen mesajları sadece yöneticiler okuyabilir.
- Server Action'lar her istekte oturumu **ve** yönetici yetkisini doğrular.
- `/admin` rotaları `src/proxy.ts` ile korunur; asıl doğrulama sunucuda yapılır.
- Güvenlik başlıkları `next.config.ts` içinde tanımlıdır (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy); `X-Powered-By` kapatılmıştır.
- `opencode.json` / `opencode.jsonc` ve `.env*` dosyaları **git'e dahil edilmez**.

## Yönetim Paneli

`/admin` altında giriş yaptıktan sonra:

- **Bağlantılar** — ana sayfadaki link ağacı (TR/EN, ikon, öne çıkan, sıralama)
- **SSS** — sorular; her kayıtta **Hedef Kitle** (Öğrenciler / Kulüpler)
- **Mesajlar** — iletişim formundan gelenler (okundu işaretle / sil)
- **Ayarlar** — site başlığı, yönlendirme URL'i, iletişim ve sosyal medya

## Vercel'e Deploy

1. Projeyi GitHub'a gönderin.
2. Vercel'de **New Project** ile repoyu içe aktarın.
3. **Environment Variables** bölümüne yukarıdaki üç değişkeni ekleyin.
4. Deploy edin ve `kuluplerbirligi.info` alan adını bağlayın.

## Faydalı Komutlar

```bash
npm run dev      # geliştirme sunucusu
npm run build    # production derleme
npm run start    # production sunucusu
npm run lint     # ESLint
```
