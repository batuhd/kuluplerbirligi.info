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
        title={settings.site_title}
        clubsUrl={settings.clubs_url}
      />
      <main className="flex-1">{children}</main>
    </>
  );
}
