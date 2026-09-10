import { SiteHeader } from "@/components/site-header";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader
        titleTr={settings.site_title_tr}
        titleEn={settings.site_title_en}
        clubsUrl={settings.clubs_url}
      />
      <main className="flex-1">{children}</main>
    </>
  );
}
