import { FaqContent } from "@/components/faq-content";
import { getFaqs } from "@/lib/data";
import { FALLBACK_FAQS } from "@/lib/fallbacks";

export const dynamic = "force-dynamic";

export default async function SssPage() {
  const dbItems = await getFaqs();
  const items = dbItems.length > 0 ? dbItems : FALLBACK_FAQS;

  return <FaqContent items={items} />;
}
