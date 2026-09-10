import { CheckCircle2 } from "lucide-react";
import { AdminHeader, Card, Field } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/buttons";
import { saveSettings } from "@/lib/actions/admin";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminAyarlarPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const settings = await getSettings();

  return (
    <>
      <AdminHeader
        title="Ayarlar"
        description="Site başlığı, yönlendirme, iletişim ve sosyal medya bilgileri."
      />

      {saved && (
        <div className="mb-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Ayarlar kaydedildi.
        </div>
      )}

      <Card>
        <form action={saveSettings} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Site Başlığı (TR)"
              name="site_title_tr"
              defaultValue={settings.site_title_tr}
              required
            />
            <Field
              label="Site Başlığı (EN)"
              name="site_title_en"
              defaultValue={settings.site_title_en}
            />
          </div>

          <Field
            label="Yönlendirme URL (Tüm Kulüpler ve Evraklar)"
            name="clubs_url"
            defaultValue={settings.clubs_url}
            placeholder="https://..."
            hint="Menüdeki 'Tüm Kulüpler ve Evraklar' bu adrese yönlendirir"
          />

          <div className="border-t border-slate-100 pt-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">
              İletişim Bilgileri
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <Field
                label="E-posta"
                name="contact_email"
                type="email"
                defaultValue={settings.contact_email}
              />
              <Field
                label="Telefon"
                name="contact_phone"
                defaultValue={settings.contact_phone}
              />
              <Field
                label="Adres"
                name="address"
                defaultValue={settings.address}
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">
              Sosyal Medya
              <span className="ml-2 font-normal text-slate-400">
                (Bize Ulaşın sayfasında gösterilir)
              </span>
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Instagram"
                name="instagram_url"
                defaultValue={settings.instagram_url}
                placeholder="https://instagram.com/..."
              />
              <Field
                label="WhatsApp"
                name="whatsapp_url"
                defaultValue={settings.whatsapp_url}
                placeholder="https://wa.me/90..."
              />
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field
                label="YouTube"
                name="youtube_url"
                defaultValue={settings.youtube_url}
                placeholder="https://youtube.com/@..."
              />
              <Field
                label="LinkedIn"
                name="linkedin_url"
                defaultValue={settings.linkedin_url}
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-5">
            <SubmitButton />
          </div>
        </form>
      </Card>
    </>
  );
}
