import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

// Kurumsal yazı tipi: Noto Sans (Altınbaş Üniversitesi kurumsal kimlik kılavuzu)
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kuluplerbirligi.info";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Altınbaş Üniversitesi Kulüpler Birliği",
    template: "%s | Altınbaş Üniversitesi Kulüpler Birliği",
  },
  description:
    "Öğrenci kulüpleri için tek adres: kulüp listesi, kuruluş evrakları, yönerge ve etkinlik başvuruları.",
  keywords: [
    "öğrenci kulüpleri",
    "kulüp kurma",
    "kulüpler birliği",
    "öğrenci kulübü yönergesi",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Kulüpler Birliği",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
