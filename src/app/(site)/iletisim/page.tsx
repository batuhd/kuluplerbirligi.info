import { ContactContent } from "@/components/contact-content";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function IletisimPage() {
  const settings = await getSettings();
  return <ContactContent settings={settings} />;
}
