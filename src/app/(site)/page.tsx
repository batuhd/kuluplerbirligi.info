import { HomeContent } from "@/components/home-content";
import { getSectionLinks, getSettings } from "@/lib/data";
import { FALLBACK_LINKS } from "@/lib/fallbacks";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, dbLinks] = await Promise.all([
    getSettings(),
    getSectionLinks("links"),
  ]);
  const links = dbLinks.length > 0 ? dbLinks : FALLBACK_LINKS;

  return <HomeContent settings={settings} links={links} />;
}
